import fetch from 'dva/fetch';
import reqwest from 'reqwest';
require('lie/polyfill');

import qs from 'qs';

const crypto = require('crypto');

const request_param_sha = "ishanshan.com";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
window.requestData = function(url, options) {

    let bodyStr = options.body;

    if(bodyStr && bodyStr.length > 0) {
        let bodyObj = qs.parse(bodyStr);
        bodyObj.request_param_sha_212 = "";
        const hash = crypto
                    .createHmac('sha256', request_param_sha)
                    .update(JSON.stringify(bodyObj))
                    .digest('hex');
        bodyObj.request_param_sha_212 = hash;

        options.body = qs.stringify(bodyObj)
    }
	
    options = {
        ...options,
        credentials: 'include',     //fetch  请求加上cookie
        headers: {
            ...options.headers,
            isAjax: 'yes',
            // 'x-rule': '1#jsj',
        }
    };
		
  	return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((ret) => ({ ret }))
    .catch((err) => ({ err }));
}  

window.activityShareNumber = function (id) {
	reqwest({
		async: false,
		url: "https://www.ishanshan.com/omp-org/appMicroActivity/addShareNum",
		data: {"id" : id},
		type: 'jsonp',
		jsonp: 'callback',
		success: function (result) {},
	});
}

window.weixinSign_1 = function(shareParams) {
    let share_title = shareParams.share_title || '';
    let share_desc = shareParams.share_desc || '';
    let share_link = shareParams.share_link || '';
    let share_imgUrl = shareParams.share_imgUrl || '';

    let after_share = shareParams.after_share;

    var current_location_url = window.location.href;
    var current_location_url_config = current_location_url.split('#')[0];

    let weixinSignUrl = "https://www.ishanshan.com/wxapp/wxauth/wx/jp/jsconfig/wxe5bd129decc89caf/wx0a0242dd3212dd48?url="+encodeURIComponent(current_location_url_config);

    reqwest({
          url: weixinSignUrl,
          type: 'jsonp',
          success: function(ret) {
                wx.config({
	        	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	        	    appId: ret.appId, // 必填，公众号的唯一标识
	        	    timestamp: ret.timestamp, // 必填，生成签名的时间戳
	        	    nonceStr: ret.nonceStr, // 必填，生成签名的随机串
	        	    signature: ret.signature,// 必填，签名，见附录1
	        	    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	        	  });
                wx.ready(function(){

                    wx.onMenuShareTimeline({
                        title: share_title, // 分享标题
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function() {
                        	after_share && after_share();
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: share_title, // 分享标题
                        desc : share_desc,
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function() {
                        	after_share && after_share();
                        }
                    });

                    wx.onMenuShareQQ({
                        title: share_title, // 分享标题
                        desc: share_desc,
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function() {
                        	after_share && after_share();
                        }
                    });

                    wx.onMenuShareWeibo({
                        title: share_title, // 分享标题
                        desc: share_desc,
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function() {
                        	after_share && after_share();
                        }
                    });

                    wx.onMenuShareQZone({
                        title: share_title, // 分享标题
                        desc: share_desc,
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function() {
                        	after_share && after_share();
                        }
                    });
                });
          }
        });
}


window.weixinSign = function( shareParams, type='') {
	//埋点统计
	function buriedLPointFun(type) {
		switch(type) {
			case 'l':
				sa.track("m_l_share", buriedLPointParam);
				break;
			case 'a':
				sa.track("m_a_share", buriedPointParam);
				break;
			case 'voteGame':
				sa.track("game_share", buriedPointParam);
				break;
			default:	  
		}
	}
        
    
    let appid           = window.appid || 'wx99b166ead9de02f1';
    let cmpAppid        = window.cmpAppid || 'wxe5bd129decc89caf';
    let share_title 	= shareParams.share_title || '';
    let share_desc 		= shareParams.share_desc || '';
    let share_link 		= shareParams.share_link || '';
    let share_imgUrl 	= shareParams.share_imgUrl || '';
    let share_id 		= shareParams.share_id || '';
    let weixinSignUrl = `https://www.ishanshan.com/wxapp/wxauth/wx/jp/jsconfig/${cmpAppid}/${appid}?url=` + encodeURIComponent(location.href);
	let tid 			=  shareParams.tid || undefined;
	if(tid != undefined) {
		let newLink = share_link.length > 0 && share_link.substring(0,location.href.indexOf("?"))
		share_link = newLink;
	} else {
		share_link = share_link;
	}
    reqwest({
          url: weixinSignUrl,
          type: 'jsonp',
          success: function(ret) {
              wx.config({
	        	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	        	    appId: ret.appId || appid, // 必填，公众号的唯一标识
	        	    timestamp: ret.timestamp, // 必填，生成签名的时间戳
	        	    nonceStr: ret.nonceStr, // 必填，生成签名的随机串
	        	    signature: ret.signature,// 必填，签名，见附录1
	        	    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	        	  });
                wx.ready(function(){					
                    wx.onMenuShareTimeline({
                        title: share_title, // 分享标题
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function () {
							if(share_id != null && share_id != undefined && share_id != '') {
								activityShareNumber(share_id);
							}
							buriedLPointFun(type);
						},
                    });
                    wx.onMenuShareAppMessage({
                        title: share_title, // 分享标题
                        desc : share_desc,
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function () {
							if(share_id != null && share_id != undefined && share_id != '') {
								activityShareNumber(share_id);
							}
							
							buriedLPointFun(type);
                        },
                    });
                    wx.onMenuShareQQ({
                        title: share_title, // 分享标题
                        desc: share_desc,
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function () {
							if(share_id != null && share_id != undefined && share_id != '') {
								activityShareNumber(share_id);
							}
							
							buriedLPointFun(type);                
						},
                    });
                    wx.onMenuShareWeibo({
                        title: share_title, // 分享标题
                        desc: share_desc,
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function () {
							if(share_id != null && share_id != undefined && share_id != '') {
								activityShareNumber(share_id);
							}
							
							buriedLPointFun(type);
                     	},
                    });
                    wx.onMenuShareQZone({
                        title: share_title, // 分享标题
                        desc: share_desc,
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function () {
							if(share_id != null && share_id != undefined && share_id != '') {
								activityShareNumber(share_id);
							}
									
							buriedLPointFun(type);              
						},
                    });
                });
          	}
        });
}

window._ = function(...value){
	console.info(...value);
}

window.reqwestData = function(url, data, sucFunc, errorFunc) {
    reqwest({
        url,
        data,
        success: function(ret) {
            sucFunc && sucFunc(ret);
        }
    });
}

window.serviceRequest = function(url, data, suc, fail) {
	//异步请求
    reqwest({
      url: url,
      method: 'POST',
      type: 'json',
      headers: {
          isAjax: 'yes',
      },
      data: data,
    }).then(result => {
    	if(result.errorCode == 9000) {
			if(suc) {
				suc(result);
			}
		} else {
            if(result.errorCode == 2000) {
                window.location = BASE_URL;
            } else {
                if(fail) {
                    fail(result);
                } else {
                }
            }
		}

    },function(err, msg){
    });
}
