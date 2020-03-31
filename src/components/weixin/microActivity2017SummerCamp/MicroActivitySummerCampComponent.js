import React, {PropTypes} from 'react';
import { InputItem, Modal, DatePicker, List, Toast } from 'antd-mobile';
import styles from './MicroActivitySummerCampComponent.less';
import moment from 'moment';
import {createForm} from 'rc-form';
const gmtNow = moment().utcOffset(0);
import SubmitComponent from '../../../components/common/commonComponent/commonSubmitComponent/CommonSubmitComponent.js';

function CampComponent({

	dp,
    data,
	form : {
		getFieldProps,
		getFieldsValue,
	}

}) {
	
	let submitProps = {
		dot_title : '微活动2017夏令营',
		submitFun : function(props){ dp('submit', props)},
		inputStyles1 : {
			width: '80%',
			height: '1rem',
			margin: 'auto',
			marginTop: '0.3rem',
			marginBottom:' 0.3rem',
			lineHeight: '1rem',
			textAlign: 'center',
			fontSize: '0.35rem',
			background: 'rgb(234,238,229)',
			borderRadius: '0.1rem',
		},
		submitStyles : {
			width: '80%',
			height: '1rem',
			margin: 'auto',
			marginTop: '0.5rem',
			marginBottom: '0.3rem',
			lineHeight: '1rem',
			textAlign: 'center',
			fontSize: '0.35rem',
			background: '#f2ae16',
			borderRadius: '0.1rem',
			color : 'white',
		},
	}

	let login_url = `url(${data.headImgUrl}!s300)`;
	let content1Arr = data.content1&&data.content1.length > 0 ? data.content1.split('\n') : '';
	let content4Arr = data.content4&&data.content4.length > 0 ? data.content4.split('\n') : '';

	return(
			<div className="summer_camp_base_div">
				{/*第一页*/}
				<div className={styles.bg_page1}>
					<div className={styles.page1_header_image} style={{backgroundImage : login_url}}></div>
					<div className={styles.page1_content}>
						<p className={styles.page1_sub_title}>{data.orgTitle || ''}</p>
						<p className={styles.page1_title}>{data.headTitle || ''}</p>
						<p className={styles.page1_org_name}>{data.subTitle || ''}</p>
						{
							(data.actiStartTime != undefined && data.actiEndTime != undefined) ? <p className={styles.page1_time}>{data.actiStartTime || ''}至{data.actiEndTime || ''}</p> : ''
						}
					</div>
					<div className={styles.page1_yunduo}></div>
					<div className={styles.page1_hongfengchegan}></div>
					<div className={styles.page1_hongfengche}></div>
					<div className={styles.page1_huangfengchegan}></div>
					<div className={styles.page1_huangfengche}></div>
					<div className={styles.page1_school_bus}></div>
				</div>
				{/*第二页*/}
				<div className={styles.page2_top_image}></div>
				<div className={styles.page2_pink_ball_image}></div>
				<div className={styles.page2_blue_ball_image}></div>

				<div className={styles.page2_center_image}>
					<p className={styles.page2_title}>{data.title1 || ''}</p>
					{
						content1Arr&&content1Arr.length>0&&content1Arr.map((item,index) => {
							return <p key={index} className={styles.page_content}>{item}</p>
						})
					}
				</div>
				<div className={styles.page2_bottom_image}>
					<div className={styles.page2_blue_flowers1_image}></div>
					<div className={styles.page2_blue_flowers2_image}></div>
				</div>
				{/*第三页*/}
				<div className={styles.page3_top_image}></div>
				<div className={styles.page3_center_image}>
					<p className={styles.page3_title}>{data.title2 || ''}</p>
					{
						data.mainProcess&&data.mainProcess.length>0&&data.mainProcess.map((item,index) => {
							let border_col = index == 0 ? '5px rgb(131,176,68) solid' : index == 1 ? '5px rgb(80,163,242) solid' : '5px rgb(113,117,197) solid';
							let bg_col = index == 0 ? 'rgb(131,176,68)' : index == 1 ? 'rgb(80,163,242)' : 'rgb(113,117,197)';
							let newStyle = index != 1 ? styles.page3_base_div_title_div_left : styles.page3_base_div_title_div_right;
							let newContentStyle = index != 1 ? styles.page3_base_div_content_left : styles.page3_base_div_content_right;

							return 	<div key={index} className={styles.page3_base_div} style={{border : border_col}}>
										<div className={newStyle} style={{background : bg_col}}>
											<p className={styles.page3_base_div_title}>{item.label || ''}</p>
										</div>
										<div className={newContentStyle} style={{color : bg_col}}>{item.value || ''}</div>
									</div>
						})
					}
				</div>
				<div className={styles.page3_botton_image}>
					<div className={styles.page3_giraffe}></div>
					<div className={styles.page3_giraffe_head}></div>
					<div className={styles.page3_rabbit}></div>
				</div>

				{/*第四页*/}
				<div className={styles.page4_top_image}></div>
				<div className={styles.page4_center_image}>
					<div className={styles.page4_sun}></div>
					<p className={styles.page4_title}>{data.title3 || ''}</p>
					{
						data.details&&data.details.length>0&&data.details.map((item, index) => {
							let newDivContentStyle = index % 2 == 0 ? styles.page4_base_div_content_left : styles.page4_base_div_content_right;

							return 	<div key={index} className={styles.page4_base_div}>
										<div className={newDivContentStyle}>
											<p className={styles.page4_text}>{item}</p>
											<div className={index % 2 == 0 ? styles.page4_icon_left : styles.page4_icon_right}></div>
											<div className={index != data.details.length - 1 ? (index % 2 == 0 ? styles.page4_line_left : styles.page4_line_right) : ''}></div>
										</div>
									</div>
						})
					}
				</div>
				<div className={styles.page4_buttom_image}>
					<div className={styles.page4_qiqiu1}></div>
					<div className={styles.page4_qiqiu2}></div>
					<div className={styles.page4_fish}></div>
					<div className={styles.page4_ship_zhijia}></div>
					<div className={styles.page4_ship}></div>
					<div className={styles.page4_haishui}></div>
				</div>

				{/*第五页*/}
				<div className={styles.page5_top_image}></div>
				<div className={styles.page5_center_image}>
					<p className={styles.page5_title}>{data.title4 || ''}</p>
					{
						content4Arr&&content4Arr.length>0&&content4Arr.map((item,index) => {
							return 	<p key={index} className={styles.page5_text}>
										{item}
									</p>
						})
					}
				</div>
				<div className={styles.page5_botton_image}>
					<div className={styles.page5_qiqiu}></div>
					<div className={styles.page5_big_mushroom}></div>
					<div className={styles.page5_small_mushroom}></div>
					<div className={styles.page5_flowers}></div>
				</div>

				{/*第六页*/}
				<div className={styles.page6_top_image}></div>
				<div className={styles.page6_center_image}>
					<p className={styles.page6_title}>{data.title5 || ''}</p>
					{
						data.orgImgs&&data.orgImgs.length>0&&data.orgImgs.map((item, index) => {
							let url;
							if(item.imgurl.length > 0 && item.imgurl != undefined && item.imgurl != '') {
								url = `url(${item.imgurl})`;
								return 	<div key={index} className={styles.page6_item_image_div} style={{backgroundImage : url}}></div>
							}
						})
					}
				</div>
				<div className={styles.page6_botton_image}>
					<div className={styles.page6_botton_image_bees}></div>
					<div className={styles.page6_botton_image_bees_right}></div>
					<div className={styles.page6_botton_image_car}></div>
					<div className={styles.page6_botton_image_lunzi_l}></div>
					<div className={styles.page6_botton_image_lunzi_r}></div>
					<div className={styles.page6_balloon}></div>
				</div>

				{/*第七页*/}
				<div className={styles.page7_top_image}></div>
				<div className={styles.page7_center_image}>
					<p className={styles.page6_title}>{data.title6 || ''}</p>
					<SubmitComponent {...submitProps} />
					<div className={styles.page7_person_1}></div>
					<div className={styles.page7_person_2}></div>
					<div className={styles.page7_person_3}></div>
					<div className={styles.page7_person_4}></div>
				</div>
				<div className={styles.page7_botton_image}>
					<div className={styles.page7_shadow_1}></div>
					<div className={styles.page7_shadow_2}></div>
					<div className={styles.page7_shadow_3}></div>
					<div className={styles.page7_shadow_4}></div>
					<div className={styles.page7_fengzheng_blue}></div>
					<div className={styles.page7_fengzheng_green}></div>
				</div>
				<a href="http://www.ishanshan.com/"><p className="technical_support" style={{color : 'white'}}>闪宝科技提供技术支持</p></a>
			</div>
    );
}

export default createForm()(CampComponent);

/*矩形(rx ry) 圆角
<svg
	xmlns = "http://www.w3.org/2000/svg"
	version = "1.1"
	width = "100%"
	height="400"
></svg>

<rect
	width='50%'
	height='50%'
	x="10"
	y="10"
	rx="20"
	ry="20"
	style={{fill : 'red', stroke : 'yellow', strokeWidth : '10', opacity : '1'}} />

圆
<circle r="50" cx="50" cy="50"/>

椭圆
<ellipse style={{fill : 'red'}} cx="100" cy="70" rx="100" ry="70"/>
<ellipse style={{fill : 'yellow'}} cx="100" cy="105" rx="100" ry="70"/>
<ellipse style={{fill : 'black'}} cx="100" cy="140" rx="100" ry="70"/>
<ellipse style={{fill : 'red'}} cx="200" cy="200" rx="100" ry="50" />
<ellipse style={{fill : 'yellow'}} cx="200" cy="200" rx="90" ry="40" />

线条
<line style={{stroke:'red', strokeWidth : '2'}} x1="50" y1="50" x2="100" y2="100"/>

多边形
<polygon points="100,100 150,100 150,170 100, 170"/>

直线
<polyline style={{fill:'white', stroke:'red',strokeWidth:'2'}} points="0,0 0,20 20,20 20,40 40,40 40,60" />
*/
