import qs from 'qs';

/*请求栏目列表*/
export async function queryColumnList(params) {
    return requestData(`${BASE_URL}/api/publicH5/queryTemplateOne`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*请求主题列表*/
export async function queryTopicList(params) {
    return requestData(`${BASE_URL}/api/publicH5/queryTemplateTwo`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
