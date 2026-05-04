import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
    globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
        localStorage: 'readonly',   // add this
        setTimeout: 'readonly',     // add this
        clearTimeout: 'readonly',   // add this too (you'll need it)
        global: 'readonly',         // add this
        },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // React
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',

      // General
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-undef': 'error',
    },
    settings: {
      react: { version: 'detect' }
    }
  }
]