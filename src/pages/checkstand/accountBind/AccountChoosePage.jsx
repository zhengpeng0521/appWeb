import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import AccountChooseComponent from '../../../components/checkstand/accountBind/AccountChooseComponent';

function AccountChoosePage({ dispatch, AccountChooseModel }) {
    let {
        orgList,
        orgName,
        mchId,
        status,
        dataSource,
        modalLoading,
        flags,
        orgNameArr,
        isSure,
    } = AccountChooseModel;

    /*单选切换*/
    function handleChangeFunc(item){
        dispatch({
            type:'AccountChooseModel/updateState',
            payload:{
                orgName : item.orgName,
                mchId : item.mchId,
            }
        })
    }

    /*确认*/
    function sureBtnFunc(){
        if(orgName){
            dispatch({
                 type:'AccountChooseModel/businessBindOpenId',
                 payload:{
                    mchId,
                 }
            });
            dispatch({
                 type:'AccountChooseModel/updateState',
                 payload:{
                    isSure : true,
                 }
            });
        }else{
            Toast.info("请选择商户进行绑定");
        }
     }
    console.info("orgList111111",orgList);
    let AccountChooseProps = {
        modalLoading,
        orgList,
        orgName,
        mchId,
        handleChangeFunc,
        sureBtnFunc,
        orgNameArr,
    };

    return (
        <div>
            <AccountChooseComponent {...AccountChooseProps} />
        </div>

    );
}

AccountChoosePage.propTypes = {
//  MailOrgModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ AccountChooseModel}) {
  return { AccountChooseModel };
}

export default connect(mapStateToProps)(AccountChoosePage);
