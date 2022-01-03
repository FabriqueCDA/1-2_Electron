const { app, BrowserWindow} = require('electron')

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true // Indiquer qu'on autorise l'utilisation de node (attention ça ne sera pas tenable. Il faudra corriger ça)
        },
        // frame: false
    })

    win.loadFile('app/index.html');
}
/** Application prête, on charge un  */
app.whenReady().then(createWindow);
/** Quitter l'application */
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
