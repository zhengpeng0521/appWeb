import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast , TabBar } from 'antd-mobile';
import AppMemberComponent from '../../../components/checkstand/App/AppMemberComponent';

function AppMemberPage({ dispatch,AppMemberModel }) {
    let {

    } = AppMemberModel;

    let AppMemberProps = {

    };

    return (
        <div>
            <AppMemberComponent {...AppMemberProps}/>
        </div>
    );
}

AppMemberPage.propTypes = {
  AppMemberModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ AppMemberModel }) {
  return { AppMemberModel };
}

export default connect(mapStateToProps)(AppMemberPage);
