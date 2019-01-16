CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qtraduction` AS
    SELECT DISTINCT
        `a`.`idttraduction` AS `idttraduction`,
        `a`.`id_controle` AS `id_controle`,
        `a`.`module` AS `module`,
        `a`.`txtfrancais` AS `txtfrancais`,
        `a`.`txtanglais` AS `txtanglais`
    FROM
        `ttraduction` `a`
