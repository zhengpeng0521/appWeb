import {
	getClassDetail,            //获取约课详情
    checkAge,                  //年龄检测
    orderClass,                //约课
    cancelOrder,               //取消约课
    segMent,                    //适龄判断
} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import moment from 'moment';
import { stat } from 'fs';

export default {

    namespace: 'classDetailModel',

    state: {
        tenantId                  : undefined,
		orgId                     : undefined,
		stuId                     : undefined,
		item                      : {},
        status                    : '',
        detailInfo                : {},         //详情
        loading                   : false,

        visible                   : false,
        ageTop                    : '',
        ageContent                : '',
        animating:                  false,
        shut: '',
        courseAgeLimit              :'',//年龄范围
        age                         : '',
        rightAge: false,
        visibleTow: false,
        confLimit:false
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/class_detail' ) {
					document.title = '约课详情';
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if( r != null )return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString('tenantId');
					let orgId    = GetQueryString('orgId');

					let link = `${ window.location.origin }${ window.location.pathname }?router=microWebsite&tenantId=${ tenantId }&orgId=${ orgId || location.query.orgId }`;

					dispatch({
						type: 'updateState',
						payload : {
							item	: location.state && location.state.item || {},
							status  : location.state && location.state.status || '暂无',
                            selectedDate: location.state && location.state.selectedDate,
						}
					});
				}
		  	});
		},
    },

    effects: {
        /*获取约课详情*/
        *getClassDetail({ payload }, { call, put, select }) {
            let { ret } = yield call(getClassDetail, (payload))
            if( ret && ret.errorCode == 9000 ){
                yield put({
                    type: 'updateState',
                    payload: {
                        detailInfo: ret,
                        tenantId: payload.tenantId,
                        orgId: payload.orgId,
                        stuId: payload.stuId,
                        cpdId: payload.cpdId,
                    }
                })
            }else{
				Toast.info( ret && ret.errorMessage || '获取约课详情出错' )
			}
        },
/*适龄*/
*segMent({ payload }, { call, put, select }) {
    let state = yield select(state => state.classDetailModel)
    let { ret } = yield call(segMent, (payload))
    if (ret && ret.errorCode == 0) {
        yield put({
            type: 'updateState',
            payload: {
                age: ret.age,
                courseAgeLimit: ret.courseAgeLimit,
                rightAge: ret.rightAge,
                confLimit: ret.confLimit,
            }
        })
        if (ret.rightAge) {
            yield put({
                type: 'orderClass',
                payload: {
                    ...payload,
                    cpdId: !!state.detailInfo ? state.detailInfo.cpdId : undefined,
                    peopleType: 2 // 家长约课
                }
            })
        } else {
            if (ret.confLimit) {
                yield put({
                    type: 'updateState',
                    payload: {
                        visibleTow: false,
                        visible: true,
                    }
                })
            } else {
                yield put({
                    type: 'updateState',
                    payload: {
                        visibleTow: true,
                        visible: false,
                    }
                })
            }
        }
    }
},
        /*年龄检测*/
        *checkAge({ payload }, { call, put, select }) {
            yield put({type: 'updateState', payload: { loading: true }})
            let classDetailModel = yield select(state => state.classDetailModel)
            let { ret } = yield call(checkAge, (payload))
            if (ret && ret.errorCode == 9000) {
                yield put({
                    type: 'orderClass',
                    payload: {
                        ...payload,
                        cpdId: !!classDetailModel.detailInfo ? classDetailModel.detailInfo.cpdId : undefined,
                        peopleType: 2 // 家长约课
                    }
                })
            }else if(ret && ret.errorCode == 1000){
                let ageText = ret.ageType == '1' ? '月龄' : '年龄'
                yield put({
                    type: 'updateState',
                    payload: {
                        ageTop: `${ageText}: ${ret.age}`,
                        ageContent: ret.message,
                        // visible: true,
                    }
                })
                yield put({type: 'updateState', payload: { loading: false }})
            }else{
				Toast.info( ret && ret.errorMessage || '年龄检测出错' )
                yield put({type: 'updateState', payload: { loading: false }})
			}
        },
        /*约课*/
        *orderClass({ payload },{ call, put, select }){
            let classDetailModel = yield select(state => state.classDetailModel)
            if(classDetailModel.visible){
                yield put({type: 'updateState', payload: {animating: true}})
            }

            let { ret } = yield call(orderClass, (payload))
            if( ret && ret.errorCode == 9000 ){
                yield put(routerRedux.push({
                    pathname: '/order_result',
                    query: {
                        result: 'ok',
                        selectedDate: classDetailModel.selectedDate,
                        tenantId: classDetailModel.tenantId,
                        orgId: classDetailModel.orgId,
                        stuId: classDetailModel.stuId,
                    }
                }))
                yield put({
                    type: 'updateState',
                    payload: {
                        visible: false,
                        visibleTow:false
                    }
                })
            }else if(ret && ret.errorCode == 1000){
                yield put(routerRedux.push({
                    pathname: '/order_result',
                    query: {
                        result: 'err',
                        failContent: ret.errorMessage,
                        tenantId: classDetailModel.tenantId,
                        orgId: classDetailModel.orgId,
                        stuId: classDetailModel.stuId,
                    }
                }))
			} else {
                Toast.info( ret && ret.errorMessage || '约课出错' )
            }

            yield put({type: 'updateState', payload: {loading: false, animating: false,visible: false,visibleTow:false}})
        },

        /*取消约课*/
        *cancelOrder({ payload },{ call, put, select }){
            yield put({type: 'updateState', payload: { loading: true }})
            let {ret} = yield call(cancelOrder, (payload))
            if( ret && ret.errorCode == 9000 ){
                yield put(routerRedux.push({pathname: '/cancel_result'}))
            }else{
                Toast.info( ret && ret.errorMessage || '取消约课出错' )
            }
            yield put({type: 'updateState', payload: { loading: false }})
        },
    },

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
