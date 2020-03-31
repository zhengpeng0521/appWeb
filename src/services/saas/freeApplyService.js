import qs from 'qs';

export async function querySchoolTypeList(params) {
  return requestData(`${BASE_URL}/regist/getSchoolType `, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function freeRegist(params) {
  return requestData(`${BASE_URL}/regist/freeRegist `, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
