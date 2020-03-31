import React from 'react';
import styles from './ReportFormSearchComponent.less';
import { Picker, List, WhiteSpace, WingBlank, Icon, Button, Checkbox, Modal, DatePicker, Radio } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
const RadioItem = Radio.RadioItem;

function ReportFormSearchComponent({
	timeVisible,                              //搜索框显隐
	startDate,
	endDate,
	timeSelectKey,                            //所选筛选 key值
	timeSelectValue,                          //所选筛选 value值
	timeSelectDisabled,                       //时间禁止选择

	selectedYear,                             //所选年份
	selectedMonth,                            //所选月份

	//方法
	changeTimeRange,                          //改变时间范围
	changeStartDate,                          //改变开始时间
	changeEndDate,                            //改变结束时间

	changeYearDate,                           //选择年份
	changeMonthDate,                          //选择月份

	clickToCancel,                            //点击取消搜索
	clickToSearch,                            //点击进行搜索
}){

	//搜索项 数据源
	let selectArray = [
		{ key : 'today', value : '今日' },
		{ key : 'yesterday', value : '昨日' },
		{ key : 'lastSeven', value : '近7日' },
		{ key : 'lastThirty', value : '近30日' },
		{ key : 'currentWeek', value : '本周' },
		{ key : 'lastWeek', value : '上周' },
		{ key : 'currentMonth', value : '本月' },
		{ key : 'lastMonth', value : '上月' },
		{ key : 'yearAndMonth', value : '年月' },
		{ key : 'userDefined', value : '自定义' },
	];

	let minDate = timeSelectKey === 'userDefined' ? moment().subtract(2, 'months') : '';   //自定义时间只能选择近2个月
	let maxDate = timeSelectKey === 'userDefined' ? moment() : '';                         //自定义时间只能选择近2个月

	//年份数据源
	let yearArrs = [];
	for( let i = Math.floor( moment().format( 'YYYY') ); i >= 2000; i-- ){
		yearArrs.push({
			label : i + '年',
			value : i + ''
		})
	}
	//月份数据源
	let monthArrs = [];
	for( let i = 1; i <= 12; i++ ){
		monthArrs.push({
			label : i + '月',
			value : i + ''
		})
	}

	//阻止冒泡  点击 时间区域框 不关闭
	function clickToCancelStop( e ){
		e.preventDefault();
		e.stopPropagation()
	}

	return(
		<div>
			{ timeVisible &&
				<div className = { styles.report_time_select } onClick = { clickToCancel } >
					<div className = { styles.report_time_select_wrap } onClick = { ( e ) => clickToCancelStop( e ) } >
						<div className = { styles.report_time_select_radio } >
							{ selectArray.map( item => (
								<div
									key = { item.key }
									onClick = { () => changeTimeRange( item.key, item.value ) }
									className = { timeSelectKey === item.key ? 'report_time_select_radio_item report_time_select_radio_item_checked' : 'report_time_select_radio_item' }
								>
									{ item.value }
								</div>
							)) }
						</div>
						{ timeSelectKey !== 'yearAndMonth' &&
							<List className = { timeSelectDisabled ? 'time_disabled report_time_select_time' : 'report_time_select_time' } >
								<div className = { styles.report_time_select_time_item } >
									<DatePicker
										mode = 'date'
										value = { startDate }
										disabled = { timeSelectDisabled }
										onChange = { date => changeStartDate( date ) }
										minDate = { minDate }
										maxDate = { maxDate }
									>
										<List.Item arrow = 'horizontal' >开始时间</List.Item>
									</DatePicker>
								</div>
								<div className = { styles.report_time_select_time_item } >
									<DatePicker
										mode = 'date'
										value = { endDate }
										disabled = { timeSelectDisabled }
										onChange = { date => changeEndDate( date ) }
										minDate = { minDate }
										maxDate = { maxDate }
									>
										<List.Item arrow = 'horizontal' >结束时间</List.Item>
									</DatePicker>
								</div>
							</List>
						}
						{ timeSelectKey === 'yearAndMonth' &&
							<List className = 'report_time_select_time' >
								<div className = { styles.report_time_select_time_item } >
									<Picker
										data = { yearArrs }
										extra = '请选择'
										value = { selectedYear }
										cols = { 1 }
										onChange = { date => changeYearDate( date ) }
									>
										<List.Item arrow = 'horizontal' >年份</List.Item>
									</Picker>
									<Picker
										data = { monthArrs }
										extra = '请选择(非必选)'
										value = { selectedMonth }
										cols = { 1 }
										onChange = { date => changeMonthDate( date ) }
									>
										<List.Item arrow = 'horizontal' >月份</List.Item>
									</Picker>
								</div>
							</List>
						}
						<div className = { styles.report_time_btn_area } >
							<div className = 'report_time_btn_cancel' onClick = { clickToCancel } >
								<Button>取消</Button>
							</div>
							<div className = 'report_time_btn_confirm' onClick = { clickToSearch } >
								<Button>确定</Button>
							</div>
						</div>
					</div>
				</div>
			}
		</div>
	)
}

export default createForm()(ReportFormSearchComponent);
