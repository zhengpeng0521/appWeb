import React, { PropTypes } from 'react';
import { connect } from 'dva';

import ResultsComponent from '../../../../components/saas/common/resulutPage/ResultsComponent.jsx';

function ResultsPage({location, dispatch, results}) {
	
    const {	
		
		resultType,
		
	} = results;

	
	let props = {
		resultType,
	}
	
    return (
		<ResultsComponent {...props} />
    );
}

ResultsPage.propTypes = {
  	results: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ results }) {
  return { results };
}

export default connect(mapStateToProps)(ResultsPage);
