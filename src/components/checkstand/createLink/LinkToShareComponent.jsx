import React from 'react';
import styles from './LinkToShareComponent.less';
import { Button , InputItem ,ActivityIndicator , Toast , List} from 'antd-mobile';
import {createForm} from 'rc-form';

function LinkToShareComponent({
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
    getValiCode,
    submitFunc,
    modalLoading,
    flag,
    resetFunc,
}) {

    /*保存*/
    function sureFunc(){
         validateFields((error, values) => {
        	if (error && Object.keys(error).length > 0) {
                for (const i in error) {
                    Toast.info(error[i].errors[0].message);
                    return;
                }
            }
            submitFunc && submitFunc(values, ()=> {
                setFields && setFields();
            });
        });
    }
    /*取消*/
    function cancelFunc(){
        resetFields();
        resetFunc();
    }

    /*
     * 校验电话
     */
     function checkTel(rule, value, callback) {
        if((/^1\d{10}$/.test(value))){
            callback();
        } else {
            callback('联系方式格式不正确');
        }
    }

    function getValiCodeEvent(){
        getValiCode(getFieldValue('mobile'));
    }
    let HeadContTimeProps = {
        flag,
        getValiCodeEvent,
    }

	return(
        <div style={{background: '#EFEFF4',height:'100vh',overflow:'hidden'}}>
            <ActivityIndicator text="loading" toast animating ={modalLoading} />
            <div className='LinkToShare'>
                    <List>
                       <InputItem

                            {...getFieldProps('userName', {
                                initialValue : '',
                                rules: [
                                    { required: true, message : '请输入姓名'},
                                ],
                             })}
                             placeholder="请输入姓名"
                        >姓名</InputItem>
                        <InputItem

                            {...getFieldProps('mobile', {
                                initialValue : '',
                                rules: [
                                    { required: true, message : '请输入手机号'},
                                    { validator: checkTel },
                                ],
                             })}
                             type="number"
                             placeholder="请输入手机号"
                        >手机号</InputItem>
                        <InputItem

                            {...getFieldProps('code', {
                                initialValue : '',
                                rules: [
                                    { required: true, message : '请输入验证码'},
                                ],
                             })}
                             type="number"
                             placeholder="请输入验证码"
                        >验证码
                        < HeadContTimeComponent {...HeadContTimeProps}/>
                    </InputItem>
                </List>
                <div style={{padding:'0 3rem'}}>
                    <Button type="primary" className={styles.sure_btn} onClick={sureFunc}>提&nbsp;&nbsp;交</Button>
                    <Button className={styles.cancel_btn} onClick={cancelFunc}>重&nbsp;&nbsp;置</Button>
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
                    <div className={styles.getCodeTime} >
                        <span id='showtimes'>{time}</span>s重新获取
                    </div>
                    :
                    flag && time <= 0?
                    <div className={styles.getCode} onClick={ this._getValiCode.bind(this) }>获取验证码</div>
                    :
                    <div className={styles.getCode} onClick={ this._getValiCode.bind(this) }>获取验证码</div>
                }
                </div>
            )
    }

}

export default createForm()(LinkToShareComponent);
