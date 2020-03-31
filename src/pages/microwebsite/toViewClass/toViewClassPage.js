import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroToViewClassComponent from '../../../components/microwebsite/toViewClass/toViewClassComponent.jsx';

function MicroToViewClassPage({location, dispatch, microToViewClass }) {
	
	let  {
		
	} = microToViewClass;
	
	let props = {

	}
	
    return (
		<MicroToViewClassComponent {...props} />
    );
}

MicroToViewClassPage.propTypes = {
  	microToViewClass: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ microToViewClass }) {
  return { microToViewClass };
}

export default connect(mapStateToProps)(MicroToViewClassPage);
