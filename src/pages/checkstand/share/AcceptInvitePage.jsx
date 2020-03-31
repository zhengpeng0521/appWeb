import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import AcceptInviteComponent from '../../../components/checkstand/share/AcceptInviteComponent';

function AcceptInvitePage({ dispatch,AcceptInviteModel }) {
    let {
        modalLoading,
        orgListSource,
        orgChoose,
        userInfo,
    } = AcceptInviteModel;

    function acceptInviteFunc(){
        dispatch(routerRedux.push({
            pathname: '/LoginPage',
            query:{ }
        }))
    }

    let AcceptInviteProps = {
        acceptInviteFunc,
        userInfo,
    };

    return (
        <div>
            <AcceptInviteComponent {...AcceptInviteProps} />
        </div>

    );
}

AcceptInvitePage.propTypes = {
  AcceptInviteModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ AcceptInviteModel }) {
  return { AcceptInviteModel };
}

export default connect(mapStateToProps)(AcceptInvitePage);
