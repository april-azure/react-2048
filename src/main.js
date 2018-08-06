import React, {Component} from "react";
import ReactDOM from "react-dom";
import GridComponent from "./grid_component";
import GridModel, {DIRECTIONS} from "./grid_model";
import Utils from "./Utils";
import style from "./main.css";

var main = (function(){
	var gridModel = new GridModel(4);
	var gameEnd = false; 
	
	(function ini() {
		gridModel.subscribe(render);
		render();
		gridModel.randomIni();
		gridModel.randomIni();
		window.onkeydown = function(event) {
			let key = event.key; 
			let iniCells;
			switch(key) {
				case ("ArrowUp"): 
					console.log('up');
					iniCells = gridModel.move(DIRECTIONS.UP);		
					cellAppear(iniCells);								
					break;

				case ("ArrowDown"): 
					console.log('down');
					iniCells = gridModel.move(DIRECTIONS.DOWN);
					cellAppear(iniCells);						
					break;

				case ("ArrowLeft"): 
					console.log('left');		
					iniCells = gridModel.move(DIRECTIONS.LEFT);		
					cellAppear(iniCells);										
					break;

				case ("ArrowRight"): 
					console.log('right');
					iniCells = gridModel.move(DIRECTIONS.RIGHT);
					cellAppear(iniCells);								
					break;

				
			}
		};		
	})();

	function cellAppear(pos) {
		if(pos){
			console.log("cell appear " + pos.x + " " + pos.y)
			let className = style[`grid_item_${pos.x}_${pos.y}`];
			let $element = document.getElementsByClassName(className)[0];
			if($element.classList.contains(style.appear))	
				$element.classList.remove(style.appear);
			setTimeout(() => $element.classList.add(style.appear), 0);		
		}
	}

	function render() {
		ReactDOM.render(<GridComponent model = {gridModel}/>, document.getElementById("root"));	
	}

	return {
		gridModel : gridModel,
		gameEnd : gameEnd
	}

})();




