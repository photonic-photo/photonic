const BROWSERS = 'last 3 electron versions'

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-easings'),
    require('postcss-cssnext')({browsers: BROWSERS})
  ]
}
