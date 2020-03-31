import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast , TabBar } from 'antd-mobile';
import AppFlowComponent from '../../../../components/checkstand/App/flow/AppFlowComponent';

function AppFlowPage({ dispatch,AppFlowModel }) {
    let {
        date,
        settleDate,
        tab,
    } = AppFlowModel;

    /*交易明细切换*/
    function radioChange(value){
        dispatch({
            type:'AppFlowModel/updateState',
            payload:{
                date : value,
            }
        });
    }
    /*结算明细切换*/
    function settleChange(){
        dispatch({
            type:'AppFlowModel/updateState',
            payload:{
                settleDate : value,
            }
        });
    }
    /*查看交易详情*/
    function toTradeDetail(){
        dispatch(routerRedux.push({
            pathname: 'TradeDetailPage',
            query:{ }
        }))
    }
    /*tab切换*/
    function callback(key){
        dispatch({
            type:'AppFlowModel/updateState',
            payload:{
                tab : key,
            }
        })
    }

    let AppFlowProps = {
        radioChange,
        settleChange,
        date,
        settleDate,
        toTradeDetail,
        callback,
        tab,
    };

    return (
        <div>
            <AppFlowComponent {...AppFlowProps}/>
        </div>
    );
}

AppFlowPage.propTypes = {
  AppFlowModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ AppFlowModel }) {
  return { AppFlowModel };
}

export default connect(mapStateToProps)(AppFlowPage);
