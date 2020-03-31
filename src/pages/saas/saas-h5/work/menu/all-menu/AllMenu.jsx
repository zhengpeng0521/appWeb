import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import AllMenuComponent from '../../../../../../components/saas/saas-h5/work/menu/all-menu/AllMenu';

function AllMenu({ dispatch , allMenu }) {

    let {

        allMenuList,            //所有菜单数组
        visible,                //此页面是否显示
        time,                   //页面打开与关闭时

    } = allMenu

    function dp(path,obj){
        dispatch({
            type : path,
            payload : obj
        })
    }

    //点击返回
    function Back(){
        dp('allMenu/Back')
    }

    //点击选中或者取消选中菜单项
    function PickMenuItem(id,parentId){
        for(let i in allMenuList){
            if(parentId == allMenuList[i].id){
                for(let j in allMenuList[i].children){
                    if(id == allMenuList[i].children[j].id){
                        allMenuList[i].children[j].choose = !allMenuList[i].children[j].choose;
                        break;
                    }
                }
                break;
            }
        }
        dp('allMenu/updateState',{ allMenuList })
    }

    let AllMenuComponentProps = {
        allMenuList,            //所有菜单数组
        visible,                //此页面是否显示
        time,                   //页面打开与关闭时

        Back,                   //点击返回
        PickMenuItem            //点击选中或者取消选中菜单项
    }

    return (
        <AllMenuComponent {...AllMenuComponentProps}/>
    );
}

function mapStateToProps({ allMenu }) {
  	return { allMenu };
}

export default connect(mapStateToProps)(AllMenu);
