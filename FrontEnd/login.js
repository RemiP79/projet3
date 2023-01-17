let forgetPwd = document.getElementById("mdpOublie");
forgetPwd.addEventListener("click", donnerMdp = () =>{
    alert ("Le mot de passe est S0phie");
})

let url = "http://localhost:5678/api/users/login";
let mail = document.getElementById("email");
let getValueEmail = mail.value ="";
let mdp = document.getElementById("mdp");
let getValueMdp = mdp.value;

const verifMail = () => {
    const mailRegex = /@/;
    const mailRegex2 =/[A-Zéèçàëïöüäÿùµñ\&\s~"#'\[\]|\\°\+\=\¨¤£\{\}\^\(\)\$%\!\/]/;
    let resEmail = mailRegex.test(mail.value);
    let resEmail2 = mailRegex2.test(mail.value);   
    
    if (resEmail===false || resEmail2=== true || mail.value ==="" ) {        
        return false;
    }else{
        console.log("verif identifiant ok");
        return true;
    }
};

const verifMdp = () => {
    const mdpRegex = /[\{\}\[\]\$!\(\)\^\s]/g;
    let resMdp = mdpRegex.test(mdp.value);     
    if (resMdp || mdp.value==="") {        
        return false;
    }else{
        console.log("vérif mdp ok");
        return true;
    }
};

document.getElementById ("seConnecter").addEventListener ("click", () => {
    if (!verifMail()){ alert ("Identifiant non conforme");
    return                                          // arret de la fonction
    }
    if (!verifMdp()) {alert ("Mot de passe non conforme");
    return
     }        
    const contact = {
        "email" : mail.value,
        "password" : mdp.value
    }
    postData(contact);    
});


const postData = async (contact) => {
    try {
    const respons = await fetch("http://localhost:5678/api/users/login", {
        method : "POST",
        headers : {
            "accept": "application/json",       // informer le service web qu'il va recevoir du json
            "content-Type": "application/json",
           // "Access-Control-Allow-Origin": "allow"
         },
        body : JSON.stringify(contact),              //transformer notre objet JavaScript en JSON
    })
    if (!respons.ok) {                                                // si le resultat du fetch ne fonctionne pas (ok = false dans la console) 
        throw new Error (`Erreur : ${respons.status}`);
    }
    const data = await respons.json(); 
         
         localStorage.setItem("auth",JSON.stringify(data));   // création de la clé --> set = mettre ou créer / get = recupérer
         window.location.href = "./index.html";            //     redirection
    }    
        catch (error) {
            alert (error);
        }    
    }

    
   
    