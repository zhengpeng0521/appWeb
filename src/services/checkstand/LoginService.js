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
