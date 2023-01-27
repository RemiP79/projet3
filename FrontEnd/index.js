/**
 *
 * @param {object} data affichage des projet sur la page d'accueil, issus du backend
 */
const createWorks = (data) => {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    let gallery = document.getElementById("gallery");

    figure.setAttribute("data-cat", data.categoryId);
    figure.setAttribute("id", `fig_${data.id}`); //permettre la suppression des travaux
    figure.setAttribute("class", "fig");
    img.setAttribute("crossorigin", "anonymous");
    img.setAttribute("src", data.imageUrl);
    img.setAttribute("alt", data.title);
    figcaption.textContent = data.title;

    figure.append(img, figcaption);
    gallery.append(figure);
};

/**
 *
 * @param {object} data affichage des informations issues du backend dans la modale
 */
const createWorksModale = (data) => {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let iconePoub = document.createElement("i");
    let figcaption = document.createElement("figcaption");
    let gallery2 = document.getElementById("gallery2");
    let div = document.createElement("div");
    let iconeFleche = document.createElement("i");

    figure.setAttribute("data-cat", data.categoryId);
    figure.setAttribute("id", `mod_${data.id}`); //permettre la suppression des travaux
    figure.setAttribute("class", "fig");
    img.setAttribute("crossorigin", "anonymous");
    img.setAttribute("src", data.imageUrl);
    img.setAttribute("alt", data.title);
    img.setAttribute("class", "imgGall2");
    figcaption.textContent = "Editer";
    iconePoub.setAttribute("class", "fa-solid fa-trash-can iconePoub");
    iconePoub.setAttribute("id", `poub_${data.id}`);
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
};

const supprGallerie = document.getElementById("supprGallerie");
supprGallerie.addEventListener("click", () => {
    alert("en cours de réalisation");
});

/*const deleteBouton =(e) => {  
  if(figure.id= e.target.id){
    fig.remove();
  }
}*/

const ajouterPhoto = document.getElementById("ajouterPhoto");
ajouterPhoto.addEventListener("click", () => {
    document.getElementById("modale").style.display = "flex";
    document.getElementById("winModale").style.display = "none";
    document.getElementById("winModaleAdd").style.display = "flex";
});

/**
 * Construction Fenetre winmodale2 pour ajouter un objet
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
    const preview = document.createElement("img");
    preview.setAttribute("alt", "projet selectionné");

    const divLabelFile = document.createElement("div");
    divLabelFile.setAttribute("id", "divLabelFile");
    /*VO*/ /* AJOUT d'une span qui contiendra la miniature*/
    const prev = document.createElement("span");
    prev.setAttribute("id", "preview");
    prev.setAttribute("class", "mini");

    const labelInputFile = document.createElement("label");
    labelInputFile.setAttribute("for", "file");
    labelInputFile.setAttribute("id", "ajoutPhoto");
    labelInputFile.textContent = "+ Ajouter Photo";

    const inputFile = document.createElement("input");
    inputFile.setAttribute("type", "file");
    inputFile.setAttribute("id", "file");
    inputFile.setAttribute("class", "input-file"); //
    inputFile.setAttribute("accept", ".png,.jpg,.jpeg");
    /*VO*/
    inputFile.addEventListener("change", ChangeImg);
    /*VO
    const labelButtonModif = document.createElement("label");
    //labelButtonModif.setAttribute("for", "ajoutPhoto");
    const buttonModif = document.createElement("button");
    //buttonModif.setAttribute("type","submit");
    //buttonModif.setAttribute("value","ajoutPhoto");
    //buttonModif.setAttribute("name","ajoutPhoto");
    buttonModif.setAttribute("id", "ajoutPhoto");
    buttonModif.textContent = "+ Ajouter Photo";
VP*/
    const infoTypeImg = document.createElement("p");
    infoTypeImg.textContent = "jpg,png 4mo max";

    const formulaire = document.createElement("form");
    //formulaire.setAttribute("method","");
    //formulaire.setAttribute("enctype", "multipart/form-data");
    // formulaire.setAttribute("action","");
    //formulaire.setAttribute("for", "")
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
    labelOption;
    const optionCategory = document.createElement("select");
    optionCategory.setAttribute("id", "catges");
    const selectVide = document.createElement("option");
    selectVide.setAttribute("value", "");
    selectVide.textContent = "";
    optionCategory.append(selectVide);

    for (let elem of data) {
        let cat = document.createElement("option");
        optionCategory.appendChild(cat);
        cat.value = elem.id;
        cat.textContent = elem.name;
    }

    const trait = document.createElement("div");
    trait.setAttribute("class", "trait");

    //const labelAddPhotoValider = document.createElement("label");
    //labelAddPhotoValider.setAttribute("for", "validModifPhoto");
    const sendData = document.createElement("button");
    //sendData.setAttribute("type","submit");
    // sendData.setAttribute("value","Valider");
    //sendData.setAttribute("name","validModifPhoto");
    sendData.setAttribute("id", "validModifPhoto");
    sendData.textContent = "Valider";

    const tooltip = document.createElement("p");        // A SUPPRIMER ?
    tooltip.setAttribute("id", "tooltipAddImg");

    /*VO*/ /*Modif du nom addPhotoValider par sendata*/
    sendData.addEventListener("click", envoiNouveauProjet);

    divLabelFile.append(
        prev,
        labelInputFile,
        inputFile /*VO buttonModif */
        /*labelButtonModif,*/
    );
    div.append(iconeRetour, iconeClose);
    div1.append(imageModif, divLabelFile, infoTypeImg);
    formulaire.append(
        div1,
        labelTitre,
        inputText,
        labelOption,
        optionCategory,
        trait,
        //labelAddPhotoValider,
        sendData
    );
    div2.append(formulaire);
    winModaleAdd.append(div, titre, div2);
};

/**
 *
 * @param {object} data
 * création d'un fonction qui insère la partie filtre (boutons + addEventListener "click")
 */

const createWorksByCat = (data) => {
    let sectionFiltres = document.getElementById("sectionFiltres");

    // bouton "tous"
    let boutonTous = document.createElement("input");
    boutonTous.setAttribute("type", "button");
    boutonTous.setAttribute("value", "  Tous  ");
    boutonTous.setAttribute("class", "boutonFiltre");
    boutonTous.setAttribute("class", "cat");
    boutonTous.setAttribute("class", "boutonTous");
    boutonTous.setAttribute("id", "0");
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

    // autres boutons
    for (let elem of data) {
        const autreBouton = document.createElement("input");
        autreBouton.setAttribute("type", "button");
        autreBouton.setAttribute("value", elem.name);
        autreBouton.setAttribute("class", "boutonFiltre");
        autreBouton.setAttribute("class", "cat");
        autreBouton.setAttribute("id", elem.id);
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

//=====================Creation d'une fonction pour les event sur les boutons
const mouseov = (e) => {
    e.style.color = "white";
    e.style.background = "#1D6154";
};
const mouseOut = (e) => {
    e.style.color = "#1D6154";
    e.style.background = "white";
};

/**
 *
 * @param {event} e  //filtrer les projets sur page d'accueil
 */
const clickBouton = (e) => {
    const allClass = document.getElementsByClassName("fig");
    for (let elem of allClass) {
        if (e.target.id !== "0") {
            if (elem.dataset.cat !== e.target.id) {
                // dataset fait reference au data-cat de figure target correspond à l'id de l'evenement
                elem.classList.add("notVisible");
            } else {
                if (elem.classList.contains("notVisible")) {
                    elem.classList.remove("notVisible");
                }
            }
        } else {
            if (elem.classList.contains("notVisible")) {
                // sinon on affiche le contenu du bouton Tous
                elem.classList.remove("notVisible");
            }
        }
    }
};

/**
 * @param {objet} //Affichage des projets (création d'une fonction getData qui est asynchrone)
 */
const getData = async () => {
    try {
        const respons = await fetch("http://localhost:5678/api/works/");
        if (!respons.ok) {
            throw new Error(`Erreur : ${respons.status}`); // le programme s'arrête (throw)
        }
        const data = await respons.json();
        let categoryIds = []; // création de tableaux qui vont nous permettre de gerer l'affichage selectif des travaux
        let categorys = [];

        for (let elem of data) {
            createWorks(elem);
            createWorksModale(elem);
            if (!categoryIds.includes(elem.categoryId)) {
                categoryIds.push(elem.categoryId); // utilisé pour l'attribut data-cat de figure
                categorys.push(elem.category); // utilisé pour différencier les category lors du click
            }
        }
        createWorksByCat(categorys);
        isConnected();
        windowModaleAdd(categorys);
    } catch (error) {
        alert(error);
    }
};
getData(); //On appelle la fonction getData pour qu'elle s'exécute


// Fermeture modale
const closeModale = () => {
    document.getElementById("modale").style.display = "none";
    document.getElementById("winModale").style.display = "none";
    document.getElementById("winModaleAdd").style.display = "none"; //document.getElementById("modale").style.display = "none";
    //document.getElementById("winModaleAdd").classList.toggle("notVisible");
}

const isConnected = () => {
    if (localStorage.getItem("auth")) {
        // Verification si l'utilisateur est authentifié
        const modifier = document.getElementById("modifier");
        modifier.classList.toggle("notVisible");

        const modifier2 = document.getElementById("modifier2");
        modifier2.classList.toggle("notVisible");

        document.getElementById("barreNoire").style.display = "flex";
        modifier.addEventListener("click", openModal);
        modifier2.addEventListener("click", openModal);
    }
    
    document.getElementById("x").addEventListener("click", closeModale);
    window.addEventListener("click", outsideClick);
};

function outsideClick(e) {
    if (e.target == modale) {
        document.getElementById("modale").style.display = "none";
        document.getElementById("winModale").style.display = "none";
        document.getElementById("winModaleAdd").style.display = "none";

        //modale.style.display = 'none';
        //document.getElementById("winModaleAdd").classList.toggle("notVisible");
    }
}

const openModal = () => {
    //document.getElementById("barreNoire").style.display = "flex";
    document.getElementById("modale").style.display = "flex";
    document.getElementById("winModale").style.display = "flex";
    document.getElementById("winModaleAdd").style.display = "none";
    document.getElementById("file").addEventListener("change", ChangeImg);
};

// Création d'un fichier utilisable grâce à l'input type file
let img = {
    file: "",
    filename: "",
};

const envoiNouveauProjet = async (e) => {
    e.preventDefault(); /*VO*/
    let choixCatUser = document.getElementById("catges");
    console.log(img.filename);
    let formData = new FormData();
    formData.append("image", img.file, img.filename); /*VO*/
    formData.append(
        "title",
        document.getElementById("textAjoutPhoto").value
    ); /*VO*/
    formData.append(
        "category",
        choixCatUser.options[choixCatUser.selectedIndex].value
    );
    /*VO*/
    if (!checkData(formData)) {
        alert("You must fill all the fields(image, title, category)");
        return false;
    }

    const url = "http://localhost:5678/api/works";

    if (!localStorage.getItem("auth")) {
        alert("Problème de connexion");
        return false;
    }
    const auth = JSON.parse(localStorage.getItem("auth"));

    try {
        const Opt = {
            method: "POST",
            headers: {
                Accept: "application/json",
                Content: "multipart/form-data" /*VO*/,
                Authorization: "Bearer " + auth.token,
            },
            body: formData,
        };

        const resp = await fetch(url, Opt);
        if (!resp) {
            throw new Error(`Erreur réponse Fetch  type : ${resp.status}`);
        }

        const newWork = await resp.json();
        createWorks(newWork);
        //alert ("Projet ajouté");
        closeModale();/*VO TODO fermer la modale*/
    } catch (error) {
        alert(error);
    }
};
/*VO*/
const checkData = (formData) => {
    formData.forEach((value, key) => {
        //console.log(key + "__" + value);
        if (typeof value === "undefined" || value === "" || value === null)
            return false;
    });
    return true;
};

const ChangeImg = (e) => {
    if (document.getElementById("thumbi") !== null) {
        document.getElementById("thumbi").remove();
    }

    let imageMin = document.createElement("img");
    imageMin.setAttribute("id", "thumbi");
    console.log(e.target.files);
    if (e.target && e.target.files[0]) {
        img.file = e.target.files[0];               // renvoie l'objet img
        img.filename = e.target.files[0].name;   //nom_de_la_photo.jpg
    }
    imageMin.file = e.target.files[0];
    let preview = document.getElementById("preview");
    preview.appendChild(imageMin);
    let reader = new FileReader();
    reader.onload = (e) => {
        imageMin.src = e.target.result;
    };
    reader.readAsDataURL(img.file);         //utilisée afin de lire le contenu d'un blob (Blob) ou d'un fichier (File).
    document.getElementById("imageModif").classList.add("notVisible");
};



const supprProjet = async(e) => {
    e.preventDefault();
    const id = e.target.id.split("_")[1];
    if(confirm("Êtes vous certain(e) de vouloir supprimer ce projet ?")==true) {
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
        //console.log (resp);
        if (!resp.ok){
            throw error = new Error (`Erreur de connexion Fetch : ${resp.status}`);
        }
        document.getElementById(`mod_${id}`).remove();
        document.getElementById(`fig_${id}`).remove();
    }
    catch (error) {
        alert(error);
    }
    }
    return false   // ??

};