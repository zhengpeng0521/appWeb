import React, { PropTypes } from 'react';
import { ActivityIndicator } from 'antd-mobile';
import KoubeiGoodsPreviewComponent from '../../../components/koubei/goods-preview/KoubeiGoodsPreviewComponent';
import { connect } from 'dva';

function KoubeiGoodsPreview({ dispatch, koubeiGoodsPreview }) {

    let { loading, goodsData, tenantId, shopId, goodsId, outItemId, maskVisible } = koubeiGoodsPreview;

    function openMask() {
        dispatch({
        	type: 'koubeiGoodsPreview/updateState',
            payload : {
                maskVisible : true
            }
        });
    };

    let props = {goodsData, tenantId, shopId, goodsId, outItemId, maskVisible, openMask};

    return (
        <div>
            {loading ?
            <ActivityIndicator toast color="white" size="large" text="正在加载" />
            :
            <KoubeiGoodsPreviewComponent {...props} />
            }
        </div>
    );
}

KoubeiGoodsPreview.propTypes = {
  koubeiGoodsPreview: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ koubeiGoodsPreview }) {
  return { koubeiGoodsPreview };
}

export default connect(mapStateToProps)(KoubeiGoodsPreview);
