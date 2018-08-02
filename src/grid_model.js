class GridModel {
	constructor() {
		this.grids = [[],[],[],[]]
		for(var i =0; i < this.grids.length; i++) {
			for(var j = 0; j < 4; j++) 
				this.grids[i][j] = 0;
		}
	}
}

export default GridModel