import React, {Component} from "react";
import ReactDOM from "react-dom";
import Grid from "./grid_component"
import GridModel from "./grid_model"
import Utils from "./Utils"

var main = (function(){
	var _gridModel = new GridModel();
	var _gameEnd = false; 
	
	(function ini() {
		_gridModel.subscribe(render);
		_gridModel.randomIni();
		window.onkeydown = function(event) {
			let key = event.key 
			switch(key) {
				case ("ArrowUp"): 
					console.log('up');
					_gridModel.moveUp();
					break

				case ("ArrowDown"): 
					console.log('down');
					_gridModel.moveDown();						
					break

				case ("ArrowLeft"): 
					console.log('left');		
					_gridModel.moveLeft();						
					break

				case ("ArrowRight"): 
					console.log('right');
					_gridModel.moveRight();								
					break

				default: return;
			}
		};		
	})();

	function render() {
		ReactDOM.render(<Grid model = {_gridModel}/>, document.getElementById("root"));	
	}

	return {
		gridModel : _gridModel,
		gameEnd : _gameEnd
	}

})();




