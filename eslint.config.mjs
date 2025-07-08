import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

import {fixupConfigRules, fixupPluginRules} from "@eslint/compat";

import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended,

  // ...fixupConfigRules (compat.extends("airbnb")),
  // ...compat.plugins("airbnb"),
  // ...fixupPluginRules(compat.plugins("eslint-plugin-anvy-plugin")),

    // Фикс старых конфигов для версии 9+
  ...fixupConfigRules(compat.config({

    env: {
      browser: true,
      es2021: true,
      jest: true,
    },
    extends: [
      'plugin:react/recommended',
      'airbnb',
      // 'plugin:i18next/recommended',
      // 'plugin:storybook/recommended',
      // 'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: [
      'react',
      // '@typescript-eslint',
      // 'i18next',
      'react-hooks',
        'anvy-plugin',
      // 'ulbi-tv-plugin',
      // 'unused-imports',
    ],
  })),

  {

    rules: {
      'react/jsx-indent': [2, 4],
      'react/jsx-indent-props': [2, 4],
      indent: [2, 4],
      'react/jsx-filename-extension': [
        2,
        { extensions: ['.js', '.jsx', '.tsx'] },
      ],
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'warn',
      'react/function-component-definition': 'off',
      'no-shadow': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-underscore-dangle': 'off',
      'max-len': ['error', { ignoreComments: true, code: 140 }],
      'consistent-return': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'no-nested-ternary': 'off',
      'no-param-reassign': 'off',
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies,
      'no-undef': 'off',
      'no-plusplus': 'off',
      'no-await-in-loop': 'off',
      'no-unused-expressions': 'off',
      'anvy-plugin/fsd-import-checker': 'error'

      // 'i18next/no-literal-string': ['warn', { markupOnly: true }],

    }
  }
];

