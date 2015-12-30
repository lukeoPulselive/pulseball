import {Map} from 'immutable';
import {addMatch, setRankings} from './core';

function setState(state, newState) {
	return state.merge(newState);
}

export default function(state = Map(), action) {

  	switch(action.type) {
  		case 'SET_STATE':
  			return setState(state, action.state);
	  	case 'ADD_MATCH':
  			return addMatch(state, action.match);
		case 'SET_RANKINGS':
			return setRankings(state, action.rankings);

  	}	

  return state;

}