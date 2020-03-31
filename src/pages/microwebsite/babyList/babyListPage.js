import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import { Toast } from 'antd-mobile';

import MicroBabyListComponent from '../../../components/microwebsite/babyList/babyListComponent.jsx';

function MicroBabyListPage({location, dispatch, microBabyList }) {
	
	let  {
		
		babyList,
		getHasCRM,
		vipBabyList,
		
	} = microBabyList;
	
	function pushBabyInfo(type, id) {
		dispatch(
			routerRedux.push({
				pathname : '/microModifyBabyInfo',
				query:  {
					type 		: type,
					orgId 		: microBabyList.orgId,
					parentId 	: microBabyList.parentId,
					tenantId 	: microBabyList.tenantId,
					babyId 		: id,
					routerSource: 'microBabyList',
				},
				state : {
					hasCRM		: microBabyList.hasCRM,
					hasCrmParent: microBabyList.hasCrmParent,
				}
			})
		)
	}
	
	//跳转到baby详情
	function touchBabyRowFunction(item) {	
		if(item == 0 && item.stuSource == undefined) {
			pushBabyInfo('0', item.id);
		} else {
			if(item.stuSource == '1') {
				pushBabyInfo('1', item.id);
			} else {
				Toast.info('只能修改自己添加的学员');
			}
		}
	}

	let props = {
		babyList,
		getHasCRM,
		vipBabyList,
		touchBabyRowFunction,
	}
	
    return (
		<MicroBabyListComponent {...props} />
    );
}

MicroBabyListPage.propTypes = {
  	microBabyList: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ microBabyList }) {
  return { microBabyList };
}

export default connect(mapStateToProps)(MicroBabyListPage);
