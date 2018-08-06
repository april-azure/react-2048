import React, {Component} from "react";
import ReactDOM from "react-dom";
import style from "./main.css"

class GridItem extends Component {
	render() {
		let className = this.props.val > 0 ? style["grid_"+this.props.val] : "";
		return (

			<div className = {style.grid}>
				<div className={style.grid_item + " " + className}>
					{this.props.val && this.props.val > 0? this.props.val: "" }
				</div>
			</div>
		)
	}
}

export default GridItem