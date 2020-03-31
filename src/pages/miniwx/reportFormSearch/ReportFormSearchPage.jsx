import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Toast } from 'antd-mobile';
import ReportFormSearchComponent from '../../../components/miniwx/reportFormSearch/ReportFormSearchComponent';

function ReportFormSearchPage({ dispatch, reportFormSearchModel, refreshState, onSearch }) {
	let {
		timeVisible,                              //搜索框显隐
		startDate,
		endDate,
		timeSelectKey,                            //所选筛选 key值
		timeSelectValue,                          //所选筛选 value值
		timeSelectDisabled,                       //时间禁止选择

		selectedYear,                             //所选年份
		selectedMonth,                            //所选月份

	} = reportFormSearchModel;

	//改变所选时间段
	function changeTimeRange( key, value ){
		if( key !== timeSelectKey ){
			let startDate, endDate;
			let timeSelectKey = key;           //所选key值
			let timeSelectValue = value;       //所选value值
			let timeSelectDisabled = true;     //时间框是否可选
			let currentDate = moment();
			if( key === 'today' ){ //今日
				startDate = currentDate;
				endDate = currentDate;
			}else if( key === 'yesterday' ){ //昨日
				startDate = moment().subtract( 1, 'd' );
				endDate = moment().subtract( 1, 'd' );
			}else if( key === 'lastSeven' ){ //近7日
				startDate = moment().subtract( 7, 'd' );
				endDate = currentDate;
			}else if( key === 'lastThirty' ){ //近30日
				startDate = moment().subtract( 30, 'd' );
				endDate = currentDate;
			}else if( key === 'currentWeek' ){ //本周
				startDate = moment().startOf('week').add( 1, 'days' );
				endDate = moment().endOf('week').add( 1, 'days' );
			}else if( key === 'lastWeek' ){ //上周
				let lastDay = moment().subtract( 7, 'd' ).format('YYYY-MM-DD');
				startDate = moment( lastDay ).startOf('week').add( 1, 'days' );
				endDate = moment( lastDay ).endOf('week').add( 1, 'days' );
			}else if( key === 'currentMonth' ){ //本月
				startDate = moment().startOf('month');
				endDate = moment().endOf('month');
			}else if( key === 'lastMonth' ){ //上月
				let lastDay = moment().subtract( 1, 'M' ).format('YYYY-MM-DD');
				startDate = moment( lastDay ).startOf('month');
				endDate = moment( lastDay ).endOf('month');
			}else if( key === 'userDefined' ){ //自定义
				timeSelectDisabled = false;
				startDate = undefined;
				endDate = undefined;
			}
			dispatch({
				type : 'reportFormSearchModel/updateState',
				payload : {
					timeSelectKey, timeSelectValue, startDate, endDate, timeSelectDisabled
				}
			})
		}
	}

	//改变开始时间
	function changeStartDate( date ){
		dispatch({
			type : 'reportFormSearchModel/updateState',
			payload : {
				startDate : date
			}
		})
	}

	//改变结束时间
	function changeEndDate( date ){
		dispatch({
			type : 'reportFormSearchModel/updateState',
			payload : {
				endDate : date
			}
		})
	}

	//选择年份
	function changeYearDate( date ){
		dispatch({
			type : 'reportFormSearchModel/updateState',
			payload : {
				selectedYear : date
			}
		})
	}

	//选择月份
	function changeMonthDate( date ){
		dispatch({
			type : 'reportFormSearchModel/updateState',
			payload : {
				selectedMonth : date
			}
		})
	}

	//点击取消搜索
	function clickToCancel(){
		dispatch({
			type : 'reportFormSearchModel/updateState',
			payload : {
				timeVisible : false
			}
		})
		!!refreshState && refreshState({ timeVisible : false })
	}

	//点击进行搜索
	function clickToSearch(){
		if( timeSelectKey === 'yearAndMonth' ){  //通过年月份搜索
			if( !selectedYear ){
				Toast.info( '请选择年份', 1 ); return;
			}
			let value = selectedYear[0] + '年' + ( !!selectedMonth && selectedMonth[0] + '月' || '' );
			dispatch({
				type : 'reportFormSearchModel/clickToSearchByYear',
				payload : {
				}
			})
			//年月份时单独处理selectedValue
			!!refreshState && refreshState({ timeSelectValue : value,  });

		}else{ //其他条件 通过startDate, endDate搜索
			if( !startDate || !endDate ){
				Toast.info( '请选择开始时间或结束时间', 1 ); return;
			}
			dispatch({
				type : 'reportFormSearchModel/clickToSearch',
				payload : {
				}
			})
			!!refreshState && refreshState({ timeSelectValue })
		}
		!!onSearch && onSearch({ timeVisible  : false, startDate, endDate, timeSelectKey, selectedYear, selectedMonth })
	}

	//报表首页component所需参数
	let reportFormSearchComponentProps = {

		timeVisible,                              //搜索框显隐
		startDate,
		endDate,
		timeSelectKey,                            //所选筛选 key值
		timeSelectValue,                          //所选筛选 value值
		timeSelectDisabled,                       //时间禁止选择

		selectedYear,                             //所选年份
		selectedMonth,                            //所选月份

		changeTimeRange,                          //改变时间范围
		changeStartDate,                          //改变开始时间
		changeEndDate,                            //改变结束时间

		changeYearDate,                           //选择年份
		changeMonthDate,                          //选择月份

		clickToCancel,                            //点击取消搜索
		clickToSearch,                            //点击进行搜索
	}

    return (
		<ReportFormSearchComponent { ...reportFormSearchComponentProps } />
    );
}


function mapStateToProps({ reportFormSearchModel }) {
  return { reportFormSearchModel };
}

export default connect( mapStateToProps )( ReportFormSearchPage );
