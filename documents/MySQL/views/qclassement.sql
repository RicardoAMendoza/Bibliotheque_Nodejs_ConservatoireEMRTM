CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qclassement` AS
    SELECT DISTINCT
        `a`.`codeclassement` AS `codeclassement`,
        `a`.`nom` AS `nom`,
        (CASE
            WHEN ISNULL(`b`.`codeclassement`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        (`tclassement` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`codeclassement` = `b`.`codeclassement`)))
        ORDER BY `a`.`nom`