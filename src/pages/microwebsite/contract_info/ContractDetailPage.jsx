import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ContractDetailComponent from '../../../components/microwebsite/contract_info/ContractDetailComponent.jsx';

function ContractDetailPage({ dispatch, contractDetailModel }) {

	let {
		tenantId,
		orgId,
		orderNumber,

		contractDetailInfo

	} = contractDetailModel;

	let props = {
		contractDetailInfo,      //合同详情

	}

    return (
		<ContractDetailComponent { ...props } />
    );
}


function mapStateToProps({ contractDetailModel }) {
  return { contractDetailModel };
}

export default connect(mapStateToProps)(ContractDetailPage);
