import style from "./main.css"
import React, {Component} from "react";
import ReactDOM from "react-dom";
import GridItemComponent from "./grid_item_component"

class GridComponent extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		var grids = this.props.model.grid.gridContainers;
		var gridContainers = [];
		var items = this.props.model.gridItems;

		// to render the grid containers
		for(var row = 0, count=0; row < grids.length; row ++) {
			for(var col = 0; col <grids[0].length; col ++) {
				gridContainers.push(<div className = {style.grid} key = {count}></div>)
				count++;
			}
		}

		// to render the real grid items (tiles)
		var gridItems = [];
		for(let i = 0; i < items.length; i ++) {
			gridItems.push(<GridItemComponent key={i} item={items[i]}/>)
		}

	    return (
			<div className={style.container}>
				<div className={style.title}>
					<h1>2048</h1>
					<p>React</p>
				</div>
				<div className={style.grid_2048} id='grid-box'>
					{ gridContainers }
					{ gridItems}
				</div>

			</div>
  		)		
	}
}

export default GridComponent