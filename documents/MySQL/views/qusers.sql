CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qusers` AS
    SELECT DISTINCT
        `a`.`coduser` AS `coduser`,
        `a`.`password` AS `password`,
        `a`.`nom` AS `nom`,
        `a`.`prenom` AS `prenom`,
        `a`.`admin` AS `admin`,
        `a`.`inactif` AS `inactif`,
        (CASE
            WHEN ISNULL(`b`.`coduser`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        (`tusers` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`coduser` = `b`.`coduser`)))