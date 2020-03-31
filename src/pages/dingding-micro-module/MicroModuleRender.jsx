import React, {PropTypes} from 'react';
import MicroModuleRenderComponent from '../../components/dingding-micro-module/MicroModuleRenderComponent';
import {getActivityAPI, getPayVoucher,} from '../../services/dingding/microActivityService';
import {Toast} from 'antd-mobile';
import {swiperTypeParse} from './swiperUtil';
import {objListSort} from '../../utils/arrayUtils.js';

/**
 * 自定义微活动的H5渲染
 */
class MicroModuleRender extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tenantId: '',                       //租户编号
            org_id: '',                          //机构编号
            activityId: '',                       //模板编号
            activityDataId: '',                   //模板实例编号
            moduleCode: '',                        // 模板的编码

            moduleMainData: {},                 //模板的主配置
            modulePagesData: [],                //模板的页面配置
            pageType: '',                       //模板的分页类型  many  多页 one 单页

            currentPageIndex: 0,                //当前显示的页

            moduleMusicPlayState: true,         //模板的背景音乐是否播放
            
            payInfos: [],						//支付凭证列表
            payInfosVisible: false,       		//支付凭证列表是否显示
            
            adMoskVisible: false, //蒙层广告是否显示
        };

        this.onSlideChangeEnd = this.onSlideChangeEnd.bind(this);
        this.changeModuleMusicState = this.changeModuleMusicState.bind(this);
        this.changePayInfosVisible = this.changePayInfosVisible.bind(this);
        this.swiperSliderMove = this.swiperSliderMove.bind(this);
        this.closeAdMosk = this.closeAdMosk.bind(this);
    }

    componentDidMount() {

        let req_search = window.location.search;

        //解析请求参数  获取模板实例相关数据
        let params = {};
        let req_search_arr = req_search.split('?');
        if(req_search_arr && req_search_arr.length == 2) {
            let req_params_str = req_search_arr[1];
            if(req_params_str && req_params_str.length > 0) {
                let req_params_arr = req_params_str.split('&');

                req_params_arr && req_params_arr.length > 0 && req_params_arr.map(function(item, index) {
                    let arr = item.split('=');
                    if(arr && arr.length == 2) {
                        params[arr[0]] = arr[1];
                    }
                });
            }
        }

        let me = this;

        window._init_data = {
            ...window._init_data,
            ...params,
        };

        getActivityAPI(params).then(result => {
            let ret = result && result.ret;

            if(ret && ret.errorCode == 9000) {
                let moduleData = ret && ret.data && ret.data.activityData;
                let moduleMainDataStr = moduleData && moduleData.mainData;
                let modulePagesDataStr = moduleData && moduleData.detailData;

                let moduleMainData = {}, modulePagesData = [];
                if(moduleMainDataStr && moduleMainDataStr.length > 0) {
                    moduleMainData = JSON.parse(moduleMainDataStr);
                }
                if(modulePagesDataStr && modulePagesDataStr.length > 0) {
                    modulePagesData = JSON.parse(modulePagesDataStr);
                }

                params.moduleMainData = moduleMainData;
                params.modulePagesData = objListSort(modulePagesData, 'seq_no');

                document.title = (moduleData && moduleData.name) || '闪闪微活动';

                //页面类型
                let pageType = (moduleMainData && moduleMainData.page_type) || '';
                let switchType = (moduleMainData && moduleMainData.switch_type) || '';//多页时页面切换效果
                let switchDir = (moduleMainData && moduleMainData.switch_dir) || 'vertical';//多页时页面切换方向

                me.setState({
                    ...params,
                    pageType,
                });

                window._init_data.activityId = params.activityId;
                window._init_data.activityDataId = params.activityDataId;

                if(pageType == 'many') {
                	
                	let swiperHandle = {
                		onSliderMove: (swiper, event)=> {
                			
                			let swiper_event_touch = event && event.changedTouches && event.changedTouches.length > 0 && event.changedTouches[0];
                			let swiper_event_screenX = swiper_event_touch.screenX;
                			let swiper_event_screenY = swiper_event_touch.screenY;
                			
                			let touch_dir = '';
                			if(switchDir == 'vertical') {
                				
                				if(window.swiper_event_screenY != undefined) {
                					touch_dir = swiper_event_screenY > window.swiper_event_screenY ? 'prev' : 'next';
                				}
                				window.swiper_event_screenY = swiper_event_screenY;
                			} else {
                				if(window.swiper_event_screenX != undefined) {
                					touch_dir = swiper_event_screenX > window.swiper_event_screenX ? 'prev' : 'next';
                				}
                				window.swiper_event_screenX = swiper_event_screenX;
                			}
                			me.swiperSliderMove(swiper, touch_dir);
                		},
                		
                		onTouchEnd: ()=> {
                			window.swiper_event_screenX = undefined;
                			window.swiper_event_screenY = undefined;
                		},
                	};
                	
                    window._init_data.pageSwiper = swiperTypeParse(switchType, switchDir, swiperHandle);
                }

                let module_props = (moduleMainData && moduleMainData.props) || {};
                let share_props = module_props.share || {};

                weixinSign({
                    share_title: share_props.title || '',
                    share_desc: share_props.intro || '',
                    share_link: String(window.document.location.href),
                    share_imgUrl: share_props.img_url || '',
                    share_id: moduleMainData.id || '',
                });

                wx.ready(function() {
                    let u = navigator.userAgent;
                    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

                    if(isiOS) {
                        //音乐默认播放
                        let module_musci_audio = document.getElementById('module_musci_audio');
                        if(module_musci_audio !== null) {
                            try{
                                module_musci_audio.play();
                            } catch(e) {
                            }
                        }
                    }

                });

                //广告维护
                let moduleCode = params.moduleCode || '';
                let activityDataId = params.activityDataId || '';
                let tenantId = params.tenantId || '';
                let org_id = params.org_id || '';
				
				createH5Ad && createH5Ad('module', moduleCode, activityDataId, tenantId, org_id);
            } else {
                Toast.fail((ret && ret.errorMessage) || '微模板不存在或者已经被删除', 0);
            }
        });
        
        let activityDataId = params && params.activityDataId;
        let openId = window._init_data && window._init_data.openid;
        if(activityDataId && activityDataId != undefined) {
        	let payVoucherPrams = {
        		dataId: activityDataId,
        		openId,
        	};
        	
	        //查询支付凭证
//	        getPayVoucher(payVoucherPrams).then(result => {
//	            let ret = result && result.ret;
//	            me.setState({
//                  payInfos: ret.results,
//              });
//	       });
        }

    }
    
    swiperSliderMove(swiper, touch_dir) {
    	
    	let maxIndex = swiper.slides.length - 1;
    	if(this.state.currentPageIndex == maxIndex && touch_dir == 'next') {
    		this.setState({
    			adMoskVisible: true  //显示蒙层广告
    		});
    	}
    }

    onSlideChangeEnd() {
        let pageSwiper = window._init_data.pageSwiper;

		this.setState({
            currentPageIndex: pageSwiper.activeIndex
        });
    }

    changeModuleMusicState(moduleMusicPlayState) {
        this.setState({
            moduleMusicPlayState
        });
    }
    
    changePayInfosVisible() {
    	this.setState({
            payInfosVisible: !this.state.payInfosVisible
        });
    }
    
    closeAdMosk() {
    	this.setState({
    		adMoskVisible: false
    	});
    }

    render() {

        let {tenantId,org_id, activityId, activityDataId, moduleMainData, modulePagesData,
        	currentPageIndex,moduleMusicPlayState, pageType,
        	payInfos, payInfosVisible,
        	adMoskVisible,
        }  = this.state;

        let module_props = (moduleMainData && moduleMainData.props) || {};
        let music_props = module_props.music || {};


        let componentProps = {
            modulePagesData,//模板页面的配置项
            currentPageIndex, pageType, adMoskVisible, closeAdMosk: this.closeAdMosk,
            onSlideChangeEnd: this.onSlideChangeEnd,
            payInfos, payInfosVisible, changePayInfosVisible: this.changePayInfosVisible,
            moduleMusic: music_props,moduleMusicPlayState,changeModuleMusicState: this.changeModuleMusicState,
        };

        return (
            <MicroModuleRenderComponent {...componentProps}/>
        );
    }
}

export default MicroModuleRender;
