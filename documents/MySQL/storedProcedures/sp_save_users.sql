CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_users`(
/*tusers*/
in acoduser varchar(5),
in apassword varchar(15),
in anom varchar(50),
in aprenom varchar(40),
in aadmin TINYINT(1),
in ainactif TINYINT(1)
)
BEGIN
/*Ajouter les inserts des tables tusers*/

-- IF  acoduser is null OR acoduser = ""  THEN
-- IF  acoduser != "" and acoduser != `coduser` THEN
IF  acoduser != "" THEN
    INSERT INTO `bd_biblio`.`tusers`(`coduser`,`password`,`nom`,`prenom`,`admin`,`inactif`)
	VALUES(`acoduser`,`apassword`,`anom`,`aprenom`,`aadmin`,`ainactif`);
	/*SELECT MAX(coduser) INTO acoduser FROM bd_biblio.tusers;*/
ELSE
-- Update
	UPDATE `bd_biblio`.`tusers`
	SET `coduser`= `acoduser`,`password`= `apassword`,`nom`=`anom`,`prenom`=`aprenom`,`admin`=`aadmin`,`inactif`=`ainactif`
	WHERE `coduser` = acoduser;
END IF;
    
END