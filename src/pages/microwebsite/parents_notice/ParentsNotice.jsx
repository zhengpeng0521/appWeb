import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ParentsNoticeComponent from '../../../components/microwebsite/parents_notice/ParentsNoticeComponent.jsx';
function ParentsNotice({ dispatch, parentsNoticeModel }) {

	let {
		tenantId,
		orgId,
		stuId,
		parentId,

		dataSource,          //合同列表数据
		resultCount,
		pageIndex,
		pageSize,
		endLoading,          //是否到底部

	} = parentsNoticeModel;

	/*上拉加载*/
	function onEndReached(){
		if( dataSource.length >= resultCount ){
			if( !endLoading ) {
				dispatch({
					type : 'parentsNoticeModel/updateState',
					payload : {
						endLoading : true,
					}
				})
			}
		}else {
			dispatch({
				type : 'parentsNoticeModel/getMoreList',
				payload : {
					pageSize,
					pageIndex : pageIndex + 1
				}
			})
		}
	}

	function clickToContractDetail( item ){
		dispatch(
			routerRedux.push({
				pathname : '/parents_notice_detail',
				query:  {
					tenantId    : tenantId,
					orgId       : orgId,
					cpdId       : item.cpdId,
					type        : item.type,
					cpStuId     : item.cpStuId,
					cpmId       : item.cpmId,
					parentId
				},
				state : {
					item
				}
			})
		)
	}

	let props = {
		dataSource,             //课程评价列表数据
		endLoading,             //是否到底部

		onEndReached,           //上拉加载
		clickToContractDetail,  //点击进入详情
	}

    return (
		<ParentsNoticeComponent { ...props } />
    );
}


function mapStateToProps({ parentsNoticeModel }) {
  return { parentsNoticeModel };
}

export default connect(mapStateToProps)(ParentsNotice);
