import React, {PropTypes} from 'react';
import MicroModulePageComponent from './MicroModulePageComponent';
import PayInfosComponent from './PayInfosComponent';
import styles from './MicroModuleRenderComponent.less';
import AdMoskComponent from './AdMoskComponent';

/*
 * 自定义微活动的H5渲染
 */
function MicroModuleRenderComponent({
    modulePagesData,currentPageIndex,pageType,onSlideChangeEnd,moduleMusic,moduleMusicPlayState,changeModuleMusicState,
    payInfos, payInfosVisible, changePayInfosVisible,
    adMoskVisible, closeAdMosk, renderMode
}) {

    let base_width = 750;
    let base_height = 1206;

    if(window._init_data.clientHeight == undefined) {
        window._init_data.clientHeight = document.body.clientHeight;
    }

    if(window._init_data.clientWidth == undefined) {
        window._init_data.clientWidth = document.body.clientWidth;
    }
        
    let x_scale = window._init_data.clientWidth / base_width;
    let y_scale = window._init_data.clientHeight / base_height;
    let x = "0px", y = "0px";    
    switch (renderMode || "fill") {
        case "fill":
            break;
        case "contain":
            var scale = Math.min(x_scale, y_scale)
            x_scale = scale;
            y_scale = scale
            break;
        case "cover":
            var scale = Math.max(x_scale, y_scale)
            if (x_scale == scale) {
                y = (base_height * scale - window._init_data.clientHeight) + "px";
            }else{
                x = (base_width * scale - window._init_data.clientWidth) + "px";
            }
            x_scale = scale;
            y_scale = scale;
            break;        
        default:
            break;
    }    

    let mobile_show_style = {
        width: base_width + 'px',
        height: base_height + 'px',
        transform: 'scale(' + x_scale +', ' + y_scale + ')',
        MsTransform: 'scale(' + x_scale +', ' + y_scale + ')',
        MozTransform: 'scale(' + x_scale +', ' + y_scale + ')',
        WebkitTransform: 'scale(' + x_scale +', ' + y_scale + ')',
        OTransform: 'scale(' + x_scale +', ' + y_scale + ')',
        transformOrigin: `${x} ${y}`,
        MsTransformOrigin: `${x} ${y}`,
        WebkitTransformOrigin: `${x} ${y}`,
        MozTransformOrigin: `${x} ${y}`,
        OTransformOrigin: `${x} ${y}`,
        overflow: 'hidden',
    };
    if(pageType == 'one') {
        mobile_show_style.overflowY = 'auto';
    }

    function touchMusic() {
        let newMusicPlayState = false;
        var module_musci_audio = document.getElementById('module_musci_audio');
        if(module_musci_audio !== null){

            try{
                if(module_musci_audio.paused){
                    module_musci_audio.play();
                    newMusicPlayState = true;
                } else {
                    module_musci_audio.pause();
                    newMusicPlayState = false;
                }
            } catch(e) {
                newMusicPlayState = false;
            }
			changeModuleMusicState && changeModuleMusicState(newMusicPlayState);
        }
	};

    let moduleMusicUrl = (moduleMusic && moduleMusic.url) || '';
    
    let payInfosProps = {
    	payInfos, visible: payInfosVisible, changePayInfosVisible,x_scale,y_scale,
    };

    return (
        <div className={styles.micro_module_cont}>
          {!!(moduleMusicUrl.length > 0) &&
               <div className={styles.module_music_cont}>
                    <div onClick={() => touchMusic()} className={moduleMusicPlayState ? styles.moduleMusicStateClassPlay : styles.moduleMusicStateClassPause}></div>
                    <audio loop autoPlay height="0" width="0" hidden="true" src={moduleMusicUrl} id='module_musci_audio'></audio>
               </div>
               }
          
          <AdMoskComponent visible={adMoskVisible} handleClose={closeAdMosk} />
          
          {!!(payInfos && payInfos.length > 0) && <PayInfosComponent {...payInfosProps} />}
          
           <div style={mobile_show_style}>
           		
                {!!(pageType == 'many') &&
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {modulePagesData && modulePagesData.map(function(pageItem, pageIndex) {
                            return (
                                <div
                                   onTouchEnd={onSlideChangeEnd}
                                   className="swiper-slide"
                                   key={'page_slide_' + pageIndex}>
                                    <MicroModulePageComponent pageType={pageType} pageItem={pageItem} pageIndex={pageIndex} currentPageIndex={currentPageIndex} />
                                </div>
                            )
                        })}
                    </div>
                    <div className="swiper-scrollbar"></div>
                </div>
               }

               {!!(pageType == 'one') &&
                   <div className={styles.one_page_cont}>
                   {modulePagesData && modulePagesData.map(function(pageItem, pageIndex) {
                        return (
                            <MicroModulePageComponent key={'module_page_' + pageIndex} pageType={pageType} pageItem={pageItem} pageIndex={pageIndex} currentPageIndex={currentPageIndex} />
                        )
                    })}
                    </div>
               }
           </div>
        </div>
    );
}

export default MicroModuleRenderComponent;
