module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'import', // Add the 'import' plugin to enable import-related rules
  ],
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      js: 'always',
    }],
    'prefer-arrow-callback': 'off',
  },
};
