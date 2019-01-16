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


// 1. URL exemple: http://localhost:3000/tusers?id=1
router.get('/', function(req, res, next) {
  var table = "qusers";
  var champs = "coduser, password, nom, prenom,admin,inactif,utilise";
  var criteres = "1=1"; 
  if (typeof req.query.id != 'undefined')
    criteres = "coduser = '"+decodeURIComponent(req.query.id)+"'"; 
	db.trouver(criteres, champs, table, function(err, result){
    if (err) {
      res.sendStatus(err);
    } else {
      res.status(200).json(result);
    }
  });	  
}); // end service


//Modal Utilisateurs : #blockUtilisateurs. Function qui va garder les informations d'Utilisateur.
router.patch('/saveUsers', function(req, res) {

  var valeur = [];
  var i = 0;
  for(var champ in req.body) {
    valeur[i] = req.body[champ];
    i++;
  }
  db.storeProc("sp_save_users(?,?,?,?,?,?)", valeur, function(err){
    if (err) {
      res.sendStatus(err);
    } else {
      res.sendStatus(200);
    }
  });	
}); // end save

//Modal Utilisateurs : #blockUtilisateurs. Function qui supprime un Utilisateur.
router.delete('/:id', function(req, res) {
  var table = "tusers";
  var criteres = "coduser="+req.params.id; 
  console.log("criteres = "+criteres);
  // por que id es string?
	db.supprimer(criteres, table, function(err, result){
		if (err) {
			res.sendStatus(err);
		} else {
      res.sendStatus(200);
      alert("Mise à jour réussi");
		}
	});	
}); // end supprimer


module.exports = router;
