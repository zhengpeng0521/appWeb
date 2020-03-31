import React, { PropTypes } from 'react';
import {Button, List, Checkbox,} from 'antd-mobile';
import style from './PopSelect.less';
const CheckboxItem = Checkbox.CheckboxItem;

/**
 * pop弹出的选中框
 * dataSource:          Array[{value,name}]     数据源               必填
 * data:                Array[value]            选中的对象            必填
 * title:               string                  pop弹出框的标题       必填
 * multiple:            boolean                 是否多选              可选
 * onConfirm:           function                点击确认时回调         必填
 * onCancle:            function                点击取消时回调         必填
 */
const PopSelectComponent = React.createClass({
    getInitialState() {
        return {
            dataSource: this.props.dataSource,
            data: this.props.data || [],
        };
    },

    changeValue(item,e) {
        let data = this.state.data || [];
        let handleType = e.target.checked;//操作类型  true 选中  false 取消选中
        let multiple = this.props.multiple == undefined ? true : this.props.multiple;

        if(!multiple) {
            let new_data = [];
            new_data.push(item.value);
            data = new_data;
        } else {
            if(handleType) {
                data.push(item.value);
            } else {
                let new_data = [];
                data && data.length > 0 && data.map(function(data_item) {
                    if(data_item != item.value) {
                        new_data.push(data_item);
                    }
                });
                data = new_data;
            }
        }

        this.setState({
            data
        });
    },

    render() {
        let {dataSource, data} = this.state;
        return (
            <div>
                <List
                   renderHeader={() => (
                        <div className={style.pop_header}>
                            <span className={style.pop_close_btn_cont}>
                                <Button
                                    className={style.pop_close_btn}
                                    inline size="small"
                                    onClick={this.props.onCancle}>取消</Button>
                            </span>
                            <span className={style.pop_title}>{this.props.title}</span>
                            <span className={style.pop_submit_btn_cont}>
                                <Button
                                    className={style.pop_submit_btn}
                                    inline
                                    size="small"
                                    type="primary"
                                    onClick={() => this.props.onConfirm(data)}>确定</Button>
                            </span>

                        </div>
                    )} >
                    <div className={style.pop_cont}>
                       {dataSource.map(item => {
                           let check = false;
                           data && data.length > 0 && data.map(function(dataItem) {
                               if(!check) {
                                   check = dataItem == item.value;
                               }
                           });
                           return (
                              <CheckboxItem key={item.value} checked={check} onChange={(e) => this.changeValue(item,e)}>
                                {item.name}
                              </CheckboxItem>
                            )
                        })}
                    </div>
                </List>
            </div>
        );
    }
});

export default PopSelectComponent;
