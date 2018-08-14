//import { file } from '../.cache/typescript/2.6/node_modules/@types/babel-types';
const { app, BrowserWindow, Tray } = require('electron')
var url = require('url');
var path = require('path');
var AutoLaunch = require('auto-launch');
let tray = null;
let win;
// SQLite
let server = require('./server/eightLayerAppService');
var autoLauncher = new AutoLaunch({
  name: 'eight-layer-super-admin',
  path: app.getPath('exe'),
});

autoLauncher .enable();

// autoLauncher.disable();


autoLauncher.isEnabled()
  .then(function(isEnabled){
    if(isEnabled){
      return;
    }
    autoLauncher.enable();
  })
  .catch(function(err){
    // handle error
  });
function createWindow () {

  // Create the browser window.
    win = new BrowserWindow({
    width: 1000,
    height: 600,
    // frame:false,
    //backgroundColor: '#fffff'
    //icon: `file:${__dirname}/src/assets/img/favicon/favicon.png`
      icon: `${__dirname}/src/assets/img/favicon/8-layer-logo-v3.png`
});
console.log("icon file path" , `${__dirname}/src/assets/img/favicon/6.jpg`)
 win.loadURL(url.format({

    pathname: path.join(__dirname + '/dist/index.html'),
    protocol:'file',
    slashes:true

 }));
//win.loadURL(`file://${__dirname}/src/index.html`)
//win.loadURL(`http://localhost:4200/login`)
win.hide();
  tray = new Tray(__dirname + '/src/assets/img/favicon/8-layer-logo-v3.png');
  tray.setToolTip('EightLayerApp');
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
//// uncomment below to open the DevTools.
 win.webContents.openDevTools()
 console.log("process.argv = "+ process.argv0);
 global.sharedObject = {prop1: process.argv0}

// Event when the window is closed.
win.on('closed', function () {
win = null
})
}
// Create window on electron intialization
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
// On macOS specific close process
if (process.platform !== 'darwin') {
app.quit()
}
})
app.on('activate', function () {
// macOS specific close process
if (win === null) {
createWindow()
}
})
app.on('browser-window-created',function(e,window) {
  window.setMenu(null);
});
