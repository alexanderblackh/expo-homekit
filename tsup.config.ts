import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/index.ts" },
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "node20",
  platform: "neutral",
  splitting: false,
  external: ["react", "react-native", "expo-modules-core"],
});
