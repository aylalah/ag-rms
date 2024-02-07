/** @type {import('eslint').Linter.Config} */
module.exports = {
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node'],
};
