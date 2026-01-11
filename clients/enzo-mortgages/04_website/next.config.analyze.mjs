import withBundleAnalyzer from '@next/bundle-analyzer'
import baseConfig from './next.config.mjs'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default bundleAnalyzer(baseConfig)
