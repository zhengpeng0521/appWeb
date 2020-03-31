import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ParentPicComponent from '../../../components/microwebsite/parents_notice/ParentPicComponent.jsx';

function ParentPicPage({ dispatch, parentPicModel }) {

	let {
		picArrs, index
	} = parentPicModel;
	
	function showBack(){
		dispatch(
			routerRedux.go(-1)
		)
	}
	let props = {
		picArrs, index,showBack
	}
    return (
		<ParentPicComponent { ...props } />
    );
}

function mapStateToProps({ parentPicModel }) {
  return { parentPicModel };
}

export default connect(mapStateToProps)(ParentPicPage);
