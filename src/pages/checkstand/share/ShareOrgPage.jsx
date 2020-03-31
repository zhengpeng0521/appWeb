import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ShareOrgComponent from '../../../components/checkstand/share/ShareOrgComponent';
import LinkAlertComponent from '../../../components/checkstand/share/h5-alert/linkAlertComponent';
import WeixinShareComponent from '../../../components/checkstand/share/h5-alert/WeixinShareComponent';

function ShareOrgPage({ dispatch,ShareOrgModel}) {
    let {
        orgList,
        orgName,
        linkModelVisible,
        weixinModelVisible,
        mchId,
    } = ShareOrgModel;

    /*返回*/
    function goBackFunc(){
        dispatch(routerRedux.push({
            pathname: 'ShareMobilePage',
            query:{ }
        }))
    }

    /*单选切换*/
    function handleChangeFunc(item){
        dispatch({
            type:'ShareOrgModel/updateState',
            payload:{
                orgName : item.orgName,
                mchId : item.mchId,
            }
        })
    }

    /*弹窗消失*/
    function CancelOpenModal(){
        dispatch({
            type:'ShareOrgModel/updateState',
            payload:{
                linkModelVisible : false,
            }
        });
    }
    /*弹窗显示*/
    function linkShareFunc(){
         dispatch({
            type:'ShareOrgModel/updateState',
            payload:{
                linkModelVisible : true,
            }
        });
    }
    /*打开model*/
    function shareFunc(){
        dispatch({
            type:'ShareOrgModel/updateState',
            payload:{
                weixinModelVisible : true,
            }
        });
        dispatch({
            type:'ShareOrgModel/updateState',
            payload:{
                linkModelVisible : false,
            }
        });
    }
    /*关闭model*/
    function onClose(){
        dispatch({
            type:'ShareOrgModel/updateState',
            payload:{
                weixinModelVisible : false,
            }
        });
    }

    let ShareOrgProps = {
        orgList,
        goBackFunc,
        orgName,
        handleChangeFunc,
        linkShareFunc,
        mchId,
    };

    let LinkAlertProps = {
        linkModelVisible,
        CancelOpenModal,
        shareFunc,
    }

    let WeixinShareProps = {
        weixinModelVisible,
        onClose,
    }

    return (
        <div>
            <ShareOrgComponent {...ShareOrgProps} />
            {
                linkModelVisible ?
                <LinkAlertComponent {...LinkAlertProps}/>
                :
                null
            }
            {
                weixinModelVisible ?
                <WeixinShareComponent {...WeixinShareProps}/>
                :
                null
            }
        </div>

    );
}

ShareOrgPage.propTypes = {
  ShareOrgModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ ShareOrgModel }) {
  return { ShareOrgModel };
}

export default connect(mapStateToProps)(ShareOrgPage);
