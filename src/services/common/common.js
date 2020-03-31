import qs from 'qs';

var BASETHINKNODE = '/thinknode';

//获取微游戏的实例地址
export function gameTranspond(params){
	return requestData(`${BASETHINKNODE}/game/transpond/action`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//微官网相关接口
export function generalMicroWebsiteCharacteristics(link, params) {

	let params_service = {
		service : BASE_URL + `${link}`,
		data: params,
	}
	return requestData(`${BASETHINKNODE}/weixinh5/microwebsite/microwebsite/service`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params_service),
	});
}

// 人脸
export function generalSmartShop(link, params) {

	let params_service = {
		service : BASE_URL + `${link}`,
		data: params,
	}
	return requestData(`${BASETHINKNODE}/weixinh5/microwebsite/microwebsite/smartshop`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params_service),
	});
}

/**
 * 手机号和微信绑定界面
 * 绑定接口
 */
export function bindWeixinToMobile(param) {

	let params_service = {
		service : '/permission/user/bindwx',
        data: {...param}
	};
//    console.info('params_service', params_service);
	return requestData(`${BASETHINKNODE}/weixinh5/page/service`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params_service),
	});
}


/**
 * 手机号和微信绑定界面
 * 获取验证码接口
 */
export function bindWeixinToCode(param) {

	let params_service = {
		service : '/permission/user/bindwx/verify',
        data: {...param}
	};
//    console.info('params_service', params_service);
	return requestData(`${BASETHINKNODE}/weixinh5/page/service`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params_service),
	});
}



/**
 * 微游戏接口
 * ..........
 */
export function gameWeixin(param) {

	let params_service = {
        data: {...param}
	};
	return requestData(`${BASETHINKNODE}/weixinh5/page/getQRcode`, {//thinknode下面的weixinh5/page/getQRcode方法
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params_service),//转为字符串
	});
}

///**
// * 微活动接口
// * ..........
// */
//export function activityWeixin(param) {
//
//	let params_service = {
//        data: {...param}
//	};
////    console.info('params_service', params_service);
//	return requestData(`${BASETHINKNODE}/weixinh5/page/getQRcode`, {
//		method: 'post',
//		headers: {
//			"Content-Type": "application/x-www-form-urlencoded",
//		},
//		body: qs.stringify(params_service),
//	});
//}


//微官网家校通接口
export function generalMicroWebsiteCrmCharacteristics(link, params) {

	let params_service = {
		service : BASE_URL + `${link}`,
		data : params,
	}
	return requestData(`${BASETHINKNODE}/weixinh5/microwebsite/microwebsite/crm_service`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params_service),
	});
}

//微官网家校通新crm接口
export function generalSSCrm(link, params) {

	let params_service = {
		service : BASE_URL + `${link}`,
		data : params,
	}
	return requestData(`${BASETHINKNODE}/weixinh5/microwebsite/microwebsite/ss_crm`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params_service),
	});
}

//市场活动H5相关接口
export function generalMarketCharacteristics(link, params) {
	
	let params_service = {
		service : BASE_URL + `${link}`,
		data : params,
	}
	return requestData(`${BASETHINKNODE}/weixinh5/marketregister/marketregister/service`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params_service),
	});
}

//saasH5相关接口
export function generalSaasH5Characteristics(link, params) {
	
	let params_service = {
		service : BASE_URL + `${link}`,
		data : params,
	}
	return requestData(`${BASETHINKNODE}/saash5/validationmobile/validationmobile/service`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params_service),
	});
}

//小程序报表相关接口
export function generalMiniWxCharacteristics( link, params ) {
	let params_service = {
		service : BASE_URL + `${ link }`,
		data : params,
	}
	return requestData(`${BASETHINKNODE}/miniwx/reportForm/service`, {
		method  : 'post',
		headers : {
			"Content-Type" : "application/x-www-form-urlencoded",
			'token'        : token,   //全局获取
			'userId'       : userId   //全局获取
		},
		body: qs.stringify(params_service),
	});
}
