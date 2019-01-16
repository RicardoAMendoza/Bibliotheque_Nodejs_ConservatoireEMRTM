CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qville` AS
    SELECT DISTINCT
        `a`.`codeville` AS `codeville`, `a`.`nomville` AS `nomville`
    FROM
        `tville` `a`