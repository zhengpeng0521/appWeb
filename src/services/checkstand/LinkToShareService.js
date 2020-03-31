import qs from 'qs';

//验证码的短信发送
export async function sendTemplateMessage(params) {
    return requestData(`${BASE_URL}/checkstandH5/sendTemplateMessage`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//用户信息保存
export async function openIdBind(params) {
    return requestData(`${BASE_URL}/checkstandH5/openIdBind`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
