SELECT distinct a.codeauteur, a.nom, a.prenom, (case when b.codeauteur is null then 0 else 1 end) as utilise 
from  bd_biblio.tauteur as a left join tdocuments b on (a.codeauteur=b.codeauteur);