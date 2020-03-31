import React, { PropTypes } from 'react';
import { connect } from 'dva';
import FlowInfoComponent from '../../../../components/weixin/commonComponent/flowIntoComponent/flowIntoComponent.js';

function FlowIntoPage({location, dispatch, flow_into}) {
	
	let {
		
		requestMark,
		defaultStyle,
		externalLinks,
		showAni,
		aniName,
		
	} = flow_into;
	
	function dp(name, param) {
		dispatch({
			type : `flow_into/${name}`,
			payload : {
				...param
			}
		})
	}

	let props = {
		dp, requestMark, defaultStyle, externalLinks, showAni, aniName,
	}
		
    return (
		<FlowInfoComponent {...props} />
	);
}

FlowIntoPage.propTypes = {
    flow_into: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ flow_into }) {
    return { flow_into };
}

export default connect(mapStateToProps)(FlowIntoPage);
