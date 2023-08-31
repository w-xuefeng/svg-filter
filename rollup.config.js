import path from "path";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";

const getPath = (p) => path.resolve(p);

export default {
  input: "src/index.ts",
  output: {
    file: "lib/index.js",
    format: "umd",
    exports: "named",
    name: "SVGFilter",
  },
  plugins: [
    resolve({ extensions: [".js", ".jsx", ".json", ".ts", ".tsx"] }),
    commonjs(),
    json(),
    typescript({
      tsconfig: getPath("./tsconfig.json"),
      declaration: true,
    }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime",
    }),
    cleanup({ comments: "none" }),
    terser(),
  ],
};
