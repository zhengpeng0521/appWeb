import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ClassRecordComponent from '../../../components/microwebsite/class_record/ClassRecordComponent.jsx';

function ClassRecordPage({ dispatch, classRecordModel }) {

	let {
		tenantId,
		orgId,
		stuId,

		dataSource,          //合同列表数据
		resultCount,
		pageIndex,
		pageSize,
		endLoading,          //是否到底部

	} = classRecordModel;

	/*上拉加载*/
	function onEndReached(){
		if( dataSource.length >= resultCount ){
			if( !endLoading ) {
				dispatch({
					type : 'classRecordModel/updateState',
					payload : {
						endLoading : true
					}
				})
			}
		}else {
			dispatch({
				type : 'classRecordModel/getMoreList',
				payload : {
					pageSize,
					pageIndex : pageIndex + 1
				}
			})
		}
	}

	let props = {
		dataSource,             //合同列表数据
		endLoading,             //是否到底部

		onEndReached,           //上拉加载
	}

    return (
		<ClassRecordComponent { ...props } />
    );
}


function mapStateToProps({ classRecordModel }) {
  return { classRecordModel };
}

export default connect(mapStateToProps)(ClassRecordPage);
