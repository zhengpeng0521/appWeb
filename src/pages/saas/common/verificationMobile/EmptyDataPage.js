import React, { PropTypes } from 'react';
import { connect } from 'dva';

import EmptyDataComponent from '../../../../components/saas/common/validationMobile/EmptyDataComponent.jsx';

function EmptyDataPage({location, dispatch, emptyData}) {
	
    const {	

	} = emptyData;

    return (
		<EmptyDataComponent />
    );
}

EmptyDataPage.propTypes = {
  	verificationMobile: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ emptyData }) {
  return { emptyData };
}

export default connect(mapStateToProps)(EmptyDataPage);
