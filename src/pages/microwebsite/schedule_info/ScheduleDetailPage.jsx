import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ScheduleDetailComponent from '../../../components/microwebsite/schedule_info/ScheduleDetailComponent.jsx';

function ScheduleDetailPage({ dispatch, scheduleDetailModel, classDetailModel }) {

	let {
		item,
		status,

	} = scheduleDetailModel;

    let { loading } = classDetailModel

    /*取消约课*/
    let cancelOrderClass = () => {
        dispatch({
            type: 'classDetailModel/cancelOrder',
            payload: {
                tenantId: window.common.tenantId,
                orgId: window.common.orgId,
                cpStuId: item.cpStuId
            }
        })
    }

	let props = {
		item,
		status,
        loading,

        cancelOrderClass,
	}

    return (
		<ScheduleDetailComponent { ...props } />
    );
}


function mapStateToProps({ scheduleDetailModel, classDetailModel }) {
  return { scheduleDetailModel, classDetailModel };
}

export default connect(mapStateToProps)(ScheduleDetailPage);
