import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import AccountUntieChooseComponent from '../../../components/checkstand/accountUntie/AccountUntieChooseComponent';

function AccountUntieChoosePage({ dispatch, AccountUntieChooseModel }) {
    let {
        orgList,
        orgName,
        mchId,
        status,
        dataSource,
        modalLoading,
        orgNameArr,
    } = AccountUntieChooseModel;

    /*单选切换*/
    function handleChangeFunc(item){
        dispatch({
            type:'AccountUntieChooseModel/updateState',
            payload:{
                orgName : item.orgName,
                mchId : item.mchId,
            }
        })
    }

    /*确认*/
    function sureBtnFunc(){
        if(orgName){
            dispatch(routerRedux.push({
                pathname: 'AccountUntiePage',
                query:{ }
            }));
            dispatch({
                 type:'AccountUntieChooseModel/businessBindOpenId',
                 payload:{
                    mchId,
                 }
            });
        }else{
            Toast.info("请选择商户进行绑定");
        }
     }

    let AccountUntieChooseProps = {
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
            <AccountUntieChooseComponent {...AccountUntieChooseProps} />
        </div>

    );
}

AccountUntieChoosePage.propTypes = {
//  MailOrgModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ AccountUntieChooseModel}) {
  return { AccountUntieChooseModel };
}

export default connect(mapStateToProps)(AccountUntieChoosePage);
