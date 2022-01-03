const { app, BrowserWindow, screen, ipcMain } = require('electron')

let win;

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    win = new BrowserWindow({
        width: width - 200,
        height: height - 100,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
        // frame: false
    })

    win.loadFile('app/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

/** Gestion des événements avec les pages */
ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.reply('asynchronous-reply', 'pong')
  })
  
ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.returnValue = 'pong'
  })