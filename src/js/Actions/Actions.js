import { GridComputer, GetWinner, IsFull } from '../Services/GridComputer';
import Constants from '../Constants';

export const MAKE_MOVE = 'MAKE_MOVE';
export const NEW_GAME = 'NEW_GAME';

function calculateOutcome (grid) {
	let currentWinner = GetWinner(grid);

	if (currentWinner !== Constants.PLAYER._) {
		return currentWinner;
	}

	if (IsFull(grid)) {
		return Constants.STATE.TIE;
	}

	return Constants.STATE.ONGOING;
};

export function makeMove (index) {
  	return (dispatch, getState) => {
    	let grid = getState().get('grid'),
    		outcome;

		if (grid.get(index) !== Constants.PLAYER._) {
			return;
		}

		grid = grid.set(index, Constants.PLAYER.O);

		outcome = calculateOutcome(grid);
		if (outcome !== Constants.STATE.ONGOING) {
			return dispatch({
		    	type: MAKE_MOVE,
		    	outcome,
		    	grid
		  	});
		}

		let { bestChoise } = new GridComputer(grid, Constants.PLAYER.X);
		grid = grid.set(bestChoise, Constants.PLAYER.X);

		outcome = calculateOutcome(grid);
		return dispatch({
		    type: MAKE_MOVE,
		    outcome,
		    grid
		});
  	};
};


export function newGame () {
	return {
		type: NEW_GAME
	};
};