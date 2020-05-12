// ________________________________________________________________________________________________________________
//  Notes diverses
// ________________________________________________________________________________________________________________

//  1) req et res = paramètres d'entrée de la fonction, quand on appelle la fonction il faut les 2 valeurs req et res
//     req = request (infos liées à l'appel API, quel browser, quel url, quel IP...) res  = response (comment on renvoie la réponse)
//  3) getconnection fait appel au Middleware de app.js (demande de connection à la bdd) + fait une requete sql
//  4) res.json(err)  -> si il y a une erreur, renvoie un json avec l'erreur qu'on voit dans le terminal
//  5) else res.render -> si pas d'erreur, renvoie la vue components.ejs + renvoie un objet avec comme propriété "data" (ce qui correspond à la query au dessus)
//  6) const {id} = req.params -> paramètre donné dans l'url
//  7) cas: "SELECT * FROM component WHERE id = ?" -> le "?" est remplacé par les éléments du tableau [id] et ce "?" est 
//     une mesure de sécurité contre sql injection (= un utilisateur lamba qui envoie une commande sql via l'url et qui s'exécute sans qu'on le remarque
//  8) req body: données qui circulent lors d'une requête et qui n'est pas visible dans l'url


// ________________________________________________________________________________________________________________
//  Déclaration d'une constante "controller" qui est un objet avec la propriété de liste + constante model qui charge
// le fichier componentModel
// ________________________________________________________________________________________________________________

const controller = {};
const model = require("../model/componentModel");


// ________________________________________________________________________________________________________________
//  Controller appelle le modèle qui elle fait appel à la BDD + affiche un json si erreur et si pas d'erreur
//  fait le rendu de la page component avec comme data components (soit un tableau du résultat de la query)
// ________________________________________________________________________________________________________________

controller.list = (req, res) => {
  model.getAll(req,(err, components) => {
    if (err) {
      res.json(err);
     }
     res.render('components', {
        data: components
     });
  });
};


// ________________________________________________________________________________________________________________
//  Controller permettant de récupérer toutes les données de la table component de la BDD (lié à un ID) 
//  + afficher un rendu "components_description.ejs"
// ________________________________________________________________________________________________________________

controller.fiche = (req, res) => {
  const { id } = req.params;
    model.getById(req, id, (err, rows) => {
      if (err) {
        res.json(err);
      }
      res.render('components_description', {
        data: rows[0]
      });
    }); 
 };

 //   req.getConnection((err, conn) => {
    //    conn.query("SELECT * FROM component WHERE id = ?", [id], (err, rows) => {
    //      res.render('components_description', {
    //        data: rows[0]
    //      })
      //  });
    //  });



// ________________________________________________________________________________________________________________
//  Controllers avec une fonction permettant d'afficher certains pages
// ________________________________________________________________________________________________________________

controller.add = function (req, res) {
  res.render("components_add.ejs")};

controller.view = function (req, res) {
  res.render("components_description.ejs")};

controller.legal = function (req, res) {
  res.render("legal.ejs")};

controller.contact = function (req, res) {
  res.render("contact.ejs")};


// ________________________________________________________________________________________________________________
//  Controller permettant d'enregistrer de nouvelles données dans la table component de la BDD
//  + rediriger vers la page d'accueil
// ________________________________________________________________________________________________________________

//meme que fiche
controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
      conn.query('INSERT INTO component set ?', [data], (err, component) => {
      res.redirect('/');
    })
  })
};


// ________________________________________________________________________________________________________________
//  Controller permetant de récolter des données liées à un ID dans la table component de la BDD et d'afficher un rendu 
//  component_edit
// ________________________________________________________________________________________________________________

// meme que fiche
controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM component WHERE id = ?", [id], (err, rows) => {
      res.render('components_edit', {
        data: rows[0]
      })
    });
  });
};


// ________________________________________________________________________________________________________________
//  Controller permetant de modifier des données liées à un ID dans la table component de la BDD + rediriger vers
//  l'acceuil
// ________________________________________________________________________________________________________________


// mm chose mais +1 param
controller.update = (req, res) => {
  const { id } = req.params;
  const newComponent = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE component set ? where id = ?', [newComponent, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

// ________________________________________________________________________________________________________________
//  Controller permetant de supprimer des données liées à un ID dans la table component de la BDD
// ________________________________________________________________________________________________________________

//mm chose
controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM component WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}


// ________________________________________________________________________________________________________________
//  Le module.exports ou exports est un objet spécial qui est inclus par défaut dans chaque fichier JS de 
//  l'application Node.js. Le module est une variable qui représente le module actuel et les exports sont un objet qui 
//  sera exposé en tant que module. Ainsi, tout ce que vous attribuez à module.exports ou exports sera exposé comme un module.

//  Le module dans Node.js est une fonctionnalité simple ou complexe organisée en un ou plusieurs fichiers 
//  JavaScript qui peuvent être réutilisés dans toute l'application Node.js.
// ________________________________________________________________________________________________________________

module.exports = controller;