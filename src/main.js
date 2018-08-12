import React, {Component} from "react";
import ReactDOM from "react-dom";
import GridComponent from "./grid_component";
import GridModel, {DIRECTIONS} from "./grid_model";
import Utils from "./Utils";
import style from "./main.css";
import GameSummaryComponent from "./GameSummaryComponent"

var main = (function(){
	var gridModel = new GridModel(4);
	var gameEnd = false; 
	var bestScore = 0;
	var currentScore = 0;
	var KEYS = {
		best: "best", 
		preState: null
	};

	function ini() {
		gridModel.subscribe(render);
		render();
		gridModel.randomIni();
		gridModel.randomIni();
		gameEnd = false;
		bestScore = getBestScore();
		window.onkeydown = function(event) {
			let key = event.key; 
			let iniCells;
			switch(key) {
				case ("ArrowUp"): 
					console.log('up');
					iniCells = gridModel.move(DIRECTIONS.UP);										
					break;

				case ("ArrowDown"): 
					console.log('down');
					iniCells = gridModel.move(DIRECTIONS.DOWN);						
					break;

				case ("ArrowLeft"): 
					console.log('left');		
					iniCells = gridModel.move(DIRECTIONS.LEFT);											
					break;

				case ("ArrowRight"): 
					console.log('right');
					iniCells = gridModel.move(DIRECTIONS.RIGHT);							
					break;		
			}
		};		
	}

	function getBestScore() {
		bestScore = localStorage.getItem(KEYS.best);
	}

	function setBestScore(score) {
		localStorage.setItem(KEYS.best, score);
	}

	var Main = () => {
		return (
			<div className={style.container}>
				<GameSummaryComponent main = {main}/>
				<GridComponent model = {gridModel}/>
			</div>
		)
	}

	function render() {
		ReactDOM.render(<Main/>, document.getElementById("root"));	
	}

	return {
		gridModel,
		gameEnd,
		ini,
		setBestScore
	}

})();

main.ini();


