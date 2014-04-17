// This file has methods to make a 2d-array for the game

var mapSize;

// make an m-by-n 2d array
function makeArray(cols, rows) {
	var array = [];
	for(var i = 0; i < rows; i++){
		array[i] = [];
		array[i][rows-1] = null;
	}
	return array;
}

function makeSquareArray(size) {
	return makeArray(size, size);
}

function getSurroundings(x, y) {
	var surroundings = [[],[],[]];
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			var posX = getSafeCoordinate(x + i - 1);
			var posY = getSafeCoordinate(y + j - 1);	
			var location = surroundings[i][j] = game.map[posX][posY];
			if (location == null) {
				surroundings[i][j] == ' ';
			} else {
				surroundings[i][j] = location.name();
			}
		}
	}
	return surroundings;	
}

function getSafeCoordinate(coord) {
	if (coord < 0) return game.mapSize - 1;
	if (coord >= game.mapSize) return 0;
	return coord;
}

function Map(mapSize) {
	this.mapSize = mapSize;
	
	for (var i = 0; i < mapSize; i++) {
		this[i] = [];
	}
}
Map.prototype.getSurroundings = function(x, y){
	var suroundings = [[],[],[]];
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			var posX = getSafeCoordinate(x + i - 1);
			var posY = getSafeCoordinate(y + j - 1);	
			var location = surroundings[i][j] = game.map[posX][posY];
			if (location == null) {
				surroundings[i][j] == ' ';
			} else {
				surroundings[i][j] = location.name();
			}
		}
	}
	return surroundings;		
	
	function getSafeCoordinate(coord) {
		if (coord < 0) return game.mapSize - 1;
		if (coord >= game.mapSize) return 0;
		return coord;
	}
}