class GlobalCache{
    constructor(){
        console.log('Cache global activé');
    }
    log(msg){
        console.log(msg)
    }
    /**
     * Récuépérer le fichier de configuration
     */
    getConfig(){

    }
    /**
     * Vérifier si des données sont dans le cache (un fichier JSON local)
     */
    checkCache(){

    }
    /**
     * Récupérer les données sur le réseau
     */
    getData(){
        
    }
}
module.exports = new GlobalCache();