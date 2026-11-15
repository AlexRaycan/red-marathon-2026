import type { ConfigContext, ExpoConfig } from 'expo/config'
import 'tsx/cjs'

import { PROJECT_NAME } from '../../packages/constants/src/project.constants'

import appConfig from './app.json'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: PROJECT_NAME,
  slug: appConfig.expo.slug
})
