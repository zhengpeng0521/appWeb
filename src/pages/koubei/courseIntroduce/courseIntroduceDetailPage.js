//相关页面的首页面 （进行关联modol）

import React, { PropTypes } from 'react';
import { connect } from 'dva';
import CourseDetail from '../../../components/koubei/courseIntroduce_cp/courseIntroduce_detail';
import { routerRedux } from 'dva/router';
 
function CourseIntroduceDetail({location, dispatch, associatedCourseIntroduceDetail }) {

    let {
		courseDetailData,
		alipayUserId,
		course_id,
		shop_id,
		tenant_id,
		merchant_pid,
		isShowMaa,
    } = associatedCourseIntroduceDetail;

	let courseDetailProps = {
		courseDetailData,
		alipayUserId,
		course_id,
		shop_id,
		tenant_id,
		merchant_pid,
		isShowMaa,
	};

	return (
        <div>
             <CourseDetail {...courseDetailProps} />
        </div>
    );
}

CourseIntroduceDetail.propTypes = {
  associatedCourseIntroduceDetail: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ associatedCourseIntroduceDetail }) {
  return { associatedCourseIntroduceDetail };
}

export default connect(mapStateToProps)(CourseIntroduceDetail);




