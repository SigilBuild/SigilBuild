import { describe, it, expect } from "vitest";
import { selectTemplate } from "../templates/index.js";
import { validateDesign } from "../validator/idl.js";
import { estimateSpace, emitAccountStruct } from "../builder/accounts.js";
import { emitInstructionHandler } from "../builder/instructions.js";
import { emitIdl } from "../emitter/idl.js";
import type { ProgramDesign, AccountDef, InstructionDef } from "../lib/types.js";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

function makeDesign(overrides: Partial<ProgramDesign> = {}): ProgramDesign {
  return {
    name: "token_staking",
    description: "Token staking with lockup",
    template: "staking",
    accounts: [
      {
        name: "StakePool",
        description: "Global staking pool state",
        fields: [
          { name: "authority", type: "Pubkey", description: "Pool admin" },
          { name: "apy_bps", type: "u64", description: "APY in basis points" },
          { name: "total_staked", type: "u64", description: "Total tokens staked" },
          { name: "lockup_seconds", type: "u64", description: "Lockup duration" },
        ],
      },
    ],
    instructions: [
      {
        name: "initialize_pool",
        description: "Create and initialize the staking pool",
        args: [{ name: "apy_bps", type: "u64" }],
        accounts: ["pool", "authority", "system_program"],
      },
      {
        name: "stake",
        description: "Stake tokens into the pool",
        args: [{ name: "amount", type: "u64" }],
        accounts: ["pool", "user_token_account", "vault"],
      },
    ],
    customErrors: ["InsufficientStake", "LockupNotExpired"],
    features: ["PDA-based pool", "Time-locked withdrawals"],
    ...overrides,
  };
}

// ─── Template selection ───────────────────────────────────────────────────────

describe("selectTemplate", () => {
  it("selects staking for staking description", () => {
    const t = selectTemplate("Token staking program with 7-day lockup and APY rewards");
    expect(t.kind).toBe("staking");
  });

  it("selects vault for treasury description", () => {
    const t = selectTemplate("Multi-sig treasury vault with spending limits");
    expect(t.kind).toBe("vault");
  });

  it("selects governance for DAO description", () => {
    const t = selectTemplate("DAO governance with voting and quorum requirements");
    expect(t.kind).toBe("governance");
  });

  it("respects hint over keyword match", () => {
    const t = selectTemplate("something staking related", "vault");
    expect(t.kind).toBe("vault");
  });
});

// ─── Account builder ─────────────────────────────────────────────────────────

describe("estimateSpace", () => {
  it("calculates 8 discriminator + field sizes", () => {
    const acc: AccountDef = {
      name: "StakePool",
      description: "",
      fields: [
        { name: "authority", type: "Pubkey", description: "" }, // 32
        { name: "amount", type: "u64", description: "" },       // 8
        { name: "active", type: "bool", description: "" },      // 1
      ],
    };
    // 8 + 32 + 8 + 1 = 49
    expect(estimateSpace(acc)).toBe(49);
  });
});

describe("emitAccountStruct", () => {
  it("emits valid Rust struct syntax", () => {
    const acc: AccountDef = {
      name: "StakePool",
      description: "Main pool account",
      fields: [{ name: "authority", type: "Pubkey", description: "Pool admin" }],
    };
    const code = emitAccountStruct(acc);
    expect(code).toContain("#[account]");
    expect(code).toContain("pub struct StakePool");
    expect(code).toContain("pub authority: Pubkey");
    expect(code).toContain("pub const SPACE");
  });
});

// ─── Instruction builder ──────────────────────────────────────────────────────

describe("emitInstructionHandler", () => {
  it("emits correct function signature", () => {
    const instr: InstructionDef = {
      name: "initialize_pool",
      description: "Init pool",
      args: [{ name: "apy_bps", type: "u64" }],
      accounts: ["pool"],
    };
    const code = emitInstructionHandler(instr);
    expect(code).toContain("pub fn initialize_pool");
    expect(code).toContain("apy_bps: u64");
    expect(code).toContain("-> Result<()>");
    expect(code).toContain("Ok(())");
  });
});

// ─── Validator ────────────────────────────────────────────────────────────────

describe("validateDesign", () => {
  it("passes a valid design", () => {
    const result = validateDesign(makeDesign());
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects lowercase account name", () => {
    const design = makeDesign();
    design.accounts[0]!.name = "stakePool";
    const result = validateDesign(design);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatch(/PascalCase/);
  });

  it("rejects PascalCase instruction name", () => {
    const design = makeDesign();
    design.instructions[0]!.name = "InitializePool";
    const result = validateDesign(design);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatch(/snake_case/);
  });

  it("rejects duplicate instruction names", () => {
    const design = makeDesign();
    design.instructions.push({ ...design.instructions[0]! });
    const result = validateDesign(design);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatch(/Duplicate/);
  });
});

// ─── IDL emitter ──────────────────────────────────────────────────────────────

describe("emitIdl", () => {
  it("emits valid JSON with correct structure", () => {
    const design = makeDesign();
    const json = emitIdl(design);
    const idl = JSON.parse(json) as Record<string, unknown>;
    expect(idl["name"]).toBe("token_staking");
    expect(Array.isArray(idl["instructions"])).toBe(true);
    expect(Array.isArray(idl["accounts"])).toBe(true);
    expect(Array.isArray(idl["errors"])).toBe(true);
  });

  it("maps Pubkey to publicKey in IDL", () => {
    const design = makeDesign();
    const idl = JSON.parse(emitIdl(design)) as {
      accounts: Array<{ type: { fields: Array<{ type: string }> } }>;
    };
    const authorityField = idl.accounts[0]?.type.fields.find(
      (_, i) => design.accounts[0]?.fields[i]?.type === "Pubkey"
    );
    expect(authorityField?.type).toBe("publicKey");
  });
});

// Tests cover: template selection, space calc, struct emit, validator, IDL output

