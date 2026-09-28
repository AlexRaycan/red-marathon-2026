import { loadEnvFile } from 'node:process'
import { defineConfig } from 'orval'

loadEnvFile(new URL('./.env', import.meta.url))

const baseUrl = process.env.BASE_URL
if (!baseUrl) throw new Error('BASE_URL не задан в packages/api/.env')

export default defineConfig({
  api: {
    input: `${baseUrl}/api/docs-json`,
    output: {
      mode: 'tags-split',
      target: './src/generated/endpoints.ts',
      schemas: './src/generated/model',
      client: 'react-query',
      clean: true,
      override: {
        mutator: {
          path: './src/http.ts',
          name: 'http'
        }
      }
    }
  }
})
