import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CommonList from '../../../../../components/saas-common/common-component/list';
//import AllMenuComponent from '../../../../../../components/saas/saas-h5/work/menu/all-menu/AllMenu';

function Leads({ dispatch , leads }) {

    let {
        dataSource,             //列表数据
        resultCount,            //列表总条数
        pageSize,               //每页条数
    } = leads

    function dp(path,obj){
        dispatch({
            type : path,
            payload : obj
        })
    }

    function onSelect(bool,item){
        console.info(bool,item)
    }

    function onLoad(){
        dataSource.push({ name : '王丁丁' , device : [{ id : '1' },{ id : '2' }] })
        dp('leads/updateState',{
            dataSource
        })
    }


    let CommonListProps = {
        dataSource,
        resultCount,
        pageSize,
        onLoad,
        onSelect
    }

    return (
        <CommonList {...CommonListProps}/>
    );
}

function mapStateToProps({ leads }) {
  	return { leads };
}

export default connect(mapStateToProps)(Leads);
