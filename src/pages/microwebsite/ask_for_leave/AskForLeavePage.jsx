import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import moment from 'moment';
import AskForLeaveComponent from '../../../components/microwebsite/ask_for_leave/AskForLeaveComponent.jsx';

function AskForLeavePage({ dispatch, askForLeaveModel }) {

	let {
		selectedTab,              //所选的tab页

		ableDataSource,
		selectedDataSource,       //已选中的课程

		hasDataSource,            //已请假列表

		ableEndLoading,           //加载状态
		ableResultCount,
		ablePageSize,
		ablePageIndex,

		hasEndLoading,            //已请假课程上拉加载
		hasResultCount,
		hasPageSize,
		hasPageIndex,

		timeVisible,
		startTime,
		endTime,

		//请假申请表单
		askLeaveVisible,

	} = askForLeaveModel;

	//改变tab页
	function changeTabs( value ){
		dispatch({
			type : 'askForLeaveModel/updateState',
			payload : {
				selectedTab : value
			}
		})
	}

	//可请假 上拉刷新
	function ableOnEndReached(){
		if( ableDataSource.length >= ableResultCount ){
			if( !ableEndLoading ) {
				dispatch({
					type : 'askForLeaveModel/updateState',
					payload : {
						ableEndLoading : true,
					}
				})
			}
		}else {
			dispatch({
				type : 'askForLeaveModel/getMoreAbleList',
				payload : {
					ablePageSize,
					ablePageIndex : ablePageIndex + 1
				}
			})
		}
	}

	//点击选中行
	function clickSelectRow( item ){
		if( selectedDataSource.indexOf( item.cpdId ) != -1 ){
			let newSelectedDataSource = selectedDataSource.filter( ( value ) => value != item.cpdId );
			dispatch({
				type : 'askForLeaveModel/updateState',
				payload : {
					selectedDataSource : newSelectedDataSource
				}
			})
		}else{
			selectedDataSource.push(
				item.cpdId
			)
			dispatch({
				type : 'askForLeaveModel/updateState',
				payload : {
					selectedDataSource
				}
			})
		}
	}

	//打开时间选择器
	function openTimeSelect(){
		dispatch({
			type : 'askForLeaveModel/updateState',
			payload : {
				timeVisible : true
			}
		})
	}

	//选择开始时间
	function selectStartTime( value ){
		dispatch({
			type : 'askForLeaveModel/updateState',
			payload : {
				startTime : moment( value ).format( 'YYYY-MM-DD' )
			}
		})
	}

	//选择结束时间
	function selectEndTime( value ){
		dispatch({
			type : 'askForLeaveModel/updateState',
			payload : {
				endTime : moment( value ).format( 'YYYY-MM-DD' )
			}
		})
	}

	//完成选择时间
	function selectTimeSuccess(){
		if( !!startTime && !!endTime ){
			dispatch({
				type : 'askForLeaveModel/searchAbleList',
				payload : {
					startTime, endTime
				}
			})
		}else{
			Toast.info( '请选择开始时间或结束时间', 1 )
		}
	}

	//取消选择时间
	function selectTimeCancel(){
		dispatch({
			type : 'askForLeaveModel/updateState',
			payload : {
				timeVisible : false,
				startTime   : undefined,
				endTime     : undefined
			}
		})
	}

	//点击打开申请请假表单
	function clickToOpenAskForLeave(){
		if( selectedDataSource.length > 0 ){
			dispatch({
				type : 'askForLeaveModel/updateState',
				payload : {
					askLeaveVisible : true
				}
			})
		}else{
			Toast.info( '请选择至少一项课程请假', 1 )
		}
	}

	//提交请假申请
	function clickToSaveAskForLeave( values ){
		let info = [];
		ableDataSource.map(function( item, index ){
			if( selectedDataSource.indexOf( item.cpdId ) != -1 ){
				info.push( item );
			}
		})
		dispatch({
			type : 'askForLeaveModel/clickToSaveAskForLeave',
			payload : {
				reason : values.reason,
				info   : JSON.stringify(info)
			}
		})
	}

	//取消请假申请
	function clickToCancelAskForLeave(){
		dispatch({
			type : 'askForLeaveModel/updateState',
			payload : {
				askLeaveVisible : false
			}
		})
	}

	//已请假课程上拉加载
	function hasOnEndReached(){
		if( hasDataSource.length >= hasResultCount ){
			if( !hasEndLoading ) {
				dispatch({
					type : 'askForLeaveModel/updateState',
					payload : {
						hasEndLoading : true,
					}
				})
			}
		}else {
			dispatch({
				type : 'askForLeaveModel/getMoreHasList',
				payload : {
					hasPageSize,
					hasPageIndex : hasPageIndex + 1
				}
			})
		}
	}

	function backToPersonCenter(){
		dispatch(
			routerRedux.push({
				pathname : '/person_center',
				query : {
					tenantId 	: payload.tenantId,
					orgId 		: payload.orgId,
				}
			})
		)
	}
	let props = {
		selectedTab,             //所选的tab页

		ableDataSource,
		selectedDataSource,      //已选中的课程

		hasDataSource,           //已请假列表

		changeTabs,              //改变tab页

		timeVisible,
		startTime,
		endTime,

		//请假申请表单
		askLeaveVisible,


		ableEndLoading,          //加载状态
		ableOnEndReached,        //上拉刷新
		clickSelectRow,          //点击选中行
		openTimeSelect,          //打开时间选择器
		selectStartTime,         //选择开始时间
		selectEndTime,           //选择结束时间
		selectTimeSuccess,       //完成选择时间
		selectTimeCancel,        //取消选择时间

		clickToOpenAskForLeave,  //点击打开申请表单
		clickToSaveAskForLeave,  //提交请假申请
		clickToCancelAskForLeave,  //取消请假申请

		//已请假列表
		hasOnEndReached,         //上拉加载
		hasEndLoading,           //加载状态

		backToPersonCenter

	}

    return (
		<AskForLeaveComponent { ...props } />
    );
}


function mapStateToProps({ askForLeaveModel }) {
  return { askForLeaveModel };
}

export default connect(mapStateToProps)(AskForLeavePage);
