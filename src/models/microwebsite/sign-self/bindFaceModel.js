import { parse } from 'qs';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'bindFaceModel',

  state: {
    tenantId: undefined,
    orgId: undefined,
    mobile: undefined,
    parentId: undefined,
    stuName: undefined,
    url: undefined,
    stuId: undefined,
    parentInfo: undefined,  // 家长信息

    imgUrl: undefined,  // 人脸照片
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen( location => {
        if(location.pathname === '/face_sign'){
          document.title = '绑定人脸';
          const { tenantId, orgId, mobile, parentId, stuName, url, stuId, parentInfo } = location.query
          dispatch({
						type: 'updateState',
						payload : {
							tenantId,
              orgId,
              mobile,
              parentId,
              stuName,
              url,
              stuId,
              parentInfo: parentInfo ? JSON.parse(parentInfo) : undefined
						}
					})
        }
      });
    },
  },

  effects: {

	},

  reducers: {
    updateState( state, action ){
      return { ...state, ...action.payload };
    },
  }
}
