import qs from 'qs';

export async function queryGoodsList(params) {
  return requestData(`${BASE_URL}/goodsQuery/getGoodsList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function base64ImgUpload(params) {
  return requestData(`${BASE_URL}/goodsManage/img`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function initKoubeiCourseData(params) {
  return requestData(`${BASE_URL}/goodsQuery/courseInit`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function koubeiOrgList(params) {
  return requestData(`${BASE_URL}/goodsQuery/shopList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function queryCountOfStatus(params) {
  return requestData(`${BASE_URL}/goodsQuery/countOfStatus`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function changeGoodsStatus(params) {
  return requestData(`${BASE_URL}/goodsManage/updateStatus`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function getGoodsDetail(params) {
  return requestData(`${BASE_URL}/goodsQuery/getGoodsById`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function koubeiGoodsSubmitCreate(params) {
  return requestData(`${BASE_URL}/goodsManage/goodsCreate`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function koubeiGoodsSubmitUpdate(params) {
  return requestData(`${BASE_URL}/goodsManage/goodsUpdate`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function validateToken(params) {
  return requestData(`${BASE_URL}/koubei/login/validateToken`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function queryGoodsOrder(params) {
  return requestData(`${BASE_URL}/purchaseQuery/purchaseList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function queryGoodsSettle(params) {
  return requestData(`${BASE_URL}/purchaseQuery/settleList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*获取商品类目*/
export async function queryCategoryId(params) {
  return requestData(`${BASE_URL}/goodsQuery/goodCategory`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*获取门店列表*/
export async function getOrgList(params) {
  return requestData(`${BASE_URL}/goodsQuery/kbOpenShop`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

