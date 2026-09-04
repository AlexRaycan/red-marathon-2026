import eslint from '@eslint/js'
import expo from 'eslint-plugin-expo'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const sourceExtensions = '{js,jsx,mjs,cjs,ts,tsx,mts,cts}'
const reactExtensions = '{js,jsx,ts,tsx}'
const typescriptExtensions = '{ts,tsx,mts,cts}'

const sourceFiles = [`**/*.${sourceExtensions}`]
const typescriptFiles = [`**/*.${typescriptExtensions}`]
const reactFiles = [
  `apps/mobile/src/**/*.${reactExtensions}`,
  `packages/{hooks,ui}/src/**/*.${reactExtensions}`
]
const mobileFiles = [`apps/mobile/**/*.${sourceExtensions}`]

export default defineConfig([
  globalIgnores(
    [
      '**/.expo/',
      '**/.next/',
      '**/.nuxt/',
      '**/.output/',
      '**/.turbo/',
      '**/android/',
      '**/build/',
      '**/coverage/',
      '**/dist/',
      '**/example/',
      '**/ios/',
      '**/out/'
    ],
    'Generated files'
  ),
  {
    name: 'Project linting policy',
    files: sourceFiles,
    extends: [eslint.configs.recommended],
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
      reportUnusedInlineConfigs: 'error'
    },
    rules: {
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error']
        }
      ]
    }
  },
  {
    name: 'Node configuration files',
    files: [
      '**/*.config.{js,mjs,cjs,ts,mts,cts}',
      '**/scripts/**/*.{js,mjs,cjs,ts,mts,cts}',
      'eslint.config.mjs'
    ],
    languageOptions: {
      globals: globals.node
    }
  },
  {
    name: 'TypeScript source',
    files: typescriptFiles,
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports'
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'error'
    }
  },
  {
    name: 'React source',
    files: reactFiles,
    extends: [reactHooks.configs.flat.recommended]
  },
  {
    name: 'Expo mobile runtime',
    files: mobileFiles,
    plugins: {
      expo
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals['shared-node-browser'],
        __DEV__: 'readonly',
        ErrorUtils: 'readonly'
      }
    },
    rules: {
      'expo/no-dynamic-env-var': 'error',
      'expo/no-env-var-destructuring': 'error',
      'expo/use-dom-exports': 'error'
    }
  }
])
