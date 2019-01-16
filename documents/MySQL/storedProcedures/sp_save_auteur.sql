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