import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PostTopicDetailComponent from '../../../components/bbs/post-topic/PostTopicDetailComponent';

function PostTopicDetailPage({ dispatch, postTopicDetailModel }) {
    let {
        topicDetail,listLoading,hasMore,pageIndex,pageSize,topicList,itemTopicCount,
    } = postTopicDetailModel;

    function queryItemTopicList(payload) {
        dispatch({
            type: 'postTopicDetailModel/queryTopicList',
            payload : payload || {},
        });
    }

    function openCommunityDetail(communityId) {
        window.open('http://www.ishanshan.com/ant-mobile/community/html/community_share.html?topicId=' + communityId);
    }

    let topicDetailProps = {
        topicDetail,listLoading,hasMore,pageIndex,pageSize,topicList,itemTopicCount,
        queryItemTopicList,openCommunityDetail,
    };
    return (
        <PostTopicDetailComponent {...topicDetailProps} />
    );
}

PostTopicDetailPage.propTypes = {
  postTopicDetailModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ postTopicDetailModel }) {
  return { postTopicDetailModel };
}

export default connect(mapStateToProps)(PostTopicDetailPage);
