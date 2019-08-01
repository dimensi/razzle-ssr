const path = require('path')

module.exports = {
  modify (config, { target, dev }, webpack) {
    config.resolve.alias.src = path.resolve(__dirname, './src/')
    return config
  },
}
