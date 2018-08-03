import style from "./main.css"
import React, {Component} from "react";
import ReactDOM from "react-dom";
import GridItem from "./grid_item_component"

class Grid extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		var grids = this.props.model.grids
		var gridItems = [];
		for(var row = 0, count=0; row < grids.length; row ++) {
			for(var col = 0; col <grids[0].length; col ++) {
				gridItems.push(<GridItem key={count++} row={row} col={col} val={grids[row][col]}/>)
			}
		}
	    return (
			<div className={style.container}>
				<div className={style.title}>
					<h1>2048</h1>
					<p>React</p>
				</div>
				<div className={style.grid_2048} id='grid-box'>
					{ gridItems }
				</div>
			</div>
  		)		
	}
}

export default Grid