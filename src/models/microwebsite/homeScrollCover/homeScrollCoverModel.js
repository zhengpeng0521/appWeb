import { parse } from 'qs';
import { routerRedux } from 'dva/router';

export default {

    namespace: 'homeScrollCover',

    state: {
		selectBigAlbumIndex : 0,
		selectTeacherIndex : 0,
		orgAlbumArr : [],
		teachersArr : [],
		showBigAlbum : false,
		showBigTeacher : false,
		tenantId : 0,
		orgId : 0,
    },

    subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				if (location.pathname === '/showCover') {
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString("tenantId");
					let orgId = GetQueryString("orgId");
					console.log(location.state)
					dispatch({
						type : 'updateState',
						payload : {
							selectBigAlbumIndex : location.state.selectBigAlbumIndex || 0,
							selectTeacherIndex 	: location.state.selectTeacherIndex || 0,
							orgAlbumArr 		: location.state.orgAlbumArr || [],
							teachersArr 		: location.state.teachersArr || [],
							showBigAlbum 		: location.state.showBigAlbum || false,
							showBigTeacher 		: location.state.showBigTeacher || false,
							tenantId			: tenantId,
							orgId				: orgId,
						}
					})
				}
			});
		},
    },

    effects: {

    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
