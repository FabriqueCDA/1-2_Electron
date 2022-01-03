import { Menu } from './classes/Menu.js';
import { Persistance } from './classes/Persistance.js';
import { Rendu } from './classes/Rendu.js';

/** Lorsque l'application est chargée */
window.addEventListener("load", function() {

    // Recevoir des données depuis le processus principal
    if (!Persistance.racine) {

        /** C'est ici que ça va se passer. Il va falloir :
         * récupérer ipcRenderer de Electron
         * Créer un écouteur IpcRenderer on('set-contexte', ...) pour fixer les données statiques dans Persistance notamment la racine
         * Lancer la fonction launch une fois que c'est fait
         */
    } else {
        launch();
    }
    /** Création du menu interne */
    function launch() {
        let m = new Menu(document.querySelector('header>nav'), document.querySelector('body>main'));
    };
});