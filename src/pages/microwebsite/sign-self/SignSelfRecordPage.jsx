import React, { PropTypes } from 'react';
import { connect } from 'dva';

import SignSelfRecordComponent from '../../../components/microwebsite/sign-self/SignSelfRecordComponent';

function SignSelfRecordPage({dispatch, signSelfRecordModel }) {

	let  {
		recordList,pageIndex,pageSize,resultCount,
	} = signSelfRecordModel;

    function loadMore() {
        dispatch({
            type: 'signSelfRecordModel/queryRecord',
            payload: {
                pageIndex: pageIndex + 1,
            }
        });
    }

	let props = {
        recordList,loadMore,pageIndex,pageSize,resultCount,
	}

    return (
		<SignSelfRecordComponent {...props} />
    );
}

SignSelfRecordPage.propTypes = {
  	signSelfRecordModel: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ signSelfRecordModel }) {
  return { signSelfRecordModel };
}

export default connect(mapStateToProps)(SignSelfRecordPage);
