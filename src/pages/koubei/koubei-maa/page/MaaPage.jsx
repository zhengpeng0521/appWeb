import React from 'react';
import { List, InputItem, DatePicker, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import './MaaPage.css';

import moment from 'moment';

const KoubeiMaa = React.createClass({

    	getInitialState(){
    	    return {
                reservationConfig 	: {},
                sexValue	: ''||'男',
				bsbyBirthdayValue	: '',
                inputValue1 	: '', //姓名
                inputValue2 	: '', //电话
                inputValue3 	: '', //地址
                outputNameState : false,
                outputDateState : false,
                outputSexState : true,
                outputAddrState : false,
                outputPhoneState : false,
                giftContentText	: ''
    	    }
    	},

	componentWillMount: function () {
		let self 	= this;
		var _shopId	= _baseParams.shopId;
		var _merchantPid= _baseParams.merchantPid;

        //埋点
        window.alipayBreakpoint('2016061601525581','201607150128330011',_shopId,'获取口碑预约项','booking_acitvity','action');

		serviceRequest(
			BASE_URL + '/h5Reservation/reservationConfig', {
			    merchantPid : _merchantPid || '',
			    shopId 	: _shopId || ''
			},

			function(result){
			    self.setState({
				    reservationConfig : result
			    });
                //埋点
                window.alipayBreakpoint('2016061601525581','201607150128330011',_shopId,'获取口碑预约项成功','booking_acitvity','end');

			},

            function(result){
                //埋点
                window.alipayBreakpoint('2016061601525581','201607150128330011',_shopId,'获取口碑预约项失败','booking_acitvity','error');
            });
	},

    	//日期结果
    	timeResults(s,t) {
    	    this.setState({
    			outputDateState : s,
				bsbyBirthdayValue : t.format('YYYY-MM-DD'),
    	    })
    	},

    	//性别结果
    	sexResults(s,v) {
    	    this.setState({
    		sexValue : v,
    		outputSexState : s
    	    })
    	},

    	//姓名结果
    	babyNameResults(s,v) {
    	    this.setState({
	    	inputValue1 : v,
	    	outputNameState : s
	    })
    	},

    	//电话结果
    	phoneResults(s,v) {
    	    this.setState({
	    	inputValue2 : v,
	    	outputPhoneState : s
	    })
    	},

    	//地址结果
    	detailAddrResults(s,v) {
    	    this.setState({
	    	inputValue3 : v,
	    	outputAddrState : s
	    })
    	},

    	gift(s,v) {
    	    this.setState({
    		giftContentText : v
    	    })
    	},

        history() {
            this.props.dispatch(routerRedux.push({
                pathname: 'record',
            }));
        },

        maaButton() {
            var _shopId	= _baseParams.shopId;
		    var _merchantPid= _baseParams.merchantPid;
			var config_data = this.state.reservationConfig || undefined;
            var date, currentTime;
            if(this.state.outputDateState==true) {
				date = this.state.bsbyBirthdayValue;
				if(date == undefined || date == '' || date == null) {
					alert("宝宝生日不能为空");
					return;
				} else {
					currentTime = date;
				}
            } else {
				if(!!(config_data&&config_data.babyBirthday == 1)) {
					alert("宝宝生日不能为空");
					return;
				}
			}

            if(this.state.outputNameState==true) {
				if(this.state.inputValue1 != '') {

				} else {
					alert("宝宝姓名不能为空");
					return;
				}
            } else {
				if(!!(config_data&&config_data.babyName == 1)) {
					alert("宝宝姓名不能为空");
					return;
				}
			}

            if(this.state.outputPhoneState==true) {
				if(this.state.inputValue2 != '') {
					  var reg 		= /^0?1[3|4|5|7|8][0-9]\d{8}$/;
					  if (reg.test(this.state.inputValue2)) {

					  } else {
						  alert("请输入正确的手机号码");
						  return;
					  }
				} else {
					alert("联系方式不能为空");
					return;
				}
            } else {
				if(!!(config_data&&config_data.tel == 1)) {
					alert("联系方式不能为空");
					return;
				}
			}

            if(this.state.outputAddrState==true) {
				if(this.state.inputValue3 != '') {

				} else {
					alert("详细地址不能为空");
					return;
				}
            } else {
				if(!!(config_data&&config_data.addr == 1)) {
					alert("详细地址不能为空");
					return;
				}
			}

        	var _merchantPid 	= _baseParams.merchantPid;
        	var _shopId			= _baseParams.shopId;
        	var _alipayUserId 	= _baseParams.alipayUserId;
        	var self 			= this;

            //埋点
            window.alipayBreakpoint('2016061601525581','201607150128330011',_shopId,'口碑预约提交','booking_order','action');

            serviceRequest(
                BASE_URL+'/h5Reservation/maaWithKoubei', {
                childBirthday 	: currentTime,
                sex 		: self.state.sexValue,
                childName	: self.state.inputValue1,
                tel 		: self.state.inputValue2,
                addr 		: self.state.inputValue3,
                alipayUserId 	: _alipayUserId || '',
                merchantPid 	: _merchantPid || '',
                shopId	 	: _shopId || '',
                giftContent     : self.state.giftContentText||''
            },

            function(result){
                var truthBeTold = alert('预约成功');
                if(truthBeTold) {

                } else {
                    self.props.dispatch(routerRedux.push({
                        pathname: 'record',
                    }));
                }
                //埋点
                window.alipayBreakpoint('2016061601525581','201607150128330011',_shopId,'口碑预约提交成功','booking_order','end');

            },

            function(result){
                //埋点
                window.alipayBreakpoint('2016061601525581','201607150128330011',_shopId,'口碑预约提交失败','booking_order','error');
            });
        },

	render : function() {
        let data = this.state.reservationConfig;
		return(
			<div>
				<p className="koubei-maa-top-p" >提交信息后，会在第一时间提醒您安排课程试听</p>
				{!!(data&&data.babyBirthday == 1)   &&  <MaaTime callback={this.timeResults}  key='maa_time_cont'/>}
				{!!(data&&data.babySex == 1 )       &&  <MaaRadio callback={this.sexResults} /> }
				{!!(data&&data.babyName == 1)       &&  <BabyName_F callback={this.babyNameResults} /> }
				{!!(data&&data.tel  == 1)           &&  <BabyPhone_F callback={this.phoneResults} /> }
				{!!(data&&data.addr == 1 )          &&  <BabyDetailAddr_F callback={this.detailAddrResults} /> }
				{!!(data&&data.gift == 1)           &&  <ReservationGift callback={this.gift} content={data.giftContent||''} /> }

                <div className="koubei-maa-subButton">
                        <Button type="primary" onClick={this.maaButton}>提交预约</Button>
                </div>

                <div className="koubei_historyDiv">
                    <p style={{fontSize: '28px'}} onClick={this.history}><u style={{color:'#828282'}}>预约历史>></u></p>
                    <p className="koubei-maa-supplier">服务由&nbsp;<a href="http://www.ishanshan.com/">闪闪早教</a>(ishanshan.com)&nbsp;提供</p>
                </div>
			</div>
		)
	}
});

//性别选择
let MaaRadio = React.createClass({
    getInitialState(){
//	this.props.callback(true,"男");
        return {
            selectSetMan : true,
            selectSetWomen : false,
        }
    },

    selectSexMan() {
        this.setState({
            selectSetMan : true,
            selectSetWomen : false,
        })
        this.props.callback(true,"男");
    },

    selectSexWomen() {
        this.setState({
            selectSetMan : false,
            selectSetWomen : true,
        })
        this.props.callback(true,"女");
    },

    render() {
        var showimgman = this.state.selectSetMan==true&&this.state.selectSetWomen==false
        ? 'http://115.29.172.104/gimg/img/bd27fbe5ce1abb841bbfae7a5edab678'
        : 'http://115.29.172.104/gimg/img/09456b828f83839377eaccf2c1defdba';

        var showimgwomen = this.state.selectSetMan==true&&this.state.selectSetWomen==false
        ? 'http://115.29.172.104/gimg/img/09456b828f83839377eaccf2c1defdba'
        : 'http://115.29.172.104/gimg/img/bd27fbe5ce1abb841bbfae7a5edab678';

        var sex_p = showimgman== 'http://115.29.172.104/gimg/img/bd27fbe5ce1abb841bbfae7a5edab678' ? '男':'女';
        return (
                <div className="koubei-sex-base-div">
                   <div className='koubei_maa_baby_sex_content'>
                       <div className="koubei-baby-sex-p" >宝宝性别</div>
                        <div className='koubei_maa_baby_sex_select'>
                            <img className="koubei-sex-man-image" src={showimgman} 		onClick={this.selectSexMan}/>
                            <div className="koubei-sex-man" 					onClick={this.selectSexMan}>男</div>
                            <img className="koubei-sex-women-image" src={showimgwomen} 	onClick={this.selectSexWomen}/>
                            <div className="koubei-sex-women" 				onClick={this.selectSexWomen}>女</div>
                        </div>
                   </div>
                </div>
            )
        }
});

//宝宝姓名
let BabyName = React.createClass({

    getInitialState(){
//	this.props.callback(true,"");
	return {
	    value1 : ""
	}
    },

    babyName(value) {
	   this.setState({
	       value1: value
	   });
	   this.props.callback(true,value);
    },

    render() {
	const {getFieldProps} = this.props.form;
	var self = this;
	return (
        	<div className="koubei-maa-subInput-base-div">
                        <div className="koubei-maa-subInput">
                                   	<InputItem
                                      	{...getFieldProps('input1')}
                                      	placeholder="请填写宝宝姓名"
                                      	onChange={self.babyName} value={self.state.value1}
                                	>宝宝姓名</InputItem>
                         </div>
        	</div>
		);
    	}
});

//宝宝电话
let BabyPhone = React.createClass({

    getInitialState(){
//	this.props.callback(true,"");
		return {
			value2 : ""
		}
    },

    babyPhone(value) {
	   this.setState({
	       value2: value
	   });
	   this.props.callback(true, value);
    },

    render() {
	const {getFieldProps} = this.props.form;
	var self = this;
	return (
            	<div className="koubei-maa-subInput-base-div">
                      <div className="koubei-maa-subInput">
                            	<InputItem
                              	{...getFieldProps('input2')}
                              	placeholder="请填写联系电话"
                              	onChange={self.babyPhone} value={self.state.value2}
                        	>联系方式</InputItem>
                       </div>
            	</div>
	);
    }
});

//宝宝地址
let BabyDetailAddr = React.createClass({

    getInitialState(){
//	this.props.callback(true,"");
		return {
			value3 : ""
		}
    },

    babyDetailAddr(value) {
	   this.setState({
	       value3: value
	   });
	   this.props.callback(true,value);
    },

    render() {
	const {getFieldProps} = this.props.form;
	var self = this;
	return (
    		<div className="koubei-maa-subInput-base-div">
    			<div className="koubei-maa-subInput">
                                	<InputItem
                                  	{...getFieldProps('input3')}
                                		placeholder="请填写详细地址"
                                                onChange={self.babyDetailAddr} value={self.state.value3}
                                            	>联系地址</InputItem>
                        </div>
                </div>
    		);
	}
});

//日期选择
let MaaTime = React.createClass({
        getInitialState(){
//   	        this.props.callback(true,"");
			return {
				value : ''
			}
        },

		changeTime(vue) {
			this.setState({
				value : vue
			})
			this.props.callback(true,vue);
		},

        render() {
            return (
              <div className="koubei-maa-subInput" key='maa_time_content'>
                 <DatePicker
                      className="am-date-picker"
                      mode="date"
                      extra="请选择"
                      value={this.state.value}
					  onChange={this.changeTime}
                  >
                      <List.Item arrow="horizontal">宝宝生日</List.Item>
                  </DatePicker>
              </div>
           );
        },
});

//预约礼物
let ReservationGift = React.createClass({
    getInitialState(){
//	this.props.callback(true,this.props.content);
		return {
			key: ''
		}
    },

    render() {
	let content = this.props.content;
        return (
         <div className="koubei-maa-gift-div">
                <img src={'http://115.29.172.104/gimg/img/a6288fde4125718df34484296040120b'} className="koubei-maa-gift-div-img"/>
            <div className="koubei-maa-gift-div-p">{content||'预约有礼内容'}</div>
          </div>
       );
    },
});

let MaaTime_F = MaaTime;
let BabyName_F = createForm()(BabyName);
let BabyPhone_F = createForm()(BabyPhone);
let BabyDetailAddr_F = createForm()(BabyDetailAddr);

function mapStateToProps() {
  	return {};
}

export default connect(mapStateToProps)(KoubeiMaa);
