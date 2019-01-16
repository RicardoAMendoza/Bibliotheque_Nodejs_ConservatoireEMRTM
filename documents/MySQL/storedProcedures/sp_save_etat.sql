CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_etat`(
/*tetat*/
in acodeetat varchar(1),
in aetat varchar(45)
)
BEGIN

/*Ajouter les inserts des tables tetat*/
DECLARE valid int;
SELECT 
    COUNT(*)
INTO valid FROM
    tetat
WHERE
    codeetat = acodeetat;

IF  valid=0  THEN
INSERT INTO `bd_biblio`.`tetat`(codeetat,etat)
VALUES(acodeetat,aetat);
Else
-- Update
	UPDATE `bd_biblio`.`tetat`
	SET `etat`= `aetat` WHERE `codeetat` = acodeetat;
end if;
    
END