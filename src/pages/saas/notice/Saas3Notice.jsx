import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Saas3NoticeComponent from '../../../components/saas/notice/Saas3NoticeComponent';

function Saas3Notice({ dispatch }) {

    return (
        <Saas3NoticeComponent />
    );
}

function mapStateToProps() {
  return {  };
}

export default connect(mapStateToProps)(Saas3Notice);
