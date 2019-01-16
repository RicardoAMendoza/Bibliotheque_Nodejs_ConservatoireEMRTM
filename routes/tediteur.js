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

// 1. URL exemple: http://localhost:3000/tediteur?id=1
router.get('/', function(req, res, next) {
  var table = "qediteur";
  var champs = "codeediteur, nomediteur,codeville, nomville, utilise";
  var criteres = "1=1"; 
  if (typeof req.query.id != 'undefined')
    criteres = "codeediteur = '"+decodeURIComponent(req.query.id)+"'"; 
	db.trouver(criteres, champs, table, function(err, result){
    if (err) {
      res.sendStatus(err);
    } else {
      res.status(200).json(result);
    }
  });	  
}); // end service




// Modal Editeur : #blockEditeur. Function qui va garder les informations du editeur.
router.patch('/saveEditeur', function(req, res) {

  var valeur = [];
  var i = 0;
  for(var champ in req.body) {
    valeur[i] = req.body[champ];
    i++;
  }
  db.storeProc("sp_save_editeur(?,?,?)", valeur, function(err){
    if (err) {
      res.sendStatus(err);
    } else {
      res.sendStatus(200);
    }
  });	
}); // end save

// Modal Editeur : #blockEditeur. Function qui supprime un editeur
//router.delete('/supprimer-editeur/:id', function(req, res) {
  router.delete('/:id', function(req, res) {
    var table = "tediteur";
    var criteres = "codeediteur="+req.params.id; 
    db.supprimer(criteres, table, function(err, result){
      if (err) {
        res.sendStatus(err);
      } else {
        res.sendStatus(200);
      }
    });	
  });// end supprimer


module.exports = router;
