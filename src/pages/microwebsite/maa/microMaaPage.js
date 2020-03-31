import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';

//import { Carousel } from 'antd-mobile';

import MicroMaaComponent from '../../../components/microwebsite/maa/microMaaComponent.jsx';

function MicroMaaPage({location, dispatch, microMaa}) {
	
    const {
		
		maaConfig,
		requestError,
		selectCampus,
		campusAddress,
		selectCampusId,
		campusListSource,
		currentSexFemale,
		currentSexMan,
		isTouchMaa,
		tenantId,
		orgId,
		courseName,
	} = microMaa;
	function dp(name, paramter) {
		dispatch({
			type : `microMaa/${name}`,
			payload : {
				...paramter	
			}
		})
	}

	function touchCampusMapFunction(address) {
//		dispatch(
//			routerRedux.push({
//				pathname : '/microMapView',
//				query:  {
//					address : address,
//				},
//				state : {
//					orgName : selectCampus,
//				}
//			})
//		)
	}
	
	//预约历史
	function jumpMaaHistoryFunction () {
		dispatch(
			routerRedux.push({
				pathname : '/microMaaHistory',
				query : {
					tenantId 	: microMaa.tenantId,
					orgId 		: microMaa.orgId,
				},
			})
		)
	}

	let props = {
		dp,
		maaConfig,
		isTouchMaa,
		currentSexFemale,
		currentSexMan,
		requestError,
		selectCampus,
		campusAddress,
		selectCampusId,
		campusListSource,
		jumpMaaHistoryFunction,
		touchCampusMapFunction,
		tenantId,
		orgId,
		courseName,
	}
	

    return (
		<MicroMaaComponent {...props} />
    );
}

MicroMaaPage.propTypes = {
  	microMaa: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ microMaa }) {
  return { microMaa };
}

export default connect(mapStateToProps)(MicroMaaPage);
