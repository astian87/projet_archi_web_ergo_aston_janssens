// ________________________________________________________________________________________________________________
//  Notes diverses
// ________________________________________________________________________________________________________________

//  1) getconnection fait appel au Middleware de app.js (demande de connection à la bdd) + fait une requete sql
//  2) cas: "SELECT * FROM component WHERE id = ?" -> le "?" est remplacé par les éléments du tableau [id] et ce "?" est 
//     une mesure de sécurité contre sql injection (= un utilisateur lamba qui envoie une commande sql via l'url et qui s'exécute sans qu'on le remarque

// ________________________________________________________________________________________________________________
//  Déclaration d'une constante "model" qui est un objet 
// ________________________________________________________________________________________________________________

const model = {};

// ________________________________________________________________________________________________________________
//  *****Modèle + différentes propriétés ayant une fonction créant une connection à la BDD + réaliser une query + callback 
//  *****(retourne le résultat de la query)
// ________________________________________________________________________________________________________________


// ________________________________________________________________________________________________________________
//  Modèle permettant de récolter toutes les données 
// ________________________________________________________________________________________________________________

model.getAll = function(req, callback){
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM component INNER JOIN category WHERE component.categorie = category.categorie', callback);
    });
  };


// ________________________________________________________________________________________________________________
//  Modèle permettant de récolter toutes les données liées à un ID
// ________________________________________________________________________________________________________________

model.getById = function(req, id, callback){
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM component WHERE id = ?", [id], callback);
  });
};


// ________________________________________________________________________________________________________________
//  Modèle permettant d'ajouter des données
// ________________________________________________________________________________________________________________

model.addProduct = function(req, data, callback){
  req.getConnection((err, conn) => {
    conn.query('INSERT INTO component set ?', [data], callback);
  });
};


// ________________________________________________________________________________________________________________
//  Modèle permettant de récolter des données pour après effectuer une modification
// ________________________________________________________________________________________________________________

model.getByIdMod = function(req, id, callback){
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM component WHERE id = ?", [id], callback); 
  });
};


// ________________________________________________________________________________________________________________
//  Modèle permettant de modifier des données
// ________________________________________________________________________________________________________________

model.updateProduct = function(req, newComponent, id, callback){
  req.getConnection((err, conn) => {
    conn.query("UPDATE component set ? where id = ?", [newComponent, id], callback); 
  });
};


// ________________________________________________________________________________________________________________
//  Modèle permettant de supprimer des données
// ________________________________________________________________________________________________________________

model.deleteProduct = function(req, id, callback){
  req.getConnection((err, conn) => {
    conn.query("DELETE FROM component WHERE id = ?", [id], callback); 
  });
};



module.exports = model;