//相关页面的首页面 （进行关联modol）

import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ColumnList from '../../../../components/bbs/public-modal/public-modal-one/PublicModalOneColumnList/PublicModalOneColumnList.jsx';

function PublicModalOneColumnList({location, dispatch, publicModalOneColumnList }) {

    //获取modol数据
    let {
        pageSize,pageIndex,dataLoading,ColumnShowToastModalOne,
        columnListModalOne,randomColor,Over,AllItems
    } = publicModalOneColumnList;

    function readMoreColumnList(Times){
        dispatch({
            type:'publicModalOneColumnList/queryColumnList',
            payload:{
                pageIndex:Times-3,
                pageSize,
            }
        });
    }

    function CheckColumnListItem(id,colorArray,title){
        let ColorArray = colorArray+'';
        let params = {id,ColorArray,title};
        dispatch(routerRedux.push({
            pathname: 'publicModalOneTopicList',
            query:{
                ...params
            }
        }));
    }

    let columnListProps = {
        pageSize,pageIndex,columnListModalOne,dataLoading,ColumnShowToastModalOne,
        readMoreColumnList,randomColor,CheckColumnListItem,Over,AllItems
    };
	return (
        <div>
            <ColumnList {...columnListProps}/>
        </div>
    );
}

PublicModalOneColumnList.propTypes = {
  publicModalOneColumnList: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ publicModalOneColumnList }) {
  return { publicModalOneColumnList };
}

export default connect(mapStateToProps)(PublicModalOneColumnList);
