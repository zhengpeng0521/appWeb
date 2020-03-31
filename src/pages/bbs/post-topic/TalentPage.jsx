import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import TalentComponent from '../../../components/bbs/post-topic/TalentComponent';

function TalentPage({ dispatch, talentModel }) {
    let {
        talentList,
        listLoading,
        hasMore,
        pageIndex,
        pageSize,
        bannerList,
    } = talentModel;

    function queryTalentList(payload) {
        dispatch({
            type: 'talentModel/queryTalentList',
            payload : payload || {},
        });
    }

    function openTopicList(inteligentId) {
        dispatch(routerRedux.push({
            pathname: '/',
            query: {
                inteligentId,
            }
        }));
    }

    let talentComponentProps = {
        talentList,
        listLoading,
        hasMore,
        pageIndex,
        pageSize,
        bannerList,
        queryTalentList,openTopicList,
    };
    return (
        <TalentComponent {...talentComponentProps} />
    );
}

TalentPage.propTypes = {
  talentModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ talentModel }) {
  return { talentModel };
}

export default connect(mapStateToProps)(TalentPage);
