import qs from 'qs';

var BASETHINKNODE = '/thinknode-dd';

//微官网相关接口
export function generalMicroWebsiteCharacteristics(link, params) {

	let params_service = {
		service : BASE_URL + `${link}`,
		data : params,
	}
	return requestData(`${BASETHINKNODE}/dingding/activity/post`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params_service),
	});
}
