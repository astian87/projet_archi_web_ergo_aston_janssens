//  3) getconnection fait appel au Middleware de app.js (demande de connection à la bdd) + fait une requete sql
//  7) cas: "SELECT * FROM component WHERE id = ?" -> le "?" est remplacé par les éléments du tableau [id] et ce "?" est 
//     une mesure de sécurité contre sql injection (= un utilisateur lamba qui envoie une commande sql via l'url et qui s'exécute sans qu'on le remarque

// ________________________________________________________________________________________________________________
//  Déclaration d'une constante "model" qui est un objet 
// ________________________________________________________________________________________________________________

const model = {};

// ________________________________________________________________________________________________________________
//  Modèle + différentes propriétés ayant une fonction créant une connection à la BDD + réaliser une query + callback 
//  (retourne le résultat de la query)
// ________________________________________________________________________________________________________________


model.getAll = function(req, callback){
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM component INNER JOIN category WHERE component.categorie = category.categorie', callback);
    });
  };


model.getById = function(req, id, callback){
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM component WHERE id = ?", [id], callback);
  });
};

module.exports = model;