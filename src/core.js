import {List, Map, fromJS} from 'immutable';

export function setRankings(state, rankings) {
	return state.set('rankings', fromJS(rankings));
}

export function addMatch(state, match) {

	// convert to immutablejs data to make it easier to work with data.
	match = fromJS(match);

	console.log(typeof match);

	// Only add the match if the match is complete.
	if (match.get('status') !== 'C') {
		return state;
	}

	const team1 =  match.get('teams').first();
	const team2 =  match.get('teams').last();

	let team1Ranking = findTeamRanking(state, team1.get('id'));
	let team2Ranking = findTeamRanking(state, team2.get('id'));

	// Create rankings for the teams if they do not exist in the table already
	if (!team1Ranking) {
		state = addTeam(state, team1);
		team1Ranking = findTeamRanking(state, team1.get('id'));
	}
	if (!team2Ranking) {
		state = addTeam(state, team2);
		team2Ranking = findTeamRanking(state, team2.get('id'));
	}

	// add three points to home team
	let team1Points = team1Ranking.get('pts');
	if (match.get('venue').get('country') === team1Ranking.get('team').get('name')) {
		team1Points += 3;
	}

	let team2Points = team2Ranking.get('pts');
	if (match.get('venue').get('country') === team2Ranking.get('team').get('name')) {
		team2Points += 3;
	}

	const ratingDifference = getRatingDifference(team1Points, team2Points);
	const [team1PointsChange, team2PointsChange] = calculatePoints(match.get('outcome'), ratingDifference);

	state =	addPointsToTeam(state, team1Ranking.get('team').get('id'), team1PointsChange);
	state =	addPointsToTeam(state, team2Ranking.get('team').get('id'), team2PointsChange);

	return state;

}

export function addTeam(state, team) {
	const rankings = state.get('rankings', List());
	const lastPlace = rankings.size + 1;
	const ranking = Map({
		team: team.delete('abbreviation'),
		pts: 0,
		pos: lastPlace
	});

	const nextRankings = rankings.push(ranking);
	return state.set('rankings', nextRankings);
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

	const rankings = state.get('rankings');

	if (!rankings) {
		return null;
	}

	const ranking =  rankings.find((ranking) => {
		return (ranking.get('team').get('id') === id);
	});

	if (ranking) {
		return ranking;
	} else {
		return null;
	}

}

