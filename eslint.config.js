import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      '*.json',
      '*.config.js',
      '*.config.ts',
      'src/constants/*.json',
      'src/locales/**/*.json',
    ],
  },
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
      'simple-import-sort': simpleImportSort,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      // Prettier Integration
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'avoid',
          bracketSameLine: true,
          bracketSpacing: true,
          singleQuote: true,
          trailingComma: 'all',
        },
      ],

      // Core Rules
      'react-hooks/exhaustive-deps': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'react/default-props-match-prop-types': 'error',
      'react/sort-prop-types': 'error',
      'prefer-template': 'error',
      'no-duplicate-imports': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'no-constant-binary-expression': 'error',
      'no-await-in-loop': 'error',
      'prefer-arrow-callback': ['error', { allowUnboundThis: false }],
      'prefer-const': 'error',
      'prefer-destructuring': 'warn',
      'prefer-spread': 'warn',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'warn',
      'dot-notation': 'error',
      eqeqeq: 'error',
      'no-alert': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-else-return': 'error',
      // 'no-nested-ternary': 'error',
      'no-var': 'error',
      'require-await': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react` related packages come first.
            ['^react', '^@?\\w'],
            // Internal packages.
            ['^(@|components)(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],

      // Formatting Rules
      'no-trailing-spaces': 'error',
      'newline-before-return': 'error',
      'eol-last': ['error', 'always'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
);
