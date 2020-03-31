import React from 'react';
import styles from './ShareMobileComponent.less';
import { Button , InputItem ,ActivityIndicator , Toast} from 'antd-mobile';
import {createForm} from 'rc-form';

function ShareMobileComponent({
     goBackFunc,
     submitFunc,
     modalLoading,
     getValiCode,
     errorCode,
     flag,
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
    function sureFunc(){
        validateFields((err, values) => {
            if (!!err) {
                Toast.info("请输入手机号或是验证码");
                return;
            }
            submitFunc && submitFunc(values, ()=> {
                setFields && setFields();
                Modal.success({
                    title  : '提交成功!',
                });
            });
        });
     }
    function getValiCodeEvent(){
        getValiCode(getFieldValue('mobile'));
    }
    let HeadContTimeProps = {
        flag,
        getValiCodeEvent,
    }

    return(
         <div className='content_all'>
            <img src = 'https://img.ishanshan.com/gimg/img/a665aa8ab8a65cdef89b6b8c42c8786a' style={{width:'100%'}}/>
            <div className={styles.share_login}>
               <div className={styles.share_title}>
                   <div>先填写您的<span style={{color:'#fffc00'}}>手机号</span></div>
                   <div>才能生成<span style={{color:'#fffc00'}}>专属链接</span>，邀请好友哦</div>
               </div>
               <div className='share_content'>
                    <InputItem
                         {...getFieldProps('mobile', {
                            defaultValue : '',
                            rules: [
                                { required: true, },
                            ],
                        })}
                        type="number"
                        placeholder = '请输入手机号'
                        className={styles.mobile}
                        >
                    </InputItem>
                    <div style={{width:'100%'}}>
                        <InputItem
                             {...getFieldProps('code', {
                                defaultValue : '',
                                rules: [
                                    { required: true, },
                                ],
                            })}
                            type="number"
                            placeholder = '请输入验证码'
                            className='checkCode'
                            >
                        </InputItem>
                        {/*<div className={styles.code_btn} onClick={()=> getValiCode(getFieldValue('mobile'))}>获取验证码</div>*/}
                        < HeadContTimeComponent {...HeadContTimeProps}/>
                    </div>
                    <div className={styles.btns}>
                        <Button type="primary" className='back_btn' onClick={goBackFunc}>返回</Button>
                        <Button type="primary" className='sure_btn' onClick={sureFunc}>确定</Button>
                    </div>
               </div>
            </div>
        </div>
    );
}

class HeadContTimeComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            time : 31,
            timeFun : undefined,
            flag:this.props.flag,
        }
    }

    componentWillUnmount(){
        if(!!this.state.timeFun){ clearTimeout(this.state.timeFun) };
        this.setState = (state,callback) => {
            return;
        }
    }

    componentDidMount(){
//        this.time();
    }

     _getValiCode(){
        this.setState( { time : 31} , ()=>this.time());
        this.props.getValiCodeEvent();
     }

    time(){
        let { time , timeFun } = this.state;
        if(time > 0){
            this.setState({
                time : time - 1 ,
                timeFun : setTimeout(() => this.time(), 1000)
            })
        }else{
            if(!!timeFun){ clearTimeout(timeFun) };
            this.setState({ timeFun : undefined })
        }
    }

    render(){
        (this.state)
            let { time } = this.state;
            let flag = this.props.flag;
            return(
                  <div style={{display:"inline"}}>
                {
                    flag && time > 0 ?
                    <div className={styles.sendCode_btn} >
                        <span id='showtimes'>{time}</span>s重新获取
                    </div>
                    :
                    flag && time <= 0?
                    <div className={styles.code_btn} onClick={ this._getValiCode.bind(this) }>获取验证码</div>
                    :
                    <div className={styles.code_btn} onClick={ this._getValiCode.bind(this) }>获取验证码</div>
                }
            </div>
            )
    }

}

export default createForm()(ShareMobileComponent);
