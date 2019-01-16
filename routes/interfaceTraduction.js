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

// Modal Traduction : #blockTraduction. URL exemple: http://localhost:3000/interfaceTraduction?id=1
router.get('/', function(req, res, next) {
  var table = "qtraduction";
  var champs = "idttraduction, id_controle,module,txtfrancais,txtanglais";
  var criteres = "1=1"; 
 
  if (typeof req.query.id != 'undefined')
    criteres = "idttraduction = '"+decodeURIComponent(req.query.id)+"'";
    db.trouver(criteres, champs, table, function(err, result){
      if (err) {
        res.sendStatus(err);
      } else {
        res.status(200).json(result);
      }
    });	  
  }); // end service
  
// Modal Traduction : #blockTraduction. Function qui va garder les informations ttraduction.
router.patch('/saveTraduction', function(req, res) {

  var valeur = [];
  var i = 0;
  for(var champ in req.body) {
    valeur[i] = req.body[champ];
    i++;
  }
  db.storeProc("sp_save_traduction(?,?,?,?,?)", valeur, function(err){
    if (err) {
      res.sendStatus(err);
    } else {
      res.sendStatus(200);
    }
  });	
}); // end save

// Modal Traduction : #blockTraduction. Function qui supprime une file dans ttraduction
  router.delete('/deleteTraduction:id', function(req, res) {
    var table = "ttraduction";
    var criteres = "idttraduction="+req.params.id; 
    db.supprimer(criteres, table, function(err, result){
      if (err) {
        res.sendStatus(err);
      } else {
        res.sendStatus(200);
      }
    });	
  });// end supprimer


module.exports = router;
