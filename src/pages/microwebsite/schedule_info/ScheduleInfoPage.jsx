import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ScheduleInfoComponent from '../../../components/microwebsite/schedule_info/ScheduleInfoComponent.jsx';
import moment from 'moment';

function ScheduleInfoPage({ dispatch, scheduleInfoModel }) {

	let {
		tenantId,
		orgId,
		stuId,

		dataSource,
		resultCount,
		pageIndex,
		pageSize,
        pageCount,
		endLoading,

		calendarType,       //日历类型
		selectedDate,       //选中的日期
		headerDate,         //头部显示的日期
		wStartDate,         //本周开始日期
		wEndDate,           //本周结束日期
		mStartDate,         //本月开始日期
		mEndDate,           //本月结束日期
		dayList,            //有课日期数组

	} = scheduleInfoModel;

	/*上拉加载*/
	function onEndReached(event){
        if(dataSource.length > 0 && !!event){
            if(endLoading){
               return;
            }
            if(pageIndex + 1 <= pageCount){
                dispatch({
                    type : 'scheduleInfoModel/getMoreList',
                    payload : {
                        pageSize,
                        pageIndex : pageIndex + 1
                    }
                })
            }
        }
	}

	/*进入课程详情*/
	function clickToScheduleDetail( item, status ){
		dispatch(
			routerRedux.push({
				pathname : 'schedule_detail',
				query:  {
				},
				state : {
					item		: item || {},
					status      : status || '暂无'
				}
			})
		)
	}

	function selectDateFunc( date, bool ){
		if( !bool ){
			return;
		}
		if( dayList.indexOf( date ) == -1 ){
			dispatch({
				type : 'scheduleInfoModel/updateState',
				payload : {
					selectedDate : date,
					headerDate   : date,
					dataSource   : []
				}
			})
		}else{
			dispatch({
				type : 'scheduleInfoModel/selectDateFunc',
				payload : {
					date
				}
			})
		}
	}

	/*切换日历类型*/
	function calendarTypeChange(){
		let wStartDate = moment( selectedDate ).startOf('week').format('YYYY-MM-DD');
		let wEndDate = moment( selectedDate ).endOf('week').format('YYYY-MM-DD');
		let mStartDate = moment( selectedDate ).startOf( 'month' ).format('YYYY-MM-DD');
		let mEndDate = moment( selectedDate ).endOf('month').format('YYYY-MM-DD');
		if( calendarType == 'week' ){
			dispatch({
				type : 'scheduleInfoModel/calendarTypeChange',
				payload : {
					calendarType : 'month',
					mStartDate,
					mEndDate
				}
			})
		}else{
			dispatch({
				type : 'scheduleInfoModel/calendarTypeChange',
				payload : {
					calendarType : 'week',
					wStartDate,
					wEndDate

				}
			})
		}
	}

	/*上周下周*/
	function WeekChangeClickFunc( type ){
		let newStartDate = undefined,
			newEndDate = undefined;
		if( type == 'lastWeek' ){
			newStartDate = moment( wStartDate ).subtract( 7, 'd' ).format('YYYY-MM-DD');
			newEndDate   = moment( wEndDate ).subtract( 7, 'd' ).format('YYYY-MM-DD');
		}else if( type == 'nextWeek' ){
			newStartDate = moment( wStartDate ).add( 7, 'd' ).format('YYYY-MM-DD');
			newEndDate   = moment( wEndDate ).add( 7, 'd' ).format('YYYY-MM-DD');
		}
		dispatch({
			type : 'scheduleInfoModel/WeekChangeClickFunc',
			payload : {
				wStartDate : newStartDate,
				wEndDate   : newEndDate,
				headerDate : newStartDate
			}
		})
	}

	function monthChangeClickFunc( type ){
		let newStartDate = undefined,
			newEndDate = undefined;
		if( type == 'lastMonth' ){
			newStartDate = moment( mStartDate ).subtract( 1, 'M' ).startOf('month').format('YYYY-MM-DD');
			newEndDate   = moment( mEndDate ).subtract( 1, 'M' ).endOf('month').format('YYYY-MM-DD');
		}else if( type == 'nextMonth' ){
			newStartDate = moment( mStartDate ).add( 1, 'M' ).startOf('month').format('YYYY-MM-DD');
			newEndDate   = moment( mEndDate ).add( 1, 'M' ).endOf('month').format('YYYY-MM-DD');
		}
		dispatch({
			type : 'scheduleInfoModel/monthChangeClickFunc',
			payload : {
				mStartDate : newStartDate,
				mEndDate   : newEndDate,
				headerDate : newStartDate
			}
		})
	}

	let props = {
		dataSource,                 //课程列表
		endLoading,                 //是否到底部


		calendarType,               //日历类型
		selectedDate,               //选中的日期
		headerDate,                 //头部显示的日期
		wStartDate,                 //本周开始日期
		wEndDate,                   //本周结束日期
		mStartDate,                 //本月开始日期
		mEndDate,                   //本月结束日期
		dayList,                    //有课日期数组


		onEndReached,               //上拉加载
		clickToScheduleDetail,      //进入课程详情
		selectDateFunc,             //选中日期
		calendarTypeChange,         //切换日历类型
		WeekChangeClickFunc,        //上周下周
		monthChangeClickFunc,       //上月下月
	}

    return (
		<ScheduleInfoComponent { ...props } />
    );
}


function mapStateToProps({ scheduleInfoModel }) {
  return { scheduleInfoModel };
}

export default connect(mapStateToProps)(ScheduleInfoPage);
