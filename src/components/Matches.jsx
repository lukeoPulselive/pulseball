import React from 'react';

export default React.createClass({

	getInitialState: function() {
		return {
			expandResults: false
		};
	},

	_toggleExpand: function() {
		this.setState({
			expandResults: !this.state.expandResults
		});
	},

	render: function() {

		if (this.props.matches.size > 0) {
			var matches = [];
			const NUM_RESULTS = 5;

			// Get the latest 5 results, or all results if expandResults is true
			const results = this.props.matches.reverse().slice(0, this.state.expandResults ? this.props.matches.size : NUM_RESULTS);

			// Push a result to the DOM for each result
			results.map((result) => {
				const team1 = result.get('teams').get(0);
				const team2 = result.get('teams').get(1);
				const score = result.get('scores');
				matches.push(
					<p key={result.get('matchId')}>{team1.get('abbreviation')} {score.get(0)} - {score.get(1)} {team2.get('abbreviation')}</p>
				);
			});

			if (this.state.expandResults) {
				matches.push(
					<a onClick={this._toggleExpand} key="expandResults">Show less...</a>
				);

			} else if (this.props.matches.size > NUM_RESULTS) {
				matches.push(
					<a onClick={this._toggleExpand} key="expandResults">Show all...</a>
				);	
			}


		} else {
			matches = <p>No matches played yet</p>;
		}

		return (
			<div>
				<h2>Results</h2>
				{matches}
			</div>
		);
	
	}

});