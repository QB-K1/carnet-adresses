'use strict';   // Mode strict du JavaScript

// fonction pour créer fiche de contact, fonction qui va associer les marqueurs du contact avec les paramètre des différents bouton/input
function createContact(title, lastName, firstName, phone) {

	// créé objet qui va contenir carte du contact, creation d'une variable objet qui intègre les différents boutons comme marqueurs
	var contact = new Object ();

	// propriétés de l'objet correspondant à la fiche de contact, associer les marqueurs de l'objet aux paramètres de la fonction
	contact.title = title; 
		switch(title){ // switch pour title car 3 possibilités (value vaut chiffre de 1 à 3)
			case "1":
				contact.title = "Mme.";
			break;
			case "2":
				contact.title = "Mlle.";
			break;
			case "3":
				contact.title = "Mr.";
			break;
		}
	
	contact.firstName = firstName.toUpperCase();
	contact.lastName = lastName;
	contact.phone = phone;

	// renvoie l'objet contenant la fiche de contact, affecte les nouvelles valeurs
	return contact;
}


// fonction qui sauvegarde le contact dans emplacement correspondant à la clé Address Book dans le local storage
function saveAddressBook(value) {
	// Appelle fonction qui sauvegarde dans le localStorage les valeurs de contact
	saveDataToDomStorage("Address Book", value);
}


/*Récupère les infos du localStorage et stock dans une variable*/
function loadAddressBook() {
	var contact = loadDataFromDomStorage('Address Book');
	if(contact == null)
    {
     
        contact = new Array();
    }
	return contact;
}


/*fonction qui affiche dans la section address-book (vide dans le HTML)*/
function refreshAddressBook() {

	/*stock les infos du localStorage dans une variable locale*/
	var addressBook = loadAddressBook();

	/*Vide tout ce qui se trouve dans la section html comportant l'id address-book*/
		/*empty vide le contenu*/
	$('#address-book').empty();

	/*permet d'afficher ce qui à été stocké dans le localStorage*/
	console.log(addressBook);

	/*variable qui est une liste ordonnée, équivalent du document write, créant balise ouvrante et fermante autour de valeur de addressBooklist*/
	var addressBookList = $('<ul>');

	/*Boucle qui va parcourir les infos du localStorage qu'on a récupéré plus tôt sous forme de tableau de tableaux*/
	for (var i = 0; i < addressBook.length; i++) {

		/*variable qui contient les éléments title et firstName de la liste en cliquable*/
			/*a va en faire un lien cliquable, équivalent du document write, créant balise ouvrante et fermante autour*/
			/*attr pour mettre des attributs à la balise*/
			/*rajoute attribut data-index en lui donnant valeur i*/
			/*.text va rajouter texte contenu dans la balise*/
		/*tout ça stocké dans variable locale contact*/
		var contact = $('<a>').attr('href', '#').data('index', i).text(
        	addressBook[i].title + ' ' + addressBook[i].firstName);

		/*Ajoute une ligne de contact dans la liste addressBookList*/
			/*en local dans la fonction .append va rajouter nouvelle indentation au sein de addressBookList*/
			/*li va en faire une puce, équivalent du document write, créant balise ouvrante et fermante autour*/
			/*même logique en intégrant contact en incrust dedans*/
		addressBookList.append($('<li>').append(contact));

	};

	/*affiche dans la console la liste*/
	console.log(addressBookList);

	/*Incruste la liste addressBookList dans l'élément qui a l'id address-book HTML. Ecris en dur le contenu dans le HTML*/
	$('#address-book').append(addressBookList);
	
}
