import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ParentsNoticeDetailComponent from '../../../components/microwebsite/parents_notice/ParentsNoticeDetailComponent.jsx';
// import { Toast, Popup } from 'antd-mobile';
function ParentsNoticeDetail({ dispatch, parentsNoticeDetailModel }) {

	let {
		tenantId,
		orgId,
		cpdId,
		cpmId,
		type,
		cpStuId,
		parentId,
		currentItem,
		parentEvaluateInfo,

		// evaluateVisible,        //评价modal visible
		// score,                  //评价等级

		// resetNum,               //清空评价等级
		// picList
	} = parentsNoticeDetailModel;

	//点击评价
	function clickToEvaluate() {
		// dispatch({
		// 	type: 'parentsNoticeDetailModel/updateState',
		// 	payload: {
		// 		evaluateVisible: true,
		// 		picList:[]
		// 	}
		// })
		dispatch(
			routerRedux.push({
				pathname : '/evaluate',
				query:  {
					tenantId,
					orgId,
					cpdId,
					type,
					cpStuId,
					cpmId,
					parentId
				},
				state : {
					item : currentItem
				}
			})
		)
	}

	//得到评价等级
	// function getNum(value, resetNum) {
	// 	dispatch({
	// 		type: 'parentsNoticeDetailModel/updateState',
	// 		payload: {
	// 			score: value,
	// 			resetNum
	// 		}
	// 	})
	// }

	//点击查看大图
	function clickToPic(arrs, index) {
		dispatch(
			routerRedux.push({
				pathname: '/parent_pic',
				state: {
					arrs, index
				}
			})
		)
	}

	//提交评价
	// function saveInfo(values) {
	// 	dispatch({
	// 		type: 'parentsNoticeDetailModel/saveInfo',
	// 		payload: {
	// 			values
	// 		}
	// 	})
	// }

	//取消提交评价
	// function cancelSaveInfo() {
	// 	dispatch({
	// 		type: 'parentsNoticeDetailModel/updateState',
	// 		payload: {
	// 			score: 0,
	// 			evaluateVisible: false,
	// 			resetNum: undefined,
	// 		}
	// 	})
	// }
	// function CHAimg(index){
		
	// 	picList.splice(index, 1)
		
	// 	dispatch({
	// 		type: 'parentsNoticeDetailModel/updateState',
	// 		payload: {
	// 			picList: picList,
	// 		}
	// 	})
	// }
	let props = {
		currentItem,             //当前选中课程的详细信息
		parentEvaluateInfo,      //当前选中的课程评价详情

		clickToEvaluate,         //点击评价
		clickToPic,              //点击查看大图

		// evaluateVisible,        //评价modal visible
		// score,                  //评价等级

		// getNum,                 //得到评价等级
		// saveInfo,               //提交家长评价
		// cancelSaveInfo,         //取消家长评价

		// resetNum,
		// changePathImg,
		// changePathVideo,
		// picList,
		// CHAimg
	}

	return (
		<ParentsNoticeDetailComponent {...props} />
	);
}


function mapStateToProps({ parentsNoticeDetailModel }) {
	return { parentsNoticeDetailModel };
}

export default connect(mapStateToProps)(ParentsNoticeDetail);
