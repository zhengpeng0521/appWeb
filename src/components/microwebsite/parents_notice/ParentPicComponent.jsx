import React from 'react';
import styles from './ParentPicComponent.less';
import { WhiteSpace, WingBlank, Icon, Button, ListView, Carousel } from 'antd-mobile';

function ParentPicComponent({
	picArrs, index,showBack
}){
	let _height = document.body.clientHeight + 'px';
	return(
		<div className = { styles.parent_pic_wrap }>
			<Carousel
				className = 'parent_pic_carousel'
				style = {{ height : _height}}
				dots = { false }
				autoplay = { false }
				dragging={false}
				selectedIndex = { index }
				swipeSpeed = { 35 }
			>
				{
					picArrs.length > 0 && picArrs.map(function( item, index ){
						if(item.indexOf('mp4') != -1 || item.indexOf('MOV') != -1){
							return ( <div key = { 'parent_pic_carousel_' + index } className = { styles.parent_pic_item } >
							<div className = { styles.parent_pic_item_con } onClick={showBack}>
                                <video controls src={item} style={{display:'block',width:'100%'}}/>
							</div>
						</div>)
						} else {
							return ( <div key = { 'parent_pic_carousel_' + index } className = { styles.parent_pic_item } >
							<div className = { styles.parent_pic_item_con } onClick={showBack}>
                                <img src={item} style={{display:'block',width:'100%'}}/>
							</div>
						</div>)
						}

					})
				}
			</Carousel>
		</div>
	)
}

export default ParentPicComponent;
