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