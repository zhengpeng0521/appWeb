import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Toast } from 'antd-mobile';
import ReportIndexComponent from '../../../components/miniwx/reportIndex/ReportIndexComponent.jsx';
import ReportFormSearchPage from '../reportFormSearch/ReportFormSearchPage';                       //时间筛选框

function ReportIndexPage({ dispatch, reportIndexModel }) {
	let {
		orgName,

		sellerJobList,                     //销售工作表 列表数据
		sellerPerfortList,                 //销售业绩表 列表数据
		stuUseClassList,                   //学员消课表 列表数据
		stuCheckList,                      //学员考勤表 列表数据

		timeVisible,                       //搜索框显隐
		startDate,
		endDate,
		timeSelectKey,                     //所选筛选 key值
		timeSelectValue,                   //所选筛选 value值

		selectedYear,                      //所选年份 ( timeSelectKey yearAndMonth有值 )
		selectedMonth,                     //所选月份 ( timeSelectKey yearAndMonth有值 )

        wetheropen,                        //是否开通报表


	} = reportIndexModel;

	//点击是否显示 时间选择框
	function clickToSelectTime(){
		dispatch({
			type : 'reportIndexModel/updateState',
			payload : {
				timeVisible : !timeVisible
			}
		})
		dispatch({
			type : 'reportFormSearchModel/openTimeSelectModal',
			payload : {
				timeVisible : !timeVisible,
				startDate, endDate, timeSelectKey, timeSelectValue,
				selectedYear, selectedMonth,
			}
		})
	}

	//更新 父组件数据状态
	function refreshState( values ){
		dispatch({
			type : 'reportIndexModel/updateState',
			payload : {
				...values
			}
		})
	}

	//从搜索框点击搜索
	function onSearch( values ){
		dispatch({
			type : 'reportIndexModel/onSearchToList',
			payload : { values }
		})
	}

	//点击跳转至报表详情页
	function clickToReportDetail( item ){
		//根据bigKey 判断传入url
		let url = undefined,
			urlByYear = undefined,
			selectLabel = undefined;
		if( item.bigKey === 'workReport' ){                 //销售工作表
			url = '/reportDetail/querySellerJobDetailListSe';
			urlByYear = '/reportDetail/querySellerJobDetailListYe';
			selectLabel = '姓名';
		}else if( item.bigKey === 'performanceReport'){     //销售业绩表
			url = '/reportDetail/querySellerPerforDetailListSe';
			urlByYear = '/reportDetail/querySellerPerforDetailListYe';
			selectLabel = '姓名';
		}else if( item.bigKey === 'stuUseReport' ){         //学员消课表
			url = '/reportDetail/queryStuCostPeriodDetailListSe';
			urlByYear = '/reportDetail/queryStuCostPeriodDetailListYe';
			selectLabel = '课程名称';
		}else if( item.bigKey === 'stuAttendanceReport' ){  //学员考勤表
			url = '/reportDetail/queryStuCheckDetailListSe';
			urlByYear = '/reportDetail/queryStuCheckDetailListYe';
			selectLabel = '课程名称';
		}
        if(item.smallKey=='attendanceRate' || item.smallKey=='absentmNum'  ){  //出勤率和旷课数没有详情页

        }else{
            dispatch(
                routerRedux.push({
                    pathname : '/reportDetail',
                    state : {
                        currentItem : item,       //报表详情所需 数据
                        startDate   : !!startDate && startDate.format('YYYY-MM-DD') || undefined,
                        endDate     : !!endDate && endDate.format('YYYY-MM-DD') || undefined,
                        selectValue : item.name,
                        selectLabel : selectLabel,
                        timeSelectKey, timeSelectValue, selectedYear, selectedMonth,
                        url, urlByYear
                    }
                })
            )
        }

	}
    //点击列表变色
    function clickToReportTouchstart(name){
        changeColor('#f8f8f8', name);
    }
    function clickToReportTouchEnd(name){
        changeColor('#fff', name);
    }

    function changeColor(c, name) {
        let e = document.getElementById(name);
        e.style.backgroundColor = c;
    }

	//报表首页component所需参数
	let reportIndexComponentProps = {
		sellerJobList,                       //销售工作表 列表数据
		sellerPerfortList,                   //销售业绩表 列表数据
		stuUseClassList,                     //学员消课表 列表数据
		stuCheckList,                        //学员考勤表 列表数据

		timeVisible,                         //搜索框显隐
		startDate,
		endDate,
		timeSelectKey,                       //所选筛选 key值
		timeSelectValue,                     //所选筛选 value值

		clickToSelectTime,                   //点击是否显示 时间选择框
		clickToReportDetail,                 //点击跳转至报表详情

        orgName,


        clickToReportTouchstart,            //手指触摸列表
        clickToReportTouchEnd,              //手指触摸离开


        wetheropen,                         //是否开通报表

	}

	//报表首页 时间筛选框参数
	let reportFormSearchPageProps = {
		refreshState,           //刷新父组件 数据
		onSearch,               //点击搜索
	}

    return (
		<div>
  			<ReportIndexComponent { ...reportIndexComponentProps } />
  			<ReportFormSearchPage { ...reportFormSearchPageProps } />
   		</div>
    );
}


function mapStateToProps({ reportIndexModel }) {
  return { reportIndexModel };
}

export default connect( mapStateToProps )( ReportIndexPage );
