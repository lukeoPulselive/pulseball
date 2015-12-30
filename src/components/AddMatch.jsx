import React from 'react';

export default React.createClass({

	propTypes: {
		requiresInit: React.PropTypes.bool.isRequired,
		addMatch: React.PropTypes.func.isRequired,
		setState: React.PropTypes.func.isRequired
	},

	_addMatch: function(e) {
		e.preventDefault();
		const textarea = e.target[0];
		try {
			const json = JSON.parse(textarea.value);
			if (this.props.requiresInit) {
				this.props.setRankings(json);
			} else {
				this.props.addMatch(json);
			}
		} catch (e) {
			console.warn('invalid json');
		}
	},

	render: function() {

		if (this.props.requiresInit) {
			var action = "Initialise Rankings";
			
		} else {
			action = "Add Match";
		}

		return (
			<form className="addMatch" onSubmit={this._addMatch}>
				<textarea className="addMatch--input" />
				<button className="addMatch--button" type="submit">{action}</button>
			</form>
		);
	}

});