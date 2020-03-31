import React from 'react';
import styles from './OrderClass.less';
import moment from 'moment';
import { WhiteSpace, WingBlank, Icon, Button, ListView, Popover, Carousel, Drawer, List, NavBar, DatePicker } from 'antd-mobile';
import PlaceHolderComponent from '../../common/place_holder/PlaceHolderComponent';

const Item = Popover.Item;

function OrderClass({

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
	summaryQueryFun,

	open,
	position,
	onOpenChangeFun,
	
	openDetail,
	positionDetail,
	detailType,
	lessoNameList,
	onOpenChangeDetail,
	selectItemFun,
	chroseLessonItem,
	submitSerchFun,

	classRoomList,
	chroseClassRoomItem,

	teacherList,
	chroseChiefItem,
	chroseAssistItem,

	chroseClassTimeItem,
	classFullList,
	chroseFullItem,
	changeTime
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
	
	const maxTime = moment('23:59 +0800', 'HH:mm Z').utcOffset(8);
	const minTime = moment('00:00 +0800', 'HH:mm Z').utcOffset(8);

	const sidebarDetail = (
		detailType == 'lessoName' ?
			<div className={styles.sidebar_divDetail}>
				<div className={styles.detail_top}>
					<div onClick={()=>onOpenChangeDetail('lessoName')}>
						<img style={{width:'20px',marginLeft: '20px'}} src="https://img.ishanshan.com/gimg/img/7b0055301eafdfffb73be31cb9db88b7"/>
					</div>
					<div style={{marginLeft: '200px'}}>课程名称</div>
				</div>

				<div className={styles.detailDataList}>
					{
						lessoNameList.map((item, index) => {
							return (
								<div
									className={styles.detailDataItem}
									key={index}
									onClick={() => selectItemFun('lessoName',item)}
								>
									{item.title}
								</div>
							)
						})
					}
				</div>
			</div>
		: detailType == 'classroomName' ?
			<div className={styles.sidebar_divDetail}>
				<div className={styles.detail_top}>
					<div onClick={()=>onOpenChangeDetail('classroomName')}>
						<img style={{width:'20px',marginLeft: '20px'}} src="https://img.ishanshan.com/gimg/img/7b0055301eafdfffb73be31cb9db88b7"/>
					</div>
					<div style={{marginLeft: '200px'}}>教室名称</div>
				</div>

				<div className={styles.detailDataList}>
					{
						classRoomList.map((item, index) => {
							return (
								<div
									className={styles.detailDataItem}
									key={index}
									onClick={() => selectItemFun('classroomName',item)}
								>
									{item.name}
								</div>
							)
						})
					}
				</div>
			</div>
		: detailType === 'chief' ?
			<div className={styles.sidebar_divDetail}>
				<div className={styles.detail_top}>
					<div onClick={()=>onOpenChangeDetail('chief')}>
						<img style={{width:'20px',marginLeft: '20px'}} src="https://img.ishanshan.com/gimg/img/7b0055301eafdfffb73be31cb9db88b7"/>
					</div>
					<div style={{marginLeft: '200px'}}>主教名称</div>
				</div>

				<div className={styles.detailDataList}>
					{
						teacherList.map((item, index) => {
							return (
								<div
									className={styles.detailDataItem}
									key={index}
									onClick={() => selectItemFun('chief',item)}
								>
									{item.name}
								</div>
							)
						})
					}
				</div>
			</div>
		: detailType === 'assist' ?
			<div className={styles.sidebar_divDetail}>
				<div className={styles.detail_top}>
					<div onClick={()=>onOpenChangeDetail('assist')}>
						<img style={{width:'20px',marginLeft: '20px'}} src="https://img.ishanshan.com/gimg/img/7b0055301eafdfffb73be31cb9db88b7"/>
					</div>
					<div style={{marginLeft: '200px'}}>助教名称</div>
				</div>

				<div className={styles.detailDataList}>
					{
						teacherList.map((item, index) => {
							return (
								<div
									className={styles.detailDataItem}
									key={index}
									onClick={() => selectItemFun('assist',item)}
								>
									{item.name}
								</div>
							)
						})
					}
				</div>
			</div>
		: detailType === 'isClassFull' ?
		<div className={styles.sidebar_divDetail}>
		<div className={styles.detail_top}>
			<div onClick={()=>onOpenChangeDetail('isClassFull')}>
				<img style={{width:'20px',marginLeft: '20px'}} src="https://img.ishanshan.com/gimg/img/7b0055301eafdfffb73be31cb9db88b7"/>
			</div>
			<div style={{marginLeft: '200px'}}>是否满班</div>
		</div>

		<div className={styles.detailDataList}>
			{
				classFullList.map((item, index) => {
					return (
						<div
							className={styles.detailDataItem}
							key={index}
							onClick={() => selectItemFun('isClassFull',item)}
						>
							{item.name}
						</div>
					)
				})
			}
		</div>
	</div>
		:
		<div>无数据</div>
		
	)

	const sidebar = (
		<div className={styles.sidebar_div}>
			<div className={styles.selectTop}>
				<div className={styles.form_item}>
					<div className={styles.form_item_label}>课程名称</div>
					<div className={styles.form_item_value}>
					{chroseLessonItem === undefined || chroseLessonItem === {} || chroseLessonItem === null ? 
						<div>
							<span onClick={ ()=>onOpenChangeDetail('lessoName') }>请选择</span>
							<span>
								<img src="https://img.ishanshan.com/gimg/img/7df347afadc9a46ca7763f05548e0781"/>
							</span>
						</div>
						:
						<div>
							<span style={{color: '#5D9CEC'}} onClick={ ()=>onOpenChangeDetail('lessoName') }>{ chroseLessonItem.title }</span>
							<span>
								<img src="https://img.ishanshan.com/gimg/img/7df347afadc9a46ca7763f05548e0781"/>
							</span>
						</div>
					}
					</div>
				</div>

				<div className={styles.form_item}>
					<div className={styles.form_item_label}>教室名称</div>
					<div className={styles.form_item_value}>
						{
							chroseClassRoomItem === undefined || chroseClassRoomItem === {} || chroseClassRoomItem === null ?
							<div>
								<span onClick={ ()=>onOpenChangeDetail('classroomName') }>请选择</span>
								<span>
									<img src="https://img.ishanshan.com/gimg/img/7df347afadc9a46ca7763f05548e0781"/>
								</span>
							</div>
							:
							<div>
								<span style={{color: '#5D9CEC'}} onClick={ ()=>onOpenChangeDetail('classroomName') }>{ chroseClassRoomItem.name }</span>
								<span>
									<img src="https://img.ishanshan.com/gimg/img/7df347afadc9a46ca7763f05548e0781"/>
								</span>
							</div>
						}
					</div>
				</div>

				<div className={styles.form_item}>
					<div className={styles.form_item_label}>主教名称</div>
					<div className={styles.form_item_value}>
						{
							chroseChiefItem === undefined || chroseChiefItem === {} || chroseChiefItem === null ?
							<div>
								<span onClick={ ()=>onOpenChangeDetail('chief') }>请选择</span>
								<span>
									<img src="https://img.ishanshan.com/gimg/img/7df347afadc9a46ca7763f05548e0781"/>
								</span>
							</div>
							:
							<div>
								<span style={{color: '#5D9CEC'}} onClick={ ()=>onOpenChangeDetail('chief') }>{ chroseChiefItem.name }</span>
								<span>
									<img src="https://img.ishanshan.com/gimg/img/7df347afadc9a46ca7763f05548e0781"/>
								</span>
							</div>
						}
					</div>
				</div>

				<div className={styles.form_item}>
					<div className={styles.form_item_label}>助教名称</div>
					<div className={styles.form_item_value}>
						{
							chroseAssistItem === undefined || chroseAssistItem === {} || chroseAssistItem === null ?
							<div>
								<span onClick={ ()=>onOpenChangeDetail('assist') }>请选择</span>
								<span>
									<img src="https://img.ishanshan.com/gimg/img/7df347afadc9a46ca7763f05548e0781"/>
								</span>
							</div>
							:
							<div>
								<span style={{color: '#5D9CEC'}} onClick={ ()=>onOpenChangeDetail('assist') }>{ chroseAssistItem.name }</span>
								<span>
									<img src="https://img.ishanshan.com/gimg/img/7df347afadc9a46ca7763f05548e0781"/>
								</span>
							</div>
						}
					</div>
				</div>

				<div>
					<DatePicker
						mode="time"
						minDate={minTime}
						maxDate={maxTime}
						value={chroseClassTimeItem}
						onChange={(v) =>changeTime('timeClass', v)}
					>
						<List.Item arrow="horizontal">上课时间</List.Item>
					</DatePicker>
				</div>

				<div className={styles.form_item} style={{ borderBottom: '0'}}>
					<div className={styles.form_item_label}>是否约满</div>
					<div className={styles.form_item_value}>
						{
							chroseFullItem === undefined || chroseFullItem === {} || chroseFullItem === null ?
							<div>
								<span onClick={ ()=>onOpenChangeDetail('isClassFull') }>请选择</span>
								<span>
									<img src="https://img.ishanshan.com/gimg/img/7df347afadc9a46ca7763f05548e0781"/>
								</span>
							</div>
							:
							<div>
								<span style={{color: '#5D9CEC'}} onClick={ ()=>onOpenChangeDetail('isClassFull') }>{ chroseFullItem.name }</span>
								<span>
									<img src="https://img.ishanshan.com/gimg/img/7df347afadc9a46ca7763f05548e0781"/>
								</span>
							</div>
						}
					</div>
				</div>

			</div>

			<div className={styles.handleSub}>
				<Button onClick={()=>submitSerchFun('cancel')} className="btn" data-seed="logId" style={{width: '240px', backgroundColor: '#A9B2BC',border: '#A9B2BC' }} activeStyle={{ backgroundColor: '#666' }}>重置</Button>
				<Button onClick={()=>submitSerchFun('serch')} className="btn" type="primary" style={{width: '240px',marginRight: '80px'}}>搜索</Button>
			</div>

		</div>
	);

	const drawerProps = {
		open: open,
		position: position,
		onOpenChange: onOpenChangeFun
	};

	const drawerPropsDetail = {
		open: openDetail,
		position: positionDetail,
		onOpenChange: onOpenChangeDetail
	};

	//课程布局
	function renderRow ( rowData, sectionID, rowID ) {
		let status = '';
        let statusClassName = styles.render_row_item_status;
        if(!!rowData.bookCls){
            switch(rowData.bookCls){
                case '1':
                    status = '可预约';
                    statusClassName = styles.render_row_item_blue;
                    break;
                case '2':
                    status = '不可预约';
                    statusClassName = styles.render_row_item_red;
                    break;
                case '3':
                    status = '已预约';
                    statusClassName = styles.render_row_item_green;
                    break;
                case '4':
                    status = '已约满';
                    statusClassName = styles.render_row_item_red;
                    break;
            }
        }

		return (
			<div className = { styles.render_row } key = { 'render_row_' + rowID } onClick = { () => clickToScheduleDetail( rowData, status ) }>
				<p className = { statusClassName } >{ moment(rowData.studyDate).isBefore(moment(), 'day') || status == '不可预约' ? '' : (status || '暂无') }</p>
				<p className = { styles.render_row_item } style = {{ fontSize : '28px', margin : '30px 0 30px 20px', height : '28px' }}>
					<span style = {{ color : '#333' }} >课程 : </span>
					<span style = {{ color : '#333' }} >{ rowData.courseName || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >教室 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.clsRoomName || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >适龄范围 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.ageLimit|| '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >主教 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.mTeachers || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >助教 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.aTeachers || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >上课时间 : </span>
					<span className = { styles.render_row_item_value } >
						{ ( !!rowData.studyDate && !!rowData.startTime && !!rowData.endTime && rowData.studyDate + ' ' + rowData.startTime + ' ~ ' + rowData.endTime ) || '暂无' }
					</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >剩余空位 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.useSeat || '暂无' }</span>
				</p>
				<p className = { styles.render_row_item } >
					<span className = { styles.render_row_item_label } >消耗课时 : </span>
					<span className = { styles.render_row_item_value } >{ rowData.courseNum || '暂无' }</span>
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
			{/* 侧边筛选项 */}
			<Drawer
        className={ styles.my_drawer }
				sidebar={sidebar}
				touch={true}
				dragToggleDistance={6000}
				drawerWidth= { 900 }
        dragHandleStyle={{ display: 'none' }}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        {...drawerProps}
      >
      </Drawer>

			{/* 侧边筛选详情页 */}
			<Drawer
        className={ styles.my_drawerDetail }
				sidebar={sidebarDetail}
				touch={true}
				dragToggleDistance={6000}
				drawerWidth= { 900 }
				sidebarStyle={{backgroundColor: '#fff'}}
        dragHandleStyle={{ display: 'none' }}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        {...drawerPropsDetail}
      >
      </Drawer>

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
						<span className={ styles.last_schedule_right_serch } onClick = { onOpenChangeFun }>
							<img src="https://img.ishanshan.com/gimg/img/de3926f45d1ab7727f060f9f4b71d450"/>
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
						<span className={ styles.last_schedule_right_serch } onClick = { onOpenChangeFun }>
							<img src="https://img.ishanshan.com/gimg/img/de3926f45d1ab7727f060f9f4b71d450"/>
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

export default OrderClass;
