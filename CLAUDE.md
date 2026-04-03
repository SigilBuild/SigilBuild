# Sigil — Claude Code Guide

## What It Does

Sigil turns plain-English descriptions into production-ready Solana Anchor programs. It uses Claude as the architect inside a 4-step tool loop: select template → design accounts → design instructions → emit program.

## Commands

```bash
bun run dev                           # run CLI with live reload
sigil generate "<description>"        # generate a program
bun run test                          # run test suite
bun run typecheck                     # TypeScript strict check
bun run build                         # compile to dist/
```

## Architecture

```
cli/index.ts         CLI entry point — parses args, writes output files
agent/loop.ts        Claude agent — 4-tool design loop
agent/prompts.ts     SIGIL_SYSTEM prompt
templates/index.ts   5 base templates + keyword-based selection
builder/
  accounts.ts        Rust struct emitter + space estimator
  instructions.ts    Instruction handler + Accounts context emitter
  program.ts         Assembles all files into GenerationResult
emitter/
  toml.ts            Cargo.toml + Anchor.toml generator
  idl.ts             Anchor IDL JSON generator
validator/idl.ts     Design validation (naming, completeness)
schemas/index.ts     Zod schemas for all inputs
lib/                 Config (Zod), logger, types
tests/               Unit tests (Vitest)
examples/            Runnable examples
```

## Environment

Copy `.env.example` → `.env` and set `ANTHROPIC_API_KEY`.

## Testing

```bash
bun run test
```

Tests cover: template selection, account space estimation, Rust struct emission, instruction handler generation, design validation, IDL output.


