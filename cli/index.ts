#!/usr/bin/env node
import { mkdirSync, unlinkSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { SigilAgent } from "../agent/loop.js";
import { validateDesign } from "../validator/idl.js";
import { GenerationRequestSchema } from "../schemas/index.js";
import { createLogger } from "../lib/logger.js";
import { config } from "../lib/config.js";

const log = createLogger("CLI");

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (cmd === "generate" || cmd === "gen") {
    await runGenerate(args.slice(1));
  } else {
    printHelp();
    process.exit(cmd && cmd !== "--help" ? 1 : 0);
  }
}

async function runGenerate(args: string[]) {
  const description = args.join(" ").trim();
  if (!description) {
    console.error('Usage: sigil generate "<description>"');
    process.exit(1);
  }

  const parsed = GenerationRequestSchema.safeParse({
    description,
    outputDir: config.OUTPUT_DIR,
  });

  if (!parsed.success) {
    console.error("Invalid request:", parsed.error.flatten().fieldErrors);
    process.exit(1);
  }

  const agent = new SigilAgent();

  console.log("\n  Sigil · Anchor Program Generator\n");
  console.log(`  Generating: ${description.slice(0, 80)}...\n`);

  const result = await agent.generate(parsed.data);

  const validation = validateDesign(result.design);
  if (!validation.valid) {
    console.error("Design validation failed:");
    validation.errors.forEach((error) => console.error(`  x ${error}`));
    process.exit(1);
  }
  if (validation.warnings.length > 0) {
    validation.warnings.forEach((warning) => console.warn(`  ! ${warning}`));
  }

  const outDir = parsed.data.outputDir ?? config.OUTPUT_DIR;
  writeGeneratedFiles(outDir, result.programName, result.files);

  for (const file of result.files) {
    console.log(`  + ${file.path}`);
  }

  console.log(`\n  Generated ${result.files.length} files · ${result.linesGenerated} lines`);
  console.log(`  Output: ${join(outDir, result.programName)}\n`);
  console.log(`  Next: cd ${join(outDir, result.programName)} && anchor build\n`);
}

function writeGeneratedFiles(
  outDir: string,
  programName: string,
  files: Array<{ path: string; content: string }>
) {
  const writtenFiles: string[] = [];

  try {
    for (const file of files) {
      const fullPath = join(outDir, programName, file.path);
      mkdirSync(dirname(fullPath), { recursive: true });
      writeFileSync(fullPath, file.content, "utf-8");
      writtenFiles.push(fullPath);
    }
  } catch (err) {
    for (const writtenFile of writtenFiles.reverse()) {
      try {
        unlinkSync(writtenFile);
      } catch {
        // Best-effort cleanup to avoid leaving a half-written project tree.
      }
    }

    throw new Error(
      `Failed while writing generated output: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

function printHelp() {
  console.log(`
  Sigil - AI-powered Solana Anchor program generator

  Commands:
    generate "<description>"   Generate a program from a description
    gen "<description>"        Alias for generate

  Examples:
    sigil generate "Create a token staking program with 7-day lockup and 15% APY"
    sigil generate "Build a DAO governance contract with voting and timelock"
    sigil generate "NFT collection with royalties and allow-list minting"

  Environment:
    ANTHROPIC_API_KEY   Required
    OUTPUT_DIR          Output directory (default: ./output)
    CLAUDE_MODEL        Model to use (default: claude-opus-4-6)
  `);
}

main().catch((err) => {
  log.error("CLI generation failed", { error: err instanceof Error ? err.message : String(err) });
  console.error("Fatal:", err instanceof Error ? err.message : err);
  process.exit(1);
});
