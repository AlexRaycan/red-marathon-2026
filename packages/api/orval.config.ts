import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: 'http://localhost:4000/api/docs-json',
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
