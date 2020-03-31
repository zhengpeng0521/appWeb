//相关页面的首页面 （进行关联modol）

import React, { PropTypes } from 'react';
import { connect } from 'dva';
import EmptyDataComponent from '../../../components/koubei/emptyData_cp/emptyData';

 
function EmptyData({location, dispatch }) {

    return (
        <div>
           <EmptyDataComponent />
        </div>
    );
}

EmptyData.propTypes = {

};
export default EmptyData;
