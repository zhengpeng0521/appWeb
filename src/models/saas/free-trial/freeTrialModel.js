import {
        getSchoolType,  //获取学校类型
        getHrefAndHtmlDetail,  //获取富文本内容
        formSubmit,     //表单提交
        } from '../../../services/saas/freeTrialService';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//闪闪管家免费使用
export default {

    namespace: 'freeTrialModelSet',

    state: {
        htmlDetail:'',                      //富文本内容

        AlertModalVisible : false,          //提示框显示与否
        AlertModalContent : '',             //提示框标题

        SchoolTypeAllArray : [],            //表单学校类型数组
        SchoolType : '',                    //选中学校类型
        SchoolTypeInitialValue : '',        //学校表单项类型填充值
        SchoolTypeModalClose : false,       //表单中选择学校类型modal是否关闭
        AlertModalSubmiting : false,        //表单是否提交中
        AlertModalSubmitSuccess : false,    //表单是否提交成功

        BottomText : '',                    //最下方文案
        BottomUrl : '',                     //最下方的外链

        openType : '',                      //打开表单的方式(微信/支付宝/移动端浏览器/PC端浏览器)
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( { pathname, query }) => {
                if(pathname === '/') {
                    let ua = navigator.userAgent.toLowerCase();
                    let isWeixin = ua.indexOf('micromessenger');    //判断是否用微信打开
                    let isMobile = ua.indexOf('mobile');            //判断是否用微手机浏览器打开
                    if(isWeixin != -1){
                        dispatch({
                            type:'updateState',
                            payload:{
                                openType : '微信',
                            }
                        });
                    }else if(isMobile != -1){
                        dispatch({
                            type:'updateState',
                            payload:{
                                openType : 'mobileWeb',
                            }
                        });
                    }else if(isMobile == -1){
                        dispatch({
                            type:'updateState',
                            payload:{
                                openType : 'pcWeb',
                            }
                        });
                    }
                    /*获取超链接和富文本内容*/
                    dispatch({
                        type:'getHrefAndHtmlDetail',
                    });
                    /*获取学校类型*/
                    dispatch({
                        type:'getSchoolType',
                    });
                }
            });
        }
    },

    effects: {

        /*获取学校类型*/
        *'getSchoolType'({ payload },{ put , call , select }){
            const { ret } = yield call( getSchoolType );
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        SchoolTypeAllArray : ret.results,
                    }
                });
            }else if(ret && ret.errorMessage){
                ret && Toast.offline(ret.errorMessage);
            }else{
                ret && Toast.offline('您的网络状况不佳，请重新加载');
            }
        },

        /*获取超链接和富文本内容*/
        *'getHrefAndHtmlDetail'({ payload },{ put , call , select }){
            const { ret } = yield call( getHrefAndHtmlDetail );
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        htmlDetail : (ret.results)[0].html_detail,
                        BottomText : (ret.results)[0].link_text,
                        BottomUrl : (ret.results)[0].link,
                    }
                });
            }else if(ret && ret.errorMessage){
                ret && Toast.offline(ret.errorMessage);
            }else{
                ret && Toast.offline('您的网络状况不佳，请重新加载');
            }
        },

        /*表单提交*/
        *'formSubmit'({ payload },{ put , call , select }){
            yield put({
                type:'updateState',
                payload:{
                    AlertModalSubmiting : true,
                }
            });
            const { ret } = yield call( formSubmit , parse(payload) );
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        AlertModalVisible : true,
                        AlertModalSubmitSuccess : true,
                    }
                });
            }else if(ret && ret.errorMessage){
                ret && Toast.offline(ret.errorMessage);
            }else{
                ret && Toast.offline('您的网络状况不佳，请重新加载');
            }
            yield put({
                type:'updateState',
                payload:{
                    AlertModalSubmiting : false,
                }
            });
        },
    },

    reducers: {
      //更新查询框的频道列表
      updateState(state, action) {
          return { ...state, ...action.payload };
      },
    },

};
