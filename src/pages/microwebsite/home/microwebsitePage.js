import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { Carousel, ListView, Toast } from 'antd-mobile';

import MicrowebsteComponent from '../../../components/microwebsite/home/microwebsteComponent.jsx';

function MicroWebstePage({location, dispatch, microwebsite}) {
	
    const {
		
		pageIndex,
		bannerList,
		activityList,
		activityPage,
		activityIsLoading, 
 		activityIsLoadingEnd,
		courseList,
		coursePage,
		courseIsLoading,
		courseIsLoadingEnd,
		gameList,
		gamePage,
		gameIsLoading,
		gameIsLoadingEnd,
		gameProverList,
		orgDataSource,
		configSource,
		defaultTabValue,
		showAllContentString,
		recordTenantId,
		recordOrgId,
		showBigAlbum,
		showBigTeacher,
		selectBigAlbumIndex,
		selectTeacherIndex,
		recordScrollTop,
		visshow,
		qrVisible,
		firstIn,
		officialAccount,
		liveList,
		livePage,
		liveLoading,
		liveLoadingEnd,
		officialShow,
		oaInfo,
    } = microwebsite;

    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    let courseListDataSource 	= ds.cloneWithRows(courseList);
	let activityListDataSource 	= ds.cloneWithRows(activityList);
	let gameListDataSource 		= ds.cloneWithRows(gameList);
	let liveListDataSource = ds.cloneWithRows(liveList);

	function dp(name, paramter) {
		dispatch({
			type : `microwebsite/${name}`,
			payload : {
				...paramter	
			}
		})
	}
		
	//点击首页home按钮
	function touchHomeIconFunction() {
		dp('updateState', {defaultTabValue : "0"});
	}
	
	//点击首页机构按钮
	function touchJigouIconFunction() {
				
		sa.track("mic_site_o_chg", {
			_tenantId	: microwebsite.tenantId || '未获取',
			_orgId		: microwebsite.orgId || '未获取',
			_wxId		: openid || '未获取',
		});
						
        dispatch(
			routerRedux.push({
				pathname : '/microActivitySchool',
				query : {
					orgId 		: microwebsite.orgId,
					tenantId 	: microwebsite.tenantId,
                    type        : 'microWebsite',
                    nowState    : 3,
				},
			})
		);
	}

	//跳转到图片展示
	function funcChangeScrollProps(param) {
		dispatch(
			routerRedux.push({
				pathname : '/showCover',
				state : param,
				query : {
					orgId 		: microwebsite.orgId,
					tenantId 	: microwebsite.tenantId,
                    type        : 'microWebsite',
				},
			})
		);

	}

	//点击首页个人中心按钮
	function touchPersonIconFunction() {
		dispatch({
			type : 'microwebsite/touchPersonIconFunction',
			payload : {
				orgId 		: microwebsite.orgId,
				tenantId 	: microwebsite.tenantId,
			}
		})
//		dispatch(
//			routerRedux.push({
//				pathname : '/person_center',
//				query : {
//					orgId 		: microwebsite.orgId,
//					tenantId 	: microwebsite.tenantId,
//				},
//			})
//		);
	}
	
	//点击跳转到地图界面
	function callbackMapFunction(address, longAndLat) {
		dispatch(
			routerRedux.push({
				pathname : '/microMapView',
				state : {
					longAndLat : longAndLat,
					address : orgDataSource.address,
					orgName : microwebsite.orgDataSource.orgName || '',
					city	: orgDataSource.city || '',
				}
			})
		)
	}

	//点击预约
	function touchMaaFunction () {
		dispatch(
			routerRedux.push({
				pathname : '/microMaa',
				query:  {
					tenantId 		: microwebsite.tenantId,
					orgId 			: microwebsite.orgId,
					type			: '1',
				},
			})
		)
	}

    //展开活动详情
    function touchActivityFunction (id) {
		_hmt.push(['_trackEvent', '微官网活动详情', `机构ID=${microwebsite.orgId || '未获取'}`, `活动ID${id || '未获取'}`, '-']);
		if(id != undefined && id != '' && id != null) {
			dispatch(
				routerRedux.push({
					pathname : '/microActivityDetail',
					query:  {
						tenantId 		: microwebsite.tenantId,
						orgId 			: microwebsite.orgId,
						actId			: id,
					},
				})
			)
		} else {
			Toast.info('未获取活动id', 1);
		}
    }

    //展开课程详情
    function touchCourseFunction (id) {
		_hmt.push(['_trackEvent', '微官网课程详情', `机构ID=${microwebsite.orgId || '未获取'}`, `课程ID${id || '未获取'}`, '-']);
		if(id != undefined && id != '' && id != null) {
			dispatch(
				routerRedux.push({
					pathname : '/microCourseDetail',
					query:  {
						tenantId 		: microwebsite.tenantId,
						orgId 			: microwebsite.orgId,
						actId			: id,
					},
				})
			)
		} else {
			Toast.info('未获取课程id', 1);
		}
    }
	
	function dispathRouterFunction(data) {
		if(data.type == 1) {
			dispatch(
				routerRedux.push({
					pathname : '/microCourseDetail',
					query:  {
						tenantId 		: microwebsite.tenantId,
						orgId 			: microwebsite.orgId,
						actId			: data.uri,
					},
				})
			)
		} else if (data.type == 2) {
			dispatch(
				routerRedux.push({
					pathname : '/microActivityDetail',
					query:  {
						tenantId 		: microwebsite.tenantId,
						orgId 			: microwebsite.orgId,
						actId			: data.uri,
					},
				})
			)
		} else if (data.type == 3) {
			let obj = data.uri;
			if(obj && obj.indexOf('http') == -1) {
				window.location.href = `${window.location.protocol}//${data.uri}`;
			} else {
				window.location.href = `${data.uri}`;
			}
		} else {
			
		}
	}

	function pauseFunction(){
		dispatch({
			type: 'microwebsite/updateState',
			payload:{
				visshow:true
			}
		})
	}

	function vouterFunction(){
		// 暂停轮播
		dispatch({
			type: 'microwebsite/updateState',
			payload:{
				visshow:false
			}
		})
	}

	function endFunction(){
		dispatch({
			type: 'microwebsite/updateState',
			payload:{
				visshow:true
			}
		})
	}

	let props = {
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
		dispathRouterFunction,
		configSource,
		orgDataSource,
		defaultTabValue,
		showAllContentString,
		touchHomeIconFunction,
		touchJigouIconFunction,
		touchPersonIconFunction,
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
		vouterFunction,
		pauseFunction,
		visshow,
		endFunction,
		qrVisible,
		firstIn,
		officialAccount,
		liveList,
		livePage,
		liveLoading,
		liveLoadingEnd,
		liveListDataSource,
		officialShow,
		oaInfo
	}

    return (
		<MicrowebsteComponent {...props}/>
    );
}

MicroWebstePage.propTypes = {
  	microwebsite: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ microwebsite }) {
  return { microwebsite };
}

export default connect(mapStateToProps)(MicroWebstePage);
