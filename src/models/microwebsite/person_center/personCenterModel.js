import {
	getPersonCenter,          //得到个人中心信息
	getBabyList,              //得到宝宝列表
    menuConfList,             //得到课配置的模块信息
} from '../../../services/microwebsite/microwebsiteService';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import { locale } from 'moment';

export default {

    namespace: 'personCenterModel',

    state: {
		tenantId                  : undefined,
		orgId                     : undefined,
		personCenterInfo          : {},                 //个人中心信息
		noPay					  : '',					//是否支付
		dataSource                : [],                 //宝宝列表
		cardStus                  : [],                 //会员宝宝列表
		outStus                   : [],                 //非会员宝宝列表
		selectedStuId             : undefined,          //选中的宝宝
		selectedStuItem           : {},                 //选中的宝宝信息
		ret                       : {},

        menuConfList              : [],                 //可配置的模块
        flag                      : false,               //配置模块是否全部不可见   true:全部不可见
	},

    subscriptions: {
	 	setup({ dispatch, history }) {
		  	history.listen( location => {
			  	if ( location.pathname === '/person_center' ) {
						console.log(location, 'location----------')
					//关闭请假申请 的时间选择框和申请框
					dispatch({
						type : 'askForLeaveModel/updateState',
						payload : {
							timeVisible        : false,
							askLeaveVisible    : false,
							selectedDataSource : [],
						}
					})
					document.title = '个人中心';
					function GetQueryString(name) {
						let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
						let r = window.location.search.substr(1).match(reg);
						if(r!=null)return  unescape(r[2]); return null;
					}
					let tenantId = GetQueryString('tenantId');
					let orgId = GetQueryString('orgId');
                    window.common = {
                        tenantId: location.query.tenantId,
                        orgId: location.query.orgId
                    }
					let link = `${ window.location.origin }${ window.location.pathname }?router=microWebsite&tenantId=${ tenantId || location.query.tenantId }&orgId=${ orgId || location.query.orgId }`;
					dispatch({
						type : 'initData',
						payload : {
							orgId 	  : location.query.orgId,
							tenantId  : location.query.tenantId,
							shareLink : link,
							ret       : location.state && location.state.ret || {},
							noPay	  : location.state && location.state.nopay || undefined,	
						}
					})
                    //获取可配置的信息
                    dispatch({
						type : 'menuConfList',
						payload : {
							orgId 	  : location.query.orgId,
							tenantId  : location.query.tenantId,
						}
					})

              	}
		  	});
		},
    },

    effects: {
		*initData({ payload },{ call, put, select }){
			let state = yield select(state => state.personCenterModel)
			let ret = payload.ret || state.ret;
			let params1 = {
				tenantId     : payload.tenantId,
				orgId        : payload.orgId,
				parentId     : !!ret && ret.id,
				hasCRM       : !!ret && ret.hasCRM,
				hasCrmParent : !!ret && ret.hasCrmParent
			}
			let babyList = yield call( getBabyList, ( params1 ));
			if( babyList && babyList.ret && babyList.ret.errorCode == 9000 ){
				let cardStus = babyList.ret.cardStus || [];
				let outStus  = babyList.ret.outStus || [];
				let dataSource = cardStus.concat( outStus ) || [];

				let values = {
					noPay			: payload && payload.noPay,
					dataSource      : dataSource || [],
				}
				if(!state.selectedStuId){
					values = {
						...values,
						selectedStuId   : !!dataSource[0] && dataSource[0].id || undefined,
						selectedStuItem : dataSource[0],
					}
				}
				yield put({
					type : 'updateState',
					payload : {
						...values
					}
				})
			}else{
				Toast.info( babyList && babyList.ret && babyList.ret.errorMessage || '宝宝列表请求失败' );
			}
			yield put({
				type : 'updateState',
				payload : {
					...payload,
					personCenterInfo : ret,
				},
			});

			window.COMMON_DATA.wxName = ret.wxName;
			// window.COMMON_DATA.parentId = ret.id;
			// sessionStorage.setItem('parentId', ret.id)

			let paramaterData = ret;
			let imageArr = paramaterData.orgCover && paramaterData.orgCover.split(',');
			setTimeout( function(){
				let share_title  = paramaterData.orgName || '微官网';
				let share_desc   = `${ share_title || '微官网' } -- 主页`;
				let share_link   = `${payload.shareLink}&parentId=${ret.id}`;
				let share_imgUrl = imageArr && imageArr.length > 0 ? `${ imageArr[0] }!s300` : 'http://115.29.172.104/gimg/img/1c74cd4fa620e8ec10e5dddcd3729fad!s300';
				let params = { share_title, share_desc, share_link, share_imgUrl };
				weixinSign( params );
				window.org_cover = share_imgUrl;
			}, 0 );
		},
        *'menuConfList'({ payload },{ call, put, select }){
            let params = {
				tenantId     : payload.tenantId,
				orgId        : payload.orgId,
			}
			let {ret} = yield call( menuConfList, ( params ));
			if( ret && ret.errorCode == 9000 ){
                yield put({
                    type :'updateState',
                    payload:{
                        menuConfList : ret.results,
                        flag  : ret.allMenu,
                    }
                })
//                let flag = true;
//                ret.results.map((item,index)=>{
//                    if(item.status=='2'){
//                        flag =false
//                    }
//                })
//                console.log('flag',flag)
            }
        }
    },

    reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
    }
}
