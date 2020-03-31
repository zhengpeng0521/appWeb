import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import { Carousel,ListView, } from 'antd-mobile';

import PersonMyactivityComponent from '../../../components/microwebsite/personMyactivity/personMyactivityComponent';

function personMyactivityPage({location, dispatch, personMyactivityModel }) {

    let {
        myactivitySourceArr,
        myactivitySourcePage,
        isLoadingEnd,
        isLoading,

    } = personMyactivityModel;

	function dp(name, paramter) {
		dispatch({
			type : `personMyactivityModel/${name}`,
			payload : {
				...paramter
			}
		})	
	}
	
    //取消预约
    function myactivityCancelFun (id) {
		
        dispatch(
			routerRedux.push({
				pathname : '/microCancelParticipate',
				query : {
					orgId 		: personMyactivityModel.orgId,
					tenantId 	: personMyactivityModel.tenantId,
					id 			: id,
				},
			})
		)
    }

    //ds
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });



    let dataSource = ds.cloneWithRows(myactivitySourceArr);

    let props = {
		dp,
        myactivityCancelFun,
        myactivitySourceArr,
        myactivitySourcePage,
        isLoadingEnd,
        isLoading,
        dataSource,
	}

    return (
		<PersonMyactivityComponent {...props}/>
    );
}

personMyactivityPage.propTypes = {
  	personMyactivityModel: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ personMyactivityModel }) {
  return { personMyactivityModel };
}

export default connect(mapStateToProps)(personMyactivityPage);
