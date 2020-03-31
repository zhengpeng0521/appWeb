import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {ListView} from 'antd-mobile';

import MicroMaaHistoryComponent from '../../../components/microwebsite/microMaaHistry/microMaaHistryComponent.jsx';

function MicroMaaHistoryPage({location, dispatch, microMaaHistory}) {
	
    const {
		
		historyList,
		historypageData,
		historyIsLoading,
		historyIsLoadingEnd,
		
	} = microMaaHistory;

	
	function dp(name, paramter) {
		dispatch({
			type : `microMaaHistory/${name}`,
			payload : {
				...paramter	
			}
		})
	}
	
	const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    let historyListDataSource 	= ds.cloneWithRows(historyList);
	
	let props = {
		dp,
		historyList,
		historypageData,
		historyIsLoading,
		historyIsLoadingEnd,
		historyListDataSource,
	}

    return (
		<MicroMaaHistoryComponent {...props} />
    );
}

MicroMaaHistoryPage.propTypes = {
  	microMaaHistory: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ microMaaHistory }) {
  return { microMaaHistory };
}

export default connect(mapStateToProps)(MicroMaaHistoryPage);
