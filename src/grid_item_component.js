import React, {Component} from "react";
import ReactDOM from "react-dom";

class GridItem extends Component {
	render() {
		return (
			<div>
				{this.props.val && this.props.val > 0? this.props.val: "" }
			</div>
		)
	}
}

export default GridItem