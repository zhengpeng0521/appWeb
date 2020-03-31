import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import { Carousel,ListView } from 'antd-mobile';

import MicroActivitySchoolComponent from '../../../components/microwebsite/activityDetial/activitySchoolComponent';

function MicroActivitySchoolPage({location, dispatch, microActivitySchoolModel }) {

    let {
		activitySchoolIntroArr,
        activitySchoolIntroPage,
        isLoading,
        isLoadingEnd,

    } = microActivitySchoolModel;

    //ds
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    function dp(name, paramter) {
        dispatch({
            type : `microActivitySchoolModel/${name}`,
            payload : {
                ...paramter
            }
        })
    }

    //选择校区返回首页
    function showSchoolList(orgId){
        if(microActivitySchoolModel&&microActivitySchoolModel.nowState == '3'){
            dispatch(
                routerRedux.push({
                    pathname : '/microWebsite',
                    query : {
                        orgId 		: orgId,
                        tenantId 	: microActivitySchoolModel.tenantId,
                    },
                })
            );
        }
    }


    let dataSource = ds.cloneWithRows(activitySchoolIntroArr)

	let props = {
        dp,isLoadingEnd,
        activitySchoolIntroPage,
		activitySchoolIntroArr,isLoading,dataSource,
        showSchoolList,
	}


    return (
		<MicroActivitySchoolComponent {...props}/>
    );
}

MicroActivitySchoolPage.propTypes = {
  	microActivitySchoolModel: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ microActivitySchoolModel }) {
  return { microActivitySchoolModel };
}

export default connect(mapStateToProps)(MicroActivitySchoolPage);
