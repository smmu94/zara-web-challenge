import eslint from "@eslint/js";
import tsparser from "@typescript-eslint/parser";
import tsplugin from "@typescript-eslint/eslint-plugin";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import js from "@eslint/js";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsparser,
    },
    plugins: {
      "typescript-eslint": tsplugin,
      react: eslintPluginReact,
      prettier: eslintPluginPrettier,
      "jsx-a11y": eslintPluginJsxA11y,
    },
    rules: {
      semi: ["error", "always"],
      indent: ["error", 2],
      quotes: ["error", "double"],
      "no-unused-vars": "error",
      "no-extra-semi": "error",
      eqeqeq: ["error", "always"],
      camelcase: "error",
      curly: ["error", "all"],
      "space-infix-ops": "error",
      "space-before-blocks": "error",
      "keyword-spacing": "error",
      "keyword-spacing": "error",
      "react/prop-types": "off",
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/interactive-supports-focus": "error",
    },
  },
  {
    settings: {
      react: {
        version: "17.0",
      },
    },
  },
];
