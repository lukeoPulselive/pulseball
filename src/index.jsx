import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {PulseballRankingsPredictorContainer} from './components/PulseballRankingsPredictor';

const store = createStore(reducer);
store.dispatch({
	type: 'SET_STATE',
	state: {
				rankings: [
					{ 
						team: {name: "France", "id": 2},
						pos: 1,
						pts: 53.59
					},
					{ 
						team: {name: "England", "id": 1},
						pos: 2,
						pts: 51.68
					}
				]
	    	}
});

ReactDOM.render(
	<Provider store={store}>
		<PulseballRankingsPredictorContainer />
	</Provider>,
  document.getElementById('app')
);