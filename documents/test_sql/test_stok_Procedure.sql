-- test documents
call sp_save_documents(0,"B","SAVE TEST","banana",1914, "FR", 300.50, 34, 55, "/apathdocument","acommentair:resetes Quebequais","adonateur:Willis","1000",1,"Garcia","Gabriel",1,100,"WARE",100,"aqui",5,"anomediteur: Diana","MX",1492,"Teotihuacan");
in aiddoc int(11),
in acodetype varchar(1),
in atitle varchar(100),
in aisbn varchar(30),
in aannee int(4),

in alangue varchar(2),
in aprix decimal(8,2),
in anbpages int(11),
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
in acodepays varchar(2),
in acodeville int(11),
in anomville varchar(45)

-- test editeur
call sp_save_editeur(0,"Mauricio Garces","PE",1492);