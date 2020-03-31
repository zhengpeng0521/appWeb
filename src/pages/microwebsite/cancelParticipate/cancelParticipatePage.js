import React, { PropTypes } from 'react';
import { connect} from 'dva';
import {Toast} from 'antd-mobile';

import MicroCancelParticipateComponent from '../../../components/microwebsite/cancelParticipate/cancelParticipateComponent.jsx';

function MicroCancelParticipatePage({location, dispatch, microCancelParticipate }) {
	
	
	let {
		selectRows,
		data,
	
		
	} = microCancelParticipate;
	
	function dp(name, paramter) {
		dispatch({
			type : `microCancelParticipate/${name}`,
			payload : {
				...paramter
			}
		})
	}
	
	//取消报名
	function cancelParticipateFunction(paramter) {
					
		let tempArr = [];
		for(let idx in selectRows) {
			if(selectRows[idx].isbool) {
				tempArr.push(selectRows[idx]);	
			} 
		}

		if((paramter.why == undefined || paramter.why == "") && tempArr.length == 0) {
			return Toast.info('请至少选择一项', 1);
		} else {
			dp('cancel', {selectRows : tempArr, why : paramter.why});
		}	   
	}
	
	let props = {
		dp,
		data,
		selectRows,
		cancelParticipateFunction,
	}
	
    return (
		<MicroCancelParticipateComponent {...props} />
    );
}

MicroCancelParticipatePage.propTypes = {
  	microCancelParticipate: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ microCancelParticipate }) {
  return { microCancelParticipate };
}

export default connect(mapStateToProps)(MicroCancelParticipatePage);
