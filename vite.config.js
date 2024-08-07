import { defineConfig } from "vite";
import path from "path";
import typescript from "@rollup/plugin-typescript";
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    build: {
        // No HTML entry
        rollupOptions: {
            // Specify the entry file for your library
            input: "./src/index.ts",
            output: [
                {
                    // Output format options: 'esm', 'cjs', etc.
                    format: "es", // ES module format
                    dir: "dist",
                    entryFileNames: "[name].js",
                },
            ],
            external: ["react", "react-dom", "react-hook-form", "zustand"], // Specify external dependencies here
        },
        lib: {
            entry: "src/index.ts",
            name: "@spiraai/spira-form",
            fileName: function (format) { return "spira-form.".concat(format, ".js"); },
        },
    },
    plugins: [
        typescript(), // If using TypeScript
    ]
});
