import React from 'react';
import styles from './AppLoginComponent.less';
import { Button , InputItem ,ActivityIndicator} from 'antd-mobile';
import {createForm} from 'rc-form';

function AppLoginComponent({
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
    getValiCode,
    flag,
    submitFunc,
    bool,

}) {

    function sureFunc(){
         validateFields((err, values) => {
            if (!!err) {
                return;
            }
            submitFunc && submitFunc(values, ()=> {
                setFields && setFields();
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
                     {...getFieldProps('code', {
                        defaultValue : '',
                        rules: [
                            { required: true, },
                        ],
                    })}
                    type="number"
                    placeholder = '请输入验证码'
                    >
                    < HeadContTimeComponent {...HeadContTimeProps}/>
                    <div style={{ backgroundImage: 'url(https://img.ishanshan.com/gimg/img/19d36774e64959d47fac6ab664fa8fa4)', backgroundSize: 'cover', height: '1.8rem', width: '1.4rem' }} />
                </InputItem>
                <div className={styles.warning}>
                   <span>用户名或验证码错误！ 请重新输入</span>
                </div>
                <Button type="primary" className={styles.sure_btn} onClick={sureFunc}>登&nbsp;&nbsp;录</Button>
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
                        <span id='showtimes'>{time}</span>s后重新获取
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

export default createForm()(AppLoginComponent);
