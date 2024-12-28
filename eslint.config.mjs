// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Inherit from Next's recommended configs and TS config:
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Now specify your custom overrides:
  {
    rules: {
      // Turn off the rule that complains about @ts-ignore, @ts-nocheck, etc.
      "@typescript-eslint/ban-ts-comment": "off",

      // Turn off the rule complaining about `any`
      "@typescript-eslint/no-explicit-any": "off",

      // Turn off the rule complaining about <img> usage
      "@next/next/no-img-element": "off",

      // Turn off complaining about unescaped quotes/apostrophes
      "react/no-unescaped-entities": "off",

      // If you want to suppress warnings about using <Link> from 'next/link' vs anchor:
      // "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default eslintConfig;
