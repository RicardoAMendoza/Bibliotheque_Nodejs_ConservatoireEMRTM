CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qlangue` AS
    SELECT DISTINCT
        `a`.`codelangue` AS `codelangue`,
        `a`.`langue` AS `langue`,
        (CASE
            WHEN ISNULL(`b`.`codelangue`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        (`tlangue` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`codelangue` = `b`.`codelangue`)))
    ORDER BY `a`.`langue`