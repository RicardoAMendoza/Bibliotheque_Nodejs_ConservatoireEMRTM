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