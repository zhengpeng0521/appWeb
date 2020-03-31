import React, {PropTypes} from 'react';
import { InputItem, Modal, DatePicker, List, Toast, Button } from 'antd-mobile';
import styles from './MicroGraffiti.less';

import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);

function GraffitiComponent({
	
	dp,
	data,
	cleasBool,
	bg_color,
	touchScreen,
	
	form : {
		getFieldProps,
		getFieldsValue,
	}
	
}) {
	
	//提交数据
	function submit() {
		_hmt.push(['_trackEvent', `2017暑期培训预约`, 'maa', '-', '-']);
		let data = getFieldsValue();
		let baby_bir = data.baby_birthday&&data.baby_birthday.format('YYYY-MM-DD');
		
		//验证宝宝姓名
		if(data.baby_name == '' || data.baby_name == undefined || data.baby_name == 'undefined') {
			return Toast.info('请输入宝宝姓名', 1);		
		}

		//验证宝宝姓名是否含有数字
		if(data.baby_name&&data.baby_name.length>0) {
			if(data.baby_name.match(/\d+/g)) {
				return Toast.info('姓名不能包含数字', 1);
			}
		}

		//验证联系方式
		if(data.baby_phone != '' && data.baby_phone != undefined && data.baby_phone != 'undefined') {
			let reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
			let phone = data.baby_phone.replace(/\s/g, "");
			if (!reg.test(phone)) {
				return Toast.info("请输入正确的手机号码", 1);
			} 
		} else {				
			return Toast.info('请输入联系方式', 1);
		}
		
		//验证宝宝生日
		if(baby_bir == '' || baby_bir == undefined || baby_bir == 'undefined') {
			return Toast.info('请输入宝宝生日', 1);
		}
			
				
		let paramter = {
			baby_bir 	: baby_bir,
			baby_name 	: data.baby_name,
			baby_phone 	: data.baby_phone.replace(/\s/g, ""),
		}
		dp('submit', {paramter : paramter})
	}

	//绘图
	function drawing_process(color, LW) {
		let canvas, board, img;			
		canvas				= document.getElementById('myCanvas');
		board 				= canvas.getContext('2d');
		board.lineWidth 	= LW || 10;
		board.strokeStyle	= color || 'black';
		let mousePress 		= touchScreen;
		let last 			= null;									//记录最后一次划线
		canvas.onmousedown 	= beginDraw;							//为鼠标按下事件指定要执行的函数
		canvas.onmousemove 	= drawing;								//为鼠标移动事件指定要执行的函数		
		canvas.onmouseup 	= endDraw;								//为鼠标松开事件指定要执行的函数
		canvas.addEventListener('touchstart', beginDraw, false);	//为canvas添加touchstart事件，当手指在触摸屏设备(如手机)中按下时触发
		canvas.addEventListener('touchmove', drawing, false);		//为canvas添加touchmove事件，当手指在触摸屏设备(如手机)中按下并移动时触发
		canvas.addEventListener('touchend', endDraw, false);		//为canvas添加touchend事件，当手指在触摸屏设备(如手机)中离开时触发
		
		//按下屏幕
		function beginDraw(event) {             
        	mousePress = true;
		}

		//画画过程
		function drawing(event) {
			event.preventDefault();
			let xy = pos(event);
			if (last != null) {
				board.beginPath();
				board.moveTo(last.x, last.y);
				board.lineTo(xy.x, xy.y);
				board.stroke();
			}
			last = xy;
		}

		//离开屏幕
		function endDraw(event) {
			mousePress = false;
			event.preventDefault();
			last = null;
		}

		function pos(event) {
			let x, y;
			if (isTouch(event)) {
				x = event.touches[0].pageX;
				y = event.touches[0].pageY;
			} else {
				x = event.offsetX + event.target.offsetLeft;
				y = event.offsetY + event.target.offsetTop;
			}
			return {
				x: x,
				y: y
			};
		}

		function isTouch(event) {
			let type = event.type;
			if (type.indexOf('touch') >= 0) {
				return true;
			} else {
				return false;
			}
		}
	}

	//保存图片
	function save() { 
		let canvas = document.getElementById('myCanvas');
		let dataUrl = canvas.toDataURL();  
		let img = document.getElementById('copy_img');
		img.src = dataUrl;
	}
	
	//画布颜色
	function selectBackgroundColor(item) {
		let canvas			= document.getElementById('myCanvas');
		let board 			= canvas.getContext('2d');
		board.clearRect(0, 0, canvas.width, canvas.height);
		dp('updateState', {bg_color : item});
	}
	
	//画笔颜色
	function selectBrushColor(item) {
		drawing_process(item);
	}
	
	//橡皮擦大小	
	function selectEraserSize(item) {
		drawing_process(bg_color, item.w || 20);
	}

	//清除画布内容
	function clearCanvas() {
		let canvas			= document.getElementById('myCanvas');
		let board 			= canvas.getContext('2d');
		board.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	function touchScreenFunction() {
		dp('updateState', {touchScreen : true});
		drawing_process();
	}

	//颜色属性
	let colorArr = ["#000", '#fff', '#f00', '#f3ff00', '#1800ff', '#1800ff', '#ef4b1f'];
	let eraserSize = [{w : 20, h : 20},{w : 30, h : 30},{w : 40, h : 40}];
	
	return(
			<div className="graffiti">
				<canvas id="myCanvas" 
					width={window.innerWidth}
					height={window.innerHeight / 2}
					style={{borderBottom:'1px solid rgb(210, 206, 206)', backgroundColor : bg_color}}
				>
				</canvas>
				<div className={styles.button_div}>
					<Button className={styles.start_button} onClick={() => touchScreenFunction()} type="primary" size="small">开始画图</Button>
					<Button className={styles.start_button} onClick={() => save()} type="primary" size="small">生成图片</Button>
					<Button className={styles.start_button} onClick={() => clearCanvas()} type="primary" size="small">清空画布</Button>
				</div>
				<p className={styles.eraser}>橡皮擦</p>
				{
					eraserSize&&eraserSize.map((item,index) => {
						return <div key={index} className={styles.eraser_size}>
									<div style={{
											width : item.w + 'px',
											height : item.h + 'px',
											backgroundColor : '#efdede', 
											borderRadius : '50%', 
											float : 'left',
										}}
										onClick={() => selectEraserSize(item)}
									></div>
								</div>
					})
				}
				{
					/*
					<p className={styles.canvas_bg_color}>背景颜色</p>
					colorArr&&colorArr.map((item, index) => {
						return <div key={index} className={styles.color_item} style={{backgroundColor : item}} onClick={() => selectBackgroundColor(item)}></div>
					})
					*/
				}
					
				<p className={styles.canvas_bg_color}>画笔颜色</p>
				{
					colorArr&&colorArr.map((item, index) => {
						return <div key={index} className={styles.color_item} style={{backgroundColor : item}} onClick={() => selectBrushColor(item)}></div>
					})
				}
				<img className={styles.copy_img} id='copy_img' />
			</div>
    );
}

export default createForm()(GraffitiComponent);
