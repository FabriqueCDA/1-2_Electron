const { net } = require('electron');
const fs = require('fs');

/**
 * Ecouteur principal pour échanger des événements avec les processus
 */
const ipc = require('electron').ipcMain;

module.exports = class GlobalCache {

    config;
    connexion = true; // Mesurer l'état de la connexion (renvoyé par les événements des ipcRenderer)
    path; // Récupérer le chemin de l'application pour écrire les fichiers
    f; // Fichier en cours pour les requêtes dans le cache
    data; // Enregistrement des données chargées sur une URL ou dans le cache
    cache; // Stockons les données chargées pour un usage immédiat

    constructor(wc, p) {
        this.path = p;
        this.cache = {};
        this.wc = wc;

        // Récupérer les données d'un serveur distant
        ipc.on('get-donnees', (ev, arg) => {
            if(arg.serv){
                this.getData(arg); // On récupère des données en ligne
            }else{
                this.getCache(arg.f); // On récupère des données en local
            }
        });
    }
    log(msg) {
        console.log(msg)
    }

    /**
     * Récupérer des données distantes ou locales
     * @param {string} serv Adresse du serveur à interroger
     * @param {*} f fin de l'adresse qui servira de nom de fichier local
     */
    getData(serv, f, methode) {
        console.log("GetCache f", f);
        this.f = f;
        console.log("GetCache serv", serv);
        const req = net.request(serv + f);

        req.on('response', (rep) => {
            // Des infos sur ce qui se passe
            console.log(`Requête global cache status : ${rep.statusCode}`);
            console.log(`Entêtes : ${JSON.stringify(rep.headers)}`);
            // Première résolution : erreur 404 sur la requête
            if (rep.statusCode == 404) {
                this.getCache(f);
            }
            // Des données sont récupérées
            rep.on('data', (d) => {
                console.log(`Données : ${d}`);
                this.data = d;
                this.wc.send('set-data', d);
            });
            // Fin du stream
            rep.on('end', () => {
                console.log('Pas de données supplémentaires');
            });

        });
        // Une erreur s'est produite dans la requête, on va voir du côté du cache
        req.on('error', (e) => {
            console.log(e);
            this.getCache(f);
        });
        // Fin de la requête
        req.end();
    }
    /**
     * Récupérer les données dans le cache en local
     */
    getCache(f) {
        console.log(f);
        // if(this.cache[f]) return this.cache[f];
        // Lecture du fichier local et attente de la réponse du serveur
        fs.readFile(`./app/assets/data/${f}.json`, 'utf-8', (err, c) => {
            if (err) {
                console.error(err)
                return
            };

            // this.data = JSON.parse(c); // Allocation des données à renvoyer
            this.data = JSON.parse(c);
            this.cache[f] = JSON.parse(c);
            this.wc.send('set-data', JSON.parse(c));
        });
    };
    /**
     * Ecrire un fichier dans le cache si la connexion est coupée ou le serveur inaccessible
     * @param {string} f fichier à réécrire dans le cache 
     * @param {string} c contenu du fichier à écrire
     */
    ecritCache(f, c) {
        fs.writeFile(`./app/assets/data/${f}.json`, c, function (err) {
            if (err) throw err;
            console.log('Le fichier a été réécrit');
        });
    }
    /**
     * Caler les entêtes en fonction de la requête
     * @param {string} m Méthode utilisée pour caler les headers
     * @returns Objet d'entête
     */
    setHeaders(m) {
        switch (m.toLowerCase()) {
            case 'post': return { 'Content-Type': 'application/json' }
            case 'put': return {}
            default: return {}
        }
    }
}