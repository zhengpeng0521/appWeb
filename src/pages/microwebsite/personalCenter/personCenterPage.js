import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import MicroPersonCenterComponent from '../../../components/microwebsite/personalCenter/personCenterComponent.jsx';

function MicroPersonCenter({location, dispatch, microPersonCenter }) {
	
	let {
				
		dataSource,
		
	} = microPersonCenter;

	function dp(name, paramter) {
		dispatch({
			type : `microPersonCenter/${name}`,
			payload : {
				...paramter
			}
		})
	}

	//点击宝宝信息
	function touchBabyListFunction() {	
		
		let imageArr = dataSource.orgCover&&dataSource.orgCover.split(',');
		dispatch(
			routerRedux.push({
				pathname : '/microBabyList',
				query:  {
					orgId 		: dataSource&&dataSource.orgId,
					tenantId 	: dataSource&&dataSource.tenantId,
					parentId 	: dataSource&&dataSource.id,
				},
				state : {
					hasCRM 		: dataSource.hasCRM,
					hasCrmParent: dataSource.hasCrmParent,
					orgCover 		: imageArr&&imageArr.length > 0 ? `${imageArr[0]}!s300` : 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300',
					orgName		: dataSource.orgName || '',
				}
			})
		)
	}
	
	//点击回到首页
	function touchHomeFunction() {
		dispatch(routerRedux.push({
			pathname : '/microWebsite',
				query:  {
					orgId 		: dataSource&&dataSource.orgId,
					tenantId 	: dataSource&&dataSource.tenantId,
				},
			})
		)
	}
	
	//点击跳转到预约历史
	function touchMaaHistoryFunction() {
		let imageArr = dataSource.orgCover&&dataSource.orgCover.split(',');
		dispatch(
			routerRedux.push({
				pathname : '/microMaaHistory',
				query:  {
					orgId 		: dataSource&&dataSource.orgId,
					tenantId 	: dataSource&&dataSource.tenantId,
				},
				state : {
					cover 		: imageArr&&imageArr.length > 0 ? `${imageArr[0]}!s300` : 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300',
					orgName		: dataSource.orgName || '',
				}
			})
		)
	}
	
	//点击跳转到我的活动
	function touchMyActivityFunction() {
		let imageArr = dataSource.orgCover&&dataSource.orgCover.split(',');
		dispatch(
			routerRedux.push({
				pathname : '/microPersonMyactivity',
				query:  {
					orgId 		: dataSource&&dataSource.orgId,
					tenantId 	: dataSource&&dataSource.tenantId,
					parentId 	: dataSource&&dataSource.id,
				},
				state : {
					cover 		: imageArr&&imageArr.length > 0 ? `${imageArr[0]}!s300` : 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300',
					orgName		: dataSource.orgName || '',
				}
			})
		)
	}

	//点击跳转到查看课时
	function touchCourseTimeFunction() {
		dispatch(routerRedux.push('/microToViewClass'));
	}
	
	//点击跳转到我要请假
	function touchAskForLeaveFunction() {
		dispatch(routerRedux.push({
            pathname: '/microAskForLeave',
            query: {
                tenantId: dataSource.tenantId,
                orgId: dataSource.orgId,
                mobile: dataSource.mobile,
                parentId: dataSource.id,
            }
        }));
	}

    //点击跳转到扫码签到
	function touchToSignSelf() {
		dispatch(routerRedux.push({
            pathname: '/microSignSelf',
            query: {
                tenantId: dataSource.tenantId,
                orgId: dataSource.orgId,
                mobile: dataSource.mobile,
                parentId: dataSource.id,
            }
        }));
	}
	
	
	let props = {
		dp,
		dataSource,
		touchHomeFunction,
		touchBabyListFunction,
		touchMaaHistoryFunction,
		touchMyActivityFunction,
		touchCourseTimeFunction,
		touchAskForLeaveFunction,
        touchToSignSelf,
	}
	
    return (
		<MicroPersonCenterComponent {...props} />
    );
}

MicroPersonCenter.propTypes = {
  	microPersonCenter: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ microPersonCenter }) {
  return { microPersonCenter };
}

export default connect(mapStateToProps)(MicroPersonCenter);
