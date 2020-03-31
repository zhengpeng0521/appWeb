import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroVerificationMobileComponent from '../../../../components/saas/common/validationMobile/ValidationMobileComponent.jsx';

function MicroVerificationMobilePage({location, dispatch, verificationMobile}) {
	
    const {	
		s,
		veriText,
		defaultMobile,
		getVeriCodeAction,
		
	} = verificationMobile;

	function dp(name, paramter) {
		dispatch({
			type : `verificationMobile/${name}`,
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
		defaultMobile,
		submitFunction,
		getVeriCodeAction,
		getVerificationCodeFunction,
	}

    return (
		<MicroVerificationMobileComponent {...props} />
    );
}

MicroVerificationMobilePage.propTypes = {
  	verificationMobile: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ verificationMobile }) {
  return { verificationMobile };
}

export default connect(mapStateToProps)(MicroVerificationMobilePage);
