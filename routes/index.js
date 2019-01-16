
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
/*Uploader*/
var app = express();
var path = require('path');
var formidable = require('formidable');

/*File System*/
var fs = require('fs');
var connect = false;
var prenomUtiilisateur;
app.use(express.static(path.join(__dirname, 'public')));


/*SQL*/
var db = require('./database');
/*PDF*/
var PDFDocument = require('pdfkit');
/*PDF Table*/
var PdfTable = require('voilab-pdf-table');
var langueJson, idfiltre="", dataDocs=[];
/*@google/maps*/
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDPxtROhIF078MS4pvyH3Z0ad1tMeSn3Sk'
});

// GET Uploader.

router.get('/index', function(req, res, next) {
res.render('index', { title: 'Uploader' });
});

// URL exemple: http://localhost:3000/admin
//router.get('/', function(req, res, next) {
router.get('/admin', function(req, res, next) {
  // chercher le path dans la table tpreferences
  //if(connect) {
   if (typeof req.query.u == 'undefined')
     res.render('validUser');
   else  {
     if(req.query.u!='') {
       getFilesPath();
       getImgPath();
       res.render('admin', { title: 'Bienvenue au Conservatoire Culinaire', page : "admin", login : connect , prenom : prenomUtiilisateur});
       //console.log("Welcome  : "+prenomUtiilisateur );
     }else
       res.render('login', { title: 'login' });
   }
 });

 // URL exemple: http://localhost:3000/public
router.get('/', function(req, res, next) {
  //router.get('/public', function(req, res, next) {
  // chercher le path dans la table tpreferences
  getFilesPath();
  getImgPath();
  res.render('admin', { title: 'Bienvenue au Conservatoire Culinaire', page : "public" });
});

// init upload pdf and image
// Var pour charger le fichier (upload function)
var filesPath;
//var pour charge l'imagen dans carrousel
var imgPath;


// service pour cacher le path de dossier pdf
router.get('/pdf/:filename', function(req, res) {
  var data = fs.readFileSync(filesPath+'/'+req.params.filename);
  res.write(data);
  res.end();
});

// service pour cacher le path de dossier img
router.get('/img/:Imgname', function(req, res) {
  var data = fs.readFileSync(imgPath+'/'+req.params.filename);
  res.write(data);
  res.end();
});

// chercher le path dans la table tpreferences "filesPath"
function getFilesPath(){
  var table = "tpreferences";
  var champs = "filePath";
  var criteres = "1=1"; 
  db.trouver(criteres, champs, table, function(err, result){

    if (err) {
      res.sendStatus(err);
    } else {
     var pdfFile = result[0].filePath;
     // './public/'+pdfFile; -> dossier avec le document dans le server
     filesPath='./public/'+pdfFile;
    }
  });	      
} // end getFilesPath();

// chercher le path dans la table tcarrousel "imgPath"
function getImgPath(){
  var table = "tpreferences";
  var champs = "imgPath";
  var criteres = "1=1"; 
  db.trouver(criteres, champs, table, function(err, result){

    if (err) {
      res.sendStatus(err);
    } else {
     var imgLocation = result[0].imgPath;
     // './public/'+imgLocation; -> dossier avec l'imagen dans le server
     imgPath='./public/'+imgLocation ;
    }
  });	      
} // end getImgPath();


// Uploader : dosier pdf
router.post('/upload/:ancienFile', function(req, res){
  // create an incoming form object
  var form = new formidable.IncomingForm();
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  // form.uploadDir = path.join(__dirname, '/uploads');
  form.uploadDir = filesPath; // Andy
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    // fs -> file system module
    // fs.rename(oldPath, newPath, callback)
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    // effecer l'ancient dossier
    if (req.params.ancienFile!="x") {
      fs.unlink(filesPath+'/'+req.params.ancienFile, function(err){
        // fs.unlink('./public/uploads/Express.pdf', function(err){
           if(err){
             console.log(err);
          }else{
             console.log(req.params.ancienFile + "  has been removed")
           }
        }); // end fs.unlink(path, callback)    
    }
  });
  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });
  // parse the incoming request containing the form data
  form.parse(req);
}); // end uploader  : dosier pdf

// Uploader : dosier img  
//router.post('/uploadImg/:dossierImg', function(req, res){
 router.post('/uploadImg', function(req, res){
  // create an incoming form object
  var form = new formidable.IncomingForm();
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  // form.uploadDir = path.join(__dirname, '/uploads');
  form.uploadDir = imgPath; // Andy
  console.log(form.uploadDir);
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    // fs -> file system module
    // fs.rename(oldPath, newPath, callback)
    fs.rename(file.path, path.join(form.uploadDir, file.name));
/*
    if (req.params.ancienFile!="x") {
      fs.unlink(imgPath+'/'+req.params.ancienFile, function(err){
        // fs.unlink('./public/uploads/Express.pdf', function(err){
           if(err){
             console.log(err);
          }else{
             console.log(req.params.ancienFile + "  has been removed")
           }
        }); // end fs.unlink(path, callback)    
    }
    */
  });
  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });
  // parse the incoming request containing the form data
  form.parse(req);
}); // end uploader  : dosiers pdf

router.get('/valid', function(req, res, next) {
  var table = "qusers";
  var champs = "coduser, password, nom, prenom,admin,inactif,utilise";
  var criteres = "1=1"; 
  if (typeof req.query.id != 'undefined')
    criteres = "coduser = '"+decodeURIComponent(req.query.id)+"'"; 
	db.trouver(criteres, champs, table, function(err, result){
    if (err) {
      res.sendStatus(err);
    } else {
      var rep={};
      if ((result.length>0) && (req.query.pwd == result[0].password)){
        rep.valid = true;
        prenomUtiilisateur = result[0].prenom;
      }
      else {rep.valid = false; }
      connect = rep.valid;
      res.status(200).json(rep);
    }
  });	  
}); // end service

router.get('/deconnexion', function(req, res) {
  // chercher le path dans la table tpreferences
     connect = false; 
     prenomUtiilisateur="";
     //res.render('login', { title: 'login' });
     res.status(200).json({login:connect});
     console.log("Bye  : "+prenomUtiilisateur );
 });

// 2. URL exemple: http://localhost:3000/tpays?id=1
router.get('/tpays', function(req, res, next) {
  var table = "tpays";
  var champs = "codepays, nompays";
  var criteres = "1=1"; 
  if (typeof req.query.id != 'undefined')
    criteres = "codepays = '"+decodeURIComponent(req.query.id)+"'"; 
	db.trouver(criteres, champs, table, function(err, result){
    if (err) {
      res.sendStatus(err);
    } else {
      res.status(200).json(result);
    }
  });	  
});

// 3. URL exemple: http://localhost:3000/ttype?id=1
router.get('/ttype', function(req, res, next) {
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

router.patch('/saveType', function(req, res) {

  var valeur = [];
  var i = 0;
  for(var champ in req.body) {
    valeur[i] = req.body[champ];
    i++;
  }
  db.storeProc("sp_save_type(?,?)", valeur, function(err){
    if (err) {
      res.sendStatus(err);
    } else {
      res.sendStatus(200);
    }
  });	
}); // end save

router.delete('/ttype/:id', function(req, res) {
  var table = "ttype";
  var criteres = "codetype='"+req.params.id+"'"; 
  //var criteres = 'codetype="'+req.params.id+'"'; codeL
	db.supprimer(criteres, table, function(err, result){
		if (err) {
			res.sendStatus(err);
		} else {
			res.sendStatus(200);
		}
	});	
}); // end supprimer

// start etat
// 1 URL exemple: http://localhost:3000/tetat?id=1
router.get('/tetat', function(req, res, next) {

  var table = "qetat";
  var champs = "codeetat, etat, utilise";
  var criteres = "1=1"; 
  if (typeof req.query.id != 'undefined')
    criteres = "codeetat = '"+decodeURIComponent(req.query.id)+"'"; 
	db.trouver(criteres, champs, table, function(err, result){
    if (err) {
      res.sendStatus(err);
    } else {
      res.status(200).json(result);
    }
  });	  
});

router.patch('/saveEtat', function(req, res) {

  var valeur = [];
  var i = 0;
  for(var champ in req.body) {
    valeur[i] = req.body[champ];
    i++;
  }
  db.storeProc("sp_save_etat(?,?)", valeur, function(err){
    if (err) {
      res.sendStatus(err);
    } else {
      res.sendStatus(200);
    }
  });	
}); // end save

router.delete('/tetat/:id', function(req, res) {
  var table = "tetat";
  var criteres = "codeetat='"+req.params.id+"'"; 
  //var criteres = 'codetype="'+req.params.id+'"'; 
	db.supprimer(criteres, table, function(err, result){
		if (err) {
			res.sendStatus(err);
		} else {
			res.sendStatus(200);
		}
	});	
}); // end supprimer

// 4.a URL Get documents : Service du filtre
router.get('/getdocuments', function(req, res, next) {
  res.status(200).json(dataDocs);
});

// 4.b URL exemple: http://localhost:3000/qdocuments?var=0&type=L&title=XXX
router.get('/qdocuments', function(req, res, next) {

    var table = "qdocuments";
    var champs = "* ";
    var criteres = "1=1 "; 

    if (typeof req.query.id != 'undefined')
      criteres = criteres+" and iddoc = '"+decodeURIComponent(req.query.id)+"'"; 
    
    if (typeof req.query.type != 'undefined')
      criteres = criteres+" and codetype = '"+decodeURIComponent(req.query.type)+"'"; 

    if (typeof req.query.title != 'undefined')
      criteres = criteres+" and title like '%"+decodeURIComponent(req.query.title)+"%'"; 
  
    if (typeof req.query.auteur != 'undefined')
      criteres = criteres+" and codeauteur = "+decodeURIComponent(req.query.auteur); 

    if (typeof req.query.editeur != 'undefined')
      criteres = criteres+" and codeediteur = "+decodeURIComponent(req.query.editeur); 

    if (typeof req.query.isbn != 'undefined')
      criteres = criteres+" and isbn like '%"+decodeURIComponent(req.query.isbn)+"%'"; 

    if (typeof req.query.etat != 'undefined')
      criteres = criteres+" and codeetat = "+decodeURIComponent(req.query.etat); 
    
    idfiltre = criteres;  
    db.trouver(criteres, champs, table, function(err, result){
      if (err) {
        res.sendStatus(err);
      } else {
        if (typeof req.query.id == 'undefined')
          dataDocs = result;
        res.status(200).json(result);
      }
    });	  
});

// 5. Save document
router.patch('/saveDocument', function(req, res) {
      var valeur = [];
      var i = 0;
      for(var champ in req.body) {
        valeur[i] = req.body[champ];
        i++;
      }
		  db.storeProc("sp_save_documents(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", valeur, function(err){
			  if (err) {
				  res.sendStatus(err);
			  } else {
				  res.sendStatus(200);
			  }
		  });	
  });

// 6. URL exemple: http://localhost:3000/ttraduction?lan=fr&module=admin
router.get('/ttraduction', function(req, res, next) {
  var table = "qtraduction";
  //var champs = "idttraduction, id_controle,module,txtfrancais,txtanglais";
  var champs = "id_controle ,";
  var criteres = "1=1"; 
  var langue = "";

    if (typeof req.query.lan != 'undefined')
      if (req.query.lan =='EN')
        langue = "txtanglais as texte"; 
      else
        langue = "txtfrancais as texte";
    else
      langue = "txtfrancais as texte"; 

      champs = champs + langue

  if (typeof req.query.id != 'undefined')
    //criteres = "idttraduction = '"+decodeURIComponent(req.query.id)+"'";
      criteres = "module = '"+decodeURIComponent(req.query.module)+"'";
      console.log("SELECT  "+ champs + " FROM " + table + " WHERE " +criteres);
    db.trouver(criteres, champs, table, function(err, result){
      if (err) {
        res.sendStatus(err);
      } else {
        // variable para exportar csv y pdf
        langueJson=result;
        res.status(200).json(result);
      }
    });	  
  }); // end service

// 6. URL exemple: http://localhost:3000/qdocuments?var=0&type=L&title=XXX

// Service qui génère les fichiers CSV et PDF
router.get('/documents', function(req, res, next) {

        

        console.log("idfiltre  : "+idfiltre);
        var titleJson={};
        
        for (var i = 0; i < langueJson.length; i++){
          if (langueJson[i].id_controle == "tbfltId") titleJson["titleId"] = langueJson[i].texte ;
          if (langueJson[i].id_controle == "tbfltAute") titleJson["titleAute"] = langueJson[i].texte ;
          if (langueJson[i].id_controle == "tbfltTitl") titleJson["titleTitl"] = langueJson[i].texte ;
          if (langueJson[i].id_controle == "tbfltAnne") titleJson["titleAnne"] = langueJson[i].texte ;
          if (langueJson[i].id_controle == "tbfltEdit") titleJson["titleEdit"] = langueJson[i].texte ;
          if (langueJson[i].id_controle == "tbfltEtat") titleJson["titleEtat"] = langueJson[i].texte ;
          if (langueJson[i].id_controle == "tbfltType") titleJson["titleType"] = langueJson[i].texte ;
          if (langueJson[i].id_controle == "lbledLang") titleJson["titleLangue"] = langueJson[i].texte ;
          // Header Title
          if (langueJson[i].id_controle == "headerTitle") titleJson["headerPDF"] = langueJson[i].texte ;
        }
        /*CSV*/
        
        
        if (req.query.doc=="csv") { 
          res.header("Content-Type", "text/csv");
          res.set({"Content-Disposition":"attachment; filename=\"documets-csv.csv\""});
          console.log("req.query.doc : "+req.query.doc);
          console.log("dataDocs : "+dataDocs);
          console.log("res : "+res);
          console.log("titleJson : "+titleJson);
          res.status(200).send(genererDATA(dataDocs,titleJson));
        }
        else { 
          res.setHeader('Content-type', 'application/pdf');
          //save PDF
          res.set({"Content-Disposition":"attachment; filename=\"documets-pdf.pdf\""});
          console.log("req.query.doc : "+req.query.doc);
          console.log("dataDocs : "+dataDocs);
          console.log("res : "+res);
          console.log("titleJson : "+titleJson);
          genererPDF(dataDocs,res,titleJson);   
        }
}); // end Service qui génère les fichiers CSV et PDF





function genererDATA(data,title){
  var champs = [title["titleId"],title["titleAute"],title["titleTitl"],title["titleAnne"],title["titleEdit"],title["titleEtat"],title["titleType"],enleveDeuxPoint(title["titleLangue"])];
  var lignes=champs.join()+"\n";
  for(var i = 0; i < data.length; i++) {
    lignes+=data[i].iddoc + ',' + data[i].tnom + ',"'+data[i].title.trim()+'","'+data[i].annee+'","'+
    data[i].nomediteur+'","'+ data[i].etat + '","'+ data[i].type + '","'+ data[i].langue + '"\n'
  }
  return lignes;	
}

function genererPDF(data,res,title) {     
      var pdf = new PDFDocument({ 
              autoFirstPage: false
          }),
          
          table = new PdfTable(pdf, {
              bottomMargin: "2000px"
          });
          //console.log(title["titleAute"]);
      table
          // add some plugins (here, a 'fit-to-width' for a column)
          .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
              column: 'description'
          }))
          // set defaults to your columns
          .setColumnsDefaults({
              headerBorder: 'B',
              align: 'left',
              width: 70,
              fontSize: 10
          })
          // add table columns
          .addColumns([
              {
                  id: 'tnom',
                  header: title["titleAute"],
                  width: 90
              },
              {
                  id: 'title',
                  header: title["titleTitl"],
                  width: 90
                  
              },
              {
                  id: 'annee',
                  header: title["titleAnne"],
                  width: 40
              },
              {
                  id: 'nomediteur',
                  header: title["titleEdit"],
                  width: 90
              },
              {
                  id: 'etat',
                  header: title["titleEtat"],
              },
              {
                  id: 'type',
                  header: title["titleType"],
                 width: 50
              },
              {
                  id: 'langue',
                  header: enleveDeuxPoint(title["titleLangue"]),
                  width: 40
              }
          ])
          // add events (here, we draw headers on each new page)
          .onPageAdded(function (tb) {
              tb.addHeader();
          });

      // if no page already exists in your PDF, do not forget to add one
      pdf.addPage();
      // draw content, by passing data to the addBody method
      table.pdf.fontSize(10);
      table.pdf.font('Times-Roman');
      table.pdf.moveDown(.5);
      table.pdf.x = 50;
      table.pdf.y = 200;
      table.addBody(data);

      pdf.image("public/img/logo.jpg", 70, 50);
      pdf.fontSize(14);
      pdf.font('Times-Roman');
      pdf.text("Conservatoire Culinaire", 70, 170);
      pdf.pipe(res);
      pdf.end();
  }

function enleveDeuxPoint(chaine){
  if (chaine.indexOf(":"))
    chaine = chaine.substr(0,chaine.indexOf(":") -1);
  return  chaine;
}

// URL exemple: http://localhost:3000/tcarrousel?id=1
// Service pour avoir accès à les imáges de carrousel dans la base de données
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
  }); // end service

  // Modal Carrousel : #blockCarrousel. Service qui va garder les imáges de carrousel dans la base de données
router.patch('/saveCarrousel', function(req, res) {

  var valeur = [];
  var i = 0;
  for(var champ in req.body) {
    valeur[i] = req.body[champ];
    i++;
  }
  db.storeProc("sp_save_carrousel(?,?)", valeur, function(err){
    if (err) {
      res.sendStatus(err);
    } else {
      res.sendStatus(200);
    }
  });	
}); // end save

router.delete('/tcarrousel/:id', function(req, res) {
  var table = "tcarrousel";
  var criteres = "codecarrousel='"+req.params.id+"'"; 
  //var criteres = 'codetype="'+req.params.id+'"'; 
	db.supprimer(criteres, table, function(err, result){
		if (err) {
			res.sendStatus(err);
		} else {
			res.sendStatus(200);
		}
	});	
}); // end supprimer

router.get('/feed', function(req, res, next) {
  var table = "qdocuments";
  var champs = "concat('[',news,']  ',type,': ',title, ' [',langue,']') as title," ;
  champs += "concat(type,': ',title, ' [',langue,'], ', 'Author: ',tnom, ', Editor: ',nomediteur,', ISBN: ',isbn,', Status: ',etat,', Year: ',annee,', Quantity: ',quantite,', Price: ',prix) as body, published_at";
  var criteres = "published_at>=DATE_SUB(now(), INTERVAL 10 DAY)"; 

	db.trouver(criteres, champs, table, function(err, result){
    //console.log( result);
    if (err) {
      res.sendStatus(err);
    } else {      
      res.setHeader('content-type', 'application/rss+xml');
      res.render('feed', {
       pretty: true,
       title: 'Conservatoire culinaire',
       description: 'Installé dans un local de l’École des métiers de la restauration et du tourisme de Montréal, une belle bâtisse de style victorien, construite en 1887,  sur le boulevard de Maisonneuve. «On veut protéger notre patrimoine» explique Mario Bilodeau, le directeur: « Je pense que le meilleur endroit pour le conserver, c’est une école hôtelière.»  Dans un petit local du quatrième étage, s’entassent 150 ans d’histoire culinaire québécoise. Au tout nouveau Conservatoire culinaire du Québec, inauguré le jeudi 13 octobre 2016, des livres de cuisine, des menus et des dépliants témoignent de la culture culinaire d’ici, qui mélange celles de la France, de l’Angleterre, des États-Unis et des Premières Nations.',
       posts: result
    });     
    }
  });	  
}); // end service

router.get('/aproposdenous', function(req, res, next) {
  var table = "tpreferences";
 //var champs = "aboutFr, aboutEn";
  var champs = "aboutFr,aboutEn";
  var criteres = "1=1";
  /*
  var langue = "";

    if (typeof req.query.lan != 'undefined')
      if (req.query.lan =='EN')
        langue = "aboutEn as about"; 
      else
        langue = "aboutFr as about";
    else
      langue = "aboutFr as about"; 
      
      champs = champs + langue
*/
  if (typeof req.query.id != 'undefined'){
    criteres = "codepreferences = '"+decodeURIComponent(req.query.id)+"'"; 
    //res.render('tpreferences', { aboutFr : aboutFr});
   // console.log("SELECT  "+ champs + " FROM " + table + " WHERE " +criteres);
  }
	db.trouver(criteres, champs, table, function(err, result){
    if (err) {
      res.sendStatus(err);
    } else {



     
      var fs = require('fs');
      var wstream = fs.createWriteStream('views/APROPOS.md');
      wstream.write(result[0].aboutFr);
      wstream.end();
      //res.render('aproposdenous');
      res.status(200);


    }
  });	  
}); // end service

module.exports = router;
