import React from 'react';
import { List , InputItem , SearchBar } from 'antd-mobile';
import { createForm } from 'rc-form';

function MainPage({
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
}) {
    return (
        <div>
            <SearchBar
                placeholder="Search"
                maxLength={8}
                onSubmit={value => alert(value+' onSubmit')}
                onFocus={() => console.log('onFocus')}/>
            <InputItem
                clear
                placeholder='详细到品牌及门店名称(必填)'>
                <span style={{ color:'#333' }}>机构名称</span>
            </InputItem>
        </div>
    );
}

export default createForm()(MainPage);
