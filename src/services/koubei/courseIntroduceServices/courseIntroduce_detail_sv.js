import request from '../../../utils/request';
import qs from 'qs';

export async function currentItemData(params) {
  return requestData(`${BASE_URL}/appCourse/passDetailPage`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
