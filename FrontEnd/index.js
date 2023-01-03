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
    console.log (respons);
   
    if (!respons.ok) {                                           // si le resultat du fetch ne fonctionne pas (ok = false dans la console) 
      throw new Error (`Erreur : ${respons.status}`);          // le programme s'arrête (throw) et crée un nouvel objet Error qui donne le status (200 = ok, 404...)
    }                                                            // utilisation des `(alt Gr+7) pour afficher le message d'erreur

    const data = await respons.json();                               // constante data qui attend la repons avant de se lancer
      console.log (data);
      console.log (typeof(data));                                  // renvoie ici le type object
      for (let elem of data) {                                         // création de la boucle pour récupérer les elements de l'objet data nécessaire à l'affichage
        createWorks(elem);
      }
  }
    
  catch (error) {
    alert (error);
  }    
}

getData();                                                             //On appelle la fonction getData pour qu'elle s'exécute


    

    
