import React from 'react';
import styles from './AccountUntieChooseComponent.less';
import { Button , InputItem ,ActivityIndicator , Toast , List , Radio} from 'antd-mobile';
import {createForm} from 'rc-form';

const Item = List.Item;
const RadioItem = Radio.RadioItem;
function AccountUntieChooseComponent({
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
                <div className={styles.tip}>该商户将进行账户解绑</div>
                :
                null
            }

            <div style={{padding:'0 3rem'}}>
                <Button type="primary" className={styles.sure_btn} onClick={sureBtnFunc}>确&nbsp;定</Button>
            </div>
        </div>
    );
}

export default createForm()(AccountUntieChooseComponent);
