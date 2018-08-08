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
		this.gridItems = [];
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
	// return the next cell which is not empty or at the boundary
		let cell = this.grid.getCellValue(row, col); 
		let pos = this._incrementByDirection(row, col, direction);
		let pre = {row: row, col: col};
		while(this._isWithinGrid(pos.row, pos.col)) {
			cell = this.grid.getCellValue(pos.row, pos.col);
			if(cell !== 0) {
				console.log("The next cell is");
				console.log(cell);

				return {val: cell.val, row: pos.row, col: pos.col, preX: pre.row, preY: pre.col};
			}
			pre = {row: pos.row, col: pos.col}
			pos = this._incrementByDirection(pos.row, pos.col, direction);
		}
		console.log("The next cell is");
		console.log("row col " + pre.row + " " + pre.col);
		return {row: pre.row, col: pre.col, val: 0, preX: null, preY: null};
	}

	couldMove(direction) {
		let grids = this.grid.gridContainers;
		for(let row = 0; row < this.size; row ++){
			for(let col = 0; col < this.size; col ++){
				let current = grids[row][col].val;
				if(current > 0) {
					switch(direction) {
						case(DIRECTIONS.UP): 
							if(row > 0) {
								if(grids[row-1][col].val === current || grids[row-1][col] === 0)
									return true;
							} 
							break;
						case(DIRECTIONS.DOWN): 
							if(row < this.size-1) {
								if(grids[row+1][col].val === current || grids[row+1][col] === 0)
									return true;
							} 	
							break;				
						case(DIRECTIONS.LEFT):
							if(col > 0) {
								if(grids[row][col-1].val === current || grids[row][col-1] === 0)
									return true;
							} 	
							break;							
						case(DIRECTIONS.RIGHT):
							if(col < this.size-1) {
								if(grids[row][col+1].val === current || grids[row][col+1] === 0)
									return true;
							} 	
							break;												
					}					
				}
			}
		}
		return false;
	}

	move(direction) {
		if(this.couldMove(direction)){
			this._clearGridItems();
			let traversal = this._buildTraversal(direction);
			//traverse the matrix 
			traversal.rows.forEach((row) => {
				traversal.cols.forEach((col) => {
					if(this.grid.getCellValue(row, col) !== 0){
						let nextCell = this._findNextCell(row, col, direction);
						if(nextCell.val === 0) 
							this.moveFromTo(row, col, nextCell.row, nextCell.col)
						else if(nextCell.val !== this.grid.getCellValue(row, col).val)
							this.moveFromTo(row, col, nextCell.preX, nextCell.preY);
						else 
							this.merge(row, col, nextCell.row, nextCell.col);
					}
				});
			});

			// re-render
			this._inform();
			if(!this.grid.isFull()){
				let pos = this.randomIni();
				this._inform();
				console.log('the returned ini pos ' + pos.x + " " + pos.y );
				return pos;
			}else {
				console.log('the game should be ended')
			}			
		}
	}	

	_clearGridItems() {
		this._clearPrePoses();
		this._clearDestroyableItems();
		this._clearMergedItems();
		this.grid.setNewGridsToOld();
	}

	_clearPrePoses() {
		let grids = this.grid.gridContainers;
		grids.forEach((row) => {
			row.forEach((item) => {
				if(typeof item == "object") {
					item.clearPrePos();
				}
			})
		})
	}

	_clearDestroyableItems() {
		this.gridItems = this.gridItems.filter((item) => {return !item.isDestroyable()});
	}

	_clearMergedItems() {
		this.gridItems.forEach((item) => {
			if(item.merged)
				item.setMerged(false);
		})
	}

	// merge the item from {x1,y1} to {x2, y2}
	merge(x1, y1, x2, y2) {
		console.log('try to merge ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2);
		// remove the cell from the grids
		let merge1 = this.grid.getCellValue(x1, y1);
		let merge2 = this.grid.getCellValue(x2, y2);
		merge1.updatePos(x1, y1, x2, y2);
		merge1.setDestroy(true);
		merge2.setDestroy(true);
		// initialize the merged 

		let targetCell = new GridItem(x2, y2, merge1.getValue()*2, false, true);
		// put into the render list
		this.gridItems.push(targetCell);

		this.grid.fillCell(x2, y2, targetCell);
		this.grid.clearCell(x1, y1);
		// todo should trigger the animation to destroy the cell.
	}

	// move the tile from {x1, y1} to {x2, y2}
	// x2, y2 is empty
	moveFromTo(x1, y1, x2, y2) {
		let currentCell = this.grid.getCellValue(x1, y1);
		this.grid.clearCell(x1, y1);
		currentCell.updatePos(x1, y1, x2, y2);
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
		return pos; 
	}

	// @para {x, y} pos
	insertGridItem(pos) {
		let randomValue = Math.random() < 0.9? 2: 4;
		let gridItem = new GridItem(pos.x, pos.y, randomValue);
		this.gridItems.push(gridItem);
		this.grid.fillCell(pos.x, pos.y, gridItem);
		this._inform();
	}

}

class GridItem {
	constructor(x, y, val = 0, newItem = true, merged = false, destroy = false, preX = null, preY = null){
		this.x = x;
		this.y = y;
		this.val = val; 
		this.new = newItem;
		this.merged = merged; 
		this.destroy = destroy;
		// needs to animation remov class? 
		this.preX = preX;
		this.preY = preY; 
		this.key = Utils.generateId();
	}

	isDestroyable() {
		return this.destroy;
	}

	setDestroy(val = true) {
		this.destroy = val;
	}

	updateNew(val = false) {
		this.new = val;
	}

	getPos() {
		return {x:this.x, y:this.y};
	}

	setMerged(val = false) {
		this.merged = val;
	}

	setMergedFrom(x, y) {
		this.merged = true;
		this.mergedX = x;
		this.mergedY = y;
	}

	clearMerge() {
		this.merged = false;
		this.mergedX = null;
		this.mergedY = null;
	}

	setPrePos(x, y) {
		this.preX = x;
		this.preY = y;
	}

	clearPrePos() {
		this.preX = null;
		this.preY = null;
	}

	getValue() {
		return this.val;
	}

	updateValue(val, x, y) {
		this.val = val;
		this.x = x;
		this.y = y;
	}

	updatePos(x1, y1, x2, y2) {
		this.x = x2;
		this.y = y2;
		if((typeof x1 === "number") && (typeof y1 === "number")) {
			this.setPrePos(x1, y1);		
		}
	}

	// return the className for current position
	getClassName() {

	}
} 

export default GridModel