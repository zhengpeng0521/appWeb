import { parse } from 'qs';
import * as service from '../../../services/microwebsite/microwebsiteService';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'microMapView',

    state: {
		orgName : '',
		address : '',
		city	: '',
		lng 	: 0,
		lat 	: 0,
		
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/microMapView') {
					document.title = "机构地址";
					dispatch({
						type: 'getMapView',
						payload : {
							orgName : location.state.orgName || '',
							address : location.state.address || '',
							city	: location.state.city || '',
							longAndLat : location.state.longAndLat || '',
						},
					});
				}
		  	});
		},
    },

    effects: {		
		
		*getMapView({payload}, {select, call, put}) {	
			
			let url = '';
			let lng = payload.longAndLat.long || '';
			let lat = payload.longAndLat.lat || '';
			
			if((lng != undefined && lng != '' && lng != "0") && (lat != undefined && lat != '' && lat != "0")) {
				url = `https://api.map.baidu.com/api?v=2.0&ak=ea91dy3HDvuYLuuDgLsp7LOGBe0v2BbZ&callback=longitudeAndlatitude(${lng}, ${lat})`;
			} else {
				url = `https://api.map.baidu.com/api?v=2.0&ak=ea91dy3HDvuYLuuDgLsp7LOGBe0v2BbZ&callback=initialize('${payload.address}')`;
			}
			loadScript(url);
			
			yield put({
				type : 'updateState',
				payload : {
					orgName : payload.orgName,
					address : payload.address,
					city	: payload.city, 
					lng 	: lng,
					lat 	: lat,
				}
			})
		},
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
