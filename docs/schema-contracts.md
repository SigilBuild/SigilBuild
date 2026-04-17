# Schema Contract Between Prompt And Builder

Sigil is only useful if the model output stays constrained enough for the builder and validator to trust it. This note records the contract that should hold between generation stages.

## Required fields

- Program goal in plain language.
- Accounts with mutability, signer status, and ownership assumptions.
- Instruction arguments with stable names and scalar types.
- Events or emitted outputs when downstream clients depend on them.

## What the builder can assume

- Account names are stable once emitted.
- PDA seeds are listed in declaration order.
- Instruction side effects are stated directly instead of implied.
- Optional branches are explicit instead of buried in comments.

## Reject early when

- The same account appears under two incompatible roles.
- A field type changes across sections of the generated plan.
- An instruction needs state that is never declared.

Keeping this contract tight reduces repair work later in the CLI and validator stages.
