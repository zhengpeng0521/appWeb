import qs from 'qs';

export async function getSchoolType(params) {
    return requestData(`${BASE_URL}/regist/getSchoolType`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
    });
}

export async function formSubmit(params) {
    return requestData(`${BASE_URL}/regist/freeRegist`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
    });
}

export async function getHrefAndHtmlDetail(params) {
    return requestData(`${BASE_URL}/regist/getList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
    });
}


