// Le menu dont nous aurons besoin
export const menu = [{
        nom: "Accueil",
        alias: 'accueil',
        instance:'Accueil',
        lien: "accueil.html",
        el:'#accueil',
        infos: "Retourner à l'accueil"
    },
    {
        nom: "Etudiants",
        alias: 'etudiants',
        lien: "etudiants.html",
        instance:'Etudiants',
        el:'#etudiants',
        infos: "Voir la liste des étudiants"
    },
    {
        nom: "Contact",
        alias: 'contact',
        lien: "contact.html",
        instance:'Contact',
        el:'#contact',
        infos: "Envoyer un message"
    }
];
export const PAGES = {
    "accueil":{
        "titre":"-] Bienvenue [-",
        "description":"Bienvenue sur le mini logiciel de gestion des étudiants",
        "lien":"",
        "datas":[{
        }]
    },
    "etudiants":{
        "titre":"-] Liste des étudiants [-",
        "description":"Une liste des étudiants de la promotion",
        "lien":"",
        "datas":[{
            nom: "Michiyo Beauduin",
            sexe: "Féminin",
            age: "36 ans",
            entreprise: "Orthalis",
            specialites: "IA",
            reseaux : {
                facebook:'',
                instagram:'',
                linkedin:'',
                snapchat:'',
                tiktok:''
            }
        },
        {
            nom: "Francisco Quintero",
            sexe: "Masculin",
            age: "42 ans",
            entreprise: "Pas encore",
            specialites: "JS, Margarita, PHP",
            reseaux : {
                facebook:'',
                instagram:'',
                linkedin:'',
                snapchat:'',
                tiktok:''
            }
        },
        {
            nom: "Romain Dalle Carbonare",
            sexe: "Masculin",
            age: "17 ans",
            entreprise: "H64",
            specialites: "Blockchain, prendre son pied",
            reseaux : {
                facebook:'',
                instagram:'',
                linkedin:'',
                snapchat:'',
                tiktok:''
            }
        },
        {
            nom: "Mohammed Chareuf",
            sexe: "Masculin",
            age: "28 ans",
            entreprise: "A venir",
            specialites: "Fight",
            reseaux : {
                facebook:'',
                instagram:'',
                linkedin:'',
                snapchat:'',
                tiktok:''
            }
        },
        {
            nom: "Jean-François Jabberwocky",
            sexe: "Masculin",
            age: "28 ans",
            entreprise: "Fabrique Numérique",
            specialites: "Oui c'est bon ça avance",
            reseaux : {
                facebook:'',
                instagram:'',
                linkedin:'',
                snapchat:'',
                tiktok:''
            }
        },
        {
            nom: "Sonia Mokkadem",
            sexe: "Féminin",
            age: "24 ans",
            entreprise: "Ca vient",
            specialites: "Animation de groupe",
            reseaux : {
                facebook:'',
                instagram:'',
                linkedin:'',
                snapchat:'',
                tiktok:''
            }
        }
    ]
    },
    "contact":{
        "titre":"-] Nous contacter [-",
        "description":"Merci de remplir les champs ci-dessous",
        "lien":"mailto:gabbadie@fabriquenumerique.fr",
        "data":[{
            mail: "simplon@fabriquenumerique.fr",
            sujet: "Merci de remplir les champs requis",
            alerte: "Attention, il manque des informations dans votre formulaire",
            ok: "Message envoyé"
        }]
    }
};