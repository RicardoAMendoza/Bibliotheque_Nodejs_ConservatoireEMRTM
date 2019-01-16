CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_type`(
/*ttype*/
in acodetype varchar(1),
in atype varchar(45)

)
BEGIN
/*Ajouter les inserts des tables ttype*/
DECLARE valid int;
SELECT 
    COUNT(*)
INTO valid FROM
    ttype
WHERE
    codetype = acodetype;

IF  valid = 0  THEN
    INSERT INTO `bd_biblio`.`ttype`(codetype,type)
	VALUES(acodetype,atype);


ELSE
-- Update
	UPDATE `bd_biblio`.`ttype`
	SET `type`= `atype` WHERE `codetype` = acodetype;
END IF;
    
END