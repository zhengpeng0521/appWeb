import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import MailOrgComponent from '../../../components/checkstand/mailApply/MailOrgComponent';

function MailOrgPage({ dispatch, MailOrgModel , MailLoginModel}) {
    let {
        orgList,
        orgName,
        mchId,
        status,
        dataSource,
        modalLoading,
        flags,
    } = MailOrgModel;

    let {
        flag,
    } = MailLoginModel;

    /*返回*/
    function goBackFunc(){
        dispatch(routerRedux.push({
            pathname: 'MailLoginPage',
            query:{ }
        }))
         dispatch({
            type:'MailLoginModel/updateState',
            payload:{
                flag : false,
            }
         })
    }

    /*单选切换*/
    function handleChangeFunc(item){
        dispatch({
            type:'MailOrgModel/updateState',
            payload:{
                orgName : item.orgName,
                mchId : item.mchId,
            }
        })
    }

    /*确认*/
    function sureFunc(){
        if(orgName){
            dispatch(routerRedux.push({
                pathname: 'MailReceiptInfoPage',
                query:{ }
            }))
            dispatch({
                 type:'MailOrgModel/queryWSMaterialApply',
                 payload:{
                    mchId,
                 }
            })
        }else{
            Toast.info("请选择收货商户");
        }
     }

    let MailOrgProps = {
        modalLoading,
        orgList,
        goBackFunc,
        orgName,
        mchId,
        sureFunc,
        handleChangeFunc,
    };

    return (
        <div>
            <MailOrgComponent {...MailOrgProps} />
        </div>

    );
}

MailOrgPage.propTypes = {
//  MailOrgModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ MailOrgModel , MailLoginModel}) {
  return { MailOrgModel , MailLoginModel};
}

export default connect(mapStateToProps)(MailOrgPage);
