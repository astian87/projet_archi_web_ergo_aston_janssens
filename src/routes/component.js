// ________________________________________________________________________________________________________________
//  Notes diverses
// ________________________________________________________________________________________________________________

// 1) Le protocole de transfert hypertexte (HTTP) est conçu pour permettre les communications entre les clients et les serveurs.
//    ici le client = le browser et le serveur = mon pc/serveur qui host l'application
// 2) Le GET est utilisé pour demander des données à une ressource spécifique (ici GET récupère des données de l'URL et les renvoie vers
//    le controller)
// 3) POST est utilisé ici pour envoyer des données vers une url puis vers le controller afin de créer/mettre à jour une 
//    ressource (BDD).
// 4) /add est la partie de l'URL qui ne varie pas et :id est un paramètre pouvant varier

// ________________________________________________________________________________________________________________
//  Déclaration de constantes
//  1) router =require(express) permet d'utiliser un framework express offrant diverses fonctionnalités 
//  2) componentController permet de renvoyer les routes vers le fichier componentController 
//     (soit les controllers de l'application)
// ________________________________________________________________________________________________________________

const router = require('express').Router();
const componentController = require('../controllers/componentController');

// ________________________________________________________________________________________________________________
//  Méthode permettant de reçevoir ou envoyer des données avec l'URL et via les controllers (ici les controllers
//  traitent les données)
// ________________________________________________________________________________________________________________

router.get('/', componentController.list);
router.post('/add', componentController.save);
router.get('/update/:id', componentController.edit);
router.post('/update/:id', componentController.update);
router.get('/delete/:id', componentController.delete);


// ________________________________________________________________________________________________________________
//  Méthode permettant de reçevoir ou envoyer des données avec l'URL et via les controllers (ici renvoie vers
//  un controller permettant d'afficher des pages)
// ________________________________________________________________________________________________________________

router.get('/ajouter', componentController.add);
router.get('/fiche/:id', componentController.fiche);
router.get('/legal', componentController.legal);
router.get('/contact', componentController.contact);


// ________________________________________________________________________________________________________________
//  Le module.exports ou exports est un objet spécial qui est inclus par défaut dans chaque fichier JS de 
//  l'application Node.js. Le module est une variable qui représente le module actuel et les exports sont un objet qui 
//  sera exposé en tant que module. Ainsi, tout ce que vous attribuez à module.exports ou exports sera exposé comme un module.

//  Le module dans Node.js est une fonctionnalité simple ou complexe organisée en un ou plusieurs fichiers 
//  JavaScript qui peuvent être réutilisés dans toute l'application Node.js.
// ________________________________________________________________________________________________________________

module.exports = router;