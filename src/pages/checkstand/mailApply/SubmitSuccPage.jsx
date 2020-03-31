import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import SubmitSuccComponent from '../../../components/checkstand/mailApply/SubmitSuccComponent';

function SubmitSuccPage({ dispatch, SubmitSuccModel}) {
    let {

    } = SubmitSuccModel;



    let SubmitSuccProps = {

    };

    return (
        <div>
            <SubmitSuccComponent {...SubmitSuccProps} />
        </div>

    );
}

SubmitSuccPage.propTypes = {
  SubmitSuccModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ SubmitSuccModel }) {
  return { SubmitSuccModel };
}

export default connect(mapStateToProps)(SubmitSuccPage);
