import React from 'react';

export default React.createClass({

	propTypes: {
		rankings: React.PropTypes.object.isRequired
	},

	render: function() {

		if (this.props.rankings.size > 0) {
			const rows = this.props.rankings.map((ranking) => {
				const teamName = ranking.get('team').get('name');
				return (
					<tr key={teamName}>
						<td>{ranking.get('pos')}</td>
						<td>{teamName}</td>
						<td>{ranking.get('pts')}</td>
					</tr>
				);
			});

			var rankingsTable = (
				<table className="rankings--table">
					<thead>
						<tr>
							<th>Position</th>
							<th>Team</th>
							<th>Points</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			);

		} else {
			rankingsTable = (<p>No teams with a ranking</p>);
		}

		return (
			<div className="rankings">
				<h2>Rankings Table</h2>
				{rankingsTable}
			</div>
		);
	}

});