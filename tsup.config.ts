import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts", "cli/index.ts"],
  format: ["esm"],
  target: "node22",
  outDir: "dist",
  clean: true,
  sourcemap: true,
  dts: true,
  splitting: false,
  treeshake: true,
});

