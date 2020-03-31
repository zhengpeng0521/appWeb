import qs from 'qs';

export async function queryGoodsDetail(params) {
  return requestData(`${BASE_URL}/goodsQuery/getGoodsById`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

