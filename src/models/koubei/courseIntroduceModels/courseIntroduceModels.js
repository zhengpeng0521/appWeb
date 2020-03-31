import { getCourseList } from '../../../services/koubei/courseIntroduceServices/courseIntroduce_sv';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';

//只需要改变状态
export default { 
    
    namespace: 'associatedCourseIntroduce', //和页面关联数据时候需要对接
    
    //初始化数据
    state: {
        dataSource 		: [],                	// 数据
        dataPage 		: {},	                // 分页数据
        currentPageIndex: 0,            		// 当前分页信息
        currentPageSize	: 10,            		// 当前分页信息
        loading 		: false,                // 是否在加载
		alipayUserId	: null,					// 获取支付宝id
		merchant_pid	: null,					// 获取租户id
		shop_id			: null,					// 获取商铺id
		tempDataSource	: [],					// 保存请求到的数据
    },

    //(时机)通过路由进入的时候请求数据
    subscriptions: {
        setup({ dispatch, history }) {
          history.listen(location => {
            if (location.pathname === '/courseIntroducePage') {
                //埋点
                window.alipayBreakpoint('2016061601525581','201612060244770111',location.query.shop_id,'进入口碑课程介绍首页','booking_start','start');
                dispatch({
                     type: 'requestCourseList',  //找到effects里面对应的方法
                     payload: {
                         alipayUserId : location.query.alipayUserId,
                         merchant_pid : location.query.merchant_pid,
                         shop_id	  : location.query.shop_id,
                     },
                });
			 }
          });
        },  
    },
    
    //put  执行一个方法
    //call 调用一个请求    
    effects: {
		//加载第一页数据
        *requestCourseList({ payload }, {select, call, put }) {
        	let initParameter 	= yield select(state => state);
			let pageIndex	 	= initParameter.associatedCourseIntroduce.currentPageIndex;
			let pageSize 		= initParameter.associatedCourseIntroduce.currentPageSize;
			let parameter 		= {...payload, pageIndex, pageSize};
            //埋点
            window.alipayBreakpoint('2016061601525581','201612060244770111',payload.shop_id,'口碑课程列表查询','booking_acitvity','action');
			const { ret, err } = yield call(getCourseList, parse(parameter));
            if(ret && ret.errorCode === 9000) {
				yield put({
					type: 'getCourseListSuccessOrFailure',
					payload: {
						...payload,
						dataSource	: ret.results,
						dataPage 	: ret.data,
						tempDataSource  : ret.results,
				  },
				});
                //埋点
                window.alipayBreakpoint('2016061601525581','201612060244770111',payload.shop_id,'口碑课程列表查询成功','booking_acitvity','end');
            } else {
				//判断失败
				yield put({
                     type: 'getCourseListSuccessOrFailure',
                }); 
                //埋点
                window.alipayBreakpoint('2016061601525581','201612060244770111',payload.shop_id,'口碑课程列表查询失败','booking_acitvity','error');
            };
        },

		//加载下一页数据
		*getloadNextPageFunc({ payload }, {select, call, put }) {
			let initParameter 	= yield select(state => state);
			let alipayUserId 	= initParameter.associatedCourseIntroduce.alipayUserId;
			let merchant_pid 	= initParameter.associatedCourseIntroduce.merchant_pid;
			let shop_id 		= initParameter.associatedCourseIntroduce.shop_id;
			let pageIndex	 	= initParameter.associatedCourseIntroduce.dataPage.pageIndex;
			let pageSize 		= initParameter.associatedCourseIntroduce.dataPage.pageSize;
			let totalPage		= initParameter.associatedCourseIntroduce.dataPage.pageCount;
			let parameter 		= {
									alipayUserId,
									merchant_pid,
									shop_id,
									pageSize,
									pageIndex
								  };
			//取出上次存储的数据
			let tds = initParameter.associatedCourseIntroduce.tempDataSource;

            //埋点
            window.alipayBreakpoint('2016061601525581','201612060244770111',payload.shop_id,'口碑课程列表查询','booking_acitvity','action');
			if(pageIndex < totalPage) {
				const { ret, err } = yield call(getCourseList, parse(parameter));
				if(ret && ret.errorCode === 9000 && ret.results.length > 0) {
					//添加本次取到的数据
					ret.results.map(function(item, index){
						tds.push(item);
					});

					yield put({
						type: 'getCourseListSuccessOrFailure',
						payload: {
							...payload,
							dataSource		: tds,
							dataPage 		: ret.data,
							tempDataSource  : tds,
					  },
					});
                    //埋点
                    window.alipayBreakpoint('2016061601525581','201612060244770111',payload.shop_id,'口碑课程列表查询成功','booking_acitvity','end');
				} else {
					//判断失败
					yield put({
						 type: 'getCourseListSuccessOrFailure',
					});
                    //埋点
                    window.alipayBreakpoint('2016061601525581','201612060244770111',payload.shop_id,'口碑课程列表查询失败','booking_acitvity','error');
				};
			}
		},
    },
    reducers: {
        getCourseListSuccessOrFailure(state, action) {
            return {...state, ...action.payload, loading : false};
        },
    }
}
