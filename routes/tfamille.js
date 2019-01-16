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

// 1. URL exemple: http://localhost:3000/tfamille?id=1
router.get('/', function(req, res, next) {
 var table = "qfamille";
  var champs = "idfamille, codetype, nomfamille, utilise";
  var criteres = "1=1"; 
  if (typeof req.query.id != 'undefined')
    criteres = "idfamille= '"+decodeURIComponent(req.query.id)+"'"; 
	db.trouver(criteres, champs, table, function(err, result){
    if (err) {
      res.sendStatus(err);
    } else {
      res.status(200).json(result);
    }
  });	  
}); // end service

// Modal Famille : #blockFamille. Function qui va garder les informations du famille.
router.patch('/saveFamille', function(req, res) {

  var valeur = [];
  var i = 0;
  for(var champ in req.body) {
    valeur[i] = req.body[champ];
    i++;
  }
  db.storeProc("sp_save_famille(?,?,?)", valeur, function(err){
    if (err) {
      res.sendStatus(err);
    } else {
      res.sendStatus(200);
    }
  });	
}); // end save

// Modal Famille : #blockFamille. Function qui supprime une famille
router.delete('/:id', function(req, res) {
  var table = "tfamille";
  var criteres = "idfamille="+req.params.id; 
	db.supprimer(criteres, table, function(err, result){
		if (err) {
			res.sendStatus(err);
		} else {
			res.sendStatus(200);
		}
	});	
}); // end supprimer


module.exports = router;
