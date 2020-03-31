import React from 'react';
import styles from './StepFourComponent.less';
import { Button , InputItem , List ,} from 'antd-mobile';

const Item = List.Item;
function StepFourComponent({
	step,           //步骤数
    title,          //步骤名称
    errorMessage,   //错误信息
    submitFun,      //确定 或 修改信息
    status,         //审核状态
    flag,           //判断审核失败的两种情况
    orgList,
    auditMsg,       //审核失败反馈信息
}) {

    if(status == '1'){
        let buriedPointParam = {
	        	PageCode : 'h5_checkstand',
	        	PageName: '收银台h5',
	        	Activeness: 1,
				_orgId : '',
				_tenantId : '',
				_opId : '',
				_account : "",
				_btnName : '收银台h5审核中',
			}
        sa && sa.track('pageview' , buriedPointParam);
    }

	return(
        <div className={styles.results}>
            {
                 status =='1'?
                 <div style={{textAlign:'center',paddingTop:'5.4rem'}}>
                    <div className={styles.contain_img}>
                        <img src='//img.ishanshan.com/gimg/img/0c2e097b7e742b9a52dba9e97cef68d2' />
                    </div>
                    <div className={styles.tip}>信息审核中</div>
                    <div className={styles.remark} style={{marginBottom:'4.4rem'}}>届时审核结果以短信形式通知给联系人，请留意查收</div>
                    {
                        window._init_data.appName == '入网申请' ?
                        <div>
                            <img src='https://img.ishanshan.com/gimg/img/1c69c4b6c625f03ae00032eb314c1a9a' className={styles.code}/>
                            <div className={styles.code_tip}>长按二维码关注公众号</div>
                        </div>
                        :
                        null
                    }

                 </div>
                :
                status == '2' ?
                <div style={{textAlign:'center',paddingTop:'15rem'}}>
                    <div className={styles.contain_img}>
                        <img src='//img.ishanshan.com/gimg/img/a22349e1f5e228f0c35564352c16eeed' />
                    </div>
                    <div className={styles.tip}>已开通</div>
                    <div className={styles.remark}>请在电脑上登陆saas.ishanshan.com</div>
                    <div className={styles.remark}>并进入闪闪收银宝</div>
                </div>
                    :
                 status =='3' ?
                 <div style={{textAlign:'center',padding:'15rem 2rem 0'}}>
                    <div className={styles.contain_img}>
                        <img src='//img.ishanshan.com/gimg/img/97d92c66e5f754dd8509189998764c8b' />
                    </div>
                    <div className={styles.tip}>审核失败</div>
                    <div className={styles.remark} style={{color:'#E35252'}}>{errorMessage || auditMsg }</div>
                     {
                         !flag ?
                          <div className={styles.remark_tip}>请在PC端登陆saas.ishanshan.com,至收银台查看审核失败原因,并修改信息重新提交</div>
                          :
                          null
                     }
                     {/*<ul className={styles.remark} style={{color:'#E35252'}}>
                        <li>· 银行卡信息错误</li>
                        <li>· 营业执照不存在</li>
                        <li>· 银行卡信息错误</li>
                    </ul>*/}
                    {
                          flag ?
                            <div className={styles.updateBtn} >
                                <Button type='primary' onClick = {() => submitFun()}>修改信息</Button>
                            </div>
                            :
                            <div className={styles.updateBtn} >
                                <Button type='primary' onClick = {() => submitFun()}>确定</Button>
                            </div>
                    }

                 </div>
                 :
                 null
            }
        </div>
    );
}

export default StepFourComponent;
