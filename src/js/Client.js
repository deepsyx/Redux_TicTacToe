import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import App from './Containers/App';
import TicTacToeReducer from './Reducers/TicTacToeReducer';

let store = createStore(TicTacToeReducer, applyMiddleware(thunk));

ReactDOM.render(
	(
		<Provider store={store}>
			<App />
		</Provider>
	),
	document.getElementById('content')
);