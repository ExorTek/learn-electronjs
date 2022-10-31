const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const path = require('path');
const {JsonStorage} = require("./jsonStorage");
const electronReload = require('electron-reload');
if (require('electron-squirrel-startup')) {
    app.quit();
}
let editWindow
const createEdit = async () => {
    editWindow = new BrowserWindow({
        width: 'auto',
        webPreferences: {
            preload: path.join(__dirname, 'edit.js'),
            nodeIntegration: true,
            contextIsolation: true,
        },
    });
    editWindow.on('close', () => {
        editWindow = null;
    });
    await editWindow.loadFile(path.join(__dirname, 'edit.html'));
    Menu.setApplicationMenu(null);
};
let mainWindow
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
        },
    });
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    Menu.setApplicationMenu(null);
};
app.on('ready', createWindow);
electronReload(__dirname, {});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
        editWindow = null;
    }
});
ipcMain.on('file-loaded', (event, file) => {
    const storage = new JsonStorage(file);
    const json = storage.getJson();
    return event.reply('file-loaded-reply', {path: file, json});
});
ipcMain.on('edit-button-clicked', async (event, {path, array, id}) => {
    await createEdit();
    editWindow.webContents.send('form-data', {path, array, data: array.find(item => item.id === Number(id))});
});
ipcMain.on('edit-form-submit', (event, {path, array, id, name, price, description}) => {
    const index = array.findIndex(item => item.id === Number(id));
    array[index] = {id: Number(id), name, price, description};
    const storage = new JsonStorage;
    storage.setJson(path, array);
    mainWindow.webContents.send('file-loaded-reply', {path: path, json: array, newData: true});
    editWindow.close();
    editWindow = null;
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
