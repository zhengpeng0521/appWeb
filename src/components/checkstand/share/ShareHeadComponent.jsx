import React from 'react';
import styles from './ShareHeadComponent.less';
import { Button , Picker , List } from 'antd-mobile';
import {createForm} from 'rc-form';
import { district, provinceLite } from 'antd-mobile-demo-data';

function ShareHeadComponent({
	shareLinkFunc,
    radioChange,
    orgChoose,
    sendInviteFunc,
    errorCode,
    orgListSource,
    form: {
        getFieldProps,
        validateFields,
        getFieldsValue,
        getFieldValue,
        getFieldError,
        setFieldsValue,
        setFields,
        resetFields,
    }
}) {

    let orgNameArr = [
        {
            value : '01',
            label : '请选择',
        },

    ];
    orgListSource.length>0 && orgListSource.map(function(item,index){
        if(item.status == '1'){
            let obj = {};
            obj.value = item.mchId;
            obj.label = item.orgName;
            orgNameArr.push(obj);
        }
    })

    /*
 	 * 单选按钮切换
 	 */
 	function radioChangeFunction(value){
        if(value && value.length>0){
            let data=value[0];
            radioChange(data);
        }
     }

    let orgChooseArr = [];
    orgNameArr.length>0 && orgNameArr.map(function(item,index){
        orgChooseArr.push(item.value);
    })

    return(
        <div className={styles.share_head}>
           <img src = 'https://img.ishanshan.com/gimg/img/cdbae048303c41da08b88995afde72bf' style={{width:'100%'}}/>
            {
                errorCode == 9000 && (orgNameArr && orgNameArr.length>0) ?
                <div className={styles.sendLink}>
                    <Picker
                            {...getFieldProps('orgChoose', {
                                initialValue : [orgChooseArr],
                                rules: [
                                    { required: true, },
                                ],
                            })}
                            extra="请选择"
                            data = {orgNameArr}
                            cols={1}
                            onPickerChange ={radioChangeFunction}
                        >
                          <List.Item arrow="horizontal"></List.Item>
                    </Picker>
                    <div className={styles.sendLink_btn} onClick={sendInviteFunc}>
                        <img src="https://img.ishanshan.com/gimg/img/de72ca144dbb78f9c9b23689681d0cd9"/>
                    </div>
                </div>
                :
                <div className={styles.link_btn} onClick = {() => shareLinkFunc()}>
                   <img src="https://img.ishanshan.com/gimg/img/38dd2f53fa4d13164e07bd94c08800b6" />
                </div>
            }
        </div>
    );
}

export default createForm()(ShareHeadComponent);
