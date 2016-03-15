import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import TicTacToe from '../components/TicTacToe'
import * as Actions from '../Actions/Actions'

function mapStateToProps (state) {
	return {
		grid: state.get('grid'),
		outcome: state.get('outcome')
	};
};

function mapDispatchToProps (dispatch) {
	return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe);