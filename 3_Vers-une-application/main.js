const { app, BrowserWindow, Menu, screen } = require('electron');

let win;
/**
 * Ecouteur principal pour échanger des événements avec les processus
 */
const ipc = require('electron').ipcMain;
/**
 * Créer la fenêtre du logiciel
 */
function creeFenetre() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const ecrans = screen.getAllDisplays();
    ecrans.length > 1 ? ecran = ecrans[1] : ecran = ecrans[0];
    win = new BrowserWindow({
        width: width - 200,
        height: height - 100,
        x: ecran.bounds.x + 50,
        y: ecran.bounds.y + 50,
        webPreferences: {
            nodeIntegration: true
        },
        // frame: false
    });

    // Au départ, on affiche le fichier d'index pour démarrer notre application
    win.loadFile('app/index.html');
    // Evénement déclenché lorsque le DOM est chargé
    win.webContents.once('dom-ready', () => {
        // Envoyer des données à la fenêtre chargée
        win.webContents.send('set-contexte', { 'racine': app.getAppPath(), 'ev': 'did-navigate' });
    });
    /**
     * Récuperer le template de l'application et le refaire
     */
    const tpl = require('./app/js/tplMenu');
    setMenu(tpl.menu(win, __dirname));
    
    // Evénements sur la fenêtre chargée
    win.webContents.once('did-navigate', (e, url) => {
        console.log("Url Navigate", url);
        win.webContents.send('set-contexte', { 'racine': app.getAppPath(), 'ev': 'did-navigate' });

    });
    win.webContents.once('did-frame-navigate', (e, url) => {
        console.log("Url Navigate", url);
        win.webContents.send('set-contexte', { 'racine': app.getAppPath(), 'ev': 'did-frame-navigate' });

    });
    // Ouvrir les outils de débogage au démarrage
    win.webContents.openDevTools();

    /**
     * Gérer les logiques logicielles dans le traitement des données
     */
    const cache = require('./app/js/classes/GlobalCache');
    const globalCache = new cache(win.webContents, app.getAppPath());

    // Récupérer les données de configuration (à distance (premier paramètre) ou en local si pas le premier paramètre)
    globalCache.getData('', 'config', 'get');
}
/**
 * Génération de la fenêtre lorsque l'application est prête
 */
app.whenReady().then(creeFenetre);
/**
 * Evénements de création de la fenêtre
 */
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
/**
 * L'appli est initialisée, on crée la fenêtre du navigateur
 */
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        creeFenetre();
    }
});
/**
 * Réécrire le menu principal
 */
function setMenu(tpl) {
    const menu = Menu.buildFromTemplate(tpl)
    Menu.setApplicationMenu(menu);
}


/* GESTION DES EVENEMENTS EXTERNES */
// Récupérer l'état de la connexion depuis les pages Web par exemple
ipc.on('statut-connexion', function (event, bool) {
    globalCache.connexion = bool;
});

// Demande de renvoie de la racine
ipc.on('async-racine', (event, arg) => {
    console.log('racine main', app.getAppPath());
    event.reply('get-racine', app.getAppPath());
});

// Demande de renvoie de données chargées
ipc.on('get-cache', (ev, arg) => {
    globalCache.data = null;
    // Récupération des données du cache
    const d = globalCache.getCache(arg.f);

    console.log("Data await", d);

    ev.sender.send('set-data', globalCache.data);
    // win.webContents.send('set-data', globalCache.data);
});

// Mettre à jour le cache de l'application
ipc.on('maj-cache', (ev, arg) => {
    // Appliquer la mise à jour
})
