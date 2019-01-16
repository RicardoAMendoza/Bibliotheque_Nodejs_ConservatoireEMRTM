/*!
 * ConservatoireEMRTM.
 * Langage de programmation : nodeJS (l'installation du framework Express est requis).
 * Version 0.1
 * Original author: Andy Del Risco & Ricardo Mendoza
 * Released with the MIT License: http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2018 Andy Del Risco and Ricardo Mendoza
 * Hiver-2018
 */

var express = require('express');
var router = express.Router();
var db = require('./database');

// 5. URL exemple: http://localhost:3000/tville?id=1?
// 5. URL exemple: http://localhost:3000/tville?pays=CA
router.get('/', function(req, res, next) {
  var table = "qville";
  var champs = "codeville, nomville";
  var criteres = "1=1"; 
  if (typeof req.query.id != 'undefined')
    criteres = "codeville = '"+decodeURIComponent(req.query.id)+"'"; 
  if (typeof req.query.pays != 'undefined')
    criteres = "codepays = '"+decodeURIComponent(req.query.pays)+"'"; 
	db.trouver(criteres, champs, table, function(err, result){
    if (err) {
      res.sendStatus(err);
    } else {
      res.status(200).json(result);
    }
  });	  
}); // end service

// Modal Vill : #blockVille. Function qui va garder les informations du ville.
router.patch('/saveVille', function(req, res) {

  var valeur = [];
  var i = 0;
  for(var champ in req.body) {
    valeur[i] = req.body[champ];
    i++;
  }
  db.storeProc("sp_save_ville(?,?)", valeur, function(err){
    if (err) {
      res.sendStatus(err);
    } else {
      res.sendStatus(200);
    }
  });	
}); // end save

// Modal Ville : #blocVille. Function qui supprime une ville.
// router.delete('/supprimer-ville/:id', function(req, res) {
  router.delete('/:id', function(req, res) {
    var table = "tville";
    var criteres = "codeville="+req.params.id; 
    db.supprimer(criteres, table, function(err, result){
      if (err) {
        res.sendStatus(err);
      } else {
        res.sendStatus(200);
      }
    });	
  });// end supprimer


module.exports = router;
