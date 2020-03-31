import React from 'react';
import styles from './microwebsteComponent.less';
import { Carousel, WhiteSpace, WingBlank, Tabs, Icon, Toast, ListView, Modal } from 'antd-mobile';
import MicroLayoutComponent from './microLayoutComponent.jsx';
import { getTimeDifference } from '../../../utils/date.js';
import MicroEmptyDataComponent from '../common/microEmptyDataComponent.jsx';
import Mvideo from './microwebVideo'
const TabPane = Tabs.TabPane;

function MicroWebsteComponent({

	dp,
	pageIndex,
	bannerList,
	courseList,
	coursePage,
	courseIsLoading,
	courseIsLoadingEnd,
	courseListDataSource,
	activityList,
	activityPage,
	activityIsLoading,
	activityIsLoadingEnd,
	activityListDataSource,
	gameList,
	gamePage,
	gameIsLoading,
	gameIsLoadingEnd,
	gameListDataSource,
	gameProverList,
	configSource,
	orgDataSource,
	defaultTabValue,
	showAllContentString,
	touchHomeIconFunction,
	touchJigouIconFunction,
	touchPersonIconFunction,
	dispathRouterFunction,
	touchMaaFunction,
	callbackMapFunction,
	touchActivityFunction,
	touchCourseFunction,
	recordTenantId,
	recordOrgId,
	showBigAlbum,
	showBigTeacher,
	selectBigAlbumIndex,
	selectTeacherIndex,
	recordScrollTop,
	funcChangeScrollProps,
	qrVisible,
	firstIn,
	officialAccount,
	liveList,
	livePage,
	liveLoading,
	liveLoadingEnd,
	liveListDataSource,
	officialShow,
	oaInfo,
	// 
	vouterFunction,
	pauseFunction,
	visshow,
	endFunction
}) {

	let cousreTotalPage = coursePage && coursePage.resultCount || 0;
	let activityTotalPage = activityPage && activityPage.resultCount || 0;
	let gameTotalPage = gamePage && gamePage.resultCount || 0;
	let liveTotalPage = livePage && livePage.resultCount || 0;
	// let liveTotalPage = liveList && liveList.length || 0;
	let cIndex = courseList && courseList.length || 0;
	let aIndex = activityList && activityList.length || 0;
	let gIndex = gameList && gameList.length || 0;
	let liveIndex = liveList && liveList.length || 0;

	//课程布局
	function courseRow(rowData, sectionID, rowID) {

		if (cIndex < 0) { cIndex = courseList.length - 1; }
		let url = rowData.courseCover != '' && rowData.courseCover != undefined ? `${rowData.courseCover}!s300` : 'http://115.29.172.104/gimg/img/143af509b4e3e0f75b8bf52f8e82643f';
		return (
			<div key={rowID} className={styles.js_tabs2_course} style={{ width: w / 2 }} onClick={() => openCourseDetail(rowData.id)}>
				<div className={rowID % 2 == 0 ? styles.js_tabs2_content_div_left : styles.js_tabs2_content_div_right}
					style={{ width: (w - 50) / 2, height: (w - 50) / 2 + 110 }}>
					<div
						className={styles.js_tabs2_course_cover}
						style={{
							height: (w - 50) / 2,
							backgroundImage: `url(${url})`
						}}
					>
					</div>
					<p className={styles.js_tabs2_course_name}>{rowData.name}</p>
					<p className={styles.js_tabs2_course_age}>适合年龄：{rowData.adAgeList.join(',')}</p>
				</div>
			</div>
		);
	}

	//活动布局
	function activityRow(rowData, sectionID, rowID) {

		if (aIndex < 0) { aIndex = courseList.length - 1; }

		//获取当前时间戳
		var timestamp = Date.parse(new Date());
		var activityStatus = '';
		var activityString = '';

		if (rowData.applystartTime > 0 && rowData.applyendTime > 0) {

			if (rowData.applystartTime > timestamp && rowData.applyendTime > timestamp) {
				//开始时间和结束时间大于当前时间
				let time = getTimeDifference(timestamp, rowData.applystartTime);
				activityStatus = "未开始";
				activityString = `距离报名开始：${time.d}天 ${time.h}时`;
			}
			if (rowData.applystartTime < timestamp && rowData.applyendTime < timestamp) {
				//开始时间和结束时间都小于开始时间当前时间
				activityStatus = "已结束";
				activityString = '报名已经结束，下次早点来哦';

			}
			if (rowData.applystartTime < timestamp && rowData.applyendTime > timestamp) {
				//开始时间大于当前时间并且结束时间小于当前时间
				let time = getTimeDifference(timestamp, rowData.applyendTime);
				activityStatus = "报名中";
				activityString = `距离报名结束：${time.d}天 ${time.h}时`;
			}
		}

		var newDate = new Date();
		newDate.setTime(rowData.activitystartTime);

		let url = rowData.activityCover != '' && rowData.activityCover != undefined ? `${rowData.activityCover}!s400` : 'http://115.29.172.104/gimg/img/143af509b4e3e0f75b8bf52f8e82643f';
		return (
			<div key={rowID} className={styles.js_activity} style={{ height: (w / 2) * 0.6 }}>
				<div className={styles.js_activity_bg} onClick={() => openActivityDetail(rowData.id)}>

					<div
						className={styles.js_activity_img}
						style={{
							backgroundImage: `url(${url})`
						}}
					>
						{
							rowData.activityType == '1' ? <div className={styles.js_activity_img_shadow} style={{ bottom: 'calc(-100% - -40px)' }}></div> : ''
						}
						{
							rowData.activityType == '1' ? <div className={styles.js_activity_img_shadow_text} style={{ bottom: 'calc(-100% - -80px)' }}>会员专属</div> : ''
						}
					</div>

					<string className={styles.js_activity_p}>{rowData.name}</string>
					<p className={
						activityStatus == "未开始"
							? styles.js_activity_status_nostart
							: activityStatus == "报名中"
								? styles.js_activity_status
								: styles.js_activity_status_end

					}>{activityStatus}</p>
					<p className={styles.js_activity_string}>{activityString}</p>
					<p className={styles.js_activity_address}>
						{newDate.getMonth() + 1}
						.
							{newDate.getDate()}
						{
							`（${rowData.weekDay == 1
								? '周二'
								: rowData.weekDay == 2
									? '周三'
									: rowData.weekDay == 3
										? '周四'
										: rowData.weekDay == 4
											? '周五'
											: rowData.weekDay == 5
												? '周六'
												: rowData.weekDay == 6
													? '周天'
													: rowData.weekDay == 0
														? '周一'
														: ''
							}）`
						} | &nbsp;&nbsp;{rowData.address}
					</p>
				</div>
			</div>
		);
	}

	//游戏布局
    function gameRow (rowData, sectionID, rowID) {	
		if (gIndex < 0) {gIndex = courseList.length - 1;}

		var startTime = rowData.startTime; 
		var endTime = rowData.endTime; 
		
		startTime 	= startTime.replace(/-/g,'/');
		endTime	 	= endTime.replace(/-/g,'/');
		
		var date1 = new Date(startTime); 
		var date2 = new Date(endTime); 
		
		var time1 = date1.getTime();
		var time2 = date2.getTime();

		var timestamp = Date.parse(new Date());

		var activityStatus = '';
		var activityString = '';

		if (time1 > 0 && time2 > 0) {
			if (time1 > timestamp && time2 > timestamp) {
				//开始时间和结束时间大于当前时间
				let time = getTimeDifference(timestamp, time1);
				activityStatus = "未开始";
				activityString = `距离游戏开始：${time.d}天 ${time.h}时`;
			}
			if (time1 < timestamp && time2 < timestamp) {
				//开始时间和结束时间都小于开始时间当前时间
				activityStatus = "已结束";
				activityString = '游戏已经结束，下次早点来哦';

			}
			if (time1 < timestamp && time2 > timestamp) {
				//开始时间大于当前时间并且结束时间小于当前时间
				let time = getTimeDifference(timestamp, time2);
				activityStatus = "进行中";
				activityString = `距离游戏结束：${time.d}天 ${time.h}时`;
			}
		}
		
		// let url;
		// gameProverList&&gameProverList.map((item, index) => {
		// 	if(item.gameCode == rowData.gameCode) {
		// 		url = item.icon != '' && item.icon != undefined ? `${item.icon}!s400` : 'http://115.29.172.104/gimg/img/143af509b4e3e0f75b8bf52f8e82643f';
		// 	}
		// })

		 return (
            	<div key={rowID} className={styles.js_game} style={{height : (w / 2) * 0.6}}> 
					<div className={styles.js_game_bg} onClick={() => openGame(rowData, activityStatus)}>
						<div 
							className={styles.js_game_img} 
							style={{
								backgroundImage : `url(${rowData.icon})`
							}}
						>
							{
								rowData.activityType == '1' ? <div className={styles.js_activity_img_shadow} style={{bottom: 'calc(-100% - -40px)'}}></div> : ''
							}
							{
								rowData.activityType == '1' ? <div className={styles.js_activity_img_shadow_text} style={{bottom: 'calc(-100% - -80px)'}}>会员专属</div> : ''
							}
						</div>
						<string className={styles.js_activity_p}>{rowData.dataTitle}</string>
						<p className={
									activityStatus=="未开始"
									?styles.js_activity_status_nostart
									:activityStatus=="进行中"
									?styles.js_activity_status
									:styles.js_activity_status_end

							}>{activityStatus}</p>
						<p className={styles.js_activity_string}>{activityString}</p>
						<p className={styles.js_activity_address}>{rowData.views || '0'}个家长参加</p>
					</div>
				</div>

		);

	}

	//课程数据加载完成
	function onCourseEndReached(event) {
		if (courseList.length >= cousreTotalPage) {
			if (!courseIsLoadingEnd) {
				dp('updateState', { courseIsLoading: false, courseIsLoadingEnd: true });
			}
		} else {
			dp('getMoreCourseList', {
				courseIsLoading: true,
				courseIsLoadingEnd: false,
				tenantId: recordTenantId,
				orgId: recordOrgId
			});
		}
	}

	//活动数据加载完成
	function onActivityEndReached(event) {

		if (activityList.length >= activityTotalPage) {
			if (!activityIsLoadingEnd) {
				dp('updateState', { activityIsLoading: false, activityIsLoadingEnd: true });
			}
		} else {
			dp('getMoreActivityList', {
				activityIsLoading: true,
				activityIsLoadingEnd: false,
				tenantId: recordTenantId,
				orgId: recordOrgId
			});
		}
	}

	//游戏数据加载完成
	function onGameEndReached(event) {

		if (gameList.length >= gameTotalPage) {
			if (!gameIsLoadingEnd) {
				dp('updateState', { gameIsLoading: false, gameIsLoadingEnd: true });
			}
		} else {
			dp('getMoreGameList', {
				gameIsLoading: true,
				gameIsLoadingEnd: false,
				tenantId: recordTenantId,
				orgId: recordOrgId
			});
		}
	}

	//直播列表加载完成
	function onLiveEndReached(event) {

		if (liveList.length >= liveTotalPage) {
			if (!liveLoadingEnd) {
				dp('updateState', { liveLoading: false, liveLoadingEnd: true });
			}
		} else {
			dp('getMoreLiveList', {
				liveLoading: true,
				liveLoadingEnd: false,
				tenantId: recordTenantId,
				orgId: recordOrgId
			});
		}
	}

	//埋点
	function buriedPointFunction(eventName) {
		sa.track("mic_site_btn", {
			_tenantId: recordTenantId || '未获取',
			_orgId: recordOrgId || '未获取',
			_wxId: openid || '未获取',
			_micSiteBtn: eventName,
		});
	}

	//tab切换回调
	function callbackTab(key) {

		let obj = tabsArr[key];
		let name = orgDataSource && orgDataSource.orgName;
		let orgId = orgDataSource && orgDataSource.orgId;

		if (obj.url != '' || obj.name == 'otherTab') {
			_hmt.push(['_trackEvent', '微官网', `机构ID=${orgId}`, '点击外链tab', '-']);
			window.location.href = obj.url || 'https://www.ishanshan.com';
		} else {
			if (obj.name == "activityTab") {
				_hmt.push(['_trackEvent', '微官网', `机构ID=${orgId}`, '点击活动tab', '-']);
				buriedPointFunction('活动');
				dp('getActivityList', { tenantId: recordTenantId, orgId: recordOrgId });
			} else if (obj.name == "courseTab") {
				_hmt.push(['_trackEvent', '微官网', `机构ID=${orgId}`, '点击课程tab', '-']);
				buriedPointFunction('课程');
				dp('getCourseList', { tenantId: recordTenantId, orgId: recordOrgId });
			} else if (obj.name == "gameTab") {
				_hmt.push(['_trackEvent', '微官网', `机构ID=${orgId}`, '点击游戏tab', '-']);
				buriedPointFunction('游戏');
				dp('getGameList', { tenantId: recordTenantId, orgId: recordOrgId });
			} else if(obj.name == "liveCfg"){
				_hmt.push(['_trackEvent', '微官网', `机构ID=${orgId}`, '点击直播tab', '-']);
				buriedPointFunction('直播');
				dp('getLiveList', { tenantId: recordTenantId, orgId: recordOrgId });
			} else {
				buriedPointFunction('首页');
				_hmt.push(['_trackEvent', '微官网', `机构ID=${orgId}`, '点击首页tab', '-']);
			}
			dp('updateState', { defaultTabValue: key });
		}
	}

	//拨打电话
	function callPhone() {
		if (orgDataSource.tel == '' || orgDataSource.tel == undefined || orgDataSource.tel == 'undefined') {
			Toast.info('电话号码为空', 2);
			return;
		} else {
			if (isNaN(orgDataSource.tel.replace(/\s/g, ""))) {
				return Toast.fail("电话号码错误", 1);
			} else {
				buriedPointFunction('联系机构');
				window.location.href = `tel:${orgDataSource.tel || ''}`;
			}
		}
	}

	//调用地图
	function callbackMap() {
		buriedPointFunction('地图');
		callbackMapFunction(orgDataSource.address || DEFAULT_MAP_ADDRESS, { long: orgDataSource.log || 0, lat: orgDataSource.lat || 0 });
	}

	//展开全部文字
	function showAllText() {
		dp('updateState', { showAllContentString: !showAllContentString });
	}

	//打开活动详情
	function openActivityDetail(id) {
		touchActivityFunction(id)
	}

	//打开课程详情
	function openCourseDetail(id) {
		touchCourseFunction(id)
	}

	//打开图片预览
	function touchAlbum(index) {
		//dp('updateState', {showBigAlbum : !showBigAlbum, selectBigAlbumIndex : index});
		funcChangeScrollProps({
			showBigAlbum: !showBigAlbum,
			selectBigAlbumIndex: index,
			orgAlbumArr: orgAlbumArr,
		})
	}

	//打开老师预览
	function touchTeacher(index) {
		//dp('updateState', {showBigTeacher : !showBigTeacher, selectTeacherIndex : index});
		funcChangeScrollProps({
			showBigTeacher: !showBigTeacher,
			selectTeacherIndex: index,
			teachersArr: teachersArr,
		})
	}
	//打开游戏
	function openGame(data_row, text) {
		if (text == '未开始') {
			Toast.info('游戏未开始', 1.5);
		} else if (text == '已结束') {
			Toast.info('游戏已结束，下次早点来吧', 1.5);
		} else {
			dp('getgameAction', {
				m: 'h5',
				service: `${data_row.provider}/action`,
				tenantId: data_row.tenantId,
				orgId: data_row.orgId,
				gameId: data_row.gameId,
				gameCode: data_row.gameCode,
				dataId: data_row.dataId,
			});
		}
	}

	// 打开二维吗弹窗
	function openQrcode(){
		dp('updateState', {qrVisible: true})
	}

	// 关闭二维码
	function closeQrcode(){
		dp('updateState', {qrVisible: false})
	}

	// 隐藏关注公众号
	function closeModule(){
		dp('updateState', {officialAccount: 'hide'})
		localStorage.setItem('ss_officialAccount', 'hide')
	}

	let bottomButtonArr = [{ icon: 'daohang', title: '地图导航' }, { icon: 'phone', title: '机构联系' }, { icon: 'yuyue', title: '预约试听' }]

	let teachersArr = orgDataSource && orgDataSource.teachersList;

	let orgAlbumArr = orgDataSource && orgDataSource.orgAlbum;

	//地址属性
	let props = {
		address: orgDataSource.address,
		callbackMap,
	}

	//tab1布局
	let tabs1Layout = (
		<div className="js_tabs1_content">
			{officialShow == 1 && officialAccount === 'show' ? <div className={styles.wx_container}>
				<WhiteSpace style={{ background: "rgb(240,241,242)" }} />
				<div className={styles.wx_box}>
					<div className={styles.wx_logo}>
						<img src={oaInfo.logo} />
					</div>
					<span className={styles.wx_name}>{oaInfo.name}</span>
					<div className={styles.wx_btn} onClick={openQrcode}>立即关注</div>
				</div>
				<WhiteSpace style={{ background: "rgb(240,241,242)" }} />
				<Modal
					visible={qrVisible}
					transparent
					closable={false}
					maskClosable={false}
					prefixCls="home-modal am-modal"
				>
					<Icon type="cross" className={styles.qrcode_close} onClick={closeQrcode} />

					<p className={styles.qrcode_title}>{oaInfo.name || '--'}</p>
					<img src={oaInfo.qrcode} className={styles.qrcode_pic} />
					<p className={styles.qrcode_tip}>长按识别二维码，立即关注</p>
					<p className={styles.qrcode_btn} onClick={closeModule}>已关注，不再提示</p>
				</Modal>
			</div> : null}


			<div className={styles.js_maa} onClick={() => touchJigouIconFunction()}>
				<WingBlank>
					<div className={styles.js_maa_row}>
						<svg aria-hidden="true"
							className={styles.js_map_icon_div}
							onClick={() => touchHomeIconFunction()}>
							<use xlinkHref="#anticon-jigou" style={{ marginTop: 15 }}></use>
						</svg>
						<p className={styles.js_tabs1_busines_org_address}>{orgDataSource.orgName || '无法获取地址'}</p>
						<svg aria-hidden="true"
							style={{ float: 'right', marginTop: 30, width: 30, height: 30, transform: 'rotate(-90deg)' }}
							onClick={() => touchHomeIconFunction()}>
							<use xlinkHref="#anticon-arrow"></use>
						</svg>
					</div>
				</WingBlank>
			</div>
			<div className={styles.js_maa}>
				<WingBlank>
					<svg aria-hidden="true"
						className={styles.js_map_icon_div}
						onClick={() => touchHomeIconFunction()}>
						<use xlinkHref="#anticon-time"></use>
					</svg>
					<p className={styles.js_tabs1_busines_itme}>营业时间：{orgDataSource.serverTime || '暂无营业时间'}</p>
				</WingBlank>
			</div>
			{
				configSource && configSource.menuConfig && configSource.menuConfig.map((item, index) => {
					let clearance = '';
					let component_title = '';
					let component = '';
					switch (item.name) {
						case "busnessRange":
							{ clearance = item.show == 0 ? '' : <WhiteSpace style={{ background: "rgb(240,241,242)" }} /> }
							{
								component = item.show == 0 ? '' :
									<div className={styles.js_business}>
										<WingBlank size="md">
											<div className={styles.js_blue_box}></div>
											<p className={styles.js_title}>{item.title}</p>
											{
												orgDataSource.categoryList && orgDataSource.categoryList.length > 0 && orgDataSource.categoryList.map(function (item, index) {
													let new_w = item && item.length == 4 ? 120 : item && item.length == 2 ? 70 : 90;
													return <div key={index} className={styles.js_business_label} style={{ width: new_w }}>{item}</div>
												})
											}
										</WingBlank>
									</div>
							}
							break;
						case "ageRange":
							{ clearance = item.show == 0 ? '' : <WhiteSpace style={{ background: "rgb(240,241,242)" }} /> }
							{
								component = item.show == 0 ? '' :
									<div className={styles.js_age}>
										<WingBlank size="md">
											<div className={styles.js_blue_box}></div><p className={styles.js_title}>{item.title}</p>
											<div className={styles.js_age_label} style={{ width: '95%' }}>{orgDataSource.agetag}</div>
										</WingBlank>
									</div>
							}
							break;
						case "orgAlbum":
							{ clearance = item.show == 0 ? '' : <WhiteSpace style={{ background: "rgb(240,241,242)" }} /> }
							{
								component_title = item.show == 0 ? '' :
									<WingBlank size="md">
										<div className={styles.js_blue_box}></div><p className={styles.js_title}>{item.title}</p>
									</WingBlank>
							}
							{
								component = item.show == 0 ? '' :
									<div className={styles.js_environments}>
										<WingBlank size="md">
											<div style={{ width: 294 * (orgAlbumArr && orgAlbumArr.length || 0), height: 170, textAlign: 'center', marginLeft: 20 }}>
												{
													orgAlbumArr && orgAlbumArr.length > 0 && orgAlbumArr.map(function (albumItem, albumIndex) {
														let ingurl = (albumItem != undefined && albumItem != '') ? `${albumItem}` : 'http://115.29.172.104/gimg/img/143af509b4e3e0f75b8bf52f8e82643f!s300';
														if (ingurl.indexOf('mp4') !== -1) {
															return <div key={albumIndex} className={styles.js_environment}>
																<div className={styles.js_environment_icon}
																>
																	{/* <video preload="auto" width="100%" height="100%" className="VideoC">
																		<source src={ingurl} type="video/mp4" />
																	</video> */}
																	<Mvideo ingurl={ingurl} />
																</div>
															</div>
														} else {
															return <div key={albumIndex} className={styles.js_environment} onClick={() => touchAlbum(albumIndex)}>
																<div className={styles.js_environment_icon}
																	style={{
																		backgroundImage: `url(${ingurl})`
																	}}
																>
																</div>
															</div>
														}
													})
												}
											</div>
										</WingBlank>
									</div>
							}
							break;
						case "orgIntro":
							{ clearance = item.show == 0 ? '' : <WhiteSpace style={{ background: "rgb(240,241,242)" }} /> }
							{
								component = item.show == 0 ? '' :
									<div className={styles.js_introduce}>
										<WingBlank size="md">
											<div className={styles.js_blue_box}></div><p className={styles.js_title}>{item.title}</p>
											<div className={!showAllContentString ? styles.js_open_content_text : styles.js_close_content_text} dangerouslySetInnerHTML={{ __html: orgDataSource.intro }}></div>
											{/* <pre className={!showAllContentString ? styles.js_open_content_text : styles.js_close_content_text}>{orgDataSource.intro || ''}</pre> */}
											<p className={styles.js_all_open} onClick={showAllText}>{!showAllContentString ? '展开全部' : '收起'}</p>
										</WingBlank>
									</div>
							}
							break;
						case "orgFaculty":
							{ clearance = item.show == 0 ? '' : <WhiteSpace style={{ background: "rgb(240,241,242)" }} /> }
							{
								component_title = item.show == 0 ? '' :
									<WingBlank size="md">
										<div className={styles.js_blue_box}></div>
										<p className={styles.js_title}>{item.title}</p>
									</WingBlank>
							}
							{
								component = item.show == 0 ? '' :
									<div className={styles.js_teachers}>
										<WingBlank size="md">
											<div style={{ width: 230 * (teachersArr && teachersArr.length || 0), height: 265, textAlign: 'center', marginLeft: 20 }}>
												{
													teachersArr && teachersArr.length > 0 && teachersArr.map(function (tItem, tIndex) {
														let ingurl = (tItem.teacherImg != undefined && tItem.teacherImg != '') ? `${tItem.teacherImg}` : 'http://115.29.172.104/gimg/img/143af509b4e3e0f75b8bf52f8e82643f!s300';
														return <div key={tIndex} className={styles.js_teacher} onClick={() => touchTeacher(tIndex)}>
															<div className={styles.js_teacher_icon}
																style={{
																	backgroundImage: `url(${ingurl})`
																}}
															>
															</div>
															<p className={styles.js_teacher_name}>{tItem.teacherName}</p>
															<p className={styles.js_teacher_intro}>{tItem.teacherIntro}</p>
														</div>
													})
												}
											</div>
										</WingBlank>
									</div>
							}
							break;
						case "orgFacility":
							{ clearance = item.show == 0 ? '' : <WhiteSpace style={{ background: "rgb(240,241,242)" }} /> }
							{
								component = item.show == 0 ? '' :
									<MicroLayoutComponent data={orgDataSource.utilitytagList} title={item.title} />
							}
							break;
						default:
							break;
					}
					return <div key={index}>
						{clearance}
						{component_title}
						{component}
					</div>
				})
			}
			<div className={styles.js_support}>本服务由闪闪提供技术支持</div>
		</div>
	)

	//tab2布局
	let tabs2Layout = (
		<div className="js_tabs2_content">
			{
				cousreTotalPage && cousreTotalPage > 0
					?
					<ListView
						dataSource={courseListDataSource}
						renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>{courseIsLoading ? '加载中...' : '已经到底啦~'}</div>}
						renderRow={courseRow}
						useBodyScroll
						initialListSize={500}
						pageSize={20}
						scrollRenderAheadDistance={5}
						onEndReached={onCourseEndReached}
					/>
					:
					<MicroEmptyDataComponent title="暂无课程数据" top={150} />
			}
		</div>
	)

	//tab3布局
	let tabs3Layout = (
		<div className="js_tabs3_content">
			{
				activityTotalPage && activityTotalPage > 0
					?
					<ListView
						dataSource={activityListDataSource}
						renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>{activityIsLoading ? '加载中...' : '已经到底啦~'}</div>}
						renderRow={activityRow}
						useBodyScroll
						pageSize={20}
						scrollRenderAheadDistance={500}
						onEndReached={onActivityEndReached}
					/>
					:
					<MicroEmptyDataComponent title="暂无活动数据" top={150} />
			}
		</div>
	)

	//tab4布局
	let tabs4Layout = (
		<div className="js_tabs4_content">
			{
				gameTotalPage && gameTotalPage > 0
					?
					<ListView
						dataSource={gameListDataSource}
						renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>{gameIsLoading ? '加载中...' : '已经到底啦~'}</div>}
						renderRow={gameRow}
						useBodyScroll
						pageSize={20}
						scrollRenderAheadDistance={500}
						onEndReached={onGameEndReached}
					/>
					:
					<MicroEmptyDataComponent title="暂无游戏数据" top={150} />
			}
		</div>
	)

	let tabs5Layout = (
		<div className="js_tabs5_content">
			<MicroEmptyDataComponent title="页面跳转" top={150} />
		</div>
	)

	// 跳转直播间
	function goLiveRoom(id){
		// let qrLink = 'https://livetest.ishanshan.com/mobile.html' // 直播二维码52
		let qrLink = 'https://ed.ishanshan.com/liveweb/mobile.html' // 直播二维码线上
		let url = `${qrLink}?id=${id}`
		window.location.href = url
	}

	// 直播row
  function liveRow(rowData, sectionID, rowID){
		if (liveIndex < 0) { liveIndex = liveList.length - 1; }

		let statusText = '无效'
		let statusColor = '#bbb'
		let showIcon = false
		if(rowData.status === '1'){
			statusText = '待开课'
			statusColor = '#67c23a'
		} else if(rowData.status === '2'){
			showIcon = true
			statusText = '直播中'
			statusColor = '#fa6400'
		} else if(rowData.status === '3'){
			statusText = '已结束'
			statusColor = '#bbb'
		}

		return (
			<div key={rowID} className={styles.live_row} onClick={() => goLiveRoom(rowData.id)}>
				<div className={styles.live_left}>
					<span style={{ background: statusColor }}>
						{showIcon && <img className={styles.live_livingicon} src="https://img.ishanshan.com/gimg/n/20200312/4fea159f9547acb78f66c7987d7c8bee" />}
						{statusText}
					</span>
					<img src={rowData.homePageUrl} />
				</div>
				<div>
					<p className={styles.live_title}>{rowData.liveName}</p>
					<p className={styles.live_small}>{rowData.liveTime}</p>
					<p className={styles.live_small}>{rowData.userName}</p>
				</div>
			</div>
		)
	}

	// 直播tab
	let tabs6Layout = (
		<div className="js_tabs4_content">
			{
				liveTotalPage && liveTotalPage > 0
					?
					<ListView
						dataSource={liveListDataSource}
						renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>{liveLoading ? '加载中...' : '已经到底啦~'}</div>}
						renderRow={liveRow}
						useBodyScroll
						pageSize={20}
						scrollRenderAheadDistance={500}
						onEndReached={onLiveEndReached}
					/>
					:
					<MicroEmptyDataComponent title="暂无直播数据" top={150} />
			}
		</div>
	)

	let tabsArr = [];

	configSource && configSource.menuConfig && configSource.menuConfig.map((item, index) => {

		let componentTab = '';
		switch (item.name) {
			case "homeTab":
				{ componentTab = item.show == 1 ? { name: item.name, title: item.title, url: item.url } : '' }
				break;
			case "courseTab":
				{ componentTab = item.show == 1 ? { name: item.name, title: item.title, url: item.url } : '' }
				break;
			case "activityTab":
				{ componentTab = item.show == 1 ? { name: item.name, title: item.title, url: item.url } : '' }
				break;
			case "gameTab":
				{ componentTab = item.show == 1 ? { name: item.name, title: item.title, url: item.url } : '' }
				break;
			case "liveCfg":
				{ componentTab = item.show == 1 ? { name: item.name, title: item.title, url: item.url } : '' }
				break;
			case "otherTab":
				{ componentTab = item.show == 1 ? { name: item.name, title: item.title, url: item.url } : '' }
				break;
			default:
				break;
		}
		if (componentTab != '') {
			tabsArr.push(componentTab);
		}
	})

	let tabsLayout = (

		tabsArr && tabsArr.map(function (item, index) {
			return <TabPane tab={item.title} key={index}>

				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						backgroundColor: '#fff'
					}}>
					{
						item.name == "homeTab" ? tabs1Layout :
							item.name == "courseTab" ? tabs2Layout :
								item.name == "activityTab" ? tabs3Layout :
									item.name == "gameTab" ? tabs4Layout :
									item.name == 'liveCfg' ? tabs6Layout :
										item.name == "otherTab" ? tabs5Layout :
											''
					}
				</div>
			</TabPane>
		})
	)

	//再次进入的时候进行赋值
	// if(showBigAlbum == false && showBigTeacher == false) {
	// 	let element = document.getElementById('contentBody');
	// 	if(element) {
	// 		let count = 300;
	// 		let timer = setInterval(function(){
	// 			count++;
	// 			if(count < recordScrollTop) {
	// 				if(element.scrollTop < recordScrollTop) {
	// 					element.scrollTop += 10;
	// 				} else {
	// 					clearInterval(timer);
	// 				}
	// 			}
	// 		}, 10);
	// 	}
	// }
	//
	// function changeOpacity() {
	// 	let element1 = document.getElementById('home');
	// 	let element2 = document.getElementById('person');
	// 	let element3 = document.getElementById('js_banner_fixed_home_icon');
	// 	let element4 = document.getElementById('js_banner_fixed_person_icon');
	// 	let element = document.getElementById('contentBody');

	// 	if(element.scrollTop / 100 <= 0.1) {
	// 		element1.style.background = `rgba(0, 0, 0, ${0.3})`;
	// 		element2.style.background = `rgba(0, 0, 0, ${0.3})`;
	// 		element3.style.fillOpacity = 1;
	// 		element4.style.fillOpacity = 1;
	// 	} else {
	// 		element1.style.background = `rgba(0, 0, 0, ${(0.3 - element.scrollTop / 500)})`;
	// 		element2.style.background = `rgba(0, 0, 0, ${(0.3 - element.scrollTop / 500)})`;
	// 		element3.style.fillOpacity = 1-(element.scrollTop / 500);
	// 		element4.style.fillOpacity = 1-(element.scrollTop / 500);
	// 	}
	// }

	// //记录滚动的距离
	// function recordScrollTopMargin() {
	// 	let element = document.getElementById('contentBody');
	// 	element.scrollTop = (element.scrollTop + element.clientHeight == element.scrollHeight) ? element.scrollTop - 1 : element.scrollTop;
	// 	dp('updateState', {recordScrollTop : element.scrollTop})
	// }
	function openvideoClick(url) {
		window.open(url)
	}

	/** 关闭收藏店铺提示 */
	function closeMask(){
		dp('updateState', {firstIn: '0'})
		localStorage.setItem('ss_collect_first', '0')
	}

	return (
		<div style={{ height: '100%', position: 'relative' }} className="js_home">
			{firstIn === '1' ? <div className={styles.home_mask}>
				<img className={styles.mask_arrow} src="https://img.ishanshan.com/gimg/n/20200309/8c342e0b969b0afc2b0991f67c9e8d92" />
				<img className={styles.mask_content} src="https://img.ishanshan.com/gimg/n/20200309/15196c1cc5912f05021ea24f6764bbc8" />
				<div className={styles.mask_btn} onClick={closeMask}>我知道了</div>
			</div> : null}

			<div
			//  id="contentBody" 
			//  onMouseUp={recordScrollTopMargin}
			//  onScroll={changeOpacity}
			//  style={{ height: '100%', overflow: 'auto', WebkitOverflowScrolling : 'touch'}}
			>
				<div className={styles.js_banner_fixed_home} id="home" onClick={() => touchHomeIconFunction()}>
					<img src="//img.ishanshan.com/gimg/img/36ae96c3de6d8635246351fac47b482f" alt="" />
					<p>首页</p>
				</div>
				<div className={styles.js_banner_fixed_person} id="person" onClick={() => touchPersonIconFunction()}>
					<img src="//img.ishanshan.com/gimg/img/fd50cfeb38d23e2647a7ddb80840eee2" alt="" />
					<p>我的</p>
				</div>

				<Carousel
					className="js-carousel"
					dots={false}
					dragging={false}
					infinite={bannerList && bannerList.length > 1}
					swiping={bannerList && bannerList.length > 1}
					autoplay={visshow}
					style={{ height: '400px' }}
				>
					{
						bannerList && bannerList.length > 0 ? bannerList.map((item, index) => {
							let uri = JSON.parse(item.uri);
							let url = `url(${item.picUrl})` || 'http://115.29.172.104/gimg/img/143af509b4e3e0f75b8bf52f8e82643f!s300';
							// console.log(url.split('(')[1].split(')')[0])
							let newurl = url.split('(')[1].split(')')[0]
							if (newurl.indexOf('mp4') !== -1) {
								return <div key={index}
									className={styles.js_banner}
								>
									{/* <video src={newurl} controls="controls" width="100%" height="100%" /> */}
									{/* <video controls="controls" style={{ objectFit: "fill", background: "rgba(0,0,0,.8)"}} width="100%" height="100%" onEnded={() => endFunction()} onPlay={() => vouterFunction()} onPause={() => pauseFunction()}>
										<source src={newurl} type="video/mp4" />
									</video> */}
									<div style={{ position: "relative", width: "100%", height: "100%" }}>
										<video style={{ objectFit: "fill", background: "rgba(0,0,0,.8)", borderRadius: "10px" }} className="video" width="100%" height="100%" >
											<source src={newurl} type="video/mp4" />
										</video>
										<img onClick={() => openvideoClick(newurl)} src="http://img.ishanshan.com/gimg/n/20190729/57a0a9e3929437e627aed14e68828f6d" alt="" style={{ position: "absolute", width: "70px", height: "70px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
									</div>
								</div>
							} else {
								return <div key={index}
									className={styles.js_banner}
									// style={{backgroundImage: url}}
									onClick={() => dispathRouterFunction(uri)}
								>
									<img src={newurl} alt="" width="100%" height="100%" />
								</div>
							}


						})
							: <div className={styles.js_banner}
								style={{ backgroundImage: `url(http://115.29.172.104/gimg/img/143af509b4e3e0f75b8bf52f8e82643f!s300)` }}
							></div>
					}
				</Carousel>
				<Tabs
					defaultActiveKey="0"
					activeKey={defaultTabValue}
					pageSize={3}
					onChange={callbackTab}
					animated
					speed={5}
					swipeable={false}
					destroyInactiveTabPane={true}
				>
					{tabsLayout}

				</Tabs>
				<div className={styles.js_home_bottom_option}>
					{
						bottomButtonArr && bottomButtonArr.map((item, index) => {
							return <div key={index} className={styles.js_bottom_button_div}
								onClick={index == 0 ? () => callbackMap() : index == 1 ? () => callPhone() : () => touchMaaFunction()}>
								<svg
									aria-hidden="true"
									style={{ width: 50, height: 50, color: '#3b7cb7', marginTop: 10 }}
								>
									<use xlinkHref={`#anticon-${item.icon}`}></use>
								</svg>
								<p className={styles.js_bottom_button_title}>{item.title}</p>
							</div>
						})
					}
				</div>
			</div>
		</div>
	);
}

export default MicroWebsteComponent;
