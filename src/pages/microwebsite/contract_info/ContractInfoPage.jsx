import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ContractInfoComponent from '../../../components/microwebsite/contract_info/ContractInfoComponent.jsx';

function ContractInfoPage({ dispatch, contractInfoModel }) {

	let {
		tenantId,
		orgId,
		stuId,

		dataSource,          //合同列表数据
		resultCount,
		pageIndex,
		pageSize,
		endLoading,          //是否到底部

	} = contractInfoModel;

	/*上拉加载*/
	function onEndReached(){
		if( dataSource.length >= resultCount ){
			if( !endLoading ) {
				dispatch({
					type : 'contractInfoModel/updateState',
					payload : {
						endLoading : true,
					}
				})
			}
		}else {
			dispatch({
				type : 'contractInfoModel/getMoreList',
				payload : {
					pageSize,
					pageIndex : pageIndex + 1
				}
			})
		}
	}

	function clickToContractDetail( item ){
		dispatch(
			routerRedux.push({
				pathname : '/contract_detail',
				query:  {
					orgId 		: orgId,
					tenantId 	: tenantId,
					id          : item.orderNumber
				}
			})
		)
	}

	let props = {
		dataSource,             //合同列表数据
		endLoading,             //是否到底部

		onEndReached,           //上拉加载
		clickToContractDetail,  //点击进入详情
	}

    return (
		<ContractInfoComponent { ...props } />
    );
}


function mapStateToProps({ contractInfoModel }) {
  return { contractInfoModel };
}

export default connect(mapStateToProps)(ContractInfoPage);
