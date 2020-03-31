import React, { PropTypes } from 'react';
import {List, Button, Checkbox} from 'antd-mobile';
import style from './less/KoubeiGoodsForm.less';
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;

/**
 * 口碑商品门店选择
 */
let KoubeiGoodsOrgSelectComponent = React.createClass({
    getInitialState() {
        return {
            koubeiOrgList: this.props.koubeiOrgList,
            selectedOrg: this.props.selectedOrg || [],
            selectedOrgNames: this.props.selectedOrgNames,
        };
    },

    changeOrgSelectValue(item,e) {
        let selectedOrg = this.state.selectedOrg || [];
        let selectedOrgNames = this.state.selectedOrgNames || [];
        let handleType = e.target.checked;//操作类型  true 选中  false 取消选中
        if(handleType) {
            let maxSelectCount = this.props.maxSelectCount || -1;
            if(maxSelectCount == -1) {
                selectedOrg.push(item.key);
                selectedOrgNames.push(item.label);
            } else {
                let new_selectedOrg = [];
                let new_selectedOrgName = [];
                new_selectedOrg.push(item.key);
                new_selectedOrgName.push(item.label);
                for(let i = 0; i < selectedOrg.length; i++) {
                    if(new_selectedOrg.length < maxSelectCount) {
                        let old_index = selectedOrg.length -1 - i;
                        new_selectedOrg.push(selectedOrg[old_index]);
                        new_selectedOrgName.push(selectedOrgNames[old_index]);
                    } else {
                        break;
                    }
                }
                selectedOrg = new_selectedOrg;
                selectedOrgNames = new_selectedOrgName;
            }

        } else {
            //临时方案，可以选择门店名称时 不能取消选中
            if(this.props.selectedOrgNames == undefined) {
                let new_selectedOrg = [];
                selectedOrg && selectedOrg.length > 0 && selectedOrg.map(function(new_item) {
                    if(new_item != item.key) {
                        new_selectedOrg.push(new_item);
                    }
                });
                selectedOrg = new_selectedOrg;
            }
        }
        this.setState({
            selectedOrg,selectedOrgNames,
        });
    },

    render() {
        let {koubeiOrgList, selectedOrg, selectedOrgNames,} = this.state;
        let me = this;
        return (
            <div>
                <List
                   renderHeader={() => (
                        <div className={style.course_type_select_cont}>
                            <span className={style.pop_close_btn_cont}>
                                <Button
                                    className={style.pop_close_btn}
                                    inline size="small"
                                    onClick={this.props.closePop}>取消</Button>
                            </span>
                            <span className={style.pop_title}>已选择<span style={{color: '#EF5522'}}>{selectedOrg.length}</span>家门店</span>
                            <span className={style.pop_submit_btn_cont}>
                                <Button
                                    className={style.pop_submit_btn}
                                    inline
                                    size="small"
                                    type="primary"
                                    onClick={() => this.props.changeGoodsOrg(selectedOrg, selectedOrgNames)}>确定</Button>
                            </span>

                        </div>
                    )} >
                    {!!me.props.selectAllOrg &&
                        <CheckboxItem
                           key='select_org_all'
                           onChange={() => me.props.selectAllOrg()}>
                            全部门店
                        </CheckboxItem>
                    }
                    <div className={style.pop_cont}>
                       {koubeiOrgList.map((item, index) => {
                            let org_check_items =[];
                            item.children && item.children.length > 0 && item.children.map(function(org_shop_item) {
                                let check = selectedOrg && selectedOrg.indexOf(org_shop_item.key) >= 0;
                                org_check_items.push(
                                    <CheckboxItem
                                       key={org_shop_item.key}
                                       checked={check}
                                       onChange={(e) => me.changeOrgSelectValue(org_shop_item,e)}>
                                        {org_shop_item.label}
                                    </CheckboxItem>
                                );
                            });
                           return (
                            <div className={style.org_select_item} key={'org_select_item_' + index}>
                               <div className={style.org_select_item_city}>{item.label}</div>
                               {org_check_items}
                            </div>
                           );
                        })}
                    </div>
                </List>
            </div>
        );
    }
});

export default KoubeiGoodsOrgSelectComponent;
