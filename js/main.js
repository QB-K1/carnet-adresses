'use strict';   // Mode strict du JavaScript


// Fonction qui déclenche le bouton +
$(function() // expression qui fait qu'on attend que tout le DOM soit chargé avant de lancer instructions contenus dedans
{	
	// event listener pour click sur élément ayant id add-contact (bouton plus)
	$('#add-contact').on('click', onClickAddContact);

	// event listener pour click sur élément ayant id save-contact (bouton envoyer)
	$('#save-contact').on('click', onClickSaveContact);

	/*Affiche dans la section address-book le taleau*/
	refreshAddressBook();

	/*Charge tout le document avant de pouvoir écouter l'évènement et donc le clic sur les liens contenus dans la balise ayant l'id address-book et lancer la fonction show, qui est une fonction prédéfinir inverse de hide (rendre visible)*/
	$(document).on('click', '#address-book a', onClickShowContactDetails);
	
	/*Envoie fonction onClickEditContact quand click sur bouton éditer ( qui est le lien dans la balise qui a l'ID 'contact-details')*/
	$('#contact-details a').on('click', onClickEditContact);

	/*Envoie fonction onClickClearAddressBook quand click sur bouton effacer (qui a l'ID 'clear-address-book')*/
	$('#clear-address-book').on('click', onClickClearAddressBook);

	/*Envoie fonction onClickDeleteContact quand click sur bouton supprimer ce contact (qui est le span dans la balise qui a l'ID 'contact-details')*/
	$('#contact-details span').on('click', onClickDeleteContact);
});// fin de l'expression qui fait qu'on attend que tout le DOM soit chargé avant de lancer instructions contenus dedans
