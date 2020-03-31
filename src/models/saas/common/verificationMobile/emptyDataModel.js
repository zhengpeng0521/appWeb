export default {

    namespace: 'emptyData',

    state: {
		
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/') {
					
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
