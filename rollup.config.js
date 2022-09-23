import { terser } from "rollup-plugin-terser";
export default {
  input: "src/Main.js",
  watch: {
    include: "./src/**",
    clearScreen: false,
  },
  output: {
    file: "dist/connect-it.js",
    format: "iife",
    plugins: [
      terser({
        ecma: 2020,
        mangle: { toplevel: true },
        compress: {
          module: true,
          toplevel: true,
          unsafe_arrows: true,
          drop_console: true,
          drop_debugger: true,
        },
        output: { quote_style: 1 },
      }),
    ],
  },
};
