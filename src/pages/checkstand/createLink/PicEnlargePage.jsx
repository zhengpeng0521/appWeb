import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast , ActivityIndicator} from 'antd-mobile';
import PicEnlargeComponent from '../../../components/checkstand/createLink/PicEnlargeComponent';

function PicEnlargePage({ dispatch,LinkToShareModel }) {
    let {


    } = LinkToShareModel;

    let PicEnlargeProps = {

    };

    return (
        <div>
            <PicEnlargeComponent {...PicEnlargeProps} />
        </div>

    );
}

PicEnlargePage.propTypes = {
//  StepsModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ LinkToShareModel }) {
  return { LinkToShareModel};
}

export default connect(mapStateToProps)(PicEnlargePage);
