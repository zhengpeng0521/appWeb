import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import ShareHeadComponent from '../../../components/checkstand/share/ShareHeadComponent';
import WeixinShareComponent from '../../../components/checkstand/share/h5-alert/WeixinShareComponent';

function ShareHeadPage({ dispatch,ShareHeadModel }) {
    let {
        modalLoading,
        orgChoose,
        weixinModelVisible,
        errorCode,
        orgListSource,
        baseUrl,
    } = ShareHeadModel;

    function shareLinkFunc(){
        dispatch(routerRedux.push({
            pathname: 'ShareMobilePage',
            query:{ }
        }))
    }

    function radioChange(value){
        dispatch({
            type:'ShareHeadModel/queryMchInfoByOpenId',
            payload:{
                orgChoose : value,
            }
        });
        dispatch({
            type:'ShareHeadModel/updateState',
            payload:{
                orgChoose : value,
            }
        });
    }

    /*打开model*/
    function sendInviteFunc(){
        if(orgChoose){
             dispatch({
                type:'ShareHeadModel/updateState',
                payload:{
                    weixinModelVisible : true,
                }
            })
            window.shareParams = {
                share_title: "我帮你抢到免费台卡+工牌套装，快来领取吧",
                share_desc:"名额有限，先到先得",
                share_link: `${window.init_data}/thinknode/checkstand/h5/checkstandH5/index/AcceptInvitePage?sourceOpenId=`+window._init_data.openId+`&sourceMchId=`+orgChoose,
                share_imgUrl: "https://img.ishanshan.com/gimg/img/64e5e321f938dc062134dd5b77960fcc",
                after_share: "",
           };
           weixinSign_1(shareParams);
           closeformal&&closeformal();
        }else{
            Toast.info("请选择机构");
        }
    }
    /*关闭model*/
    function onClose(){
        dispatch({
            type:'ShareHeadModel/updateState',
            payload:{
                weixinModelVisible : false,
            }
        });
        openformal&&openformal();
    }

    let ShareHeadProps = {
        shareLinkFunc,
        radioChange,
        orgChoose,
        sendInviteFunc,
        errorCode,
        orgListSource,
    };

    let WeixinShareProps = {
        weixinModelVisible,
        onClose,
    }


    return (
        <div>
            <ShareHeadComponent {...ShareHeadProps} />
            {
                weixinModelVisible ?
                <WeixinShareComponent {...WeixinShareProps}/>
                :
                null
            }

        </div>

    );
}

ShareHeadPage.propTypes = {
  ShareHeadModel: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ ShareHeadModel }) {
  return { ShareHeadModel };
}

export default connect(mapStateToProps)(ShareHeadPage);
