import React from 'react';
import styles from './confirmAvtivityComponent.less';
import {WhiteSpace, WingBlank, Icon, Checkbox, ActivityIndicator} from 'antd-mobile';
import MicroPopUpView from '../common/common_pop_up_view.jsx';
const CheckboxItem = Checkbox.CheckboxItem;
import AlertView from '../common/common_alert_view.js';

function MicroSelectCampusComponent({

	dp,
	data,
	isCRM,
	showAlertView,
	signStatus,
	dataSource,
	isSelectVip,
	payMoney,
	singleData,
	submitFunction,
	showAlertString,
	showAlertOperationString,
	touchAddStudentFunction,
	returnActivityDetailFcuntion,
	dataStringURL,
	isSaveBaby

}) {

	var startDate	 = new Date();
	var endDate 	= new Date();
	startDate.setTime(dataSource&&dataSource.activitystartTime);
	endDate.setTime(dataSource&&dataSource.activityendTime);

	let alertProps = {
		attrShowAlertView: showAlertView,
		attrTitleParam: showAlertString,
		attrButtonParam: showAlertOperationString,
		attrBoxStyle : 'alert_view_box',
		cancelFunction : function(data) {
			dp('updateState', { showAlertView: false, signStatus: false, isSelectVip: undefined, singleData : {}});
			returnActivityDetailFcuntion();
		},
		determineFunction : function(data) {
			
			dp('updateState', { showAlertView: false });
			if (dataStringURL == '1') {
				//待支付状态
				dp('submit', { surePay: '1', dataInfo: singleData, isSelectVip: isSelectVip});
			} else if (dataStringURL == '2') {
				//非订单活动
				dp('updateState', { signStatus: false });
			} else {
				//支付成功后返回活动详情
				returnActivityDetailFcuntion();
			}
		}
	}

	//处理数据源
	let tempSource = [];

	data && data.map((item, index) => {

		if ((item.joinStatus != 0 || item.joinStatus != '0') && (item.joinStatus != '4' || item.joinStatus != 4)) {
			item.disabled = true;
		} else {
			item.disabled = false;
		}

		tempSource.push({...item});
	})

	let props = {
		attrDataSource		: tempSource,
		attrTitleString 	: '学员姓名',
		attrBottomString 	: '添加学员',
		aSingleDataFunction : function(data) {
			dp('updateState', { singleData : data});
		},
		aBottomFunction : function() {
			// console.info('111')
			touchAddStudentFunction();
		},
		isSaveBaby:isSaveBaby
	}

	function selectVip() {
		dp('updateState', { isSelectVip: true });	
	}
	
	function cancelSelectVip() {
		dp('updateState', { isSelectVip: false });	
	}

	return( 
		<div className="js_micro_confirm_avtivity">
			<ActivityIndicator
				toast
				text="报名中"
				animating={signStatus}
			/>
			<WhiteSpace />
			<div className={styles.js_confirm_top_div}>
				<WingBlank>
					<p className={styles.js_confirm_title}>{dataSource&&dataSource.actName || ''}</p>
					<p className={styles.js_confirm_time}>{startDate.toLocaleString()}  --  {endDate.toLocaleString()}</p>
				</WingBlank>
			</div>
			<WhiteSpace />
			<div className={styles.js_confirm_student}>
				<WingBlank>
					<MicroPopUpView {...props} />
				</WingBlank>
			</div>
			{
				(dataSource && dataSource.vipSet == '1' || dataSource && dataSource.vipSet == 1) ?
					<div className={styles.js_confirm_student}>
						<WingBlank>
							<div className={styles.row_content}>
								<p className={styles.js_confirm_left_select}>是否会员</p>
								<div className={styles.js_confirm_right_select}>
									<div className={isSelectVip ? styles.check_value_select : styles.check_value} onClick={() => selectVip()}></div>
									<p className={styles.check_label}>是</p>
									<div className={(isSelectVip || isSelectVip === undefined) ? styles.check_value : styles.check_value_select} onClick={() => cancelSelectVip()}></div>
									<p className={styles.check_label}>否</p>
								</div>
							</div>
						</WingBlank>
					</div>
				: ''
			}
			{
				payMoney && payMoney != "0.00" ?
				<div className={styles.js_confirm_student}>
					<WingBlank>
						<div className={styles.row_content}>
							<p className={styles.js_confirm_left}>支付金额</p>
							<p className={styles.js_confirm_right} className={styles.js_confirm_right_money}>{payMoney || 0}<span className={styles.js_confirm_right_unit}>元</span></p>
						</div>
					</WingBlank>
				</div>
			 : ''
			}
			<div className={styles.js_confirm_bottom_div} onClick={() => submitFunction()}>提交报名</div>
			<AlertView {...alertProps} />
		</div>
    );
}

export default MicroSelectCampusComponent;

/*
 *
 * 	支付版本前
 * 
 */

// function MicroSelectCampusComponent({
// 	dp,
// 	data,
// 	isCRM,
// 	signStatus,
// 	dataSource,
// 	selectRows,
// 	submitFunction,
// 	touchAddStudentFunction,

// }) {

// 	var startDate = new Date();
// 	var endDate = new Date();
// 	startDate.setTime(dataSource && dataSource.activitystartTime);
// 	endDate.setTime(dataSource && dataSource.activityendTime);

// 	function onChange(val) {

// 		for (let idx in data) {
// 			if (idx == val) {
// 				data[idx].isbool == undefined ? (data[idx].isbool = true) : (data[idx].isbool = undefined);
// 				data[idx].selectVip = undefined;
// 				data[idx].selectNoVip = undefined;
// 			}
// 		}
// 		dp('updateState', { selectRows: data });
// 	}

// 	function g(val, type) {
// 		for (let idx in data) {
// 			if (idx == val && type == 1) {
// 				data[idx].selectVip = true;
// 				data[idx].selectNoVip = false;
// 			} else if (idx == val && type == 2) {
// 				data[idx].selectVip = false;
// 				data[idx].selectNoVip = true;
// 			}
// 		}
// 		dp('updateState', { selectRows: data });
// 	}

// 	function selectYesVIP(index) {
// 		g(index, 1);
// 	}

// 	function selectNoVIP(index) {
// 		g(index, 2);
// 	}

// 	let tempData = selectRows && selectRows.length > 0 ? selectRows : data;

// 	return (
// 		<div className="js_micro_confirm_avtivity">
// 			<ActivityIndicator
// 				toast
// 				text="报名中"
// 				animating={signStatus}
// 			/>
// 			<WhiteSpace />
// 			<div className={styles.js_confirm_top_div}>
// 				<WingBlank>
// 					<p className={styles.js_confirm_title}>{dataSource && dataSource.actName || ''}</p>
// 					<p className={styles.js_confirm_time}>{startDate.toLocaleString()}  --  {endDate.toLocaleString()}</p>
// 				</WingBlank>
// 			</div>
// 			<WhiteSpace />
// 			<div className={styles.js_confirm_student}>
// 				<WingBlank>
// 					<p className={styles.js_confirm_student_title}>报名学员</p>
// 					<div className={styles.js_confirm_student_div} onClick={() => touchAddStudentFunction()}>
// 						<p className={styles.js_confirm_student_add}>添加学员</p>
// 						<svg aria-hidden="true"
// 							style={{
// 								height: 40,
// 								width: 40,
// 								float: 'right',
// 								lineHeight: '87px',
// 								marginRight: '10px',
// 								marginTop: 20,
// 							}}>
// 							<use xlinkHref="#anticon-jia"></use>
// 						</svg>
// 					</div>
// 				</WingBlank>
// 			</div>
// 			{
// 				tempData && tempData.length > 0 && data.map((i, index) => {

// 					let sty1 = i.selectVip && i.selectVip ? styles.check_value_select : styles.check_value;
// 					let sty2 = i.selectNoVip && i.selectNoVip ? styles.check_value_select : styles.check_value;

// 					return <div className={styles.js_confirm_checkboxItem_background} key={index}>
// 						<WingBlank>
// 							{
// 								(i.joinStatus == "0" || i.joinStatus == 0)
// 									?
// 									<CheckboxItem key={i.id} onChange={() => onChange(index)}>
// 										<p style={{ float: 'left', margin: 0, }}>{i.name}</p>
// 										<p style={{ float: 'left', margin: 0, color: 'red' }}>{i.isVIP ? '（会员)' : ''}</p>
// 									</CheckboxItem>
// 									:
// 									(i.joinStatus == "1" || i.joinStatus == 1)
// 										?
// 										<div className={styles.js_label_div} key={index}>
// 											<p className={styles.js_label}>{i.name}</p>
// 											<p className={styles.js_label_vip}>{i.isVIP ? '（会员)' : ''}</p>
// 											<p className={styles.js_label_status}>等位中</p>
// 										</div>
// 										:
// 										(i.joinStatus == "2" || i.joinStatus == 2)
// 											?
// 											<div className={styles.js_label_div} key={index}>
// 												<p className={styles.js_label}>{i.name}</p>
// 												<p className={styles.js_label_vip}>{i.isVIP ? '（会员)' : ''}</p>
// 												<p className={styles.js_label_status}>报名成功</p>
// 											</div>
// 											:
// 											''
// 							}
// 							{
// 								/*i.isbool && !isCRM && parseInt(dataSource&&dataSource.vipSet) == 1*/
// 								i.isbool && parseInt(dataSource && dataSource.vipSet) == 1 && i.isVIP == false
// 									?
// 									<div className={styles.setVip_div}>
// 										<div className={styles.setVip}>是否会员</div>
// 										<div className={styles.setChecbox}>
// 											<div key={index}>
// 												<div className={sty1} onClick={() => selectYesVIP(index)}></div>
// 												<p className={styles.check_label}>是</p>
// 												<div className={sty2} onClick={() => selectNoVIP(index)}></div>
// 												<p className={styles.check_label}>否</p>
// 											</div>

// 										</div>
// 									</div>
// 									:
// 									<div className={styles.setLine}></div>
// 							}
// 						</WingBlank>
// 					</div>
// 				})
// 			}
// 			<div className={styles.js_confirm_bottom_div} onClick={() => submitFunction()}>提交报名</div>
// 		</div>
// 	);
// }
