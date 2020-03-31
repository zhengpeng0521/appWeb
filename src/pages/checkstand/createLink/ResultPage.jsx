import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast , ActivityIndicator} from 'antd-mobile';
import ResultComponent from '../../../components/checkstand/createLink/ResultComponent';

function ResultPage({ dispatch,LinkToShareModel }) {
    let {


    } = LinkToShareModel;

	function picEnlargeFunc(){
		 dispatch(routerRedux.push({
            pathname: 'PicEnlargePage',
        }))
	}

    let ResultProps = {
		picEnlargeFunc,
    };

    return (
        <div>
            <ResultComponent {...ResultProps} />
        </div>

    );
}

ResultPage.propTypes = {
//  StepsModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ LinkToShareModel }) {
  return { LinkToShareModel};
}

export default connect(mapStateToProps)(ResultPage);
