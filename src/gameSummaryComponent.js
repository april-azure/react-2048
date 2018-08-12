import React, {Component} from "react";
import style from "./main.css";
import ReactDOM from "react-dom";

class GameSummaryComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bestScore: props.main.bestScore ? props.main.bestScore : 0, 
			currentScore: props.main.currentScore? props.main.currentScore : 0
		}
	}

	render() {
		return (
			<div className = {style.summary}>
				<div className = {style.title}>
					<h1>2048</h1>
					<p>React</p>
				</div>
				<div className = {style.scores}>
					<div className = {style.score + " " + style.current}>
						<p>Score</p>
						<p>{this.state.currentScore}</p>
					</div>
					<div className = {style.score + " " + style.best}>
						<p>Best</p>
						<p>{this.state.bestScore}</p>
					</div>
				</div>
			</div>
		)
	}
}

export default GameSummaryComponent