import React from 'react';
import styles from './ScheduleInfoComponent.less';
import moment from 'moment';
import { WhiteSpace, WingBlank, Icon, Button, ListView, Popover, Carousel } from 'antd-mobile';
import PlaceHolderComponent from '../../common/place_holder/PlaceHolderComponent';

const Item = Popover.Item;

function ScheduleInfoComponent({

	dataSource,
	endLoading,                 //是否到底部

	calendarType,               //日历类型
	selectedDate,               //选中的日期
	headerDate,                 //头部显示的日期
	wStartDate,                 //本周开始日期
	wEndDate,                   //本周结束日期
	mStartDate,                 //本月开始日期
	mEndDate,                   //本月结束日期
	dayList,                    //有课日期数组

	/*方法*/
	onEndReached,               //是否到底部
	clickToScheduleDetail,      //进入课程详情
	selectDateFunc,             //选中日期
	calendarTypeChange,         //切换日历类型
	WeekChangeClickFunc,        //上周下周
	monthChangeClickFunc,       //上月下月
}){
	/*得到月份*/
	function getCurrentMonth( startDate, endDate ){
		let currentMonthArr = [];
		let st = moment( startDate ).startOf( 'week' ).format('YYYY-MM-DD');
		let ed = moment( endDate ).endOf( 'week' ).format('YYYY-MM-DD');
		for( let i = 0; i <= 41; i++ ){
			currentMonthArr.push({
				date : moment( st ).add( i, 'd' ).format('YYYY-MM-DD'),
				day  : moment( st ).add( i, 'd' ).format('D')
			})
		}
		return (
			<ul className = { styles.month_header_content } >
				{
					currentMonthArr && currentMonthArr.map(function( item, index ){
						let isSelected = item.date == selectedDate;
						let isCurrentMonth = moment( startDate ).format('M') == moment( item.date ).format('M');
						return ( <li
									 className = { styles.month_header_item }
									 onClick = { () => selectDateFunc( item.date, isCurrentMonth ) }
									 key = { 'week_content_item_' + item.date }
								 >
									<span
										disabled = { !isCurrentMonth }
										className = { styles.week_header_item_value }
										style = {{ background : isSelected ? '#5D9CEC' : '', color : isSelected ? '#fff' : isCurrentMonth ? '#000' : '#999' }}
									>
										{ item.day }
									</span>
									{ !!dayList && dayList.length > 0 && dayList.indexOf( item.date ) != -1 &&
										<span className = { styles.week_header_item_dot } ></span>
									}
								</li> )
					})
				}
			</ul>
		)
	}

	/*得到星期*/
	function getCurrentWeek( startDate, endDate ){
		let currentWeekArr = [];
		for( let i = 0; i < 7; i++ ){
			currentWeekArr.push({
				date : moment( startDate ).add( i, 'd' ).format('YYYY-MM-DD'),
				day  : moment( startDate ).add( i, 'd' ).format('D')
			})
		}
		return (
			<ul className = { styles.week_header_content } >
				{
					currentWeekArr && currentWeekArr.map(function( item, index ){
						let isSelected = item.date == selectedDate;
						return ( <li
									 className = { styles.week_header_item }
									 onClick = { () => selectDateFunc( item.date, true ) }
									 key = { 'week_content_item_' + item.date }
								 >
									<span
										className = { styles.week_header_item_value }
										style = {{ background : isSelected ? '#5D9CEC' : '', color : isSelected ? '#fff' : '#333' }}
									>
										{ item.day }
									</span>
									{ !!dayList && dayList.length > 0 && dayList.indexOf( item.date ) != -1 &&
										<span className = { styles.week_header_item_dot } ></span>
									}
								</li> )
					})
				}
			</ul>
		)
	}

	const ds = new ListView.DataSource({
        rowHasChanged : ( r1, r2 ) => r1 !== r2
    });

	const data = ds.cloneWithRows( dataSource );

	//课程布局
    function renderRow ( rowData, sectionID, rowID ) {
		let status = undefined;
		let signType = rowData.signType;
		if( rowData.stuType == '1' || rowData.stuType == '2' ){
			status = signType == '1' ? '预约' : signType == '2' ? '排队' : signType == '3' ? '出勤' : signType == '4' ? '请假' : signType == '5' ? '旷课' : signType == '6' ? '取消' : '暂无';
		}else if( rowData.stuType == '3' ){
			status = signType == '1' ? '已预约' : signType == '2' ? '已试听' : signType == '0' ? '取消' : signType == '3' ? '旷课' : '暂无';
		}
		return (
			<div className = { styles.render_row } key = { 'render_row_' + rowID } onClick = { () => clickToScheduleDetail( rowData, status ) }>
				<p className = { styles.render_row_item_status } >{ status || '暂无' }</p>
				<p className = { styles.render_row_item } style = {{ fontSize : '28px', margin : '30px 0 30px 20px', height : '28px' }}>
					<span style = {{ color : '#333' }} >课程 : </span>
					<span style = {{ color : '#333' }} >{ rowData.courseName || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >教室 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.roomName || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >主教 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.mtNames || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >课程类型 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.stuType == '1' ? '上课' : rowData.stuType == '2' ? '补课' : rowData.stuType == '3' ? '试听' : '暂无 	' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >上课时间 : </span>
					<span className = { styles.render_row_item_value } >
						{ ( !!rowData.studyDate && !!rowData.startTime && !!rowData.endTime && rowData.studyDate + ' ' + rowData.startTime + ' ~ ' + rowData.endTime ) || '暂无' }
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

	return(
		<div style = {{ width : '100%', height : '100%' }}>
			{ calendarType == 'week' ?
				<div className = { styles.schedule_week_header }>
					<div className = { styles.schedule_week_change } onClick = { calendarTypeChange }></div>
					<div className = { styles.current_date }>
						<span className = { styles.last_schedule_left } onClick = { () => WeekChangeClickFunc( 'lastWeek' ) } >
							<Icon type = 'left' style = {{ fontSize : '14px', marginRight : '10px', verticalAlign : 'middle' }} />
							上周
						</span>
						{ headerDate }
						<span className = { styles.last_schedule_right } onClick = { () => WeekChangeClickFunc( 'nextWeek' ) } >
							下周
							<Icon type = 'right' style = {{ fontSize : '14px', marginLeft : '10px', verticalAlign : 'middle' }} />
						</span>
					</div>
					<ul className = { styles.week_header } >
						<li className = { styles.week_header_item }>日</li>
						<li className = { styles.week_header_item }>一</li>
						<li className = { styles.week_header_item }>二</li>
						<li className = { styles.week_header_item }>三</li>
						<li className = { styles.week_header_item }>四</li>
						<li className = { styles.week_header_item }>五</li>
						<li className = { styles.week_header_item }>六</li>
					</ul>
					{ getCurrentWeek( wStartDate, wEndDate ) }
			</div>
				:
				<div className = { styles.schedule_month_header }>
					<div className = { styles.schedule_month_change } onClick = { calendarTypeChange }></div>
					<div className = { styles.current_date }>
						<span className = { styles.last_schedule_left } onClick = { () => monthChangeClickFunc( 'lastMonth' ) } >
							<Icon type = 'left' style = {{ fontSize : '14px', marginRight : '10px', verticalAlign : 'middle' }} />
							上月
						</span>
						{ headerDate }
						<span className = { styles.last_schedule_right } onClick = { () => monthChangeClickFunc( 'nextMonth' ) } >
							下月
							<Icon type = 'right' style = {{ fontSize : '14px', marginLeft : '10px', verticalAlign : 'middle' }} />
						</span>
					</div>
					<ul className = { styles.week_header } >
						<li className = { styles.week_header_item }>日</li>
						<li className = { styles.week_header_item }>一</li>
						<li className = { styles.week_header_item }>二</li>
						<li className = { styles.week_header_item }>三</li>
						<li className = { styles.week_header_item }>四</li>
						<li className = { styles.week_header_item }>五</li>
						<li className = { styles.week_header_item }>六</li>
					</ul>
					{ getCurrentMonth( mStartDate, mEndDate ) }
				</div>
			}

			{ dataSource.length > 0 ?
				<ListView
					className = 'schedule_list_view_wrap'
					style = {{ height : calendarType == 'month' && 'calc( 100% - 540px )' }}
					dataSource = { data }
					renderRow = { renderRow }
					renderSeparator = { renderSeparator }
					renderFooter = { () => <div style={{ padding : 30, textAlign : 'center' }}>{ !endLoading ? '已经到底啦~' : '拼了老命加载中...' }</div> }
					pageSize = { 5 }
					scrollRenderAheadDistance = { 500 }
					onEndReached = { onEndReached }
					onEndReachedThreshold = { 50 }
			   />
				:
				<PlaceHolderComponent tips = '暂无课程~' height = { calendarType == 'month' ? 'calc( 100% - 485px )' : 'calc( 100% - 230px )' } />
			}

		</div>
	)
}

export default ScheduleInfoComponent;

