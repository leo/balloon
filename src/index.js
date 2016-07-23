import path from 'path'

import {
  app,
  Tray,
  BrowserWindow
} from 'electron'

const windowSpecs = {
  height: 260,
  width: 350
}

export default class Balloon {
  constructor(options) {
    app.on('ready', this.appReady.bind(this))
    this.options = options
  }

  trayClicked() {
    const trayBounds = this.tray.getBounds()
    const middleFromLeft = trayBounds.x + (trayBounds.width / 2)
    const middleOfWindow = windowSpecs.width / 2

    this.window.setBounds({
      y: 10,
      x: middleFromLeft - middleOfWindow,
      height: windowSpecs.height,
      width: windowSpecs.width
    })

    if (this.window.isVisible()) {
      this.window.hide()
    } else {
      this.window.show()
    }
  }

  appReady() {
    const windowOptions = {
      width: windowSpecs.width,
      height: windowSpecs.height,
      frame: false,
      movable: false,
      alwaysOnTop: true,
      resizable: false,
      show: false
    }

    Object.assign(windowOptions, this.options)

    this.window = new BrowserWindow(windowOptions)

    this.window.on('blur', () => this.window.hide())
    this.window.loadURL(path.join('file://', __dirname, '/content.html'))

    const icon = path.join(__dirname, '/icons', 'iconTemplate.png')
    this.tray = new Tray(icon)

    this.tray.on('click', this.trayClicked.bind(this))
  }
}
