module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    files: ['*.ts', '*.js'],
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'eslint-comments'],
  rules: {
    'prefer-promise-reject-errors': 'warn',
    'no-underscore-dangle': 'off',
    'spaced-comment': 'off',
    'import/no-named-as-default': 'warn',
    'no-restricted-globals': 'warn',
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'import/no-cycle': 'off',
    'max-len': [
      'warn',
      {
        code: 120,
        tabWidth: 2,
        comments: 80,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    "no-restricted-syntax": "warn",
    "no-continue": "off",
    'consistent-return': 'off',
    'no-console': 'warn',
    'import/no-unresolved': 'off',
    'no-prototype-builtins': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-this-alias': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
  },
};
