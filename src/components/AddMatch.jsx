import React from 'react';

export default React.createClass({

	_addMatch: function(e) {
		e.preventDefault();
		const textarea = e.target[0];
		try {
			const json = JSON.parse(textarea.value);
			this.props.addMatch(json);
		} catch (e) {
			console.warn('invalid json');
		}
	},

	render: function() {

		return (
			<form className="addMatch" onSubmit={this._addMatch}>
				<textarea className="addMatch--input" />
				<button className="addMatch--button" type="submit">Add Match</button>
			</form>
		);
	}

});