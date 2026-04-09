import { config } from "../lib/config.js";

export function emitCargoToml(programName: string): string {
  return `[workspace]
members = [
    "programs/*"
]
resolver = "2"

[workspace.dependencies]
anchor-lang = { version = "${config.ANCHOR_VERSION}", features = ["init-if-needed"] }
anchor-spl = "${config.ANCHOR_VERSION}"

[profile.release]
overflow-checks = true
lto = "fat"
codegen-units = 1

[profile.release.build-override]
opt-level = 3
incremental = false
codegen-units = 1
`;
}

export function emitProgramCargoToml(programName: string): string {
  return `[package]
name = "${programName}"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib", "lib"]
name = "${programName}"

[dependencies]
anchor-lang = { workspace = true }
anchor-spl = { workspace = true }
`;
}

export function emitAnchorToml(programName: string): string {
  return `[toolchain]
anchor_version = "${config.ANCHOR_VERSION}"

[features]
seeds = false
skip-lint = false

[programs.${config.SOLANA_CLUSTER}]
${programName} = "11111111111111111111111111111111"

[registry]
url = "https://api.apr.dev"

[provider]
cluster = "${config.SOLANA_CLUSTER}"
wallet = "~/.config/solana/id.json"

[scripts]
test = "yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/**/*.ts"
`;
}

// ANCHOR_VERSION and SOLANA_CLUSTER are injected from config at generation time
