import { menu } from './datas.js';
import { Persistance } from './Persistance.js';

const fs = require('fs');

export class Menu {

    menu; // Le menu dans son ensemble à écrire
    corps; // Stockage du corps du HTML à écrire dans le main

    constructor(el, c) {
        this.menu = menu;
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
                // a.setAttribute('href', '');
                // a.setAttribute('click', `this.getTemplate('${m.lien}')`)
                li.onclick = () => this.getTemplate(m);
                a.setAttribute('title', m.infos);
                a.textContent = m.nom;
                // a.addEventListener('mousedown', this.getTemplate(m.lien));
                li.appendChild(a);
                ul.appendChild(li);
            }
        );
        el.appendChild(ul);
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
            console.log(this, Persistance.page);
        })
    }
}