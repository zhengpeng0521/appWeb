import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast , TabBar } from 'antd-mobile';
import AppMineComponent from '../../../components/checkstand/App/AppMineComponent';

function AppMinePage({ dispatch,AppMineModel }) {
    let {

    } = AppMineModel;

    let AppMineProps = {

    };

    return (
        <div>
            <AppMineComponent {...AppMineProps}/>
        </div>
    );
}

AppMinePage.propTypes = {
  AppMineModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ AppMineModel }) {
  return { AppMineModel };
}

export default connect(mapStateToProps)(AppMinePage);
