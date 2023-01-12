let forgetPwd = document.getElementById("mdpOublie");
forgetPwd.addEventListener("click", donnerMdp = () =>{
    alert ("Le mot de passe est S0phie");
})


let url = "http://localhost:5678/api/works/"
let email = document.getElementById("email");
let mdp = document.getElementById("mdp");
let seConnecter = document.getElementById ("seConnecter");

seConnecter.addEventListener ("click", (e) => {
    let emailRegex = /\@+/; // A-Zéèçà$ëïöüäÿùµñ\&\~\"\#\'\[\]\|\\\°\+\=\¨\¤\£\{\}\^\(\)\$\%\!\/\s*  
    let emailRegex2 =/[A-Zéèçàëïöüäÿùµñ&\s~"#'\[\]\|\\\°\+\=\¨¤£\{\}\^\(\)\$\%\!\/]/ ;  // renvoie true donc bloquer [A-Z]
    let mdpRegex = /{\}\[\]\$\!\(\)\^/g;
    let resEmail1 = emailRegex.test(email.value);
    let resEmail2 = emailRegex2.test(email.value);
    let resMdp = mdpRegex.test(mdp.value);
    
    
    console.log(resEmail1);
    console.log(resEmail2);
    console.log(resMdp);

    
    

    if (email.value==="") {
        e.preventDefault();
        alert ("Vous devez saisir votre Email et votre mot de passe pour vous connecter");
        window.location.reload();        
    }else{
        if (resEmail1 === false) {
            e.preventDefault();
            alert ("L'adresse mail doit contenir un @");
            email.value = "";
            window.location.reload();
        }else{
            if (resEmail2 === true){
                e.preventDefault();
                alert ("L'adresse mail saisie contient des caractères interdits \nMerci de recharger la page pour une nouvelle saisie");
                email.value = "";
                window.location.reload();
            }else{       
                if (mdp==="") {
                    e.preventDefault();
                    alert ("Vous devez saisir votre mot de passe pour vous connecter");                   
                    window.location.reload();
                }else{
                    if (resMdp=== true) {
                        alert ("Le mot de passe contient des caractères interdits");
                    }
                }
            }
        }
    }
})


const postData = async () => {
    const respons = fetch("http://localhost:5678/api/works/", {
        method : "POST",
        headers : {
            "accept": "application/json",       // informer le service web qu'il va recevoir du json
            "content-Type": "application/json"
         },
        body : JSON.stringify(jsonbody)              //transformer notre objet JavaScript en JSON
    });
         console.log(respons);
   

}

