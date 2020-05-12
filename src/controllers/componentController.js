// ________________________________________________________________________________________________________________
//  Notes diverses
// ________________________________________________________________________________________________________________

//  1) req et res = paramètres d'entrée de la fonction, quand on appelle la fonction il faut les 2 valeurs req et res
//     req = request (infos liées à l'appel API, quel browser, quel url, quel IP...) res  = response (comment on renvoie la réponse)
//  2) res.json(err)  -> si il y a une erreur, renvoie un json avec l'erreur qu'on voit dans le terminal
//  3) else res.render -> si pas d'erreur, renvoie la vue components.ejs + renvoie un objet avec comme propriété "data" (ce qui correspond à la query au dessus)
//  4) const {id} = req.params -> paramètre donné dans l'url
//  5) req.body: données qui circulent lors d'une requête et qui n'est pas visible dans l'url


// ________________________________________________________________________________________________________________
//  Déclaration d'une constante "controller" qui est un objet avec la propriété de liste + constante model qui charge
//  le fichier componentModel
// ________________________________________________________________________________________________________________

const controller = {};
const model = require("../model/componentModel");


// ________________________________________________________________________________________________________________
//  Controller appelle le model qui fait appel à la BDD et renvoie des données + affiche un json si erreur et si pas d'erreur
//  fait le rendu de la page component avec comme data components (soit un tableau du résultat de la query du model)
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
//  Controller appelle le model qui fait appel à la BDD et renvoie des données + affiche un json si erreur et si pas d'erreur
//  fait le rendu de la page component_description avec comme data rows 0 (soit un tableau du résultat de la query du model)
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

// ________________________________________________________________________________________________________________
//  Controller avec une fonction permettant d'afficher certaines pages
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
//  Controller appelle le model qui fait appel à la BDD et enregistre des données 
//  + renvoie la page "/" (soit la page d'accueil)
// ________________________________________________________________________________________________________________

controller.save = (req, res) => {
  const data = req.body;
    model.addProduct(req, data, (err, rows) => {
      res.redirect('/');
});
};


// ________________________________________________________________________________________________________________
//  Controller appelle le model qui fait appel à la BDD et renvoie des données
//  + fait le rendu de la page component_edit (page de modification affichant les données liées au produit) 
//  avec comme data rows 0 (soit un tableau du résultat de la query)
// ________________________________________________________________________________________________________________

controller.edit = (req, res) => {
  const { id } = req.params;
  model.getByIdMod(req, id, (err, rows) => {
    res.render('components_edit', {
      data: rows[0]
    });
  });
};


// ________________________________________________________________________________________________________________
//  Controller appelle le model qui fait appel à la BDD et modifie des données
//  + redirige vers la page "/" (soit la page d'accueil)
// ________________________________________________________________________________________________________________

controller.update = (req, res) => {
  const { id } = req.params;
  const newComponent = req.body;
  model.updateProduct(req, newComponent, id, (err, rows) => {
    res.redirect('/');
  });
  };


// ________________________________________________________________________________________________________________
//  Controller appelle le model qui elle fait appel à la BDD et supprime des données 
//  + redirige vers la page "/" (soit la page d'accueil)
// ________________________________________________________________________________________________________________

controller.delete = (req, res) => {
  const { id } = req.params;
  model.deleteProduct(req, id, (err, rows) => {
      res.redirect('/');
   });
  };


// ________________________________________________________________________________________________________________
//  module.exports = controller; -> soit controller = require("../model/componentModel") -> importe et charge un fichier; et 
//  require("../model/componentModel") = controller soit = {} (un objet);
// ________________________________________________________________________________________________________________

module.exports = controller;