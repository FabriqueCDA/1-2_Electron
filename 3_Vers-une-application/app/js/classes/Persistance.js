export class Persistance {

    static racine; // Racine des fichiers
    static contexte;
    static page;

    constructor() {}

    setRacine(r) {
        console.log('Etablir une racine au projet', r);
        try {
            if (r) this.racine = r;
        } catch (er) {
            console.log("Erreur dans la donnée", er);
        }
    };
}