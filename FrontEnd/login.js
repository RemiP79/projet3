let forgetPwd = document.getElementById("mdpOublie");
forgetPwd.addEventListener("click", donnerMdp = () =>{
    alert ("Le mot de passe est S0phie");
})


let url = "http://localhost:5678/api/users/login"
let mail = document.getElementById("email");
let getValueEmail = mail.value ="";
let mdp = document.getElementById("mdp");
let getValueMdp = mdp.value;
let seConnecter = document.getElementById ("seConnecter");

const verifMail = () => {
    let mailRegex = /@/;
    let mailRegex2 =/[A-Zéèçàëïöüäÿùµñ\&\s~"#'\[\]|\\°\+\=\¨¤£\{\}\^\(\)\$%\!\/]/;
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
    let mdpRegex = /[\{\}\[\]\$!\(\)\^\s]/g;
    let resMdp = mdpRegex.test(mdp.value);     
    if (resMdp || mdp.value==="") {        
        return false;
    }else{
        console.log("vérif mdp ok");
        return true;
    }
};

seConnecter.addEventListener ("click", () => {
    if (verifMail()===false){ alert ("Identifiant non conforme");
    }else{
        if (verifMdp()===false) {alert ("Mot de passe non conforme");
        }else{
            verifMail();
            verifMdp();
        }
    }    
    connexion();

});

const connexion = () => {    
    if (verifMail()&&verifMdp()){
        const contact = {
            "email" : mail.value,
            "password" : mdp.value
        }
        console.log(contact);
    //postData(contact);
        
    }
}


    

const postData = async () => {
    try {
    const respons = await fetch(url, {
        method : "POST",
        headers : {
            "accept": "application/json",       // informer le service web qu'il va recevoir du json
            "content-Type": "application/json"
         },
        body : JSON.stringify(),              //transformer notre objet JavaScript en JSON
    })
    if (!respons.ok) {                                                // si le resultat du fetch ne fonctionne pas (ok = false dans la console) 
        throw new Error (`Erreur : ${respons.status}`);
    }
    const data = await respons.json(); 
         console.log(data);
         console.log(contact); 
         console.log(respons.json);
         
    return data;
    }
    
        catch (error) {
            alert (error);
        }    
    }

//==============================================================


/*const verifMail = (e) => {
    let mailRegex = /\@+/;
    let mailRegex2 =/[A-Zéèçàëïöüäÿùµñ&\s~"#'\[\]|\\°\+\=\¨¤£\{\}\^\(\)\$%\!\/]/ ;
    let resEmail1 = mailRegex.test(mail.value);
    let resEmail2 = mailRegex2.test(mail.value);
    
    if (mail.value==="") {
        e.preventDefault();
        alert ("Vous devez saisir votre Email pour vous connecter");
        window.location.reload();
             
    }else{
        if (resEmail1 === false) {            
            e.preventDefault();
            alert ("L'adresse mail doit contenir un @");
            mail.value = "";            
            window.location.reload();
            
        }else{
            if (resEmail2 === true){
                e.preventDefault();
                alert ("L'adresse mail saisie contient des caractères interdits");
                mail.value = "";
                window.location.reload();
                
            }else{
                console.log("mail ok");
                return true;
            }
        }
    }
};

const verifMdp = (e) => {
    let mdpRegex = /\{\}\[\]\$\!\(\)\^/g;
    let resMdp = mdpRegex.test(mdp.value);
    if (mdp.value==="") {
        e.preventDefault();
        alert ("Vous devez saisir votre mot de passe pour vous connecter");                        
        window.location.reload();        
    }else{
        if (resMdp=== true) {
            e.preventDefault();
            alert ("Le mot de passe contient des caractères interdits");
            mdp.value="";
            window.location.reload();
            
        }else{
            console.log("mdp ok");
            return true;
        }
    }
}

const FuncseConnecter = (e) => {
    seConnecter.addEventListener ("click", (e) => {
        verifMail(e);
        verifMdp(e);
    });
    if (verifMail(e) && verifMdp(e)) {
        console.log("func Ok")
    return true;};
    }
    FuncseConnecter();

/*const blabla = (e) => {

if (verifMail() && verifMdp()) {
    let contact = {
    email : "getValueEmail",
    password : "getValueMdp"
};
console.log(contact);
}
}*/

//==============================================================*/

//================================================================
/*seConnecter.addEventListener ("click", (e) => {
    let mailRegex = /\@+/;
    let mailRegex2 =/[A-Zéèçàëïöüäÿùµñ&\s~"#'\[\]|\\°\+\=\¨¤£\{\}\^\(\)\$%\!\/]/ ;  // renvoie true donc bloquer [A-Z]
    let mdpRegex = /\{\}\[\]\$\!\(\)\^/g;
    let resEmail1 = mailRegex.test(mail.value);
    let resEmail2 = mailRegex2.test(mail.value);
    let resMdp = mdpRegex.test(mdp.value); 
    
    //console.log(resEmail1);
    //console.log(resEmail2);
    //console.log(resMdp);

    if (mail.value==="") {
        e.preventDefault();
        alert ("Vous devez saisir votre Email pour vous connecter");
        window.location.reload();
        return false;        
    }else{
        if (resEmail1 === false) {            
            e.preventDefault();
            alert ("L'adresse mail doit contenir un @");
            mail.value = "";            
            window.location.reload();
            return false;
        }else{
            if (resEmail2 === true){
                e.preventDefault();
                alert ("L'adresse mail saisie contient des caractères interdits");
                mail.value = "";
                window.location.reload();
                return false;
            }else{       
                if (mdp.value==="") {
                    e.preventDefault();
                    alert ("Vous devez saisir votre mot de passe pour vous connecter"); 
                    mdp.value = "";                  
                    window.location.reload();
                    return false;
                }else{
                    if (resMdp=== true) {
                        e.preventDefault();
                        alert ("Le mot de passe contient des caractères interdits");
                        mdp.value="";
                        return false;
                    }else{
                        return true;
                    }
                }
            }
        }
    }
});*/
