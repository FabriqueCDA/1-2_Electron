# On se lance
> Compétence métier : Développer une application de type Desktop
Après le petit quickstart on va attaquer une petite application simple avec Electron*.

## Avant d'attaquer
Maintenant que vous êtes déniaisé.e.s sur le sujet, que le lancement s'est fait facilement (more or less) et que vous êtes prêt.e.s, nous allons regarder deux trois petites points théoriques ensemble : le fonctionnement en développement, les questions de sécurité et des outils spécifiques pour manipuler les fenêtres.
### Installer Electron
Bon, si c'est pas déjà fait bin... npm install -g electron
### Fonctionner en développement
Il existe différentes manières d'arriver à synchroniser votre développement avec le rendu pour faciliter son fonctionnement. Nous nous sommes arrêtés sur le module 'ELECTROMON' qui fait très bien le job.
#### Qu'est ce que c'est-il que c'est c'est ?
ELECTROMON surveille votre dossier de développement. Chaque changement induit une mise à jour du rendu.  
#### Comment ça marche ?
> Installer ELECTROMON : npm install -g electromon.
> Positionnez-vous dans votre dossier de développement et démarrez la synchro avec 'electromon (votrefichier:main).js'.
> Votre logiciel se mettra à jour lorsque le dossier de développement sera modifié.
### Les quetions de sécurité
Vous développez une application qui a accès au système. Toute erreur peut induire une corruption majeure de votre application. [Lisez cette page**](https://www.electronjs.org/docs/tutorial/security), elle présente un ensemble de bonnes pratiques. Il vous faudra les ajouter par incrémentation à votre travail. Essayez d'y revenir pour vous forger des bonnes pratiques petit à petit (allééé, jetez-y un oeil voyons, vous savez que vous en aurez besoin... ^^ On se fera un debrief ensemble pour bien comprendre les différents enjeux).
## Remettons-nous à la production... oufff...
Nous allons développer une petite application de gestion.
### Un premier processus autonome
Le travail que nous allons réaliser simulera le type de résultats que vous obtiendrez avec des systèmes de type 'one page'***. Nous allons nous le faire avec quelques ressources fournies et l'intégrer à notre projet Electron. Copiez le projet Quickstart initial et ajoutez les fichiers fournis : main.js, package.json et tout le dossier app. A partir de cette base nous allons manipuler quelques éléments basiques de Electron.
### Modifier le menu de l'application
Electron s'insère dans des environnements de bureau et utilise les outils de ceux-ci pour la gestion des fenêtres. NodeJS donne accès aux fichiers locaux. A partir de cette base, les possibilités s'ouvrent. Nous allons commencer par modifier le menu de la fenêtre.
#### Remplacer le menu initial
Tout se passe dans le fichier de l'application mainRenderer (main.js). Nous avons plusieurs stratégies, nous avons fait un choix présenté ici en quelques étapes :
- Etape 1 : établir un objet template
Il répond à un formatage dont voici un exemple :
```
[
    {
        label: 'Etudiants',
            submenu: [{
                label:'Afficher la liste',
                toolTip:'Accéder à la liste des étudiants',
                accelerator: 'CmdOrCtrl+Shift+E',
                click: async() => {
                        let f =`file://${__dirname}/app/pages/etudiants.html`;
                        win.loadURL(f);
                }
                },{
                    label: 'Editer',
                    accelerator: 'CmdOrCtrl+Shift+R',
                    click: async() => {
                        let f = `file://${__dirname}app/pages/etudiants-edite.html`;
                        await win.loadURL(f);
                    }
                },
            ]
    }
]
```
Vous avez compris le principe, un tableau avec des objets formattés dedans.

- Etape 2 : intégrer ce template à la classe [Menu](https://www.electronjs.org/docs/api/menu)
Jeter un oeil à la méthode 'buildFromTemplate' qui constitue une option take it ease.

- Etape 3 : remplacer le menu par défaut par notre nouveau menu
Jetez un oeil aussi à la méthode 'setApplicationMenu'. L'API est là pour nous, c'est chiiiile.
Normalement vous devriez avoir un nouveau menu flambant neuf dans votre fenêtre d'application.

- Etape 4 : ajouter des liens de menu
Votre menu fonctionne maintenant j'aimerai voir ajouté l'accès aux pages de gestion de contact des étudiants pour afficher leurs contacts et afficher les réseaux sociaux (vous avez les pages HTML dans le dossier 'pages') et des liens pour afficher les outils de développeur.e, quitter l'application et l'actualiser.
A vous de jouer !

#### Singularisons le menu (option : pour votre culture générale)
On peut ajouter des éléments un à un au menu si nous le souhaitons en utilisant la classe MenuItem.
### Jouons avec la fenêtre
Jetez un oeil à la classe [screen](https://www.electronjs.org/docs/api/screen) sur l'API. Elle vous permettra de caler la fenêtre sur l'écran que vous souhaitez (essayez le deuxième écran au démarrage) et de lui attribuer une taille par défaut.
Il y a aussi des options très simples avec 'frame' pour enlever les bords d'une fenêtre.
### Comprendre la structure du système (et la sécurité induite)
La singularité d'une application système c'est... le système. Toute erreur de sécurié met l'ordinateur en danger. Electron est construit sur deux niveaux importants à saisir : le processus principal et le processus de rendu. Ces processus ont à dialoguer ensemble.

> [Vérifiez d'avoir bien lu cette étape](https://www.electronjs.org/docs/tutorial/quick-start#learning-the-basics).
Nous avons aussi regroupé des images dans le dossier 'schemas' qui clarifient les fonctionement de base des processus.

Quelques liens vers l'API à garder en tête
> [les process](https://www.electronjs.org/docs/api/process)
> [Communiquer avec le processus principal](https://www.electronjs.org/docs/api/ipc-main)
> [Communiquer avec le processus secondaire](https://www.electronjs.org/docs/api/ipc-renderer)

### Echanger des informations entre processus
Vous l'avez compris, la structure d'une application Electron comprend deux niveaux de processus : le principal (main) et les rendus (renderer). Cette organisation sécurise les applis mais induit des mécanismes de dialogues entre eux. Jetons-y un oeil.
#### IpcMain & IpcRendered > Dialogue entre processus
- [IpcMain](https://www.electronjs.org/docs/api/ipc-main)
- [IpcRenderer](https://www.electronjs.org/docs/api/ipc-renderer)
Ces deux classes sont le système de base de communication entre les processus. Par exemple, ipcRenderer enverra des événements qui seront perçus par le processus principal, ipcMain. En parallèle, le processus principal enverra des informations événementielles aux pages. Nous avons donc un système basé sur les événements avec tous les matériaux et matériels pour les gérer. Ce fonctionnement est commun dans les développements logiciels.

### ... lançons le dialogue
Utilisez l'exemple de l'API pour tester les échanges de données entre processus principal et processus de rendu. [C'est ici](https://www.electronjs.org/docs/api/ipc-main).

### Petit détour sur les pages de rendu pour vous sensibiliser
- [Webcontents](https://www.electronjs.org/docs/api/web-contents)
La classe webcontents est un gestionnaire d'événements qui permet au processus principal de s'informer sur le traitement des contenus Web chargés.

### Petit détour sur les pages de rendu pour vous sensibiliser
L'étape franchie, vous vous êtes rendu compte qu'il y avait comme un petit soucis de sécurité. Pas toujours si vous vous arrangez bien mais potentiellement. Vous devriez pouvoir refactoriser votre code pour passer par un fichier preload pour s'occuper de la gestion des événèments vers les pages de rendu.
  
  
* pour les CDAs, nous pouvons vous inviter à relire la compétence Développer une application de type Desktop pour vous immerger dans le sujet. ous verrez qu'elle induit tout un ensemble de considérations sur la modélisation et la POO notamment.
** Et oui, galère, y a un paquet de trucs à lire mais vous avez vu, on vous a d'abord fait créer un truc facile pour vous amuser. On est sympas hein ?
*** One page c'est un terme d'une langue étrangère. Vous pouvez obtenir plus d'informations sur le site [suivant](https://www.1min30.com/dictionnaire-du-web/site-one-page).