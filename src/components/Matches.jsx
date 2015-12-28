import React from 'react';

export default React.createClass({

	render: function() {

		const lastMatch = (
			this.props.matches.last()
		);

		return (
			<div>
				<h2>Last Match Played</h2>
				{lastMatch}
			</div>
		);
	}

});