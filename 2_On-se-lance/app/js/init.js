import { Menu } from './classes/Menu.js';
import { Persistance } from './classes/Persistance.js';
import { Rendu } from './classes/Rendu.js';

window.addEventListener("load", function() {

    console.log("Initialisation à nouveau du fichier", Persistance.contexte);
    // Recevoir des données depuis le processus principal
    if (!Persistance.contexte) {
        console.log("Persistance", Persistance.contexte);

        const ipcRenderer = require('electron').ipcRenderer;

        ipcRenderer.on('set-contexte', (event, data) => {
            console.log(data);
            Persistance.contexte = data;
            launch();
            console.log(Persistance.contexte);
        });
    } else {
        launch();
    }

    function launch() {
        let m = new Menu(document.querySelector('header>nav'), document.querySelector('body>main'));
        // var rendu = new Rendu();
    };
});