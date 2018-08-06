import React, {Component} from "react";
import ReactDOM from "react-dom";
import Grid from "./grid_component";
import GridModel from "./grid_model";
import Utils from "./Utils";
import style from "./main.css";

var main = (function(){
	var _gridModel = new GridModel();
	var _gameEnd = false; 
	
	(function ini() {
		_gridModel.subscribe(render);
		_gridModel.randomIni(2);
		window.onkeydown = function(event) {
			let key = event.key; 
			let iniCells;
			switch(key) {
				case ("ArrowUp"): 
					console.log('up');
					iniCells = _gridModel.moveUp();
					cellAppear(iniCells);						
					break;

				case ("ArrowDown"): 
					console.log('up');
					iniCells = _gridModel.moveDown();
					cellAppear(iniCells);						
					break;

				case ("ArrowLeft"): 
					console.log('left');		
					iniCells = _gridModel.moveLeft();		
					cellAppear(iniCells);										
					break;

				case ("ArrowRight"): 
					console.log('right');
					iniCells = _gridModel.moveRight();
					cellAppear(iniCells);								
					break;

				default: return;
			}
		};		
	})();

	function cellAppear(iniCells) {
		if(iniCells) {
			console.log(iniCells)
			let $elements = document.getElementsByClassName(style.grid_item);
			for(var i = 0; i < $elements.length; i++) {
				if( i === iniCells[0] || i === iniCells[1]) {
					$elements[i].classList.add(style.appear);
					console.log(i)
					console.log($elements[i])
				}
			}			
		}

	}

	function render() {
		ReactDOM.render(<Grid model = {_gridModel}/>, document.getElementById("root"));	
	}

	return {
		gridModel : _gridModel,
		gameEnd : _gameEnd
	}

})();




