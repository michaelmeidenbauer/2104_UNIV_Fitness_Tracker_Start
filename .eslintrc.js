module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-useless-catch': 0,
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
    'consistent-return': 0,
  },
};
