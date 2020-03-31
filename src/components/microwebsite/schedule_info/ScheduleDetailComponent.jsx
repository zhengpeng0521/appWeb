import React from 'react';
import styles from './ScheduleDetailComponent.less';
import { WhiteSpace, WingBlank, Icon, Accordion, Button } from 'antd-mobile';
import moment from 'moment';

function ScheduleDetailComponent({
	item,
	status,
    loading,

    cancelOrderClass,
}){
	let stuType = item.stuType == '1' ? '上课' : item.stuType == '2' ? '补课' : item.stuType == '3' ? '试听' : '暂无';
	let time = !!item.studyDate && !!item.startTime && !!item.endTime && item.studyDate + ' ' + item.startTime + ' ~ ' + item.endTime || '暂无';
	function getScheduleDetailItem( label , value = '暂无', status, color ){
		return (
			<div className = { styles.js_modify_div }>
				<WingBlank>
					<div className = { styles.js_general_base_div } style = {{ border : status ? 'none' : '' }} >
						<div className = { styles.js_modify_left_title_div } style={!!color ? {color: color} : {}}>{ label + ' : ' }&nbsp;</div>
						<div className = { styles.js_modify_right_title_div } style={!!color ? {color: color} : {}}>
							{ value }
						</div>
					</div>
				</WingBlank>
			</div>
		)
	}

	return(
		<div className = { styles.schedule_detail_wrap }>
			<div className = { styles.js_modify_div } style = {{ marginTop : '30px' }}>
				<Accordion className = 'schedule_accordion'>
					<Accordion.Panel
						header = { <p><span style = {{ color : '#999', fontSize : '28px' }}>课程 :&nbsp;&nbsp;</span><span style = {{ color : '#333', fontSize : '28px' }}>{ item.courseName || '暂无' }</span></p> }
					>
						{ !!item.courseIntro && '课程介绍 : ' + item.courseIntro || '暂无'}
					</Accordion.Panel>
				</Accordion>
			</div>
			{ getScheduleDetailItem( '教室', item.roomName, true ) }
			{ getScheduleDetailItem( '主教', item.mtNames ) }
			{ getScheduleDetailItem( '助教', item.atNames ) }
            { getScheduleDetailItem( '上课主题', item.title ) }
			{ getScheduleDetailItem( '课程类型', stuType ) }
			{ getScheduleDetailItem( '课程状态', status ) }
			{ getScheduleDetailItem( '开课校区', item.orgName ) }
			{ getScheduleDetailItem( '上课时间', time ) }
			{item.peopleType == 1 ? getScheduleDetailItem( '提示', '当前课程不可取消约课', false, '#FF7058' ) : null}
			{/* {item.checked ? getScheduleDetailItem( '提示', '当前课程不可取消约课', false, '#FF7058' ) : null} */}
			{/*
				<Button type="primary" className={styles.class_detail_btn} disabled={item.checked || loading} loading={loading} onClick={cancelOrderClass}>取消预约</Button>
			 */}
		</div>
    );
}

export default ScheduleDetailComponent;
