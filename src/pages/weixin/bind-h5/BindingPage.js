import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { Button, List, InputItem, Toast, WhiteSpace, WingBlank } from 'antd-mobile';

function BindingPage({
	dispatch,
	bindingModel
}) {

	let {
        tenantId,
        orgId,
        sourceOpenId,
        weChatType,
        ignoreError,
		verifyCode,
		value,
		seconds,
		dlgTipTxt,
        setTimer,

	} = bindingModel;

	var state = {
		hasError: false,
		value: value,
		onChange: '',
		verifyCode : verifyCode,
        ignoreError:false,
	}

	function onChange(value) {
//		console.info(value);
		if(value.replace(/\s/g, '').length < 11) {
			state.hasError = true;
		} else {
			state.hasError = false;
		}
		//    state.value=value;
		dispatch({
			type: 'bindingModel/updateState',
			payload: {
				value,
			}
		});

	}

	function onChange1(verifyCode) {

		dispatch({
			type: 'bindingModel/updateState',
			payload: {
				verifyCode,
			}
		});

	}


	function codePass() {
        if(value.length=='13'){
            let num = value;
            console.info(value,"value")
            num = num.split(' ');
            var mobile = ''
            for(var i = 0;i<num.length;i++){
                mobile = mobile + num[i]
            }
            let openId = window.init_data.openId;
            dispatch({
                type: 'bindingModel/codePass',
                payload: {
                    mobile,openId,tenantId,orgId,ignoreError,weChatType
                }
            })

	   }else{
            Toast.info(<div className="ToastCss">请输入正确的手机号</div>);
            let timer = "";
            clearInterval(timer);
       }
        if(!setTimer){
            let timer = "";
            clearInterval(timer);
            var codeNumber = seconds;
            if(value.length>10){
            timer = setInterval(() => {
                console.log(codeNumber);
                    if(codeNumber == 0){
                      clearInterval(timer);
                      var one = document.getElementById("one")
                      one.disabled=false;
                      one.style.backgroundColor="#108EE9";
                      one.innerHTML="发送验证码";
                    }else{
                      var one = document.getElementById("one")
                      one.innerHTML=codeNumber+"s";
                      one.style.backgroundColor="gray";
                      one.style.color="#fff";
                      one.style.border="none";
                      one.disabled=true;
                    }
                    codeNumber--;
                },1000)
            }
        }
	}


	function bindingClick() {
//        console.info(tenantId,'tenantId------------------')
        if(value.length == '13' && verifyCode.length == '6' ){
            let num = value;
            num = num.split(' ');
            var mobile = ''
            for(var i = 0;i<num.length;i++){
                mobile = mobile + num[i]
            }
            let openId = window.init_data.openId;
            dispatch({
                type: 'bindingModel/bindingClick',
                payload: {
                    mobile,verifyCode,openId,tenantId,orgId,weChatType
                }
            })
        }else{
             Toast.info(<div className="ToastCss">请输入正确的手机号验证码</div>);
        }

	}

	return(

		<div className="bind_h5">
		 <List>
            <div className="imgSrc"><img src="https://img.ishanshan.com/gimg/img/d3767faed4c41b5c087f161bec854b06" /></div>
			<h4>请输入手机号和验证码完成绑定</h4>
			<div className="PhoneNumber">
				<InputItem className="con_input" type="phone" minLength = {11} error={state.hasError} onChange={onChange} value={state.value} placeholder="请输入手机号"/>
				<div className="con_pass">
                    <div className="phoneIcon"><img src="https://img.ishanshan.com/gimg/img/80cc636f9479677778ba9ca3a2095ae5" /></div>
                    <div className="codeIcon"><img src="https://img.ishanshan.com/gimg/img/55f67a38f38eb6d802fe24c3cfdfde1a" /></div>

					<InputItem className="con_input" type="number" onChange={onChange1} value={state.verifyCode}  maxLength = {6} placeholder="请输入验证码"/>
					<Button type="primary" id="one" inline size="small" onClick={codePass}>{dlgTipTxt}</Button>
				</div>
				<Button type="primary" id="two"  size="large" onClick={bindingClick}>绑定</Button>
			</div>
		 </List>
		</div>
	)

}
//
//BindingPage.propTypes = {
////  bind-h5: PropTypes.object,
////  dispatch: PropTypes.func,
//};
//
//
function bindingProps({
	bindingModel
}) {
	return {
		bindingModel
	}
}
BindingPage = connect(bindingProps)(BindingPage);

//function BindingPage(){
//	return(
//		<div>BindingPage</div>
//	)
//}
//
export default createForm()(BindingPage);
