// ─── Program design ───────────────────────────────────────────────────────────

export type TemplateKind = "token" | "staking" | "vault" | "nft" | "governance" | "custom";

export interface AccountField {
  name: string;
  type: string;   // Rust type string e.g. "u64", "Pubkey", "bool"
  description: string;
}

export interface AccountDef {
  name: string;         // PascalCase e.g. "StakePool"
  description: string;
  fields: AccountField[];
  seeds?: string[];     // PDA seeds description
}

export interface InstructionArg {
  name: string;
  type: string;
}

export interface InstructionDef {
  name: string;         // snake_case e.g. "initialize_pool"
  description: string;
  args: InstructionArg[];
  accounts: string[];   // account names required
  errors?: string[];    // possible error codes
}

export interface ProgramDesign {
  name: string;
  description: string;
  template: TemplateKind;
  accounts: AccountDef[];
  instructions: InstructionDef[];
  customErrors: string[];
  features: string[];
}

// ─── Generation result ────────────────────────────────────────────────────────

export interface GeneratedFile {
  path: string;     // relative to project root
  content: string;
  lang: "rust" | "toml" | "json";
}

export interface GenerationResult {
  programName: string;
  template: TemplateKind;
  design: ProgramDesign;
  files: GeneratedFile[];
  linesGenerated: number;
  generatedAt: number;
}

// ─── Agent ────────────────────────────────────────────────────────────────────

export interface GenerationRequest {
  description: string;
  programName?: string;
  template?: TemplateKind;
  outputDir?: string;
}

// All generation inputs and outputs are fully typed

