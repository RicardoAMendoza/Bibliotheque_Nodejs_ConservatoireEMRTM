CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_langue`(
/*tlangue*/
in acodelangue varchar(2),
in alangue varchar(45)
)
BEGIN

/*Ajouter les inserts des tables tlangue*/
DECLARE valid int;
SELECT 
    COUNT(*)
INTO valid FROM
    tlangue
WHERE
    codelangue = acodelangue;

IF  valid=0  THEN
INSERT INTO `bd_biblio`.`tlangue`(codelangue,langue) 
VALUES(acodelangue,alangue);
Else
-- Update
	UPDATE `bd_biblio`.`tlangue`
	SET `langue`= `alangue` WHERE `codelangue` = acodelangue;
end if;
  
END