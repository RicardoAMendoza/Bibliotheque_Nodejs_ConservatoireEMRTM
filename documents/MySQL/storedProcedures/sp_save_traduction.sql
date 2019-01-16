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
    
END