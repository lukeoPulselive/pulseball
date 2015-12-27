import {List, Map, fromJS} from 'immutable';

export function setRankings(state, entries) {
	return state.set('rankings', fromJS(entries));
}

export function addMatch(state, match) {

	// convert to immutablejs data to make it easier to work with data.
	match = fromJS(match);

	// Only add the match if the match is complete.
	if (match.get('status') !== 'C') {
		return state;
	}

	const team1 = findTeamRanking(state, match.get('teams').first().get('id'));
	const team2 = findTeamRanking(state, match.get('teams').last().get('id'));

	// add three points to home team
	let team1Points = team1.get('pts');
	if (match.get('venue').get('country') === team1.get('team').get('name')) {
		team1Points += 3;
	}

	let team2Points = team2.get('pts');
	if (match.get('venue').get('country') === team2.get('team').get('name')) {
		team2Points += 3;
	}

	const ratingDifference = getRatingDifference(team1Points, team2Points);
	const [team1PointsChange, team2PointsChange] = calculatePoints(match.get('outcome'), ratingDifference);

	state =	addPointsToTeam(state, team1.get('team').get('id'), team1PointsChange);
	state =	addPointsToTeam(state, team2.get('team').get('id'), team2PointsChange);

	return state;

}

export function calculatePoints(outcome, ratingDifference) {
	let team1Points, team2Points;
	switch(outcome) {
		case 'A':
			team1Points = 1 - (ratingDifference / 10);
			team2Points = -(1 - (ratingDifference / 10));
			break;
		case 'B':
			team1Points = -(1 + (ratingDifference / 10));
			team2Points = (1 + (ratingDifference / 10));
			break;
		case 'D':
			team1Points = ratingDifference / 10;
			team2Points = ratingDifference / 10;
			break;
		case 'N':
		default:
			team1Points = 0;
			team2Points = 0;
			break;
	}

	return [Math.round(team1Points * 100) / 100, Math.round(team2Points * 100) / 100];
}

export function addPointsToTeam(state, id, points) {

	const rankings = state.get('rankings');
	const indexToUpdate = rankings.findIndex((item) => {
		return item.get('team').get('id') === id;
	});

	const nextRankings = rankings.update(indexToUpdate, (item) => {
		return item.set('pts', item.get('pts') + points);
	});

	return updatePositions(sortRankings(state.set('rankings', nextRankings)));
}

export function updatePositions(state) {
	let rankings = state.get('rankings');
	rankings.map((value, key) => {
		rankings = rankings.update(key, (item) => {
			return item.set('pos', key + 1);
		});
	});
	return state.set('rankings', rankings);
}

export function sortRankings(state) {
	const rankings = state.get('rankings');

	const nextRankings = rankings.sortBy((team) => {
		return -team.get('pts');
	});
	return state.set('rankings', nextRankings);

}

export function getRatingDifference(team1Points, team2Points) {
	return Math.max(-10, Math.min(10, team1Points - team2Points));
}

export function findTeamRanking(state, id) {

	const ranking =  state.get('rankings').find((ranking) => {
		return (ranking.get('team').get('id') === id);
	});

	if (ranking) {
		return ranking;
	} else {
		return null;
	}

}

