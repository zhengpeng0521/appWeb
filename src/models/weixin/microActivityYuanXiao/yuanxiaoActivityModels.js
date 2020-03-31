import { parse } from 'qs';
import { submitAPI, getActivityAPI}  from '../../../services/weixin/microActivityService';
import { Toast } from 'antd-mobile';

export default {

    namespace: 'yuanxiaoActivity',

    state: {
		babyName 		        : '',
		babyPhone 		        : '',
		playClassName 	        : 'startPlayer',
		mainData		        : {},
		detailDataSource	    : [],
        nIndex                  : 0,
        iosAutoPlay             : true,
    },

    subscriptions: {
         setup({ dispatch, history }) {
              history.listen(location => {
                  if (location.pathname === '/microActivityYuanXiaoPage') {
					  	_hmt.push(['_trackEvent', '微活动2017元宵', `租户ID=${location.query.tenantId || ''}`, `机构ID=${location.query.org_id}`, '-']);
					  	dispatch({
                          	type: 'getAitivityData',
                          	payload: {
                             	activityDataId 	: location.query.activityDataId,
                              	org_id			: location.query.org_id,
                             	tenantId	  		: location.query.tenantId,
                             	activityId	 	: location.query.activityId,
								caseValue			: location.query.Case,
                          	}
                        });
                    }
              });
         },
    },

    effects: {
		*getAitivityData({payload}, {select, call, put}) {
			const {ret, err} = yield call(getActivityAPI, parse(payload));

            if(ret && ret.errorCode == 9000) {
             	let maindata  = JSON.parse(ret.data.activityData.mainData);
	            let shareInfo = maindata.share_config;
                let url = String(window.document.location.href);
     
				setParam (
					payload.tenantId || '获取失败',
					payload.org_id || '获取失败',
					'H004', payload.caseValue || '获取失败',
					payload.activityDataId || '获取失败',
					maindata.name || '获取失败',
				)
				
                if(!isiOS) {
                     wxShare();
                }

                wx.ready(function(){
                    var info = {
                        title	: shareInfo&&shareInfo.title,
                        link	: url,
                        imgUrl	: shareInfo&&shareInfo.imgurl,
                        desc	: shareInfo&&shareInfo.intro,
                    };
                    share(info);
                });

                wx.error(function(res){

                });

                function requestShareAddNum() {
                    $.ajax({
                        async: false,
                        url: "https://www.ishanshan.com/omp-org/appMicroActivity/addShareNum",
                        data: {"id" : payload.activityDataId},
                        type: 'get',
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        success: function (result) {},
                        error:function(){},
                    });
                }

                function share(info){

                    wx.onMenuShareTimeline({
                        title  : info.title,
                        link   : info.link,
                        desc   : info.desc,
                        imgUrl : info.imgUrl,
                        success: function () {
                            requestShareAddNum();
							sa.track("m_a_share", buriedPointParam);
                        },
                        cancel: function () {}
                    });

                    wx.onMenuShareAppMessage({
                        title  : info.title,
                        desc   : info.desc,
                        link   : info.link,
                        imgUrl : info.imgUrl,
                        success: function () {
                             requestShareAddNum();
							sa.track("m_a_share", buriedPointParam);
                        },
                        cancel: function () {}
                    });

                    wx.onMenuShareQQ({
                        title  : info.title,
                        desc   : info.desc,
                        link   : info.link,
                        imgUrl : info.imgUrl,
                        success: function () {
                            requestShareAddNum();
							sa.track("m_a_share", buriedPointParam);
                        },
                        cancel: function () {}
                    });

                    wx.onMenuShareWeibo({
                        title    : info.title,
                        desc     : info.desc,
                        link     : info.link,
                        imgUrl   : info.imgUrl,
                        success  : function () {
                            requestShareAddNum();
							sa.track("m_a_share", buriedPointParam);
                        },
                        cancel: function () {}
                    });

                    wx.onMenuShareQZone({
                        title    : info.title,
                        desc     : info.desc,
                        link     : info.link,
                        imgUrl   : info.imgUrl,
                        success: function () {
                            requestShareAddNum();
							sa.track("m_a_share", buriedPointParam);
                        },
                        cancel: function () {}
                    });
                }
                 
                yield put({
                    type: 'updateState',
                    payload: {
                        ...payload,
                        mainData	 : JSON.parse(ret.data.activityData.mainData),
                        detailDataSource  : JSON.parse(ret.data.activityData.detailData),
                    },
                });

			} else {
				Toast.info(ret.errorMessage);
			}
		},

		*updateInputName({payload}, {select, call, put}) {
			yield put({
				type : 'updateState',
				payload : {
					...payload
				},
			});
		},

		*updateInputPhone({payload}, {select, call, put}) {
			yield put({
				type : 'updateState',
				payload : {
					...payload,
				},
			});
		},

		*startRotate({payload}, {select, call, put}) {
			yield put ({
				type : 'updateState',
				payload : {
					...payload,
					playClassName : 'startPlayer',
                    iosAutoPlay   : false,
				},
			});
		},

	  	*stopRotate({payload}, {select, call, put}) {
			yield put({
				type : 'updateState',
				payload : {
					...payload,
					playClassName : 'stopPlayer',
                    iosAutoPlay   : false,
				},
			});
		},

		*submit({payload}, {select, call, put}) {

			let initParameter 	= yield select(state => state);
			let id 				= initParameter.yuanxiaoActivity.activityDataId;
			let name			= initParameter.yuanxiaoActivity.babyName;
			let mobile			= initParameter.yuanxiaoActivity.babyPhone;
				mobile			= mobile.replace(/\s/g, "");
			let parameter 		= {id,name,mobile};
			let reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
			if(payload.name == "" ) {Toast.info('宝宝姓名不能为空');return false;}
			if(payload.name.match(/\d+/g)) {Toast.info('宝宝姓名不能包含数字');return false;}
			if(payload.phone == "") {Toast.info('手机号码不能为空');return false;}
			if(!(reg.test(mobile))) {Toast.info('手机号码输入有误');return false;}
			const {ret, err} = yield call(submitAPI, parse(parameter));
			if(ret && ret.errorCode == 9000) {
				Toast.info('提交成功');
				sa.track("m_a_load", buriedPointParam);
				yield put({
					type: 'updateState',
					payload: {
						...payload,
					},
				});
			} else {
				Toast.info('提交失败');
			}
		},

        *changePageIndex({payload}, {select, call, put}){
            yield put ({
				type : 'updateState',
				payload : {
					...payload,
				},
			});
        },
    },

    reducers: {
		updateState(state, action) {return {...state, ...action.payload};},
    }
}
