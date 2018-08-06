import Utils from "./Utils"
import Grid from "./grid"

const DIRECTIONS = {
	UP: {x:0 , y:1},
	DOWN: {x:0, y:-1}, 
	LEFT: {x:-1, y:0},
	RIGHT: {x:1, y:0}
}

export {DIRECTIONS}

class GridModel {
	constructor(size) {
		this.size = size;
		this.grid = new Grid(size);
		this.onChanges = [];
	}

	// inform subscribers to re-render the dom when the model is changed 
	_inform() {
		this.onChanges.forEach((cb) => cb());
	}

	_countEmptyCells() {

	}

	// this is to build a 2d matrix for traversal 
	// in this way could combin the 4 direction into 1 function
	_buildTraversal(direction) {
		let rows = [], cols = [];
		for(var i = 0; i < this.size; i ++) {
			rows[i] = i;
			cols[i] = i;
		} 
		if(direction === DIRECTIONS.DOWN)
			rows = rows.reverse();
		if(direction === DIRECTIONS.RIGHT)
			cols = cols.reverse();

		// consider x as horizontal, y as vertical 
		return {
			rows: rows,
			cols: cols
		}
	}

	_incrementByDirection(row, col, direction) {
		if(direction === DIRECTIONS.UP)
			row -= 1;
		if(direction === DIRECTIONS.DOWN)
			row += 1;
		if(direction === DIRECTIONS.LEFT)
			col -= 1; 
		if(direction === DIRECTIONS.RIGHT) 
			col += 1;
		return {row:row, col:col};
	}

	_isWithinGrid(row, col) {
		if(row < this.size && col < this.size && row >= 0 && col >= 0) 
			return true;
		return false;
	}

	_findNextCell(row, col, direction) {
		let cell = this.grid.getCellValue(row, col); 
		let pos = this._incrementByDirection(row, col, direction);
		let pre = {row: row, col: col};
		while(this._isWithinGrid(pos.row, pos.col)) {
			cell = this.grid.getCellValue(pos.row, pos.col)
			if(cell !== 0) {
				console.log("The next cell is");
				console.log(cell);
				cell.pre = {row: pre.row, col: pre.col};
				return cell;
			}
			pre = {row: pos.row, col: pos.col}
			pos = this._incrementByDirection(pos.row, pos.col, direction);
		}
		console.log("The next cell is");
		console.log("row col " + pre.row + " " + pre.col);
		return {row: pre.row, col: pre.col, val: 0, pre: null};
	}

	move(direction) {
		let traversal = this._buildTraversal(direction);
		//traverse the matrix 
		traversal.rows.forEach((row) => {
			traversal.cols.forEach((col) => {
				if(this.grid.getCellValue(row, col) !== 0){
					let nextCell = this._findNextCell(row, col, direction);
					if(nextCell.val === 0) 
						this.moveFromTo(row, col, nextCell.row, nextCell.col)
					else if(nextCell.val !== this.grid.getCellValue(row, col).val)
						this.moveFromTo(row, col, nextCell.pre.row, nextCell.pre.col);
					else 
						this.merge(row, col, nextCell.x, nextCell.y);
				}
			})
		})

		// re-render
		this._inform();
		if(!this.grid.isFull()){
			this.randomIni();
			this._inform();
		}else {
			console.log('the game should be ended')
		}
	}	

	merge(x1, y1, x2, y2) {
		console.log('try to merge ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2);

		let targetCell = this.grid.getCellValue(x2, y2).updateValue(this.grid.getCellValue(x2, y2).val * 2);
		this.grid.clearCell(x1, y1);
	}

	// move the tile from {x1, y1} to {x2, y2}
	// x2, y2 is empty
	moveFromTo(x1, y1, x2, y2) {
		let currentCell = this.grid.getCellValue(x1, y1);
		console.log(currentCell);
		this.grid.clearCell(x1, y1);
		currentCell.updatePos(x2, y2);
		this.grid.fillCell(x2, y2, currentCell);
	}

	subscribe(fn) {
		this.onChanges.push(fn);
	}

	randomIni(val = 1) {
		let pos = this.grid.randomAvailPos();
		if(pos) {
			this.insertGridItem(pos);
		}

	}

	// @para {x, y} pos
	insertGridItem(pos) {
		console.log(pos);
		let randomValue = Math.random() < 0.9? 2: 4;
		let gridItem = new GridItem(pos.x, pos.y, randomValue);
		this.grid.fillCell(pos.x, pos.y, gridItem);
		this._inform();
	}

}

class GridItem {
	constructor(x, y, val = 0){
		this.x = x;
		this.y = y;
		this.val = val; 

		// needs to animation remov class? 
		this.previousX = null;
		this.previousY = null; 
	}

	getPos() {
		return {x:this.x, y:this.y};
	}

	updateValue(val, x, y) {
		this.val = val;
		if(x && y) 
			this.updatePos(x, y);
	}

	updatePos(x, y) {
		this.x = x;
		this.y = y;
	}

	// return the className for current position
	getClassName() {

	}
} 

export default GridModel