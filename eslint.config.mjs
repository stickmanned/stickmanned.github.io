import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      ".npm-cache/**",
      "tmp-handoff/**",
      "verify-npm-cache/**"
    ]
  },
  ...nextVitals,
  {
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-page-custom-font": "off",
      "react/display-name": "off"
    }
  }
];

export default eslintConfig;
