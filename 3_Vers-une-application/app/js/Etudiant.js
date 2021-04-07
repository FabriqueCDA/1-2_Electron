import { Personne } from './Personne.js';

export class Etudiant extends Personne{
    promo;
    specialites;
    
    constructor(n, p){
        super(n);
        this.promo = p;
    }
    /**
     * Définir la promotion de l'étudiant
     */
    setPromo(){

    }
    
}