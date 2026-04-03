import { z } from "zod";

const Schema = z.object({
  ANTHROPIC_API_KEY: z.string().min(1, "ANTHROPIC_API_KEY is required"),
  CLAUDE_MODEL: z.string().default("claude-opus-4-6"),
  OUTPUT_DIR: z.string().default("./output"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  MAX_TOKENS: z.coerce.number().default(8192),
  SOLANA_CLUSTER: z.enum(["mainnet-beta", "devnet", "localnet"]).default("devnet"),
  ANCHOR_VERSION: z.string().default("0.31.0"),
});

function load() {
  const result = Schema.safeParse(process.env);
  if (!result.success) {
    console.error("[Config] Validation failed:", result.error.flatten().fieldErrors);
    process.exit(1);
  }
  return result.data;
}

export const config = load();
export type Config = typeof config;

// Re-export for convenience
export { Schema as ConfigSchema };

