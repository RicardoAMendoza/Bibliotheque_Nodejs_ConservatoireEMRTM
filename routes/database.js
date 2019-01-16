/*!
 * ConservatoireEMRTM.
 * Langage de programmation : nodeJS (l'installation du framework Express est requis).
 * Version 0.1
 * Original author: Andy Del Risco & Ricardo Mendoza
 * Released with the MIT License: http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2018 Andy Del Risco and Ricardo Mendoza
 * Hiver-2018
 */

var config = require('../config'); 
var database = config.connect.database;
var mysql = require('mysql');


// Fonction qui retourne les données selon les critères de recherche
// Param :  criteres (JSON Object : critères de recherche}
//			champs (JSON Object : les champs souhaités)
// 			tri  (JSON Obeject : liste de champs)
module.exports.trouver = function(criteres, champs, table, callback) {

	var connection = mysql.createConnection({
		host: config.connect.host,
		user: config.connect.user,
		password: config.connect.password,
		database: config.connect.database,
		port: config.connect.port
	 });
	 connection.connect(function(err){
		if(err){
		   //throw err;
		   callback(500,null);
		}//else{
		 //  console.log('Conexion OK');
		//}
		var sql = "SELECT "+champs+" FROM `"+table+"` WHERE "+criteres;
		//console.log(sql);
		var query = connection.query(sql, function(err, result){
			if(err){
				console.log(err);
				//console.log(result);
				callback(500,null);
				//throw err;
			}else{
				//console.log(result);
				connection.end();
				callback(null,result);					
			}
		});


	});	 
	//connection.end();	
}

// Fonction qui retourne les données selon les critères de recherche
// Param :  criteres (JSON Object : critères de recherche}
//			champs (JSON Object : les champs souhaités)
// 			tri  (JSON Obeject : liste de champs)
module.exports.supprimer = function(criteres, table, callback) {

	var connection = mysql.createConnection({
		host: config.connect.host,
		user: config.connect.user,
		password: config.connect.password,
		database: config.connect.database,
		port: config.connect.port
	 });
	 connection.connect(function(err){
		if(err){
		   //throw err;
		   callback(500,null);
		}//else{
		 //  console.log('Conexion OK');
		//}
		var sql = "DELETE FROM `"+table+"` WHERE "+criteres;
		console.log(sql);
		var query = connection.query(sql, function(err, result){
			if(err){
				console.log(err);
				//console.log(result);
				callback(500,null);
				//throw err;
			}else{
				//console.log(result);
				connection.end();
				callback(null,result);					
			}
		});


	});	 
	//connection.end();	
}

// Fonction qui retourne les données selon les critères de recherche
// Param :  criteres (JSON Object : critères de recherche}
//			champs (JSON Object : les champs souhaités)
// 			tri  (JSON Obeject : liste de champs)
module.exports.storeProc = function(sp_name, params, callback) {

	var connection = mysql.createConnection({
		host: config.connect.host,
		user: config.connect.user,
		password: config.connect.password,
		database: config.connect.database,
		port: config.connect.port
	 });
	 connection.connect(function(err){
		if(err){
		   //throw err;
		   console.log(err);
		   callback(500,null);
		}/*else{
		   console.log('Conexion OK');
		}*/

		var sql = "CALL "+sp_name;
		console.log(sql);
		var query = connection.query(sql, params, function(err, result){
			if(err){
				console.log(err);
				//console.log(result);
				callback(500,null);
				//throw err;
			}else{
				console.log(result);
				connection.end();
				callback(null,result);					
			}
		});


	});	 
	//connection.end();	
}

