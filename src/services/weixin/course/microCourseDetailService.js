import qs from 'qs';

export async function getCouseDetail(params) {
  return requestData(`${BASE_URL}/orgCourseController/courseDetail`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
