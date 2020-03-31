import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Tabs } from 'antd-mobile';

import MicroEmptyDataComponent from '../../../components/microwebsite/common/microEmptyDataComponent';
import SignSelfComponent from '../../../components/microwebsite/sign-self/SignSelfComponent';
import FaceSign from '../../../components/microwebsite/sign-self/FaceSign';
import styles from './SignSelfPage.less'

const TabPane = Tabs.TabPane;

function SignSelfPage({dispatch, signSelfModel }) {

	let  {
        tenantId,orgId,mobile,parentId,stuId,babyList,qrcode,
        headimgurl,stuName,hasFace,faceUrl,activeKey, isBind,parentsFace,
        visible,signStatus,tabStatus,btnLoading
	} = signSelfModel;

    function selectStu(stuId) {
        dispatch({
            type: 'signSelfModel/createBabySignQrcode',
            payload: {
                stuId
            }
        });
    }

    function toSignRecord() {
        dispatch(routerRedux.push({
            pathname: '/signSelfRecord',
            query: {
                tenantId : window.COMMON_DATA.tenantId,
                orgId    : window.COMMON_DATA.orgId,
                stuId    : stuId,
            }
        }));
    }

    /** 绑定人脸 */
    function goBindFace(parentInfo){
        dispatch( routerRedux.push({
			pathname : '/face_sign',
            query: {
                orgId,
                tenantId,
                mobile,
                parentId,
                stuName,
                url: headimgurl,
                stuId,
                parentInfo: parentInfo ? JSON.stringify(parentInfo) : undefined
                // stuParentId: parentInfo.parentId,
                // stuParentName: parentInfo.parentName
            },
		}))
    }

    /** tab切换 */
    function changeTab(key){
        dispatch({type: 'signSelfModel/updateState', payload: { activeKey: key }})
        if(key === 'code'){
            window.COMMON_DATA.signSelfListen = true;
            dispatch({
                type : 'signSelfModel/createBabySignQrcode',
                payload : {
                    stuId
                }
            });
        } else {
            dispatch({
                type: 'signSelfModel/getFaceInfo',
                payload: {
                    appId: '1630396076961824769',
                    tenantId,
                    orgId,
                    stuId
                }
            })
            dispatch({
                type: 'signSelfModel/getParentFaceInfo',
                payload: {
                    appId: '1630396076961824769',
                    tenantId,
                    orgId,
                    stuId
                }
            })
            window.COMMON_DATA.signSelfListen = false;
        }
    }

    /** 关闭远程签到 */
    function closeModal(){
        dispatch({type: 'signSelfModel/updateState', payload: { visible: false }})
    }

    /** 打开远程签到 */
    function openModal(){
        dispatch({type: 'signSelfModel/updateState', payload: { visible: true }})
    }

    /** 远程签到 */
    function onlineSign(){
        dispatch({
            type: 'signSelfModel/signOnline',
            payload: {
                orgId,
                tenantId,
                parentId,
                stuId
            }
        })
    }

	let props = {
        tenantId,
		orgId,
		mobile,
		parentId,
		stuId,
		babyList,
		qrcode,
		selectStu,
		toSignRecord,
		headimgurl,
        stuName,
        visible,
        signStatus,
        tabStatus,
        btnLoading,

        closeModal,
        openModal,
        onlineSign
	}

    //人脸签到
    const faceProps = {
        stuName,
        faceUrl,
        isBind,
        headimgurl,
        parentsFace,

        toSignRecord,
        goBindFace
    }

    return (
        <div className={styles.sign_box}>
            {hasFace ? <Tabs activeKey={activeKey} destroyInactiveTabPane onChange={changeTab} swipeable={false}>
                <TabPane tab="扫码签到" key="code">
                    <SignSelfComponent { ...props } />
                </TabPane>
                <TabPane tab="人脸签到" key="face">
                    <FaceSign {...faceProps} />
                </TabPane>
            </Tabs> : <SignSelfComponent { ...props } />}
        </div>
    );
}

function mapStateToProps({ signSelfModel }) {
  return { signSelfModel };
}

export default connect(mapStateToProps)(SignSelfPage);
