import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
    js.configs.recommended,
    // Without this, eslint's own parser reads a .ts file as JavaScript and stops at the first type annotation.
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
        rules: {
            "sort-imports": [
                "error",
                {
                    allowSeparatedGroups: true
                }
            ]
        }
    },
    {
        // coverage/ holds jest's generated report, which carries its own eslint directives and is not ours to lint.
        ignores: ["dist/**", "coverage/**", "node_modules/"]
    }
]);
