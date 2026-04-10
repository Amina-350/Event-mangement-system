import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
   languageOptions: { globals: globals.node },
    rules: {
     ...js.configs.recommended.rules,

      // Custom rules (very useful)
      "no-unused-vars": "warn",
      "no-console": "off",
      "no-undef": "error"
  }
  },

  
]);
