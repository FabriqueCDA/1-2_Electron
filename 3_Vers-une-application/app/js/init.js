import { Menu } from './classes/Menu.js';
import { Persistance } from './classes/Persistance.js';

const ipc = require('electron').ipcRenderer;

let racine;

window.addEventListener("load", function () {
    console.log('fenêtre prête');
    // Ecriture du menu
    let m = new Menu(document.querySelector('header>nav'), document.querySelector('body>main'));
});
// Exemple de vérification si nous sommes en ligne : c'est envoyé au processus principal
window.addEventListener('online', () => {
    console.log('online');
    ipc.send('statut-connexion', true);
});
// Exemple de vérification si nous sommes déconnectés : c'est envoyé au processus principal
window.addEventListener('offline', () => {
    ipc.send('statut-connexion', false);
})
ipc.send('async-racine', '');
ipc.on('get-racine', (ev, r)=>{
    console.log(r);
    racine = r;
})