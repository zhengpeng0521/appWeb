import React from 'react';
import styles from './AccountChooseComponent.less';
import { Button , InputItem ,ActivityIndicator , Toast , List , Radio} from 'antd-mobile';
import {createForm} from 'rc-form';

const Item = List.Item;
const RadioItem = Radio.RadioItem;
function AccountChooseComponent({
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
    modalLoading,
    handleChangeFunc,
    mchId,
    orgName,
    orgList,
    sureBtnFunc,
    orgNameArr,
}) {
//    let orgNameArr = [];
//    orgList.length>0 && orgList.map(function(item,index){
//        if(item.status == '1'){
//            let obj = {};
//            obj.mchId = item.mchId;
//            obj.orgName = item.orgName;
//            orgNameArr.push(obj);
//        }
//    })

    return(
        <div className={styles.accountOrg}>
            <List className={styles.accountOrg_list}>
                {
                    orgNameArr && orgNameArr.map(function(item,index){
                        return(
                            <div key={index}>
                                <RadioItem  checked={item.mchId === mchId} onChange={()=>handleChangeFunc(item)}>
                                    {item.orgName}
                                </RadioItem>
                            </div>
                        )
                    })
                }
            </List>
            {
                orgNameArr && orgNameArr.length>0 ?
                <div className={styles.tip}>系统将推送您所选择商户的交易信息</div>
                :
                null
            }

            <div style={{padding:'0 3rem'}}>
                <Button type="primary" className={styles.sure_btn} onClick={sureBtnFunc}>确&nbsp;定</Button>
            </div>
        </div>
    );
}

export default createForm()(AccountChooseComponent);
