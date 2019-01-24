-- Ce projet utilise les licences suivantes:
-- Copyright Andy Del Risco & Ricardo Mendoza: Licensed under the Apache License, Version 2.0 http://www.apache.org/licenses/LICENSE-2.0
-- Booststrap & DataTables, the MIT License (MIT)
-- Montréal Québec Canada
-- Repository : Bibliotheque_Nodejs_ConservatoireEMRTM > https://github.com/RicardoAMendoza/Bibliotheque_Nodejs_ConservatoireEMRTM
-- Projet : prjNodejs_ConservatoireEMRTM
-- Instruction :
-- Copiez et collez sur le script SqlServer et exécutez-le. Cela va créer une base de données

-- -----------------------------------------------------
-- 1.- Procedure sp_save_auteur
-- -----------------------------------------------------
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_auteur`(
/*tauteur*/
in acodeauteur int(11),
in anom varchar(45),
in aprenom varchar(45)
)
BEGIN
/*Ajouter les inserts des tables tauteur*/

IF  acodeauteur = 0  THEN
    INSERT INTO `bd_biblio`.`tauteur`(`nom`,`prenom`)
	VALUES(`anom`,`aprenom`);
	SELECT 
    MAX(codeauteur)
INTO acodeauteur FROM
    bd_biblio.tauteur;
ELSE
-- Update
	UPDATE `bd_biblio`.`tauteur`
	SET `nom`= `anom`,`prenom`=`aprenom` WHERE `codeauteur` = acodeauteur;
END IF; 
  
END

-- -----------------------------------------------------
-- 2.- Procedure sp_save_carrousel
-- -----------------------------------------------------
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_carrousel`(
/*tcarrousel*/
in acodecarrousel int(45),
in aimgNom varchar(45)
)
BEGIN
-- call sp_save_traduction(47," tbfltAnne","admin","Année","Year");
/*Ajouter les inserts des tables tcarrousel*/
IF  acodecarrousel = 0  THEN
    INSERT INTO `bd_biblio`.`tcarrousel`(`imgNom`)
	VALUES(`aimgNom`);
ELSE
-- Update
	UPDATE `bd_biblio`.`tcarrousel`
	SET `imgNom`= `aimgNom`
	WHERE `codecarrousel` = acodecarrousel;
END IF;
    
END

-- -----------------------------------------------------
-- 3.- Procedure sp_save_classement
-- -----------------------------------------------------
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_classement`(
in acodeclassement int(11),
in anom varchar(45)
)
BEGIN
/*
	Ajouter les inserts des tables tclassement. 
*/
/*tclassement*/
IF  acodeclassement = 0   THEN
		INSERT INTO `bd_biblio`.`tclassement`(`nom`)
		VALUES(`anom`);
		SELECT 
    MAX(codeclassement)
INTO acodeclassement FROM
    bd_biblio.tclassement;
    ELSE
-- Update
		UPDATE `bd_biblio`.`tclassement`
		SET `nom`= `anom` WHERE `codeclassement` = acodeclassement;
END IF;

END

-- -----------------------------------------------------
-- 4.- Procedure sp_save_documents
-- -----------------------------------------------------
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_documents`(
in aiddoc int(11),
in acodetype varchar(1),
in atitle varchar(100),
in aisbn varchar(30),
-- in aannee int(4),
in aannee varchar(4),
in alangue varchar(2),
/*prix optional*/
-- in aprix decimal(8,2),
in aprix varchar(10),
in anbpages int(11),
in aquantite int(200),
in anumchemise int(11),
in apathdocument varchar(255),
in acommentaire varchar(1000),
in adonateur varchar(100),
in acoduser varchar(5),
in acodeauteur int(11),
in anom varchar(45),
in aprenom varchar(45),
in acodeetat int(11),
in acodeclassement int(11),
in anomcl varchar(45),
in aidfamille int(11),
in anomfamille varchar(45),
/*tediteur*/
in acodeediteur int(11),
in anomediteur varchar(45),
/*in acodepays varchar(2),*/
in acodeville int(11),
in anomville varchar(45)

)
BEGIN
DECLARE nannee INT(4);
DECLARE dprix decimal(8,2);

/*
	Ajouter les inserts des tables tfamille, tauteur, tclassement, tediteur  etc  
*/

/*tfamille*/
IF aidfamille=0 AND anomfamille!="" THEN
	INSERT INTO `bd_biblio`.`tfamille`(`codetype`,`nomfamille`)
	VALUES(acodetype,anomfamille);
	SELECT 
    MAX(idfamille)
INTO aidfamille FROM
    bd_biblio.tfamille;
END IF;
/*tauteur*/
IF  acodeauteur = 0 AND  anom!="" AND  aprenom!="" THEN
    INSERT INTO `bd_biblio`.`tauteur`(`nom`,`prenom`)
	VALUES(`anom`,`aprenom`);
	SELECT 
    MAX(codeauteur)
INTO acodeauteur FROM
    bd_biblio.tauteur;
END IF;
/*tclassement*/
IF  acodeclassement = 0 AND  anomcl!="" THEN
    INSERT INTO `bd_biblio`.`tclassement`(`nom`)
	VALUES(`anomcl`);
	SELECT 
    MAX(codeclassement)
INTO acodeclassement FROM
    bd_biblio.tclassement;
END IF;
/*tville*/
IF  acodeville = 0 AND  anomville!="" THEN

	INSERT INTO `bd_biblio`.`tville`(`nomville`)
    VALUES(`anomville`);
	SELECT 
    MAX(codeville)
INTO acodeville FROM
    bd_biblio.tville;
END IF;
/*tediteur*/
IF  acodeediteur = 0 AND  anomediteur!="" THEN
    INSERT INTO `bd_biblio`.`tediteur`(`nomediteur`,`codeville`)
    VALUES(`anomediteur`,`acodeville`);
	SELECT 
    MAX(codeediteur)
INTO acodeediteur FROM
    bd_biblio.tediteur;
END IF;

if alangue="0" or alangue="" then
	set alangue=null;
end if;

if acoduser="" then
	set acoduser=null;
end if;
  
if acodeetat="0" or acodeetat="" then
	set acodeetat=null;
end if;


if aannee="" then
	set nannee=null;
else
	set nannee= CONVERT(SUBSTRING_INDEX(aannee,'-',-1),UNSIGNED INTEGER);
end if;
if aprix="" then
	set dprix=null;
else
	set dprix = cast(replace(aprix, ',', '.') as decimal(8,2));
end if;

IF aiddoc = 0 THEN
-- Insert
INSERT INTO `bd_biblio`.`tdocuments`
(title,
`isbn`,
`annee`,
`langue`,
`prix`,
`nbpages`,
`quantite`,
`numchemise`,
`pathdocument`,
`commentaire`,
`donateur`,
`codetype`,
`coduser`,
`codeauteur`,
`codeetat`,
`codeediteur`,
`codeclassement`,
`idfamille`)
VALUES
(atitle,
aisbn,
nannee,
alangue,
dprix,
anbpages,
aquantite,
anumchemise,
apathdocument,
acommentaire,
adonateur,
acodetype,
acoduser,
acodeauteur,
acodeetat,
acodeediteur,
acodeclassement,
aidfamille);


ELSE
-- Update
UPDATE `bd_biblio`.`tdocuments`
SET

`title` = atitle ,
`isbn` = aisbn,
`annee` = nannee,
`langue` = alangue,
`prix` = dprix,
`nbpages` = anbpages,
`quantite`= aquantite,
`numchemise` = anumchemise,
`dateMAJ` = now(),
`pathdocument` = apathdocument,
`commentaire` = acommentaire,
`donateur` = adonateur,
`codetype` = acodetype,
`coduserMAJ` = acoduser,
`codeauteur` = acodeauteur,
`codeetat` = acodeetat,
`codeediteur` = acodeediteur,
`codeclassement` = acodeclassement,
`idfamille` = aidfamille
WHERE `iddoc` = aiddoc;

END IF;    

END

-- -----------------------------------------------------
-- 5.- Procedure sp_save_editeur
-- -----------------------------------------------------
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_editeur`(
/*tediteur*/
in acodeediteur int(11),
in anomediteur varchar(45),
in acodeville int(11)
)
BEGIN
/*Ajouter les inserts des tables tediteur*/

IF  acodeediteur = 0  THEN
	INSERT INTO `bd_biblio`.`tediteur`(`nomediteur`,`codeville`)
	VALUES(`anomediteur`,`acodeville`);
ELSE
-- Update
	UPDATE `bd_biblio`.`tediteur`
	SET `nomediteur`= `anomediteur`,`codeville`=`acodeville`
	WHERE `codeediteur` = acodeediteur;
END IF;
    
END

-- -----------------------------------------------------
-- 6.- Procedure sp_save_etat
-- -----------------------------------------------------
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_etat`(
/*tetat*/
in acodeetat varchar(1),
in aetat varchar(45)
)
BEGIN

/*Ajouter les inserts des tables tetat*/
DECLARE valid int;
SELECT 
    COUNT(*)
INTO valid FROM
    tetat
WHERE
    codeetat = acodeetat;

IF  valid=0  THEN
INSERT INTO `bd_biblio`.`tetat`(codeetat,etat)
VALUES(acodeetat,aetat);
Else
-- Update
	UPDATE `bd_biblio`.`tetat`
	SET `etat`= `aetat` WHERE `codeetat` = acodeetat;
end if;
    
END

-- -----------------------------------------------------
-- 7.- Procedure sp_save_famille
-- -----------------------------------------------------
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_famille`(
/*tfamille*/
in aidfamille int(11),
in acodetype varchar(1),
in anomfamille varchar(45)
)
BEGIN
/*Ajouter les inserts des tables tfamille*/

IF  aidfamille = 0  THEN
    INSERT INTO `bd_biblio`.`tfamille`(`idfamille`,`codetype`,`nomfamille`)
	VALUES(`aidfamille`,`acodetype`,`anomfamille`);
	SELECT 
    MAX(idfamille)
INTO aidfamille FROM
    bd_biblio.tfamille;
ELSE
-- Update
	UPDATE `bd_biblio`.`tfamille`
	SET `idfamille`= `aidfamille`,`codetype`=`acodetype`,`nomfamille`=`anomfamille` WHERE `idfamille` = aidfamille;
END IF;
    
END

-- -----------------------------------------------------
-- 8.- Procedure sp_save_langue
-- -----------------------------------------------------
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_langue`(
/*tlangue*/
in acodelangue varchar(2),
in alangue varchar(45)
)
BEGIN

/*Ajouter les inserts des tables tlangue*/
DECLARE valid int;
SELECT 
    COUNT(*)
INTO valid FROM
    tlangue
WHERE
    codelangue = acodelangue;

IF  valid=0  THEN
INSERT INTO `bd_biblio`.`tlangue`(codelangue,langue) 
VALUES(acodelangue,alangue);
Else
-- Update
	UPDATE `bd_biblio`.`tlangue`
	SET `langue`= `alangue` WHERE `codelangue` = acodelangue;
end if;
  
END

-- -----------------------------------------------------
-- 9.- Procedure sp_save_preferences
-- -----------------------------------------------------
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

-- -----------------------------------------------------
-- 10.- Procedure sp_save_traduction
-- -----------------------------------------------------
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_traduction`(
/*ttraduction*/
in aidttraduction int(11),
in aid_controle varchar(50),
in amodule varchar(50),
in atxtfrancais varchar(100),
in atxtanglais varchar(100)
)
BEGIN
-- call sp_save_traduction(47," tbfltAnne","admin","Année","Year");
/*Ajouter les inserts des tables ttraduction*/
IF  aidttraduction = 0  THEN
    INSERT INTO `bd_biblio`.`ttraduction`(`id_controle`,`module`,`txtfrancais`,`txtanglais`)
	VALUES(`aid_controle`,`amodule`,`atxtfrancais`,`atxtanglais`);
ELSE
-- Update
	UPDATE `bd_biblio`.`ttraduction`
	SET `id_controle`= `aid_controle`,`module`=`amodule`,`txtfrancais`=`atxtfrancais`,`txtanglais`=`atxtanglais`
	WHERE `idttraduction` = aidttraduction;
END IF;
    
END

-- -----------------------------------------------------
-- 11.- Procedure sp_save_type
-- -----------------------------------------------------
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_type`(
/*ttype*/
in acodetype varchar(1),
in atype varchar(45)

)
BEGIN
/*Ajouter les inserts des tables ttype*/
DECLARE valid int;
SELECT 
    COUNT(*)
INTO valid FROM
    ttype
WHERE
    codetype = acodetype;

IF  valid = 0  THEN
    INSERT INTO `bd_biblio`.`ttype`(codetype,type)
	VALUES(acodetype,atype);


ELSE
-- Update
	UPDATE `bd_biblio`.`ttype`
	SET `type`= `atype` WHERE `codetype` = acodetype;
END IF;
    
END

-- -----------------------------------------------------
-- 12.- Procedure sp_save_users
-- -----------------------------------------------------
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_users`(
/*tusers*/
in acoduser varchar(5),
in apassword varchar(15),
in anom varchar(50),
in aprenom varchar(40),
in aadmin TINYINT(1),
in ainactif TINYINT(1)
)
BEGIN
/*Ajouter les inserts des tables tusers*/

-- IF  acoduser is null OR acoduser = ""  THEN
-- IF  acoduser != "" and acoduser != `coduser` THEN
IF  acoduser != "" THEN
    INSERT INTO `bd_biblio`.`tusers`(`coduser`,`password`,`nom`,`prenom`,`admin`,`inactif`)
	VALUES(`acoduser`,`apassword`,`anom`,`aprenom`,`aadmin`,`ainactif`);
	/*SELECT MAX(coduser) INTO acoduser FROM bd_biblio.tusers;*/
ELSE
-- Update
	UPDATE `bd_biblio`.`tusers`
	SET `coduser`= `acoduser`,`password`= `apassword`,`nom`=`anom`,`prenom`=`aprenom`,`admin`=`aadmin`,`inactif`=`ainactif`
	WHERE `coduser` = acoduser;
END IF;
    
END

-- -----------------------------------------------------
-- 13.- Procedure sp_save_ville
-- -----------------------------------------------------
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_ville`(
/*tville*/
in acodeville int(11),
in anomville varchar(45)
)
BEGIN
/*Ajouter les inserts des tables tville*/

IF  acodeville = 0  THEN
    INSERT INTO `bd_biblio`.`tville`(`nomville`)
	VALUES(`anomville`);
	SELECT 
    MAX(codeville)
INTO acodeville FROM
    bd_biblio.tville;

ELSE
-- Update
	UPDATE `bd_biblio`.`tville`
	SET `nomville`= `anomville`
	WHERE `codeville` = acodeville;
END IF;
    
END























