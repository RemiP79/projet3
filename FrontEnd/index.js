/**
 * //recupère les information des projets dans le back(création d'une fonction getData qui est asynchrone)
 * @param {Objet} 
 */
const getData = async () => {
    try {
        const respons = await fetch("http://localhost:5678/api/works/");
        if (!respons.ok) {
            throw new Error(`Erreur : ${respons.status}`);          // le programme s'arrête (throw) on sort du bloc try et on va dans le bloc catch
        }
        const data = await respons.json();
        let categoryIds = [];                                       // tableau temporaire qui va permettre d'éviter la répétition des ID des catégories
        let categorys = [];     

        for (let elem of data) {
            createWorks(elem);                                      // boucle qui permet d'afficher les projets sur la page d'accueil
            createWorksModale(elem);                                // boucle qui permet d'afficher les projets dans la modale
            if (!categoryIds.includes(elem.categoryId)) {
                categoryIds.push(elem.categoryId); 
                categorys.push(elem.category);                      // utilisé pour faire les filtres          
            }
            //console.log(categorys);
        }
        createWorksByCat(categorys);                                // afficher les boutons en page d'accueil + utilisation de clickBouton() pour flitrer;
        isConnected();
        windowModaleAdd(categorys);                                 //afficher les projets dans la modale d'ajout de projet) 
    } catch (error) {
        alert(error);
    }
};

/**
 *affichage des projets sur la page d'accueil, issus du backend
 * @param {Object} data 
 */
const createWorks = (data) => {
    let figure = document.createElement("figure");                  // création des éléments en fonction du html fourni
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    let gallery = document.getElementById("gallery");

    figure.setAttribute("data-cat", data.categoryId);
    figure.setAttribute("id", `fig_${data.id}`);                    //permettre la suppression des travaux
    figure.setAttribute("class", "fig");                            // utilisé dans la fonction clickBouton pour filtrer les projets
    img.setAttribute("crossorigin", "anonymous");
    img.setAttribute("src", data.imageUrl);                         // récupération de l'adresse de l'image
    img.setAttribute("alt", data.title);                            // récupération du nom de l'image
    figcaption.textContent = data.title;                            // affichage du nom de l'image

    figure.append(img, figcaption);
    gallery.append(figure);
};

// ==> =============== Gestion des boutons de filtre =================
/**
 *création d'une fonction qui insère la partie filtre (boutons + gestion d'évènement)
 * @param {Array} data 
 */
const createWorksByCat = (data) => {
    //console.log(typeof(data));
    let sectionFiltres = document.getElementById("sectionFiltres");

    // bouton "tous"
    let boutonTous = document.createElement("input");    
    boutonTous.setAttribute("type", "button");
    boutonTous.setAttribute("value", "  Tous  ");
    boutonTous.setAttribute("class", "boutonFiltre");
    boutonTous.setAttribute("class", "cat");
    boutonTous.setAttribute("class", "boutonTous");
    boutonTous.setAttribute("id", "0");                         // utilisé lors du tri
    boutonTous.addEventListener("mouseover", () => {
        mouseov(boutonTous);
    });
    boutonTous.addEventListener("mouseout", () => {
        mouseOut(boutonTous);
    });
    boutonTous.addEventListener("click", (e) => {
        clickBouton(e);
    });
        
    sectionFiltres.append(boutonTous);

    // autres boutons : boucle qui affiche le nombre de boutons en fonction des "category" du back
    for (let elem of data) {
        const autreBouton = document.createElement("input");
        autreBouton.setAttribute("type", "button");
        autreBouton.setAttribute("value", elem.name);
        autreBouton.setAttribute("class", "boutonFiltre");
        autreBouton.setAttribute("class", "cat");
        autreBouton.setAttribute("id", elem.id);                    //id en fonction de la category du backend
        autreBouton.addEventListener("mouseover", () => {
            mouseov(autreBouton);
        });
        autreBouton.addEventListener("mouseout", () => {
            mouseOut(autreBouton);
        });
        autreBouton.addEventListener("click", (e) => {
            clickBouton(e);
        });
        sectionFiltres.append(autreBouton);
    }
};

const mouseov = (e) => {
    e.style.color = "#FCFCF6";
    e.style.background = "#1D6154";
};
const mouseOut = (e) => {
    e.style.color = "#1D6154";
    e.style.background = "#FCFCF6";
};

/**
 *filtrer les projets sur page d'accueil
 * @param {event} e  
 */
const clickBouton = (e) => {
    const allClass = document.getElementsByClassName("fig");
    for (let elem of allClass) {                                         // pour tous les elements figures
        if (e.target.id !== "0") {                                       // si l'ID du bouton est différent de Zéro
            if (elem.dataset.cat !== e.target.id) {                      // tous les elements figure  qui n'ont pas le même data-cat que l'ID 
                                                                        // dataset fait reference au data-cat de figure target correspond à l'id de l'evenement
                elem.classList.add("notVisible");                        //sont non visibles
            } else {
                if (elem.classList.contains("notVisible")) {            // sinon si les autres élément (dont data-cat=id) sont non visibles
                    elem.classList.remove("notVisible");                // on les rend visibles
                }
            }
        } else { // on affiche le contenu du bouton Tous
            if (elem.classList.contains("notVisible")) {                // sinon, si data-cat = 0
                
                elem.classList.remove("notVisible");                    // on rend visible tous les projets
            }
        }
    }
};  


/**
 * verifier que l'utilisateur soit identifié
 */
const isConnected = () => {
    if (localStorage.getItem("auth")) {                                 
        const modifier = document.getElementById("modifier");           //afficher modifier
        modifier.classList.toggle("notVisible");

        const modifier2 = document.getElementById("modifier2");         // afficher le deuxième modifier
        modifier2.classList.toggle("notVisible");

        const modifier3 = document.getElementById("modifier3");           //afficher modifier
        modifier3.classList.toggle("notVisible");

        document.getElementById("barreNoire").style.display = "flex";   // afficher la barre noire
        modifier.addEventListener("click", openModal);                  // ouverture de la modale
        modifier2.addEventListener("click", openModal);
        modifier3.addEventListener("click", openModal);       
       
        document.getElementById("logout").classList.remove("notVisible");
        document.getElementById("login").classList.add("notVisible"); 
        
        document.getElementById("sectionFiltres").style.display = "none";
        document.getElementById("gallery").style.marginTop = "40px";
    }
    
    document.getElementById("x").addEventListener("click", closeModale);
    window.addEventListener("click", outsideClick);

    
};


// ==> ============ Gestion ouverture et fermeture modale
const openModal = () => {    
    document.getElementById("modale").style.display = "flex";
    document.getElementById("winModale").style.display = "flex";
    document.getElementById("winModaleAdd").style.display = "none";    
};

const closeModale = () => {    
    document.getElementById("modale").style.display = "none";
    document.getElementById("winModale").style.display = "none";
    document.getElementById("winModaleAdd").style.display = "none";     
}

function outsideClick(e) {
    if (e.target == modale) {
        closeModale();        
    }
}


/**
 *affichage des informations issues du backend dans la modale
 * @param {Object} data 
 */
const createWorksModale = (data) => {
    let figure = document.createElement("figure");                        
    let img = document.createElement("img");
    let iconePoub = document.createElement("i");
    let figcaption = document.createElement("figcaption");
    let gallery2 = document.getElementById("gallery2");
    let div = document.createElement("div");
    let iconeFleche = document.createElement("i");

    figure.setAttribute("data-cat", data.categoryId);                    // utilisé pour les filtres (bouton) dans la fonction clickBouton
    figure.setAttribute("id", `mod_${data.id}`);                         //permettre la suppression des travaux dans fonction supprProjet
    figure.setAttribute("class", "fig");
    img.setAttribute("crossorigin", "anonymous");
    img.setAttribute("src", data.imageUrl);                              // récupération de l'adresse de l'image
    img.setAttribute("alt", data.title);                                 // récupération du nom de l'image
    img.setAttribute("class", "imgGall2");
    figcaption.textContent = "éditer";
    iconePoub.setAttribute("class", "fa-solid fa-trash-can iconePoub");
    iconePoub.setAttribute("id", `poub_${data.id}`);                    // utilisé pour cibler le projet à supprimer dans fonction supprProjet (url ftech)
    iconeFleche.setAttribute(
        "class",
        "fa-solid fa-arrows-up-down-left-right iconeFleche"
    );

    iconePoub.addEventListener("click", supprProjet);

    div.append(iconeFleche, iconePoub);
    figure.append(div, img, figcaption);
    gallery2.append(figure);

    iconeFleche.addEventListener("click", () => {
        alert("en cours de réalisation");
    });
    document.getElementById("supprGallerie").addEventListener("click", () => {
        alert("fonction en cours de réalisation");
    });   
    document.getElementById("ajouterPhoto").addEventListener("click", () => {
        document.getElementById("modale").style.display = "flex";
        document.getElementById("winModale").style.display = "none";
        document.getElementById("winModaleAdd").style.display = "flex";        
        //Réinitialisation du formulaire
        if (document.getElementById("thumbi") !== null) {                           
            document.getElementById("thumbi").remove();
            document.getElementById("imageModif").classList.remove("notVisible"); 
        } 
        document.getElementById("textAjoutPhoto").value = "";
        document.getElementById("catges").selectedIndex = 0;
    });
};

/**
 * Construction Fenetre winmodale2 pour ajouter un projet
 * @param {Array} data
 */
const windowModaleAdd = (data) => {    
    const winModaleAdd = document.getElementById("winModaleAdd");
    const div = document.createElement("div");
    div.setAttribute("id", "iconesModifImage");

    const iconeRetour = document.createElement("i");
    iconeRetour.setAttribute("class", "fa-solid fa-arrow-left");
    iconeRetour.addEventListener("click", () => {
        document.getElementById("modale").style.display = "flex";
        document.getElementById("winModale").style.display = "flex";
        document.getElementById("winModaleAdd").style.display = "none";
    });

    const iconeClose = document.createElement("i");
    iconeClose.setAttribute("class", "fa-solid fa-xmark");
    iconeClose.addEventListener("click", closeModale);
        
    const titre = document.createElement("p");
    titre.textContent = "Ajout photo";
    titre.setAttribute("id", "titreModale2");

    const div2 = document.createElement("div");
    div2.setAttribute("class", "cadreWinmod");

    const div1 = document.createElement("div");
    div1.setAttribute("id", "cadreAjoutImg");

    const imageModif = document.createElement("i");
    imageModif.setAttribute("class", "fa-regular fa-image");
    imageModif.setAttribute("id", "imageModif");
   
    const divLabelFile = document.createElement("div");
    divLabelFile.setAttribute("id", "divLabelFile");
   
    const prev = document.createElement("span");                //va permettre d'insérer la miniature en remplaçant l'image modif
    prev.setAttribute("id", "preview");
    prev.setAttribute("class", "mini");
    

    const labelInputFile = document.createElement("label");  
    labelInputFile.setAttribute("for", "file");
    labelInputFile.setAttribute("id", "ajoutPhoto");
    labelInputFile.textContent = "+ Ajouter Photo";             // bouton sur lequel l'utilisateur va cliquer

    const inputFile = document.createElement("input");          //input (opacity = 0 dans css) qui va gérer la comm avec le back 
    inputFile.setAttribute("type", "file");
    inputFile.setAttribute("id", "file");
    inputFile.setAttribute("class", "input-file"); //
    inputFile.setAttribute("accept", ".png,.jpg,.jpeg");
    
    inputFile.addEventListener("change", ChangeImg);            
    
    const infoTypeImg = document.createElement("p");
    infoTypeImg.textContent = "jpg,png 4mo max";

    const formulaire = document.createElement("form");    
    formulaire.setAttribute("id", "formAjoutPhoto");

    const labelTitre = document.createElement("label");
    labelTitre.setAttribute("for", "labelTitreAjout");
    labelTitre.setAttribute("class", "labelAjout");
    labelTitre.textContent = "Titre";

    const inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("name", "labelTitreAjout");
    inputText.setAttribute("id", "textAjoutPhoto");
    inputText.setAttribute("class", "inputTextAjout");
    inputText.setAttribute("required", "required");
    inputText.setAttribute("placeholder", "Donnez un nom à votre projet");

    const labelOption = document.createElement("label");
    labelOption.setAttribute("for", "catges");
    labelOption.textContent = "Catégorie";
    
    const optionCategory = document.createElement("select");
    optionCategory.setAttribute("id", "catges");
    optionCategory.setAttribute("placeholder","");
    
    const selectVide = document.createElement("option");
    selectVide.setAttribute("value", "");    
    selectVide.textContent = "Choisissez une option";
    optionCategory.append(selectVide);

    for (let elem of data) {
        let cat = document.createElement("option");
        optionCategory.appendChild(cat);
        cat.value = elem.id;
        cat.textContent = elem.name;
    }

    const trait = document.createElement("div");
    trait.setAttribute("class", "trait");

    const sendData = document.createElement("button");
    sendData.setAttribute("id", "validModifPhoto");
    sendData.textContent = "Valider";
    sendData.addEventListener("mouseover", ()=>{
        sendData.style.background = "#1D6154";
    });
    sendData.addEventListener("mouseout", ()=>{
        sendData.style.background = "grey";
    });

    
   sendData.addEventListener("click", envoiNouveauProjet);              // appel de la fonction pour ajouter nouveau projet
   
    divLabelFile.append(
        prev,
        labelInputFile,
        inputFile
    );
    div.append(iconeRetour,
        iconeClose
    );
    div1.append(imageModif,
        divLabelFile, 
        infoTypeImg
    );
    formulaire.append(
        div1,
        labelTitre,
        inputText,
        labelOption,
        optionCategory,
        trait,
        sendData
    );
    div2.append(formulaire);
    winModaleAdd.append(
        div, 
        titre, 
        div2
    );
   
};


// Création d'un fichier utilisable grâce à l'input type file
let img = {
    file: "",                                                   //aura comme valeur le contenu binaire du fichier
    filename: "",                                               // aura comme valeur le nom du fichier
};


const ChangeImg = (e) => {
    if (document.getElementById("thumbi") !== null) {           //efface l'image miniature précedente si elle est présente
        document.getElementById("thumbi").remove();
    }   

    let imageMin = document.createElement("img");
    imageMin.setAttribute("id", "thumbi");
    if (e.target && e.target.files[0]) {
        img.file = e.target.files[0];                           // renvoie le contenu du fichier de l'image
        img.filename = e.target.files[0].name;                  //nom_de_la_photo.jpg
    }
    imageMin.file = e.target.files[0];                          // gère l'affichage de la miniature
    let preview = document.getElementById("preview");
    preview.appendChild(imageMin);
    let reader = new FileReader();
    reader.onload = (e) => {                                    //Chargement de l'image
        imageMin.src = e.target.result;    
    };
    
    reader.readAsDataURL(img.file);                                         //utilisée afin de lire le contenu d'un fichier (File).
    document.getElementById("imageModif").classList.add("notVisible");     //enlève l'icone d'image 
};


const envoiNouveauProjet = async (e) => {
    e.preventDefault();
    let choixCatUser = document.getElementById("catges");       // pour recupérer le choix d'option effectué par l'utilisateur
    let formData = new FormData();                              // création d'une instance de l'objet javascript formData
    if (typeof img.file === "object") {
        formData.append("image", img.file, img.filename);
    } else {
        formData.append("image", "");
    }    
    formData.append(
        "title",
        document.getElementById("textAjoutPhoto").value
    );
    formData.append(
        "category",
        choixCatUser.options[choixCatUser.selectedIndex].value
    );
        
    if (!checkData(formData)) {                                         // action si le formulaire n'est pa rempli
        alert("Vous devez remplir tous les champs (image, titre, catégorie)");
        return false;
    }
    
    const url = "http://localhost:5678/api/works";
    if (!localStorage.getItem("auth")) {
        alert("Problème de connexion, veuillez vous identifier");
        return false;
    }
    const auth = JSON.parse(localStorage.getItem("auth"));   //Pour rendre l'auth de chaine à nombre entier
    try {
        const opt = {
            method: "POST",
            headers: {
                Accept: "application/json",
                Content: "multipart/form-data",
                Authorization: "Bearer " + auth.token,
            },
            body: formData,
        };
        const resp = await fetch(url, opt);
        if (!resp.ok) {
            throw new Error(`Erreur réponse Fetch  type : ${resp.status}`);
        }       
        const newWork = await resp.json();
        console.log(newWork);               
        createWorks(newWork);                       // utilisé pour ajouter le nouveau projet dans la page d'accueil
        createWorksModale(newWork);                 // utilisé pour ajouter le projet dans la modale
        img.file="";
        img.filename="";           
        closeModale();
    } catch (error) {
        alert(error);
    }    
};

/**
 * Verifier si tous les champs du formulaire sont remplis
 * @param {*} formData 
 * @returns 
 */
const checkData = (formData) => {
    let ret = true;
    formData.forEach((value, key) => {
        //console.log(key + "__" + value);
        if (typeof value === "undefined" || value === "" || value === null)
            ret = false;
    });
    return ret;
};

/**
 * supprimer les projets
 * @param {*} e 
 * @returns 
 */
const supprProjet = async(e) => {
    e.preventDefault();
    const id = e.target.id.split("_")[1];                                               // il s'agit de l'id poub_${data.id} de iconePoub
    if(confirm("Êtes vous certain(e) de vouloir supprimer ce projet ?")==true) {        // confirmation de la suppression
        const url = `http://localhost:5678/api/works/${id}`;
        if(!localStorage.getItem("auth")) {
           return false;                
        }

        const auth = JSON.parse(localStorage.getItem("auth"));

        try {
            const opt = {
                method: "DELETE",
                headers: {   
                    Content: "multipart/form-data",
                    Authorization: "Bearer " + auth.token,
                },
            };
            const resp = await fetch (url, opt);
            if (!resp.ok){
                throw error = new Error (`Erreur de connexion Fetch : ${resp.status}`);
            }
            document.getElementById(`mod_${id}`).remove();                      // on supprime l'element du DOM
            document.getElementById(`fig_${id}`).remove();
        }
        catch (error) {
            alert(error);
        }
    }
    closeModale();
    return false
    
};

/**
 * Permettre à l'utilisateur de se deconnecter
 */
const clickLogOut = () => {        
    localStorage.removeItem("auth");
    document.getElementById("logout").classList.add("notVisible");
    document.getElementById("login").classList.toggle("notVisible");
    document.getElementById("barreNoire").style.display = "none";
    document.getElementById("modifier").classList.toggle("notVisible");
    document.getElementById("modifier2").classList.toggle("notVisible");
    document.getElementById("modifier3").classList.toggle("notVisible");
    document.getElementById("sectionFiltres").style.display = "flex";    
}
document.getElementById("logout").addEventListener("click", clickLogOut);

getData();