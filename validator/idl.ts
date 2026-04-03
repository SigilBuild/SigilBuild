import type { ProgramDesign } from "../lib/types.js";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate a program design for common Anchor mistakes before emitting.
 */
export function validateDesign(design: ProgramDesign): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Account name casing
  for (const acc of design.accounts) {
    if (!/^[A-Z]/.test(acc.name)) {
      errors.push(`Account "${acc.name}" must be PascalCase`);
    }
    if (acc.fields.length === 0) {
      warnings.push(`Account "${acc.name}" has no fields`);
    }
  }

  // Instruction name casing
  for (const instr of design.instructions) {
    if (!/^[a-z]/.test(instr.name)) {
      errors.push(`Instruction "${instr.name}" must be snake_case`);
    }
    if (instr.accounts.length === 0) {
      warnings.push(`Instruction "${instr.name}" has no accounts`);
    }
  }

  // Program name
  if (!/^[a-z][a-z0-9_]*$/.test(design.name)) {
    errors.push(`Program name "${design.name}" must be snake_case`);
  }

  // Minimum viable program
  if (design.instructions.length === 0) {
    errors.push("Program must have at least one instruction");
  }
  if (design.accounts.length === 0) {
    warnings.push("Program has no account definitions — likely incomplete");
  }

  // Duplicate names
  const instrNames = design.instructions.map((i) => i.name);
  const dupeInstrs = instrNames.filter((n, i) => instrNames.indexOf(n) !== i);
  if (dupeInstrs.length > 0) {
    errors.push(`Duplicate instruction names: ${dupeInstrs.join(", ")}`);
  }

  return { valid: errors.length === 0, errors, warnings };
}
