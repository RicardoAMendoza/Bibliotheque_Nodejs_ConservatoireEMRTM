/*!
 * ConservatoireEMRTM.
 * Langage de programmation : nodeJS (l'installation du framework Express est requis).
 * Version 0.1
 * Original author: Andy Del Risco & Ricardo Mendoza
 * Released with the MIT License: http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2018 Andy Del Risco and Ricardo Mendoza
 * Hiver-2018
 */

function validUser(){
    //var user=localStorage.getItem("valus") // le code utilisateur
    var user=sessionStorage.getItem("valus") // le code utilisateur

    if(user==undefined)
        user="";

       window.location ="/admin?u="+user;
        //window.location ="/?u="+user;
}