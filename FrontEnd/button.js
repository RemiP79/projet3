let boutonObjet = document.getElementById("boutonObjet");
        boutonObjet.addEventListener("click", clickBoutonObjet)
        function clickBoutonObjet() { 
fetch("http://localhost:5678/api/works")
    .then (data => data.json()) 
    .then (jsonListTravaux => {          
     for(let jsonTravaux of jsonListTravaux) {
        let travaux = new Travaux(jsonTravaux[[0]["categoryId=1"]]); /*Travaux correspond à la class créee dans le fichier js/travaux.js et je lui met un format json*/
        document.querySelector(".gallery").innerHTML +=       /* on demande l'affichage dans le fichier html*/
    `<figure>
        <img crossorigin="anonymous" src="${travaux.imageUrl}"  alt="${travaux.title}">
        <figcaption>${travaux.title}</figcaption>
    </figure>`
     }    
    }    
     );
     // console.log(jsonListTravaux); /* permet de vérifier si on a bien récupéré les travaux dans le backend (voir la console)*/
    
     /* On crée une boucle for of qui va parcourir le tableau et pour
    chaque case du tableau il va créer une variable jsonTravaux */    
     //for(let jsonTravaux of jsonListTravaux) {
     //   let travaux = new Travaux(jsonTravaux); /*Travaux correspond à la class créee dans le fichier js/travaux.js et je lui met un format json*/
     //   document.querySelector(".gallery").innerHTML +=       /* on demande l'affichage dans le fichier html*/
    //`<figure>
    //    <img crossorigin="anonymous" src="${travaux.imageUrl}"  alt="${travaux.title}">
    //    <figcaption>${travaux.title}</figcaption>
    //</figure>`

    
    //}
            


    //} )
}