import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import PwdForgetComponent from '../../../../components/checkstand/App/login/PwdForgetComponent';

function PwdForgetPage({ dispatch,PwdForgetModel }) {
    let {
        modalLoading,

    } = PwdForgetModel;



//    function submitFunc(values){
//         dispatch({
//            type : 'LoginModel/queryMchInfo',
//            payload : {
//                values
//            }
//        })
//    }


    let PwdForgetProps = {
        modalLoading,
    };
    return (
        <PwdForgetComponent {...PwdForgetProps} />
    );
}

PwdForgetPage.propTypes = {
  PwdForgetModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ PwdForgetModel }) {
  return { PwdForgetModel };
}

export default connect(mapStateToProps)(PwdForgetPage);
