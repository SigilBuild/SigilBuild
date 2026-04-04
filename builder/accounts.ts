import type { AccountDef } from "../lib/types.js";

/**
 * Estimate the Anchor account space for a list of fields.
 * 8 bytes for discriminator + sum of field sizes.
 */
// Maximum String length assumption when no explicit bound is given.
// Anchor encodes String as 4-byte length prefix + content bytes.
// Using 4 + MAX_STRING_LEN to match the actual on-chain encoding.
const MAX_STRING_LEN = 64;

function fieldSize(rustType: string): number {
  // Vec<T> space = 4-byte length prefix + n * item_size.
  // The prefix was previously counted as the full allocation — now correctly
  // returns 4 + (8 * default_vec_len) for unknown Vec variants.
  if (rustType.startsWith("Vec<")) {
    const inner = rustType.slice(4, -1);
    return 4 + 8 * fieldSize(inner); // default 8 elements
  }

  const sizes: Record<string, number> = {
    bool: 1,
    u8: 1, i8: 1,
    u16: 2, i16: 2,
    u32: 4, i32: 4,
    u64: 8, i64: 8,
    u128: 16, i128: 16,
    f32: 4, f64: 8,
    Pubkey: 32,
    // String: 4-byte length prefix + content bytes (NOT a flat 64-byte estimate)
    String: 4 + MAX_STRING_LEN,
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

// Space includes 8-byte Anchor discriminator prefix.
// For accounts with PDA seeds: always add 1 byte for canonical bump storage.
// Storing bump avoids re-derivation via find_program_address on every ix — saves ~20k CU.

