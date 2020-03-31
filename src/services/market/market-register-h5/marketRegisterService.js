var service = require('../../common/common.js');

//获取配置数据
export async function getConfigAPI(params) {
    return service.generalMarketCharacteristics('/zsb/market/h5/queryDetail', params);
}

//提交数据
export async function formSubmit(params) {
    return service.generalMarketCharacteristics('/zsb/market/h5/formSumbit', params);
}

//
export async function watch(params) {
    return service.generalMarketCharacteristics('/zsb/market/h5/watch', params);
}


