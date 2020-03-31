import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import AccountUntieComponent from '../../../components/checkstand/accountUntie/AccountUntieComponent';
import AccountUntieAlert from '../../../components/checkstand/accountUntie/AccountUntieAlert';

function AccountUntiePage({ dispatch, AccountUntieModel }) {
    let {
        modalLoading,
        alertVisible,
        userInfo,
    } = AccountUntieModel;

    function accountUniteFunc(){
        dispatch({
            type:'AccountUntieModel/updateState',
            payload:{
                alertVisible : true,
            }
        })
    }

    function CancelOpenModal(){
        dispatch({
            type:'AccountUntieModel/updateState',
            payload:{
                alertVisible : false,
            }
        })
    }

    function uniteSureFunc(){
        dispatch({
            type:'AccountUntieModel/businessUnbindOpenId',
        });
    }

    let AccountUntieProps = {
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
            <AccountUntieComponent {...AccountUntieProps} />
            {
                alertVisible ?
                <AccountUntieAlert {...AccountUntieAlertProps}/>
                :
                null
            }
        </div>

    );
}

AccountUntiePage.propTypes = {
//  MailOrgModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ AccountUntieModel}) {
  return { AccountUntieModel };
}

export default connect(mapStateToProps)(AccountUntiePage);
