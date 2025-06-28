// https://github.com/import-js/eslint-plugin-import/issues/2132
/* eslint-disable import/no-unresolved */

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';


export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
    // other configs...
  },
  {
    rules: {
      'comma-dangle': ['error', 'only-multiline'],
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
          'alphabetize': {
            'order': 'asc',
            'caseInsensitive': true
          },
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object'
          ]
        }
      ],
      quotes: ['error', 'single'],
      'react/react-in-jsx-scope': 'off',
    },
  },
]);
