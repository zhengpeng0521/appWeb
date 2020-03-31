import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import MailReceiptInfoComponent from '../../../components/checkstand/mailApply/MailReceiptInfoComponent';

function MailReceiptInfoPage({ dispatch,MailReceiptInfoModel,MailOrgModel }) {
    let {
          userName,  //收件人
          tel,      //收件人电话
          address,  //详细地址
          addr,
          modalLoading,

    } = MailReceiptInfoModel;
    let {
        mchId,
        orgName,
        status,
        dataSource,
        flags,
    } = MailOrgModel;

    /*提交*/
    function submitFunc(values){
         dispatch({
            type : 'MailReceiptInfoModel/addMaterialApplys',
            payload : {
                values,
                mchId,
                orgName,
            }
         });
     }

    /*返回*/
    function goBackFunc(){
        dispatch(routerRedux.push({
            pathname: 'MailOrgPage',
            query:{ }
        }))
    }

    let MailReceiptInfoProps = {
        goBackFunc,
        submitFunc,
        orgName,
        userName,  //收件人
        tel,      //收件人电话
        address,  //详细地址
        addr,
        modalLoading,
        status,
        dataSource,
        flags,
    };

    return (
        <div>
            <MailReceiptInfoComponent {...MailReceiptInfoProps} />
        </div>

    );
}


MailReceiptInfoPage.propTypes = {
//  MailReceiptInfoModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ MailReceiptInfoModel , MailOrgModel}) {
  return { MailReceiptInfoModel , MailOrgModel};
}

export default connect(mapStateToProps)(MailReceiptInfoPage);
