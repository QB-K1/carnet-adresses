'use strict';   // Mode strict du JavaScript

// var string = window.localStorage.getItem('name'); => récupère depuis le localStorage

// window.localStorage.setItem('name', string); => stock dans le localStorage


// enregistrer en local storage en convertissant tableau en string
function saveDataToDomStorage(key, value) {

	var jsonValue;

    // va stocker dans variable jsonData les données data en les transformant en string
   	jsonValue = JSON.stringify(value);
     
    // va pusher jsonData dans le local storage maintenant qu'est une string, en l'associant à la clé name
    window.localStorage.setItem(key, jsonValue);
}


// récupérer depuis local storage en convertissant string en tableau
function loadDataFromDomStorage(key)
{
    var jsonValue;

    // va enregistrer dans jsonData les éléments correspondant à paramètre du localStorage passé (la clé)
    jsonValue = window.localStorage.getItem(key);
    
    //renvoie ces éléments sous forme de tableau (inverse de stringify)
    return JSON.parse(jsonValue);
}