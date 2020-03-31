import React from 'react';
import styles from './MailOrgComponent.less';
import { Button , InputItem ,ActivityIndicator , List , Radio} from 'antd-mobile';
import {createForm} from 'rc-form';

const RadioItem = Radio.RadioItem;
function MailOrgComponent({
     modalLoading,
     orgList,
     goBackFunc,
     orgName,
     handleChangeFunc,
     sureFunc,
     mchId,
	 form: {
    	getFieldProps,
        validateFields,
        getFieldsValue,
        getFieldValue,
        getFieldError,
        setFieldsValue,
        setFields,
        resetFields,
    },
}) {
//    let orgList = [
//        {
//             mchId: "993743496943726592",
//             orgName: "测试",
//             status: "1",
//             auditMsg: "工商信息校验不通过"
//        },
//        {
//            mchId: "994785484270923776",
//            orgName: "杭州闪宝科技有限公司",
//            status: "2",
//            auditMsg: "工商信息校验不通过"
//        },
//        {
//            mchId: "994785484270923776",
//            orgName: "杭州闪宝科技",
//            status: "1",
//            auditMsg: "通过"
//        }
//    ]

    let orgNameArr = [];
    orgList.length>0 && orgList.map(function(item,index){
        if(item.status == '1'){
            let obj = {};
            obj.mchId = item.mchId;
            obj.orgName = item.orgName;
            orgNameArr.push(obj);
        }
    })

    return(
        <div className='content_all'>
             <ActivityIndicator text="loading" toast animating ={modalLoading} />
             <img src = 'https://img.ishanshan.com/gimg/img/8295270dffcb3129ea976d24a796f38f' style={{width:'100%'}}/>
             <div className={styles.share_login}>
               <div className={styles.share_title}>
                   <div style={{color:'#fffc00'}}>请选择下方收货商户</div>
               </div>
               <div className='org_content'>

                        {
                            orgNameArr.map(function(item,index){
                                return(
                                    <div key={index}>
                                        <RadioItem  checked={item.mchId === mchId} onChange={()=>handleChangeFunc(item)}>
                                            {item.orgName}
                                        </RadioItem>
                                        {
                                           item.mchId === mchId  ?
                                            <div className={styles.tip}>物料将安排邮寄到该商户</div>
                                            :
                                            <div style={{height:'1.45rem'}}></div>
                                        }

                                    </div>
                                )
                            })
                        }

                    <Button type="primary" className='back_btn' onClick={goBackFunc}>返回</Button>
                    <Button type="primary" className='sure_btn' onClick={sureFunc}>确认</Button>
               </div>
            </div>
        </div>
    );
}

export default createForm()(MailOrgComponent);
