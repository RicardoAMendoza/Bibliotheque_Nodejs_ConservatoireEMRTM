/*!
 * ConservatoireEMRTM.
 * Langage de programmation : nodeJS (l'installation du framework Express est requis).
 * Version 0.1
 * Original author: Andy Del Risco & Ricardo Mendoza
 * Released with the MIT License: http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright (c) 2018 Andy Del Risco and Ricardo Mendoza
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Hiver-2018
 */

/*google map variables*/
var staticadLat="";
var staticadLng="";
var staticzm="";
var staticmKrLat="";
var staticmKrLng="";
var staticmKrContent="";

//bootbox.alert($('#blockIntro').hasClass('in'));
/*  if( $('#blockEdit').hasClass('in') )
    var a=1;
  else
*/
$("#blockIntro").modal(); //("show");



function setCelulle(data, hide, tr){
  var td = document.createElement('TD');
  td.appendChild(document.createTextNode(data || ''));
  if (hide) 
    td.style.display = 'none';
  tr.appendChild(td);
}
// Function loadCBO
// Param  :
// url : Service rest 
// id_cbo : L'id du front-end. exe : #id
// id_code : Le valeur du champs value du combobox
// id_desc : La description qui sera afficher dans le combobox
// copycbo : L'éléments cbo qui contiendra la copie provenant du id_cbo
// Fonction qui permet de charger la liste déroulante avec toutes les installations sans doublons.
function loadListe() {
  loadCBO("/ttype","cboxfltType","codetype","type","cboxedType",1);
  loadCBO("/tauteur","cboxfltAute","codeauteur","tnom","cboxedAute",1);
  loadCBO("/tediteur","cboxfltEdit","codeediteur","nomediteur","cboxedEdit",1);
  loadCBO("/tetat","cboxfltEtat","codeetat","etat","cboxedEtat",1);
  if (document.getElementById("cboxfltLang").length==0){
    loadCBO("/tlangue","cboxedLang","codelangue","langue","cboxfltLang",0); // tlangue
  }
  //-loadCBO("/tpays","cboxedPays","codepays","nompays"); // tpays
  loadCBO("/tclassement","cboxedClas","codeclassement","nom"); // tclassement
  loadCBO("/tfamille","cboxedFami","idfamille","nomfamille"); // tfamille

  // charger les listes avec les données existantes
  // copierCBOData("form-type","ed-type"); 
  loadVille();
  // enable text box de fichier dans modal admin
  document.getElementById("txtedFich").disabled = true;
  document.getElementById("txtedFich-hide").disabled = true;

  document.getElementById("txtcarId").readOnly = true;
  document.getElementById("txtcarId").value = 0;
} // end loadListe()

function loadAuteur(){
  loadCBO("/tauteur","cboxfltAute","codeauteur","tnom","cboxedAute",1);
}

function loadEditeur(){
  loadCBO("/tediteur","cboxfltEdit","codeediteur","nomediteur","cboxedEdit",1);
}

function loadVille(){
 /// loadCBO("/tville?pays="+document.getElementById("cboxedPays").value,"cboxedVill","codeville","nomville"); // tville
  loadCBO("/tville","cboxedVill","codeville","nomville"); // tville
 }
 // Function asy para cargar la ciudades en funcion del pais
 async function loadVilleEdi(){
  /*
  loadCBO("/tville?pays="+document.getElementById("cboxedicodepays").value,"cboxedicodeville","codeville","nomville", function(result){
    bootbox.alert(result);
    if (result)
      return result; 	
  } ); */
  return await loadCBO("/tville?pays="+document.getElementById("cboxedicodepays").value,"cboxedicodeville","codeville","nomville");
  //return await loadCBO("/tville?pays="+document.getElementById("cboxedicodepays").value,"cboxedicodeville","codeville","nomville");
}

function copierCBOData(source,destin){
  var select1 = document.getElementById(source);
  var select2 = document.getElementById(destin);
  if (select2!=null) {
    select2.options.length = 0;
    select2.innerHTML = select2.innerHTML+select1.innerHTML;
  }
}

function activerFiltreDiv(){
  document.getElementById("blockEdit").style.display = "none";
  document.getElementById("blockFiltre").style.display = "block";  
}

function desactiverFiltreDiv(){
  document.getElementById("blockEdit").style.display = "block";
  document.getElementById("blockFiltre").style.display = "none";  
}

// Function loadCBO
// Param  :
// url : Service rest 
// id_cbo : L'id du front-end. exe : #id
// id_code : Le valeur du champs value du combobox
// id_desc : La description qui sera afficher dans le combobox
// copycbo : L'éléments cbo qui contiendra la copie provenant du id_cbo
// selOption : affiche la ligne "*** Séléctionnez ***"
function loadCBO(url,id_cbo,id_code,id_desc,copycbo,selOption){
  var sel = document.getElementById(id_cbo);
  /*
  for(var i = sel.length - 1 ; i >= 0 ; i--)
  {
    sel.remove(i);
  }*/  
  sel.options.length = 0;
  var request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var liste = JSON.parse(request.responseText);
      var opt = document.createElement('option');
      if (selOption!=0){
        opt.innerHTML = "*** Sélectionnez ***";
        opt.value = '0';
        sel.appendChild(opt);
      }
      for(var i = 0; i < liste.length; i++) {
          var opt = document.createElement('option');
          opt.innerHTML = liste[i][id_desc];
          opt.value = liste[i][id_code];
          sel.appendChild(opt);
      }
      if (copycbo!="")
        copierCBOData(id_cbo,copycbo);
    }
  };
  request.send();
} // loadCBO()


// Fonction pour changer la langue de façon dynamique
function changeLangue(){
  var url = "/ttraduction?module=admin";
  var lan = document.getElementById("cboxfltLang").value;
  if (lan!=null && lan!="")
    url = url +'&lan=' +lan;
  
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  //bootbox.alert("url : " + url);
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var liste = JSON.parse(request.responseText);

      for(var i = 0; i < liste.length; i++) 
        if (document.getElementById(liste[i]["id_controle"])!=null) 
          document.getElementById(liste[i]["id_controle"]).innerHTML = liste[i]["texte"];
    }
  };
  request.send();
} // end changer la langue


function filtreInfo(){
  document.getElementById("iddoc").value=0;  
  var request = new XMLHttpRequest();
  var url ="";

  if (document.getElementById("cboxfltType").value!=0)
    url=url+"&type="+document.getElementById("cboxfltType").value;
  if (document.getElementById("txtfltTitr").value!="")
    url=url+"&title="+document.getElementById("txtfltTitr").value;
  if (document.getElementById("cboxfltAute").value!=0)
    url=url+"&auteur="+document.getElementById("cboxfltAute").value;
  if (document.getElementById("cboxfltEdit").value!=0)
    url=url+"&editeur="+document.getElementById("cboxfltEdit").value;
  if (document.getElementById("txtfltIsbn").value!="")
    url=url+"&isbn="+document.getElementById("txtfltIsbn").value;
  if (document.getElementById("cboxfltEtat").value!=0)
    url=url+"&etat="+document.getElementById("cboxfltEtat").value;

  //document.getElementById("idfiltre").value = url;
  url = "/qdocuments?var=0"+url;

  request.open("GET", url, true);
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var info = JSON.parse(request.responseText);
     $('#tableEd').bootstrapTable('refresh');
    }
  };
  request.send();  
}

// start enregistrer Type
function enregistrerType(){

  if(validerTyp()){
    var request = new XMLHttpRequest();
    var jsonObj = {
                  codetype: document.getElementById("txttypId").value,
                  type: document.getElementById("txttypType").value,
                  };
    var url = "/saveType";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //bootbox.alert("Mise à jour réussi");
          if (document.getElementById("chBtypLoop").checked)  {
              ramplirtabTyp();
            }
            else{ 
              $('#blockType').modal('hide'); 
              }       
          loadListe();
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonObj));
  }
}// end enregistrer

// fonction valider Type
function validerTyp(){
  var result=true;msg="";
  if(document.getElementById("txttypId").value=="")
    msg="ajouter un ID de type s'il te plait";
  if(msg=="" && document.getElementById("txttypType").value=="")
    msg="ajouter un type s'il te plait";
  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

function ramplirtabTyp(){
  clairtxtBoxType();
  $('#tableTyp').bootstrapTable('refresh');
} // End ramplir

function clairtxtBoxType(){
  document.getElementById("txttypId").value = "";
  document.getElementById("txttypType").value = "";
} // clairtxtBoxLan()

function supprimerType(){
  var request = new XMLHttpRequest();
  var id = document.getElementById("txttypId").value;
  var url = "/ttype/"+id ;
  request.open("DELETE", url, true);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        ramplirtabTyp();
        // bootbox.alert("Suppression réussi");
        bootbox.alert("Suppression réussi");
        document.getElementById("txttypId").focus();
       }
      else {bootbox.alert("Erreur lors de la suppression");}
    }
  };
  request.send();
} // end supprimer
// end Type

// start État
function enregistrerEtat(){

  if(validerEta()){
    var request = new XMLHttpRequest();
    var jsonObj = {
                  codeetat: document.getElementById("txtetaId").value,
                  etat: document.getElementById("txtetaEtat").value,
                  };
    var url = "/saveEtat";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //bootbox.alert("Mise à jour réussi");
          if (document.getElementById("chBetaLoop").checked)  {
              ramplirtabTyp();
            }
            else{ 
              $('#blockEtat').modal('hide'); 
              }       
          loadListe();
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonObj));
  }
}// end enregistrer

function validerEta(){
  var result=true;msg="";
  if(msg=="" && document.getElementById("txtetaId").value=="")
    msg="ajouter un ID d'état s'il te plait";
  if(msg=="" && document.getElementById("txtetaEtat").value=="")
    msg="ajouter un état s'il te plait";
  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

function ramplirtabEta(){
  clairtxtBoxEtat();
  $('#tableEta').bootstrapTable('refresh');
} // End ramplir

function clairtxtBoxEtat(){
  //document.getElementById("txtetaId").readOnly = true;
  document.getElementById("txtetaId").value = "";
  document.getElementById("txtetaEtat").value = "";
} // clairtxtBoxLan()

function supprimerEtat(){
  var request = new XMLHttpRequest();
  var id = document.getElementById("txtetaId").value;
  var url = "/tetat/"+id ;
  request.open("DELETE", url, true);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        ramplirtabEta();
        // bootbox.alert("Suppression réussi");
        bootbox.alert("Suppression réussi");
        document.getElementById("txtetaEtat").focus();
       }
      else {bootbox.alert("Erreur lors de la suppression");}
    }
  };
  request.send();
} // end supprimer
// end Type
// end État 

// Modal Auteur : #blockAuteur. Fonction qui enregistre le auteur
function enregistrerAuteur() {
  if (validerAut()){
    var request = new XMLHttpRequest();
    var jsonObjAut = {
                      acodeauteur: document.getElementById("txtautId").value,
                      anom: document.getElementById("txtautNom").value,
                      aprenom: document.getElementById("txtautPrenom").value,
                    };
    var url = "/tauteur/saveAuteur";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //bootbox.alert("Mise à jour réussi");
          if (document.getElementById("chBautLoop").checked)  {
              ramplirtabAut();
            }
            else{ 
              $('#blockAuteur').modal('hide'); 
              }       
          loadListe();
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonObjAut));
  }
}// end enregistrer

// Modal Auteur : #blockAuteur. Fonction qui valide le Auteur.
function validerAut(){
  var result=true;msg="";
  if(document.getElementById("txtautNom").value=="")
    msg="choisir un Nom de Auteur s'il te plait";
  if(msg=="" && document.getElementById("txtautPrenom").value=="")
    msg="choisir un Prenom de Auteur s'il te plait";
  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

// Modal Auteur : #blockAuteur. Fonction qui va remplir la vue du auteur.
function ramplirtabAut(){
  clairtxtBoxAut();
  $('#tableAut').bootstrapTable('refresh');
} // end ramplir

// Modal Auteur : #blockAuteur. Fonction qui va vider les zones de texte de la vue du auteur.
function clairtxtBoxAut(){
  document.getElementById("txtautId").readOnly = true;
  document.getElementById("txtautId").value = 0;
  document.getElementById("txtautNom").value = "";
  document.getElementById("txtautPrenom").value = "";
}

// Modal Auteur : #blockAuteur. Function qui supprime un auteur
function supprimerAuteur(){
  var request = new XMLHttpRequest();
  var id = document.getElementById("txtautId").value;
  var url = "/tauteur/"+id ;
  request.open("DELETE", url, true);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        ramplirtabAut();
        // bootbox.alert("Suppression réussi");
        bootbox.alert("Suppression réussi");
        document.getElementById("txtautNom").focus();
       }
      else {bootbox.alert("Erreur lors de la suppression");}
    }
  };
  request.send();
} // end supprimer

// Modal Editeur : #blockEditeur. Function qui enregistre le editeur
function enregistrerEditeur() {
  if (validerEdi()){
    var request = new XMLHttpRequest();
    var jsonObj = {
                      codeediteur: document.getElementById("txtediId").value,
                      nomediteur: document.getElementById("txtediNom").value,
                      //codepays: document.getElementById("cboxedicodepays").value,
                      codeville: document.getElementById("cboxedicodeville").value,
                    }; 
    var url = "/tediteur/saveEditeur";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //bootbox.alert("Mise à jour réussi");
          if (document.getElementById("chBediLoop").checked)  {
              ramplirtabEdi();
            }
            else{ 
              $('#blockEditeur').modal('hide'); 
              }       
          loadListe();
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonObj));
  }
} // end enregistrer

// Fonction qui valide le Editeur.
function validerEdi(){
  var result=true;msg="";
  if(document.getElementById("txtediNom").value=="")
    msg="ajouter un Nom d'Editeur s'il te plait";
  if(msg=="" && document.getElementById("cboxedicodeville").value=="")
    msg="ajouter une ville s'il te plait";
  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

// Modal Editeur : #blockEditeur. Fonction qui va remplir la vue du editeur.
function ramplirtabEdi(){
  clairtxtBoxEdi();
  $('#tableEdi').bootstrapTable('refresh');

/* getInfo
	var request = new XMLHttpRequest();
  var url ="";
	url = "/tediteur";
	request.open("GET", url, true);
	
	request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var info = JSON.parse(request.responseText); 
      var tbody = document.getElementById("tbodyediResult");
      
      tbody.innerHTML = "";

      for (i = 0; i < info.length; i++) {
          var tr = document.createElement('TR');     
          setCelulle(info[i].codeediteur,null,tr);
          setCelulle(info[i].nomediteur || '',null,tr);
          setCelulle(info[i].codepays,null,tr);
          setCelulle(info[i].codeville,null,tr);
          setCelulle(info[i].utilise,true,tr);
          tbody.appendChild(tr);
      }
    }
  };
  request.send();  */
} // end ramplir

// Modal Editeur : #blockEditeur. Fonction qui va vider les zones de texte de la vue du editeur.  // Andy
function clairtxtBoxEdi(){
  document.getElementById("cboxedicodeville").innerHTML=document.getElementById("cboxedVill").innerHTML;
  document.getElementById("txtediId").readOnly = true;
  document.getElementById("txtediId").value = 0;
  document.getElementById("txtediNom").value = "";
  document.getElementById("cboxedicodeville").selectedIndex=0; //.value=0;
}

// Modal Editeur : #blockEditeur. Function qui supprime un editeur
function supprimerEditeur(){
  var request = new XMLHttpRequest();
  var id = document.getElementById("txtediId").value;
  var url = "/tediteur/"+id ;
  request.open("DELETE", url, true);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        ramplirtabEdi();
        // bootbox.alert("Suppression réussi");
        bootbox.alert("Suppression réussi");
        document.getElementById("txtediNom").focus();
       }
      else {bootbox.alert("Erreur lors de la suppression");}
    }
  };
  request.send();
} // end supprimer

// Modal Ville : #blockVille. Fonction qui enregistre la ville
function enregistrerVille() {
  if (validerVil()){
    var request = new XMLHttpRequest();
    var jsonObjVil = {
                      codeville: document.getElementById("txtvilId").value,
                      nomville: document.getElementById("txtvilNomville").value,
                      //codepays: document.getElementById("cboxvilNompays").value,
                    };
    var url = "/tville/saveVille"; //var url = "/tauteur/saveAuteur";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //bootbox.alert("Mise à jour réussi");
          if (document.getElementById("chBvilLoop").checked)  {
              ramplirtabVil();
            }
            else{ 
              $('#blockVille').modal('hide'); 
              }       
          loadListe();
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonObjVil));
  }
}// end enregistrer

// Modal Auteur : #blockVille. Fonction qui valide la ville.
function validerVil(){
  var result=true;msg="";
  if(document.getElementById("txtvilNomville").value=="")
    msg="ajouter une Ville s'il te plait";
  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

// Modal Ville : #blockVille. Fonction qui va remplir la vue du ville.
function ramplirtabVil(){
  clairtxtBoxVil();
  $('#tableVil').bootstrapTable('refresh');
} // end ramplir

// Modal Ville : #blocVille. Fonction qui va vider les zones de texte de la vue du ville.
function clairtxtBoxVil(){
      //document.getElementById("cboxvilNompays").innerHTML=document.getElementById("cboxedPays").innerHTML;
      document.getElementById("txtvilId").readOnly = true;
      //document.getElementById("txtvilcodepays").readOnly = true;
      document.getElementById("txtvilId").value = 0;
      document.getElementById("txtvilNomville").value = "";
      document.getElementById("cboxvilNompays").selectedIndex = 0;
} // end clairtxtBoxVil()

// Modal Ville : #blocVille. Function qui supprime une ville
function supprimerVille(){
  var request = new XMLHttpRequest();
  var id = document.getElementById("txtvilId").value;
  var url = "/tville/"+id ;

  request.open("DELETE", url, true);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        ramplirtabVil();
        // bootbox.alert("Suppression réussi");
        bootbox.alert("Suppression réussi");
        document.getElementById("txtvilNomville").focus();
       }
      else {bootbox.alert("Erreur lors de la suppression");}
    }
  };
  request.send();
} // end supprimer

// Modal Langue : #blockLangue. Fonction qui enregistre la langue
function enregistrerLangue() {
  if (validerLan()){
    var request = new XMLHttpRequest();
    var jsonObjLan = {
                      codelangue: document.getElementById("txtlanId").value,
                      langue: document.getElementById("txtlanLangue").value,
                    };
    var url = "/tlangue/saveLangue"; //var url = "/tauteur/saveAuteur";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //bootbox.alert("Mise à jour réussi");
          if (document.getElementById("chBlanLoop").checked)  {
              ramplirtabLan();
            }
            else{ 
              $('#blockLangue').modal('hide'); 
              }       
          loadListe();
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonObjLan));
  }
}// end enregistrer

// Modal Langue : #blockLangue. Fonction qui valide la langue.
function validerLan(){
  var result=true;msg="";
  if(document.getElementById("txtlanId").value=="")
    msg="ajouter un ID de Langue s'il te plait";
  if(msg=="" && document.getElementById("txtlanLangue").value=="")
    msg="ajouter une Langue s'il te plait";
  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

// Modal Langue : #blockLangue.  Fonction qui va remplir la vue langue.
function ramplirtabLan(){
  clairtxtBoxLan();
  $('#tableLan').bootstrapTable('refresh');
} // End ramplir

// Modal Langue : #blocLangue. Fonction qui va vider les zones de texte de la vue du langue.
function clairtxtBoxLan(){
  document.getElementById("txtlanId").value = "";
  document.getElementById("txtlanLangue").value = "";
} // clairtxtBoxLan()

// Modal Langue : #blocLangue. Function qui supprime une langue
function supprimerLangue(){
  var request = new XMLHttpRequest();
  var id = document.getElementById("txtlanId").value;
  var url = "/tlangue/"+id ;
  request.open("DELETE", url, true);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        ramplirtabLan();
        // bootbox.alert("Suppression réussi");
        bootbox.alert("Suppression réussi");
        document.getElementById("txtlanId").focus();
       }
      else {bootbox.alert("Erreur lors de la suppression");}
    }
  };
  request.send();
} // end supprimer

// Modal Classement : #blockClassement. Fonction qui enregistre le auteur
function enregistrerClassement() {
  if (validerCla()){
    var request = new XMLHttpRequest();
    var jsonObj = {
                      codeclassement: document.getElementById("txtclaId").value,
                      nom: document.getElementById("txtclaClassement").value,
                    };
    var url = "/tclassement/savClassement";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //bootbox.alert("Mise à jour réussi");
          if (document.getElementById("chBclaLoop").checked)  {
              ramplirtabCla();
            }
            else{ 
              $('#blockClassement').modal('hide'); 
              }       
          loadListe();
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonObj));
  }
}// end enregistrer

// Modal Classement : #blockClassement. Fonction qui va remplir la vue du classement.
function ramplirtabCla(){
  $('#tableCla').bootstrapTable('refresh');
  clairtxtBoxCla();
} // end ramplir

// Modal Classement : #blocClassement. Fonction qui va vider les zones de texte de la vue du classement.
function clairtxtBoxCla(){
      document.getElementById("txtclaId").readOnly = true;
      document.getElementById("txtclaId").value = 0;
      document.getElementById("txtclaClassement").value = "";
      document.getElementById("chBclaLoop").unchecked;
} // clairtxtBoxCla()

// Modal Classement : #blocClassement. Fonction qui valide le Classement.
function validerCla(){
  var result=true;msg="";
  if(document.getElementById("txtclaClassement").value=="")
    msg="choisir le Classement s'il te plait";
  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

// Modal Classement : #blocClassement. Function qui supprime un classement
function supprimerClassement(){
  var request = new XMLHttpRequest();
  var id = document.getElementById("txtclaId").value;
  var url = "/tclassement/"+id ;
  request.open("DELETE", url, true);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        ramplirtabCla();
        // bootbox.alert("Suppression réussi");
        bootbox.alert("Suppression réussi");
        document.getElementById("txtclaClassement").focus();
       }
      else {bootbox.alert("Erreur lors de la suppression");}
    }
  };
  request.send();
} // end supprimer

// Modal Famille : #blockFamille. Fonction qui enregistre la famille
function enregistrerFamille() {
  if (validerFam()){
    var request = new XMLHttpRequest();
    var jsonObj = {
                      idfamille: document.getElementById("txtfamId").value,
                      codetype: document.getElementById("txtfamCode").value,
                      nomfamille: document.getElementById("txtfamNom").value,
                    };
    var url = "/tfamille/saveFamille";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //bootbox.alert("Mise à jour réussi");
          if (document.getElementById("chBfamLoop").checked)  {
              ramplirtabFam();
            }
            else{ 
              $('#blockFamille').modal('hide'); 
              }       
          loadListe();
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonObj));
  }
}// end enregistrer

// Modal Famille : #blockFamille. Fonction qui valide la famille.
function validerFam(){
  var result=true;msg="";

  if(document.getElementById("txtfamCode").value=="")
    msg="ajouter un code de Famille s'il te plait";
  if(msg=="" && document.getElementById("txtfamNom").value=="")
    msg="ajouter un nom de famille s'il te plait";
  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

// Modal Famille : #blockFamille. Fonction qui va remplir la vue du famille.
function ramplirtabFam(){
  clairtxtBoxFam();
  $('#tableFam').bootstrapTable('refresh');
}

function clairtxtBoxFam(){
  document.getElementById("txtfamId").readOnly = true;
  document.getElementById("txtfamId").value = 0;
  document.getElementById("txtfamCode").value = "";
  document.getElementById("txtfamNom").value = "";
}

// Modal Famille : #blockFamille. Function qui supprime une famille
function supprimerFamille(){
  var request = new XMLHttpRequest();
  var id = document.getElementById("txtfamId").value;
  var url = "/tfamille/"+id ;
  request.open("DELETE", url, true);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        ramplirtabFam();
        // bootbox.alert("Suppression réussi");
        document.getElementById("txtfamCode").focus();
       }
      else {bootbox.alert("Erreur lors de la suppression");}
    }
  };
  request.send();
} // end supprimer

// Modal Traduction : #blockTraduction. Function qui enregistre ttraduction
function enregistrerTraduction() {
  if (validerTra()){
    var request = new XMLHttpRequest();
    var json = {
                      idttraduction: document.getElementById("txttraId").value,
                      id_controle: document.getElementById("txttraControle").value,
                      module: document.getElementById("txttraModule").value,
                      txtfrancais: document.getElementById("txttraFrancais").value,
                      txtanglais: document.getElementById("txttraAnglais").value,
                    }; 
    var url = "/interfaceTraduction/saveTraduction";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //bootbox.alert("Mise à jour réussi");
          if (document.getElementById("chBtraLoop").checked)  {
              ramplirtabTra();
            }
            else{ 
              $('#blockTraduction').modal('hide'); 
              }       
          loadListe();
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(json));
  }
} // end enregistrer

// Modal Traduction : #blockTraduction. Fonction qui valide ttraduction.
function validerTra(){
  var result=true;msg="";
  if(document.getElementById("txttraControle").value=="")
    msg="ajouter un Controle s'il te plait";
  if(msg=="" && document.getElementById("txttraModule").value=="")
    msg="ajouter un Module s'il te plait";
  if(msg=="" && document.getElementById("txttraFrancais").value=="")
    msg="ajouter un texte francais s'il te plait";
  if(msg=="" && document.getElementById("txttraAnglais").value=="")
    msg="ajouter un texte Anglais s'il te plait";
  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

// Modal Traduction : #blockTraduction. Fonction qui va remplir ttraduction.
function ramplirtabTra(){
  clairtxtBoxTra();
  $('#tableTra').bootstrapTable('refresh');
  document.getElementById("txttraModule").value = "admin";
} // end ramplir

// Modal Traduction : #blockTraduction. Fonction qui va vider les zones de texte de la vue ttraduction.
function clairtxtBoxTra(){
  document.getElementById("txttraId").readOnly = true;
  document.getElementById("txttraId").value = 0;
  document.getElementById("txttraControle").value = "";
  document.getElementById("txttraModule").value = "";
  document.getElementById("txttraFrancais").value = "";
  document.getElementById("txttraAnglais").value = "";
}

// Modal Traduction : #blockTraduction. Function qui supprime une ligne dans ttraduction
function supprimerTraduction(){
  var request = new XMLHttpRequest();
  var id = document.getElementById("txttraId").value;
  var url = "/interfaceTraduction/deleteTraduction"+id ;
  //bootbox.alert("supprimerTraduction()  " + url);
  request.open("DELETE", url, true);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        ramplirtabTra();
        // bootbox.alert("Suppression réussi");
        bootbox.alert("Suppression réussi");
        document.getElementById("txttraControle").focus();
       }
      else {bootbox.alert("++Erreur lors de la suppression");}
    }
  };
  request.send();
} // end supprimer

//Modal Utilisateurs : #blockUtilisateurs. Fonction qui enregistre les Utilisateurs
function enregistrerUtilisateurs() {
  if (validerUti()){
    var request = new XMLHttpRequest();
    var jsonObj = {
                      coduser: document.getElementById("txtutiId").value,
                      password: document.getElementById("txtutiNom").value,
                      nom: document.getElementById("txtutiPrenom").value,
                      prenom: document.getElementById("txtutiMotdepass").value,
                      admin: document.getElementById("txtutiAdmin").value,
                      inactif: document.getElementById("txtutiInactif").value,
                    };
    var url = "/tusers/saveUsers";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //bootbox.alert("Mise à jour réussi");
          if (document.getElementById("chButiLoop").checked)  {
            ramplirtabUti();
            }
            else{ 
              $('#blockUtilisateurs').modal('hide'); 
              }       
          loadListe();
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonObj));
  }
}// end enregistrer

// Modal Famille : #blockFamille. Fonction qui valide les utilisateurs.
function validerUti(){
  var result=true;msg="";
  if(document.getElementById("txtutiNom").value=="")
    msg="ajouter un nom d'Utilisateur  s'il te plait";
  if(msg=="" && document.getElementById("txtutiPrenom").value=="")
    msg="ajouter un prenom d'Utilisateur s'il te plait";
  if(msg=="" && document.getElementById("txtutiMotdepass").value=="")
    msg="ajouter un mot de pass d'Utilisateur s'il te plait";
  if(msg=="" && document.getElementById("txtutiAdmin").value=="")
    msg="ajouter un admin d'Utilisateur s'il te plait";
  if(msg=="" && document.getElementById("txtutiInactif").value=="")
    msg="ajouter actif ou inactif d'Utilisateur s'il te plait";
  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

// Modal Utilisateurs : #blockUtilisateurs. Fonction qui va remplir la vue du utilisateurs.
function ramplirtabUti(){
  clairtxtBoxUti();
  $('#tableUti').bootstrapTable('refresh');
/*
	var request = new XMLHttpRequest();
  var url ="";
	url = "/tusers";
	request.open("GET", url, true);
	
	request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var info = JSON.parse(request.responseText); 
      var tbody = document.getElementById("tbodyutiResult");
      clairtxtBoxUti();
      tbody.innerHTML = "";
      for (i = 0; i < info.length; i++) {
          var tr = document.createElement('TR');     
          setCelulle(info[i].coduser,null,tr);
          setCelulle(info[i].password || '',null,tr);
          setCelulle(info[i].nom,null,tr);
          setCelulle(info[i].prenom,null,tr);
          setCelulle(info[i].admin,null,tr);
          setCelulle(info[i].inactif,null,tr);
          setCelulle(info[i].utilise,true,tr);
          tbody.appendChild(tr);
      }
    }
  };
  request.send();  */
} // end ramplir

// Modal Utilisateurs : #blockUtilisateurs
function clairtxtBoxUti(){
      //document.getElementById("txtutiId").readOnly = true;
      //document.getElementById("txtutiNom").readOnly = true;
      document.getElementById("txtutiId").value = "";
      document.getElementById("txtutiNom").value = "";
      document.getElementById("txtutiPrenom").value = "";
      document.getElementById("txtutiMotdepass").value = "";
      document.getElementById("txtutiAdmin").value = "";
      document.getElementById("txtutiInactif").value = "";
}

// Modal Utilisateurs : #blockUtilisateurs. Function qui supprime un utilisateur
function supprimerUtilisateurs(){
  var request = new XMLHttpRequest();
  var id = document.getElementById("txtutiId").value;
  var url = "/tusers/"+id ;
 // bootbox.alert("url = " + url);
  request.open("DELETE", url, true);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        ramplirtabUti();
        // bootbox.alert("Suppression réussi");
        bootbox.alert("Suppression réussi");
        document.getElementById("txtutiNom").focus();
       }
      else {bootbox.alert("Erreur lors de la suppression");}
    }
  };
  request.send();
} // end supprimer

// Modal Preferences : #blockPreferences. Fonction qui enregistre les Preferences
function enregistrerPreferences() {
  if (validerPre()){
    var request = new XMLHttpRequest();
    var jsonObj = {
                      codepreferences: document.getElementById("txtpreId").value,
                      nomEntreprise: document.getElementById("txtpreEntreprise").value,
                      nomContact: document.getElementById("txtpreContact").value,
                      courriel: document.getElementById("txtpreCourriel").value,
                      telephone: document.getElementById("txtpreTelephone").value,
                      adresse: document.getElementById("txtpreAdresse").value,
                      commentaire: document.getElementById("txtpreCommentaire").value,
                      preAdLat: document.getElementById("txtpreAdLat").value,
                      preAdLng: document.getElementById("txtpreAdLng").value,
                      preZoom: document.getElementById("txtpreZoom").value,
                      premKrAdLat: document.getElementById("txtpremKrAdLat").value,
                      premKrAdLng: document.getElementById("txtpremKrAdLng").value,
                      filePath: document.getElementById("txtpreFilepath").value,
                      imgPath: document.getElementById("txtpreImgpath").value,
                    };
    var url = "/tpreferences/savePreferences";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //bootbox.alert("Mise à jour réussi");
          bootbox.alert("Mise à jour réussi");
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonObj));
  }
  
}// end enregistrer

// Modal Preferences : #blockPreferences. Fonction qui valide les Preferences.
function validerPre(){
  var result=true;msg="";
  if(document.getElementById("txtpreEntreprise").value=="")
    msg="ajouter un nom d'Entreprise  s'il te plait";
  if(msg=="" && document.getElementById("txtpreContact").value=="")
    msg="ajouter un nom du Contact s'il te plait";
  if(msg=="" && document.getElementById("txtpreCourriel").value=="")
    msg="ajouter un Courriel s'il te plait";
  if(msg=="" && document.getElementById("txtpreTelephone").value=="")
    msg="ajouter un Téléphone s'il te plait";
  if(msg=="" && document.getElementById("txtpreAdresse").value=="")
    msg="ajouter une adresse s'il te plait";
  if(msg=="" && document.getElementById("txtpreCommentaire").value=="")
    msg="ajouter un Commentaire s'il te plait";
  if(msg=="" && document.getElementById("txtpreAdLat").value=="")
    msg="ajouter latitude s'il te plait";
  if(msg=="" && document.getElementById("txtpreAdLng").value=="")
    msg="ajouter longitude s'il te plait";
  if(msg=="" && document.getElementById("txtpreZoom").value=="")
    msg="ajouter zoom s'il te plait";
  if(msg=="" && document.getElementById("txtpremKrAdLat").value=="")
    msg="ajouter latiude s'il te plait";
  if(msg=="" && document.getElementById("txtpremKrAdLng").value=="")
    msg="ajouter longitude s'il te plait";
  if(msg=="" && document.getElementById("txtpreFilepath").value=="")
    msg="ajouter le chemin du fichier s'il te plait";
    if(msg=="" && document.getElementById("txtpreImgpath").value=="")
    msg="ajouter le chemin du galerie s'il te plait";

  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

/* getInfo
// Modal Preferences : #blockPreferences. Fonction qui va remplir la vue du preferences.
function remplirvuePre(){
	var request = new XMLHttpRequest();
  var url ="";
	url = "/tpreferences";
	request.open("GET", url, true);
	
	request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var info = JSON.parse(request.responseText); 
      var tbody = document.getElementById("tbodypreResult");
      clairtxtBoxPre();
      tbody.innerHTML = "";
      for (i = 0; i < info.length; i++) {
          var tr = document.createElement('TR');     
          setCelulle(info[i].codepreferences,null,tr);
          setCelulle(info[i].nomEntreprise || '',null,tr);
          setCelulle(info[i].nomContact,null,tr);
          setCelulle(info[i].courriel,null,tr);
          setCelulle(info[i].telephone,null,tr);
          setCelulle(info[i].adresse,null,tr);
          setCelulle(info[i].commentaire,null,tr);
          setCelulle(info[i].preAdLat,null,tr);
          setCelulle(info[i].preAdLng,null,tr);
          setCelulle(info[i].preZoom,null,tr);
          setCelulle(info[i].premKrAdLat,null,tr);
          setCelulle(info[i].premKrAdLng,null,tr);
          //setCelulle(info[i].utilise,true,tr);
          tbody.appendChild(tr);
      }
    }
  };
  request.send();  
} // end ramplir
*/
// Modal Preferences : #blockPreferences.

// Modal Preferences : #blockPreferences. Function qui vide les text box preferences
function clairtxtBoxPre(){
  document.getElementById("txtpreEntreprise").value = "";
  document.getElementById("txtpreContact").value = "";
  document.getElementById("txtpreCourriel").value = "";
  document.getElementById("txtpreTelephone").value = "";
  document.getElementById("txtpreAdresse").value = "";
  //- coordonnées
  document.getElementById("txtpreAdLat").value = "";
  document.getElementById("txtpreAdLng").value = "";
  document.getElementById("txtpreZoom").value = "";
  document.getElementById("txtpremKrAdLat").value = "";
  document.getElementById("txtpremKrAdLng").value = "";
  // file path
  document.getElementById("txtpreFilepath").value = "";
  document.getElementById("txtpreImgpath").value = "";
  document.getElementById("txtpreCommentaire").value = "";
} // end vider

  // Function qui visualise les preferences dans contactez nous et preferances
  function visualiserPreferences(aMode){
  if (aMode=="M")  { 
    var request = new XMLHttpRequest();
    var url ="";
  url = "/tpreferences";
	request.open("GET", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        var info = JSON.parse(request.responseText);
        document.getElementById("txtpreId").readOnly = true;
        document.getElementById("txtjoiId").readOnly = true;
        // Modal Preferences : #blockPreferences. @google maps
        if (info.length>0) {
          for (i = 0; i < info.length; i++) {
              // Modal Contactez : #blockContactez. Function qui visualise les preferences
              document.getElementById("lbljoiMEntreprise").innerHTML=info[0].nomEntreprise;
              document.getElementById("lbljoiMContact").innerHTML=info[0].nomContact;
              document.getElementById("lbljoiMCourriel").innerHTML=info[0].courriel;
              document.getElementById("lbljoiMTelephone").innerHTML=info[0].telephone;
              document.getElementById("lbljoiMAdresse").innerHTML=info[0].adresse;
              document.getElementById("lbljoiMCommentaire").innerHTML=info[0].commentaire;
              // Modal Preferences : #blockPreferences. Function qui visualise les preferences
              document.getElementById("txtpreId").value=info[0].codepreferences;
              document.getElementById("txtpreEntreprise").value=info[0].nomEntreprise;
              document.getElementById("txtpreContact").value=info[0].nomContact;
              document.getElementById("txtpreCourriel").value=info[0].courriel;
              document.getElementById("txtpreTelephone").value=info[0].telephone;
              staticmKrContent=document.getElementById("txtpreAdresse").value=info[0].adresse;
              document.getElementById("txtpreCommentaire").value=info[0].commentaire;
              //- coordonnées
              staticadLat = document.getElementById("txtpreAdLat").value=info[0].preAdLat;
              staticadLng=document.getElementById("txtpreAdLng").value=info[0].preAdLng;
              staticzm=document.getElementById("txtpreZoom").value=info[0].preZoom;
              staticmKrLat=document.getElementById("txtpremKrAdLat").value=info[0].premKrAdLat;
              staticmKrLng=document.getElementById("txtpremKrAdLng").value=info[0].premKrAdLng;
              document.getElementById("txtpreFilepath").value=info[0].filePath;
              document.getElementById("txtpreImgpath").value=info[0].imgPath;
              // @google maps
              initMap();
              }
		      }
      }
    };
    request.send();     
  } 
} // end visualiser preferences

// Modal Preferences : #blockPreferences. @google maps
function initMap() {

      // Montreal
      // var adLat = 45.5017; 
      var adLat = staticadLat;
      // var adLng = -73.5673;
      var adLng = staticadLng;
      /// var zm = 14;
      var zm = staticzm;

      // var mKrLat = 45.494015;
      var mKrLat = staticmKrLat;
      // var mKrLng = -73.580768;
      var mKrLng = staticmKrLng;
      // 1822, Boulevard de Maisonneuve Ouest, Montréal (Québec) H3H1J8;
      var mKrContent =  staticmKrContent;

      //map options
      var options ={
        zoom:zm,
        center:{lat:adLat , lng:adLng}
      }

      // New map
      var mapPr = new google.maps.Map(document.getElementById('mapPr'),options);

      var mapNj = new google.maps.Map(document.getElementById('mapNj'),options);

      // Marker in the map
      var markerPr = new google.maps.Marker({
        position:{lat:mKrLat, lng:mKrLng},
        map: mapPr,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      });

      var markerNj = new google.maps.Marker({
        position:{lat:mKrLat, lng:mKrLng},
        map: mapNj,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      });

      var infowindow = new google.maps.InfoWindow({
        content: mKrContent
      });

      markerPr.addListener('click', function() {
        infowindow.open(mapPr, markerPr);
      });

      markerNj.addListener('click', function() {
        infowindow.open(mapNj, markerNj);
      });
} // end  @google maps

// Fonction qui génère les fichiers CSV et PDF
function genererFichier(fichier){
  var //url = document.getElementById("idfiltre").value;
  url = "/documents?doc="+fichier;
  console.log("url: "+url);
  window.open(url,"_self");
}

function visualiserDocument(aMode){
 // bootbox.alert(aMode);
  var vDisplay = "none";
  var vButtonList = ["btnedaddAute","btnedaddEdit","btnedaddVill","btnedaddClas","btnedaddFami"];
  for (var i = 0; i < vButtonList.length; i++) {
    if(document.getElementById(vButtonList[i])!=null){
      document.getElementById(vButtonList[i]).firstChild.data = "( - )";
      document.getElementById(vButtonList[i]).click();
    }
  }
  //bootbox.alert (typeof(document.getElementById("txtedaddVille")));
  var vControles = ["cboxedType","txtedTitr","txtedIsbn","txtedAnne","cboxedLang","txtedPrix","txtedNume","txtedFich","txtedComm",
  "txtedDona","cboxedAute","cboxedEtat","cboxedClas","cboxedFami","cboxedEdit","txtedaddVille"];
  for (var i = 0; i < vControles.length; i++) {
    if(typeof(document.getElementById(vControles[i])) == 'object' && document.getElementById(vControles[i])!=null ){
      if(document.getElementById(vControles[i]).type =='select-one')
        document.getElementById(vControles[i]).selectedIndex=0;
      else 
        document.getElementById(vControles[i]).value="";
    } 
  }
  // visualiser documents dan le modal admin
  if (aMode=="E")  {
    var iddoc =  document.getElementById("iddoc").value;
    var request = new XMLHttpRequest();
    var url = "/qdocuments?id="+iddoc;
//bootbox.alert (url);
    request.open("GET", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
  
        var info = JSON.parse(request.responseText);
        if (info.length>0) {
          document.getElementById("cboxedType").value=info[0].codetype;
          // titre du document pdf affiché dans le deuxième modal
          document.getElementById("edTitleDeuxiemeModal").innerHTML=info[0].title;
          document.getElementById("txtedTitr").value=info[0].title;
          document.getElementById("txtedIsbn").value=info[0].isbn;
          document.getElementById("txtedAnne").value=info[0].annee;
          document.getElementById("cboxedLang").value=info[0].langue;
          document.getElementById("txtedPrix").value=info[0].prix;
          document.getElementById("txtedQuantite").value=info[0].quantite;
          if(document.getElementById("txtedNume")!=null) {
            document.getElementById("txtedNume").value=info[0].nbpages;
          }
          
          document.getElementById("txtedComm").value=info[0].commentaire;
          if(document.getElementById("txtedDona")!=null)document.getElementById("txtedDona").value=info[0].donateur;
          document.getElementById("cboxedAute").value=info[0].codeauteur;
          document.getElementById("cboxedEtat").value=info[0].codeetat;
          if(document.getElementById("cboxedClas")!=null) document.getElementById("cboxedClas").value=info[0].codeclassement;
          if(document.getElementById("cboxedFami")!=null) document.getElementById("cboxedFami").value=info[0].idfamille;
          var editeur = document.getElementById("cboxedEdit").value=info[0].codeediteur;
          //alert(editeur);
          // on Gard le nom de fichier de document chargé
          document.getElementById("txtedFich").value=info[0].pathdocument;
          document.getElementById("txtedFich-hide").value=info[0].pathdocument;
          //enable button charger fichier
          if(document.getElementById("txtedFich").value!="" ){
           document.getElementById("visualiser-btn").disabled = false;
          }else{
            document.getElementById("visualiser-btn").disabled = true;
          }
         
          }
      }
    };
    request.send();     
  } // end visualiser documents dan le modal admin
  else
    document.getElementById("iddoc").value =0; 

  if (document.getElementById("btnfltNouv") == null) {
     document.getElementById("cboxedType").disabled = true;
     document.getElementById("txtedTitr").readOnly = true;
     document.getElementById("txtedIsbn").readOnly = true;
     document.getElementById("cboxedAute").disabled = true;
     document.getElementById("cboxedEdit").disabled = true;
     document.getElementById("txtedComm").readOnly = true;
     document.getElementById("txtedAnne").readOnly = true;
     document.getElementById("txtedFich").readOnly = true;
     document.getElementById("txtedFich-hide").readOnly = true;
     document.getElementById("txtedPrix").readOnly = true;
     document.getElementById("txtedQuantite").readOnly = true;
     document.getElementById("cboxedEtat").disabled = true;
     document.getElementById("cboxedLang").disabled = true;
     document.getElementById("txtedDona").readOnly = true;
  } 
  //bootbox.alert($('#blockEdit').hasClass('in'));
  if( $('#blockEdit').hasClass('in') )
    var a=1;
  else 
   $("#blockEdit").modal({backdrop: 'static', keyboard: false}); //("show");
   // $("#blockEdit").modal(); //("show");
  
} // end visualiser document

// Function pour montrer l'intro de la application
function generateAproposdenous(){
    var request = new XMLHttpRequest();
    var url = "/aproposdenous";
    var lan = document.getElementById("cboxfltLang").value;
    if (lan!=null && lan!="") url = url +'?lan=' +lan;
    request.open("GET", url, true);
    request.send();     
  if( $('#blockAproposdenous').hasClass('in') )
    var a=1;
  else 
    $("#blockAproposdenous").modal({backdrop: 'static', keyboard: false}); //("show");
} // end a propos de nous

//var vlistAuteurControls = ["lbledNomAuteur","txtedNomAuteur", "lbledPreAuteur","txtedPreAuteur"];
//var vDisplay = "block";
function visualiserControls(vbutton,vlistAuteurControls, vcontrolDisable){
  var vDisplay ="none";
  //bootbox.alert(document.getElementById(vcontrol).firstChild.data);
  if (document.getElementById(vbutton).firstChild.data=="( + )") {
    vDisplay ="block";
    document.getElementById(vbutton).firstChild.data = "( - )";
    document.getElementById(vcontrolDisable).disabled = true;
    document.getElementById(vcontrolDisable).value = 0;
  }
  else 
  {
    document.getElementById(vbutton).firstChild.data = "( + )";
    document.getElementById(vcontrolDisable).disabled = false;
  }

  for (i = 0; i < vlistAuteurControls.length; i++) {
    document.getElementById(vlistAuteurControls[i]).style.display = vDisplay;
  }  
}
// Modal admin-modal: #blockEdit. Fonction pour visualiser controls d'auteur
function visualiserAuteurControls(){
  var vControles = ["lbledNomAuteur","txtedNomAuteur",
                    "lbledPreAuteur","txtedPreAuteur","lbledSaveAute","btnedSaveAute"];
  visualiserControls("btnedaddAute" ,vControles,"cboxedAute");
} // end visualiser

// Modal admin-modal: #blockEdit. Fonction qui enregistre le auteur
function enregistrerAmAuteur() {
  if (validerAmAut()){
    var request = new XMLHttpRequest();
    var jsonObj = {
                      acodeauteur: 0,
                      anom: document.getElementById("txtedNomAuteur").value,
                      aprenom: document.getElementById("txtedPreAuteur").value,
                    };
    var url = "/tauteur/saveAuteur";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          clairtxtBoxAmAut();
          // bootbox.alert("Mise à jour réussi");
          bootbox.alert("Mise à jour réussi");
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
      loadAuteur();
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonObj));
  }
}// end enregistrer

// Modal admin-modal: #blockEdit. Fonction qui valide le Auteur.
function validerAmAut(){
  var result=true;msg="";
  if(document.getElementById("txtedNomAuteur").value=="")
    msg="Ajouter un Nom  s'il te plait";
  if(msg=="" && document.getElementById("txtedPreAuteur").value=="")
    msg="Ajouter un Prenom  s'il te plait";
  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

// Modal admin-modal: #blockEdit Fonction qui va vider les zones de texte.
function clairtxtBoxAmAut(){
  document.getElementById("txtedNomAuteur").value = "";
  document.getElementById("txtedPreAuteur").value = "";
}

// Modal admin-modal: #blockEdit. Fonction pour visualiser controls d'editeur
function visualiserEditeurControls(){
  //"lbledPays","cboxedPays",
  var vControles = [
                    "lbledNomEditeur", "txtedNomEditeur",
                    "lbledVille", "btnedaddVill", "cboxedVill",
                    "lbledSaveEdit","btnedSaveEdit"//,
                    //"lbledaddVille" , "txtedaddVille"
                  ];
  visualiserControls("btnedaddEdit",vControles,"cboxedEdit");
} // end visualiser

// Modal admin-modal: #blockEdit. Fonction qui enregistre le auteur
function enregistrerAmEditeur() {
  if (validerAmEdi()){
    var request = new XMLHttpRequest();
    var jsonObj = {
                      codeediteur: 0,
                      nomediteur: document.getElementById("txtedNomEditeur").value,
                      //codepays: document.getElementById("cboxedPays").value,
                      codeville: document.getElementById("cboxedVill").value,
                    }; 
    var url = "/tediteur/saveEditeur";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          bootbox.alert("Mise à jour réussi");
          clairtxtBoxAmEdi(); 
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
      loadEditeur();
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonObj));
  }
} // end enregistrer

// Modal admin-modal: #blockEdit. Fonction qui valide le Editeur.
function validerAmEdi(){
  var result=true;msg="";
  if(document.getElementById("txtedNomEditeur").value=="")
    msg="ajouter un Nom d'Editeur s'il te plait";
 // if(msg=="" && document.getElementById("cboxedPays").value==0)
 //   msg="ajouter un pays s'il te plait";
    if(msg=="" && document.getElementById("cboxedVill").value==0)
    msg="ajouter una ville s'il te plait";
  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

// Modal admin-modal: #blockEdit. Fonction qui va vider les zones de texte.
function clairtxtBoxAmEdi(){
  document.getElementById("txtedNomEditeur").value = "";
 // document.getElementById("cboxedPays").value = 0;
  document.getElementById("cboxedVill").value = 0;
} // end clairtxtBoxAmEdi()

// Modal admin-modal: #blockEdit. Fonction pour visualiser controls de la ville
function visualiserVilleControls(){
  var vControles = ["lbledaddVille","txtedaddVille",
                     "lbledSaveVill","btnedSaveVill"];
  visualiserControls("btnedaddVill",vControles,"cboxedVill");
} // end visualiser
  
// Modal admin-modal: #blockEdit. Fonction qui enregistre la ville
function enregistrerAmVille() {
  if (validerAmVil()){
    var request = new XMLHttpRequest();
    var jsonObjVil = {
                      codeville: 0,
                      nomville: document.getElementById("txtedaddVille").value,
                     // codepays: document.getElementById("cboxedPays").value,
                    };
    var url = "/tville/saveVille"; //var url = "/tauteur/saveAuteur";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          bootbox.alert("Mise à jour réussi");
          ramplirtabVil();
          clairtxtBoxAmVil(); 
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
      loadVille();
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonObjVil));
  }
}// end enregistrer

// Modal admin-modal: #blockEdit. Fonction qui valide la ville.
function validerAmVil(){
  var result=true;msg="";
  if(document.getElementById("txtedaddVille").value=="")
    msg="ajouter une Ville s'il te plait";
 // if(msg=="" && document.getElementById("cboxedPays").value==0)
  //  msg="ajouter un pays s'il te plait";
  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

// Modal admin-modal: #blockEdit. Fonction qui va vider les zones de texte de la vue du ville.
function clairtxtBoxAmVil(){
  document.getElementById("txtedaddVille").value = "";
 // document.getElementById("cboxedPays").value = 0;
} // end clairtxtBoxAmVil()

function visualiserClassementControls(){
  var vControles = ["lbledaddClas","txtedaddClas"];
  visualiserControls("btnedaddClas",vControles,"cboxedClas");
}

function visualiserFamilleControls(){
  var vControles = ["lbledaddFami","txtedaddFami"];
  visualiserControls("btnedaddFami",vControles,"cboxedFami");
}

// Variable pour récupérer le nom de pdf
var documentName;
// variable utilise dans enregistrer pdf
var files;
function enregistrerDocument() {
  if (validerDoc()){
    var request = new XMLHttpRequest();
    var vcodeVille = document.getElementById("cboxedVill").value;
    var vprix = document.getElementById("txtedPrix").value;
    if (vprix=='') vprix=0;
    if (vcodeVille=="") vcodeVille=0;
    var jsonObj = {
                    aiddoc: document.getElementById("iddoc").value,
                    acodetype: document.getElementById("cboxedType").value,
                    atitle: document.getElementById("txtedTitr").value,
                    aisbn: document.getElementById("txtedIsbn").value,
                    aannee: document.getElementById("txtedAnne").value,
                    alangue: document.getElementById("cboxedLang").value,
                    aprix: vprix,
                    anbpages: document.getElementById("txtedNume").value,
                    aquantite: document.getElementById("txtedQuantite").value, 
                    anumchemise: 0,
                    apathdocument: document.getElementById("txtedFich").value,  
                    acommentaire: document.getElementById("txtedComm").value,
                    adonateur: document.getElementById("txtedDona").value,
                    acoduser: '',
                    acodeauteur: document.getElementById("cboxedAute").value,
                    anom: document.getElementById("txtedNomAuteur").value,
                    aprenom: document.getElementById("txtedPreAuteur").value,
                    acodeetat: document.getElementById("cboxedEtat").value,
                    acodeclassement: document.getElementById("cboxedClas").value,
                    anomcl: document.getElementById("txtedaddClas").value,
                    aidfamille: document.getElementById("cboxedFami").value,
                    anomfamille: document.getElementById("txtedaddFami").value,
                    acodeediteur: document.getElementById("cboxedEdit").value,
                    anomediteur: document.getElementById("txtedNomEditeur").value,
                   // acodepays: document.getElementById("cboxedPays").value,
                    acodeville: vcodeVille,
                    anomville: document.getElementById("txtedaddVille").value,
                  };
    var url = "/saveDocument";
    request.open("PATCH", url, false);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //bootbox.alert("Mise à jour réussi");
          loadListe();
          clairtxtBoxPlusEditeur();
          filtreInfo();
          // enregistre le pdf dans uploads
          enregistrerPdf()
          if (document.getElementById("chBftrLoop").checked)  {
             $('#blockEdit').modal('show'); 
              visualiserDocument("N");
              document.getElementById("cboxedType").focus();
            }
            else{ 
              $('#blockEdit').modal('hide'); 
              
              }   
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonObj));
  }
} // end enregistrer

// Modal admin-modal: #blockEdit. Fonction qui va vider les zones ( + ) de la vue du editeur.
function clairtxtBoxPlusEditeur(){
          document.getElementById("txtedNomAuteur").value="";
          document.getElementById("txtedPreAuteur").value="";
          document.getElementById("txtedNomEditeur").value="";
        //  document.getElementById("cboxedPays").value=0;
          document.getElementById("cboxedVill").value=0;
          document.getElementById("txtedaddClas").value="";
          document.getElementById("txtedaddFami").value="";
}// end clairtxtBoxPlusEditeur()


// Fonction qui valide les données.
function validerDoc(){
  var result=true;msg="";
  if(document.getElementById("txtedTitr").value=="")
    msg="Le Titre est obligatoire";
  if(document.getElementById("cboxedAute").value==0 && (document.getElementById("txtedNomAuteur").value=="" || document.getElementById("txtedPreAuteur").value==""))
    msg="L'Auteur est obligatoire";
 // if(document.getElementById("cboxedEdit").value==0 && (document.getElementById("txtedNomEditeur").value=="" ||  document.getElementById("cboxedPays").value==""  || document.getElementById("cboxedVill").value==""))
 if(document.getElementById("cboxedEdit").value==0 && (document.getElementById("txtedNomEditeur").value==""  || document.getElementById("cboxedVill").value==""))
    msg="L'Editeur est obligatoire";
 // if(document.getElementById("txtedAnne").value=="")
 //   msg="Le Année est obligatoire";
  if(document.getElementById("cboxedLang").value==0)
    msg="La Langue est obligatoire";
  //if(document.getElementById("txtedNume").value=="")
  //  msg="Le Numero de pages est obligatoire";  
  if(document.getElementById("cboxedClas").value==0 && (document.getElementById("txtedaddClas").value==""))
    msg="Le Classement est obligatoire";
  if(document.getElementById("cboxedEtat").value==0)
    msg="L'état est obligatoire";
  if(document.getElementById("txtedQuantite").value=="")
    msg="La quantité est obligatoire";  
 
  if(msg!="") {
    bootbox.alert(msg);
    result=false;
  }
 
  return result;
} // end validerDoc()

///////////////////////////////////////////////////
// Modal Traduction : #blockTraduction. Function qui enregistre ttraduction
function enregistrerCarrousel() {
  if (validerCar()){
    var request = new XMLHttpRequest();
    var json = {
                      codecarrousel: document.getElementById("txtcarId").value,
                      imgNom: document.getElementById("txtcarNom").value,
                    }; 
    var url = "/saveCarrousel";
    request.open("PATCH", url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          enregistrerImg();
          //bootbox.alert("Mise à jour réussi");
          if (document.getElementById("chBcarLoop").checked)  {
              ramplirtabCar();
            }
            else{ 
              $('#blockCarrousel').modal('hide'); 
              }       
          loadListe();
        }
        else {bootbox.alert("Erreur lors de la mise à jour");}
      }
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(json));
  }
} // end enregistrer

// Modal Traduction : #blockTraduction. Fonction qui valide ttraduction.
function validerCar(){
  var result=true;msg="";
  if(document.getElementById("txtcarNom").value=="")
    msg="ajouter un Nom d'image s'il te plait";
  if(msg!="") {
    // bootbox.alert(msg);
    bootbox.alert(msg);
    result=false;
  }
  return result;
}// end valider

// Modal Traduction : #blockTraduction. Fonction qui va remplir ttraduction.
function ramplirtabCar(){
  clairtxtBoxCar();
  $('#tableCar').bootstrapTable('refresh');
  //document.getElementById("txtcarChemin").value = "galerie";
} // end ramplir

// Modal Traduction : #blockTraduction. Fonction qui va vider les zones de texte de la vue ttraduction.
function clairtxtBoxCar(){
  document.getElementById("txtcarId").readOnly = true;
  document.getElementById("txtcarId").value = 0;
  document.getElementById("txtcarNom").value = "";
  //document.getElementById("txtcarChemin").value = "";
}

// Modal Carrousel : #blockCarrousel. Function qui supprime une ligne dans tcarrousel
function supprimerCarrousel(){
  var request = new XMLHttpRequest();
  var id = document.getElementById("txtcarId").value;
  var url = "/tcarrousel/"+id ;
  request.open("DELETE", url, true);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        ramplirtabCar();
        // bootbox.alert("Suppression réussi");
        bootbox.alert("Suppression réussi");
        document.getElementById("txtcarNom").focus();
       }
      else {bootbox.alert("Erreur lors de la suppression");}
    }
  };
  request.send();
} // end supprimer

// API : Boostrap-table 
// Fonction JQuery qui s'éxécute lors de l'ouverture de la page index
$(document).ready(function() {

  $('[data-toggle="tooltip"]').tooltip();    
  //configuration de l'API Datatables

  $('#tableEd').bootstrapTable({
    //data: dataResult,
    url : "/getdocuments",
    height:450,
    cache:false,
    striped:true,
    sortStable: true,
    columns: [{ field: 'iddoc', /*align: 'center', */sortable: true},
    {field: 'tnom', sortable: true},{field: 'title',sortable: true},
    {field: 'annee',sortable: true},{field: 'nomediteur',sortable: true},
    {field: 'etat',sortable: true},{field: 'type',sortable: true}]
  });

  $('#tableEd tbody').on( 'dblclick', 'tr', function () {
    document.getElementById("iddoc").value=$(this).find('td:first').html().trim();
    visualiserDocument('E');  
  } );
  $('#tableEd tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
          $(this).removeClass('selected');
          document.getElementById("iddoc").value=0;
      }
      else {
          $(this).addClass('selected').siblings().removeClass('selected');
          $(this).addClass('selected');
          document.getElementById("iddoc").value=$(this).find('td:first').html().trim();
    }
  } );
  // start table type
  $('#tableTyp').bootstrapTable({ 
    url : "/ttype",
    height:300,
    cache:false,
    striped:true,
    sortStable: true,
    search: true,
    searchAlign: "right",
    toolbar:"#toolbarExpAut",
    pagination:true,
    pageSize:7,
    showExport:true,
    exportOptions:{fileName: 'type'},
    showRefresh:true,
    idField:"codetype",
    columns: 
    [
      { field: 'codetype', /*align: 'center', */sortable: true},
      {field: 'type', sortable: true},
      {field: 'utilise',sortable: false}
    ]
  });
	$('#toolbarExpAut').find('select').change(function () {
    $('#tableTyp').bootstrapTable('refreshOptions', {exportDataType: $(this).val()});
  }); 

  $('#tableTyp tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
      $(this).removeClass('selected');
      // limpiar
      }
      else { 
      $(this).addClass('selected').siblings().removeClass('selected');
      $(this).addClass('selected');
      document.getElementById("txttypId").value=$(this).find('td:eq(0)').html().trim();
      document.getElementById("txttypType").value=$(this).find('td:eq(1)').html().trim();
    }   
    if ($(this).find('td:eq(2)').html().trim()==1){
      
      document.getElementById("btntypSup").disabled = true;
    }else{
    document.getElementById("btntypSup").disabled = false;
    }
    } );
// end table type

// start table état
$('#tableEta').bootstrapTable({ 
  url : "/tetat",
  height:300,
  cache:false,
  striped:true,
  sortStable: true,
  search: true,
  searchAlign: "right",
  toolbar:"#toolbarExpAut",
  pagination:true,
  pageSize:7,
  showExport:true,
  exportOptions:{fileName: 'etat'},
  showRefresh:true,
  idField:"codeetat",
  columns: 
  [
    { field: 'codeetat', /*align: 'center', */sortable: true},
    {field: 'etat', sortable: true},
    {field: 'utilise',sortable: false}
  ]
});
$('#toolbarExpAut').find('select').change(function () {
  $('#tableEta').bootstrapTable('refreshOptions', {exportDataType: $(this).val()});
}); 

$('#tableEta tbody').on( 'click', 'tr', function () {
  if ( $(this).hasClass('selected') ) {
    $(this).removeClass('selected');
    // limpiar
    }
    else { 
    $(this).addClass('selected').siblings().removeClass('selected');
    $(this).addClass('selected');
    document.getElementById("txtetaId").value=$(this).find('td:eq(0)').html().trim();
    document.getElementById("txtetaEtat").value=$(this).find('td:eq(1)').html().trim();
  }   
  if ($(this).find('td:eq(2)').html().trim()==1){
    
    document.getElementById("btnetaSup").disabled = true;
  }else{
  document.getElementById("btnetaSup").disabled = false;
  }
  } );
// end table état


  // Modal Auteur : #blockAuteur. Function qui va remplir txtBoxes dans vue du auteur.
  // Configuration de l'affichage (grid) de la table d'auteur
  $('#tableAut').bootstrapTable({ 
    url : "/tauteur",
    height:300,
    cache:false,
    striped:true,
    sortStable: true,
    search: true,
    searchAlign: "right",
    toolbar:"#toolbarExpAut",
    pagination:true,
    pageSize:7,
    showExport:true,
    exportOptions:{fileName: 'auteur'},
    showRefresh:true,
    idField:"codeauteur",
    columns: 
    [
      { field: 'codeauteur', /*align: 'center', */sortable: true},
      {field: 'nom', sortable: true},
      {field: 'prenom',sortable: true},
      {field: 'utilise',sortable: false}
    ]
  });
	$('#toolbarExpAut').find('select').change(function () {
    $('#tableAut').bootstrapTable('refreshOptions', {exportDataType: $(this).val()});
  });  

  $('#tableAut tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
      }
      else {   
        $(this).addClass('selected').siblings().removeClass('selected');
        $(this).addClass('selected');
        document.getElementById("txtautId").value=$(this).find('td:eq(0)').html().trim();
        document.getElementById("txtautNom").value=$(this).find('td:eq(1)').html().trim();
        document.getElementById("txtautPrenom").value=$(this).find('td:eq(2)').html().trim();
       }   
      if ($(this).find('td:eq(3)').html().trim()==1){
        document.getElementById("btnautSup").disabled = true;
      }else{
      document.getElementById("btnautSup").disabled = false;
    }  
  } );

  // Modal Editeur : #blockEditeur. Function qui va remplir txtBoxes dans vue du editeur
  // Configuration de l'affichage (grid) de la table editeur
  $('#tableEdi').bootstrapTable({ 
    url : "/tediteur",
    height:300,
    cache:false,
    striped:true,
    sortStable: true,
    search: true,
    searchAlign: "right",
    toolbar:"#toolbarExpEdi",
    pagination:true,
    pageSize:7,
    showExport:true,
    exportOptions:{fileName: 'editeur'},
    showRefresh:true,
    idField:"codeediteur",
    columns: 
    [
    { field: 'codeediteur', /*align: 'center', */sortable: true},
    {field: 'nomediteur', sortable: true},{field: 'nomville',sortable: true},
    {field: 'codeville',sortable: false}, {field: 'utilise',sortable: false}
    ]
  });
	$('#toolbarExpEdi').find('select').change(function () {
    $('#tableEdi').bootstrapTable('refreshOptions', {exportDataType: $(this).val()});
  });  

   // Remplir txtBoxes dans Modal Editeur : #blockEditeur.
  $('#tableEdi tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
      $(this).removeClass('selected');
      // limpiar
      }
      else {   
        $(this).addClass('selected').siblings().removeClass('selected');
        $(this).addClass('selected');
        document.getElementById("txtediId").value=$(this).find('td:eq(0)').html().trim();
        document.getElementById("txtediNom").value=$(this).find('td:eq(1)').html().trim();
        document.getElementById("cboxedicodeville").value=$(this).find('td:eq(3)').html().trim();
        /*
        alert($(this).find('td:eq(2)').html().trim());
        alert($(this).find('td:eq(3)').html().trim());
        loadVilleEdi().then((result)=>{
         document.getElementById("cboxedicodeville").value=$(this).find('td:eq(3)').html().trim();

        });
        */
      }  

      if ($(this).find('td:eq(4)').html().trim()==1){
        document.getElementById("btnediSup").disabled = true;
      }else{
        document.getElementById("btnediSup").disabled = false;
      }  
    } );

  // Modal Ville : #blockVille. Function qui va remplir txtBoxes dans vue du ville.
  // Configuration de l'affichage (grid) de la table ville
  $('#tableVil').bootstrapTable({ 
    url : "/tville",
    height:300,
    cache:false,
    striped:true,
    sortStable: true,
    search: true,
    searchAlign: "right",
    toolbar:"#toolbarExpVil",
    pagination:true,
    pageSize:7,
    showExport:true,
    exportOptions:{fileName: 'ville'},
    showRefresh:true,
    idField:"codeville",
    columns: 
    [
      {field: 'codeville', /*align: 'center', */sortable: true},
      {field: 'nomville', sortable: true}
    ]
  });
	$('#toolbarExpVil').find('select').change(function () {
    $('#tableVil').bootstrapTable('refreshOptions', {exportDataType: $(this).val()});
  });  

  // Remplir txtBoxes dans Modal Ville : #blockVille
  $('#tableVil tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
      $(this).removeClass('selected');
      // limpiar
      }
      else { 
      $(this).addClass('selected').siblings().removeClass('selected');
      $(this).addClass('selected');
      document.getElementById("txtvilId").value=$(this).find('td:eq(0)').html().trim();
      document.getElementById("txtvilNomville").value=$(this).find('td:eq(1)').html().trim();
      // document.getElementById("cboxvilNompays").value=$(this).find('td:eq(3)').html().trim();
      }   
      if ($(this).find('td:eq(4)').html().trim()==1){
        document.getElementById("btnvilSup").disabled = true;
      }else{
      document.getElementById("btnvilSup").disabled = false;
      
      }
    } );

  // Modal Modal Langue : #blockLangue. Function qui va remplir txtBoxes dans vue du langue.
  // Configuration de l'affichage (grid) de la table langue
  $('#tableLan').bootstrapTable({ 
    url : "/tlangue",
    height:300,
    cache:false,
    striped:true,
    sortStable: true,
    search: true,
    searchAlign: "right",
    toolbar:"#toolbarExpLan",
    pagination:true,
    pageSize:7,
    showExport:true,
    exportOptions:{fileName: 'langue'},
    showRefresh:true,
    idField:"codelangue",
    columns: 
    [
      { field: 'codelangue', /*align: 'center', */sortable: true},
      {field: 'langue', sortable: true},
      {field: 'utilise',sortable: false}
  ]
  });
	$('#toolbarExpLan').find('select').change(function () {
    $('#tableLan').bootstrapTable('refreshOptions', {exportDataType: $(this).val()});
  });  
  // Remplir txtBoxes dans Modal Langue : #blockLangue
  $('#tableLan tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
      $(this).removeClass('selected');
      // limpiar
      }
      else { 
      $(this).addClass('selected').siblings().removeClass('selected');
      $(this).addClass('selected');
      document.getElementById("txtlanId").value=$(this).find('td:eq(0)').html().trim();
      document.getElementById("txtlanLangue").value=$(this).find('td:eq(1)').html().trim();
    }   
    if ($(this).find('td:eq(2)').html().trim()==1){
      
      document.getElementById("btnlanSup").disabled = true;
    }else{
    document.getElementById("btnlanSup").disabled = false;
    }
    } );

    $('#tableCla').bootstrapTable({ 
      url : "/tclassement",
      height:300,
      cache:false,
      striped:true,
      sortStable: true,
      search: true,
      searchAlign: "right",
      toolbar:"#toolbarExpCla",
      pagination:true,
      pageSize:7,
      showExport:true,
      exportOptions:{fileName: 'classement'},
      showRefresh:true,
      idField:"codeclassement",
      columns: [{ field: 'codeclassement', /*align: 'center', */sortable: true},
      {field: 'nom', sortable: true},{field: 'utilise',sortable: false}]
    });
    $('#toolbarExpCla').find('select').change(function () {
      $('#tableCla').bootstrapTable('refreshOptions', {exportDataType: $(this).val()});
    });  

    // Remplir txtBoxes dans Modal Classement : #blockClassement
  $('#tableCla tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
      $(this).removeClass('selected');
      // limpiar
      }
      else { 
    $(this).addClass('selected').siblings().removeClass('selected');
    $(this).addClass('selected');
    document.getElementById("txtclaId").value=$(this).find('td:eq(0)').html().trim();
    document.getElementById("txtclaClassement").value=$(this).find('td:eq(1)').html().trim();
  }   
  if ($(this).find('td:eq(2)').html().trim()==1){
    
    document.getElementById("btnclaSup").disabled = true;
  }else{
  document.getElementById("btnclaSup").disabled = false;
  }
    } );
  
    $('#tableFam').bootstrapTable({ 
      url : "/tfamille",
      height:300,
      cache:false,
      striped:true,
      sortStable: true,
      search: true,
      searchAlign: "right",
      toolbar:"#toolbarExpFam",
      pagination:true,
      pageSize:7,
      showExport:true,
      exportOptions:{fileName: 'famille'},
      showRefresh:true,
      idField:"idfamille",
      columns: [{ field: 'idfamille', /*align: 'center', */sortable: true},
      {field: 'codetype', sortable: true},{field: 'nomfamille',sortable: true},
      {field: 'utilise',sortable: false}]
    });
    $('#toolbarExpAFam').find('select').change(function () {
      $('#tableFam').bootstrapTable('refreshOptions', {exportDataType: $(this).val()});
    });    

    // Remplir txtBoxes dans Modal Famille : #blockFamille
  $('#tableFam tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
      $(this).removeClass('selected');
      // limpiar
      }
      else { 
    $(this).addClass('selected').siblings().removeClass('selected');
    $(this).addClass('selected');
    document.getElementById("txtfamId").value=$(this).find('td:eq(0)').html().trim();
    document.getElementById("txtfamCode").value=$(this).find('td:eq(1)').html().trim();
    document.getElementById("txtfamNom").value=$(this).find('td:eq(2)').html().trim();
  }   
  if ($(this).find('td:eq(3)').html().trim()==1){
    
    document.getElementById("btnfamSup").disabled = true;
  }else{
  document.getElementById("btnfamSup").disabled = false;
  }
    } );
 
    // Function qui va remplir txtBoxes dans vue du traduction.
    // Modal Traduction : #blockTraduction. Configuration de l'affichage (grid) de la table traduction
    $('#tableTra').bootstrapTable({ 
      url : "/interfaceTraduction",
      height:300,
      cache:false,
      striped:true,
      sortStable: true,
      search: true,
      searchAlign: "right",
      toolbar:"#toolbarExpTra",
      pagination:true,
      pageSize:7,
      showExport:true,
      exportOptions:{fileName: 'traduction'},
      showRefresh:true,
      idField:"idttraduction",
      columns: 
      [
      {field: 'idttraduction', sortable: true},
      {field: 'id_controle', sortable: true},
      {field: 'module',sortable: true},
      {field: 'txtfrancais',sortable: true},
      {field: 'txtanglais',sortable: true}
      ]
    });
    $('#toolbarExpTra').find('select').change(function () {
      $('#tableTra').bootstrapTable('refreshOptions', {exportDataType: $(this).val()});
    });    

 // Remplir txtBoxes dans Modal Traduction : #blockTraduction
 $('#tableTra tbody').on( 'click', 'tr', function () {
  if ( $(this).hasClass('selected') ) {
    $(this).removeClass('selected');
    // limpiar
    }
    else { 
    $(this).addClass('selected').siblings().removeClass('selected');
    $(this).addClass('selected');
    document.getElementById("txttraId").value=$(this).find('td:eq(0)').html().trim();
    document.getElementById("txttraControle").value=$(this).find('td:eq(1)').html().trim();
    document.getElementById("txttraModule").value=$(this).find('td:eq(2)').html().trim();
    document.getElementById("txttraFrancais").value=$(this).find('td:eq(3)').html().trim();
    document.getElementById("txttraAnglais").value=$(this).find('td:eq(4)').html().trim();
  }   
      if ($(this).find('td:eq(5)').html().trim()==1){
        
        document.getElementById("btntraSup").disabled = true;
      }else{
      document.getElementById("btntraSup").disabled = false;
      }
  } );

  // Modal Utilisateurs : #blockUtilisateurs. Function qui va remplir txtBoxes dans vue du utilisateur.
  // Configuration de l'affichage (grid) de la table d'utilisateur
  $('#tableUti').bootstrapTable({ 
    url : "/tusers",
    height:300,
    cache:false,
    striped:true,
    sortStable: true,
    search: true,
    searchAlign: "right",
    toolbar:"#toolbarExpUti",
    pagination:true,
    pageSize:7,
    showExport:true,
    exportOptions:{fileName: 'tilisateurs'},
    showRefresh:true,
    idField:"coduser",
    columns: [{ field: 'coduser', /*align: 'center', */sortable: true},
    {field: 'password', sortable: true},{field: 'nom',sortable: true},{field: 'prenom',sortable: true},
    {field: 'admin',sortable: true},{field: 'inactif',sortable: true},{field: 'utilise',sortable: false}]
  });
  
	$('#toolbarExpAut').find('select').change(function () {
    $('#tableAut').bootstrapTable('refreshOptions', {exportDataType: $(this).val()});
  });  
    // Remplir txtBoxes dans Modal Utilisateurs : #blockUtilisateurs
  $('#tableUti tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
      $(this).removeClass('selected');
      // limpiar
      }
      else { 
      $(this).addClass('selected').siblings().removeClass('selected');
      $(this).addClass('selected');
      document.getElementById("txtutiId").value=$(this).find('td:eq(0)').html().trim();
      document.getElementById("txtutiNom").value=$(this).find('td:eq(2)').html().trim();
      document.getElementById("txtutiPrenom").value=$(this).find('td:eq(3)').html().trim();
      document.getElementById("txtutiMotdepass").value=$(this).find('td:eq(1)').html().trim();
      document.getElementById("txtutiAdmin").value=$(this).find('td:eq(4)').html().trim();
      document.getElementById("txtutiInactif").value=$(this).find('td:eq(5)').html().trim();
    }   
    if ($(this).find('td:eq(6)').html().trim()==1){
      
      document.getElementById("btnutiSup").disabled = true;
    }else{
    document.getElementById("btnutiSup").disabled = false;
    }
    } );

 // Remplir txtBoxes dans Modal Preferences : #blockPreferences
 $('#tablePre tbody').on( 'click', 'tr', function () {
  if ( $(this).hasClass('selected') ) {
    $(this).removeClass('selected');
    // limpiar
    }
    else { 
    $(this).addClass('selected').siblings().removeClass('selected');
    $(this).addClass('selected');
    document.getElementById("txtpreId").value=$(this).find('td:eq(0)').html().trim();
    document.getElementById("txtpreEntreprise").value=$(this).find('td:eq(1)').html().trim();
    document.getElementById("txtpreContact").value=$(this).find('td:eq(2)').html().trim();
    document.getElementById("txtpreCourriel").value=$(this).find('td:eq(3)').html().trim();
    document.getElementById("txtpreTelephone").value=$(this).find('td:eq(4)').html().trim();
    document.getElementById("txtpreCommentaire").value=$(this).find('td:eq(5)').html().trim();
  }   
  if ($(this).find('td:eq(6)').html().trim()==1){
    
    document.getElementById("btnpreSup").disabled = true;
  }else{
  document.getElementById("btnpreSup").disabled = false;
  }
  } );


// start table carrousel
$('#tableCar').bootstrapTable({ 
  url : "/tcarrousel",
  height:300,
  cache:false,
  striped:true,
  sortStable: true,
  search: true,
  searchAlign: "right",
  toolbar:"#toolbarExpAut",
  pagination:true,
  pageSize:7,
  showExport:true,
  exportOptions:{fileName: 'carrousel'},
  showRefresh:true,
  idField:"codecarrousel",
  columns: 
  [
    { field: 'codecarrousel', /*align: 'center', */sortable: true},
    {field: 'imgNom', sortable: true}
    
  ]
});
$('#toolbarExpAut').find('select').change(function () {
  $('#tableCar').bootstrapTable('refreshOptions', {exportDataType: $(this).val()});
}); 

$('#tableCar tbody').on( 'click', 'tr', function () {
  if ( $(this).hasClass('selected') ) {
    $(this).removeClass('selected');
    // limpiar
    }
    else { 
    $(this).addClass('selected').siblings().removeClass('selected');
    $(this).addClass('selected');
    document.getElementById("txtcarId").value=$(this).find('td:eq(0)').html().trim();
    document.getElementById("txtcarNom").value=$(this).find('td:eq(1)').html().trim();
   // document.getElementById("txtcarChemin").value=$(this).find('td:eq(2)').html().trim();
  }   
  } );
// end table carrousel


  // upload files
$('.upload-btn').on('click', function (){
 // document.getElementById("txtedFich").value="";
  $('#upload-input').click();
  $('.progress-bar').text('0%');
  $('.progress-bar').width('0%');
});

// Function pour récupérer le nom de pdf
$('#upload-input').on('change', function(){
  documentName = $(this).get(0).files;
  if (documentName.length > 0){
      for (var i = 0; i < documentName.length; i++) {
        var docu = documentName[i]; 
        document.getElementById("txtedFich").value=docu.name;
      }
    }
  });

  // upload files
$('#btncarChargerImg').on('click', function (){
  // document.getElementById("txtedFich").value="";
   $('#upload-input-carrousel').click();
   $('.progress-bar').text('0%');
   $('.progress-bar').width('0%');
 });
 
 // Function pour récupérer le nom de pdf
 $('#upload-input-carrousel').on('change', function(){
  documentName = $(this).get(0).files;
  if (documentName.length > 0){
      for (var i = 0; i < documentName.length; i++) {
        var docu = documentName[i]; 
        document.getElementById("txtcarNom").value=docu.name;
      }
    }
  });
}); // End Fonction JQuery qui s'éxécute lors de l'ouverture de la page index

// Function pour visualiser pdf dans outre tab.
function visualiserFiles(){
  var files = document.getElementById("txtedFich").value;
  // service  pour visualiser dossiers
  var url = "/pdf/"+files;
  window.open(url,"_blank");
} // end visualiser pdf

// Function pour visualiser document pdf dasn le deuxième modal
function visualiserPdf(){
  var files = document.getElementById("txtedFich").value;
  // service  pour visualiser dossiers
  var url = "/pdf/"+files;
 // this code line opens a new tab with the pdf
 // window.open(url,"_blank");
 // this code line opens the pdf in the second modal
  document.getElementById("frame-pdf").src=url; // url : contien el documento pdf que viene del back end.
} // end visualiser  pdf dasn le deuxième modal

// Function pour visualiser galerie dasn le deuxième modal
function visualiserGalerie(){
 // this code line opens the galerie in the second modal

  document.getElementById("frame-galerie").src='http://online.fliphtml5.com/owwu/ceuo/#p=12'; // url : contien el documento pdf que viene del back end.
} // end visualiser  galerie dasn le deuxième modal

// Function pour visualiser feed dans outre tab
function visualiserFeed(){
  ///var files = document.getElementById("txtedFich").value;
  // service  pour visualiser feed
  var url = "/feed";
  window.open(url,"_blank");
} // end visualiser pdffeed

// Function pour visualiser fb dans outre tab
function visualiserFb(){
  // service  pour visualiser facebook
  var url = "https://www.facebook.com/conservatoireculinaireduquebec/";
  window.open(url,"_blank");
} // end visualiser pdffeed

// Function utilise pour enregistrer pdf
function enregistrerPdf(){
  // var files = $(this).get(0).files; -> 'this', is the name of the control : #upload-input
  files = $('#upload-input').get(0).files;
      if (files.length > 0){
        // create a FormData object which will be sent as the data payload in the
        // AJAX request
        var formData = new FormData();
        // loop through all the selected files and add them to the formData object
            for (var i = 0; i < files.length; i++) {
              var file = files[i]; 
              // add the files to formData object for the data payload
              // formData.append(name, value, filename);
              //alert(file);
              //alert(file.name);
              formData.append('uploads[]', file, file.name);
              // andy si el campo fichier tiene algo
              // llamar service index.js para eliminar archivo del public/upload
               //alert("document nom dans visible txt : "+file.name);
                var ancienFile = document.getElementById("txtedFich-hide").value;
                if(ancienFile=="") ancienFile="x";
                // start ajax
                  $.ajax({
                    url: '/upload/'+ancienFile,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(data){
                    console.log('pdf upload successful!\n' + data);
                      }, 
                          xhr: function() {
                            // create an XMLHttpRequest
                            var xhr = new XMLHttpRequest();
                      
                                    // listen to the 'progress' event
                                    xhr.upload.addEventListener('progress', function(evt) {
                              
                                          if (evt.lengthComputable) {
                                            // calculate the percentage of upload completed
                                            var percentComplete = evt.loaded / evt.total;
                                            percentComplete = parseInt(percentComplete * 100);
                                  
                                            // update the Bootstrap progress bar with the new percentage
                                            $('.progress-bar').text(percentComplete + '%');
                                            $('.progress-bar').width(percentComplete + '%');
                                  
                                                // once the upload reaches 100%, set the progress bar text to done
                                                if (percentComplete === 100) {
                                                  $('.progress-bar').html('Done');
                                                }
                                          }
                                    }, false);
                                    console.log('done');
                            return xhr;
                          } // end xhr
                  }); // end ajax
            } // end for
        } // end if
} // end enregistrer pdf

// Function utilise pour enregistrer pdf
function enregistrerImg(){
  // var files = $(this).get(0).files; -> 'this', is the name of the control : #upload-input
  files = $('#upload-input-carrousel').get(0).files;
      if (files.length > 0){
        // create a FormData object which will be sent as the data payload in the
        // AJAX request
        var formData = new FormData();
        // loop through all the selected files and add them to the formData object
            for (var i = 0; i < files.length; i++) {
              var file = files[i]; 
              // add the files to formData object for the data payload
              // formData.append(name, value, filename);
              //alert(file);
              //alert(file.name);
              formData.append('uploadsCarrousel[]', file, file.name);
              // andy si el campo fichier tiene algo
              // llamar service index.js para eliminar archivo del public/upload
              // alert("document nom dans visible txt : "+file.name);
              //var ancienFile = document.getElementById("txtedFich-hide").value;
              // if(ancienFile=="") ancienFile="x";
              // start ajax
                  $.ajax({
                    //url: '/upload/'+ancienFile,
                    url: '/uploadImg',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(data){
                    console.log('upload img successful!\n' + data);
                      }, 
                          xhr: function() {
                            // create an XMLHttpRequest
                            var xhr = new XMLHttpRequest();
                      
                                    // listen to the 'progress' event
                                    xhr.upload.addEventListener('progress', function(evt) {
                              
                                          if (evt.lengthComputable) {
                                            // calculate the percentage of upload completed
                                            var percentComplete = evt.loaded / evt.total;
                                            percentComplete = parseInt(percentComplete * 100);
                                  
                                            // update the Bootstrap progress bar with the new percentage
                                            $('.progress-bar').text(percentComplete + '%');
                                            $('.progress-bar').width(percentComplete + '%');
                                  
                                                // once the upload reaches 100%, set the progress bar text to done
                                                if (percentComplete === 100) {
                                                  $('.progress-bar').html('Done');
                                                }
                                          }
                                    }, false);
                                    console.log('done');
                            return xhr;
                          } // end xhr
                  }); // end ajax
            } // end for
        } // end if
} // end enregistrer pdf

// Function pour sortir de administrateur
function deconnexion(){
  var request = new XMLHttpRequest();
  var url ="/deconnexion";
  request.open("GET",url,true);
  request.onreadystatechange=function(){
    if (request.readyState === 4 && request.status === 200) {
      var info = JSON.parse(request.responseText);
         sessionStorage.removeItem("valus");
         if (info.login==false) {
           // window.location.href = "/";
            window.location.href = "/admin";
            document.getElementById("login-coduser").value=""; 
            document.getElementById("login-password").value=""
          }
    } 
  };
 request.send();  
} // enddeconnexion