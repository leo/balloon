const electron = require('electron')
const path = require('path')

const app = electron.app
const Tray = electron.Tray
const BrowserWindow = electron.BrowserWindow

const windowSpecs = {
  height: 260,
  width: 350
}

let tray,
    window

app.on('ready', () => {
  window = new BrowserWindow({
    width: windowSpecs.width,
    height: windowSpecs.height,
    frame: false,
    movable: false,
    alwaysOnTop: true,
    resizable: false,
    show: false
  })

  window.on('blur', () => window.hide())
  window.loadURL('file://' + __dirname + '/content.html')

  const icon = path.join(__dirname + '/icons', 'iconTemplate.png')
  tray = new Tray(icon)

  tray.on('click', trayClicked)
})

const trayClicked = () => {
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
}
