import { Personne } from './Personne.js';
export class Etudiant {

    data;
    el;

    constructor(d, el){
        this.data = d;
        this.el = el;

        this.setEtudiant();
    }
    /**
     * Définir la promotion de l'étudiant
     */
    setPromo() {

    }
    /**
     * Afficher un étudiant
     **/
    setEtudiant() {
        const ar = document.createElement('article');
        const t = document.createElement('h3');
        t.textContent = this.data.nom;

        const u = document.createElement('ul');
        u.innerHTML = `
            <li>Âge : ${this.data.age}</li>
            <li>Sexe : ${this.data.sexe}</li>
            <li>Promotion : ${this.data.promo}</li>
            <li>Entreprise : ${this.data.entreprise}</li>
            <li>Spécialités : ${this.data.specialites.toString()}</li>
        `;
        // Afficher les réseaux sociaux en plus des informations initiales
        const ul = document.createElement('ul');
        if (typeof this.data.reseaux == 'object') {
            for (let res in this.data.reseaux) {
                let li = document.createElement('li');
                li.textContent = res+' : '+this.data.reseaux[res];
            }
        }

        ar.appendChild(t);
        u.appendChild(ul);
        ar.appendChild(u);
        this.el.appendChild(ar);
    }
}