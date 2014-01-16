



// This is the object for the gameplay...
//	You'll need this for the current game session. Each session is
//	limited to 2 minutes only. User credentials are either stored in
//	session/phone storage or at Facebook

var _gamePlay = {

	isPlaying: false,
	score:     0,
	myGuess:   [],

	startPlaying: function(){ this.isPlaying = true;  },
	stopPlaying : function(){ this.isPlaying = false; },

	addToMyGuess: function(){
		
	},


	//TODO: This is the temporary action... Final action is on button click...
	startGame: function(){

	},

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





// This is the board object. This holds all the
// 	data for the game board and the events for
//	switching the contents

var _board = {

	board: [0, 0, 0, 0, 
			0, 0, 0, 0, 
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0],

	// Printing the board la...
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
	
	{ name:"Chuukee", value:10, img:"path_to_image/here" },
	{ name:"Cheekee", value:10, img:"path_to_image/here" },
	{ name:"Chaakee", value:12, img:"path_to_image/here" }


];

// Player data is in here... Just chuchu it..

var _player = {

	level:1


}