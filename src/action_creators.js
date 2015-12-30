export function addMatch(match) {
	return {
		type: 'ADD_MATCH',
		match
	};
}

export function setState(state) {
	return {
		type: 'SET_STATE',
		state
	};
}

export function setRankings(rankings) {
	return {
		type: 'SET_RANKINGS',
		rankings
	};
}