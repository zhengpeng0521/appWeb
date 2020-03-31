//相关页面的首页面 （进行关联modol）

import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import KeyList from '../../../../components/bbs/public-modal/public-modal-two/PublicModalTwoKeyList/PublicModalTwoKeyList.jsx';

function PublicModalTwoKeyList({location, dispatch, publicModalTwoKeyList }) {

    //获取modol数据
    let {
        keyListModalTow,titleContent,
    } = publicModalTwoKeyList;

    function Search(searchKey){
        dispatch({
            type:'publicModalTwoKeyList/SearchKeyOrComment',
            payload:{
                searchKey,
            }
        })
    }

    let keyListProps = {
        keyListModalTow,titleContent,
        Search
    };
	return (
        <div>
            <KeyList {...keyListProps}/>
        </div>
    );
}

PublicModalTwoKeyList.propTypes = {
  publicModalTwoKeyList: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ publicModalTwoKeyList }) {
  return { publicModalTwoKeyList };
}

export default connect(mapStateToProps)(PublicModalTwoKeyList);
