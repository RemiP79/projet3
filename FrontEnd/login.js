let forgetPwd = document.getElementById("mdpOublie");
forgetPwd.addEventListener("click", donnerMdp = () =>{
    alert ("Le mot de passe est S0phie");
})

const mail = document.getElementById("email");
const getValueEmail = mail.value ="";
const mdp = document.getElementById("mdp");
const getValueMdp = mdp.value;

/**
 * 
 * @returns regex mail
 */
const verifMail = () => {
    const mailRegex = /^[^@\s]{2,30}@[^@\s]{2,30}\.[^@\s]{2,5}$/;   
    const resEmail = mailRegex.test(mail.value);         
    if (resEmail===false || mail.value ==="" ) {        
        return false;
    }else{
        //console.log("verif identifiant ok");
        return true;
    }
};

/**
 * 
 * @returns regex password
 */

const verifMdp = () => {
    const mdpRegex = /^[A-Z]{1}[0-9]{1}[a-z]{4}$/ 
    const resMdp = mdpRegex.test(mdp.value);     
    if (resMdp===false || mdp.value==="") {        
        return false;
    }else{
        //console.log("vérif mdp ok");
        return true;
    }
};

document.getElementById ("seConnecter").addEventListener ("click", () => {
    if (!verifMail()){ alert ("Erreur dans l’identifiant ou le mot de passe"); // affichage du message en cas d'erreur de saisie du mail 
    return                                          // arret de la fonction
    }
    if (!verifMdp()) {alert ("Erreur dans l’identifiant ou le mot de passe"); // affichage du message en cas d'erreur de saisie du mdp 
    return
    }        
    const contact = {
        "email" : mail.value,
        "password" : mdp.value
    }
    postData(contact);    //envoyer les informations saisies au backend pour validation connexion
});


/**
 * 
 * @param {post contact} contact 
 */
const postData = async (contact) => {
    console.log(contact);
    try {
    const respons = await fetch("http://localhost:5678/api/users/login", {
        method : "POST",
        headers : {
            "accept": "application/json",       // informer le service web qu'il va recevoir du json
            "content-Type": "application/json",           
         },
        body : JSON.stringify(contact),              //transformer notre objet JavaScript en JSON pour être lu en backend
    })
    if (!respons.ok) {                                                // si le resultat du fetch ne fonctionne pas (si mail ou mdp erroné) (= false dans la console) 
        throw new Error (`Erreur : ${respons.status}`);
    }
    const data = await respons.json();          //récupérer et stocker le token pour ajouter ou supprimer les projets via la modale.
         localStorage.setItem("auth",JSON.stringify(data));   // création et stockage de la clé --> set = mettre ou créer / get = recupérer
         window.location.href = "./index.html";            //     redirection vers la page d'accueil
    }    
        catch (error) {
            alert (error);
        }    
    }

    
   
    