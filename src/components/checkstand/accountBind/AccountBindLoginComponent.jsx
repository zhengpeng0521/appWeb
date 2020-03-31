import React from 'react';
import styles from './AccountBindLoginComponent.less';
import { Button , InputItem ,ActivityIndicator , Toast} from 'antd-mobile';
import {createForm} from 'rc-form';

function AccountBindLoginComponent({
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
}) {

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
        <div style={{height:'100%'}}>
            <ActivityIndicator text="loading" toast animating ={modalLoading} />
            <div className='accountBind'>
                <div className={styles.logo_img}>
                    <img src='https://img.ishanshan.com/gimg/img/8223cec553820e9b41bbbd7e5568e1c8'/>
                </div>
                <div className={styles.logo_tip}>- 绑定您的收银宝账号 -</div>
                <InputItem
                     {...getFieldProps('mobile', {
                        defaultValue : '',
                        rules: [
                            { required: true, message:'请输入手机号'},
                            { validator: checkTel },
                        ],
                    })}
                    type="number"
                    placeholder = '请输入手机号'
                    >
                    <div style={{ backgroundImage: 'url(https://img.ishanshan.com/gimg/img/d3eb9b8b23a5e2d1d51410ef27a958c5)', backgroundSize: 'cover', height: '1.8rem', width: '1.2rem' }} />
                </InputItem>
                <InputItem
                     {...getFieldProps('code', {
                        defaultValue : '',
                        rules: [
                            { required: true, message:'请输入验证码'},
                        ],
                    })}
                    type="number"
                    placeholder = '请输入验证码'
                    >
                    < HeadContTimeComponent {...HeadContTimeProps}/>
                    <div style={{ backgroundImage: 'url(https://img.ishanshan.com/gimg/img/19d36774e64959d47fac6ab664fa8fa4)', backgroundSize: 'cover', height: '1.8rem', width: '1.4rem' }} />
                </InputItem>
                <Button type="primary" className={styles.sure_btn} onClick={sureFunc}>绑&nbsp;定</Button>
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

export default createForm()(AccountBindLoginComponent);
