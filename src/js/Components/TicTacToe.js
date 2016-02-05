'use strict';

import React from 'react';

import Box from './Box';
import Result from './Result';

class TicTacToe extends React.Component {
	_handleSelectBox(index) {
		this.props.makeMove(index);
	}

	_handleRestart() {
		this.props.newGame();
	}

	shouldComponentUpdate(nextProps) {
		return this.props.grid !== nextProps.grid;
	}

	render() {
		return <div className="box-wrapper">
			<Result outcome={this.props.outcome} onRestart={this._handleRestart.bind(this)} />
			<div className="box-container animated fadeIn">
				{this.props.grid.map((box, i) => {
					return <Box key={i} value={box} onSelectBox={this._handleSelectBox.bind(this, i)} />;
				})}
			</div>
			<div className="footer">Viktor Kirilov (github/deepsyx)</div>
		</div>;
	}
};

TicTacToe.propTypes = {
	grid: React.PropTypes.object.isRequired,
	outcome: React.PropTypes.any.isRequired,

	// actions
	newGame: React.PropTypes.func.isRequired,
	makeMove: React.PropTypes.func.isRequired
};

export default TicTacToe;