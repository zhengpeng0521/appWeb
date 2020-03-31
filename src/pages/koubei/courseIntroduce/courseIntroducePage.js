//相关页面的首页面 （进行关联modol）

import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CourseItem from '../../../components/koubei/courseIntroduce_cp/courseItem';
import EmptyData from '../../../components/koubei/emptyData_cp/emptyData';
 
function CourseIntroduce({location, dispatch, associatedCourseIntroduce }) {

    //获取modol数据
    let {
        dataSource,
        dataPage,
        currentPageIndex,
        currentPageSize,
		alipayUserId,
		merchant_pid,
		shop_id,
		tenant_id,
    } = associatedCourseIntroduce;

	//接入各种操作方法
	//点击课程封面进行跳转路由
    let touchCurrentItem = function (id) {
		dispatch(routerRedux.push({
            pathname: 'courseIntroduceDetailPage',
			query:{
				course_id 		: id,
				isShowMaa		: dataPage.showBtn,
				alipayUserId 	: alipayUserId,
				merchant_pid   	: merchant_pid,
				shop_id			: shop_id,
				tenant_id	 	: dataPage.tenant_id, 
			}
        }));
    };

	let loadNextPage = function () {
		dispatch({
        	type: 'associatedCourseIntroduce/getloadNextPageFunc',
      });
    };

	const userCourseProps = {
        touchCurrentItem,
		loadNextPage,
		dataSource,
        dataPage,
        currentPageIndex,
        currentPageSize,
		alipayUserId,
		merchant_pid,
		shop_id,
		tenant_id,
    };

	return (
        <div>
		{dataSource&&dataSource.length > 0 ? <CourseItem {...userCourseProps} /> : <EmptyData />}
        </div>
    );
}
   
CourseIntroduce.propTypes = {
  associatedCourseIntroduce: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ associatedCourseIntroduce }) {
  return { associatedCourseIntroduce };
}

export default connect(mapStateToProps)(CourseIntroduce);
