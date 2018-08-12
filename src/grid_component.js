import style from "./main.css"
import React, {Component} from "react";
import ReactDOM from "react-dom";
import GridItemComponent from "./grid_item_component";
import GameSummaryComponent from "./gameSummaryComponent";
import Utils from "./Utils"

class GridComponent extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		var grids = this.props.model.grid.gridContainers;
		var gridContainers = [];
		var items = this.props.model.gridItems;

		// to render the grid containers
		// to render the real grid items (tiles)
		var gridItems = [];
		for(var row = 0, count=0; row < grids.length; row ++) {
			for(var col = 0; col <grids[0].length; col ++) {
				gridContainers.push(<div className = {style.grid} key = {count}></div>)
				count++;
			}
		}

		// index might have problem
		items.forEach((item, index) => {
			gridItems.push(<GridItemComponent item={item} key = {item.key}/>)
		})

	    return (
			<div className={style.grid_2048} id='grid-box'>
				{ gridContainers }
				{ gridItems}
			</div>
  		)		
	}
}

export default GridComponent