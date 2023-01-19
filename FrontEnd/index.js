
/**
 * 
 * @param {object} data affichage des informations issues du backend
 */
const createWorks = (data)  => { 
  let figure = document.createElement("figure");
  let img = document.createElement("img");
  let figcaption = document.createElement("figcaption");
  let gallery = document.getElementById("gallery");     
    
  figure.setAttribute("data-cat",data.categoryId);     
  figure.setAttribute("id", `fig_${data.id}`);          //permettre la suppression des travaux
  figure.setAttribute("class", "fig");
  img.setAttribute("crossorigin","anonymous");          
  img.setAttribute("src",data.imageUrl);
  img.setAttribute("alt",data.title);
  figcaption.textContent = data.title;    
             
  figure.append(img,figcaption);     
  gallery.append(figure);
};

/**
 * 
 * @param {object} data affichage des informations issues du backend dans la modale
 */
const createWorksModale = (data)  => { 
  let figure = document.createElement("figure");
  let img = document.createElement("img");
  let iconePoub = document.createElement("i");
  let figcaption = document.createElement("figcaption");
  let gallery2 = document.getElementById("gallery2");     
  let div = document.createElement("div");
  let iconeFleche = document.createElement("i");  

  figure.setAttribute("data-cat",data.categoryId);     
  figure.setAttribute("id", `fig_${data.id}`);          //permettre la suppression des travaux
  figure.setAttribute("class", "fig");
  img.setAttribute("crossorigin","anonymous");          
  img.setAttribute("src",data.imageUrl);
  img.setAttribute("alt",data.title);
  img.setAttribute("class","imgGall2");
  figcaption.textContent = "Editer";    
  iconePoub.setAttribute("class","fa-solid fa-trash-can iconePoub");
  iconePoub.setAttribute("id", `fig_${data.id}`); 
  iconeFleche.setAttribute("class", "fa-solid fa-arrows-up-down-left-right iconeFleche"); 
  
  div.append(iconeFleche,iconePoub);
  figure.append(div,img,figcaption);  
  gallery2.append(figure);
  iconeFleche.addEventListener("click", () => {
  alert ("en cours de réalisation");
  });
};

const supprGallerie = document.getElementById ("supprGallerie");
supprGallerie.addEventListener("click", () => {
  alert ("en cours de réalisation");
});

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
    boutonTous.setAttribute("class","boutonFiltre");        
    boutonTous.setAttribute("class", "cat");                
    boutonTous.setAttribute("class", "boutonTous");
    boutonTous.setAttribute("id","0");                      
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


/**
 * 
 * @param {event} e  //filtrer les projets sur page d'accueil
 */
const clickBouton = (e) => {
  const allClass = document.getElementsByClassName("fig");
  for (let elem of allClass) {
    if (e.target.id !== "0") {                           
      if (elem.dataset.cat !== e.target.id) {           // dataset fait reference au data-cat de figure target correspond à l'id de l'evenement
        elem.classList.add("notVisible");               
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




/**
 * @param {objet} //Affichage des projets (création d'une fonction getData qui est asynchrone)
 */
const getData = async() => {
  try {                                                                
    const respons = await fetch("http://localhost:5678/api/works/")    
     if (!respons.ok) {                                                
      throw new Error (`Erreur : ${respons.status}`);                  // le programme s'arrête (throw) 
    }                                                                  
    const data = await respons.json();                                 
    let categoryIds = [];                                              // création de tableaux qui vont nous permettre de gerer l'affichage selectif des travaux
    let categorys = [];
        
    for (let elem of data) {                                           
      createWorks(elem);
      createWorksModale(elem); 
      if (!categoryIds.includes(elem.categoryId)) {
        categoryIds.push(elem.categoryId);                            // utilisé pour l'attribut data-cat de figure
        categorys.push(elem.category);                                // utilisé pour différencier les category lors du click
        }            
    }    
    createWorksByCat(categorys);     
    isConnected ();    
  }    
  catch (error) {
    alert (error);
  }    
}
getData();                                                             //On appelle la fonction getData pour qu'elle s'exécute



const isConnected = () => {   
  if (localStorage.getItem("auth")) {                            // Verification si l'utilisateur est authentifié
        const modifier = document.getElementById("modifier");
        modifier.classList.toggle("notVisible"); 

        const modifier2 = document.getElementById("modifier2");
        modifier2.classList.toggle("notVisible"); 

        document.getElementById("barreNoire").style.display = "flex"; 
        modifier.addEventListener("click", openModal);   
        modifier2.addEventListener("click", openModal);    
    }    
    // Fermeture modale
  document.getElementById("x").addEventListener("click", () => {      
    document.getElementById("modale").style.display = "none"; 
  });
  window.addEventListener('click', outsideClick);      
};

function outsideClick(e){
  if(e.target == modale){
    modale.style.display = 'none';
  }
}

const openModal = () =>{  
 document.getElementById("barreNoire").style.display = "flex";
 document.getElementById("modale").style.display = "flex";
}

