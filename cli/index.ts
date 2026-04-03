#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
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

  console.log(`\n  Sigil · Anchor Program Generator\n`);
  console.log(`  Generating: ${description.slice(0, 80)}...\n`);

  const result = await agent.generate(parsed.data);

  // Validate before writing
  const validation = validateDesign(result.design);
  if (!validation.valid) {
    console.error("Design validation failed:");
    validation.errors.forEach((e) => console.error(`  ✗ ${e}`));
    process.exit(1);
  }
  if (validation.warnings.length > 0) {
    validation.warnings.forEach((w) => console.warn(`  ⚠ ${w}`));
  }

  // Write files
  const outDir = parsed.data.outputDir ?? config.OUTPUT_DIR;
  for (const file of result.files) {
    const fullPath = join(outDir, result.programName, file.path);
    mkdirSync(dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, file.content, "utf-8");
    console.log(`  ✓ ${file.path}`);
  }

  console.log(`\n  Generated ${result.files.length} files · ${result.linesGenerated} lines`);
  console.log(`  Output: ${join(outDir, result.programName)}\n`);
  console.log(`  Next: cd ${join(outDir, result.programName)} && anchor build\n`);
}

function printHelp() {
  console.log(`
  Sigil — AI-powered Solana Anchor program generator

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
  console.error("Fatal:", err instanceof Error ? err.message : err);
  process.exit(1);
});

// CLI validates input with Zod before calling the agent — no bad requests reach Claude
