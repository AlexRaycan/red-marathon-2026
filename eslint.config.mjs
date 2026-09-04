import eslint from '@eslint/js'
import expo from 'eslint-plugin-expo'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const sourceFiles = ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}']
const typescriptFiles = ['**/*.{ts,tsx,mts,cts}']
const reactFiles = [
  'apps/mobile/**/*.{js,jsx,ts,tsx}',
  'packages/{hooks,ui}/**/*.{js,jsx,ts,tsx}'
]
const mobileFiles = ['apps/mobile/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}']

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
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_'
        }
      ]
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
