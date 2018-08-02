import React, {Component} from "react";
import ReactDOM from "react-dom";
import Grid from "./grid_component"
import GridModel from "./grid_model"
import Utils from "./Utils"

var main = main || {};

main.gridModel = new GridModel();

main.randomIni = function() {
	let randomCount = Utils.genRanInt(1,2); // generate 1 or 2 
	let generatedCount = 0;
	let randomX = Utils.genRanInt(0,3);
	let randomY = Utils.genRanInt(0,3);
	while(generatedCount < randomCount && main.gridModel.grids[randomX][randomY] <= 0) {
		if(main.gridModel.grids[randomX][randomY] <= 0) {
			let val = Utils.genDisRanIntWithin([2,4])
			main.gridModel.grids[randomX][randomY] = val;
			generatedCount++;
		}
		randomX = Utils.genRanInt(0,3);
		randomY = Utils.genRanInt(0,3);		
	}
}



// console.log(grids)
window.onkeydown = function(event) {
	let key = event.key 
	switch(key) {
		case ("ArrowUp"): 
			console.log('up')
			main.randomIni()
			break

		case ("ArrowDown"): 
			console.log('down')		
			break

		case ("ArrowLeft"): 
			console.log('left')		
			break

		case ("ArrowRight"): 
			console.log('right')		
			break

		default: return;
	}
}


main.randomIni()
ReactDOM.render(<Grid grids = {main.gridModel.grids}/>, document.getElementById("root"));

