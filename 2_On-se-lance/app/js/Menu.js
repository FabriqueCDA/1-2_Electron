import { menu } from '../datas.js';
import { Persistance } from './Persistance.js';
import { Rendu } from './Rendu.js';

export class Menu {

    menu; // Le menu dans son ensemble à écrire
    corps; // Stockage du corps du HTML à écrire dans la page
    rendu; // Classe utile pour rendre du contenu dans les pages

    constructor(el, c) {
        console.log('Ecriture du menu');
        this.menu = menu; // Récupérer les données du menu
        try {
            if (el) this.setMenu(el);
        } catch (er) {
            console.log("Erreur de chargement, merci de vérifier vos paramètres", er);
        }
        // Vérifier si le corps est envoyé
        try {
            if (c) this.corps = c;
        } catch (er) {
            console.log("Erreur de chargement, merci de vérifier vos paramètres", er);
        }
    };
    // Ecrire le menu dans le HTML
    setMenu(el) {
        const ul = document.createElement('ul');
        // Boucle le menu pour générer les balises
        menu.forEach(
            m => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                li.onclick = () => this.getTemplate(m);
                a.setAttribute('title', m.infos);
                a.textContent = m.nom;
                li.appendChild(a);
                ul.appendChild(li);
            }
        );
        el.appendChild(ul);
        console.log(el);
    };
    // Ecrire un template dans le DOM
    getTemplate(p) {
        console.log(p);
        /** p est un objet qui reçoit un lien (p.lien) indiquant quel fichier HTML charger dans le dossiers pages
         * C'est donc ici qu'il faut créer une fonction permettant de charger la page HTML et de l'envoyer au rendu
         * utilisez ces lignes de code pour traiter les données :
         * this.corps.innerHTML = html;
         * Persistance.page = p.alias;
         * this.rendu = new Rendu(p);
         * 
         * Récupérez le fichier en utilisant fs de NodeJs. Ca vous permettra de prendre conscience du potentiel et des problèmes de sécurité
        */
    }
}