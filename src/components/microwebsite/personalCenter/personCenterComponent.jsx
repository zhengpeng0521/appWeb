import React from 'react';
import styles from './personCenterComponent.less';
import {WhiteSpace, WingBlank, Icon} from 'antd-mobile';

function MicroPersonCenterComponent({

	dp,
	dataSource,
	touchHomeFunction,
	touchBabyListFunction,
	touchMaaHistoryFunction,
	touchMyActivityFunction,
	touchCourseTimeFunction,
	touchAskForLeaveFunction,
	touchToSignSelf,
}) {

	let url = '';
	let headerImage = (url == '' || url == 'undefined' || url == undefined)
	? 'url(http://115.29.172.104/gimg/img/300f433150bdfe4c13fa0e137efce725)'
	: 'url(http://115.29.172.104/gimg/img/85148fc80751d0efcf809ddab826ca11)';
	return(
		<div className="js_micro_person_center">
			<div 
				className={styles.js_person_center_banner} 
				style={{backgroundImage : 'url(http://115.29.172.104/gimg/img/589888af8c0c1ed94f85e2a6513a6104)'}}
			>
				<div className={styles.js_person_home_icon_div}></div>
				<svg className={styles.js_person_home_icon} onClick={() => touchHomeFunction()}>
					<use xlinkHref="#anticon-home"></use>
				</svg>
				<div className={styles.js_person_header_div}>
					<div 
						className={styles.js_person_header}
						style={{backgroundImage : headerImage}}
					>
					</div>
				</div>
				<div className={styles.js_person_info_div}>
					<p className={styles.js_person_name}>{dataSource&&dataSource.wxName || ''}</p>
					<p className={styles.js_person_phone}>{dataSource&&dataSource.mobile || ''}</p>
					<p className={styles.js_person_campus}>所在校区: {dataSource&&dataSource.orgName || ''}</p>
				</div>
			</div>
			<WhiteSpace />
			<div className={styles.js_person_title_arr_div}>
				<MicroPersonSubComponent title="学员信息" icon="user-blue-copy" 		onClickFunction={() => touchBabyListFunction()} />
				<MicroPersonSubComponent title="预约历史" icon="menu-tjbb" 	onClickFunction={() => touchMaaHistoryFunction()} />
				<MicroPersonSubComponent title="我的活动" icon="home-hd" 	onClickFunction={() => touchMyActivityFunction()} />
			</div>
			<WhiteSpace />
			{
				dataSource&&dataSource.hasCRM == '1' ?
					<div className={styles.js_person_bottom_title_arr_div}>
						<MicroPersonSubComponent title="签到" icon="menu-pk" onClickFunction={() => touchToSignSelf()} /> 
						<MicroPersonSubComponent title="我要请假" icon="qingjia" 	onClickFunction={() => touchAskForLeaveFunction()} /> 
						{/*<MicroPersonSubComponent title="查看课时" icon="menu-pk" 	onClickFunction={() => touchCourseTimeFunction()} />*/}
					</div>
					:
					''
			}
		</div>
    );
}

function MicroPersonSubComponent({

	icon,
	color,
	title,
	onClickFunction,
	
}) {

	let sty = (title == '我的活动' || title == '我要请假') ? styles.no_styles : styles.js_person_content_sub;
	
	return(
		<div className={styles.js_person_content} onClick={onClickFunction}>
			<WingBlank>
				<div className={sty}>
					<div className={styles.js_icon_size_div} >
						<svg style={{height : 40, width : 40}}>
							<use xlinkHref={`#anticon-${icon}`}></use>
						</svg>
					</div>
					<div className={styles.js_content_text} style={{width : 'calc(100% - 80px)'}}>
						{title}
						<svg aria-hidden="true" style={{float : 'right', marginTop : 30, width: 30, height : 30, transform: 'rotate(-90deg)'}}>
						  	<use xlinkHref="#anticon-arrow"></use>
						</svg>
					</div>
				</div>
			</WingBlank>
		</div>
	)
}

export default MicroPersonCenterComponent;



