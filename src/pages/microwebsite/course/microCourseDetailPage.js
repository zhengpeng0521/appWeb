import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import { Carousel } from 'antd-mobile';

import MicroCourseDetailComponent from '../../../components/microwebsite/courseDetail/courseDetailComponent';

function MicroCourseDetailPage({location, dispatch, microCourseDetail }) {

    let {
		
        courseSource,
		
    } = microCourseDetail;

    //跳转校区
    function showmoreSchoolFun (){
        dispatch(
            routerRedux.push({
                pathname : '/microActivitySchool',
                query:  {
                    nowState    : 1,
                    orgId 		: microCourseDetail.orgId,
                    tenantId 	: microCourseDetail.tenantId,
                    acId        : courseSource&&courseSource.id,
                    orgIds      : courseSource&&courseSource.orgIds,
                },
            })
		)
    }

    //预约试听
    function microMaaFun () {
		_hmt.push(['_trackEvent', '微官网', `机构ID=${microCourseDetail.orgId || '未获取'}`, '点击课程预约', '-']);
		dispatch(
			routerRedux.push({
				pathname : '/microMaa',
				query:  {
					type 			: '2',
					id				: courseSource.id,
					courseName		: encodeURIComponent(courseSource.name),
					orgId 			: microCourseDetail.orgId,
					tenantId 		: microCourseDetail.tenantId,
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
                    orgId 		: microCourseDetail.orgId,
                    tenantId 	: microCourseDetail.tenantId,
                },
            })
        );
    }

    //点击地图
    function callbackMap () {
		sa.track("mic_site_btn", {
			_tenantId	: microCourseDetail.tenantId || '未获取',
			_orgId		: microCourseDetail.orgId || '未获取',
			_micSiteBtn : '地图',
		});
        dispatch(
			routerRedux.push({
				pathname : '/microMapView',
				state : {
					address : courseSource.address || '',
					orgName : courseSource.orgName || '',
				}
			})
		)
    }

	let props = {
        showmoreSchoolFun,microMaaFun,touchHomeIconFunction,callbackMap,courseSource,
	}

    return (
		<MicroCourseDetailComponent {...props} />
    );
}

MicroCourseDetailPage.propTypes = {
  	microCourseDetail: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ microCourseDetail }) {
  return { microCourseDetail };
}

export default connect(mapStateToProps)(MicroCourseDetailPage);
