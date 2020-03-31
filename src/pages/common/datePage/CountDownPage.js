/*
 *		示例  :  model里面默认overStatus为false。
 *
 *				component实现如下 
 *				引入文件page文件
 * 				render (
 * 					return <div>
 *								<div onClick={overStatus ? '' : updateStatePassValue()}></div>
 *								<CountDownPage />
 *							</div>
 * 				)
 *
 *				page页面写入passValue回调,参数为开始时间和当前的namespaceName(字符串) 
 *				参数必须
 *				function updateStatePassValue(){
 *					passValue({
 *						startTime : startTime, 
 *						namespaceName : 'voteGameModel',
 *					});
 *				}
 *		结果	: 如果开始时间大于当前时间返回overStatus为true。
 */

import React, { PropTypes } from 'react';
import { connect } from 'dva';
import CountdownComponent from '../../../components/common/dateComponent/Countdown';
import { routerRedux } from 'dva/router';
 
function CountDown({location, dispatch, count_down }) {
	
    let {

		namespaceName,
		autoPerform,
		overStatus,
		overString,
		startTime,
		d_data,
        gameStatus,
		
    } = count_down;
	
	function dp(name, param) {
		dispatch({
			type : `count_down/${name}`,
			payload : {
				...param
			}
		})
	}	
	
	function countdownOver() {
		dispatch({
			type : `${namespaceName}/updateState`,
			payload : {
				overStatus : true,
			}
		})	
	}
	
	let countDownProps = {
		countdownOver,
		autoPerform,
		overStatus,
		overString,
		startTime,
		d_data,
		dp,
        gameStatus,
	}

	return (
        <div>
             <CountdownComponent {...countDownProps} />
        </div>
    );
}

CountDown.propTypes = {
  	count_down: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ count_down }) {
  	return { count_down };
}

export default connect(mapStateToProps)(CountDown);




