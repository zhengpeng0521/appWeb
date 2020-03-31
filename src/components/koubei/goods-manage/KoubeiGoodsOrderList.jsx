import React, { PropTypes } from 'react';
import { ListView, ActivityIndicator,Popup, } from 'antd-mobile';
import KoubeiGoodsOrgSelectComponent from './KoubeiGoodsOrgSelectComponent';
import style from './less/KoubeiGoodsOrder.less';

function KoubeiGoodsOrderList({
    goodsListLoading,
    koubeiOrgList,
    koubeiGoodsOrderList,
    readMoreOrderList,
    has_more_order,
    fieltOrgId,fieltOrgName,
    fieltOrderByOrg,
}) {

    //关闭pop弹出框
    function closePop() {
        Popup.hide();
    }

    //门店选择变更
    function changeGoodsOrg(selectedOrg, selectedOrgNames) {
        closePop();
        let fieltOrgId = '';
        let fieltOrgName = '全部门店';
        if(selectedOrg && selectedOrg.length > 0) {
            fieltOrgId = selectedOrg[0];
            fieltOrgName = selectedOrgNames[0];
        }
        fieltOrderByOrg(fieltOrgId, fieltOrgName);
    }

    //选择全部门店时
    function selectAllOrg() {
        closePop();
        fieltOrderByOrg('', '全部门店');
    }

    //弹出适用门店选择框
    function popGoodsOrg() {
        let goodsOrgProps = {
            koubeiOrgList,selectedOrg: [fieltOrgId],selectedOrgNames: [fieltOrgName],
            changeGoodsOrg,closePop,selectAllOrg,
        }

        Popup.show(
            <KoubeiGoodsOrgSelectComponent {...goodsOrgProps} maxSelectCount={1}/>,
        { animationType: 'slide-down', maskClosable: true }
        );
    }

    function renderHeader() {
        return (
            <div className={style.org_select_key} onClick={popGoodsOrg}>
                {fieltOrgName||'全部门店'}
            </div>);
    }

    function renderFooter() {
        return (
            <div>
                {koubeiGoodsOrderList && koubeiGoodsOrderList.length > 0 ?
                    <div className={style.list_foot}></div>
                :
                    <KoubeiGoodsListTabPanel_Empty />
                }
            </div>
        );
    }

    function onEndReached() {
        if(!goodsListLoading && has_more_order) {
            readMoreOrderList();
        }
    }

    function renderRow(rowData, sectionID, rowID) {

        let row_data_item = rowData[rowID];

        let shopStr = row_data_item.shop;
        let shopName = '未知的门店';
        if(shopStr && shopStr.length > 0) {
            let shopObj = JSON.parse(shopStr);
            shopName = shopObj && shopObj.shop_name;
        }

        let order_status = row_data_item.status == 'UNPAY' ? '待支付' :
                           row_data_item.status == 'PAY' ? '已支付' :
                           row_data_item.status == 'FINISH' ? '已完成 ' :
                           row_data_item.status == 'SETTLE' ? '已核销' :
                           row_data_item.status == 'REFUND' ? '已退款' : '无效的状态';

        return (
            <div key={'list_separator_' + sectionID + '_' + rowID} className={style.koubei_order_list_row_cont}>
                <div className={style.row_item_top}>
                    <span className={style.row_item_outBizNo}>{row_data_item.outBizNo}</span>
                    <span className={style.row_item_status}>{order_status}</span>
                </div>

                {row_data_item.goodsDetail && row_data_item.goodsDetail.map(function(goodsDetailItem) {

                    let cover = goodsDetailItem.cover;
                    let goodsDetailImgUrl = 'http://115.29.172.104/gimg/img/e937c0427f01dd660a8b4909b728616f';
                    if(cover && cover.length > 0) {
                        let coverObj = JSON.parse(cover);
                        goodsDetailImgUrl = coverObj && coverObj.imgurl;
                    }
                    return (
                        <div className={style.row_item_desc} key={'row_item_desc_' + goodsDetailItem.out_item_id}>
                            <div className={style.row_item_desc_img}
                                style={{background: `url(${goodsDetailImgUrl}) 0% 0% / cover no-repeat`}}></div>
                            <div className={style.row_item_desc_cont}>
                                <div className={style.desc_cont_top}>
                                    <div className={style.desc_title}>
                                        {goodsDetailItem.subject}
                                    </div>
                                    <div className={style.desc_price}>
                                        ￥{goodsDetailItem.price}
                                    </div>
                                </div>

                                <div className={style.desc_org}>
                                    <div className={style.desc_org_name}>
                                        {shopName}
                                    </div>
                                    <div className={style.desc_count}>
                                        X{goodsDetailItem.sellNum || 0}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className={style.row_item_all}>
                    <div className={style.row_item_time}>{row_data_item.createTime}</div>
                    <div className={style.row_item_all_price}>
                        订单总价:
                        <span className={style.row_item_all_price_num}>￥{row_data_item.realAmount}</span>
                    </div>
                </div>
            </div>
        );
    }

    function renderSeparator(sectionID, rowID) {
        return (
            <div key={'list_separator_' + sectionID + '_' + rowID} className={style.list_separator}></div>
        );
    }

    let koubeiOrderDataSource = new ListView.DataSource({
      getRowData: (dataBlob, sectionID) => {
          return dataBlob[sectionID];
      },
      getSectionHeaderData: (dataBlob, sectionID, rowID) => {
          return dataBlob[rowID];
      },
      rowHasChanged: (row1, row2) => {
          return row1 !== row2;
      },
      sectionHeaderHasChanged: (s1, s2) => {
          return s1 !== s2;
      },
    });

    return (
        <div className="koubei_goods_order_list_cont">
           {!!goodsListLoading && <ActivityIndicator toast /> }
            <ListView
                dataSource={koubeiOrderDataSource.cloneWithRows(koubeiGoodsOrderList)}
                renderHeader={renderHeader}
                renderFooter={renderFooter}
                renderRow={renderRow}
                renderSeparator={renderSeparator}
                pageSize={10}
                onEndReached={onEndReached}
                style={{
                  height: document.body.clientHeight,
                  overflow: 'auto',
                  border: '1px solid #ddd',
                  margin: '0.1rem 0',
                }}
                onEndReachedThreshold={5}
            />
        </div>
    );
}

function KoubeiGoodsListTabPanel_Empty() {
    return (
        <div className={style.goods_list_empty}>
            这里没有数据
        </div>
    );
}

export default KoubeiGoodsOrderList;
