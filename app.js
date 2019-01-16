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
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// upload documents
var formidable = require('formidable');
var fs = require('fs');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var index = require('./routes/index');

// 1.-
//var ttype = require('./routes/ttype');
var tauteur = require('./routes/tauteur');
var tediteur = require('./routes/tediteur');
var tville = require('./routes/tville');
var tlangue = require('./routes/tlangue');
var tclassement = require('./routes/tclassement');
var tfamille = require('./routes/tfamille');

// Utilisateurs
var tusers = require('./routes/tusers');
var tpreferences = require('./routes/tpreferences');
var interfaceTraduction = require('./routes/interfaceTraduction');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//  express.static middleware to serve up the static files in our public/ directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// 2.-
app.use('/tauteur', tauteur);
app.use('/tediteur', tediteur);
app.use('/tville', tville);
app.use('/tlangue', tlangue);
app.use('/tclassement', tclassement);
app.use('/tfamille', tfamille);

// Utilisateurs
app.use('/tusers', tusers);
app.use('/tpreferences', tpreferences);
app.use('/interfaceTraduction', interfaceTraduction);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;


