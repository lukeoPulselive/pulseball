import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setRankings, addMatch, addTeam, findTeamRanking, getRatingDifference, addPointsToTeam, sortRankings, calculatePoints, updatePositions} from '../src/core';

describe('pulseball', () => {

	describe('setRankings', () => {

		it ('sets a single ranking as the state', () => {
			const state = Map();
			const rankings = [
				{
					"team": { "name": "Australia", "id": 32 },
 					 "pos": 1,
 					 "pts": 54.23
				}
			];

			const nextState = setRankings(state, rankings);
			expect(nextState).to.equal(Map({
				rankings: List.of(Map({
					"team": Map({ "name": "Australia", "id": 32 }),
 					 "pos": 1,
 					 "pts": 54.23
				}))
			}));

		});

		it('overwrites existing state with a new single ranking', () => {
			const state = Map({
				rankings: List.of(Map({
					"team": Map({ "name": "England", "id": 21 }),
 					 "pos": 4,
 					 "pts": 12.84
				}))
			});

			const rankings = [
				{
					"team": { "name": "Australia", "id": 32 },
 					 "pos": 1,
 					 "pts": 54.23
				}
			];

			const nextState = setRankings(state, rankings);
			expect(nextState).to.equal(Map({
				rankings: List.of(Map({
					"team": Map({ "name": "Australia", "id": 32 }),
 					 "pos": 1,
 					 "pts": 54.23
				}))
			}));
		});

		it ('sets a bunch of rankings as the state', () => {
			const state = Map();
			const rankings = [
				{ "team": { "name": "Australia", "id": 32 }, "pos": 1, "pts": 54.23},
				{ "team": { "name": "New Zealand", "id": 62 }, "pos": 2, "pts": 54.00 },
				{ "team": { "name": "France", "id": 2 }, "pos": 3, "pts": 52.95 },
				{ "team": { "name": "England", "id": 1 }, "pos": 4, "pts": 52.32 },
				{ "team": { "name": "Romania", "id": 24 }, "pos": 5, "pts": 43.50 }
			];

			const nextState = setRankings(state, rankings);
			expect(nextState).to.equal(Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "Australia", "id": 32 }),
	 					 "pos": 1,
	 					 "pts": 54.23
					}), 
					Map({
						"team": Map({ "name": "New Zealand", "id": 62 }),
	 					 "pos": 2,
	 					 "pts": 54.00
					}),
					Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 3,
	 					 "pts": 52.95
					}),
					Map({
						"team": Map({ "name": "England", "id": 1 }),
	 					 "pos": 4,
	 					 "pts": 52.32
					}),
					Map({
						"team": Map({ "name": "Romania", "id": 24 }),
	 					 "pos": 5,
	 					 "pts": 43.50
					})
				)
			}));

		});

	});

	describe('findTeamRanking', () => {

		it('finds an existing team in a rankings table', () => {
			const state = Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 2,
	 					 "pts": -1.3
					}),
					Map({
						"team": Map({ "name": "England", "id": 1 }),
	 					 "pos": 1,
	 					 "pts": 1.3
					})
				)
			});

			const id = 2;
			const foundTeam = findTeamRanking(state, id);
			expect(foundTeam).to.equal(Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 2,
	 					 "pts": -1.3
					}));
		});



		it('return null when a team does not exist in the rankings table', () => {
			const state = Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 2,
	 					 "pts": -1.3
					}),
					Map({
						"team": Map({ "name": "England", "id": 1 }),
	 					 "pos": 1,
	 					 "pts": 1.3
					})
				)
			});

			const id = 3;
			const foundTeam = findTeamRanking(state, id);
			expect(foundTeam).to.equal(null);
		});

	});

	describe('getRatingDifference', () => {

		it('calculates the rating difference', () => {
			const ratingDifference = getRatingDifference(3, 8);
			expect(ratingDifference).to.equal(-5);
		});

		it('has a maximum of 10', () => {
			const ratingDifference = getRatingDifference(13, 1);
			expect(ratingDifference).to.equal(10);
		});

		it('has a minimum of -10', () => {
			const ratingDifference = getRatingDifference(3, 14);
			expect(ratingDifference).to.equal(-10);
		});

	});

	describe('addPointsToTeam', () => {

		it('adds some points to a team', () => {
			const state = Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 2,
	 					 "pts": 5
					}),
					Map({
						"team": Map({ "name": "England", "id": 1 }),
	 					 "pos": 1,
	 					 "pts": 7
					})
				)
			});

			const nextState = addPointsToTeam(state, 1, 4.4);
			expect(nextState).to.equal(
				Map({
					rankings: List.of(
						Map({
							"team": Map({ "name": "England", "id": 1 }),
		 					 "pos": 1,
		 					 "pts": 11.4
						}),
						Map({
							"team": Map({ "name": "France", "id": 2 }),
		 					 "pos": 2,
		 					 "pts": 5
						})
					)
				})
			);

		});

		it('adds negative points to a team', () => {
			const state = Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 2,
	 					 "pts": 5
					}),
					Map({
						"team": Map({ "name": "England", "id": 1 }),
	 					 "pos": 1,
	 					 "pts": 7
					})
				)
			});

			const nextState = addPointsToTeam(state, 2, -3.1);
			expect(nextState).to.equal(
				Map({
					rankings: List.of(
						Map({
							"team": Map({ "name": "England", "id": 1 }),
		 					 "pos": 1,
		 					 "pts": 7
						}),
						Map({
							"team": Map({ "name": "France", "id": 2 }),
		 					 "pos": 2,
		 					 "pts": 1.9
						})
					)
				})
			);

		});


		it('handles no points being added', () => {
			const state = Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 2,
	 					 "pts": 5
					}),
					Map({
						"team": Map({ "name": "England", "id": 1 }),
	 					 "pos": 1,
	 					 "pts": 7
					})
				)
			});

			const nextState = addPointsToTeam(state, 2, 0);
			expect(nextState).to.equal(
				Map({
					rankings: List.of(
						Map({
							"team": Map({ "name": "England", "id": 1 }),
		 					 "pos": 1,
		 					 "pts": 7
						}),
						Map({
							"team": Map({ "name": "France", "id": 2 }),
		 					 "pos": 2,
		 					 "pts": 5
						})
					)
				})
			);

		});

	});

	describe('sortRankings', () => {

		it('makes sure the rankings are in order of points', () => {

			const state = Map({
					rankings: List.of(
						Map({
							"team": Map({ "name": "France", "id": 2 }),
		 					 "pos": 2,
		 					 "pts": 5
						}),
						Map({
							"team": Map({ "name": "England", "id": 1 }),
		 					 "pos": 1,
		 					 "pts": 7
						}),
						Map({
							"team": Map({ "name": "Spain", "id": 3 }),
		 					 "pos": 3,
		 					 "pts": 8
						})
					)
				});

			const nextState = sortRankings(state);
			expect(nextState).to.equal(
				Map({
					rankings: List.of(
						Map({
							"team": Map({ "name": "Spain", "id": 3 }),
		 					 "pos": 3,
		 					 "pts": 8
						}),
						Map({
							"team": Map({ "name": "England", "id": 1 }),
		 					 "pos": 1,
		 					 "pts": 7
						}),
						Map({
							"team": Map({ "name": "France", "id": 2 }),
		 					 "pos": 2,
		 					 "pts": 5
						})
					)
				})
			);

		});

	});

	describe('calculatePoints', () => {

		it('correctly calculates a team1 win', () => {

			const [team1Points, team2Points] = calculatePoints('A', 4);
			expect(team1Points).to.equal(0.6);
			expect(team2Points).to.equal(-0.6);

		});

		it('correctly calculates a team2 win', () => {

			const [team1Points, team2Points] = calculatePoints('B', 2);
			expect(team1Points).to.equal(-1.2);
			expect(team2Points).to.equal(1.2);

		});


		it('correctly calculates a draw', () => {

			const [team1Points, team2Points] = calculatePoints('D', -4);
			expect(team1Points).to.equal(-0.4);
			expect(team2Points).to.equal(-0.4);

		});

		it('limits scores to two decimal places', () => {

			const [team1Points, team2Points] = calculatePoints('B', 3.63);
			expect(team1Points).to.equal(-1.36);
			expect(team2Points).to.equal(1.36);

		});

	});

	describe('updatePositions', () => {

		it('updates the pos value to match ranking order', () => {

			const state = Map({
					rankings: List.of(
						Map({
							"team": Map({ "name": "France", "id": 2 }),
		 					 "pos": 3,
		 					 "pts": 5
						}),
						Map({
							"team": Map({ "name": "England", "id": 1 }),
		 					 "pos": 2,
		 					 "pts": 7
						}),
						Map({
							"team": Map({ "name": "Spain", "id": 3 }),
		 					 "pos": 1,
		 					 "pts": 8
						})
					)
				});

			const nextState = updatePositions(state);
			expect(nextState).to.equal(
				Map({
					rankings: List.of(
						Map({
							"team": Map({ "name": "France", "id": 2 }),
		 					 "pos": 1,
		 					 "pts": 5
						}),
						Map({
							"team": Map({ "name": "England", "id": 1 }),
		 					 "pos": 2,
		 					 "pts": 7
						}),
						Map({
							"team": Map({ "name": "Spain", "id": 3 }),
		 					 "pos": 3,
		 					 "pts": 8
						})
					)
				})
			);

		});

	});

	describe('addTeam', () => {

		it ('adds a team to the rankings if it does not exist', () => {

			const state = Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 1,
	 					 "pts": 5
					}),
					Map({
						"team": Map({ "name": "England", "id": 1 }),
	 					 "pos": 2,
	 					 "pts": 3
					})
				)
			});

			const team = Map({
				"id": 3,
				"name": "Spain",
				"abbreviation": "SPA"
			});

			const nextState = addTeam(state, team);
			expect(nextState).to.equal(Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 1,
	 					 "pts": 5
					}),
					Map({
						"team": Map({ "name": "England", "id": 1 }),
	 					 "pos": 2,
	 					 "pts": 3
					}),
					Map({
						"team": Map({ "name": "Spain", "id": 3 }),
	 					 "pos": 3,
	 					 "pts": 0
					})
				)
			}));

		});

		it('creates the rankings if they do not exist', () => {

			const state = Map();
			const team = Map({
				"id": 3,
				"name": "Spain",
				"abbreviation": "SPA"
			});
			const nextState = addTeam(state, team);
			expect(nextState).to.equal(Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "Spain", "id": 3 }),
	 					 "pos": 1,
	 					 "pts": 0
					})
				)
			}));


		});

	});

	describe('addMatch', () => {

		it ('doesn\'t add a match if it is not complete', () => {
			const state = Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 1,
	 					 "pts": 52.95
					}),
					Map({
						"team": Map({ "name": "England", "id": 1 }),
	 					 "pos": 2,
	 					 "pts": 52.32
					})
				)
			});

			const match = {
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
				"status": "L",
				"outcome": "B"
			};

			const nextState = addMatch(state, match);
			expect(nextState).to.equal(state);

		});


		it ('doesn\'t add a match if it is a no result', () => {
			const state = Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "England", "id": 1 }),
	 					 "pos": 1,
	 					 "pts": 7
					}),
					Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 2,
	 					 "pts": 5
					})
				)
			});

			const match = {
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
				"outcome": "N"
			};

			const nextState = addMatch(state, match);
			expect(nextState).to.equal(state);

		});

		it('adds a team 2 win to the rankings table', () => {

			const state = Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 1,
	 					 "pts": 52.95
					}),
					Map({
						"team": Map({ "name": "England", "id": 1 }),
	 					 "pos": 2,
	 					 "pts": 52.32
					})
				)
			});

			const match = {
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
			};	

			const nextState = addMatch(state, match);
			expect(nextState).to.equal(Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "England", "id": 1 }),
	 					 "pos": 1,
	 					 "pts": 53.68
					}),
					Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 2,
	 					 "pts": 51.59
					})
				)
			}));

		});

		it('adds a team 1 win to the rankings table', () => {

			const state = Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 1,
	 					 "pts": 52.95
					}),
					Map({
						"team": Map({ "name": "England", "id": 1 }),
	 					 "pos": 2,
	 					 "pts": 52.32
					})
				)
			});

			const match = {
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
					30,
					8
				],
				"status": "C",
				"outcome": "A"
			};	

			const nextState = addMatch(state, match);
			expect(nextState).to.equal(Map({
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
			}));

		});

		it('outputs the same result as the specification example', () => {

			const state = setRankings(Map(), [
				 { "team": { "name": "Australia", "id": 32 }, "pos": 1, "pts": 54.23},
				 { "team": { "name": "New Zealand", "id": 62 }, "pos": 2, "pts": 54.00 },
				 { "team": { "name": "France", "id": 2 }, "pos": 3, "pts": 52.95 },
				 { "team": { "name": "England", "id": 1 }, "pos": 4, "pts": 52.32 },
				 { "team": { "name": "Romania", "id": 24 }, "pos": 5, "pts": 43.50 }
			]);

			const match = {
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
			};	

			const nextState = addMatch(state, match);
			expect(nextState).to.equal(Map({
				rankings: List.of(
					Map({
						"team": Map({ "name": "Australia", "id": 32 }),
	 					 "pos": 1,
	 					 "pts": 54.23
					}),
					Map({
						"team": Map({ "name": "New Zealand", "id": 62 }),
	 					 "pos": 2,
	 					 "pts": 54.00
					}),
					Map({
						"team": Map({ "name": "England", "id": 1 }),
	 					 "pos": 3,
	 					 "pts": 53.68
					}),
					Map({
						"team": Map({ "name": "France", "id": 2 }),
	 					 "pos": 4,
	 					 "pts": 51.59
					}),
					Map({
						"team": Map({ "name": "Romania", "id": 24 }),
	 					 "pos": 5,
	 					 "pts": 43.50
					})
				)
			}));

		});


	});


});