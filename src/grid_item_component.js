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
		if(this.$div && this.$div.current) {
			let item = this.props.item;
			let preClassName = item.hasPrePos() ? style[`grid_item_${item.preX}_${item.preY}`] : "";
			let posClassName = item.val > 0 ? style[`grid_item_${item.x}_${item.y}`] : "";		
			if(this.$div.current.classList.contains(preClassName)){
				setTimeout(() => {
					this.$div.current.classList.remove(preClassName);			
					this.$div.current.classList.add(posClassName);
				}, 0);
			}		
		}
	}

	render() {
		let className = []; 
		let item = this.props.item;
		let preClassName = typeof item.preX == "number" && typeof item.preY == "number" ? style[`grid_item_${item.preX}_${item.preY}`] : "";
		let posClassName = item.val > 0 ? style[`grid_item_${item.x}_${item.y}`] : "";
		let valClassName = 0;
		if(item.val >= 2048) 
			valClassName = style.grid_item_super;
		else if(item.val > 0) 
			valClassName = style[`grid_${item.val}`];
		let newClassName = item.new ? style.appear : "";
		let mergedClassName = item.merged? style.merged : "";
		let animationClass = style.animation;
		let gridClassName = style.grid_item;
		// class for moving grid item 
		if(item.hasPrePos())
			className = [gridClassName ,preClassName, valClassName, animationClass].join(" ");
		else if(item.merged)
			className = [gridClassName, mergedClassName, posClassName, valClassName].join(" ");
		else // for new items
			className = [gridClassName, newClassName, posClassName, valClassName].join(" ");

		return (
			<div ref={this.$div} onAnimationEnd = {this.handleAnimationend} className = {className}>
				<div>
					{item.val && item.val > 0? item.val: "" }
				</div>
			</div>
		)

	}
}

export default GridItemComponent