import Anthropic from "@anthropic-ai/sdk";
import { config } from "../lib/config.js";
import { createLogger } from "../lib/logger.js";
import { selectTemplate } from "../templates/index.js";
import { buildProgram } from "../builder/program.js";
import { SIGIL_SYSTEM } from "./prompts.js";
import type { GenerationRequest, GenerationResult, ProgramDesign } from "../lib/types.js";
import {
  AccountDefSchema,
  InstructionDefSchema,
  ProgramDesignSchema,
} from "../schemas/index.js";

const log = createLogger("SigilAgent");

const TOOLS: Anthropic.Tool[] = [
  {
    name: "select_template",
    description: "Select the best Anchor program template for this request. Call this first.",
    input_schema: {
      type: "object" as const,
      properties: {
        description: { type: "string" },
        template_hint: {
          type: "string",
          enum: ["token", "staking", "vault", "nft", "governance", "custom"],
          description: "Optional template override",
        },
      },
      required: ["description"],
    },
  },
  {
    name: "design_accounts",
    description: "Define all on-chain account structs for the program.",
    input_schema: {
      type: "object" as const,
      properties: {
        accounts: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string", description: "PascalCase account name" },
              description: { type: "string" },
              fields: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    type: { type: "string", description: "Rust type e.g. u64, Pubkey, bool, i64" },
                    description: { type: "string" },
                  },
                  required: ["name", "type", "description"],
                },
              },
              seeds: { type: "array", items: { type: "string" } },
            },
            required: ["name", "description", "fields"],
          },
        },
      },
      required: ["accounts"],
    },
  },
  {
    name: "design_instructions",
    description: "Define all instruction handlers for the program.",
    input_schema: {
      type: "object" as const,
      properties: {
        instructions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string", description: "snake_case instruction name" },
              description: { type: "string" },
              args: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    type: { type: "string" },
                  },
                  required: ["name", "type"],
                },
              },
              accounts: { type: "array", items: { type: "string" } },
              errors: { type: "array", items: { type: "string" } },
            },
            required: ["name", "description", "args", "accounts"],
          },
        },
        custom_errors: {
          type: "array",
          items: { type: "string" },
          description: "Custom error code names in PascalCase",
        },
      },
      required: ["instructions", "custom_errors"],
    },
  },
  {
    name: "emit_program",
    description: "Submit the final complete program design. Call this LAST.",
    input_schema: {
      type: "object" as const,
      properties: {
        program_name: { type: "string", description: "snake_case program name" },
        description: { type: "string" },
        template: {
          type: "string",
          enum: ["token", "staking", "vault", "nft", "governance", "custom"],
        },
        accounts: { type: "array", items: { type: "object" } },
        instructions: { type: "array", items: { type: "object" } },
        custom_errors: { type: "array", items: { type: "string" } },
        features: { type: "array", items: { type: "string" } },
      },
      required: ["program_name", "description", "template", "accounts", "instructions", "custom_errors", "features"],
    },
  },
];

export class SigilAgent {
  private client: Anthropic;
  private partialDesign: Partial<ProgramDesign> = {};

  constructor() {
    this.client = new Anthropic({ apiKey: config.ANTHROPIC_API_KEY });
  }

  async generate(request: GenerationRequest): Promise<GenerationResult> {
    log.info("Generating Anchor program", { description: request.description.slice(0, 80) });

    const messages: Anthropic.MessageParam[] = [
      {
        role: "user",
        content: [
          `Generate a complete Solana Anchor program for the following request:`,
          ``,
          `Description: ${request.description}`,
          request.programName ? `Program name: ${request.programName}` : "",
          request.template ? `Template preference: ${request.template}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      },
    ];

    let design: ProgramDesign | null = null;

    agentLoop: while (true) {
      const response = await this.client.messages.create({
        model: config.CLAUDE_MODEL,
        max_tokens: config.MAX_TOKENS,
        system: SIGIL_SYSTEM,
        tools: TOOLS,
        messages,
      });

      if (response.stop_reason === "end_turn") break agentLoop;

      if (response.stop_reason === "tool_use") {
        const toolBlocks = response.content.filter(
          (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
        );
        const results: Anthropic.ToolResultBlockParam[] = [];

        for (const tb of toolBlocks) {
          const result = await this.executeTool(tb.name, tb.input as Record<string, unknown>, request);

          if (tb.name === "emit_program" && result && typeof result === "object") {
            const parsed = ProgramDesignSchema.safeParse(result);
            if (parsed.success) {
              design = parsed.data as ProgramDesign;
            } else {
              log.error("emit_program schema mismatch", { errors: parsed.error.flatten() });
              throw new Error("emit_program returned an invalid ProgramDesign payload");
            }
            results.push({ type: "tool_result", tool_use_id: tb.id, content: JSON.stringify({ accepted: true }) });
            messages.push({ role: "assistant", content: response.content });
            messages.push({ role: "user", content: results });
            break agentLoop;
          }

          results.push({ type: "tool_result", tool_use_id: tb.id, content: JSON.stringify(result) });
        }

        messages.push({ role: "assistant", content: response.content });
        if (results.length > 0) {
          messages.push({ role: "user", content: results });
        }
        continue;
      }

      break agentLoop;
    }

    if (!design) {
      throw new Error("Agent did not emit a program design");
    }

    log.info("Design complete", {
      program: design.name,
      accounts: design.accounts.length,
      instructions: design.instructions.length,
    });

    return buildProgram(design);
  }

  private async executeTool(
    name: string,
    input: Record<string, unknown>,
    request: GenerationRequest
  ): Promise<unknown> {
    switch (name) {
      case "select_template": {
        const tmpl = selectTemplate(
          String(input["description"] ?? request.description),
          (input["template_hint"] as Parameters<typeof selectTemplate>[1]) ?? request.template
        );
        this.partialDesign.template = tmpl.kind;
        log.info("Template selected", { kind: tmpl.kind });
        return { selected: tmpl.kind, description: tmpl.description, base_errors: tmpl.baseDesign.customErrors };
      }

      case "design_accounts": {
        const accounts = AccountDefSchema.array().parse(input["accounts"]);
        this.partialDesign.accounts = accounts;
        log.info("Accounts designed", { count: accounts.length, names: accounts.map((a) => a.name) });
        return { accepted: true, count: accounts.length };
      }

      case "design_instructions": {
        const instructions = InstructionDefSchema.array().parse(input["instructions"]);
        const errors = ((input["custom_errors"] as unknown) ?? []) as string[];
        this.partialDesign.instructions = instructions;
        this.partialDesign.customErrors = errors;
        log.info("Instructions designed", { count: instructions.length, errors: errors.length });
        return { accepted: true, count: instructions.length };
      }

      case "emit_program": {
        return {
          name: String(input["program_name"] ?? request.programName ?? "program"),
          description: String(input["description"] ?? request.description),
          template: input["template"],
          accounts: input["accounts"],
          instructions: input["instructions"],
          customErrors: input["custom_errors"],
          features: input["features"],
        };
      }

      default:
        return { error: `Unknown tool: ${name}` };
    }
  }
}

// emit_program intercept breaks the loop — no extra round-trip needed
