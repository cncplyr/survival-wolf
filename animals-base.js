// This file contains the Animal interface and base animal implementations

var animalsBase = [Stone, Lion, Bear];
var animalsBaseCount = 
	{
		's': 0,
		'l': 0,
		'b': 0
	}

// Animal interface
function Animal() {}
Animal.prototype.name = function() {
	// Return the letter representing this animal
	return "z";
};
Animal.prototype.fight = function(opponent) {
	// r = rock, p = paper, s = scissors, x = suicide
	return "x";
};
Animal.prototype.move = function(surroundings) {
	// u = up, r = right, d = down, l = left, h = hold
	return "h";
}

// Animal: Stone
function Stone(){
	Animal.call(this);
};
Stone.prototype = new Animal();
Stone.prototype.constructor = Stone;
Stone.prototype.name = function() {
	return "s";
}
Stone.prototype.fight = function() {
	return "r";
}

// Animal: Lion
function Lion(){
	Animal.call(this);
	this.lastMove = "r";
};
Lion.prototype = new Animal();
Lion.prototype.constructor = Lion;
Lion.prototype.name = function() {
	return "l";
}
Lion.prototype.fight = function() {
	return Math.floor(Math.random() * 2) == 1 ? "p" : "s";
}
Lion.prototype.move = function() {
	if(this.lastMove == "d") {
		this.lastMove = "r";		
		return this.lastMove;
	} else {
		this.lastMove = "d";
		return this.lastMove;
	}
}

// Animal: Bear
function Bear() {
	Animal.call(this);
	this.lastMove = "l";
	this.lastMoveCount = 4;
}
Bear.prototype = new Animal();
Bear.prototype.construction = Bear;
Bear.prototype.name = function() {
	return "b";
}
Bear.prototype.fight = function() {
	return "p";
}
Bear.prototype.move = function() {
	if(this.lastMoveCount >= 4) {
		this.lastMoveCount = 0;
		switch (this.lastMove) {
			case "d" :
				this.lastMove = "r";
				break;
			case "r" :
				this.lastMove = "u";
				break;
			case "u" :
				this.lastMove = "l";
				break;
			case "l" :
				this.lastMove = "d";
				break;
		}
	}
	this.lastMoveCount++;
	return this.lastMove;
}