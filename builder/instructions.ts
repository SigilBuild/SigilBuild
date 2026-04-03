import type { InstructionDef } from "../lib/types.js";

/**
 * Emit a stub instruction handler function body.
 */
export function emitInstructionHandler(instr: InstructionDef): string {
  const args = instr.args.map((a) => `${a.name}: ${a.type}`).join(", ");
  const ctxArg = args ? `, ${args}` : "";

  const body = [
    `        // TODO: add validation`,
    `        // Accounts: ${instr.accounts.join(", ")}`,
    `        Ok(())`,
  ].join("\n");

  return [
    `    /// ${instr.description}`,
    `    pub fn ${instr.name}(ctx: Context<${toPascalCase(instr.name)}>` + ctxArg + `) -> Result<()> {`,
    body,
    `    }`,
  ].join("\n");
}

/**
 * Emit the #[derive(Accounts)] struct for an instruction.
 */
export function emitAccountsContext(instr: InstructionDef, programName: string): string {
  const accountLines = instr.accounts.map((acc) => {
    const typeHint = acc.toLowerCase().includes("token") ? "Account<'info, TokenAccount>" : "AccountInfo<'info>";
    return `    pub ${toSnakeCase(acc)}: ${typeHint},`;
  });

  return [
    `#[derive(Accounts)]`,
    `pub struct ${toPascalCase(instr.name)}<'info> {`,
    ...accountLines,
    `    pub system_program: Program<'info, System>,`,
    `}`,
  ].join("\n");
}

function toPascalCase(s: string): string {
  return s.replace(/(^|_)([a-z])/g, (_, __, c: string) => c.toUpperCase());
}

function toSnakeCase(s: string): string {
  return s
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
}
