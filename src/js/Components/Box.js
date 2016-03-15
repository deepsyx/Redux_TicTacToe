import React from 'react';
import Constants from '../Constants';

class Box extends React.Component {
	_handleClick () {
		this.props.onSelectBox();
	}

	shouldComponentUpdate (nextProps) {
		return this.props.value !== nextProps.value;
	}

	render () {
		let boxSymbol = <i />,
			boxClass = 'empty-box';

		if (this.props.value === Constants.PLAYER.X) {
			boxSymbol = (<i className="fa fa-times"></i>);
			boxClass = 'red-box';
		}

		if (this.props.value === Constants.PLAYER.O) {
			boxSymbol = (<i className="fa fa-circle-o"></i>);
			boxClass = 'blue-box';
		}

		return (
			<div className={"box " + boxClass} onClick={this._handleClick.bind(this)}>
				{boxSymbol}
			</div>
		);
	}
};

Box.propTypes = {
	value: React.PropTypes.oneOf([
		Constants.PLAYER._,
		Constants.PLAYER.X,
		Constants.PLAYER.O
	]).isRequired
};

export default Box;