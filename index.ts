export { SigilAgent } from "./agent/loop.js";
export { selectTemplate, TEMPLATES } from "./templates/index.js";
export { buildProgram } from "./builder/program.js";
export { validateDesign } from "./validator/idl.js";
export { emitIdl } from "./emitter/idl.js";
export type {
  GenerationRequest,
  GenerationResult,
  ProgramDesign,
  AccountDef,
  InstructionDef,
  GeneratedFile,
  TemplateKind,
} from "./lib/types.js";

// Re-export everything needed to use Sigil as a library

