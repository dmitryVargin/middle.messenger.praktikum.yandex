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
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    files: ['*.ts', '*.js'],
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'eslint-comments', 'promise', 'unicorn'],
  rules: {
    'unicorn/no-this-assignment': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-array-reduce': 'off',
    'prefer-promise-reject-errors': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    'unicorn/no-null': 'off',
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
        code: 80,
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
    'import/no-unresolved': 'off',
    'no-prototype-builtins': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-array-for-each': 'off',
  },
};
