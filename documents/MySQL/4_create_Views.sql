-- Ce projet utilise les licences suivantes:
-- Copyright Andy Del Risco & Ricardo Mendoza: Licensed under the Apache License, Version 2.0 http://www.apache.org/licenses/LICENSE-2.0
-- Booststrap & DataTables, the MIT License (MIT)
-- Montréal Québec Canada
-- Repository : Bibliotheque_Nodejs_ConservatoireEMRTM > https://github.com/RicardoAMendoza/Bibliotheque_Nodejs_ConservatoireEMRTM
-- Projet : prjNodejs_ConservatoireEMRTM
-- Instruction :
-- Copiez et collez sur le script SqlServer et exécutez-le. Cela va créer une base de données

-- -----------------------------------------------------
-- 1.- View qauteur
-- -----------------------------------------------------
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qauteur` AS
    SELECT DISTINCT
        `a`.`codeauteur` AS `codeauteur`,
        `a`.`nom` AS `nom`,
        `a`.`prenom` AS `prenom`,
        (CASE
            WHEN ISNULL(`b`.`codeauteur`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        (`tauteur` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`codeauteur` = `b`.`codeauteur`)))
    ORDER BY `a`.`nom`
	
-- -----------------------------------------------------
-- 2.- View qclassement
-- -----------------------------------------------------
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qclassement` AS
    SELECT DISTINCT
        `a`.`codeclassement` AS `codeclassement`,
        `a`.`nom` AS `nom`,
        (CASE
            WHEN ISNULL(`b`.`codeclassement`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        (`tclassement` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`codeclassement` = `b`.`codeclassement`)))
        ORDER BY `a`.`nom`
		
-- -----------------------------------------------------
-- 3.- View qdocuments
-- -----------------------------------------------------
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `webclient`@`%` 
    SQL SECURITY DEFINER
VIEW `qdocuments` AS
    SELECT 
        `a`.`iddoc` AS `iddoc`,
        `t`.`type` AS `type`,
        `a`.`title` AS `title`,
        CONCAT(`b`.`prenom`, ' ', `b`.`nom`) AS `tnom`,
        `a`.`codeediteur` AS `codeediteur`,
        `ed`.`nomediteur` AS `nomediteur`,
        COALESCE(`a`.`isbn`, '') AS `isbn`,
        `a`.`codeetat` AS `codeetat`,
        `a`.`codeauteur` AS `codeauteur`,
        `a`.`codetype` AS `codetype`,
        COALESCE(`a`.`annee`, '') AS `annee`,
        COALESCE(`a`.`prix`, 0) AS `prix`,
        COALESCE(`a`.`quantite`, 0) AS `quantite`,
        `a`.`langue` AS `langue`,
        `a`.`nbpages` AS `nbpages`,
        `a`.`codeclassement` AS `codeclassement`,
        `a`.`pathdocument` AS `pathdocument`,
        `a`.`idfamille` AS `idfamille`,
        `a`.`donateur` AS `donateur`,
        `a`.`commentaire` AS `commentaire`,
        `e`.`etat` AS `etat`,
        (CASE
            WHEN ISNULL(`a`.`dateMAJ`) THEN `a`.`datecreation`
            WHEN (`a`.`dateMAJ` > `a`.`datecreation`) THEN `a`.`dateMAJ`
            ELSE `a`.`dateMAJ`
        END) AS `published_at`,
        (CASE
            WHEN ISNULL(`a`.`dateMAJ`) THEN 'NEW'
            WHEN (`a`.`dateMAJ` > `a`.`datecreation`) THEN 'UPDATE'
            ELSE 'UPDATE'
        END) AS `news`
    FROM
        ((((`tdocuments` `a`
        JOIN `ttype` `t` ON ((`a`.`codetype` = `t`.`codetype`)))
        JOIN `tauteur` `b` ON ((`a`.`codeauteur` = `b`.`codeauteur`)))
        JOIN `tetat` `e` ON ((`a`.`codeetat` = `e`.`codeetat`)))
        JOIN `tediteur` `ed` ON ((`a`.`codeediteur` = `ed`.`codeediteur`)))
		
-- -----------------------------------------------------
-- 4.- View qediteur
-- -----------------------------------------------------
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qediteur` AS
    SELECT DISTINCT
        `a`.`codeediteur` AS `codeediteur`,
        `a`.`nomediteur` AS `nomediteur`,
        `a`.`codeville` AS `codeville`,
        `v`.`nomville` AS `nomville`,
        (CASE
            WHEN ISNULL(`b`.`codeediteur`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        ((`tediteur` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`codeediteur` = `b`.`codeediteur`)))
        JOIN `tville` `v` ON ((`a`.`codeville` = `v`.`codeville`)))
    ORDER BY `a`.`nomediteur`
	
-- -----------------------------------------------------
-- 5.- View qetat
-- -----------------------------------------------------
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qetat` AS
    SELECT DISTINCT
        `a`.`codeetat` AS `codeetat`,
        `a`.`etat` AS `etat`,
        (CASE
            WHEN ISNULL(`b`.`codeetat`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        (`tetat` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`codeetat` = `b`.`codeetat`)))
    ORDER BY `a`.`etat`
	
-- -----------------------------------------------------
-- 6.- View qfamille
-- -----------------------------------------------------
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qfamille` AS
    SELECT DISTINCT
        `a`.`idfamille` AS `idfamille`,
        `a`.`codetype` AS `codetype`,
        `a`.`nomfamille` AS `nomfamille`,
        (CASE
            WHEN ISNULL(`b`.`idfamille`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        (`tfamille` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`idfamille` = `b`.`idfamille`)))
    ORDER BY `a`.`nomfamille`
	
-- -----------------------------------------------------
-- 7.- View qlangue
-- -----------------------------------------------------
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qlangue` AS
    SELECT DISTINCT
        `a`.`codelangue` AS `codelangue`,
        `a`.`langue` AS `langue`,
        (CASE
            WHEN ISNULL(`b`.`codelangue`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        (`tlangue` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`codelangue` = `b`.`codelangue`)))
    ORDER BY `a`.`langue`

-- -----------------------------------------------------
-- 8.- View qtraduction
-- -----------------------------------------------------
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qtraduction` AS
    SELECT DISTINCT
        `a`.`idttraduction` AS `idttraduction`,
        `a`.`id_controle` AS `id_controle`,
        `a`.`module` AS `module`,
        `a`.`txtfrancais` AS `txtfrancais`,
        `a`.`txtanglais` AS `txtanglais`
    FROM
        `ttraduction` `a`
		
-- -----------------------------------------------------
-- 9.- View qtype
-- -----------------------------------------------------
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qtype` AS
    SELECT DISTINCT
        `a`.`codetype` AS `codetype`,
        `a`.`type` AS `type`,
        (CASE
            WHEN ISNULL(`b`.`codetype`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        (`ttype` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`codetype` = `b`.`codetype`)))
    ORDER BY `a`.`type`
	
-- -----------------------------------------------------
-- 10.- View qusers
-- -----------------------------------------------------
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qusers` AS
    SELECT DISTINCT
        `a`.`coduser` AS `coduser`,
        `a`.`password` AS `password`,
        `a`.`nom` AS `nom`,
        `a`.`prenom` AS `prenom`,
        `a`.`admin` AS `admin`,
        `a`.`inactif` AS `inactif`,
        (CASE
            WHEN ISNULL(`b`.`coduser`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        (`tusers` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`coduser` = `b`.`coduser`)))
		
-- -----------------------------------------------------
-- 11.- View qville
-- -----------------------------------------------------
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qville` AS
    SELECT DISTINCT
        `a`.`codeville` AS `codeville`, `a`.`nomville` AS `nomville`
    FROM
        `tville` `a`