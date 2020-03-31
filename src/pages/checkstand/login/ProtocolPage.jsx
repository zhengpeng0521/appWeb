import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ProtocolComponent from '../../../components/checkstand/login/ProtocolComponent';

function ProtocolPage({ dispatch,ProtocolModel }) {
    let {

    } = ProtocolModel;


    let ProtocolProps = {

    };
    return (
        <ProtocolComponent {...ProtocolProps} />
    );
}

ProtocolPage.propTypes = {
//  ChooseOrgModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ ProtocolModel }) {
  return { ProtocolModel };
}

export default connect(mapStateToProps)(ProtocolPage);
