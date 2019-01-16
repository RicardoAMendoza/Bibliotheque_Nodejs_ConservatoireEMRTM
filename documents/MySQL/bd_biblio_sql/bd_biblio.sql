-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bd_biblio
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd_biblio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_biblio` DEFAULT CHARACTER SET utf8 ;
USE `bd_biblio` ;

-- -----------------------------------------------------
-- Table `bd_biblio`.`tauteur`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tauteur` (
  `codeauteur` INT(11) NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  `prenom` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`codeauteur`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`tclassement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tclassement` (
  `codeclassement` INT(11) NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`codeclassement`))
ENGINE = InnoDB
AUTO_INCREMENT = 213
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`tpays`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tpays` (
  `codepays` VARCHAR(2) NOT NULL,
  `nompays` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`codepays`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`tville`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tville` (
  `codeville` INT(11) NOT NULL AUTO_INCREMENT,
  `nomville` VARCHAR(45) NOT NULL,
  `codepays` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`codeville`),
  INDEX `fk_ville_pay1_idx` (`codepays` ASC),
  CONSTRAINT `fk_ville_pay1`
    FOREIGN KEY (`codepays`)
    REFERENCES `bd_biblio`.`tpays` (`codepays`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1542
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`tediteur`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tediteur` (
  `codeediteur` INT(11) NOT NULL AUTO_INCREMENT,
  `nomediteur` VARCHAR(45) NULL DEFAULT NULL,
  `codepays` VARCHAR(2) NULL DEFAULT NULL,
  `codeville` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`codeediteur`),
  INDEX `fk_editeur_pay1_idx` (`codepays` ASC),
  INDEX `fk_editeur_ville1_idx` (`codeville` ASC),
  CONSTRAINT `fk_editeur_pay1`
    FOREIGN KEY (`codepays`)
    REFERENCES `bd_biblio`.`tpays` (`codepays`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_editeur_ville1`
    FOREIGN KEY (`codeville`)
    REFERENCES `bd_biblio`.`tville` (`codeville`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 32
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`tetat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tetat` (
  `codeetat` INT(11) NOT NULL,
  `etat` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`codeetat`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`ttype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`ttype` (
  `codetype` VARCHAR(1) NOT NULL,
  `type` VARCHAR(45) NOT NULL COMMENT 'Livre, Fond, Feuillete',
  PRIMARY KEY (`codetype`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`tfamille`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tfamille` (
  `idfamille` INT(11) NOT NULL AUTO_INCREMENT,
  `codetype` VARCHAR(1) NOT NULL,
  `nomfamille` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idfamille`),
  INDEX `fk_famille_type1_idx` (`codetype` ASC),
  CONSTRAINT `fk_famille_type1`
    FOREIGN KEY (`codetype`)
    REFERENCES `bd_biblio`.`ttype` (`codetype`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 318
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`tusers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tusers` (
  `coduser` VARCHAR(5) NOT NULL DEFAULT '',
  `password` VARCHAR(15) NOT NULL,
  `nom` VARCHAR(50) NOT NULL,
  `prenom` VARCHAR(40) NOT NULL,
  `admin` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '1 = Administrateur, 0 = Utilisateur standard',
  `inactif` TINYINT(1) NULL DEFAULT '0' COMMENT '1 = Inactif, 0 = Actif',
  PRIMARY KEY (`coduser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`tlangue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tlangue` (
  `codelangue` VARCHAR(2) NOT NULL,
  `langue` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`codelangue`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`tdocuments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tdocuments` (
  `iddoc` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `isbn` VARCHAR(30) NULL DEFAULT NULL,
  `annee` INT(11) NULL DEFAULT NULL,
  `langue` VARCHAR(2) NULL DEFAULT NULL,
  `prix` DECIMAL(8,2) NULL DEFAULT NULL,
  `nbpages` INT(11) NULL DEFAULT NULL,
  `numchemise` INT(11) NULL DEFAULT NULL,
  `datecreation` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `dateMAJ` DATETIME NULL DEFAULT NULL,
  `pathdocument` VARCHAR(255) NULL DEFAULT NULL,
  `fichier` VARCHAR(100) NULL DEFAULT NULL,
  `commentaire` VARCHAR(1000) NULL DEFAULT NULL,
  `donateur` VARCHAR(100) NULL DEFAULT NULL,
  `codetype` VARCHAR(1) NULL DEFAULT NULL,
  `coduser` VARCHAR(5) NULL DEFAULT NULL,
  `coduserMAJ` VARCHAR(5) NULL DEFAULT NULL,
  `codeauteur` INT(11) NULL DEFAULT NULL,
  `codeetat` INT(11) NOT NULL,
  `codeediteur` INT(11) NULL DEFAULT NULL,
  `codeclassement` INT(11) NULL DEFAULT NULL,
  `idfamille` INT(11) NULL DEFAULT NULL,
  `codelangue` VARCHAR(2) NULL DEFAULT NULL,
  PRIMARY KEY (`iddoc`),
  INDEX `fk_livre_auteur_idx` (`codeauteur` ASC),
  INDEX `fk_livre_etat1_idx` (`codeetat` ASC),
  INDEX `fk_livre_classement1_idx` (`codeclassement` ASC),
  INDEX `fk_livre_type1_idx` (`codetype` ASC),
  INDEX `fk_livre_editeur1_idx` (`codeediteur` ASC),
  INDEX `fk_documents_tusers2_idx` (`coduser` ASC),
  INDEX `fk_documents_tusers3_idx` (`coduserMAJ` ASC),
  INDEX `fk_documents_famille1_idx` (`idfamille` ASC),
  INDEX `fk_tdocuments_tlangue1_idx` (`codelangue` ASC),
  CONSTRAINT `fk_documents_auteur`
    FOREIGN KEY (`codeauteur`)
    REFERENCES `bd_biblio`.`tauteur` (`codeauteur`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_documents_classement1`
    FOREIGN KEY (`codeclassement`)
    REFERENCES `bd_biblio`.`tclassement` (`codeclassement`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_documents_editeur1`
    FOREIGN KEY (`codeediteur`)
    REFERENCES `bd_biblio`.`tediteur` (`codeediteur`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_documents_etat1`
    FOREIGN KEY (`codeetat`)
    REFERENCES `bd_biblio`.`tetat` (`codeetat`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_documents_famille1`
    FOREIGN KEY (`idfamille`)
    REFERENCES `bd_biblio`.`tfamille` (`idfamille`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_documents_tusers2`
    FOREIGN KEY (`coduser`)
    REFERENCES `bd_biblio`.`tusers` (`coduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_documents_tusers3`
    FOREIGN KEY (`coduserMAJ`)
    REFERENCES `bd_biblio`.`tusers` (`coduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_documents_type1`
    FOREIGN KEY (`codetype`)
    REFERENCES `bd_biblio`.`ttype` (`codetype`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tdocuments_tlangue1`
    FOREIGN KEY (`codelangue`)
    REFERENCES `bd_biblio`.`tlangue` (`codelangue`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 32
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`tpreferences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tpreferences` (
  `codepreferences` INT(11) NOT NULL AUTO_INCREMENT,
  `nomEntreprise` VARCHAR(500) NULL DEFAULT NULL,
  `nomContact` VARCHAR(45) NULL DEFAULT NULL,
  `courriel` VARCHAR(45) NULL DEFAULT NULL,
  `telephone` VARCHAR(45) NULL DEFAULT NULL,
  `adresse` VARCHAR(500) NULL DEFAULT NULL,
  `commentaire` VARCHAR(1000) NULL DEFAULT NULL,
  `preAdLat` DECIMAL(10,5) NULL DEFAULT NULL,
  `preAdLng` DECIMAL(10,5) NULL DEFAULT NULL,
  `preZoom` INT(2) NULL DEFAULT NULL,
  `premKrAdLat` DECIMAL(10,5) NULL DEFAULT NULL,
  `premKrAdLng` DECIMAL(10,5) NULL DEFAULT NULL,
  PRIMARY KEY (`codepreferences`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`ttraduction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`ttraduction` (
  `idttraduction` INT(11) NOT NULL AUTO_INCREMENT,
  `id_controle` VARCHAR(50) NULL DEFAULT NULL,
  `module` VARCHAR(50) NOT NULL,
  `txtfrancais` VARCHAR(100) NULL DEFAULT NULL,
  `txtanglais` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`idttraduction`))
ENGINE = InnoDB
AUTO_INCREMENT = 48
DEFAULT CHARACTER SET = utf8;

USE `bd_biblio` ;

-- -----------------------------------------------------
-- Placeholder table for view `bd_biblio`.`qauteur`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`qauteur` (`codeauteur` INT, `nom` INT, `prenom` INT, `utilise` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bd_biblio`.`qclassement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`qclassement` (`codeclassement` INT, `nom` INT, `utilise` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bd_biblio`.`qdocuments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`qdocuments` (`iddoc` INT, `type` INT, `title` INT, `tnom` INT, `codeediteur` INT, `nomediteur` INT, `isbn` INT, `codeetat` INT, `codeauteur` INT, `codetype` INT, `annee` INT, `prix` INT, `langue` INT, `nbpages` INT, `codeclassement` INT, `pathdocument` INT, `idfamille` INT, `donateur` INT, `commentaire` INT, `etat` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bd_biblio`.`qediteur`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`qediteur` (`codeediteur` INT, `nomediteur` INT, `codepays` INT, `codeville` INT, `nompays` INT, `nomville` INT, `utilise` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bd_biblio`.`qfamille`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`qfamille` (`idfamille` INT, `codetype` INT, `nomfamille` INT, `utilise` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bd_biblio`.`qlangue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`qlangue` (`codelangue` INT, `langue` INT, `utilise` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bd_biblio`.`qtraduction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`qtraduction` (`idttraduction` INT, `id_controle` INT, `module` INT, `txtfrancais` INT, `txtanglais` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bd_biblio`.`qusers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`qusers` (`coduser` INT, `password` INT, `nom` INT, `prenom` INT, `admin` INT, `inactif` INT, `utilise` INT);

-- -----------------------------------------------------
-- Placeholder table for view `bd_biblio`.`qville`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`qville` (`codeville` INT, `nomville` INT, `codepays` INT, `nompays` INT, `utilise` INT);

-- -----------------------------------------------------
-- procedure sp_save_auteur
-- -----------------------------------------------------

DELIMITER $$
USE `bd_biblio`$$
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
	SELECT MAX(codeauteur) INTO acodeauteur FROM bd_biblio.tauteur;

ELSE
-- Update
	UPDATE `bd_biblio`.`tauteur`
	SET `nom`= `anom`,`prenom`=`aprenom` WHERE `codeauteur` = acodeauteur;
END IF;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_save_classement
-- -----------------------------------------------------

DELIMITER $$
USE `bd_biblio`$$
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
		SELECT MAX(codeclassement) INTO acodeclassement FROM bd_biblio.tclassement;
    ELSE
-- Update
		UPDATE `bd_biblio`.`tclassement`
		SET `nom`= `anom` WHERE `codeclassement` = acodeclassement;
END IF;


END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_save_documents
-- -----------------------------------------------------

DELIMITER $$
USE `bd_biblio`$$
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_documents`(
in aiddoc int(11),
in acodetype varchar(1),
in atitle varchar(100),
in aisbn varchar(30),
in aannee int(4),
in alangue varchar(2),
in aprix decimal(8,2),
in anbpages int(11),
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
in acodepays varchar(2),
in acodeville int(11),
in anomville varchar(45)

)
BEGIN
/*
	Ajouter les inserts des tables tfamille, tauteur, tclassement, tediteur  etc  
*/
/*tfamille*/
IF aidfamille=0 AND anomfamille!="" THEN
	INSERT INTO `bd_biblio`.`tfamille`(`codetype`,`nomfamille`)
	VALUES(acodetype,anomfamille);
	SELECT MAX(idfamille) INTO aidfamille FROM bd_biblio.tfamille;
END IF;
/*tauteur*/
IF  acodeauteur = 0 AND  anom!="" AND  aprenom!="" THEN
    INSERT INTO `bd_biblio`.`tauteur`(`nom`,`prenom`)
	VALUES(`anom`,`aprenom`);
	SELECT MAX(codeauteur) INTO acodeauteur FROM bd_biblio.tauteur;
END IF;
/*tclassement*/
IF  acodeclassement = 0 AND  anomcl!="" THEN
    INSERT INTO `bd_biblio`.`tclassement`(`nom`)
	VALUES(`anomcl`);
	SELECT MAX(codeclassement) INTO acodeclassement FROM bd_biblio.tclassement;
END IF;
/*tville*/
IF  acodeville = 0 AND  anomville!="" THEN
    INSERT INTO `bd_biblio`.`tville`(`nomville`,`codepays`)
	VALUES(`anomville`,`acodepays`);
	SELECT MAX(codeville) INTO acodeville FROM bd_biblio.tville;
END IF;
/*tediteur*/
IF  acodeediteur = 0 AND  anomediteur!="" THEN
    INSERT INTO `bd_biblio`.`tediteur`(`nomediteur`,`codepays`,`codeville`)
	VALUES(`anomediteur`,`acodepays`,`acodeville`);
	SELECT MAX(codeediteur) INTO acodeediteur FROM bd_biblio.tediteur;
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



    
IF aiddoc = 0 THEN
-- Insert
INSERT INTO `bd_biblio`.`tdocuments`
(title,
`isbn`,
`annee`,
`langue`,
`prix`,
`nbpages`,
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
aannee,
alangue,
aprix,
anbpages,
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
`annee` = aannee,
`langue` = alangue,
`prix` = aprix,
`nbpages` = anbpages,
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

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_save_editeur
-- -----------------------------------------------------

DELIMITER $$
USE `bd_biblio`$$
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_editeur`(
/*tediteur*/
in acodeediteur int(11),
in anomediteur varchar(45),
in acodepays varchar(2),
in acodeville int(11)
)
BEGIN
/*Ajouter les inserts des tables tediteur*/

IF  acodeediteur = 0  THEN
    INSERT INTO `bd_biblio`.`tediteur`(`nomediteur`,`codepays`,`codeville`)
	VALUES(`anomediteur`,`acodepays`,`acodeville`);
ELSE
-- Update
	UPDATE `bd_biblio`.`tediteur`
	SET `nomediteur`= `anomediteur`,`codepays`=`acodepays`,`codeville`=`acodeville`
	WHERE `codeediteur` = acodeediteur;
END IF;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_save_famille
-- -----------------------------------------------------

DELIMITER $$
USE `bd_biblio`$$
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
	SELECT MAX(idfamille) INTO aidfamille FROM bd_biblio.tfamille;
ELSE
-- Update
	UPDATE `bd_biblio`.`tfamille`
	SET `idfamille`= `aidfamille`,`codetype`=`acodetype`,`nomfamille`=`anomfamille` WHERE `idfamille` = aidfamille;
END IF;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_save_langue
-- -----------------------------------------------------

DELIMITER $$
USE `bd_biblio`$$
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_langue`(
/*tlangue*/
in acodelangue varchar(2),
in alangue varchar(45)
)
BEGIN

/*Ajouter les inserts des tables tlangue*/
DECLARE valid int;
select count(*) into valid from tlangue where codelangue=acodelangue;

IF  valid=0  THEN
INSERT INTO `bd_biblio`.`tlangue`(codelangue,langue) 
VALUES(acodelangue,alangue);
Else
-- Update
	UPDATE `bd_biblio`.`tlangue`
	SET `langue`= `alangue` WHERE `codelangue` = acodelangue;
end if;
  
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_save_preferences
-- -----------------------------------------------------

DELIMITER $$
USE `bd_biblio`$$
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
in apremKrAdLng DECIMAL(10,5)
)
BEGIN
/*Ajouter les inserts des tables tpreferences*/

IF  acodepreferences = 0  THEN
    INSERT INTO `bd_biblio`.`tpreferences`(`codepreferences`,`nomEntreprise`,`nomContact`,`courriel`,`telephone`,`adresse`,`commentaire`  
	,`preAdLat`,`preAdLng`,`preZoom`,`premKrAdLat`,`premKrAdLng`)
	VALUES(`acodepreferences`,`anomEntreprise`,`anomContact`,`acourriel`,`atelephone`,`aadresse`,`acommentaire` 
	,`apreAdLat`,`apreAdLng`,`apreZoom`,`apremKrAdLat`,`apremKrAdLng`);
	SELECT MAX(codepreferences) INTO acodepreferences FROM bd_biblio.tpreferences;
ELSE
-- Update
	UPDATE `bd_biblio`.`tpreferences`
	SET `codepreferences`= `acodepreferences`,`nomEntreprise`=`anomEntreprise`,
	    `nomContact`= `anomContact`,`courriel`=`acourriel`,
		`telephone`= `atelephone`,`adresse`=`aadresse`,`commentaire`=`acommentaire`,
		
		`preAdLat`= `apreAdLat`,`preAdLng`=`apreAdLng`,
		`preZoom`= `apreZoom`,`premKrAdLat`=`apremKrAdLat`,`premKrAdLng`=`apremKrAdLng`
		
   		WHERE `codepreferences` = acodepreferences;
END IF;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_save_traduction
-- -----------------------------------------------------

DELIMITER $$
USE `bd_biblio`$$
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
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_save_users
-- -----------------------------------------------------

DELIMITER $$
USE `bd_biblio`$$
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
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_save_ville
-- -----------------------------------------------------

DELIMITER $$
USE `bd_biblio`$$
CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_ville`(
/*tville*/
in acodeville int(11),
in anomville varchar(45),
in acodepays varchar(2)
)
BEGIN
/*Ajouter les inserts des tables tville*/

IF  acodeville = 0  THEN
    INSERT INTO `bd_biblio`.`tville`(`nomville`,`codepays`)
	VALUES(`anomville`,`acodepays`);
	SELECT MAX(codeville) INTO acodeville FROM bd_biblio.tville;

ELSE
-- Update
	UPDATE `bd_biblio`.`tville`
	SET `nomville`= `anomville`,`codepays`=`acodepays`
	WHERE `codeville` = acodeville;
END IF;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- View `bd_biblio`.`qauteur`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd_biblio`.`qauteur`;
USE `bd_biblio`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bd_biblio`.`qauteur` AS select distinct `a`.`codeauteur` AS `codeauteur`,`a`.`nom` AS `nom`,`a`.`prenom` AS `prenom`,(case when isnull(`b`.`codeauteur`) then 0 else 1 end) AS `utilise` from (`bd_biblio`.`tauteur` `a` left join `bd_biblio`.`tdocuments` `b` on((`a`.`codeauteur` = `b`.`codeauteur`)));

-- -----------------------------------------------------
-- View `bd_biblio`.`qclassement`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd_biblio`.`qclassement`;
USE `bd_biblio`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bd_biblio`.`qclassement` AS select distinct `a`.`codeclassement` AS `codeclassement`,`a`.`nom` AS `nom`,(case when isnull(`b`.`codeclassement`) then 0 else 1 end) AS `utilise` from (`bd_biblio`.`tclassement` `a` left join `bd_biblio`.`tdocuments` `b` on((`a`.`codeclassement` = `b`.`codeclassement`)));

-- -----------------------------------------------------
-- View `bd_biblio`.`qdocuments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd_biblio`.`qdocuments`;
USE `bd_biblio`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`webclient`@`%` SQL SECURITY DEFINER VIEW `bd_biblio`.`qdocuments` AS select `a`.`iddoc` AS `iddoc`,`t`.`type` AS `type`,`a`.`title` AS `title`,concat(`b`.`prenom`,' ',`b`.`nom`) AS `tnom`,`a`.`codeediteur` AS `codeediteur`,`ed`.`nomediteur` AS `nomediteur`,`a`.`isbn` AS `isbn`,`a`.`codeetat` AS `codeetat`,`a`.`codeauteur` AS `codeauteur`,`a`.`codetype` AS `codetype`,`a`.`annee` AS `annee`,`a`.`prix` AS `prix`,`a`.`langue` AS `langue`,`a`.`nbpages` AS `nbpages`,`a`.`codeclassement` AS `codeclassement`,`a`.`pathdocument` AS `pathdocument`,`a`.`idfamille` AS `idfamille`,`a`.`donateur` AS `donateur`,`a`.`commentaire` AS `commentaire`,`e`.`etat` AS `etat` from ((((`bd_biblio`.`tdocuments` `a` join `bd_biblio`.`ttype` `t` on((`a`.`codetype` = `t`.`codetype`))) join `bd_biblio`.`tauteur` `b` on((`a`.`codeauteur` = `b`.`codeauteur`))) join `bd_biblio`.`tetat` `e` on((`a`.`codeetat` = `e`.`codeetat`))) join `bd_biblio`.`tediteur` `ed` on((`a`.`codeediteur` = `ed`.`codeediteur`)));

-- -----------------------------------------------------
-- View `bd_biblio`.`qediteur`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd_biblio`.`qediteur`;
USE `bd_biblio`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bd_biblio`.`qediteur` AS select distinct `a`.`codeediteur` AS `codeediteur`,`a`.`nomediteur` AS `nomediteur`,`a`.`codepays` AS `codepays`,`a`.`codeville` AS `codeville`,`p`.`nompays` AS `nompays`,`v`.`nomville` AS `nomville`,(case when isnull(`b`.`codeediteur`) then 0 else 1 end) AS `utilise` from (((`bd_biblio`.`tediteur` `a` left join `bd_biblio`.`tdocuments` `b` on((`a`.`codeediteur` = `b`.`codeediteur`))) join `bd_biblio`.`tpays` `p` on((`a`.`codepays` = `p`.`codepays`))) join `bd_biblio`.`tville` `v` on((`a`.`codeville` = `v`.`codeville`)));

-- -----------------------------------------------------
-- View `bd_biblio`.`qfamille`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd_biblio`.`qfamille`;
USE `bd_biblio`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bd_biblio`.`qfamille` AS select distinct `a`.`idfamille` AS `idfamille`,`a`.`codetype` AS `codetype`,`a`.`nomfamille` AS `nomfamille`,(case when isnull(`b`.`idfamille`) then 0 else 1 end) AS `utilise` from (`bd_biblio`.`tfamille` `a` left join `bd_biblio`.`tdocuments` `b` on((`a`.`idfamille` = `b`.`idfamille`)));

-- -----------------------------------------------------
-- View `bd_biblio`.`qlangue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd_biblio`.`qlangue`;
USE `bd_biblio`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bd_biblio`.`qlangue` AS select distinct `a`.`codelangue` AS `codelangue`,`a`.`langue` AS `langue`,(case when isnull(`b`.`codelangue`) then 0 else 1 end) AS `utilise` from (`bd_biblio`.`tlangue` `a` left join `bd_biblio`.`tdocuments` `b` on((`a`.`codelangue` = `b`.`codelangue`)));

-- -----------------------------------------------------
-- View `bd_biblio`.`qtraduction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd_biblio`.`qtraduction`;
USE `bd_biblio`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bd_biblio`.`qtraduction` AS select distinct `a`.`idttraduction` AS `idttraduction`,`a`.`id_controle` AS `id_controle`,`a`.`module` AS `module`,`a`.`txtfrancais` AS `txtfrancais`,`a`.`txtanglais` AS `txtanglais` from `bd_biblio`.`ttraduction` `a`;

-- -----------------------------------------------------
-- View `bd_biblio`.`qusers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd_biblio`.`qusers`;
USE `bd_biblio`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bd_biblio`.`qusers` AS select distinct `a`.`coduser` AS `coduser`,`a`.`password` AS `password`,`a`.`nom` AS `nom`,`a`.`prenom` AS `prenom`,`a`.`admin` AS `admin`,`a`.`inactif` AS `inactif`,(case when isnull(`b`.`coduser`) then 0 else 1 end) AS `utilise` from (`bd_biblio`.`tusers` `a` left join `bd_biblio`.`tdocuments` `b` on((`a`.`coduser` = `b`.`coduser`)));

-- -----------------------------------------------------
-- View `bd_biblio`.`qville`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd_biblio`.`qville`;
USE `bd_biblio`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bd_biblio`.`qville` AS select distinct `a`.`codeville` AS `codeville`,`a`.`nomville` AS `nomville`,`a`.`codepays` AS `codepays`,`b`.`nompays` AS `nompays`,(case when isnull(`b`.`codepays`) then 0 else 1 end) AS `utilise` from (`bd_biblio`.`tville` `a` left join `bd_biblio`.`tpays` `b` on((`a`.`codepays` = `b`.`codepays`)));

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
