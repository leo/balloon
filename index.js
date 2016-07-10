const electron = require('electron')
const path = require('path')

const app = electron.app
const Tray = electron.Tray
const BrowserWindow = electron.BrowserWindow

const windowSpecs = {
  height: 300,
  width: 350
}

app.on('ready', () => {
  const window = new BrowserWindow({
    width: windowSpecs.width,
    height: windowSpecs.height,
    frame: false,
    show: false
  })

  window.loadURL('https://github.com')

  const icon = path.join(__dirname + '/assets', 'iconTemplate.png')
  const tray = new Tray(icon)

  tray.on('click', () => {
    const trayBounds = tray.getBounds()
    const middleFromLeft = trayBounds.x + (trayBounds.width / 2)
    const middleOfWindow = windowSpecs.width / 2

    window.setBounds({
      y: 10,
      x: middleFromLeft - middleOfWindow,
      height: windowSpecs.height,
      width: windowSpecs.width
    })

    if (window.isVisible()) {
      window.hide()
    } else {
      window.show()
    }
  })
})
