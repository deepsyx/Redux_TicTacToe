import React from 'react';

import Constants from '../Constants';

class Result extends React.Component {
	_handleRestart() {
		this.props.onRestart();
	}

	render() {
		let {outcome} = this.props,
			message = '';

		if (outcome === Constants.STATE.ONGOING) {
			return null;
		}

		if (outcome === Constants.PLAYER.X) {
			message = 'You lost!';
		} else if (outcome === Constants.PLAYER.O) {
			message = 'You won!';
		} else {
			message = 'It is a tie!';
		}


		return <div className="mask">
			<div className="mask-centered-text">
				<div className="animated fadeInDown">{message}</div>
				<button onClick={this._handleRestart.bind(this)} className="mask-restart-button">Restart!</button>
			</div>
		</div>;
	}
};

Result.propTypes = {
	outcome: React.PropTypes.oneOf([
		Constants.PLAYER.X, 
		Constants.PLAYER.O, 
		Constants.STATE.TIE,
		Constants.STATE.ONGOING
	]),
	onRestart: React.PropTypes.func.isRequired
};

export default Result;