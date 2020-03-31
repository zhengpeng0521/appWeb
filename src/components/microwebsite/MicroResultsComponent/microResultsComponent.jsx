/*  ✅（为必选）
 *	dataSource 	: {
 *		(string❌) type 			: 1、无列表 2、有列表
 *		(string❌) icon_name		: 入值(chenggong, shibai) || '',
 *		(string❌) resultsTitle 	: 入值 || '',
 *		(string❌) resultsIntro 	: 入值 || '',
 *		(bool  ❌) hidTitle		: 是否隐藏dataList里面的title, 默认false.
 *		(Array ✅) dataList		: [{
 *										title : 入值 || '', 
 *										value : [{label : '', value : ''}]
 * 							  	 	}],
 *	}
 *
 *	goHomeFunction				: function
 *  goPersonCenterunction		: function
 */
import React from 'react';
import styles from './microResultsComponent.less';
import {Toast, Icon, WhiteSpace, WingBlank} from 'antd-mobile';

function MicroResultsComponent({

	dataSource,
	goHomeFunction,
	goPersonCenterunction,
	
}) {
	
//	dataSource = {
//		type : '2',
//		icon_name : 'chenggong',
//		resultsTitle : '敲到成功',
//		resultsIntro : '这是一段话',
//		dataList  : [{
//						title : '签到失败', 
//					  	value : [{label : '宝宝姓名', value : 'value'}, {label : 'key', value : 'value'}]
//					 }, 
//					 {
//						title : '签到失败', 
//						value : [{label : 'key', value : 'value'}]
//					 },
//					]
//	}

	let keys = Object.keys(dataSource);
	
	if(keys.length  == 0) {
		return  (
			<div>
				<WhiteSpace />
				<p className={styles.empty}>数据不能为空</p>
			</div>
		)
	}
	
	let type = dataSource&&dataSource.type;
	
	let hidden_title = dataSource&&dataSource.hidTitle || false;
	
	let components = (
			<div>
				{
					dataSource.dataList&&dataSource.dataList.length > 0 
						?
							dataSource.dataList.map((item, index) => {
								let length = dataSource.dataList.length || 0;
								return	<div key={index}>
											<WhiteSpace />
											<div className={styles.results_row}>
												<WingBlank>
													{hidden_title == false ? <p className={styles.results_list_row_title}>{item.title}</p> : ''}
													{
														item.value.map((valueItem, valueIdx) => {
															return  <div style={{height : '70px'}} key={valueIdx}>
																		<p  className={styles.results_list_row_l_p} 
																			style={{width : length == '1' ? '150px' : '30%'}}
																		>
																			{valueItem.label}：
																		</p>
																		<p  className={styles.results_list_row_r_p}
																			style={{
																				width : length == '1' ? 'calc(100% - 150px)' : '70%',
																				textAlign : length == '1' ? 'left' : 'right',
																			}}
																		>
																			{valueItem.value}
																		</p>
																	</div>
														})
													}
												</WingBlank>
											</div>	
										</div>
							})
						:
							<div>
								<WhiteSpace />
								<p className={styles.empty}>未获得数据</p>
							</div>
				}
			</div>
	)
	
	return (
		<div className={styles.base_results}>			
			<div className={styles.results}>
				<div  className={styles.home_icon_div}></div>
				<svg className={styles.home_icon_style} onClick={() => goHomeFunction()}>
					<use xlinkHref="#anticon-home"></use>
				</svg>
				<div  className={styles.user_icon_div}></div>
				<svg className={styles.user_icon_style} onClick={() => goPersonCenterunction()}>
					<use xlinkHref="#anticon-user"></use>
				</svg>
				<svg className={styles.results_icon} 
					 onClick={() => goPersonCenterunction()}>
					<use xlinkHref={`#anticon-${dataSource.icon_name}` || ''}></use>
				</svg>				
				<p className={styles.results_title}>{dataSource.resultsTitle || ''}</p>
				{type == '1' ? <p className={styles.results_no_list_p}>{dataSource.resultsIntro || ''}</p> : ''}
			</div>
			{type == '2' ? components : ''}
		</div>
    );
}

export default MicroResultsComponent;


/*
 *	动态key 适用于有key有value的字典数组
 *
 */
//return (
//		<div className={styles.base_results}>
//			<div className={styles.results}>
//				<Icon type='home' className={styles.results_icon}/>
//				<p className={styles.results_title}>{dataSource&&dataSource.title || '这里暂时没有数据'}</p>
//			</div>
//			{
//				type == '1' ? 	<div className={styles.results_no_list}>
//									<p className={styles.results_no_list_p}>这还是阿萨德拉黑塑料袋阿拉斯加的哈收到啦拉黑收到啦忽视了肯德基啊</p>
//								</div>
//							:  
//								<div>
//									{
//										dataSource&&dataSource.dataList.length > 0 
//											? 
//											dataSource.dataList.map((item, index) => {
//												let keyArr = Object.keys(item);
//												let componentArr = [];
//												keyArr.map((keyItem, keyIndex) => {
//													componentArr.push(
//														<div key={keyIndex}>
//															<WingBlank>
//																<p className={styles.results_list_row_l_p}>{/*item[keyItem]*/}key</p>
//																<p className={styles.results_list_row_r_p}>{/*item[keyItem]*/}value</p>
//															</WingBlank>
//														</div>
//													)
//												})
//												return  <div
//															key={index}
//															style={{
//																height : componentArr.length * 80,
//																backgroundColor : 'white',
//																marginTop : '20px',
//															}}
//														>
//															{componentArr}
//														</div>
//											})
//											: 
//											<p>空</p>
//									}
//								</div>
//			}
//		</div>
//    );
