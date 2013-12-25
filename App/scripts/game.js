

var _facebook = {


}


var _game = {
	
	// This checks if the player is playing or not.
	isPlaying: false,

	// Loads the resources and stuff.
	initGame: function(){

	},


}


/*
* This sets up the screen manipulation for the game.
* Requires jQuery and stuff.
*/
var _screen = {

	// These are the screen attributes...
	// screenID(s) start with the hashtag/s.
	screenID: null,
	modalScreen: null,

	// Initiator
	__init: function(){
		// Map attributes to jQuery objects...
		this.modalScreen = $('#modalscreen');

		// Hide the modal screen first...
		this.modalScreen.hide(0);
	},

	// Getter + Setter
	getScreenID: function(){ return screenID; },
	setScreenID: function(_screenID){
		this.screenID = _screenID;
	},

	showScreen: function(screenID){
		if (this.isScreenModal(screenID)){

		} else {

		}
	},

	isScreenModal: function(screenID){
		return (screenID == "#highscorescreen" || screenID == "#aboutscorescreen");
	},

	setInitScreen: function(){

	},

	showHighScoreScreen: function(){

	},

	showGameScreen: function(){

	},

	showAboutScoreScreen: function(){

	},

	showQuitScreen: function(){

	},

	// Modal Screen Manipulations...
	showModalScreen: function(){
		this.modalScreen.slideDown(250);
	},
	hideModalScreen: function(){
		this.modalScreen.slideUp(250);
	},
	writeModalScreenTitle: function(title){

	},
	writeModalScreenContent:function(content){

	}

}


$(function(){

	// Initialize screen functions
	_screen.__init();

	// If modal close button is clicked...
	$('#modalscreen-close').click(function(){
		_screen.hideModalScreen();
	});

	$('#main-menu-container a').click(function(){
		var targetID = $(this).attr('page-target');

		if (_screen.isScreenModal(targetID)){
			_screen.showModalScreen();
		}
	});


});