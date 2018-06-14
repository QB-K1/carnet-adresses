'use strict';   // Mode strict du JavaScript

/*fonction permettant d'ouvrir le formulaire en cliquant sur le + */
function onClickAddContact() {
	$('#contact-form').trigger('reset'); // supprime éléments qui seraient déjà dans le formulaire
  	$('#contact-form').data('mode', 'add').fadeIn('fast');//affiche l'élément qui correspond à l'id "contact-form" avec un effet de fondu (display:none display:block) en lui mettant un attribut data-mode='add'
};


/*Fonction qui permet de remplir h3 et le p en changeant les valeurs en cliquant sur le a*/
function show() {
	/*$(this) = celui-ci en particulier, .data() sur ce data en particulier*/
		// stocke dans i la valeur de l'attribut data-index de this (contact cliqué)
	var i = $(this).data('index');

	/*stock les données du localStorage dans la variable*/
	var addressBook = loadAddressBook();

	console.log(addressBook[i].firstName);
	/*Remplace, dans le h3 de l'Id contact-details, le texte par la valeur de firstName*/
	$("#contact-details h3").text(addressBook[i].firstName
		+ ' ' + addressBook[i].lastName);

	/*Remplace dans le p de l'Id contact-details le texte par la valeur de phone*/
	$("#contact-details p").text(addressBook[i].phone);
}


/*Fonction premettant d'ajouter les valeurs du contact dans le localStorage*/
function onClickSaveContact()
{	
	/*On crée un tableau pour pouvoir enregistrer plusieurs lignes dans Address Book, qui contiendront les infos de contact sous forme de tableau dans un tableau*/
	var addressBook = [];

	/*stock les valeurs entrées par l'utilisateur dans la variable contact via la fonction createContact()*/
	var contact = createContact(
					/*permet de récupérer les valeurs rentrées par l'utilisateur dans les champs du formulaire*/
                    $('select[name=title]').val(), 
                    $('input[name=lastName]').val(), 
                    $('input[name=firstName]').val(), 
                    $('input[name=phone]').val() 
                  );

	/*On écrase le dernier addressBook avec le tableau comportant les nouvelles données, évite d'écraser les contacts déjà existants : va stocker dans adressBook tout ce qui a été loadé*/
		/*rajoute pas un contact à tableau existant mais écrase ancien tableau par nouveau contenant contact en plus*/
	addressBook = loadAddressBook();


	// va rajouter la propriété data-index ayant pour valeur l'index dans la balise a suivant celle ayant un id contact-details. Lie l'index du tableau de contacts (donc le contact que l'on veut) avec le lien cliquable sur le nom du contact. Va sauvegarder le contact dans le local storage
		//stocke ça dans variable index
 	var index = $('#contact-details a').data('index');
   
   	// si l'attribut data-mode vaut 'add'
    if ($('#contact-form').data('mode') == 'add'){
   		/*Permet de pousser contact dans le tableau, transforme ses données en tableau contenu dans un index*/
   		addressBook.push(contact);
    } else {
   		// sinon va charger le contact dans l'index correspondant dans addressBook
   		addressBook[index] = contact;
    }

    /*stock les valeurs de contact dans la clée Adress Book*/
	saveAddressBook(addressBook);

	/*cache la partie ajouter contact au moment d'enregistrer*/
    $('#contact-form').fadeOut('slow');
    $('#contact-details').hide();
 
    /*Affiche dans la section adress-book*/
    refreshAddressBook();
}


// fonction pour afficher détails du contact quand clicke dessus
function onClickShowContactDetails()
{
	var addressBook; 
    var contact; // quel contact sélectionné
    var index; // pour matcher contact cliqué avec tableau chargé du local storage

    // stocke dans index la valeur de l'attribut data-index de this (contact cliqué)
	index = $(this).data('index');
	/*On écrase le dernier addressBook avec le tableau comportant les nouvelles données, évite d'écraser les contacts déjà existants : va stocker dans adressBook tout ce qui a été loadé*/
		/*rajoute pas un contact à tableau existant mais écrase ancien tableau par nouveau contenant contact en plus*/
    addressBook = loadAddressBook();
    // va charger le contact dans l'index correspondant dans addressBook
	contact = addressBook[index];
	// va rajouter en brut dans le HTML le contenu texte dans la balise h3 suivant celle ayant un id contact-details
	$('#contact-details h3').text(contact.title + ' ' + contact.firstName + ' ' + contact.lastName);
	// va rajouter en brut dans le HTML le contenu texte dans la balise p suivant celle ayant un id contact-details
    $('#contact-details p').text(contact.phone);
    // va rajouter la propriété data-index ayant pour valeur l'index dans la balise a suivant celle ayant un id contact-details. Lie l'index du tableau de contacts (donc le contact que l'on veut) avec le lien cliquable sur le nom du contact
    $('#contact-details a').data('index', index);
    // show fonction prédéfinie, inverse de hide, rends visible
	$('#contact-details').show();
}


// fonction pour éditer infos du contact
function onClickEditContact(){
	var addressBook;
    var contact; // quel contact sélectionné
    var index; // pour matcher contact cliqué avec tableau chargé du local storage
    
    // va rajouter la propriété data-index ayant pour valeur l'index dans la balise a suivant celle ayant un id contact-details. Lie l'index du tableau de contacts (donc le contact que l'on veut) avec le lien cliquable sur le nom du contact
		//stocke ça dans variable index
    index = $('#contact-details a').data('index');
    /*On écrase le dernier addressBook avec le tableau comportant les nouvelles données, évite d'écraser les contacts déjà existants : va stocker dans adressBook tout ce qui a été loadé*/
		/*rajoute pas un contact à tableau existant mais écrase ancien tableau par nouveau contenant contact en plus*/
    addressBook = loadAddressBook();
    // va charger le contact dans l'index correspondant dans addressBook
    contact     = addressBook[index];
    
    //va pré-remplir le champs ayant ID firstName avec la valeur de la propriété firstName de l'objet contact
    $('#firstName').val(contact.firstName);
    //va pré-remplir le champs ayant ID lastName avec la valeur de la propriété lastName de l'objet contact
    $('#lastName').val(contact.lastName);
    //va pré-remplir le champs ayant ID phone avec la valeur de la propriété phon de l'objet contact
    $('#phone').val(contact.phone);
    
    // switch pour title car 3 possibilités (value vaut chiffre de 1 à 3)
        // va pré-remplir le champs ayant ID title avec la valeur de la propriété title de l'objet contact
    switch(contact.title)
    {
        case 'Mme.':
        $('#title').val(1);
        break;

        case 'Mlle.':
        $('#title').val(2);
        break;

        case 'M.':
        $('#title').val(3);
        break;
    }
    
    /*affiche lentement avec un effet de fondu (display:none display:block) en lui mettant un attribut data-mode='edit'*/
    $('#contact-form').data('mode', 'edit').fadeIn('slow');

}


//fonction pour effacer le carnet d'addresse
function onClickClearAddressBook() {
    //définit variable locale addressBook comme un tableau vide
    var addressBook = new Array();
    
    //l'enregistre sur l'adressBook non local, écrasant son contenu actuel
    saveAddressBook(addressBook);

    // cache les détails du contact en cours s'ils sont affichés (a cliqué sur contact)
    $('#contact-details').hide();

    // relance la page pour faire disparaître les contacts
    refreshAddressBook();
}


//fonction pour effacer un seul contact
function onClickDeleteContact() {
    // va rajouter la propriété data-index ayant pour valeur l'index dans la balise a suivant celle ayant un id contact-details. Lie l'index du tableau de contacts (donc le contact que l'on veut) avec le lien cliquable sur le nom du contact
        //stocke ça dans variable index
    var index = $('#contact-details a').data('index');

    /*stock les données du localStorage dans la variable*/
    var addressBook = loadAddressBook();

    //fonction prédéfinie supprimant le premier élément de index (définit localement au-dessus) de addressBook(tableau des contacts). Car premier élément de index de adressbook est le tableau/objet contenant le contact
    addressBook.splice(index, 1);

    //l'enregistre sur l'adressBook non local, écrasant son contenu actuel
    saveAddressBook(addressBook);

    //cache les détails du contact
    $('#contact-details').hide();

    // relance la page pour faire disparaître le contact
    refreshAddressBook();

}