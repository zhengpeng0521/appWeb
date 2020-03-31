export default {

    namespace: 'results',

    state: {
		resultType : undefined,
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen(location => {
			  	if (location.pathname === '/') {
					dispatch({
						type : 'updateState',
						payload : {
							resultType : location.query.type || 0,
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
