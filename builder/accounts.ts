import type { AccountDef } from "../lib/types.js";

/**
 * Estimate the Anchor account space for a list of fields.
 * 8 bytes for discriminator + sum of field sizes.
 */
function fieldSize(rustType: string): number {
  const sizes: Record<string, number> = {
    bool: 1,
    u8: 1, i8: 1,
    u16: 2, i16: 2,
    u32: 4, i32: 4,
    u64: 8, i64: 8,
    u128: 16, i128: 16,
    f32: 4, f64: 8,
    Pubkey: 32,
    String: 64,   // default bounded string estimate
  };
  return sizes[rustType] ?? 32; // default to Pubkey size for unknown types
}

export function estimateSpace(account: AccountDef): number {
  return 8 + account.fields.reduce((sum, f) => sum + fieldSize(f.type), 0);
}

/**
 * Emit a Rust struct definition for an Anchor account.
 */
export function emitAccountStruct(account: AccountDef): string {
  const space = estimateSpace(account);
  const fields = account.fields
    .map((f) => `    pub ${f.name}: ${f.type},  // ${f.description}`)
    .join("\n");

  const seedsComment = account.seeds?.length
    ? `\n// Seeds: ${account.seeds.join(", ")}`
    : "";

  return [
    `/// ${account.description}${seedsComment}`,
    `#[account]`,
    `pub struct ${account.name} {`,
    fields,
    `}`,
    ``,
    `impl ${account.name} {`,
    `    pub const SPACE: usize = ${space};`,
    `}`,
  ].join("\n");
}
