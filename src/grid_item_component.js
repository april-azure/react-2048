import React, {Component} from "react";
import ReactDOM from "react-dom";
import style from "./main.css"

class GridItemComponent extends Component {
	render() {
		let item = this.props.item
		let posClassName = item.val > 0 ? style[`grid_item_${item.x}_${item.y}`] : "";
		let valClassName = item.val > 0 ? style[`grid_${item.val}`] : "";
		
		return (
			<div className = {style.grid_item +" " + posClassName + " " + valClassName}>
				<div>
					{item.val && item.val > 0? item.val: "" }
				</div>
			</div>
		)
	}
}

export default GridItemComponent