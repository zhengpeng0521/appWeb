import qs from 'qs';

//验证码的短信发送
export async function genVerifyCodeM(params) {
    return requestData(`${BASE_URL}/checkstandH5/genVerifyCodeM`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//确定
export async function queryMchInfo(params) {
    return requestData(`${BASE_URL}/checkstandH5/queryMchInfo`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//商户在公众号绑定商户
export async function businessBindOpenId(params) {
    return requestData(`${BASE_URL}/checkstandH5/businessBindOpenId`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//查询微信已绑定商户
export async function queryMchInfoByOpenID(params) {
    return requestData(`${BASE_URL}/checkstandH5/queryMchInfoByOpenID`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//解绑
export async function businessUnbindOpenId(params) {
    return requestData(`${BASE_URL}/checkstandH5/businessUnbindOpenId`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
