const LoadableWebpackPlugin = require('@loadable/webpack-plugin')
const path = require('path')

module.exports = {
  modify (config, { target, dev }) {
    config.resolve.alias.src = path.resolve(__dirname, './src/')

    if (target === 'web') {
      const filename = path.resolve(__dirname, 'build')
      config.plugins.push(
        new LoadableWebpackPlugin({
          outputAsset: true,
          writeToDisk: { filename },
        }),
      )

      config.node = { fs: 'empty' }

      config.output.filename = dev
        ? 'static/js/[name].js'
        : 'static/js/[name].[chunkhash:8].js'

      config.optimization = Object.assign({}, config.optimization, {
        runtimeChunk: true,
        splitChunks: {
          chunks: 'all',
          name: dev,
        },
      })
    }
    return config
  },
}
