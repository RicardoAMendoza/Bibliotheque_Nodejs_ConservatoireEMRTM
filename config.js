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
		message: "Tâche d'importation de données de la ville de Montréal"
	},
	erreur: {
		message400: "Requête invalide, vérifier le(s) paramètre(s) du service.",
		message404: "La ressource n'existe pas ou n'est pas disponible.",
		messageApp: "Erreur dans l'application"
	}	

};

module.exports = config;

