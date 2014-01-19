



// This is the object for the gameplay...
//	You'll need this for the current game session. Each session is
//	limited to 2 minutes only. User credentials are either stored in
//	session/phone storage or at Facebook

var _gamePlay = {

	isPlaying: false,
	score:     0,
	myGuess:   [],

	playerStats: {
		allowableClicks:3
	},

	startPlaying: function(){ this.isPlaying = true;  },
	stopPlaying : function(){ this.isPlaying = false; },

	addToMyGuess: function(){
		
	},


	//TODO: This is the temporary action... Final action is on button click...
	startGame: function(){

	},


	// 	Randomly getting a character from the you know :)
	// 	  Returns the index of the random character... 
	//	   say: just a random number generator... LOL
	getRandomCharacter: function(){
		var characterListSize = _characters.length;

		return Math.floor( Math.random()*characterListSize );
	},

	// Appending and removing to my guess
	addToGuess: function(guess){
		this.myGuess.push(guess);
	},
	removeFromGuess: function(guess){
		var index = this.myGuess.indexOf(guess);
		this.myGuess.splice(index, 1);
	},
	// Updating the guess... LOL
	updateMyGuess: function(guess){
		if (this.myGuess.indexOf(guess) == -1){
			this.addToGuess(guess);
			if (this.myGuess.length == this.playerStats.allowableClicks){

				var submit = this.myGuess.map(function(item){
					return parseInt(item, 10);
				});

				this.myGuess = submit;
				return true;

			} else { return false; }

		} else { this.removeFromGuess(guess); return false; }
	},

	// Do the submission of guess
	// 	This also handles the recurring action of the game...



	// Game Timer Structure
	gameTimer: {

		time: 121, timer: null,
		start: function(){
			// Manually starting the timer...
			this.timer = setInterval(function(){
				_gamePlay.gameTimer.tiktok()
			}, 1000);
		},
		stop: function(){
			// Manually stopping the timer...
			if (this.timer != null){
				clearInterval(this.timer);
				this.timer = null;
			}	
		},
		tiktok: function(){
			this.time--;

			console.log("Time remaining: "+this.showInFormat(this.time)+" seconds");
			if (this.time == 0){
				this.stop();
			}
		},
		showInFormat: function(seconds){
			var result = Math.floor(seconds/60) + ":";
			if (seconds % 60 == 0){ result += "0"; }

			return result + (seconds%60) + "";
		}

	}

}

// This is the player object. This holds all the attributes for the player
// 	This includes the level of the player, the experience level and the
//	other notions such as how many clicks to be allowed
//	Note: The data is usually stored in phone storage on in the database. LOL

var __player = {

	_data: {
		// Will bring the defaults for the player...
		name: "Player Name", score: 0, fbToken: null
	},

	getPlayerName: function(){ return __player._data.name; }


}



// This is the board object. This holds all the
// 	data for the game board and the events for
//	switching the contents

var _board = {

	jqueryBoardObj: null, // Assign this to jQuery handler
	board: [0, 0, 0, 0, 
			0, 0, 0, 0, 
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0],

	// Printing the board la...
	// To be used on console.log...
	printBoard: function(){
		var str = "";
		for(var i=0; i <this.boardSize(); i++){
			str += this.board[i];

			if ((i+1)%4 == 0 && i != 0){
				str += "\n";
			}
		} console.log(str);
	},


	// This returns the board Size
	boardSize: function(){ return this.board.length; },
	
	// Assigns an item to the board.
	// 	@index: The index of the assigned item in the board.
	//	@assign: The item to be assigned

	assignToBoard: function(index, assign){
		this.board[index] = assign;

		//console.log("assignToBoard: "+this.contents);
	},

	// Cleans the board to its original value. Like an zero matrix ;)
	cleanBoard: function(){
		for (var i=0; i< this.boardSize(); i++){
			this.assignToBoard(i, 0);
		}
	},

	// This shuffles the board, in which puts the character inside and then
	// 	the other characters. Values placed are integers, in which is the index
	//  of a character in the _characters.
	//		@find: The integer of the character to be find by the player. 


	shuffleBoard: function(find){
		// Place the find randomly in the board on N places. 
		// N depends on the level and the maturity of the game.
		var places = []; var N = 3; // for now ;)

		var place = 0; this.cleanBoard();
		for (var p=0; p<N; p++){

			do {
				var size = this.boardSize();
				place = Math.floor( Math.random()*size );
			} while( places.indexOf(place) != -1);

			console.log("Has new place! At "+place);
			this.assignToBoard(place, find);
			places[p] = place;
		}

		// Then put the other types of the characters, ignoring the spot
		//	where find has been spotted on and "find" itself.

		// TODO: for now, "A" lang sa... ;)
		for (var n=0; n<this.boardSize(); n++){
			if (places.indexOf(n) == -1){
				this.assignToBoard(n, 2);
			}
		}

		// For console purposes...
		this.printBoard();
		return this.board;
	},

	// Checks the guess if it is correct... The guess is inside an array of
	//	integers. Returns a boolean object.
	//		@guess: The array which contains the guesses. Values are the index of the grid.
	//					Also, the size of @guess determines how many tries a player have done
	//					in which is dynamic.
	//		@obj:   The object in which i will find inside the grid.

	checkIfGuessCorrect: function(guess, obj){
		var result = true, board = this.board;

		var sortedGuesses = guess.sort(), currentIndex;
		while(result && guess.length > 0){
			currentIndex = guess.pop();
			if (board[currentIndex] != obj){
				result = false;
			}
		}

		return result;
	}

}


// Character data is in here. You may call them using the 
//	index of the objects... The character data is as follows:
// 		{ name:<name_of_character>, value:<value_of_score>, img:<img_location> }

var _characters = [
	
	{ name:"NONE", value:0, img:"path_to_image/here" },
	{ name:"Cheekee", value:10, img:"path_to_image/here" },
	{ name:"Chaakee", value:12, img:"path_to_image/here" },
	{ name:"Chuukee", value:12, img:"path_to_image/here" }

];

// Player data is in here... Just chuchu it..

var _player = {

	level:1

}




// This is the instantiator of the KineticJS. This handles everything right on
//	on the animation track and the whole game frontend framework and some of the 
// 	game backend
// Pre-requisites: Kinetic.JS

var _app = {

	// Application Attributes


	app: new Kinetic.Stage({
	    container: 'gameContainer',
	    width: 320, // for now, fixed w/h lang sa
	    height: 480
	}),


	// Screens is an array of KineticJS Layers :)
	screens: [
		new Kinetic.Layer({ id:"LOADING_SCREEN" }),
		new Kinetic.Layer({ id:"MAIN_SCREEN" })
	],


	// Application Initiator. Call this on start of the application.
	__init__: function(){
		// Call all initiators of pages...
		_gameScreen.initAttach_ClickableGrid();




		this.app.add(_gameScreen._screen);

	},

	// Methods...
	appWidth:  function(){ return this.app.width();  },
	appHeight: function(){ return this.app.height(); }



}



// This is the game screen. This holds the gameGrid layer, in which is the
//	playable layer ;)

var _gameScreen = {

	_screen: new Kinetic.Layer({ id:"GAME_SCREEN" }),	 


	// This is the gameGrid. We can play in here...]
	// 	There are two types of grid that will generate here
	//		1. GridClickable: This is the outer layer of the grid. This is where we can click/touch
	//				the grid elements to execute the backend.
	//		2. GridDrawable:  This is the third layer of the grid. This is where the characters are drawn
	//				and are animated. Their actions are based on the events done by GridClickable.
	gameGrid: {
		layer: new Kinetic.Group(),

		gridSlotOffset:{ left:0.1, right:0.1, top:0.1, bottom:0.1 },
		gridSlotAttr:  { x:0, y:0, width:60, height:60, id:null, fill:'green', stroke:'black', strokeWidth:1 },
		gridSize:      { h:3, v:4 },



		// You can only call this function everytime you click "Start Game"
		initializeGridClickable: function(){
			var group = new Kinetic.Group();

			this.gridSlotAttr.x = 20; this.gridSlotAttr.y = 20; var gridSlot, i=0;
			for(var vertical = 0; vertical < this.gridSize.v; vertical++){

				for(var horiz = 0; horiz < this.gridSize.h; horiz++){
					this.gridSlotAttr.id = "GAME_SLOT_"+i;
					gridSlot = new Kinetic.Rect(this.gridSlotAttr);
					
					// Map the touch and click events to this slot
					gridSlot.on('mouseup', function(){
						console.log(this.id());
					}).on('mouseover', function(){
						this.fill = "blue";
					});


					group.add(gridSlot); i++;
					this.gridSlotAttr.x += this.gridSlotAttr.width;
				}

				this.gridSlotAttr.y += this.gridSlotAttr.height;
				this.gridSlotAttr.x = 20;
			} 

			this.layer = group;
		}
	},



	// Attaching the gameGrids to parent screen...
	initAttach_ClickableGrid: function(){
		this.gameGrid.initializeGridClickable();
		this._screen.add( this.gameGrid.layer  );
	}
}



// Start! :)
_app.__init__();

// Input the Apache Cordova actions right here..









