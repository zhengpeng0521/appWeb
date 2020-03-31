import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast , TabBar } from 'antd-mobile';
import AppComponent from '../../../components/checkstand/App/AppComponent';

function AppPage({ dispatch,AppModel }) {
    let {

    } = AppModel;

    /*跳转到收款码*/
    function paycodeFunc(){
        dispatch(routerRedux.push({
            pathname: 'AppPaycodePage',
            query:{ }
        }))
    }
    /*跳转到会员*/
    function memberFunc(){
        dispatch(routerRedux.push({
            pathname: 'AppMemberPage',
            query:{ }
        }))
    }
    /*流水*/
    function flowFunc(){
        dispatch(routerRedux.push({
            pathname: 'AppFlowPage',
            query:{ }
        }))
    }
    /*商户*/
    function mineFunc(){
        dispatch(routerRedux.push({
            pathname: 'AppMinePage',
            query:{ }
        }))
    }

    let AppProps = {
        paycodeFunc,
        memberFunc,
        flowFunc,
        mineFunc
    };

    return (
        <div>
            <AppComponent {...AppProps}/>
        </div>
    );
}

AppPage.propTypes = {
  AppModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ AppModel }) {
  return { AppModel };
}

export default connect(mapStateToProps)(AppPage);
