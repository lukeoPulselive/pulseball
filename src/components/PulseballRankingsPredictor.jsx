import React from 'react';
import RankingsTable from './RankingsTable';
import AddMatch from './AddMatch';
import Matches from './Matches';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

export const PulseballRankingsPredictor = React.createClass({

	propTypes: {
		rankings: React.PropTypes.object.isRequired,
		matches: React.PropTypes.object.isRequired
	},

	render: function() {

		return (
			<div>
				<h1>Pulseball Rankings Predictor</h1>
				<RankingsTable rankings={this.props.rankings} />
				<Matches matches={this.props.matches} />
				<AddMatch {...this.props} />
			</div>	
		);
	}

});

function mapStateToProps(state) {
	return {
		rankings: state.get('rankings'),
		matches: state.get('matches')
	};
}

export const PulseballRankingsPredictorContainer = connect(mapStateToProps, actionCreators)(PulseballRankingsPredictor);