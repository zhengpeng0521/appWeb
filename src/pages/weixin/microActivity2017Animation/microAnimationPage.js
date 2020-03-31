import React, { PropTypes } from 'react';
import { connect } from 'dva';
import styles from '../../../components/common/commonLess/AniCommon.less';
import AnimationComponent from '../../../components/weixin/microActivity2017Animation/MicroAnimation';

function MicroAnimaitonPage({location, dispatch, animation}) {
	
	let {
		
		newClassName,
		
	} = animation;
	
	function dp(name, param) {
		dispatch({
			type : `animation/${name}`,
			payload : {
				...param
			}
		})
	}
	
	let props = {
		dp,
		newClassName,
	}
	
    return (
		<AnimationComponent {...props} />
    );
}

MicroAnimaitonPage.propTypes = {
    animation: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ animation }) {
    return { animation };
}

export default connect(mapStateToProps)(MicroAnimaitonPage);
