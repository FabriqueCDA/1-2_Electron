export class Personne{
    nom;
    femme;
    reseaux = {
        facebook:'',
        instagram:'',
        linkedin:'',
        snapchat:'',
        tiktok:''
    };
    adresse;
    constructor(...n){
        n.forEach(e => {
            this[e] = e;
        });
    }
    /**
     * Définir des éléments vers les réseaux
     */
    setReseaux(...rs){
        rs.forEach(r => this.reseaux.r = rs[r]);
    }
}