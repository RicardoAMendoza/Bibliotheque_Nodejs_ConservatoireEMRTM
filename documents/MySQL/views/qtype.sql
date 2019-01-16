CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qtype` AS
    SELECT DISTINCT
        `a`.`codetype` AS `codetype`,
        `a`.`type` AS `type`,
        (CASE
            WHEN ISNULL(`b`.`codetype`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        (`ttype` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`codetype` = `b`.`codetype`)))
    ORDER BY `a`.`type`