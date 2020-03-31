import React, { PropTypes } from 'react';
import { connect } from 'dva';


import MicroModifyComponent from '../../../components/microwebsite/modifyBabyInfo/modifyBabyComponent.jsx';

function MicroModifyBabyInfo({location, dispatch, microModifyBabyInfo }) {
	
	let {
				
		modify,
		babyInfo,
		headerUrl,
		saveBaby,
		relationshipList,
		currentSexFemale,
		currentSexMan,
		animating,
		files,
		isModify,
		initWindowHeight
		
	} = microModifyBabyInfo;

	function dp(name, paramter) {
		dispatch({
			type : `microModifyBabyInfo/${name}`,
			payload : {
				...paramter
			}
		})
	}
	
	//删除宝宝信息
	function delectBabyInfoFunction() {
		dp('delectBabyInfo', {});
	}
	
	let props = {
		dp,
		files,
		modify,
		babyInfo,
		saveBaby,
		headerUrl,
		animating,
		currentSexMan,
		currentSexFemale,
		relationshipList,
		delectBabyInfoFunction,
		isModify,
		initWindowHeight
	}
	
    return (
		<MicroModifyComponent {...props}/>
    );
}

MicroModifyComponent.propTypes = {
  	microModifyBabyInfo: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ microModifyBabyInfo }) {
  return { microModifyBabyInfo };
}

export default connect(mapStateToProps)(MicroModifyBabyInfo);
