module.exports = {
  root: true,
  env: {
    node: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  extends: [
    'eslint:recommended',
  ],
  ignorePatterns: [
    'node_modules/',
  ],
  rules: {
    'prettier/prettier': 0,
    'comma-dangle': [1, 'always-multiline'],
    'eol-last': [1, 'always'],
    'key-spacing': [1, {
      'beforeColon': false,
      'afterColon': true,
      'mode': 'strict',
    }],
    'keyword-spacing': 1,
    'max-len': [1, { 'code': 80 }],
    'no-multiple-empty-lines': [1, { 'max': 1 }],
    'no-trailing-spaces': 1,
    'object-curly-spacing': [1, 'always'],
    'semi': [1, 'always'],
    'space-before-blocks': [1, 'always'],
    'space-before-function-paren': [1, {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'space-in-parens': [1, 'never'],
  },
};
