import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Toast } from 'antd-mobile';
import ReportFormDetailComponent from '../../../components/miniwx/reportFormDetail/ReportFormDetailComponent';
import ReportFormSearchPage from '../reportFormSearch/ReportFormSearchPage';                       //时间筛选框
import ReportFormDetailTypeComponent from '../../../components/miniwx/reportFormDetail/ReportFormDetailTypeComponent';

function ReportFormDetailPage({ dispatch, reportFormDetailModel }) {
	let {
		currentItem,                              //报表首页 传入参数
		smallKey,                                 //报表类型

		timeVisible,                              //搜索框显隐
		typeVisible,                              //选择类型框显隐
		selectList,                               //类型下拉列表
		selectLabel,                              //详情label 姓名 课程名称
		selectValue,                              //详情value

		reportDetailInfo,                         //报表详情数据

		startDate,
		endDate,
		timeSelectKey,                            //所选筛选 key值
		timeSelectValue,                          //所选筛选 value值

		selectedYear,                             //所选年份
		selectedMonth,                            //所选月份

	} = reportFormDetailModel;

	//刷新状态
	function refreshState( values ){
		dispatch({
			type : 'reportFormDetailModel/updateState',
			payload : {
				...values
			}
		})
	}

	//从搜索框点击搜索
	function onSearch( values ){
		if( values.timeSelectKey === 'yearAndMonth' ){  //按年月搜索
			dispatch({
				type : 'reportFormDetailModel/onSearchToListByYear',
				payload : { values }
			})
		}else{
			dispatch({
				type : 'reportFormDetailModel/onSearchToList',
				payload : { values }
			})

		}
	}

	//点击筛选类型 查看数据
	function clickToOpenTypeSelect(){
		dispatch({
			type : 'reportFormDetailModel/updateState',
			payload : {
                typeVisible : !typeVisible,
                timeVisible : false,
            }
		})
	}

	//点击时间筛选 框
	function clickToOpenTimeSelect(){
		dispatch({
			type : 'reportFormDetailModel/updateState',
			payload : {
				timeVisible : !timeVisible,
                typeVisible : false,
			}
		})
		dispatch({
			type : 'reportFormSearchModel/openTimeSelectModal',
			payload : {
				timeVisible : !timeVisible,
				startDate, endDate, timeSelectKey, timeSelectValue,
				selectedYear, selectedMonth
			}
		})
	}

	//取消选择类型查看数据
	function clickToCancelTypeSelect(){
		dispatch({
			type : 'reportFormDetailModel/updateState',
			payload : { typeVisible : false }
		})
	}

	//点击下拉列表切换 报表类型
	function clickToChangeType( item ){
		if( smallKey !== item.smallKey ){ //若点击 已选中的报表 则不做操作 否则操作
			if( timeSelectKey === 'yearAndMonth' ){  //年月状态下 选择类型
				dispatch({
					type : 'reportFormDetailModel/clickToChangeTypeByYear',
					payload : {
						item
					}
				})
			}else{  //其他状态下 选择类型
				dispatch({
					type : 'reportFormDetailModel/clickToChangeType',
					payload : {
						item
					}
				})
			}
		}
		dispatch({
			type : 'reportFormDetailModel/updateState',
			payload : {
				selectValue : item.name,
				typeVisible : false
			}
		})
	}

    //从详情返回到列表页面
    function clickReturnToList(){
        dispatch(
                routerRedux.push({
                    pathname : '/reportIndex',

                })
            )
    }

	//详情 参数
	let reportFormDetailProps = {
		timeVisible,                         //搜索框显隐
		typeVisible,                         //选择类型框显隐
		timeSelectKey,                       //所选筛选 key值
		timeSelectValue,                     //所选筛选 value值

		selectLabel,                         //详情label 姓名 课程名称
		selectValue,                         //详情value
		reportDetailInfo,                    //报表详情数据

		//方法
		clickToOpenTypeSelect,               //点击筛选类型 查看数据
		clickToOpenTimeSelect,               //点击时间筛选 框

        clickReturnToList,                   //从详情返回到列表
	}

	//类型选择框 参数
	let reportFormDetailTypeProps = {
		selectList,                          //可选报表数据类型

		//方法
		clickToCancelTypeSelect,             //取消选择类型查看数据
		clickToChangeType,                   //点击下拉列表切换 报表类型
	}

	//报表首页 时间筛选框参数
	let reportFormSearchPageProps = {
		refreshState,           //刷新父组件 数据
		onSearch,               //点击搜索
	}

    return (
		<div style = {{ overflow : 'hidden' }} >
			<ReportFormDetailComponent { ...reportFormDetailProps } />
			<ReportFormSearchPage { ...reportFormSearchPageProps } />
			{ typeVisible && <ReportFormDetailTypeComponent { ...reportFormDetailTypeProps } /> }
		</div>
    );
}

function mapStateToProps({ reportFormDetailModel }) {
  return { reportFormDetailModel };
}

export default connect( mapStateToProps )( ReportFormDetailPage );
