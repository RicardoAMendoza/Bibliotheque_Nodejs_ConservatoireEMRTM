CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `qediteur` AS
    SELECT DISTINCT
        `a`.`codeediteur` AS `codeediteur`,
        `a`.`nomediteur` AS `nomediteur`,
        `a`.`codeville` AS `codeville`,
        `v`.`nomville` AS `nomville`,
        (CASE
            WHEN ISNULL(`b`.`codeediteur`) THEN 0
            ELSE 1
        END) AS `utilise`
    FROM
        ((`tediteur` `a`
        LEFT JOIN `tdocuments` `b` ON ((`a`.`codeediteur` = `b`.`codeediteur`)))
        JOIN `tville` `v` ON ((`a`.`codeville` = `v`.`codeville`)))
    ORDER BY `a`.`nomediteur`
	
       -- (((`tediteur` `a`
       -- LEFT JOIN `tdocuments` `b` ON ((`a`.`codeediteur` = `b`.`codeediteur`)))
       -- JOIN `tpays` `p` ON ((`a`.`codepays` = `p`.`codepays`)))
       -- JOIN `tville` `v` ON ((`a`.`codeville` = `v`.`codeville`)))