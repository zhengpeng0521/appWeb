import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal, ActivityIndicator } from 'antd-mobile';
import ClassDetail from '../../../components/microwebsite/order-class/ClassDetail';
const alert = Modal.alert;
function ClassDetailPage({ dispatch, classDetailModel }) {

    let {
        tenantId,
        orgId,
        stuId,
        confLimit,
        item,
        status,
        detailInfo,             //详情信息
        loading,
        visibleTow,
        visible,
        ageTop,
        ageContent,
        animating,
        courseAgeLimit,
        age,
        rightAge,
    } = classDetailModel
    /*约课*/
    let orderClass = (e) => {
        e.preventDefault()
        dispatch({
            type: 'classDetailModel/segMent',
            payload: {
                tenantId,
                orgId,
                stuId,
                cpmId: detailInfo.cpmId,
                cpdIds: detailInfo.cpdId,
            }
        })
        // dispatch({
        //     type: 'classDetailModel/checkAge',
        //     payload: {
        //         tenantId,
        //         orgId,
        //         stuId,
        //         cpmId: detailInfo.cpmId
        //     }
        // })
    }

    /*取消*/
    let cancelOrder = () => {
        dispatch({
            type: 'classDetailModel/updateState',
            payload: {
                visible: false
            }
        })
    }
     /*单独确定*/
     let ageOrder = () => {
        dispatch({
            type: 'classDetailModel/updateState',
            payload: {
                visibleTow: false
            }
        })
    }

    /*确认*/
    let confirmOrder = () => {
        dispatch({
            type: 'classDetailModel/orderClass',
            payload: {
                tenantId,
                orgId,
                stuId,
                cpmId: detailInfo.cpmId,
                cpdId: detailInfo.cpdId,
            }
        })
    }

    /*取消约课*/
    let cancelOrderClass = () => {
        dispatch({
            type: 'classDetailModel/cancelOrder',
            payload: {
                tenantId,
                orgId,
                cpStuId: detailInfo.cpStuId,
                cpdId: detailInfo.cpdId
            }
        })
    }

    let props = {
        item,
        status,
        detailInfo,             //详情信息
        loading,

        orderClass,
        cancelOrderClass,
    }

    return (
        <div>
            <ClassDetail {...props} />
            <Modal
                transparent
                maskClosable={false}
                visible={visible}
                closable={false}
                footer={[
                    { text: '取消', onPress: cancelOrder },
                    { text: '继续约课', onPress: confirmOrder }
                ]}
            >
                <p>学员年龄:{age}</p>
                <p style={{ marginTop: 20 }}>[{detailInfo.courseName}]适龄范围{courseAgeLimit}</p>
                <p style={{ marginTop: 20 }}>请确认是否继续约课</p>
            </Modal>
            <Modal
                transparent
                maskClosable={false}
                visible={visibleTow}
                closable={false}
                footer={[
                    { text: '确定', onPress: ageOrder },
                ]}
            >
                <p>学员年龄:{age}</p>
                <p style={{ marginTop: 20 }}>不适用[{detailInfo.courseName}]{courseAgeLimit}</p>
            </Modal>
            <ActivityIndicator
                toast
                text="正在加载"
                animating={animating}
            />
        </div>
    )
}

function mapStateToProps({ classDetailModel }) {
    return { classDetailModel };
}

export default connect(mapStateToProps)(ClassDetailPage);
