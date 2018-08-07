import React, {Component} from "react";
import ReactDOM from "react-dom";
import style from "./main.css"

class GridItemComponent extends Component {
	constructor(props) {
		super(props);
		this.$div = React.createRef();

		this.handleAnimationend =  this.handleAnimationend.bind(this);
	}

	handleAnimationend(event) {
		// console.log('animation ed');
		if(this.$div.current.classList.contains(style.appear)){
			if(this.$div.current.classList.contains(style.appear)) 
				this.$div.current.classList.remove(style.appear);
		}
	}

	componentDidUpdate() {
		// play the position transition
		let item = this.props.item;
		let preClassName = item.preX && item.preY ? style[`grid_item_${item.preX}_${item.preY}`] : "";
		let posClassName = item.val > 0 ? style[`grid_item_${item.x}_${item.y}`] : "";		
		if(this.$div.current.classList.contains(preClassName)){
 			this.$div.current.classList.add(posClassName);
			 this.$div.current.classList.remove(preClassName);
			
		}
	}

	render() {
		let item = this.props.item;
		let preClassName = item.preX && item.preY ? style[`grid_item_${item.preX}_${item.preY}`] : "";
		let posClassName = item.val > 0 ? style[`grid_item_${item.x}_${item.y}`] : "";
		let valClassName = item.val > 0 ? style[`grid_${item.val}`] : "";
		let newClassName = item.new ? style.appear : "";

		if(!item.preX || !item.preY) {
			return (
				<div ref={this.$div} onAnimationEnd = {this.handleAnimationend} className = {newClassName + " " +style.grid_item +" " + posClassName + " " + valClassName }>
					<div>
						{item.val && item.val > 0? item.val: "" }
					</div>
				</div>
			)			
		}else {
			return (
				<div ref={this.$div} onAnimationEnd = {this.handleAnimationend} className = { style.animation + " " + style.grid_item +" " + preClassName + " " + valClassName }>
					<div>
						{item.val && item.val > 0? item.val: "" }
					</div>
				</div>
			)			
		}

	}
}

export default GridItemComponent