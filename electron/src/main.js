'use strict'

const
  electron = require('electron'),
  path = require('path'),
  config = require('../config/electron'),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    title: config.name,
    width: 1000,
    height: 600,
    icon: path.join(__dirname, '../icons/icon.png'),
    show: false,
    backgroundColor: '#234b81',
    transparent: true,
    frame: false,
    // thickFrame: false,
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, './inject.js')
    }
  })

  mainWindow.loadURL(
    process.env.NODE_ENV === 'production' ?
      `file://${__dirname}/index.html` :
      `http://localhost:${process.env.PORT || require('../../config').dev.port}`
  )

  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'))

    let installExtension = require('electron-devtools-installer')

    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then(name => mainWindow.webContents.openDevTools())
      .catch(err => console.log('An error occurred: ', err))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
