
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
  figure.setAttribute("id", `fig_${data.id}`);          //permettre la suppressiond de travaux
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
    autreBouton.setAttribute("id",elem.id)  
    autreBouton.addEventListener ("click", (e) => {
      clickBouton(e);
    });
  sectionFiltres.append(autreBouton);
  }


};

//=====================Vreation d'une fonction pour le click sur les boutons
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
      if (elem.classList.contains("notVisible")) {
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
    const data = await respons.json();                                 // constante data qui attend et récupère la respons avant de se lancer
    let categoryIds = [];                                              // création de tableaux qui vont nous permettre de gerer l'affichage selectif des travaux
    let categorys = [];
        
    for (let elem of data) {                                           // création de la boucle pour récupérer les elements de l'objet data nécessaire à l'affichage
      createWorks(elem);
      if (!categoryIds.includes(elem.categoryId)) {
        categoryIds.push(elem.categoryId);
        categorys.push(elem.category);
        }            
    }    
    createWorksByCat(categorys);     
  }    
  catch (error) {
    alert (error);
  }    
}
getData();                                                             //On appelle la fonction getData pour qu'elle s'exécute
