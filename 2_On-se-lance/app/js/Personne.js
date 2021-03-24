export class Personne{
    nom;
    reseaux = {
        facebook:'',
        instagram:'',
        linkedin:'',
        snapchat:'',
        tiktok:''
    };
    adresse;
    constructor(n){
        this.n = n;
    }
    /**
     * Définir des éléments vers les réseaux
     */
    setReseaux(...rs){
        rs.forEach(r => this.reseaux.r = rs[r]);
    }
}