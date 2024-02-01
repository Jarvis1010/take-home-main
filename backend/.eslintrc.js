module.exports = {
  env: {
    browser: false,
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: ["../.eslintrc.js"],
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
}
