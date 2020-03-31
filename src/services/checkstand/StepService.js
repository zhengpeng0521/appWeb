import qs from 'qs';

//验证码的短信发送
export async function sendMsg(params) {
    return requestData(`${BASE_URL}/checkstandH5/sendMsg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//注册保存
export async function saveRegister(params) {
    return requestData(`${BASE_URL}/checkstandH5/h5Register`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//注册修改保存
export async function updateRegister(params) {
    return requestData(`${BASE_URL}/checkstandH5/wsMchRegisterEdit`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//注册修改前查询
export async function queryRegister(params) {
    return requestData(`${BASE_URL}/checkstandH5/regMchQueryInfo`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//开户银行查询
export async function bankList(params) {
    return requestData(`${BASE_URL}/checkstandH5/bankList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//开户地址查询
export async function cityList(params) {
    return requestData(`${BASE_URL}/checkstandH5/cityList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//开户支行查询
export async function queryBankCode(params) {
    return requestData(`${BASE_URL}/checkstandH5/queryBankCode`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//标题
export async function queryAppInfo(params) {
    return requestData(`${BASE_URL}/checkstandH5/queryAppInfo`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
