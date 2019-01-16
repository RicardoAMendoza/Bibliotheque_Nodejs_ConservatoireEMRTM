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