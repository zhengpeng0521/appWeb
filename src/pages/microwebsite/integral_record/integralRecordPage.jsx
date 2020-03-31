import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import IntegralRecordComponent from '../../../components/microwebsite/integral_record/integralRecordComponent.jsx';

function integralRecordPage({ dispatch, integralRecordModel }) {
	
	let {
		tenantId,
		orgId,
		stuId,

		dataSource,          //合同列表数据
		resultCount,
		pageIndex,
		pageSize,
		endLoading,          //是否到底部
		allData,
		refreshing

	} = integralRecordModel;

	/*下拉加载*/
	function onEndReached(){
		if( dataSource.length >= resultCount ){
			if( !endLoading ) {
				dispatch({
					type : 'integralRecordModel/updateState',
					payload : {
						endLoading : true
					}
				})
			}
		}else {
			dispatch({
				type : 'integralRecordModel/getMoreList',
				payload : {
					pageSize,
					pageIndex : pageIndex + 1
				}
			})
		}
	}
	
  // 上拉刷新
	function onRefresh () {
		console.log(47, stuId)
		dispatch({
			type : 'integralRecordModel/updateState',
			payload : {
				refreshing : true
			}
		})

		dispatch({
			type : 'integralRecordModel/initClassRecordList',
			payload : {
				// tenantId 	: tenantId,
				// orgId 		: orgId,
				tenantId 	: window.location.href.split('tenantId=')[1].split('&')[0],
				orgId 		: window.location.href.split('orgId=')[1].split('&')[0],
				stuId       : window.location.href.split('stuId=')[1].split('&')[0],
				pageIndex   : 0,
				pageSize    : 20,
				refreshing : true
			}
		})
  }


	let props = {
		dataSource,             //列表数据
		endLoading,             //是否到底部

		onEndReached,           //下拉加载
		onRefresh,				// 上拉刷新
		refreshing,
		allData
	}

	return (
		<IntegralRecordComponent { ...props } />
	);
}


function mapStateToProps({ integralRecordModel }) {
  return { integralRecordModel };
}

export default connect(mapStateToProps)(integralRecordPage);
