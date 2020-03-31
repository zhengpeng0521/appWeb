import React from 'react';
import styles from './AppFlowComponent.less';
import { ActivityIndicator,Tabs,Picker,List} from 'antd-mobile';
import {createForm} from 'rc-form';

const TabPane = Tabs.TabPane;

function AppFlowComponent({
	 form: {
    	getFieldProps,
        validateFields,
        getFieldsValue,
        getFieldValue,
        getFieldError,
        setFieldsValue,
        setFields,
        resetFields,
    },
    radioChange,
    settleChange,
    date,
    settleDate,
    toTradeDetail,
    callback,
    tab,

}) {
    let dateSource = [
        {
            value : '01',
            label : '今日',
        },{
            value : '02',
            label : '昨日',
        },{
            value : '03',
            label : '近7日',
        },{
            value : '04',
            label : '近30日',
        },
    ]

    let settleSource = [
        {
            value : '03',
            label : '近7日',
        },{
            value : '04',
            label : '近30日',
        },
    ]

    /*
 	 * 单选按钮切换
 	 */
 	function radioChangeFunction(value){
        if(value && value.length>0){
            let data=value[0];
            radioChange(data);
        }
     }

    function settleFunction(){
        if(value && value.length>0){
            let data=value[0];
            settleChange(data);
        }
    }

    return(
        <div className={styles.flow_all}>
            <div className={styles.head_all}>
                <div style={{position:'relative'}}>
                    <Picker
                        {...getFieldProps('date', {
                            initialValue : [date],
                            rules: [
                                { required: true, },
                            ],
                        })}
                        extra="请选择"
                        data = {dateSource}
                        cols={1}
                        onPickerChange ={radioChangeFunction}
                    >
                        <List.Item arrow="horizontal"></List.Item>
                    </Picker>
                    <div className={styles.detail}>
                        <div className={styles.income}>
                            <div className={styles.total}>￥<span>125,620</span></div>
                            <div className={styles.content}>收入金额</div>
                        </div>
                        <div className={styles.tradeNum}>
                            <div className={styles.totals}>12</div>
                            <div className={styles.content}>交易笔数</div>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs defaultActiveKey='0' size="small" onChange={callback}>
                <TabPane tab="交易明细" key='0'>
                    <div className={styles.trade}>
                        <div className={styles.trade_cont} onClick={()=>toTradeDetail()}>
                            <div className={styles.headImg}>
                                <img src="https://img.ishanshan.com/gimg/img/702fb7f8fbf1b4835c6ccef6f737cfb6"/>
                            </div>
                            <div className={styles.trade_info}>
                                <div className={styles.trade_detail}>
                                    <div className={styles.trade_tip}>交易成功</div>
                                    <div className={styles.trade_time}>2018/12/1 16:00</div>
                                </div>
                                <div className={styles.money}>￥<span>1211.00</span></div>
                            </div>
                        </div>
                        <div className={styles.trade_cont}>
                            <div className={styles.headImg}>
                                <img src="https://img.ishanshan.com/gimg/img/702fb7f8fbf1b4835c6ccef6f737cfb6"/>
                            </div>
                            <div className={styles.trade_info}>
                                <div className={styles.trade_detail}>
                                    <div className={styles.trade_tip}>交易成功</div>
                                    <div className={styles.trade_time}>2018/12/1 16:00</div>
                                </div>
                                <div className={styles.money}>￥<span>1211.00</span></div>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="结算明细" key='1'>
                    <div className={styles.trade}>
                        <div className={styles.trade_cont} onClick={()=>toTradeDetail()}>
                            <div className={styles.headImg}>
                                <img src="https://img.ishanshan.com/gimg/img/6b3d3a76b0ff753a5aeb717bbbfff96e"/>
                            </div>
                            <div className={styles.trade_info}>
                                <div className={styles.trade_detail}>
                                    <div className={styles.trade_tip}>交易成功</div>
                                    <div className={styles.trade_time}>2018/12/1</div>
                                </div>
                                <div style={{float:'right'}}>
                                    <div className={styles.money}>￥<span>100011.00</span></div>
                                    <div className={styles.num}><span>12</span>笔</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.trade_cont}>
                            <div className={styles.headImg}>
                                <img src="https://img.ishanshan.com/gimg/img/6b3d3a76b0ff753a5aeb717bbbfff96e"/>
                            </div>
                            <div className={styles.trade_info}>
                                <div className={styles.trade_detail}>
                                    <div className={styles.trade_tip}>交易成功</div>
                                    <div className={styles.trade_time}>2018/12/1</div>
                                </div>
                                <div style={{float:'right'}}>
                                    <div className={styles.money}>￥<span>100011.00</span></div>
                                    <div className={styles.num}><span>12</span>笔</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default createForm()(AppFlowComponent);
