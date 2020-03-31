import React from 'react';
import styles from './AskForLeaveComponent.less';
import { WhiteSpace, List, WingBlank, Icon, Button, ListView, Tabs, Badge, Checkbox, Modal, DatePicker, TextareaItem } from 'antd-mobile';
import PlaceHolderComponent from '../../common/place_holder/PlaceHolderComponent';
import { createForm } from 'rc-form';
import moment from 'moment';
const TabPane = Tabs.TabPane;
const CheckboxItem = Checkbox.CheckboxItem;

function AskForLeaveComponent({
	selectedTab,              //所选的tab页

	ableDataSource,           //可请假列表
	selectedDataSource,       //已选中的课程

	hasDataSource,            //已请假列表

	//时间选择
	timeVisible,
	startTime,
	endTime,

	//请假申请表单
	askLeaveVisible,

	changeTabs,              //改变tab页

	ableEndLoading,          //加载状态
	ableOnEndReached,        //上拉刷新
	clickSelectRow,          //选中行
	openTimeSelect,          //打开时间选择器
	selectStartTime,         //选择开始时间
	selectEndTime,           //选择结束时间
	selectTimeSuccess,       //完成选择时间
	selectTimeCancel,        //取消选择时间

	clickToOpenAskForLeave,  //点击打开申请表单
	clickToSaveAskForLeave,  //提交请假申请
	clickToCancelAskForLeave, //取消请假申请

	//已请假列表
	hasOnEndReached,         //上拉加载
	hasEndLoading,           //加载状态

	backToPersonCenter,      //点击返回个人主页

	form : {
		getFieldProps,
		getFieldsValue,
		resetFields,
	}

}){

	//提交请假申请
	function clickToSaveAskForLeaveAction(){
		let values = getFieldsValue();
		clickToSaveAskForLeave( values )
	}

	const ds = new ListView.DataSource({
        rowHasChanged : ( r1, r2 ) => r1 !== r2
    });

	const data = ds.cloneWithRows( ableDataSource );
	const dataTwo = ds.cloneWithRows( hasDataSource );

	//可请假列表
    function renderRow ( rowData, sectionID, rowID ) {
		return (
			<div className = { styles.render_row } key = { 'render_row_' + rowID } onClick = { () => clickSelectRow( rowData ) }>
				{ selectedDataSource.indexOf( rowData.cpdId ) != -1 ? <div className = { styles.select } ></div> : <div className = { styles.not_select } ></div> }
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >学员姓名 :</span>
					<span className = { styles.render_row_item_value } >{ rowData.stuName || '无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >课程名称 :</span>
					<span className = { styles.render_row_item_value } >{ rowData.courseName || '无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >上课时间 :</span>
					<span className = { styles.render_row_item_value } >
						{ !!rowData.studyDate && !!rowData.startTime && !!rowData.endTime && ( rowData.studyDate + ' ' + rowData.startTime + ' ~ ' + rowData.endTime ) || '无' }
					</span>
				</p>
			</div>
		);
    }

	/*列表之间的间隙*/
	function renderSeparator( sectionID, rowID ){
		return (
			<div className = { styles.render_separator } key = { 'render_separator_' + rowID }></div>
		)
	}

	//已请假列表
	function renderRowTwo ( rowData, sectionID, rowID ) {
		let status = rowData.auditStatus;
		return (
			<div
				className = { styles.render_row_two }
				style = {{ borderColor : status == '1' ? '#5d9cec' : status == '2' ? '#d41318' : status == '3' ? '#88c70a' : status == '4' ? '#cccccc' : '' }}
				key = { 'render_row_' + rowID }
			>
				<p className = { styles.has_leave_status }
					style = {{ color : status == '1' ? '#5d9cec' : status == '2' ? '#d41318' : status == '3' ? '#88c70a' : status == '4' ? '#cccccc' : '' }}
				>
					{ status == '1' ? '待审核' : status == '2' ? '已驳回' : status == '3' ? '已通过' : status == '4' ? '已过期' : '' }
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >学员姓名 :</span>
					<span className = { styles.render_row_item_value } >
						{ rowData.stuName || '无' }
					</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >请假课程 :</span>
					<span className = { styles.render_row_item_value } >{ rowData.courseName || '无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >上课时间 :</span>
					<span className = { styles.render_row_item_value } >
						{ !!rowData.studyDate && !!rowData.studyTimeZone && ( rowData.studyDate + ' ' + rowData.studyTimeZone ) || '无' }
					</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >请假原因 :</span>
					<span className = { styles.render_row_item_value } >{ rowData.reason || '无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >提交时间 :</span>
					<span className = { styles.render_row_item_value } >{ rowData.createTime || '无' }</span>
				</p>
			</div>
		);
    }

	/*列表之间的间隙*/
	function renderSeparatorTwo( sectionID, rowID ){
		return (
			<div className = { styles.render_separator } key = { 'render_separator_two_' + rowID }></div>
		)
	}

	return(
		<div className = { styles.ask_for_leave_wrap }>
			<div className = { styles.ask_for_leave_tabs } >
				<div className = { styles.ask_for_leave_tab } onClick = { () => changeTabs( 'able' ) } >
					可请假
					{ selectedTab == 'able' &&
						<span className = { styles.tab_line } ></span>
					}
				</div>
				<div className = { styles.ask_for_leave_tab } onClick = { () => changeTabs( 'notAble' ) }>
					已请假
					{ selectedTab == 'notAble' &&
						<span className = { styles.tab_line } ></span>
					}
				</div>
			</div>
			{ selectedTab == 'able' &&
				<div className = { styles.leave_able_time_select }>
					<span>{ !!startTime && !!endTime && startTime + ' ~ ' + endTime || '全部' }</span>
					<span className = { styles.time_select_component } onClick = { openTimeSelect } ></span>
				</div>
			}
			{ selectedTab == 'able' &&
				<div className = { styles.leave_able_wrap } >
					{ ableDataSource.length > 0 ?
						<ListView
							className = 'ask_for_leave_list_wrap'
							style = {{ height : 'calc( 100% - 108px )', background : '#f9f9f9' }}
							dataSource = { data }
							renderRow = { renderRow }
							renderSeparator = { renderSeparator }
							renderFooter = { () => <div style={{ padding : 30, textAlign : 'center' }}>{ ableEndLoading ? '已经到底啦~' : '拼了老命加载中...' }</div> }
							pageSize = { 5 }
							scrollRenderAheadDistance = { 500 }
							onEndReached = { ableOnEndReached }
							onEndReachedThreshold = { 50 }
					   />
						:
						<PlaceHolderComponent height = 'calc( 100% - 48px )' tips = '暂无课程数据~' />
					}
					{ timeVisible ?
						<Modal
							className = 'ask_for_leave_modal'
							popup = { true }
							visible = { timeVisible }
							closable = { false }
							maskClosable = { false }
							animationType = "slide-up"
						>
							<div className = { styles.select_time_header } >
								<div className = { styles.selected_title }>选择时间</div>
								<div className = { styles.selected_time_confirm } onClick = { selectTimeSuccess } >完成</div>
								<div className = { styles.selected_time_cancel } onClick = { selectTimeCancel } >取消</div>
							</div>
							<List className="date-picker-list" style={{ backgroundColor: 'white' }}>
								<DatePicker
									mode="date"
									minDate = { moment() }
									value = { !!startTime && moment( startTime ) || '' }
									onChange = { selectStartTime }
								>
									<List.Item arrow = 'horizontal'>开始时间</List.Item>
								</DatePicker>
								<DatePicker
									mode="date"
									minDate = { moment() }
									value = { !!endTime && moment( endTime ) || '' }
									onChange = { selectEndTime }
								>
									<List.Item arrow = 'horizontal'>结束时间</List.Item>
								</DatePicker>
							</List>
						</Modal>
						:
						null
					}
					{ askLeaveVisible &&
						<Modal
							className = 'ask_for_leave_modal'
							popup = { true }
							visible = { askLeaveVisible }
							closable = { false }
							maskClosable = { false }
							animationType = "slide-up"
						>
							<p className = 'ask_for_leave_input' >
								<TextareaItem
									{ ...getFieldProps('reason') }
									rows = { 3 }
									placeholder = "请输入请假原因( 1 ~ 50字 )"
								/>
							</p>
							<div className = { styles.save_ask_for_btn } onClick = { clickToSaveAskForLeaveAction } >提交</div>
							<div className = { styles.cancel_ask_for_btn } onClick = { clickToCancelAskForLeave } >取消</div>
						</Modal>
					}
					<Modal
						className = 'ask_for_leave_modal'
						popup = { true }
						visible = { false }
						closable = { false }
						maskClosable = { false }
						animationType = "slide-up"
					>
						<div className = { styles.success_result_wrap } >
							<div className = { styles.save_success_tip } >
								<div className = { styles.tip_success } >提交成功</div>
								<div className = { styles.tip_content } >请耐心等待处理结果!</div>
							</div>
							<div className = { styles.back_to_btn } onClick = { backToPersonCenter } >返回个人主页</div>
						</div>
					</Modal>
				</div>
			}
			{ selectedTab == 'able' &&
				<div className = { styles.ask_for_leave_btn_wrap } >
					<div className = { styles.ask_for_leave_btn_text }>已选 :<span>{ selectedDataSource.length || 0 }</span></div>
					<div className = { styles.ask_for_leave_btn } onClick = { clickToOpenAskForLeave } >申请请假</div>
				</div>
			}
			{ selectedTab == 'notAble' &&
				<div className = { styles.leave_not_able_wrap }>
					{ hasDataSource.length > 0 ?
						<ListView
							className = 'contract_list_view_wrap'
							style = {{ height : '100%' }}
							dataSource = { dataTwo }
							renderRow = { renderRowTwo }
							renderSeparator = { renderSeparatorTwo }
							renderFooter = { () => <div style={{ padding : 30, textAlign : 'center' }}>{ hasEndLoading ? '已经到底啦~' : '拼了老命加载中...' }</div> }
							pageSize = { 5 }
							scrollRenderAheadDistance = { 500 }
							onEndReached = { hasOnEndReached }
							onEndReachedThreshold = { 50 }
					   />
						:
						<PlaceHolderComponent tips = '暂无请假记录~' />
					}
				</div>
			}
		</div>
	)
}

export default createForm()(AskForLeaveComponent);
