/** @type {import("eslint").Linter.Config} */
const config = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "prettier",
    "plugin:json/recommended",
    "plugin:storybook/recommended",
  ],
  parserOptions: {
    project: "tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["react", "prettier", "@typescript-eslint", "react-refresh"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/forbid-prop-types": "off",
    "react/button-has-type": [0],
    "jsx-a11y/label-has-associated-control": [0],
    "jsx-a11y/no-autofocus": [0],
    "no-nested-ternary": [0],
    "react/no-unused-prop-types": [0],
    "react/jsx-filename-extension": [0],
    "json/*": ["error", "allowComments"],
    "import/extensions": [0],
    "import/no-unresolved": [0],
    "import/prefer-default-export": [0],
    "no-shadow": [0],
    "no-unused-vars": [0],
    "@typescript-eslint/no-shadow": [1],
    "@typescript-eslint/no-unused-vars": [1],
    "react/require-default-props": [
      "error",
      {
        ignoreFunctionalComponents: true,
      },
    ],
    "no-bitwise": [0],
    "class-methods-use-this": [0],
    "no-underscore-dangle": [0],
    "no-async-promise-executor": [0],
    "no-void": [0],
    "@typescript-eslint/no-unsafe-member-access": [0],
    "@typescript-eslint/no-unsafe-return": [0],
    "@typescript-eslint/no-explicit-any": [0],
  },
  overrides: [
    {
      files: ["generate/**/*.ts", "generate/**/*.tsx"],
      rules: {
        camelcase: [0],
      },
    },
  ],
};

module.exports = config;
