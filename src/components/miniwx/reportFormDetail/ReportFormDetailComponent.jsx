//////////////	qsdftyuiozvbnm,./import React from 'react';
import styles from './ReportFormDetailComponent.less';
import { Picker, List, WhiteSpace, WingBlank, Icon, Button, Checkbox, Modal, DatePicker, Radio } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
const RadioItem = Radio.RadioItem;

function ReportFormDetailComponent({
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

    clickReturnToList,                    //返回到列表页面
}){
    let month = undefined;
    if(timeSelectValue.indexOf("月")>=0){
        month = true
    }else{
        month = false
    }
    let compareCon = '';
    if(timeSelectValue == '今日' || timeSelectValue == '自定义' || timeSelectValue == '昨日'){
        compareCon = '较昨日'
    }else if(timeSelectValue == '近7日' || timeSelectValue == '本周' || timeSelectValue == '上周'){
        compareCon = '较上周'
    }else if(timeSelectValue == '近30日' || timeSelectValue == '本月' || timeSelectValue == '上月' || month){
        compareCon = '较上月'
    }else{
        compareCon = '较上年'
    }
	return(
		<div className = 'container' >
			<div className = { styles.report_detail_header } >
				<div className = { styles.report_detail_header_select } style = {{ borderRight : '1px solid #E5E5E5' }} onClick = { clickToOpenTypeSelect } >
					<div className = { styles.time_select_text } >{ selectValue }</div>
					<div className = { typeVisible ? styles.time_select_arrow_up : styles.time_select_arrow } ></div>
				</div>
				<div className = { styles.report_detail_header_select } onClick = { clickToOpenTimeSelect } >
					<div className = { styles.time_select_text } >{ timeSelectValue }</div>
					<div className = { timeVisible ? styles.time_select_arrow_up : styles.time_select_arrow } ></div>
				</div>
			</div>
			<div className = { styles.report_detail_content } >
				<div className = { styles.report_detail_content_header } >
					<div className = { styles.report_detail_content_header_box } >
						<div className = { styles.report_detail_content_header_total } >
							{ reportDetailInfo.totalNum || 0 }
							{ !!reportDetailInfo.rate &&
								<div className = { styles.report_detail_content_header_percent } >
									<div className = { styles.report_detail_content_header_percent_tip } >{compareCon}</div>
										<div className = { !!reportDetailInfo.plus ? styles.report_detail_content_header_percent_num  : styles.report_detail_content_header_percent_num_minus }>
											{ (!!reportDetailInfo.plus ? '+' : '') + reportDetailInfo.rate }
										</div>
								</div>
							}
						</div>
					</div>
				</div>
				<div className = { styles.report_detail_content_scroll } >
					<div className = { styles.report_detail_content_item } style = {{ marginTop : '1.6rem', color : '#333' }} >
						<div className = { styles.report_detail_content_item_name } >{ selectLabel }</div>
						<div className = { styles.report_detail_content_item_num } >{ selectValue }</div>
					</div>
					{ !!reportDetailInfo.results && reportDetailInfo.results.map(function( item, index ){
							return (
								<div className = { styles.report_detail_content_item_list } key = { 'report_detail_item_' + index } >
									<div className = { styles.report_detail_content_item_name } >{ item.name }</div>
									<div className = { styles.report_detail_content_item_num } >{ item.num }</div>
								</div>
							)
						})
					}
				</div>
			</div>

            <div className = { styles.report_detail_content_return }  onClick = { clickReturnToList }>
                <p><img src='https://img.ishanshan.com/gimg/img/c91606d0fc6be2ba3e8660d2c251af90'/></p>
                <p>返回</p>
            </div>

		</div>
	)
}

export default ReportFormDetailComponent;
