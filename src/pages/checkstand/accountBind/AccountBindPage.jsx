import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import AccountBindComponent from '../../../components/checkstand/accountBind/AccountBindComponent';
import AccountUntieAlert from '../../../components/checkstand/accountBind/AccountUntieAlert';

function AccountBindPage({ dispatch, AccountBindModel }) {
    let {
        modalLoading,
        alertVisible,
        userInfo,
    } = AccountBindModel;

    function accountUniteFunc(){
        dispatch({
            type:'AccountBindModel/updateState',
            payload:{
                alertVisible : true,
            }
        })
    }

    function CancelOpenModal(){
        dispatch({
            type:'AccountBindModel/updateState',
            payload:{
                alertVisible : false,
            }
        })
    }

    function uniteSureFunc(){
        dispatch({
            type:'AccountBindModel/businessUnbindOpenId',
            payload:{

            }
        })
    }
    console.info(userInfo,"============");
    let AccountBindProps = {
        modalLoading,
        accountUniteFunc,
        userInfo,
    };
    let AccountUntieAlertProps = {
        alertVisible,
        CancelOpenModal,
        uniteSureFunc,
    }

    return (
        <div>
            <AccountBindComponent {...AccountBindProps} />
            {
                alertVisible ?
                <AccountUntieAlert {...AccountUntieAlertProps}/>
                :
                null
            }
        </div>

    );
}

AccountBindPage.propTypes = {
//  MailOrgModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ AccountBindModel}) {
  return { AccountBindModel };
}

export default connect(mapStateToProps)(AccountBindPage);
