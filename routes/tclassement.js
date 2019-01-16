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

// 1. URL exemple: http://localhost:3000/tclassement?id=1
// router.get('/tclassement', function(req, res, next) {
router.get('/', function(req, res, next) {
  var table = "qclassement";
  var champs = "codeclassement, nom, utilise";
  var criteres = "1=1"; 
  if (typeof req.query.id != 'undefined')
    criteres = "codeclassement = '"+decodeURIComponent(req.query.id)+"'"; 
	db.trouver(criteres, champs, table, function(err, result){
    if (err) {
      res.sendStatus(err);
    } else {
      res.status(200).json(result);
    }
  });	  
}); // end service

// Modal Classement : #blockClassement. Function qui va garder les informations du classement.
router.patch('/savClassement', function(req, res) {

  var valeur = [];
  var i = 0;
  for(var champ in req.body) {
    valeur[i] = req.body[champ];
    i++;
  }
  db.storeProc("sp_save_classement(?,?)", valeur, function(err){
    if (err) {
      res.sendStatus(err);
    } else {
      res.sendStatus(200);
    }
  });	
}); // end save

// Modal Classement : #blockClassement. Function qui supprime un classement
router.delete('/:id', function(req, res) {
  var table = "tclassement";
  var criteres = "codeclassement="+req.params.id; 
	db.supprimer(criteres, table, function(err, result){
		if (err) {
			res.sendStatus(err);
		} else {
			res.sendStatus(200);
		}
	});	
}); // end supprimer


module.exports = router;
