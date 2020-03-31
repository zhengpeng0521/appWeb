import React, { PropTypes } from 'react';
import moment from 'moment';
import { calcDifference, getTimeDifference } from '../../../utils/date.js';
import styles from './Countdown.less';

function CountdownComponent({ 
	
	dp,
	d_data,
	startTime,
	overStatus,
	overString,
	autoPerform,
	countdownOver,
    gameStatus,

}) {
	
	let s_date = undefined;
	let c_date = undefined;
	let remainingSecond = undefined;
	
	let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
	
	if(currentTime != undefined && startTime != undefined) {
		
		s_date = moment(startTime).add(25,"s").format('X');//服务器时间与前段时间相差25s
		c_date = moment(currentTime).format('X');		
		remainingSecond = (s_date - c_date);
	} 

    let gameStatusString = "";
    if(!gameStatus || gameStatus != '0'){
       gameStatusString = "距截止时间"
    }else if(gameStatus == '0'){
        gameStatusString ="距离开始时间";
    }
    remainingSecond <= '0' ? gameStatusString += ",请稍等..." : gameStatusString;
    function countdown() {
		let clearTime = false;
		let time = setInterval(function() {
			if (--remainingSecond <= 0) {
                window.location.reload();
			} else {
				if(clearTime == false) {
					clearTime = true;
				}			
				var data = calcDifference(remainingSecond);
				dp('updateState', {autoPerform : true, d_data : data, overString : 'noOver'})
			}
		}, 1000);	
	}

    return (
        <div onClick={autoPerform ? '' : countdown() }>
			<div className={styles.TimeContentText}>{gameStatusString}:{d_data&&d_data.d || 0}天{d_data&&d_data.h || 0}时{d_data&&d_data.m || 0}分{d_data&&d_data.s > 0 && d_data.s|| 0}秒</div>
		</div>
    );
};

export default CountdownComponent;
