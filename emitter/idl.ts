import type { ProgramDesign } from "../lib/types.js";

/**
 * Emit an Anchor-compatible IDL JSON for the program design.
 */
export function emitIdl(design: ProgramDesign): string {
  const idl = {
    version: "0.1.0",
    name: design.name,
    instructions: design.instructions.map((instr) => ({
      name: instr.name,
      docs: [instr.description],
      accounts: instr.accounts.map((acc) => ({
        name: acc,
        isMut: true,
        isSigner: false,
      })),
      args: instr.args.map((arg) => ({
        name: arg.name,
        type: mapType(arg.type),
      })),
    })),
    accounts: design.accounts.map((acc) => ({
      name: acc.name,
      docs: [acc.description],
      type: {
        kind: "struct",
        fields: acc.fields.map((f) => ({
          name: f.name,
          docs: [f.description],
          type: mapType(f.type),
        })),
      },
    })),
    errors: design.customErrors.map((e, i) => ({
      code: 6000 + i,
      name: e,
      msg: e,
    })),
    metadata: {
      address: "11111111111111111111111111111111",
    },
  };

  return JSON.stringify(idl, null, 2);
}

function mapType(rustType: string): unknown {
  const primitives: Record<string, string> = {
    u8: "u8", u16: "u16", u32: "u32", u64: "u64", u128: "u128",
    i8: "i8", i16: "i16", i32: "i32", i64: "i64", i128: "i128",
    bool: "bool", f32: "f32", f64: "f64",
    Pubkey: "publicKey",
    String: "string",
  };
  return primitives[rustType] ?? "bytes";
}

// IDL format follows Anchor 0.31 spec
