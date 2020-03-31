import React from 'react';
import styles from './cancelParticipateComponent.less';
import {WingBlank, WhiteSpace, TextareaItem, List, Checkbox} from 'antd-mobile';
import {createForm } from 'rc-form';

const CheckboxItem = Checkbox.CheckboxItem;

function MicroCancelParticipateComponent({

	dp,
	data,
	selectRows,
	cancelParticipateFunction,
	form : {
		getFieldProps,
		getFieldsValue,
		resetFields,
	}
	
}) {	
	
	function onChange (val) {
		
		for(let idx in data) {
			if(idx == val) {
				data[idx].isbool == undefined ? (data[idx].isbool = true) : (data[idx].isbool = undefined);
			}
		}
		
		dp('updateState', {selectRows : data});	
	}

	return(
		<div className="js_micro_cancel_participate">
			<WingBlank>
				<p className={styles.js_title}>取消报名原因（至少选择一项）</p>
			</WingBlank>
			<div className={styles.js_content_div}>
				<WingBlank>
					{data&&data.length>0&&data.map(i => (
					  <CheckboxItem key={i.value} onChange={() => onChange(i.value)}>
						{i.label}
					  </CheckboxItem>
					))}
				</WingBlank>
			</div>
			<div>
				<List renderHeader={() => '其他原因'}>
					<TextareaItem
						{...getFieldProps('why', {
							
						})}
						placeholder="请输入其他原因"
						rows={5}
						count={100}
				  	/>
				</List>
			</div>
			<div className={styles.js_bottom} style={{top : h - 98}} onClick={() => cancelParticipateFunction(getFieldsValue())}>取消报名</div>
		</div>
    );
}

export default createForm()(MicroCancelParticipateComponent);



