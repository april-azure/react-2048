import Utils from "./Utils"

class GridModel {
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

	moveUp() {
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
		console.log(this.grids)
		this.randomIni()
		this._inform();
	}

	moveDown() {
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
		this.randomIni()
		this._inform();
	}

	moveLeft() {
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
		console.log(this.grids)
		this.randomIni()
		this._inform();
	}

	moveRight() { //todo
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
		console.log(this.grids)
		this.randomIni()
		this._inform();
	}


	subscribe(fn) {
		this.onChanges.push(fn);
	}

	randomIni() {
		if(this.emptyCells > 0){
			let randomCount = Utils.genRanInt(1,2); // generate 1 or 2 
			let generatedCount = 0;
			let randomX = Utils.genRanInt(0,3);
			let randomY = Utils.genRanInt(0,3);
			while(generatedCount < randomCount) { 
				if(this.grids[randomX][randomY] <= 0) {
					let val = Utils.genDisRanIntWithin([2,4])
					this.grids[randomX][randomY] = val;
					generatedCount++;
				}
				randomX = Utils.genRanInt(0,3);
				randomY = Utils.genRanInt(0,3);		
			}
			this._countEmptyCells();
			this._inform();			
		}else 
			console.log('the game should be ended');
	}
}

export default GridModel