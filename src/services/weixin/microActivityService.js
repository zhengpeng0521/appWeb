var service = require('../common/common.js');

export async function getActivityAPI(params) {
    return service.generalMicroWebsiteCharacteristics('/appMicroActivity/reqInActivityPage', params);		
}

export async function submitAPI(params) {
    return service.generalMicroWebsiteCharacteristics('/appMicroActivity/addSubscribe', params);
}

//查询支付凭证接口
export async function getPayVoucher(params) {
    return service.generalMicroWebsiteCharacteristics('/mic/QueryMicActivityService/getPayVoucher', params);		
}