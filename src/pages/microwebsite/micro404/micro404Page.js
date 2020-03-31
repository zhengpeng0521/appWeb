import React, { PropTypes } from 'react';
import { connect } from 'dva';

import Micro404Component from '../../../components/microwebsite/micro404/micro404Component.jsx';

function Micro404Page({location, dispatch, micro404 }) {
	
    return (
		<Micro404Component />
    );
}

Micro404Page.propTypes = {
  	micro404: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ micro404 }) {
  return { micro404 };
}

export default connect(mapStateToProps)(Micro404Page);
