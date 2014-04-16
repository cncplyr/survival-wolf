// Game object
function SurvivalGame(blockSize, mapSize) {
	this.blockSize = blockSize;
	this.mapSize = mapSize;
	this.map = makeSquareArray(this.mapSize);
	
	this.currentTurn = 0; // Default value
	this.maxTurn = 500; // Default value
}
SurvivalGame.prototype.newGame = function() {
	this.currentTurn = 0;
	this.map = makeSquareArray(this.mapSize);
	// TODO: This should be elsewhere?
	$.each(animalsBaseCount, function(k, v){
		animalsBaseCount[k] = 0;
	});
}
SurvivalGame.prototype.populate = function(activeAnimalList, count) {
	// TODO: array?! What?! where does this come from?
	$.each(activeAnimalList, function(k, animalType){
		for(var animalCount = 0; animalCount < count; animalCount++){
			var x = Math.floor(Math.random() * array.length);
			var y = Math.floor(Math.random() * array.length);
			array[x][y] = new animalType;
			/*
			var x = Math.floor(Math.random() * this.mapSize);
			var y = Math.floor(Math.random() * this.mapSize);
			var foo = new animalType;
			console.log(this.map);
			this.map[x][y] = foo; // TODO: this.map is undefined...
			*/
		}
		
		// TODO: I don't think we should be making a new animal just to get it's name...
		// TODO: Can't access properties from method?
		var a = new animalType;
		animalsBaseCount[a.name()] += count;
	});
}
SurvivalGame.prototype.next = function() {
	// Clear the temp map used to find fights
	// TODO: Should this be moved to function SurvivalGame?
	var halfStepMap = {};

	// Go through all the animals
	for (var x = 0; x < this.mapSize; x++) {
		for (var y = 0; y < this.mapSize; y++) {
			if (this.map[x][y] != null) {
				// Get the animal's surroundings and ask for it's move
				var surroundings = getSurroundings(x,y);
				var animal = this.map[x][y];
				var move = animal.move(surroundings);
				
				// Move the animal
				switch (move) {
					case 'h':
						moveAnimal(halfStepMap, x, y, animal);
						break;
					case 'l':
						moveAnimal(halfStepMap, getSafeCoordinate(x-1), y, animal);
						break;
					case 'u':
						moveAnimal(halfStepMap, x, getSafeCoordinate(y-1), animal);
						break;
					case 'r':
						moveAnimal(halfStepMap, getSafeCoordinate(x+1), y, animal);
						break;
					case 'd':
						moveAnimal(halfStepMap, x, getSafeCoordinate(y+1), animal);
						break;
				}
				
				// Remove the animal from the old position
				// Animals that don't move shouldn't be removed
				if (move != 'h'){
					this.map[x][y] = null;
				}
			}
		}
	}
	
	// Resolve any fights that occur
	resolveAllFights(halfStepMap, this.map);
	
	this.currentTurn++;
	
	function moveAnimal(temporaryMap, x, y, animal) {
		if (temporaryMap[x] != undefined) {
			if (temporaryMap[x][y] != undefined) {
				// Animal already there!
				temporaryMap[x][y].push(animal);
			} else {
				// No animal in this grid square
				temporaryMap[x][y] = [animal];
			}
		} else {
			// No animal in this row!
			temporaryMap[x] = {};
			temporaryMap[x][y] = [animal]
		}
	}
	
	// Resolve fights on the map
	function resolveAllFights(temporaryMap, finalMap) {
		$.each(temporaryMap, function(x, columns){
			$.each(columns, function(y, animals){
				if (animals.length > 1) {
				// fight the animals!
					finalMap[x][y] = resolveFight(animals);
				} else {
				// only one animal
					finalMap[x][y] = animals[0]
				}
			});
		});
	}

	// Takes an array of animals, pseudo-randomly fights pairs of animals
	// until only one remains
	function resolveFight(animals) {	
		while(animals.length > 1){
			// Shuffle list of animals
			shuffle(animals);
			// Make the first two animals fight!
			var move0 = animals[0].fight(animals[1].name());
			var move1 = animals[1].fight(animals[0].name());
			var winner = playRockPaperScissorsSuicide(move0, move1);
			if (winner === -1) {
				// Both animals died, remove both from the list
				animals.splice(0, 2)
			} else {
				// Remove the loser
				animalsBaseCount[animals[winner].name()]--;
				animals.splice(winner, 1);
			}
		}
		return animals[0];
	}

	// Returns 0 if first move won, 1 if second move won. -1 for double suicide
	function playRockPaperScissorsSuicide(move0, move1){
		var winner = -1; // No winners!
		
		if (move0 === move1) {
			// A draw!
			if (move0 === 'x') {
				// Double Suicide! Return -1
			} else {
				// Return a random winner
				return Math.floor(Math.random()*2);
			}
		} else {
			// Suicides
			if (move0 === 'x') { return 1; }
			if (move1 === 'x') { return 0; }
		
			switch (move0 + move1) {
				case 'rp':
					winner = 1;
					break;
				case 'rs':
					winner = 0;
					break;
				case 'pr':
					winner = 0;
					break;
				case 'ps':
					winner = 1;
					break;
				case 'sr':
					winner = 1;
					break;
				case 'sp':
					winner = 0;
					break;
			}
		}
		
		return winner;
	}


	// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	function shuffle(array) {
		var currentIndex = array.length
			, temporaryValue
			, randomIndex
			;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
}	
SurvivalGame.prototype.isFinished = function() {
	return this.currentTurn >= this.maxTurn;
}
SurvivalGame.prototype.getProgress = function() {
	// Returns the percentage of the game that has completed as an int
	return Number((100 * (this.currentTurn / this.maxTurn)).toFixed());
}
