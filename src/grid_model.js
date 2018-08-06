import Utils from "./Utils"

const DIRECTIONS = {
	UP: "up",
	DOWN: "down", 
	LEFT: "left",
	RIGHT: "right", 
	ALL_DIRECTIONS: "all"
}

class GridModel {
	var 
	constructor() {
		this.grids = [[],[],[],[]]
		for(var i =0; i < this.grids.length; i++) {
			for(var j = 0; j < 4; j++) 
				this.grids[i][j] = 0;
		}
		this.onChanges = [];
		this.emptyCells = 16;
	}

	// requires to re-render the dom when the model is changed 
	_inform() {
		this.onChanges.forEach((cb) => cb());
	}

	_countEmptyCells() {
		let count = 0;
		for(var i = 0; i < this.grids.length; i++) {
			for (var j = 0; j < this.grids[0].length; j++ ) {
				if( !(typeof this.grids[i][j] == 'number' ) || this.grids[i][j] <= 0)
					count++
			}
		}
		this.emptyCells = count;
	}

	_isEmpty(x,y) {
		return !((typeof this.grids[x][y]) == 'number') || this.grids[x][y] == 0 
	}

	couldMove(direction) {
		let grids = this.grids;
		for(var row = 0; row < grids.length; row ++) {
			for(var col = 0; col < grids[0].length; col ++) {
				if(grids[row][col] > 0){
					if(direction == DIRECTIONS.UP && row > 0){
						if(grids[row-1][col] == 0 || grids[row-1][col] == grids[row][col])
							return true;
					}else if(direction == DIRECTIONS.DOWN && row < grids.length - 1) {
						if(grids[row+1][col] == 0 || grids[row+1][col] == grids[row][col])
							return true;
					}else if(direction == DIRECTIONS.LEFT && col > 0) {
						if(grids[row][col-1] == 0 || grids[row][col-1] == grids[row][col])
							return true;
					}else if(direction == DIRECTIONS.RIGHT && col < grids.length - 1) {
						if(grids[row][col+1] == 0 || grids[row][col+1] == grids[row][col])
							return true;
					}
				}
			}
		}
		return false;
	}	

	moveUp() {
		if(this.couldMove(DIRECTIONS.UP)){
			for(var row = 1; row < this.grids.length; row ++) {
				for(var col = 0; col <this.grids[0].length; col ++) {
					if(!this._isEmpty(row,col)){ 						// check if current target is empty
						let rowCurrent = row 
						while(rowCurrent > 0) {
							if(!this._isEmpty(rowCurrent-1, col)){
								if(this.grids[rowCurrent-1][col] === this.grids[rowCurrent][col]){
									this.grids[rowCurrent-1][col] *= 2;
									this.grids[rowCurrent][col] = 0;
								}
								break; // stay here or combine with upper row
							}else {
								// if upperrow is empty, move 1 cell up
								this.grids[rowCurrent-1][col] = this.grids[rowCurrent][col];
								this.grids[rowCurrent][col] = 0;
							}
							rowCurrent--;
						}
					}
				}
			}
			console.log(this.grids);
			let iniCells = this.randomIni(1);
			this._inform();
			this._countEmptyCells();		
			return iniCells;	
		}

	}

	moveDown() {
		if(this.couldMove(DIRECTIONS.DOWN)){
			for(var row = this.grids.length-2; row >= 0; row --) {
				for(var col = 0; col <this.grids[0].length; col ++) {
					if(!this._isEmpty(row,col)){ 						// check if current target is empty
						let rowCurrent = row 
						while(rowCurrent < this.grids.length-1) {
							if(!this._isEmpty(rowCurrent+1, col)){
								if(this.grids[rowCurrent+1][col] === this.grids[rowCurrent][col]){
									this.grids[rowCurrent+1][col] *= 2;
									this.grids[rowCurrent][col] = 0;
								}
								break; // stay here or combine with upper row
							}else {
								// if upperrow is empty, move 1 cell up
								this.grids[rowCurrent+1][col] = this.grids[rowCurrent][col];
								this.grids[rowCurrent][col] = 0;
							}
							rowCurrent++;
						}
					}
				}
			}
			console.log(this.grids)
			let iniCells = this.randomIni(1)
			this._inform();
			this._countEmptyCells();				
			return iniCells;
		}
	}

	moveLeft() {
		if(this.couldMove(DIRECTIONS.LEFT)){
			for(var col = 1; col < this.grids[0].length ; col ++) {
				for(var row = 0; row <this.grids.length; row ++) {
					if(!this._isEmpty(row, col)){ 						// check if current target is empty
						let colCurrent = col 
						while(colCurrent > 0) {
							if(!this._isEmpty(row, colCurrent-1)){
								if(this.grids[row][colCurrent-1] === this.grids[row][colCurrent]){
									this.grids[row][colCurrent-1] *= 2;
									this.grids[row][colCurrent] = 0;
								}
								break; // stay here or combine with upper row
							}else {
								// if upperrow is empty, move 1 cell up
								this.grids[row][colCurrent-1] = this.grids[row][colCurrent];
								this.grids[row][colCurrent] = 0;
							}
							colCurrent--;
						}
					}
				}
			}
			console.log(this.grids);
			let iniCells = this.randomIni(1);
			this._inform();
			this._countEmptyCells();	
			return iniCells;			
		}
	}

	moveRight() { //todo
		if(this.couldMove(DIRECTIONS.RIGHT)){
			for(var col = this.grids[0].length-2; col >= 0 ; col --) {
				for(var row = 0; row <this.grids.length; row ++) {
					if(!this._isEmpty(row, col)){ 						// check if current target is empty
						let colCurrent = col 
						while(colCurrent < this.grids[0].length-1) {
							if(!this._isEmpty(row, colCurrent+1)){
								if(this.grids[row][colCurrent+1] === this.grids[row][colCurrent]){
									this.grids[row][colCurrent+1] *= 2;
									this.grids[row][colCurrent] = 0;
								}
								break; // stay here or combine with upper row
							}else {
								// if upperrow is empty, move 1 cell up
								this.grids[row][colCurrent+1] = this.grids[row][colCurrent];
								this.grids[row][colCurrent] = 0;
							}
							colCurrent++;
						}
					}
				}
			}
			console.log(this.grids);
			let iniCell = this.randomIni(1);
			this._inform();
			this._countEmptyCells();	
			return iniCell;			
		}
	}


	subscribe(fn) {
		this.onChanges.push(fn);
	}

	randomIni(val=1) {
		let iniCell = []
		if(this.emptyCells > 0){
			let randomCount = val; // fix randomcount to 1 
			let generatedCount = 0;
			let randomX = Utils.genRanInt(0,3);
			let randomY = Utils.genRanInt(0,3);
			while(generatedCount < randomCount) { 
				if(this.grids[randomX][randomY] <= 0) {
					let val = Utils.genDisRanIntWithin([2,4])
					this.grids[randomX][randomY] = val;
					generatedCount++;
					iniCell.push(randomX * 4 + randomY);
				}
				randomX = Utils.genRanInt(0,3);
				randomY = Utils.genRanInt(0,3);		
			}
			this._countEmptyCells();
			this._inform();			
		}else 
			console.log('the game should be ended');
		return iniCell;
	}
}

export default GridModel