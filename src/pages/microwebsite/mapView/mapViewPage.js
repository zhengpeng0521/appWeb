import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';

import MicroMapViewComponent from '../../../components/microwebsite/mapView/mapViewComponent.jsx';

function MicroMapViewPage({location, dispatch, microMapView}) {
	
    let {
		
		orgName,
		address,
		city,
		lng,
		lat,
		
	} = microMapView;

	function dp(name, paramter) {
		dispatch({
			type : `microMapView/${name}`,
			payload : {
				...paramter	
			}
		})
	}

	let props = {
		orgName,
		address,
		city,
		lng,
		lat,
		dp,
	}
	
    return (
		<MicroMapViewComponent {...props} />
    );
}

MicroMapViewPage.propTypes = {
  	microMapView: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ microMapView }) {
  return { microMapView };
}

export default connect(mapStateToProps)(MicroMapViewPage);
