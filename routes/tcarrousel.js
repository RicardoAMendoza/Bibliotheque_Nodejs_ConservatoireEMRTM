var express = require('express');
var router = express.Router();
var db = require('./database');
/*
router.get('/tcarrousel', function(req, res, next) {
    var table = "tcarrousel";
    var champs = "codecarrousel, imgNom";
    var criteres = "1=1"; 
   
    if (typeof req.query.id != 'undefined')
      criteres = "codecarrousel = '"+decodeURIComponent(req.query.id)+"'";
      db.trouver(criteres, champs, table, function(err, result){
        if (err) {
          res.sendStatus(err);
        } else {
          res.status(200).json(result);
        }
      });	  
    }); // end service*/