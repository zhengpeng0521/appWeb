//相关页面的首页面 （进行关联modol）

import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import TopicList from '../../../../components/bbs/public-modal/public-modal-one/PublicModalOneTopicList/PublicModalOneTopicList.jsx';

function PublicModalOneTopicList({location, dispatch, publicModalOneTopicList }) {

    //获取modol数据
    let {
        pageSize,pageIndex,dataLoading,TopicShowToastModalOne,
        topicListModalOne,randomColor,columnTitle,

    } = publicModalOneTopicList;

    function readMoreColumnList(){

    }
    function backToColumn(){
        dispatch(routerRedux.push({
            pathname: 'publicModalOneColumnList',
            query:{
                clickType : 'back',
            }
        }));
    }

    let topicListProps = {
        pageSize,pageIndex,topicListModalOne,dataLoading,TopicShowToastModalOne,
        readMoreColumnList,randomColor,backToColumn,columnTitle,
    };
	return (
        <div>
            <TopicList {...topicListProps}/>
        </div>
    );
}

PublicModalOneTopicList.propTypes = {
  publicModalOneTopicList: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ publicModalOneTopicList }) {
  return { publicModalOneTopicList };
}

export default connect(mapStateToProps)(PublicModalOneTopicList);
