import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PostTopicComponent from '../../../components/bbs/post-topic/PostTopicComponent';

function PostTopicPage({ dispatch, postTopicModel }) {
    let {
        listLoading,
        keyWord,
        topicList,
        hasMore,
        pageIndex,
        pageSize,
    } = postTopicModel;

    //改变查询关键字
    function changeKeyWord(keyWord) {
        console.info('keyWord',keyWord);
        dispatch({
            type: 'postTopicModel/updateState',
            payload: {
                keyWord
            }
        });
    }

    //查询专题列表
    function queryPostTopicList(payload) {
        dispatch({
            type: 'postTopicModel/queryPostTopicList',
            payload : payload || {},
        });
    }

    //打开专题详情
    function openTopicDetail(topicDetail) {
        dispatch(routerRedux.push({
            pathname: 'postTopicDetail',
            query: {
                cardTopicId: topicDetail.id,
            }
        }));
    }

    let postTopicProps = {
        listLoading,
        keyWord,
        topicList,
        hasMore,
        pageIndex,
        pageSize,
        changeKeyWord,
        queryPostTopicList,
        openTopicDetail,
    };
    return (
        <PostTopicComponent {...postTopicProps} />
    );
}

PostTopicPage.propTypes = {
  postTopicModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ postTopicModel }) {
  return { postTopicModel };
}

export default connect(mapStateToProps)(PostTopicPage);
