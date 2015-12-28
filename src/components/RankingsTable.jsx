import React from 'react';

export default React.createClass({

	propTypes: {
		rankings: React.PropTypes.object.isRequired
	},

	render: function() {

		let rows = this.props.rankings.map((ranking) => {

			const teamName = ranking.get('team').get('name');
			return (
				<tr key={teamName}>
					<td>{ranking.get('pos')}</td>
					<td>{teamName}</td>
					<td>{ranking.get('pts')}</td>
				</tr>
			);
		});

		return (
			<table>
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
	}

});