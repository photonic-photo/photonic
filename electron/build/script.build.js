process.env.NODE_ENV = 'production'

if (process.argv.length > 2) {
  process.env.PLATFORM_TARGET = process.argv[2]
}

require('colors')

var
  shell = require('shelljs'),
  path = require('path'),
  fs = require('fs'),
  targetPath = path.join(__dirname, '../../dist'),
  webpackBuild = require('./webpack.builder.js')

if (!fs.existsSync(targetPath)) {
  console.error('Please build your App before packaging for Electron...'.red)
  console.error('Issue "quasar build"'.red + ' from the root folder of your project'.gray + ' to make the build then try again.'.red)
  process.exit(1)
}

webpackBuild(function () {
  shell.cp(path.join(__dirname, '../dist/electron.js'), targetPath)
  shell.cp(path.join(__dirname, '../package.json'), targetPath)
})
