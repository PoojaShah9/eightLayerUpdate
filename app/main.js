//import { file } from '../.cache/typescript/2.6/node_modules/@types/babel-types';
const {app, BrowserWindow, Tray, ipcMain, Menu} = require('electron');
var url = require('url');
var path = require('path');
var AutoLaunch = require('auto-launch');
// const {autoUpdater} = require("electron-updater");
const log = require('electron-log');
// window.ipcRenderer = require('electron').ipcRenderer;
let tray = null;
let win;
// SQLite
let server = require('./src/assets/server/eightLayerAppService');
const autoUpdater = require('./auto-updater');
if (require('electron-squirrel-startup')) {
  electron.app.quit();
}
var autoLauncher = new AutoLaunch({
  name: 'eight-layer-super-admin',
  path: app.getPath('exe'),
});

// autoUpdater.logger = log;
// autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

autoLauncher.enable();

// autoLauncher.disable();
autoLauncher.isEnabled()
  .then(function (isEnabled) {
    if (isEnabled) {
      return;
    }
    autoLauncher.enable();
  })
  .catch(function (err) {
    // handle error
  });

function createWindow() {

  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 1024,
    icon: `${__dirname}/src/assets/img/favicon/8-layer-logo-v3.png`,
  });
  win.loadURL(url.format({
    pathname: path.join(__dirname + '/dist/index.html'),
    protocol: 'file',
    slashes: true
  }));
//win.loadURL(`file://${__dirname}/src/index.html`)
//win.loadURL(`http://localhost:4200/login`)
  win.maximize();
  win.hide();
  tray = new Tray(__dirname + '/src/assets/img/favicon/8-layer-logo-v3.png');
  tray.setToolTip('EightLayerApp');
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  });
  var contextMenu = Menu.buildFromTemplate([{
    label: 'Quit', click: function () {
      app.isQuiting = true;
      app.quit()
    }
  }]);
  tray.setContextMenu(contextMenu);
//// uncomment below to open the DevTools.
  win.webContents.openDevTools();
  console.log("process.argv = " + process.argv0);
  global.sharedObject = {prop1: process.argv0};

  win.webContents.on('did-finish-load', () => {
    autoUpdater.init(win)
  });
// Event when the window is closed.
  win.on('closed', function () {
    win = null;
  })

}

// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
// On macOS specific close process
  if (process.platform !== 'darwin') {
    // win.hide();
    app.quit()
  }
});
app.on('activate', function () {
// macOS specific close process
  if (win === null) {
    createWindow()
  }
});

app.on('browser-window-created', function (e, window) {
  window.setMenu(null);
});

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}

app.on('ready', function () {
  // autoUpdater.checkForUpdatesAndNotify();
});

ipcMain.on('show-about-window-event', function () {
  win.show();
});
