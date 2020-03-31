import React from 'react';
import styles from './ReportFormDetailTypeComponent.less';
import { Picker, List, WhiteSpace, WingBlank, Icon, Button, Checkbox, Modal, DatePicker, Radio } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';

function ReportFormDetailTypeComponent({
	selectList,                          //可选报表数据类型

	//方法
	clickToCancelTypeSelect,             //取消选择类型查看数据
	clickToChangeType,                   //点击下拉列表切换 报表类型
}){

	function clickToCancelTypeSelectStop( e ){
		e.stopPropagation();
	}

	return(
		<div className = { styles.report_detail_type_select_wrap } onClick = { clickToCancelTypeSelect } >
			<div className = { styles.report_detail_type_select_box } onClick = { ( e ) => clickToCancelTypeSelectStop( e ) } >
                <div className = { styles.report_detail_type_select_box_inner } onClick = { ( e ) => clickToCancelTypeSelectStop( e ) } >
                    { selectList && selectList.map(function( item, index ){
                        return (
                            <div key = { 'select_report_item_' + item.smallKey } className = { styles.report_detail_type_select_box_item } onClick = { () => clickToChangeType( item ) } >
                                { item.name || '暂无' }
                            </div>
                        )
                    })}
                </div>
                <div className = { styles.report_detail_type_select_box_item_btn } >
                    <div className = { styles.report_detail_type_select_box_item_cancel } onClick = { clickToCancelTypeSelect } >取 消</div>
                </div>
			</div>

		</div>
	)
}

export default ReportFormDetailTypeComponent;
