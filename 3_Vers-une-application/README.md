# Construisons une application
Nous avons vu deux façons de travailler un contenu. Dans le 'renderer' avec un routage sur des pages ou directement avec des pages HTML. Chaque nouvelle page génère, dans ce second cas, une fenêtre de navigateur (Browser). Pour avancer, nous allons affiner le projet initial et ajouter :
- des pages HTML spécifiques à l'administration des données,
- un service IPC pour le dialogue entre le processus principal et le processus secondaire (ce processus nous permettra, en passant, de limiter l'utilisation de node à un contexte moins risqué).

## Première étape
Dans votre menu, d'application, ajoutez un lien de menu vers une page HTML de votre choix. Nous allons l'utiliser pour échanger des données avec le processus principal. Si vous ne l'avez pas encore fait, [essayez ce tuto sur cette page](https://www.electronjs.org/docs/api/ipc-main). Prenez le code et faites en sorte qu'il fonctionne dans la console lorsque vous faite appel à ces fonctions.

```
// Dans le processus principal .
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // affiche "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // affiche "ping"
  event.returnValue = 'pong'
})

// Dans le processus de rendu (page web).
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // affiche "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // affiche "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```
Cette brique vous donne un matériel de base pour saisir les interactions entre les processus. Notez aussi la possibilité de passer par WebContents pour faire un send :
```
// Dans le processus principal vous pouvez utiliser pour appeler un événement sur le processus de rendu (HTML)
ipcMain.webContents.send('event-data', (ev, arg) =>{
    console.log(arg);
})
```
## Le challenge
Créez une classe qui permettra de gérer les événements IPC du processus principal. Elle devrait permettre de :
- de lire un fichier de données locales à l'application (du JSON par exemple)
- d'appeler des données externes via une requête HTTP
- d'écrire dans données dans des fichiers JSON locaux
- de gérer si l'application est connectée ou déconnectée et d'adopter une stratégie de gestion des données en conséquence.

Tenez compte des travaux fais dans l'exercice précédent et poussez la question de la sécurité si vous pouvez.

C'est un peu cossu mais pour vous aider, considérez les éléments suivants :
- net permet de faire des requêtes,
- webContents.send est attaché à la fenêtre de l'application dans le processus principal,
- l'état du réseau peut être connu de différentes manières,
- vos camarade n'est pas trop loin pour vous aider.

## L'air de rien
Vous aurez développé un système de gestion de cache permettant de faire fonctionner votre logiciel hors connexion. Si vous avez un peu de folie en vous, ajoutez un écouteur permettant de resyncrhoniser les données lorsque la connexion est retrouvée...

## Si on veut en finir
Il devrait être possible de vous passer de toutes les occurences des modules Node dans vos pages HTML du rendu (renderer).