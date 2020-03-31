import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CommonMenuComponent from '../../../../../../components/saas/saas-h5/work/menu/common-menu/CommonMenu';

function CommonMenu({ dispatch , commonMenu }) {

    let {

        renderMenuList,             //选中的常用菜单数组

    } = commonMenu

    function dp(path,obj){
        dispatch({
            type : path,
            payload : obj
        })
    }

    function OpenMenu(key){
        dispatch(routerRedux.push({
            pathname: key
        }));
    }

    let CommonMenuComponentProps = {
        renderMenuList,             //所有菜单数组

        OpenMenu,                   //打开子菜单
    }

    return (
        <CommonMenuComponent {...CommonMenuComponentProps}/>
    );
}

function mapStateToProps({ commonMenu }) {
  	return { commonMenu };
}

export default connect(mapStateToProps)(CommonMenu);
