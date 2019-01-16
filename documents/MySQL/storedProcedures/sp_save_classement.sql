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