import { parse } from 'qs';

export default { 
    
    namespace: 'count_down', 
    
    state: {
		overStatus 		: false,			//是否结束(返回)
		autoPerform 	: false,			//私有
		overString 		: 'noOver',			//私有
		d_data 			: undefined,		//私有
		startTime 		: undefined,		//开始时间(必传)
		namespaceName 	: undefined,		//你的namespace(必传)
        gameStatus      : "1",              //默认为 已开始 状态
    },

    subscriptions: {
        setup({ dispatch, history }) {

        },  
    },
     
    effects: {

    },
    
    reducers: {
		updateState(state, action) {
            return {...state, ...action.payload};
        },
    }
}
