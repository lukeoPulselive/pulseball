import React from 'react';
import RankingsTable from './RankingsTable';
import AddMatch from './AddMatch';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

export const PulseballRankingsPredictor = React.createClass({

	propTypes: {
		rankings: React.PropTypes.object.isRequired
	},

	render: function() {

		return (
			<div>
				<h1>Pulseball Rankings Predictor</h1>
				<RankingsTable rankings={this.props.rankings} />
				<AddMatch {...this.props} />
			</div>	
		);
	}

});

function mapStateToProps(state) {
	return {
		rankings: state.get('rankings')
	};
}

export const PulseballRankingsPredictorContainer = connect(mapStateToProps, actionCreators)(PulseballRankingsPredictor);