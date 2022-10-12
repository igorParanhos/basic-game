module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'array-bracket-spacing': 'off',
    'block-spacing': ['error', 'always'],
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    camelcase: 0,
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'comma-style': [2, 'last'],
    'computed-property-spacing': 0,
    curly: 0,
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    indent: ['error', 2],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
      },
    ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'new-parens': ['error'],
    'no-case-declarations': 0,
    'no-cond-assign': 0,
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-debugger': ['warn'],
    'no-extra-semi': 1,
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': 2,
    'no-return-assign': 0,
    'no-tabs': 0,
    'no-trailing-spaces': [
      'error',
      {
        skipBlankLines: false,
      },
    ],
    'no-undef': 0,
    'no-unused-vars': 1,
    'no-var': 1,
    'no-whitespace-before-property': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'padded-blocks': [
      'error',
      {
        blocks: 'never',
        switches: 'never',
        classes: 'never',
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    'require-await': 0,
    'space-before-blocks': [
      'error',
      {
        functions: 'always',
        keywords: 'always',
        classes: 'always',
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'ignore',
      },
    ],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error'],
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false,
      },
    ],
  },
};
