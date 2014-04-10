// Animal: LazyWolf
function LazyWolf() {
	Animal.call(this);
	this.last = 0;
	this.attacks = ['r', 'p', 's', 'x'];
};
LazyWolf.prototype = new Animal();
LazyWolf.prototype.constructor = LazyWolf;
LazyWolf.prototype.name = function() {
	return 'w';
}
LazyWolf.prototype.fight = function(opponent) {
	switch (opponent) {
		case 'b':
		case 'l':
			return 's';
		case 's':
			return 'r'; // faker!
		default:
			return this.attacks[last++%3];
	}
}
LazyWolf.prototype.move = function(surroundings) {
	if (surroundings[0][1] == 'l')
		return 'l';
	if (surroundings[1][0] == 'l')
		return 'u';
	return 'h';
}

// Animal: EmoWolf
function EmoWolf() {
	Animal.call(this);
};
EmoWolf.prototype = new Animal();
EmoWolf.prototype.constructor = EmoWolf;
EmoWolf.prototype.name = function() {
	return 'w';
}
EmoWolf.prototype.fight = function(opponent) {
	return 'x';
}
EmoWolf.prototype.move = function(surroundings) {
	return 'h';
}

// Animal SheepWolf
function SheepWolf() {
	Animal.call(this);
	this.animalWeights = 
		{
			'w': -3,
			's': -1,
			' ': 0,
			'h': 1,
			'l': -2,
			'b': -1
		}
};
SheepWolf.prototype = new Animal();
SheepWolf.prototype.constructor = SheepWolf;
SheepWolf.prototype.name = function() {
	return 'w';
}
SheepWolf.prototype.fight = function(opponent) {
	switch(opponent){
		case 'b':
			return 's';
		case 'l':
			return 's';
		case 's':
			return 'p';
		default:
			return 'p';
	}
}
SheepWolf.prototype.move = function(surroundings) {
	var xWeight = 0;
	var yWeight = 0;
	
	// Northwest
	xWeight += this.animalWeights.get(surroundings[0][0]);
	yWeight += this.animalWeights.get(surroundings[0][0]);
	
	// North
	yWeight += this.animalWeights.get(surroundings[0][1]);
	
	// Northeast
	xWeight += this.animalWeights.get(surroundings[0][2]);
	yWeight += this.animalWeights.get(surroundings[0][2]);
	
	// West
	xWeight += this.animalWeights.get(surroundings[1][0]);
	
	// East
	xWeight += this.animalWeights.get(surroundings[1][2]);
	
	// Southwest
	xWeight += this.animalWeights.get(surroundings[2][0]);
	yWeight += this.animalWeights.get(surroundings[2][0]);
	
	// South
	yWeight += this.animalWeights.get(surroundings[2][1]);
	
	// South
	xWeight += this.animalWeights.get(surroundings[2][2]);
	yWeight += this.animalWeights.get(surroundings[2][2]);

	if (Math.abs(xWeight) < Math.abs(yWeight)) {
		if (yWeight > 0) {
			return 'u';
		} else {
			return 'd';
		}
	} else if (Math.abs(yWeight) < Math.abs(xWeight)) {
		if (xWeight > 0) {
			return 'r';
		} else {
			return 'l';
		}
	}
	
	// Sit still if no-one's around
	return 'h';
}