CREATE DEFINER=`webclient`@`%` PROCEDURE `sp_save_documents`(
in aiddoc int(11),
in acodetype varchar(1),
in atitle varchar(100),
in aisbn varchar(30),
-- in aannee int(4),
in aannee varchar(4),
in alangue varchar(2),
/*prix optional*/
-- in aprix decimal(8,2),
in aprix varchar(10),
in anbpages int(11),
in aquantite int(200),
in anumchemise int(11),
in apathdocument varchar(255),
in acommentaire varchar(1000),
in adonateur varchar(100),
in acoduser varchar(5),
in acodeauteur int(11),
in anom varchar(45),
in aprenom varchar(45),
in acodeetat int(11),
in acodeclassement int(11),
in anomcl varchar(45),
in aidfamille int(11),
in anomfamille varchar(45),
/*tediteur*/
in acodeediteur int(11),
in anomediteur varchar(45),
/*in acodepays varchar(2),*/
in acodeville int(11),
in anomville varchar(45)

)
BEGIN
DECLARE nannee INT(4);
DECLARE dprix decimal(8,2);

/*
	Ajouter les inserts des tables tfamille, tauteur, tclassement, tediteur  etc  
*/

/*tfamille*/
IF aidfamille=0 AND anomfamille!="" THEN
	INSERT INTO `bd_biblio`.`tfamille`(`codetype`,`nomfamille`)
	VALUES(acodetype,anomfamille);
	SELECT 
    MAX(idfamille)
INTO aidfamille FROM
    bd_biblio.tfamille;
END IF;
/*tauteur*/
IF  acodeauteur = 0 AND  anom!="" AND  aprenom!="" THEN
    INSERT INTO `bd_biblio`.`tauteur`(`nom`,`prenom`)
	VALUES(`anom`,`aprenom`);
	SELECT 
    MAX(codeauteur)
INTO acodeauteur FROM
    bd_biblio.tauteur;
END IF;
/*tclassement*/
IF  acodeclassement = 0 AND  anomcl!="" THEN
    INSERT INTO `bd_biblio`.`tclassement`(`nom`)
	VALUES(`anomcl`);
	SELECT 
    MAX(codeclassement)
INTO acodeclassement FROM
    bd_biblio.tclassement;
END IF;
/*tville*/
IF  acodeville = 0 AND  anomville!="" THEN

	INSERT INTO `bd_biblio`.`tville`(`nomville`)
    VALUES(`anomville`);
	SELECT 
    MAX(codeville)
INTO acodeville FROM
    bd_biblio.tville;
END IF;
/*tediteur*/
IF  acodeediteur = 0 AND  anomediteur!="" THEN
    INSERT INTO `bd_biblio`.`tediteur`(`nomediteur`,`codeville`)
    VALUES(`anomediteur`,`acodeville`);
	SELECT 
    MAX(codeediteur)
INTO acodeediteur FROM
    bd_biblio.tediteur;
END IF;

if alangue="0" or alangue="" then
	set alangue=null;
end if;

if acoduser="" then
	set acoduser=null;
end if;
  
if acodeetat="0" or acodeetat="" then
	set acodeetat=null;
end if;


if aannee="" then
	set nannee=null;
else
	set nannee= CONVERT(SUBSTRING_INDEX(aannee,'-',-1),UNSIGNED INTEGER);
end if;
if aprix="" then
	set dprix=null;
else
	set dprix = cast(replace(aprix, ',', '.') as decimal(8,2));
end if;

IF aiddoc = 0 THEN
-- Insert
INSERT INTO `bd_biblio`.`tdocuments`
(title,
`isbn`,
`annee`,
`langue`,
`prix`,
`nbpages`,
`quantite`,
`numchemise`,
`pathdocument`,
`commentaire`,
`donateur`,
`codetype`,
`coduser`,
`codeauteur`,
`codeetat`,
`codeediteur`,
`codeclassement`,
`idfamille`)
VALUES
(atitle,
aisbn,
nannee,
alangue,
dprix,
anbpages,
aquantite,
anumchemise,
apathdocument,
acommentaire,
adonateur,
acodetype,
acoduser,
acodeauteur,
acodeetat,
acodeediteur,
acodeclassement,
aidfamille);


ELSE
-- Update
UPDATE `bd_biblio`.`tdocuments`
SET

`title` = atitle ,
`isbn` = aisbn,
`annee` = nannee,
`langue` = alangue,
`prix` = dprix,
`nbpages` = anbpages,
`quantite`= aquantite,
`numchemise` = anumchemise,
`dateMAJ` = now(),
`pathdocument` = apathdocument,
`commentaire` = acommentaire,
`donateur` = adonateur,
`codetype` = acodetype,
`coduserMAJ` = acoduser,
`codeauteur` = acodeauteur,
`codeetat` = acodeetat,
`codeediteur` = acodeediteur,
`codeclassement` = acodeclassement,
`idfamille` = aidfamille
WHERE `iddoc` = aiddoc;

END IF;    

END