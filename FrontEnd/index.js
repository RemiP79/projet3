
/*[=================
instancier deux tableaux vides, faire une condition qui dit que si la categoryId 
n'est pas  include  dans un des deux tableau on le push et dans 
l'autre on push l'objet category.================

======> VOIR LIGNE 48*/


/* Gérer l'affichage de la page d'accueil */
/**
 * 
 * @param {object} elt affichage des informations issues du backend
 */
const createWorks = (elt)  => {                         // création d'une fonction
      // création de constantes
  let figure = document.createElement("figure");
  let img = document.createElement("img");
  let figcaption = document.createElement("figcaption");
  let gallery = document.getElementById("gallery");     // création d'un Id gallery dans index.html

      // définition des attributs et valeurs
  img.setAttribute("crossorigin","anonymous");          //Rajouté pour que chrome affiche les images
  img.setAttribute("src",elt.imageUrl);
  img.setAttribute("alt",elt.title);
  figcaption.textContent = elt.title;                   // préférable d'utiliser textContent à innerHTML pour des raisons de sécurité

      //modification de la page html
  figure.append(img,figcaption);      
  gallery.append(figure);
}
 


      //création d'une fonction getData qui est asynchrone
const getData = async() => {
  try {                                                                //définit une reponse catch si une instruction provoque une exception
    const respons = await fetch("http://localhost:5678/api/works/")  // l'utilisation de async : respons = attend le resultat du fetch
    /*console.log (respons);*/
   
    if (!respons.ok) {                                           // si le resultat du fetch ne fonctionne pas (ok = false dans la console) 
      throw new Error (`Erreur : ${respons.status}`);          // le programme s'arrête (throw) et crée un nouvel objet Error qui donne le status (200 = ok, 404...)
    }                                                            // utilisation des `(alt Gr+7) pour afficher le message d'erreur
  
    const data = await respons.json();                               // constante data qui attend et récupère la respons avant de se lancer
      //console.log (data);
      //console.log (typeof(data));                               // renvoie ici le type object
    let categoryIds = [];
    let categorys = [];
      
    for (let elem of data) {                                         // création de la boucle pour récupérer les elements de l'objet data nécessaire à l'affichage
      if (!categoryIds.includes(elem.categoryId)) {
        categoryIds.push(elem.categoryId);
        categorys.push(elem.category);
          //console.log(categoryIds);
          //console.log(categorys);
        }
      createWorks(elem);
    }
  }    
  catch (error) {
    alert (error);
  }    
}

getData();                                                             //On appelle la fonction getData pour qu'elle s'exécute


    



/*[==============FONCTION PARTIE FILTRE QUI FONCTIONNE=========================
      
      const filtreParId = (elt) => {
          if (elt.categoryId == 1){
          return true;
        }else{
          return false;
        }
      }

      let set2 = data.filter(filtreParId);
      console.log(set2);
      for (let elem of set2) {
        createWorks(elem);
      }

    //========================================*/

    /*[=============ESSAI DE FONCTION PARTIE FILTRE A TESTER =======

    function filtreParId(elt,numCat) {
      if (elt.categoryId == numCat){
      return true;
    }else{
      return false;
    }
  }

  let set2 = data.filter(filtreParId(categoryIds,1));
  console.log(set2);
  /*for (let elem of set2) {
    createWorks(elem);
  }*/

//==================FIN DE FONCTION PARTIE FILTRE A TESTER =====]*/


  //[ ========================= partie filtre ===========
    let gallery = document.getElementById("gallery");
    let portfolio = document.getElementById("portfolio");
    let sectionfiltre = document.createElement("span");
    sectionfiltre.setAttribute("id","sectionFiltres");
    
    let boutonTous = document.createElement("input");    
      boutonTous.setAttribute("type","button");
      boutonTous.setAttribute("value","  Tous  ");
      boutonTous.setAttribute("class","boutonFiltre");
      boutonTous.setAttribute("id","boutonTous");

    let boutonObjet = document.createElement("input");
      boutonObjet.setAttribute("type","button");
      boutonObjet.setAttribute("value","  Objet  ");
      boutonObjet.setAttribute("class","boutonFiltre");
      boutonObjet.setAttribute("id","boutonObjet");

    let boutonAppart = document.createElement("input");
      boutonAppart.setAttribute("type","button");
      boutonAppart.setAttribute("value","  Appartements  ");
      boutonAppart.setAttribute("class","boutonFiltre");
      boutonAppart.setAttribute("id","boutonAppartements");

    let boutonHotel = document.createElement("input");
      boutonHotel.setAttribute("type","button");
      boutonHotel.setAttribute("value","  Hotels & restaurants  ");
      boutonHotel.setAttribute("class","boutonFiltre");
      boutonHotel.setAttribute("id","boutonHotelsRestau");

sectionfiltre.append(boutonTous, boutonObjet, boutonAppart, boutonHotel);
portfolio.append(sectionfiltre);

portfolio.insertBefore(sectionfiltre,gallery);

//================Fin partie filtre ======= ]
 



















