CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qetat` AS
    SELECT DISTINCT
        `a`.`codeetat` AS `codeetat`,
        `a`.`etat` AS `etat`,
        (CASE
            WHEN ISNULL(`b`.`codeetat`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        (`tetat` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`codeetat` = `b`.`codeetat`)))
    ORDER BY `a`.`etat`