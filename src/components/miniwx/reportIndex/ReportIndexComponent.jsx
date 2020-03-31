import React from 'react';
import styles from './ReportIndexComponent.less';
import { WhiteSpace, List, WingBlank, Icon, Button, ListView, Tabs, Badge, Checkbox, Modal, DatePicker, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';

function ReportIndexComponent({
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

}){

	let totalList = [...sellerJobList, ...sellerPerfortList, ...stuUseClassList, ...stuCheckList];
	return(
		<div className = 'container' >
			<div className = { styles.report_index_header } >
				<div className = { styles.report_index_header_orgName } >{ orgName }</div>
				<div className = { styles.report_index_header_time_select } onClick = { clickToSelectTime } >
					<div className = { styles.time_select_text } >{ timeSelectValue }</div>
					<div className = { timeVisible ? styles.time_select_arrow_up : styles.time_select_arrow } ></div>
				</div>
			</div>
            {wetheropen?
                <div className = { styles.report_index_content } >
                    { totalList && totalList.length>0 && totalList.map(function( item, index ){
                        if(item.smallKey == 'attendanceRate' || item.smallKey == 'absentmNum'){
                            return (
                                <div key = { 'total_report_form_item_' + item.smallKey } className = { styles.report_index_content_item_spc } onClick = { () => clickToReportDetail( item ) } >
                                    <div className = { styles.report_index_content_item_border } >
                                        <div className = { styles.report_index_item_text } >{ item.name || '暂无' }</div>
                                        <div className = { styles.report_index_item_num } >{ item.num || 0 }</div>
                                        { !!item.rate &&
                                            <div className = { item.plus ? styles.report_index_item_percent_plus : styles.report_index_item_percent_minus } >
                                                { (item.plus ? '+' : '') + item.rate }
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        }else{
                            return (
                                <div id={`js${index}`} key = { 'total_report_form_item_' + item.smallKey } className = { styles.report_index_content_item } onClick = { () => clickToReportDetail( item ) }
                                    onTouchStart = {clickToReportTouchstart.bind(this, `js${index}`)}
                                    onTouchEnd = {clickToReportTouchEnd.bind(this, `js${index}`)}
                                >
                                    <div className = { styles.report_index_content_item_border }>
                                        <div className = { styles.report_index_item_text } >{ item.name || '暂无' }</div>
                                        <div className = { styles.report_index_item_num } >{ item.num || 0 }</div>
                                        { !!item.rate &&
                                            <div className = { item.plus ? styles.report_index_item_percent_plus : styles.report_index_item_percent_minus } >
                                                { (item.plus ? '+' : '') + item.rate }
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        }

                    })}
                </div>
                :
                <div className = { styles.report_index_content_blank }>
                    <div className = { styles.report_index_content_img }><img src='https://img.ishanshan.com/gimg/img/2955ca1b12872ebda7b1354d85faecfb'/></div>
                    <p className = { styles.report_index_content_title }>暂无可显示报表，可联系管理员开通</p>
                </div>

            }

		</div>
	)
}

export default createForm()(ReportIndexComponent);
