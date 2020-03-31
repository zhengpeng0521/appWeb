import React from 'react';
import styles from './babyListComponent.less';
import {WhiteSpace, WingBlank, Icon} from 'antd-mobile';
import MicroEmptyDataComponent from '../common/microEmptyDataComponent.jsx';

function MicroBabyListComponent({

	babyList,
	getHasCRM,
	vipBabyList,
	touchBabyRowFunction,
	
}) {
	
	let props = {
		touchBabyRowFunction,
		babyArr : babyList,
		title : '非会员',
		getHasCRM,
	}
	
	let vipProps = {
		touchBabyRowFunction,
		babyArr : vipBabyList,
		title : '会员',
		getHasCRM,
	}
	return(
		<div className="js_baby_list" >
			{
				vipBabyList&&vipBabyList.length > 0 || babyList&&babyList.length > 0 
					? 
					''
					: 
					<MicroEmptyDataComponent title="您还没学员数据哦" top="calc(100% / 2)" />
			}
			{vipBabyList&&vipBabyList.length > 0 ? <BabyInfo {...vipProps} /> : ''}
			{babyList&&babyList.length > 0 ? <BabyInfo {...props} /> : ''}
			<div style={{height : '100px', width : '100%', background : '#f0f1f2'}}></div>
			<div className={styles.js_baby_row_create} onClick={() => touchBabyRowFunction(0)}>新增</div>
		</div>
    );
}

function BabyInfo({

	title,
	babyArr,
	getHasCRM,
	touchBabyRowFunction,
	
}) {

	function touchBabyRowFun(item) {
		touchBabyRowFunction(item)
	}
	return (
			<div>
			{getHasCRM == '1' ? <p className={styles.js_members_status}>{title || ''}</p> : ''}
				{
					babyArr&&babyArr.length>0
					?
					babyArr.map((item, index) => {
						return  <div key={index}>
									<div className={styles.js_baby_row}>
										<WingBlank>
											<div className={styles.js_baby_row_div} onClick={() => touchBabyRowFun(item)}>
												<div className={styles.js_baby_row_div_header_div}>
													<div className={styles.js_baby_row_div_header} style={{backgroundImage : 'url(' + item.headimgurl +')'}}></div>
												</div>
												<div className={styles.js_baby_row_div_content_div}>
													<p className={styles.js_baby_row_name}>{item.name || ''}</p>
													<p className={styles.js_baby_row_campus}>所在校区：{item.orgName || ''}</p>
												</div>
												<div className={styles.js_baby_row_arrow_div}>
													<svg aria-hidden="true"  
														className={styles.js_baby_row_arrow} 
														onClick={() => touchPersonIconFunction()}>
														<use xlinkHref="#anticon-arrow"></use>
													</svg>
												</div>

											</div>
										</WingBlank>
									</div>
								</div>
					})
					:
					<MicroEmptyDataComponent title="您还没有学员数据哦" top="calc(100% / 2)" />
				}
			</div>
		);
}

export default MicroBabyListComponent;

//
//			<svg aria-hidden="true"  className={styles.js_banner_fixed_person_icon} onClick={() => touchPersonIconFunction()}>
//				<use xlinkHref="#anticon-user"></use>
//			</svg>
