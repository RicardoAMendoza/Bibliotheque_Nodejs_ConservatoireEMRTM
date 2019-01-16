CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qfamille` AS
    SELECT DISTINCT
        `a`.`idfamille` AS `idfamille`,
        `a`.`codetype` AS `codetype`,
        `a`.`nomfamille` AS `nomfamille`,
        (CASE
            WHEN ISNULL(`b`.`idfamille`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        (`tfamille` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`idfamille` = `b`.`idfamille`)))
    ORDER BY `a`.`nomfamille`