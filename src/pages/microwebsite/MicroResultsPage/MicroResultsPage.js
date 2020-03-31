import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import MicroResultsComponent from '../../../components/microwebsite/MicroResultsComponent/microResultsComponent.jsx';

function MicroResultsPage({location, dispatch, microResults }) {
	
	let {
		type,
		dataSource,
		stuName

	} = microResults;

	function dp(name, paramter) {
		dispatch({
			type : `microResults/${name}`,
			payload : {
				...paramter
			}
		})
	}

	function goHomeFunction() {
		window.localStorage.removeItem( stuName )
		dispatch(
			routerRedux.push({
				pathname : '/microWebsite',
				query : {
					orgId 		: microResults.orgId,
					tenantId 	: microResults.tenantId,
				},
			})
		);
	}
	
	function goPersonCenterunction() {
		dispatch({
			type : 'microResults/goPersonCenterunction',
			payload : {
				orgId    : microResults.orgId,
				tenantId : microResults.tenantId,
				stuName
			}
		})
//		dispatch(
//			routerRedux.push({
//				pathname : '/person_center',// '/microPersonCenter',
//				query : {
//					orgId 		: microResults.orgId,
//					tenantId 	: microResults.tenantId,
//				},
//			})
//		);
	}
	
	let props = {
		dp,
		type,
		dataSource,
		goHomeFunction,
		goPersonCenterunction,
	}
	
    return (
		<MicroResultsComponent {...props} />
    );
}

MicroResultsPage.propTypes = {
  	microResults: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ microResults }) {
  return { microResults };
}

export default connect(mapStateToProps)(MicroResultsPage);
