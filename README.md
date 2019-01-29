# Gestion des livres du conservatoire culinaire.

## BIBLIOTHÈQUE CONSERVATOIRE EMRTM

## Nom du projet : prjNodejs_ConservatoireEMRTM

Hiver-2018


## Description

Application pour la gestion des livres de cuisine dans le conservatoire, disponible pour consultation publique via Internet.


### Ce projet développe un système de gestion de biblioteque pour l'EMRTM.


### Préalables

 * Langage de programmation : nodeJS (l'installation du framework Express est requis), JQuery, Javascript.
 * MySQL Workbench 6.3 - base de données
 * Programming language : MySQL.
 * npm - * npm is distributed with Node.js- which means that when you download Node.js, you automatically get npm installed on your computer. *
 * MVC Concepts.
 

### Installation

### Télécharger et installer. 

 * [Installer MySQL Workbench](https://www.mysql.com/fr/products/workbench/)
 * [Nodejs](https://nodejs.org/en/download/) - *npm is distributed with Node.js- which means that when you download Node.js, you automatically get npm installed on your computer.*
 * [Visual Studio Code](https://code.visualstudio.com/)
 * [Framework Express](https://www.npmjs.com/package/express)
 
 
 ### GIF
 
 * [Capture d'écran animée](https://www.cockos.com/licecap/)

 
### Créer la base de données avec MySQL Workbench.

1.- Créez la base de données: ouvrez MySQL Workbench, ouvrez une nouvelle query et exécutez MySQL/1_init_DataBase.sql

[Bibliotheque_Nodejs_ConservatoireEMRTM/documents/MySQL/1_init_DataBase.sql](https://github.com/RicardoAMendoza/Bibliotheque_Nodejs_ConservatoireEMRTM/tree/master/documents/MySQL/1_init_DataBase.sql)

2.- Créer les procédures stockées : exécutez MySQL/2_create_StoredProcedures.sql

[Bibliotheque_Nodejs_ConservatoireEMRTM/documents/MySQL/2_create_StoredProcedures.sql](https://github.com/RicardoAMendoza/Bibliotheque_Nodejs_ConservatoireEMRTM/tree/master/documents/MySQL/2_create_StoredProcedures.sql)

3.- Remplir les tables : exécutez MySQL/3_fill_Tables.sql

[Bibliotheque_Nodejs_ConservatoireEMRTM/documents/MySQL/3_fill_Tables.sql](https://github.com/RicardoAMendoza/Bibliotheque_Nodejs_ConservatoireEMRTM/tree/master/documents/MySQL/3_fill_Tables.sql)

4.- Créer des vues : exécutez MySQL/4_create_Views.sql

[Bibliotheque_Nodejs_ConservatoireEMRTM/documents/MySQL/4_create_Views.sql](https://github.com/RicardoAMendoza/Bibliotheque_Nodejs_ConservatoireEMRTM/tree/master/documents/MySQL/4_create_Views.sql)

5.- Connection connecte Javascript et MySQL Workbnch.

[Bibliotheque_Nodejs_ConservatoireEMRTM/config.js](https://github.com/RicardoAMendoza/Bibliotheque_Nodejs_ConservatoireEMRTM/blob/master/config.js)

```
/*!
 * ConservatoireEMRTM.
 * Langage de programmation : nodeJS (l'installation du framework Express est requis).
 * Version 0.1
 * Original author: Andy Del Risco & Ricardo Mendoza
 * Released with the MIT License: http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2018 Andy Del Risco and Ricardo Mendoza
 * Hiver-2018
 */
 
var config = {
	app: {
		port: 3000
	},
	connect: {
		//host: '10.20.24.32', // Andy
		
		host: 'localhost',  // Ricardo
		user: 'webclient',
		password: 'webclient',
		database: 'bd_biblio',
		port: 3306
	},

	taches: {
		horaire: '0 0 * * *', //pour avoir plus de détail: www.npmjs.com/package/cron
		message: "Tâche d'importation de données"
	},
	erreur: {
		message400: "Requête invalide, vérifier le(s) paramètre(s) du service.",
		message404: "La ressource n'existe pas ou n'est pas disponible.",
		messageApp: "Erreur dans l'application"
	}	
};
module.exports = config;
```



### Base de données de la bibliothèque.

![Base de données](/img/Diagram_Biblio.jpg "Base de données")
 
 
 ## Auteurs

* **[Andy Del Risco Manzanares](https://www.linkedin.com/in/andydelriscomanzanares/)** - *Analyste programmeur senior* 
* **[Ricardo Mendoza](https://www.linkedin.com/in/ricardo-mendoza-b8769849/)** - *Analyste Programmeur Jr*
 
 
## Exécuter le test
 
 
### Document original

![Livre original](/img/conserves.jpg "Livre original")



### Les informations d'un document original dans le conservatoire sont enregistrés dans la base de données de l'application.

![Interface admin](/img/admin.jpg "Interface admin")


### Ils sont disponibles pour consultation publique.

![Enregistrer les informations et le document](/img/saveDocument.jpg "Info")


### Le document peut être téléchargé en format PDF.

![Interface admin](/img/informationsGIF.gif "Interface admin")


### L'application a des fonctionnalités : A propos de nous, Nous joindre et Galerie.

![Fonctionnalités](/img/fonctionnalitesGIF.gif "Fonctionnalités")


### L'application aussi a des fonctionnalités pour la gestion : Exporter, Nouveau, Gestion.

![Gestion](/img/gestionGIF.gif "Gestion")



## Pour commencer

Dans la racine de ce projet se trouve un fichier config.js contenant les paremètres globaux de notre application, comme les paramètres de notre connexion à la base de données, le port de notre application, les messages d'erreurs du back-end, etc.


## Code source
**/routes/**

* **/routes/database.js**
Dans ce module se trouve toutes les fonctions liées à la manipulation de la base de données.
Liste de fonctions:
- trouver(critères, champs, callback): cette fonction retourne les données dans un objet Json
- supprimer(criteres, table, callback): cette fonction supprime les données selon les criteres.
- storeProc(sp_name, params, callback): cette fonction enregistre et met à jour les données selon params.

* **/routes/index.js**
Ce module contient toutes les routes de l'application.

**/views/**

* **/views/index.pug**
Cette vue contient l'interface utilisateur (page d'accueil) de notre application. 

## Mise en production

La commande suivante doit être lancée à partir de la ligne de commande (Terminal ou DOS) dans le dossier de l'application, sur le serveur web:

git pull

## Technologies utilisées :

* Langage de programmation : nodeJS (l'installation du framework Express est requis), JQuery, Javascript.
 * MySQL Workbench 6.3 - base de données
 * Programming language : MySQL.
 * npm - * npm is distributed with Node.js- which means that when you download Node.js, you automatically get npm installed on your computer. *
 * MVC Concepts.

 * Frame Express.
 * npm
 * MySQL Workbench 6.3 - base de données.

Front-end:
* Pug
* Bootstrap 3.3.2
* CSS
* Datatables (https://datatables.net) 
* JQuery
* Javascript
* HTML5

Back-end:
* Node.js 8.6
* npm
* Frame work express.js 4
* MySQL Workbench 6.3
* Javascript


## Versions et gestionnaire de source 

Ce projet utilise Gitlab.com comme gestionnaire de source dans le dépôt suivant:
https://gitlab.com/AndyDelRisco/ConservatoireEMRTM.git. 

et

https://github.com/RicardoAMendoza/Bibliotheque_Nodejs_ConservatoireEMRTM

Historique de versions : https://gitlab.com/AndyDelRisco/ConservatoireEMRTM/commits/master


## Licence

Ce projet utilise les licences suivantes:
- Copyright Andy Del Risco & Ricardo Mendoza:  Licensed under the Apache License, Version 2.0 http://www.apache.org/licenses/LICENSE-2.0
- Booststrap & DataTables, the MIT License (MIT)


## Remerciements.

* [Andy Del Risco](https://www.linkedin.com/in/andydelriscomanzanares/) - MENTOR, *Technicien Informatique Cl. Principale* [École des métiers de l’aérospatiale de Montréal](http://ecole-metiers-aerospatiale.csdm.ca/)
* [Fernand Tonye](https://www.linkedin.com/in/fernand-tonye-6a46532b/) - MENTOR, *Chief d'Equipe Informatique pour les enseignants* [Institut Teccart](http://www.teccart.qc.ca/)
* [Charles Vilaisak](https://www.linkedin.com/in/cvilaisak/) - MENTOR, *Registraire à l'École nationale de cirque* [École nationale de cirque](https://www.linkedin.com/school/-cole-nationale-de-cirque/)
* [École des métiers de l'aérospatiale de Montréal](http://ecole-metiers-aerospatiale.csdm.ca/)
* [École des métiers de la restauration et du tourisme de Montréal](http://ecole-metiers-restauration-tourisme.csdm.ca/)
* [Institut Teccart](http://www.teccart.qc.ca/)
