import Constants from '../Constants';

export class GridComputer {
    constructor (grid, player) {
        this.bestChoise = null;
        this.minimax(grid, player, 0);
        return this.bestChoise;
    }

    minimax (grid, player, depth) {
        let winnerResult = GetWinner(grid);

        if (winnerResult !== Constants.PLAYER._) {
            return this.getScore(winnerResult, player, depth);
        }

        if (IsFull(grid)) {
            return 0;
        }

        let availableMoves = this.getFreePositions(grid);
        let stack = [];
        let oppositePlayer = this.getOppositePlayer(player);

        availableMoves.forEach((move) => {
            let clonedGrid = grid.set(move, player);
            let result = this.minimax(clonedGrid, oppositePlayer, depth + 1);

            stack.push(result);
        });

        let result = stack[0];
        let optimalMove = availableMoves[0];

        for (let i = 1; i < stack.length; i++) {
            if ((stack[i] > result && player === Constants.PLAYER.X) ||
             (stack[i] < result && player === Constants.PLAYER.O)) {
                result = stack[i];
                optimalMove = availableMoves[i];
            }
        }

        if (depth === 0 && player === Constants.PLAYER.X) {
            this.bestChoise = optimalMove;
        }

        return result;
    }

    getScore (result, player, depth) {
        if (result === Constants.PLAYER.X) {
            return 10 - depth;
        } else if (result === Constants.PLAYER._) {
            return 0;
        }

        return depth - 10;
    }

    getFreePositions (grid) {
        let stack = [];

        for (let i = 0; i < grid.count(); i++) {
            if (grid.get(i) === Constants.PLAYER._) {
                stack.push(i);
            }
        }

        return stack;
    }

    getOppositePlayer(player) {
        return player === Constants.PLAYER.X ? Constants.PLAYER.O : Constants.PLAYER.X;
    }
};

export function IsFull (grid) {
    return grid.indexOf(Constants.PLAYER._) === -1;
};

export function GetWinner (grid) {
    // for each row
    for (let i = 0; i < 3; i++) {
        if (grid.get(i) === grid.get(i + 3) &&
         grid.get(i) === grid.get(i + 6) &&
         grid.get(i) !== Constants.PLAYER._) {
            return grid.get(i);
        }
    }

    // for each column
    for (let i = 0; i <= 6; i += 3) {
        if (grid.get(i) === grid.get(i + 1) &&
         grid.get(i) === grid.get(i + 2) &&
         grid.get(i) !== Constants.PLAYER._) {
            return grid.get(i);
        }
    }

    // left diagonal
    if (grid.get(0) === grid.get(4) &&
     grid.get(0) === grid.get(8) &&
     grid.get(0) !== Constants.PLAYER._) {
        return grid.get(0);
    }

    // right diagonal
    if (grid.get(2) === grid.get(4) &&
     grid.get(2) === grid.get(6) &&
     grid.get(2) !== Constants.PLAYER._) {
        return grid.get(2);
    }

    return Constants.PLAYER._;
};