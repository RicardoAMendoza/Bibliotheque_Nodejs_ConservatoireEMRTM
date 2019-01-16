/*!
 * ConservatoireEMRTM.
 * Langage de programmation : nodeJS (l'installation du framework Express est requis).
 * Version 0.1
 * Original author: Andy Del Risco & Ricardo Mendoza
 * Released with the MIT License: http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2018 Andy Del Risco and Ricardo Mendoza
 * Hiver-2018
 */

// Function Login
function getUser(){     
    var coduser  = document.getElementById("login-coduser").value;
    var password = document.getElementById("login-password").value;
    var request = new XMLHttpRequest();
    var url ="/valid?id="+coduser+"&pwd="+password;
    request.open("GET",url,true);
    request.onreadystatechange=function(){
      if (request.readyState === 4 && request.status === 200) {
        var info = JSON.parse(request.responseText);
        //alert(request.responseText+ " " +info);
              //alert(info.valid);
            if (info.valid){
             // sessionStorage.setItem("valus", coduser);  
            //  window.location.href = "/admin?u="+coduser;
              sessionStorage.setItem("valus", password);  
              window.location.href = "/admin?u="+password;
            }
            else{
              sessionStorage.removeItem("valus");
              alert("User doesn't exist ou wrong password. Try again!");  
              document.getElementById("login-coduser").value=""; 
              document.getElementById("login-password").value=""
            } 
    } 
  };
  request.send(); 
  document.getElementById("login-coduser").focus(); 
  
  } // end Login

