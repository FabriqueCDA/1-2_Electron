import { Etudiant } from './Etudiant.js';
import { Page } from './Page.js';

export class Etudiants extends Page{

    /**
     * 
     * @param {array} d données des étudiants
     * @param {*} el Elément dans lequel afficher les infos
     */
    constructor(d, el){
        super(d, el);

        this.setEtudiants();
    }

    setEtudiants(){
        if(Array.isArray(this.data)){
            this.data.forEach(e => {
                let etu = new Etudiant(e, this.el);
            });
        }
    }
}