import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast , TabBar } from 'antd-mobile';
import AppPaycodeComponent from '../../../components/checkstand/App/AppPaycodeComponent';

function AppPaycodePage({ dispatch,AppPaycodeModel }) {
    let {

    } = AppPaycodeModel;

    /*台卡页面*/
    function toCardFunc(){
        dispatch(routerRedux.push({
            pathname: 'CardPage',
            query:{ }
        }))
    }
    /*工牌页面*/
    function toBadgeFunc(){
        dispatch(routerRedux.push({
            pathname: 'BadgePage',
            query:{ }
        }))
    }

    let AppPaycodeProps = {
        toCardFunc,
        toBadgeFunc,
    };

    return (
        <div>
            <AppPaycodeComponent {...AppPaycodeProps}/>
        </div>
    );
}

AppPaycodePage.propTypes = {
  AppPaycodeModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ AppPaycodeModel }) {
  return { AppPaycodeModel };
}

export default connect(mapStateToProps)(AppPaycodePage);
