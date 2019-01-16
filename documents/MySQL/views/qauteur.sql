CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qauteur` AS
    SELECT DISTINCT
        `a`.`codeauteur` AS `codeauteur`,
        `a`.`nom` AS `nom`,
        `a`.`prenom` AS `prenom`,
        (CASE
            WHEN ISNULL(`b`.`codeauteur`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        (`tauteur` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`codeauteur` = `b`.`codeauteur`)))
    ORDER BY `a`.`nom`