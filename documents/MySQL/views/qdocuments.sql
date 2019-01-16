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
		
/*
SELECT concat('[',news,']  ',type,': ',title, ' [',langue,']') as title, 
concat(type,': ',title, ' [',langue,'], ', 'Author: ',tnom, ', Editor: ',nomediteur,', ISBN: ',isbn,', Status: ',etat,', Year: ',annee,', Quantity: ',quantite,', Price: ',prix) as body,
published_at,
x.* FROM bd_biblio.qdocuments as x
where published_at>=DATE_SUB(now(), INTERVAL 10 DAY) 
*/
		
		