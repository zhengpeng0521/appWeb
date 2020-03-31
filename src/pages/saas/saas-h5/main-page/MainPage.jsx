import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MainPageComponent from '../../../../components/saas/saas-h5/main-page/MainPage';

function MainPage({dispatch , mainPage}) {
    let {

    } = mainPage

    return (
        <MainPageComponent/>
    );
}

function mapStateToProps({ mainPage }) {
  	return { mainPage };
}

export default connect(mapStateToProps)(MainPage);
