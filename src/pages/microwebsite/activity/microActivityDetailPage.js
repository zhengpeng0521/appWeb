import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import { Carousel } from 'antd-mobile';

import MicrowebsteComponent from '../../../components/microwebsite/activityDetial/activityDetialComponent';

function MicroActivityDetailPage({location, dispatch, microActivityDetail }) {

    let {
		
        activitySource,   //所有数据
		personInfo,
		showModal,
		activityOver,

    } = microActivityDetail;

	//跳转开设校区
	function showMoreSchool(){
        dispatch(
            routerRedux.push({
                pathname : '/microActivitySchool',
                query:  {
                    tenantId 	: microActivityDetail.tenantId,
                    orgId 		: microActivityDetail.orgId,
                    acId 		: activitySource&&activitySource.id,
                    nowState    : 2,
                },
            })
		)
    }

    //跳转到主页面
    function touchHomeIconFunction () {
        dispatch(
            routerRedux.push({
                pathname : '/microWebsite',
                query : {
                    orgId 		: microActivityDetail.orgId,
                    tenantId 	: microActivityDetail.tenantId,
                },
				state : {
                    openid 		: microActivityDetail.openid,
				}
            })
        );
    }

    //点击地图
    function callbackMap () {
		sa.track("mic_site_btn", {
			_tenantId	: microActivityDetail.tenantId || '未获取',
			_orgId		: microActivityDetail.orgId || '未获取',
			_micSiteBtn : '地图',
		});
        dispatch(
			routerRedux.push({
				pathname : '/microMapView',
				state : {
					address : activitySource&&activitySource.address,
					orgName : activitySource&&activitySource.orgName || '',
				}
			})
		)
    }
	
	function dp(name, paramter) {
		dispatch({
			type : `microActivityDetail/${name}`,
			payload : {
				...paramter
			}
		})
	}

	//跳转到报名页面->获取权限
	function showactivityJoin() {
		dispatch({
			type: `microActivityDetail/getPersonInfo`,
			payload: {
				tenantId: microActivityDetail.tenantId,
				orgId: microActivityDetail.orgId,
				isVipActivity: activitySource.activityType,
			}
		})
	}

	//跳转到报名页面->获取权限
	function functionMyActivityPage() {

		dispatch({
			type: `microActivityDetail/getPersonInfo`,
			payload: {
				tenantId: microActivityDetail.tenantId,
				orgId: microActivityDetail.orgId,
				isVipActivity: activitySource.activityType,
				reviewActivity : true,
			}
		})
	}

	let props = {
		dp,
        activitySource,   //所有数据
		showModal,
		functionMyActivityPage,
		activityAddress : {
            callbackMap,
            showMoreSchool,
            showactivityJoin,
            touchHomeIconFunction,
        }
	}

	let emptyDataStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		color: '#333',
		fontSize: '0.6rem',
	}

    return (
		activityOver ? <div style={emptyDataStyle}>活动已被删除</div> : <MicrowebsteComponent {...props} />
    );
}

MicroActivityDetailPage.propTypes = {
  	microActivityDetail: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ microActivityDetail }) {
  return { microActivityDetail };
}

export default connect(mapStateToProps)(MicroActivityDetailPage);
