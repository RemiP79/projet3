
/**
 * 
 * @param {object} data affichage des informations issues du backend
 */
const createWorks = (data)  => { 
  let figure = document.createElement("figure");
  let img = document.createElement("img");
  let figcaption = document.createElement("figcaption");
  let gallery = document.getElementById("gallery");     // création d'un Id gallery dans index.html
    
  figure.setAttribute("data-cat",data.categoryId);     //pour récupérer les catégories
  figure.setAttribute("id", `fig_${data.id}`);          //permettre la suppression des travaux
  figure.setAttribute("class", "fig");
  img.setAttribute("crossorigin","anonymous");          //Rajouté pour que chrome affiche les images
  img.setAttribute("src",data.imageUrl);
  img.setAttribute("alt",data.title);
  figcaption.textContent = data.title;    // préférable d'utiliser textContent à innerHTML pour des raisons de sécurité
             
  figure.append(img,figcaption);  
  //insertInModal(data);         // utilisé pour creer la collection dans la modale    
  gallery.append(figure);
};

/**
 * 
 * @param {object} data affichage des informations issues du backend dans la modale
 */
const createWorksModale = (data)  => { 
  let figure = document.createElement("figure");
  let img = document.createElement("img");
  let figcaption = document.createElement("figcaption");
  let gallery2 = document.getElementById("gallery2");     // création d'un Id gallery dans index.html
    
  figure.setAttribute("data-cat",data.categoryId);     //pour récupérer les catégories
  figure.setAttribute("id", `fig_${data.id}`);          //permettre la suppression des travaux
  figure.setAttribute("class", "fig");
  img.setAttribute("crossorigin","anonymous");          //Rajouté pour que chrome affiche les images
  img.setAttribute("src",data.imageUrl);
  img.setAttribute("alt",data.title);
  figcaption.textContent = "Editer";    // préférable d'utiliser textContent à innerHTML pour des raisons de sécurité
             
  figure.append(img,figcaption);  
  gallery2.append(figure);
};

// ===========================création de la boite de selection de catégories dans la modale


/*for(let elem of data) {
    let cat = document.createElement("option");
    document.querySelector("catges").appendChild(cat);  // ==> ==> INSERER LE CATGES AU BON ENDROIT DANS LE HTML
    cat.value = elem.id;
    cat.textContent = elem.name;
  }*/
  


/**
 * 
 * @param {object} data 
 * création d'un fonction qui insère la partie filtre (boutons + addEventListener "click")
 */

const createWorksByCat = (data)  => {   
  let sectionFiltres = document.getElementById("sectionFiltres");
 
// bouton "tous"
  let boutonTous = document.createElement("input");    
    boutonTous.setAttribute("type","button");
    boutonTous.setAttribute("value","  Tous  ");
    boutonTous.setAttribute("class","boutonFiltre");        //mise en forme CSS
    boutonTous.setAttribute("class", "cat");                
    boutonTous.setAttribute("class", "boutonTous");
    boutonTous.setAttribute("id","0");                      // va servir pour l'affichage filtré des travaux
    boutonTous.addEventListener("mouseover", () => {
      mouseov(boutonTous);
    })
    boutonTous.addEventListener("mouseout", () => {
      mouseOut(boutonTous);
    })
    boutonTous.addEventListener("click",  (e) =>{
      clickBouton(e);
    });
  sectionFiltres.append(boutonTous);

// autres boutons
  for (let elem of data) {
    const autreBouton =document.createElement("input");
    autreBouton.setAttribute("type","button");
    autreBouton.setAttribute("value",elem.name);
    autreBouton.setAttribute("class","boutonFiltre");   
    autreBouton.setAttribute("class","cat");
    autreBouton.setAttribute("id",elem.id);
    autreBouton.addEventListener("mouseover", () => {
      mouseov(autreBouton);
    })
    autreBouton.addEventListener("mouseout", () => {
      mouseOut(autreBouton);
    })
    autreBouton.addEventListener ("click", (e) => {
      clickBouton(e);
    });
  sectionFiltres.append(autreBouton);
  }
};

//=====================Creation d'une fonction pour les event sur les boutons
const mouseov = (e) => {
  e.style.color = "white";
  e.style.background = "#1D6154";
}
const mouseOut = (e) => {
  e.style.color = "#1D6154";
  e.style.background = "white";
}

const clickBouton = (e) => {
  const allClass = document.getElementsByClassName("fig");
  for (let elem of allClass) {
    if (e.target.id !== "0") {                           // si l'id est différent de 0 (on vise les autres boutons)
      if (elem.dataset.cat !== e.target.id) {           // dataset fait reference au data-cat de figure target correspond à l'id de l'evenement
        elem.classList.add("notVisible");               //Si l'id de la data-cat est différent de l'id de l'element cliqué, on le notVisible
      }else{
        if (elem.classList.contains("notVisible")) {
          elem.classList.remove("notVisible");
        }
      }
    }else{
      if (elem.classList.contains("notVisible")) {    // sinon on affiche le contenu du bouton Tous
        elem.classList.remove("notVisible");
      }
    }
  }
};


//======================création d'une fonction getData qui est asynchrone
const getData = async() => {
  try {                                                                //définit une reponse catch si une instruction provoque une exception
    const respons = await fetch("http://localhost:5678/api/works/")    // l'utilisation de async : respons = attend le resultat du fetch
     if (!respons.ok) {                                                // si le resultat du fetch ne fonctionne pas (ok = false dans la console) 
      throw new Error (`Erreur : ${respons.status}`);                  // le programme s'arrête (throw) et crée un nouvel objet Error qui donne le status (200 = ok, 404...)
    }                                                                  // utilisation des `(alt Gr+7) pour afficher le message d'erreur
    const data = await respons.json();                                 // constante data qui attend et récupère la respons au format json avant de se lancer
    let categoryIds = [];                                              // création de tableaux qui vont nous permettre de gerer l'affichage selectif des travaux
    let categorys = [];
        
    for (let elem of data) {                                           // création de la boucle pour récupérer les elements de l'objet data nécessaire à l'affichage
      createWorks(elem);
      createWorksModale(elem); 
      if (!categoryIds.includes(elem.categoryId)) {
        categoryIds.push(elem.categoryId);                            // utilisé pour l'attribut data-cat de figure
        categorys.push(elem.category);                                // utilisé pour différencier les category lors du click
        }            
    }    
    createWorksByCat(categorys); 
    // TODO fonction de test qui va tester (if is connected) --> pour cela aller faire un getItem (auth) dans localStorage
    isConnected ();  
  
      }    
  catch (error) {
    alert (error);
  }    
}
getData();                                                             //On appelle la fonction getData pour qu'elle s'exécute



const isConnected = () => { 
  
  //if (localStorage.getItem("auth")) {
        console.log("tout va bien connexion");
        const modifier = document.getElementById("modifier");
        modifier.classList.toggle("notVisible"); 
        
        // Get the modal

        modifier.addEventListener("click", openModal);   // ecrire une fonction open modale à la ligne 203 qui structure la modale
            // Get the <span> element that closes the modal
        //let spans = document.getElementsByClassName("clos");
        //for (let span of spans) {
      //   span.addEventListener("click", () => {
        //    closeModal();
        //  });
   // }
    // Get the <span> element that closes the modal
    document.getElementById("x").addEventListener("click", () => {
      document.getElementById("barreNoire").style.display = "none";
 document.getElementById("modale").style.display = "none";
    });

 /*document.getElementById("modale").addEventListener("click", () => {
  document.getElementById("barreNoire").style.display = "none";
document.getElementById("modale").style.display = "none";
)};*/

      //document.getElementById("winModale").classList.toggle("notVisible");
      
     // toggleModal();      // croix pour fermer la modale
     // console.log ("clik ok");
    
  
};

const openModal = () =>{  
 document.getElementById("barreNoire").style.display = "flex";
 document.getElementById("modale").style.display = "flex";
}
/*const toggleModal = () => {
  document.getElementById("modale").classList.toggle("notVisible");
  document.getElementById("winModale").classList.toggle("notVisible");
}*/
