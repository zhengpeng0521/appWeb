import qs from 'qs';

/*页面加载*/
export async function queryKeyList(params) {
    console.log('service',params);
    return requestData(`${BASE_URL}/api/publicH5/queryTemplateThree`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*搜索*/
export async function SearchKeyOrComment(params) {
    console.log('service',params);
    return requestData(`${BASE_URL}/api/publicH5/queryTemplateThree`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
