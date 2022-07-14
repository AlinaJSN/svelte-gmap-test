module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  env: {
    es6: true,
    browser: true,
  },
  extends: [
    // then, enable whichever type-aware rules you want to use
    "eslint:recommended",
    "@beyonk/eslint-config/svelte"
  ],
  ignorePatterns: ["dist/**/*", "**/vendor/*.js"],
  plugins: ["svelte3"],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  rules: {
    // ...
  },
  settings: {
    // ...
  },
};
