import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast , ActivityIndicator} from 'antd-mobile';
import StepFourComponent from '../../../components/checkstand/register/StepFourComponent';

function StepFourPage({ dispatch,StepsModel , SearchModel }) {
    let {
        step,           //步骤数
        title,          //步骤名
        workType,      //机构类型
        bankType,      //银行卡类型
        orgList,        //机构列表
        errorMessage,   //错误信息
        status,         //审核的状态
        modalLoading,   //页面加载

        flag,          //判断审核失败的两种情况
        auditMsg,      //审核失败反馈信息

    } = StepsModel;

    /*确定返回或是修改信息*/
    function submitFun(){
        if(flag){
            dispatch(routerRedux.push({
                pathname: 'StepThreePage',
                query:{ }
            }));
            dispatch({
                type : 'StepsModel/updateState',
                payload : {
                    workType : '',
                    bankType : '',
                }
            })
        }else{
            dispatch(routerRedux.push({
                pathname: 'chooseOrg_page',
                query:{ }
            }));
        }

	}

    let StepFourProps = {
        step,              //步骤
        title,             //标题
        submitFun,         //确定或是修改信息事件

        orgList,           //机构列表
        errorMessage,      //错误信息
        status,            //审核状态

        flag,              //判断审核失败的两种情况
        auditMsg,          //审核失败反馈信息
    };

    return (
        <div>
            <StepFourComponent {...StepFourProps} />
        </div>

    );
}

StepFourPage.propTypes = {
//  StepsModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ StepsModel , SearchModel }) {
  return { StepsModel , SearchModel};
}

export default connect(mapStateToProps)(StepFourPage);
