import Immutable from 'immutable';
import Constants from '../Constants';
import {MAKE_MOVE, NEW_GAME} from '../Actions/Actions';

function getInitialState () {
	return Immutable.fromJS({
		grid: [...Array(9)].map(() => Constants.PLAYER._),
		outcome: Constants.STATE.ONGOING
	});
};

function TicTacToeReducer (state = getInitialState(), action) {
  	switch (action.type) {
		case MAKE_MOVE:
			return state.set('outcome', action.outcome).set('grid', action.grid);

		case NEW_GAME:
			return getInitialState();

		default:
	  		return state;
  	}
};

export default TicTacToeReducer;