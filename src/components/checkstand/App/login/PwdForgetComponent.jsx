import React from 'react';
import styles from './PwdForgetComponent.less';
import { Button , InputItem ,ActivityIndicator} from 'antd-mobile';
import {createForm} from 'rc-form';

function PwdForgetComponent({
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

}) {

    function sureFunc(){
//         validateFields((err, values) => {
//            if (!!err) {
//                return;
//            }
//            submitFunc && submitFunc(values, ()=> {
//                setFields && setFields();
//                Modal.success({
//                    title  : '提交成功!',
//                });
//            });
//        });
    }

	return(
        <div>
            <ActivityIndicator text="loading" toast animating ={modalLoading} />
            <div className='app_login'>
                <div className={styles.logo_img}>
                    <img src='https://img.ishanshan.com/gimg/img/8223cec553820e9b41bbbd7e5568e1c8'/>
                </div>
                <InputItem
                     {...getFieldProps('mobile', {
                        defaultValue : '',
                        rules: [
                            { required: true, },
                        ],
                    })}
                    type="number"
                    placeholder = '请输入手机号'
                    >
                    <div style={{ backgroundImage: 'url(https://img.ishanshan.com/gimg/img/d3eb9b8b23a5e2d1d51410ef27a958c5)', backgroundSize: 'cover', height: '1.8rem', width: '1.2rem' }} />
                </InputItem>
                <InputItem
                     {...getFieldProps('password', {
                        defaultValue : '',
                        rules: [
                            { required: true, },
                        ],
                    })}
                    type="password"
                    placeholder = '请输入密码'
                    >
                    <div style={{ backgroundImage: 'url(https://img.ishanshan.com/gimg/img/9a705c702ae5289805319d6f22ea9b92)', backgroundSize: 'cover', height: '1.8rem', width: '1.4rem' }} />
                </InputItem>
                <div className={styles.warning}>用户名或密码错误！请重新输入</div>
                <Button type="primary" className={styles.sure_btn} onClick={sureFunc}>确&nbsp;&nbsp;定</Button>
            </div>
         </div>
    );
}


export default createForm()(PwdForgetComponent);
