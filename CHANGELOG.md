# Changelog

## [1.0.0] — 2026-04-03

### Added
- Claude-powered 4-step agent loop: select template → design accounts → design instructions → emit program
- 5 built-in templates: staking, vault, token, nft, governance
- Keyword-based template selection with override support
- Rust struct emitter with automatic space calculation
- Instruction handler + Accounts context emitter
- Anchor IDL JSON generator
- Cargo.toml + Anchor.toml emitter
- Design validator: naming conventions, completeness, duplicate detection
- CLI: `sigil generate "<description>"`
- Zod schema validation on all inputs and config
- Full test suite: templates, builders, validator, IDL emitter
- Docker support for containerized generation
