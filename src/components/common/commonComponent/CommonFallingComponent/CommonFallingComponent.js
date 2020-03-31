/*
 * imageArr 		: []		(数据源)				   
 									数组 需要飘落的不同图片链接 如果是一样的图片，传入一张即可
 * number  		 	: 20 		(数量)	 				
 									imageArr数组图片只有一张的时候默认遍历20次进行飘落， 超过一张时候按照数长度进行飘落
 * isCustomNumber	: false		(是否自定义设置飘落次数)	  
 									如果是true. 
									在imageArr数组只有一张的情况下，会根据自定义或默认的number图片进行飘落，
									如果是多张，会对除了imageArr包含的图片外对图片进行随机抽样(number减imageArr个数)张进行飘落
 * itemImageStyle 	: {}    	(自定义样式)
 * direction		: '' 		(掉落方向) 		
 									①.default ②.vertical ③.left ④.right
 * speenArr			: []		(掉落速度)
 									示例[3，6] 索引0必须比索引1大, 只会取前两个，超出不取 此示例会取出3-6秒的随机值
 * isObj			: false		(未扩展)
 									是否是自己画的图片
 */
import React, {PropTypes} from 'react';
import { Toast } from 'antd-mobile';
import styles from './CommonFallingComponent.less';

function FallingComponent({

	number,
	imageArr,
	isCustomNumber,
	itemImageStyle,
	direction,
	speenArr,
	
}) {
	
	if(imageArr&&imageArr.length === 0) {
		return <p>{Toast.info('请设置imageArr属性')}</p>
	}

	number 			= number || 20;
	isCustomNumber	= isCustomNumber || false;
	itemImageStyle  = itemImageStyle || {};
	direction		= direction || 'default';
	speenArr		= speenArr || [];
	
	if(imageArr&&imageArr.length >= number) {
		number = imageArr.length;
	}
	
	function getNewArr() {
		let tempArr = [];
		if(number != imageArr.length) {
			let remaining = number - imageArr.length;
			tempArr = imageArr;
			for(let i = 0; i < remaining; i++) {
				var index = Math.floor((Math.random() * imageArr.length)); 
				tempArr.push(imageArr[index]);
			}
		} else {
			tempArr = imageArr;			
		}
		return tempArr;
	}
	
	let imageContainerArray = [];

	if(isCustomNumber) {
		if(imageArr&&imageArr.length  === 1) {
			for(let i = 0; i < number; i++) {
				imageContainerArray.push(imageArr[0]);
			}
		} else {
			imageContainerArray = getNewArr();
		}
	} else {
		imageContainerArray = imageArr;//getNewArr();
	}
	
	let screenW 	= document.body.clientWidth;
	let screenH 	= document.body.clientHeight;
	let beganTime 	= undefined;	//开始时间
	let overTime 	= undefined;	//结束时间
	
	if(speenArr.length > 0) {
	   	beganTime 	= speenArr.length > 0 ? speenArr[0] : 4;
		overTime 	= speenArr.length > 1 ? speenArr[1] : 6;
		if(beganTime > overTime) {
			return <p>{Toast.info('速度设置错误')}</p>   
		}
	}
			
	return(
		<div style={{position: 'absolute', zIndex: 10000}}>
			{
				imageContainerArray&&imageContainerArray.map((item, index) => {
					let item_url 	= 'url(' + item +')';
					let duration 	= 0;
					if(beganTime != undefined && overTime != undefined) {								
						duration = Math.random()*overTime+beganTime + 's';
					} else {
						duration = Math.random()*6+4 + 's';
					}
					let left 		= Math.random()*screenW + 1;
					let delay 	 	= Math.random()*2;
					let aniName		= '';
					let boxStyle 	= '';
		
					switch(direction) {
						case 'vertical':
							boxStyle = styles.itemBoxVertical;
							break;
						case 'left':
							boxStyle = styles.itemBoxLeftOblique;
							left += 200;
							break;
						case 'right':
							boxStyle = styles.itemBoxRightOblique;
							left -= 200;
							break;
						default :
							boxStyle = styles.itemBox;
							aniName  = delay > 0.5 ? styles.item_image_counterclockwiseSpinAndFlip : styles.item_image_clockwiseSpin;
							break;
					}
					return (						
						<div key={index} className={boxStyle}
							 style={{
								animationDuration : duration,
								animationDelay : delay,
								left : left,
							 }}>
							 <div className={aniName}
								  style={{
									...itemImageStyle,
									backgroundImage : item_url,
									animationDuration : duration,
									animationDelay : delay,
								  }}>
							 </div>
						</div>
					)
				})
			}
		</div>
    );
}

export default FallingComponent;