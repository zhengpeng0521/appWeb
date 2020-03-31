var service = require('../common/common.js');

export async function getCode(params) {
    return service.generalSaasH5Characteristics('/smsVerifyController/genVerifyCode', params);
}

//验证手机号和验证码
export async function validation(params) {
    return service.generalSaasH5Characteristics('/bindController/bindwx', params);
}
