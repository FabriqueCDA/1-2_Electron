import { menu } from '../datas.js';
import { Persistance } from './Persistance.js';
import { Rendu } from './Rendu.js';

const fs = require('fs');

export class Menu {

    menu; // Le menu dans son ensemble à écrire
    corps; // Stockage du corps du HTML à écrire dans le main
    rendu; // Classe utile pour rendre du contenu dans les pages

    constructor(el, c) {
        console.log('Ecriture du menu');
        this.menu = menu; // Récupérer les données du menu
        // this.rendu = new Rendu(); // Permettre le rendu des pages
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
    // Charger un template HTML
    loadTemplate() {
        console.log("template load");
    };
    // Ecrire un template dans le DOM
    getTemplate(p) {
        console.log(p);
        fs.readFile('./app/pages/' + p.lien, 'utf-8', (err, html) => {
            if (err) {
                console.error(err)
                return
            };
            console.log(html.trim(), typeof html);
            this.corps.innerHTML = html.trim();
            Persistance.page = p.alias;
            this.rendu = new Rendu(p);
            // console.log(this, Persistance.page);
        })
    }
}