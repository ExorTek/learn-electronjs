const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
require('@electron/remote/main').initialize()

let MainWindow;

function createWindow () {
    MainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })
    MainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    ).then(r => console.log(r))
    MainWindow.webContents.openDevTools()
    Menu.setApplicationMenu(appMenu)
}

const appMenu = Menu.buildFromTemplate([
    {
        label: 'Open DevTools',
        click: () => {
            MainWindow.webContents.openDevTools()
        }
    }
])
app.on('ready', createWindow)
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
})