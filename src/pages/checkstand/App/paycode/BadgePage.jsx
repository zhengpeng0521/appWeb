import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast , TabBar } from 'antd-mobile';
import BadgeComponent from '../../../../components/checkstand/App/payCode/BadgeComponent';

function BadgePage({ dispatch,BadgeModel }) {
    let {

    } = BadgeModel;



    let BadgeProps = {

    };

    return (
        <div>
            <BadgeComponent {...BadgeProps}/>
        </div>
    );
}

BadgePage.propTypes = {
  BadgeModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ BadgeModel }) {
  return { BadgeModel };
}

export default connect(mapStateToProps)(BadgePage);
