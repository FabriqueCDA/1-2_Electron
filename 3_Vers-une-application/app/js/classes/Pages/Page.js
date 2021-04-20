export class Page{

    data;
    el;
    constructor(d, el){
        this.infos = d;
        this.data = this.infos.datas;
        console.log(d);
        this.el = document.querySelector(el);

        this.setPage();
    }
    /**
     * Générer l'entête de la page
     */
    setPage(){
        const head = document.createElement("header");
        const h2 = document.createElement("h2");
        h2.textContent = this.infos.titre;
        const bloc = document.createElement("blockquote");
        bloc.textContent = this.infos.description;

        head.appendChild(h2);
        head.appendChild(bloc);
        this.el.appendChild(head);
    }
}