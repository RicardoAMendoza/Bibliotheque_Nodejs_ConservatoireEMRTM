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