import { Dynamique } from './Dynamique.js';
import { PAGES } from '../datas.js';
export class Rendu{

    page;
    instance;

    constructor(p){
        this.page = p;
        // this.setInstance();
        this.setInstance();
    }
    setInstance(){
        this.instance = new Dynamique(this.page.instance, PAGES[this.page.alias], this.page.el);
        console.log(this.instance);
        // this.instance.setCorps(this.page.alias, this.page.el);
        // console.log(this.instance);
    }
}