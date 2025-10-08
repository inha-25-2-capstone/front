import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { react, 'react-hooks': reactHooks, import: importPlugin, 'simple-import-sort': simpleImportSort },
    languageOptions: { ecmaVersion: 2020, globals: globals.browser },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/order': 'off',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      // react-hooks recommended
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  {
    files: [
      '**/*.cjs',
      '**/*.config.{js,cjs,mjs,ts}',
      'vite.config.ts',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      // CJS 파일 지원
      sourceType: 'script',
      globals: { ...globals.node },
      // TS 설정 파일(vite.config.ts 등)도 파싱
      parser: tseslint.parser,
    },
    rules: {
      // 필요시 추가 완화 규칙…
    },
  },
])
