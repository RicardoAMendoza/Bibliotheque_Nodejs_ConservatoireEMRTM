-- Ce projet utilise les licences suivantes:
-- Copyright Andy Del Risco & Ricardo Mendoza: Licensed under the Apache License, Version 2.0 http://www.apache.org/licenses/LICENSE-2.0
-- Booststrap & DataTables, the MIT License (MIT)
-- Montréal Québec Canada
-- Repository : Bibliotheque_Nodejs_ConservatoireEMRTM > https://github.com/RicardoAMendoza/Bibliotheque_Nodejs_ConservatoireEMRTM
-- Projet : prjNodejs_ConservatoireEMRTM
-- Instruction :
-- Copiez et collez sur le script SqlServer et exécutez-le. Cela va créer une base de données
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
AUTO_INCREMENT = 39
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`tclassement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tclassement` (
  `codeclassement` INT(11) NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`codeclassement`))
ENGINE = InnoDB
AUTO_INCREMENT = 218
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`tville`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tville` (
  `codeville` INT(11) NOT NULL AUTO_INCREMENT,
  `nomville` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`codeville`))
ENGINE = InnoDB
AUTO_INCREMENT = 1549
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`tediteur`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tediteur` (
  `codeediteur` INT(11) NOT NULL AUTO_INCREMENT,
  `nomediteur` VARCHAR(45) NULL DEFAULT NULL,
  `codeville` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`codeediteur`),
  INDEX `fk_editeur_ville1_idx` (`codeville` ASC),
  CONSTRAINT `fk_editeur_ville1`
    FOREIGN KEY (`codeville`)
    REFERENCES `bd_biblio`.`tville` (`codeville`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 53
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
AUTO_INCREMENT = 325
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
  `quantite` INT(200) NULL DEFAULT NULL,
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
AUTO_INCREMENT = 33
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
  `filePath` VARCHAR(45) NULL DEFAULT NULL,
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
AUTO_INCREMENT = 158
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_biblio`.`tcarrousel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_biblio`.`tcarrousel` (
  `codecarrousel` INT(45) NOT NULL,
  `imgNom` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`codecarrousel`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;