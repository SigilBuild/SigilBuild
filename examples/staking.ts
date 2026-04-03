/**
 * Example: generate a staking program from a description.
 * Run: bun run examples/staking.ts
 */
import { SigilAgent } from "../agent/loop.js";
import { validateDesign } from "../validator/idl.js";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";

const agent = new SigilAgent();

const result = await agent.generate({
  description: "Create a token staking program with a 7-day lockup period and 15% APY rewards. Users should be able to stake SPL tokens, earn rewards proportional to their stake, and unstake after the lockup expires.",
  programName: "token_staking",
  outputDir: "./output",
});

const validation = validateDesign(result.design);
if (!validation.valid) {
  console.error("Validation errors:", validation.errors);
  process.exit(1);
}

console.log(`\nGenerated ${result.files.length} files (${result.linesGenerated} lines)`);

for (const file of result.files) {
  const outPath = join("output", result.programName, file.path);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, file.content, "utf-8");
  console.log(`  wrote ${file.path}`);
}

console.log("\nDone. Run: cd output/token_staking && anchor build");
