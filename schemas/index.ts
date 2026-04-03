import { z } from "zod";

export const AccountFieldSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string(),
});

export const AccountDefSchema = z.object({
  name: z.string(),
  description: z.string(),
  fields: z.array(AccountFieldSchema),
  seeds: z.array(z.string()).optional(),
});

export const InstructionArgSchema = z.object({
  name: z.string(),
  type: z.string(),
});

export const InstructionDefSchema = z.object({
  name: z.string(),
  description: z.string(),
  args: z.array(InstructionArgSchema),
  accounts: z.array(z.string()),
  errors: z.array(z.string()).optional(),
});

export const ProgramDesignSchema = z.object({
  name: z.string(),
  description: z.string(),
  template: z.enum(["token", "staking", "vault", "nft", "governance", "custom"]),
  accounts: z.array(AccountDefSchema),
  instructions: z.array(InstructionDefSchema),
  customErrors: z.array(z.string()),
  features: z.array(z.string()),
});

export const GenerationRequestSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  programName: z.string().regex(/^[a-z][a-z0-9_]*$/, "Program name must be snake_case").optional(),
  template: z.enum(["token", "staking", "vault", "nft", "governance", "custom"]).optional(),
  outputDir: z.string().optional(),
});

// Schemas are the single source of truth for all API boundaries

