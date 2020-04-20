import nodeResolve from "rollup-plugin-node-resolve";
import builtins from "rollup-plugin-node-builtins";
import commonjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";
import json from "rollup-plugin-json";
import babel from "rollup-plugin-babel";
import inject from "rollup-plugin-inject";
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";

export default {
  input: "index.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  external: ["puppeteer", "telegraf", "form-data"],
  plugins: [
    // inject({
    //   include: "node_modules/form-data/**",
    //   window: "global/window",
    // }),
    builtins(),
    nodeResolve({
      browser: true,
      // preferBuiltins: false,
    }),
    // globals(),
    // commonjs({
    //   namedExports: {
    //     // left-hand side can be an absolute path, a path
    //     // relative to the current directory, or the name
    //     // of a module in node_modules
    //     // 'form-data': ['FormData']
    //   }
    // }),
    excludeDependenciesFromBundle({
      dependencies: true,
      peerDependencies: true
    }),
    json(),
    babel({
      exclude: "node_modules/**",
    }),
    // uglify(),
  ],
};
