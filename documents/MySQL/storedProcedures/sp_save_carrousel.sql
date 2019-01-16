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