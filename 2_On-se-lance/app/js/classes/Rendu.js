import { Dynamique } from './Dynamique.js';
import { PAGES } from '../datas.js';
export class Rendu{

    page; // Page dans laquelle écrire un contenu
    instance; // Instance de la classe initialisée

    constructor(p){
        this.page = p;
        // this.setInstance();
        this.setInstance();
    }
    // Créer une instance de classe à partir de son nom
    setInstance(){
        this.instance = new Dynamique(this.page.instance, PAGES[this.page.alias], this.page.el);
        console.log(this.instance);
    }
}