import React, { PropTypes } from 'react';
import { TabBar,Modal, } from 'antd-mobile';
import KoubeiGoodsManageComponent from '../../../components/koubei/goods-manage/KoubeiGoodsManageComponent';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

function KoubeiGoodsManage({ dispatch, koubeiGoodsManage }) {

    let { tenantId,token,merchantPid,
        goodsType, activityGoodsStatus,goodsListLoading,
        goodsListEffective,
        goodsListPause,
        goodsListInvalid,
        pageIndex, pageSize,
         warn_msg_visible,

         koubeiOrgList,
         koubeiGoodsOrderList,
         order_pageIndex,
         order_pageSize,
         has_more_order,
         fieltOrgId,
         fieltOrgName,

         settleStatus,
         koubeiGoodsSettleList,
         settle_pageIndex,
         settle_pageSize,
         has_more_settle,
    } = koubeiGoodsManage;

    function onGoodsTypeChange(goodsType) {

        if('koubei_order' == goodsType) {
            dispatch({
                type: 'koubeiGoodsManage/queryGoodsOrder',
                payload : {
                    order_pageIndex: 0,
                    order_pageSize: 10,
                }
            });
        } else if('koubei_settle' == goodsType) {
            dispatch({
                type: 'koubeiGoodsManage/queryGoodsSettle',
                payload : {
                    settle_pageIndex: 0,
                    settle_pageSize: 10,
                }
            });
        } else {
            dispatch({
                type: 'koubeiGoodsManage/queryGoods',
                payload : {
                    goodsType,
                    activityGoodsStatus : 'effective'
                }
            });
        }
    }

    //切换商品的显示状态
    function onStatusChange(activityGoodsStatus) {
        dispatch({
        	type: 'koubeiGoodsManage/queryGoods',
            payload : {
                activityGoodsStatus
            }
        });
    }

    //商品点击新增按钮
    function onGoodsAdd() {
        dispatch(routerRedux.push({
            pathname: 'goodsForm',
            query: {
                tenantId,
				merchantPid,
                token,
                goodsType,
            }
        }));
    }

    //加载更多
    function loadMore() {
        dispatch({
        	type: 'koubeiGoodsManage/queryGoods',
            payload: {
                pageSize: pageSize+10,
            }
        });
    }

    //点击商品编辑
    function onGoodsEdit(goodsData) {
        dispatch(routerRedux.push({
            pathname: 'goodsForm',
            query: {
                tenantId,
				merchantPid,
                token,
                goodsType,
                goodsId: goodsData.id,
            }
        }));
    }

    //点击商品分享
    function onGoodsShare(goodsData) {
        dispatch({
        	type: 'koubeiGoodsManage/updateState',
            payload: {
                warn_msg_visible: !warn_msg_visible,
            }
        });
    }

    //点击商品上架
    function onGoodsEffective(goodsData) {
        dispatch({
        	type: 'koubeiGoodsManage/changeGoodsStatus',
            payload: {
                tenantId,
				merchantPid,
                goodsType: goodsType == 'koubei_course' ? '1' : goodsType == 'koubei_activity' ? '2' : '',
                goodsId: goodsData.id,
                status: 'EFFECTIVE',
                statusText: '上架',
            }
        });
    }

    //点击商品下架
    function onGoodsPause(goodsData) {
        dispatch({
        	type: 'koubeiGoodsManage/changeGoodsStatus',
            payload: {
                tenantId,
				merchantPid,
                goodsType: goodsType == 'koubei_course' ? '1' : goodsType == 'koubei_activity' ? '2' : '',
                goodsId: goodsData.id,
                status: 'PAUSE',
                statusText: '下架',
            }
        });
    }

    //点击商品删除
    function onGoodsDelete(goodsData) {
        dispatch({
        	type: 'koubeiGoodsManage/changeGoodsStatus',
            payload: {
                tenantId,
				merchantPid,
                goodsType: goodsType == 'koubei_course' ? '1' : goodsType == 'koubei_activity' ? '2' : '',
                goodsId: goodsData.id,
                status: 'INVALID',
                statusText: '删除',
            }
        });
    }

    function readMoreOrderList() {
        if(!goodsListLoading) {
            dispatch({
                type: 'koubeiGoodsManage/queryGoodsOrder',
                payload : {
                    order_pageSize: order_pageSize + 5,
                }
            });
        }
    }

    //根据门店过滤订单
    function fieltOrderByOrg(fieltOrgId,fieltOrgName) {
        dispatch({
            type: 'koubeiGoodsManage/queryGoodsOrder',
            payload : {
                fieltOrgId,fieltOrgName,
            }
        });
    }

    function readMoreSettleList() {
        if(!goodsListLoading) {
            dispatch({
                type: 'koubeiGoodsManage/queryGoodsSettle',
                payload : {
                    settle_pageSize: settle_pageSize + 5,
                }
            });
        }
    }

    //根据门店过滤核销
    function fieltSettleByOrg(fieltOrgId,fieltOrgName) {
        dispatch({
            type: 'koubeiGoodsManage/queryGoodsSettle',
            payload : {
                fieltOrgId,fieltOrgName,
            }
        });
    }

    //切换核销管理显示的状态
    function settleStateChange(settleStatus) {
        dispatch({
            type: 'koubeiGoodsManage/queryGoodsSettle',
            payload : {
                settleStatus,
            }
        });
    }

    let manageProps = {
        goodsType,activityGoodsStatus,goodsListLoading,pageIndex, pageSize,
        goodsListEffective,
        goodsListPause,
        goodsListInvalid,
        onGoodsTypeChange,onStatusChange,onGoodsAdd,loadMore,
        onGoodsEdit,
        onGoodsShare,
        onGoodsEffective,
        onGoodsPause,
        onGoodsDelete,
        koubeiOrgList,
        koubeiGoodsOrderList,
        readMoreOrderList,
        has_more_order,
        fieltOrgId,fieltOrgName,fieltOrderByOrg,
        koubeiGoodsSettleList,
         settle_pageIndex,
         settle_pageSize,
         has_more_settle,
        readMoreSettleList,fieltSettleByOrg,settleStatus,settleStateChange,
    };

    return (
        <div>
            <KoubeiGoodsManageComponent {...manageProps} />
            <Modal
                title="移动端暂不支持分享功能"
                closable
                maskClosable
                transparent
                style={{width: '500px'}}
                onClose={onGoodsShare}
                visible={warn_msg_visible}
              >
                请用电脑登陆网址: saas.ishanshan.com<br />
                分享商品获得免费生源<br />
              </Modal>
        </div>
    );
}

KoubeiGoodsManage.propTypes = {
  koubeiGoodsManage: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ koubeiGoodsManage }) {
  return { koubeiGoodsManage };
}

export default connect(mapStateToProps)(KoubeiGoodsManage);
