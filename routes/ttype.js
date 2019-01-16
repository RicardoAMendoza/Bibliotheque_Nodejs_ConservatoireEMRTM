var express = require('express');
var router = express.Router();
var db = require('./database');
/*
router.get('/', function(req, res, next) {
    var table = "qtype";
    var champs = "codetype, type, utilise";
    var criteres = "1=1"; 
    if (typeof req.query.id != 'undefined')
      criteres = "codetype = '"+decodeURIComponent(req.query.id)+"'"; 
      db.trouver(criteres, champs, table, function(err, result){
      if (err) {
        res.sendStatus(err);
      } else {
        res.status(200).json(result);
      }
    });	  
  }); // end service

router.patch('/saveType', function(req, res) {

var valeur = [];
var i = 0;
for(var champ in req.body) {
    valeur[i] = req.body[champ];
    i++;
}
db.storeProc("sp_save_type(?,?,?)", valeur, function(err){
    if (err) {
    res.sendStatus(err);
    } else {
    res.sendStatus(200);
    }
});	
}); // end save
*/
router.get('/', function(req, res, next) {
  var table = "qtype";
  var champs = "codetype, type, utilise";
  var criteres = "1=1"; 
  if (typeof req.query.id != 'undefined')
    criteres = "codetype = '"+decodeURIComponent(req.query.id)+"'"; 
	db.trouver(criteres, champs, table, function(err, result){
    if (err) {
      res.sendStatus(err);
    } else {
      res.status(200).json(result);
    }
  });	  
});