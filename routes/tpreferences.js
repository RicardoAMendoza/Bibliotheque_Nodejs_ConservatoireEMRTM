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

// Modal Preferences : #blockPreferences. URL exemple: http://localhost:3000/tpreferences?id=1
router.get('/', function(req, res, next) {
  var table = "tpreferences";
  var champs = "codepreferences, nomEntreprise, nomContact, courriel, telephone,adresse, commentaire, preAdLat, preAdLng, preZoom, premKrAdLat, premKrAdLng, filePath, imgPath";
  var criteres = "1=1"; 
  if (typeof req.query.id != 'undefined'){
    criteres = "codepreferences = '"+decodeURIComponent(req.query.id)+"'"; 
    //res.render('tpreferences', { aboutFr : aboutFr});
  }
	db.trouver(criteres, champs, table, function(err, result){
    if (err) {
      res.sendStatus(err);
    } else {
      res.status(200).json(result);
    }
  });	  
}); // end service


// Modal Preferences : #blockPreferences. Function qui va garder les informations du preferences.
router.patch('/savePreferences', function(req, res) {

  var valeur = [];
  var i = 0;
  for(var champ in req.body) {
    valeur[i] = req.body[champ];
    i++;
  }
  db.storeProc("sp_save_preferences(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", valeur, function(err){
    if (err) {
      res.sendStatus(err);
    } else {
      res.sendStatus(200);
    }
  });	
}); // end save

// Modal Preferences : #blockPreferences. Function qui supprime les preferences
router.delete('/:id', function(req, res) {
  var table = "tpreferences";
  var criteres = "codepreferences="+req.params.id; 
	db.supprimer(criteres, table, function(err, result){
		if (err) {
			res.sendStatus(err);
		} else {
			res.sendStatus(200);
		}
	});	
}); // end supprimer


module.exports = router;
