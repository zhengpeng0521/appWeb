import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import FreeApplyComponent from '../../../components/saas/free-apply/FreeApplyComponent';

function FreeApplyPage({ dispatch, freeApplyModel }) {
    let {
        formLoading,schoolTypeList,
    } = freeApplyModel;

    function submitAction(params) {
        dispatch({
            type: 'freeApplyModel/submitAction',
            payload : params || {},
        });
    }

    let freeApplyProps = {
        formLoading,schoolTypeList,submitAction,
    };
    return (
        <FreeApplyComponent {...freeApplyProps} />
    );
}

FreeApplyPage.propTypes = {
  freeApplyModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ freeApplyModel }) {
  return { freeApplyModel };
}

export default connect(mapStateToProps)(FreeApplyPage);
