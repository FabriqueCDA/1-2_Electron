import { Menu } from './Menu.js';
import { Persistance } from './Persistance.js';

window.addEventListener("load", function() {

    console.log("Initialisation à nouveau du fichier", Persistance.contexte);
    // Recevoir des données depuis le processus principal
    if (!Persistance.contexte) {
        // C'est ICI que nous allons récupérer des infos sur l'appli avec ipcRenderer
    } else {
        launch();
    }

    function launch() {
        let m = new Menu(document.querySelector('header>nav'), document.querySelector('body>main'));
    };
});