import { BuildConfig } from "happywork-node-builder";

const config: BuildConfig = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    file: "index.js",
    mini: false,
    format: "cjs"
  },
  external: []
};

export default config;
