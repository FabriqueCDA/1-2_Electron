import { Accueil } from './Pages/Accueil.js';
import { Etudiants } from './Pages/Etudiants.js';
import { Contact } from './Pages/Contact.js';

const classes = { Accueil, Etudiants, Contact };

export class Dynamique {
    /**
     * Créer une classe dynamiquement
     * @param {string} c Nom de l'instance de la classe qui doit être créées 
     */
    constructor(c, d, i, el) {
        return new classes[c](d, i, el);
    }
}