/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  plugins: ["prettier"],
  settings: {
    "import/resolver": {
      typescript: {},
      alias: {
        map: [["@", "./src"]],
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      },
    },
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "airbnb-base",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "prettier/prettier": "error",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/extensions": [
      // 这个是解决不写后缀报错的问题
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        json: "never",
      },
    ],
    "import/prefer-default-export": ["off"], // 默认只有一个方法时，导出需要 default，关闭
    "no-plusplus": ["off"],
  },
};
