import React, { PropTypes } from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Toast} from 'antd-mobile';
import MicroConfirmAvtivityComponent from '../../../components/microwebsite/confirmAvtivity/confirmAvtivityComponent.jsx';

function MicroConfirmAvtivityPage({location, dispatch, confirmAvtivity,microModifyBabyInfo  }) {
	
	let {
		
		data,
		isCRM,
		dataSource,
		signStatus,
		showAlertView,
		isSelectVip,
		singleData,
		payMoney,
		showAlertString,
		showAlertOperationString,
		dataStringURL,

	} = confirmAvtivity;

	let {
		isSaveBaby
	} = microModifyBabyInfo
	// console.info('isSaveBaby',isSaveBaby)
	//提交数据
	function dp(name, paramter){
		dispatch({
			type: `confirmAvtivity/${name}`,
			payload : {
				...paramter
			}
		})
	}
	
	//提交报名
	function submitFunction() {		
		if (singleData != undefined && singleData != null && Object.keys(singleData).length > 0 ) {

			if (dataSource && dataSource.vipSet == '1' || dataSource && dataSource.vipSet == 1) {
				if (isSelectVip == undefined) {
					return Toast.info('请选择是否会员', 1);
				} else {
					dp('submit', { dataInfo: singleData, isSelectVip: isSelectVip});
				}
			} else {
				dp('submit', { dataInfo: singleData, isSelectVip: false });
			}
		} else {
			return Toast.info('请至少选择一名学员', 1);
		}
	}
	
	//添加学员
	function touchAddStudentFunction() {
		dispatch(
			routerRedux.push({
				pathname : '/microModifyBabyInfo',
				query:  {
					type 			: 0,
					orgId 			: confirmAvtivity.orgId,
					parentId 		: confirmAvtivity.parentId,
					tenantId 		: confirmAvtivity.tenantId,
				},
				state : {
					hasCRM			: confirmAvtivity.hasCRM,
					hasCrmParent 	: confirmAvtivity.hasCrmParent,
				}
			})
		)
		dispatch({
			type: `microModifyBabyInfo/updateState`,
			payload : {
				isSaveBaby: false
			}
		})
	}

	//跳转到活动详情
	function returnActivityDetailFcuntion () {

		let id = confirmAvtivity.actId;

		if (id != undefined && id != '' && id != null) {
			dispatch(
				routerRedux.push({
					pathname: '/microActivityDetail',
					query: {
						tenantId: confirmAvtivity.tenantId,
						orgId: confirmAvtivity.orgId,
						actId: id,
					},
				})
			)
		} else {
			Toast.info('未获取活动id', 1);
		}
	}
	
	let props = {
		dp,
		data,
		isCRM,
		showAlertView,
		isSelectVip,
		dataSource,
		singleData,
		signStatus,
		submitFunction,
		payMoney,
		showAlertString,
		showAlertOperationString,
		touchAddStudentFunction,
		returnActivityDetailFcuntion,
		dataStringURL,
		isSaveBaby
	}
	
    return (
		<MicroConfirmAvtivityComponent {...props} />
    );
}

MicroConfirmAvtivityPage.propTypes = {
  	confirmAvtivity: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ confirmAvtivity, microModifyBabyInfo }) {
  return { confirmAvtivity, microModifyBabyInfo };
}

export default connect(mapStateToProps)(MicroConfirmAvtivityPage);
