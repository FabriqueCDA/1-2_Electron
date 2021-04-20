import { Page } from './Page.js';

const ipc = require('electron').ipcRenderer;

class Reseaux extends Page{
    constructor(d, el){
        super(d, el);
    };
    getReseaux(){
       
    }
}
// ipc.send('maj-cache', {serv:'', f:'reseaux', methode:'GET'});
// Données échangées avec le processus principal
ipc.send('get-donnees', {serv:'', f:'reseaux', methode:'GET'});
// Réceptionner la réponse du Main
ipc.on('set-data', async (ev, d)=>{
    // Initialisation de la classe réseau et de l'écriture du contenu à partir des données reçues du Main
    const reseaux = new Reseaux(d, 'main');
});
