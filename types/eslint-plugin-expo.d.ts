interface ImportMeta {
  readonly dirname: string
}

declare module 'eslint-plugin-expo' {
  import type { ESLint } from 'eslint'

  const expo: ESLint.Plugin

  export default expo
}
