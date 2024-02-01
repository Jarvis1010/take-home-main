module.exports = {
  env: {
    browser: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: ["../.eslintrc.js"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    "react/prop-types": [0],
    indent: [0],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
