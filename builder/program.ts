import type { ProgramDesign, GenerationResult, GeneratedFile } from "../lib/types.js";
import { emitAccountStruct } from "./accounts.js";
import { emitInstructionHandler, emitAccountsContext } from "./instructions.js";
import { emitCargoToml, emitAnchorToml } from "../emitter/toml.js";
import { emitIdl } from "../emitter/idl.js";

export function buildProgram(design: ProgramDesign): GenerationResult {
  const files: GeneratedFile[] = [];

  // lib.rs
  const libRs = buildLibRs(design);
  files.push({ path: `programs/${design.name}/src/lib.rs`, content: libRs, lang: "rust" });

  // state.rs
  const stateRs = buildStateRs(design);
  files.push({ path: `programs/${design.name}/src/state.rs`, content: stateRs, lang: "rust" });

  // errors.rs
  const errorsRs = buildErrorsRs(design);
  files.push({ path: `programs/${design.name}/src/errors.rs`, content: errorsRs, lang: "rust" });

  // Instruction files
  for (const instr of design.instructions) {
    const ctx = emitAccountsContext(instr, design.name);
    const fn_ = emitInstructionHandler(instr);
    const content = [
      `use anchor_lang::prelude::*;`,
      `use crate::state::*;`,
      `use crate::errors::${design.name.replace(/(^|_)([a-z])/g, (_, __, c: string) => c.toUpperCase())}Error;`,
      ``,
      ctx,
      ``,
      `impl ${instr.name.replace(/(^|_)([a-z])/g, (_, __, c: string) => c.toUpperCase())} {`,
      fn_,
      `}`,
    ].join("\n");
    files.push({
      path: `programs/${design.name}/src/instructions/${instr.name}.rs`,
      content,
      lang: "rust",
    });
  }

  // TOML files
  files.push({ path: "Cargo.toml", content: emitCargoToml(design.name), lang: "toml" });
  files.push({ path: "Anchor.toml", content: emitAnchorToml(design.name), lang: "toml" });

  // IDL
  files.push({ path: `idl/${design.name}.json`, content: emitIdl(design), lang: "json" });

  const linesGenerated = files.reduce((n, f) => n + f.content.split("\n").length, 0);

  return {
    programName: design.name,
    template: design.template,
    design,
    files,
    linesGenerated,
    generatedAt: Date.now(),
  };
}

function buildLibRs(design: ProgramDesign): string {
  const instrMods = design.instructions.map((i) => `mod ${i.name};`).join("\n");
  const instrUse = design.instructions.map((i) => `use ${i.name}::*;`).join("\n");
  const handlers = design.instructions.map((i) => emitInstructionHandler(i)).join("\n\n");

  return [
    `use anchor_lang::prelude::*;`,
    ``,
    `pub mod state;`,
    `pub mod errors;`,
    `pub mod instructions {`,
    `    ${instrMods}`,
    `    ${instrUse}`,
    `}`,
    ``,
    `use instructions::*;`,
    ``,
    `declare_id!("11111111111111111111111111111111");`,
    ``,
    `#[program]`,
    `pub mod ${design.name} {`,
    `    use super::*;`,
    ``,
    handlers,
    `}`,
  ].join("\n");
}

function buildStateRs(design: ProgramDesign): string {
  const structs = design.accounts.map(emitAccountStruct).join("\n\n");
  return [`use anchor_lang::prelude::*;`, ``, structs].join("\n");
}

function buildErrorsRs(design: ProgramDesign): string {
  const modName = design.name.replace(/(^|_)([a-z])/g, (_, __, c: string) => c.toUpperCase());
  const codes = design.customErrors
    .map((e, i) => `    #[msg("${e}")] ${e} = ${6000 + i},`)
    .join("\n");

  return [
    `use anchor_lang::prelude::*;`,
    ``,
    `#[error_code]`,
    `pub enum ${modName}Error {`,
    codes,
    `}`,
  ].join("\n");
}

// buildProgram is the single assembly point — all emitters converge here
