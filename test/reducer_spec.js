import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  	it('handles SET_STATE', () => {
	    const initialState = Map();
	    const action = {
			type: 'SET_STATE',
			state: Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "France", "id": 2 }),
						 "pos": 1,
						 "pts": 53.59
					}),
					Map({
						"team": Map({ "name": "England", "id": 1 }),
						 "pos": 2,
						 "pts": 51.68
					})
				)
			})
	    };
	    const nextState = reducer(initialState, action);

	    expect(nextState).to.equal(fromJS({
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
	    }));
  	});

  	it('handles SET_STATE with JSON payload', () => {
	    const initialState = Map();
	    const action = {
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
	    };
	    const nextState = reducer(initialState, action);

	    expect(nextState).to.equal(fromJS({
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
	    }));
  	});


  	it('handles SET_STATE with undefined payload', () => {
	    const action = {
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
	    };
	    const nextState = reducer(undefined, action);

	    expect(nextState).to.equal(fromJS({
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
	    }));
  	});

  	it('handles ADD_MATCH when there are no existing rankings', () => {
  		const initialState = Map();
	    const action = {
			type: 'ADD_MATCH',
			match: {
				"matchId": 2524,
				"description": "Match 2",
				"venue": {
					"id": 900,
					"name": "Stadium",
					"city": "Paris",
					"country": "France"
				},
				"teams": [
					{
						"id": 2,
						"name": "France",
						"abbreviation": "FRA"
					},
					{
						"id": 1,
						"name": "England",
						"abbreviation": "ENG"
					}
				],
				"scores": [
					19,
					23
				],
				"status": "C",
				"outcome": "B"
			}
	    };

	    const nextState = reducer(initialState, action);
	    expect(nextState).to.equal(fromJS({
	    	rankings: [
				{ "team": { "name": "England", "id": 1 }, "pos": 1, "pts": 1.3 },
	    		{ "team": { "name": "France", "id": 2 }, "pos": 2, "pts": -1.3 },
	    	]
	    }));

	});

});