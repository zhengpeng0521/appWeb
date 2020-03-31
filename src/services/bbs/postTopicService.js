import qs from 'qs';

export async function queryPostTopicList(params) {
  return requestData(`${BASE_URL}/cardTopicH5/queryCTByKeyWords`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function queryTopicList(params) {
  return requestData(`${BASE_URL}/cardTopicH5/queryCTByRelatedTopic`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function queryTalentList(params) {
  return requestData(`${BASE_URL}/inteligent/queryIntelList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function queryTalentBannerList(params) {
  return requestData(`${BASE_URL}/inteligent/queryBanners`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
