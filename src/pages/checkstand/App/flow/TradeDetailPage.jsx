import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast , TabBar } from 'antd-mobile';
import TradeDetailComponent from '../../../../components/checkstand/App/flow/TradeDetailComponent';

function TradeDetailPage({ dispatch,TradeDetailModel , AppFlowModel }) {
    let {

    } = TradeDetailModel;

    let {
        tab,
    } = AppFlowModel;

    let TradeDetailProps = {
        tab,
    };

    return (
        <div>
            <TradeDetailComponent {...TradeDetailProps}/>
        </div>
    );
}

TradeDetailPage.propTypes = {
//  TradeDetailModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ TradeDetailModel , AppFlowModel }) {
  return { TradeDetailModel , AppFlowModel};
}

export default connect(mapStateToProps)(TradeDetailPage);
