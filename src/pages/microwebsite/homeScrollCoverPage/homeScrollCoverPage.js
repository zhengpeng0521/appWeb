import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import MicrowebsteScrollComponent from '../../../components/microwebsite/homeScrollerCover/homeScrollCoverComponent';

function HomeScrollCoverPage({location, dispatch, homeScrollCover}) {
	
    const {
		selectBigAlbumIndex,
		selectTeacherIndex,
		orgAlbumArr,
		teachersArr,
		showBigAlbum,
		showBigTeacher,
		tenantId,
		orgId,

    } = homeScrollCover;

	function dp(name, param) {
		dispatch({
			type : `homeScrollCover/${name}`,
			payload : {
				...param
			},	
		})

		if(isiOS) {
			dispatch(
				routerRedux.push({
					pathname : '/microwebsite',
					query:  {
						tenantId 		: tenantId,
						orgId 			: orgId,
					},
				})
			)
		} else {
			dispatch(
				routerRedux.go(-1)
			)
		}
	}

	let props = {
		dp,
		selectBigAlbumIndex,
		selectTeacherIndex,
		orgAlbumArr,
		teachersArr,
		showBigAlbum,
		showBigTeacher,
		tenantId,
		orgId,
	}

    return (
		<MicrowebsteScrollComponent {...props} />
    );
}

HomeScrollCoverPage.propTypes = {
	homeScrollCover: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ homeScrollCover }) {
  return { homeScrollCover };
}

export default connect(mapStateToProps)(HomeScrollCoverPage);
