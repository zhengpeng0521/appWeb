import qs from 'qs';

//邮寄物料的资料提交
export async function addMaterialApplys(params) {
    return requestData(`${BASE_URL}/checkstandH5/addMaterialApply`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//邮寄物料的资料查询
export async function queryWSMaterialApply(params) {
    return requestData(`${BASE_URL}/checkstandH5/queryWSMaterialApply`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
