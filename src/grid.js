import Utils from "./Utils"

class Grid {
	// ini a grid with specified size
	constructor(size, emptyCells = size * size) {
		this.size = size;
		this.gridContainers = this.emptyGrid(size);
		this.emptyCells = emptyCells;
	}

	randomAvailPos() {
		if(this._countEmptyCells() > 0){
			while(true) {
				let randomX = Utils.genRanInt(0, this.size-1), randomY = Utils.genRanInt(0, this.size-1);
				if(this.getCellValue(randomX, randomY) === 0) {
					return {
						x: randomX,
						y: randomY
					};
				}
			}
		}
	}

	isFull() {
		if(this.emptyCells > 0) return false;
		return true;
	}

	getCellValue(x,y) {
		return this.gridContainers[x][y];
	}

	clearCell(x, y) {
		this.gridContainers[x][y] = 0;
		this._countEmptyCells();
	}

	fillCell(x, y, val = 1) {
		this.gridContainers[x][y] = val;
		this._countEmptyCells();
	}

	emptyGrid(size) {
		let grid = []; 
		for(let i = 0; i < size; i ++) {
			let col = [];
			for(let j = 0; j < size; j ++) {
				col.push(0); 
			}
			grid.push(col);
		}
		this.emptyCells = size * size;
		return grid;
	}

	_countEmptyCells() {
		let count = 0;
		this.gridContainers.forEach((row) => {
			row.forEach((cell) => {
				if(cell === 0) count++;
			})
		})
		return this.emptyCells = count;
	}

}

export default Grid