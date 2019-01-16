CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_preferences`(
/*tpreferences*/
in acodepreferences int(11),
in anomEntreprise varchar(500),
in anomContact varchar(45),
in acourriel varchar(45),
in atelephone varchar(45),
in aadresse varchar(500),
in acommentaire varchar(1000),
in apreAdLat DECIMAL(10,5),
in apreAdLng DECIMAL(10,5),
in apreZoom INT(2),
in apremKrAdLat DECIMAL(10,5),
in apremKrAdLng DECIMAL(10,5),
in afilePath varchar(45),
in aimgPath varchar(45)
)
BEGIN
/*Ajouter les inserts des tables tpreferences*/

SELECT MAX(codepreferences) INTO acodepreferences FROM bd_biblio.tpreferences;
IF  acodepreferences = 0  or acodepreferences is null THEN
    INSERT INTO `bd_biblio`.`tpreferences`(`nomEntreprise`,`nomContact`,`courriel`,`telephone`,`adresse`,`commentaire`  
	,`preAdLat`,`preAdLng`,`preZoom`,`premKrAdLat`,`premKrAdLng`,`filePath`,`imgPath`)
	VALUES(`anomEntreprise`,`anomContact`,`acourriel`,`atelephone`,`aadresse`,`acommentaire` 
	,`apreAdLat`,`apreAdLng`,`apreZoom`,`apremKrAdLat`,`apremKrAdLng`,`afilePath`,`aimgPath`);
	
ELSE
-- Update
	UPDATE `bd_biblio`.`tpreferences`
	SET `nomEntreprise`=`anomEntreprise`,
	    `nomContact`= `anomContact`,`courriel`=`acourriel`,
		`telephone`= `atelephone`,`adresse`=`aadresse`,`commentaire`=`acommentaire`,
		
		`preAdLat`= `apreAdLat`,`preAdLng`=`apreAdLng`,
		`preZoom`= `apreZoom`,`premKrAdLat`=`apremKrAdLat`,`premKrAdLng`=`apremKrAdLng`,
		`filePath`=`afilePath`,`imgPath`=`aimgPath`
		
   		WHERE `codepreferences` = acodepreferences;
END IF;
    
END

call sp_save_preferences(0," École des métiers de la restauration et du turisme de montréal","Andy Del Risco","emrtm@csdm.qc.ca","514-350-6032","1822, Boulevard de Maisonneuve Ouest, Montréal (Québec) H3H1J8","Bienvenue au Conservatoire Culinaire - (Administration)",45.50170,-73.56730,14,45.49402,-73.58077,"uploads","galerie");