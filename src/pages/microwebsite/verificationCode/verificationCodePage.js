import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroVerificationCodeComponent from '../../../components/microwebsite/common/microVerificationCodeComponent.jsx';

function MicroVerificationCodePage({location, dispatch, microvc}) {
	
    const {	
		s,
		veriText,
		getVeriCodeAction,
		
	} = microvc;

	function dp(name, paramter) {
		dispatch({
			type : `microvc/${name}`,
			payload : {
				...paramter	
			}
		})
	}
	
	function submitFunction(paramter) {
		dp('submit', {...paramter});
	}
	
	function getVerificationCodeFunction(paramter) {
		dp('getVerificationCode', {...paramter});
	}
	
	let props = {
		dp,
		s,
		veriText,
		submitFunction,
		getVeriCodeAction,
		getVerificationCodeFunction,
	}

    return (
		<MicroVerificationCodeComponent {...props} />
    );
}

MicroVerificationCodePage.propTypes = {
  	microvc: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ microvc }) {
  return { microvc };
}

export default connect(mapStateToProps)(MicroVerificationCodePage);
