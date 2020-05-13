// ________________________________________________________________________________________________________________
//  Notes diverses
// ________________________________________________________________________________________________________________

//  1) path fournit de nombreuses fonctionnalités très utiles pour accéder au système de fichiers et interagir avec lui
//  2) myconnection permet de se connecter à la base de données 
//  3) mysql permet d'utiliser une BDD mysql
//  4) app permet d'utiliser express

// ________________________________________________________________________________________________________________
//  Appel de librairies avec require -> require permet d'aller chercher la bibliotheque dans node modules
//  Voir package.json pour la liste des différentes bibliotheques installées 
// ________________________________________________________________________________________________________________

const express = require('express');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();
var bodyParser = require("body-parser");


// ________________________________________________________________________________________________________________
//  Notes diverses
// ________________________________________________________________________________________________________________

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ________________________________________________________________________________________________________________
//  Permet d'importer les routes depuis leur fichier /routes/component
// ________________________________________________________________________________________________________________

const componentRoutes = require('./routes/component');


// ________________________________________________________________________________________________________________
//  Définit le port sur lequel l'application tourne -> localhost:3000 + view engine/ejs permet d'afficher des views
//  + __dirname indique le chemin absolu du répertoire contenant le fichier en cours d'exécution
// ________________________________________________________________________________________________________________

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');


// ________________________________________________________________________________________________________________
//  Permet de se connecter à une BDD mysql
// ________________________________________________________________________________________________________________


app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '0000',
  port: 3306,
  database: 'archi_web_aj'
}, 'single'));
app.use(express.urlencoded({extended: false}));


// ________________________________________________________________________________________________________________
// permet de faire le lien avec le fichier qui reprend les routes
// = point d'entrée des routes, donc toutes les url doivent commencer par / 
// ________________________________________________________________________________________________________________

app.use('/', componentRoutes);


// ________________________________________________________________________________________________________________
//  static files -> permet de rendre un dossier (Public) directement utilisable par le navigateur -> utilisation d'images et du fichier CSS
// ________________________________________________________________________________________________________________

app.use(express.static(path.join(__dirname, 'public')));


// ________________________________________________________________________________________________________________
//  Permet de lancer le serveur + afficher dans la console que le serveur tourne bien sur le port sélectionné
// ________________________________________________________________________________________________________________

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});


