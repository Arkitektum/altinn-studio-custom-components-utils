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
        plugins: { js },
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
        ignores: ["dist/**", "docs/**", "node_modules/", "**/vendor/*.js"]
    },
    {
        files: ["**/*.test.{js,ts}", "**/*.spec.{js,ts}"],
        languageOptions: {
            globals: {
                ...globals.jest
            }
        },
        rules: {
            // jest defines describe, it and expect, so the rule has nothing to go on here.
            "no-undef": "off"
        }
    }
]);
