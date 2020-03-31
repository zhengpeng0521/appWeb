import React, { PropTypes } from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import { ListView, Toast } from 'antd-mobile';

import MicroSelectCampusComponent from '../../../components/microwebsite/selectCampus/selectCampusComponent.jsx';

function MicroSelectCampusPage({location, dispatch, selectCampus }) {
	
	let {
		
		animating,
		isLoading,
		isLoadingEnd,
		campusListSource,
		campusListDataPage,
		activityIndicatorString,
		
	} = selectCampus;
	
	
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    let campusListSourceList 	= ds.cloneWithRows(campusListSource);
	
	function dp(name, paramter) {
		dispatch({
			type : `selectCampus/${name}`,
			payload : {
				...paramter,
				tenantId : selectCampus.tenantId,
			}
		})
	}

	//选择校区
	function touchCampusFunction(orgId) {
		dispatch(
			routerRedux.push({
				pathname : '/microWebsite',
				query : {
					tenantId	: selectCampus.tenantId,
					orgId 		: orgId,
				},
			})
		)
	}
	
	//搜索校区
	function touchSearchCampusFunction(value) {
		dp('getSelectCampus', {orgName  : value || ''});
	}
	
	//取消操作
	function touchCancelCampusFunction() {
		dp('getSelectCampus', {orgName  : ''});
	}
	
	let props = {
		dp,
		animating,
		isLoading,
		isLoadingEnd,
		campusListSource,
		campusListDataPage,
		campusListSourceList,
		touchCampusFunction,
		activityIndicatorString,
		touchSearchCampusFunction,
		touchCancelCampusFunction,
		
	}
	
    return (
		<MicroSelectCampusComponent {...props} />
    );
}

MicroSelectCampusPage.propTypes = {
  	selectCampus: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ selectCampus }) {
  return { selectCampus };
}

export default connect(mapStateToProps)(MicroSelectCampusPage);
