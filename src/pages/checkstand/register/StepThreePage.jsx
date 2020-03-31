import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import StepThreeComponent from '../../../components/checkstand/register/StepThreeComponent';

function StepThreePage({ dispatch,StepsModel , SearchModel }) {
    let {
        step,           //步骤数
        title,          //步骤名

        /*第三步*/
        bankUser,       //银行卡户主
	    bankNum,        //银行卡号
	    bankType,       //银行卡类型
//        contactLine,    //联行号
	    addr,           //开户行地址
        province ,      //省
	    city ,          //市
	    district ,      //区
        bankName ,      //开户银行
        accountOpen ,   //开户支行
        bankNameArr,    //开户银行列表
        bankAddrData,   //省市列表
        accountArr,     //开户支行列表
        isSearch,       //是否点击搜索

        modalLoading,   //页面加载
    } = StepsModel;

    let {
        account,
        contactLine
    } = SearchModel;

    //第一步到第二步跳转
    function ThreeToOne(){
        dispatch(routerRedux.push({
            pathname: 'StepOnePage',
        }))
        dispatch({
            type :'StepsModel/updateState',
            payload : {
                account,
                contactLine,
            }
        })
    }

    /*银行卡类型的切换*/
    function stepThreeChange(value){
         dispatch({
            type:'StepsModel/updateState',
            payload:{
                bankType : value,
            }
        });
    }
    /*开户银行*/
    function bankNameChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
                bankName : value,
            }
        })
    }
    /*银行卡号码*/
    function  bankNumChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
                bankNum : value,
            }
        })
    }
    /*银行卡户主*/
    function bankUserChange(value){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
                bankUser : value,
            }
        })
    }
    /*银行卡地址*/
    function bankAddrChange(pro,citys){
        dispatch({
            type:'StepsModel/updateState',
            payload:{
                province : pro,
                city : citys,
            }
        })
    }
    /*开户支行搜索*/
    function searchFunc(){
        dispatch(routerRedux.push({
            pathname: 'SearchPage',
        }))
        dispatch({
            type:'StepsModel/updateState',
            payload:{
               isSearch : true,
            }
        })
        dispatch({
            type:'SearchModel/queryBankCode',
            payload:{
                province,
                city,
                bankName,
            }
        })
    }

    let StepThreeProps = {
        step,              //步骤
        title,             //标题

        /*第三步*/
       	bankUser,          //银行卡户主
		bankNum,           //银行卡号
		bankType,          //银行卡类型
//        contactLine,       //联行号
		addr,              //开户行地址
        stepThreeChange,   //银行卡类型的切换
		province ,         //省
	    city ,             //市
	    district ,         //区
        bankName ,      //开户银行
        accountOpen ,   //开户支行
        bankNameArr,    //开户银行列表
        bankAddrData,   //省市列表
        bankNameChange, //开户银行更新
        bankAddrChange, //开户地址更新
        accountArr,     //开户支行列表
        searchFunc,     //打开搜索页面
        account,        //开户支行搜索结果
        bankNumChange,  //银行卡号的更新
        bankUserChange,  //银行卡户名的更新
        isSearch,
        ThreeToOne,     //第一项到第二项的跳转

        modalLoading,      //页面加载
    };

    return (
        <div>
            <StepThreeComponent {...StepThreeProps} />
        </div>

    );
}

StepThreePage.propTypes = {
//  StepsModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ StepsModel , SearchModel }) {
  return { StepsModel , SearchModel};
}

export default connect(mapStateToProps)(StepThreePage);
