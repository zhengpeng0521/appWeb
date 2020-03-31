import qs from 'qs';

//生成链接页
export async function queryMobileByOpenId(params) {
    return requestData(`${BASE_URL}/checkstandH5/queryMobileByOpenId`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//发送链接页
export async function queryMchInfoByOpenId (params) {
    return requestData(`${BASE_URL}/checkstandH5/queryMchInfoByOpenId `, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*接受邀请*/
export async function queryInviteInfo (params) {
    return requestData(`${BASE_URL}/checkstandH5/queryInviteInfo`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*各个环境下的路径*/
export async function getDomain(params) {
    return requestData(`${BASE_URL}/checkstandH5/index1`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

