import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {PulseballRankingsPredictorContainer} from './components/PulseballRankingsPredictor';

import '../styles/main.less'

const store = createStore(reducer);
// Initialise store with empty rankings, and empty list of matches
store.dispatch({
	type: 'SET_STATE',
	state: {rankings: [], matches: []}
});

ReactDOM.render(
	<Provider store={store}>
		<PulseballRankingsPredictorContainer />
	</Provider>,
  document.getElementById('app')
);