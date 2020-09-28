module.exports = {
  root: true,
  env: {
    node: true,
    mongo: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/eslint-recommended", "plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "after-used",
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-explicit-any": [
      "warn",
      {
        ignoreRestArgs: false,
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "property",
        format: ["camelCase", "snake_case"],
      },
    ],
  },
};
