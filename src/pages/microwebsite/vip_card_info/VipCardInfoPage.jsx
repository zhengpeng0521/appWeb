import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import VipCardInfoComponent from '../../../components/microwebsite/vip_card_info/VipCardInfoComponent.jsx';

function VipCardInfoPage({ dispatch, vipCardInfoModel }) {

	let {
		tenantId,
		orgId,

		vipCardInfo

	} = vipCardInfoModel;


	let props = {
		vipCardInfo
	}

    return (
		<VipCardInfoComponent { ...props } />
    );
}


function mapStateToProps({ vipCardInfoModel }) {
  return { vipCardInfoModel };
}

export default connect(mapStateToProps)(VipCardInfoPage);
