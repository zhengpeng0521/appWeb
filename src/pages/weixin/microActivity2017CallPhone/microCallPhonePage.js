import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroCallPhonePage1Component from '../../../components/weixin/microActivity2017CallPhone/microCallPhoneComponent1';
import MicroCallPhonePage2Component from '../../../components/weixin/microActivity2017CallPhone/microCallPhoneComponent2';
import MicroCallPhonePage3Component from '../../../components/weixin/microActivity2017CallPhone/microCallPhoneComponent3';
import MicroCallPhonePage4Component from '../../../components/weixin/microActivity2017CallPhone/microCallPhoneComponent4';
import MicroCallPhonePage5Component from '../../../components/weixin/microActivity2017CallPhone/microCallPhoneComponent5';
import MicroCallPhonePage6Component from '../../../components/weixin/microActivity2017CallPhone/microCallPhoneComponent6';
import MicroCallPhonePage7Component from '../../../components/weixin/microActivity2017CallPhone/microCallPhoneComponent7';
import MicroCallPhonePage8Component from '../../../components/weixin/microActivity2017CallPhone/microCallPhoneComponent8';
import CommonFallingComponent from '../../../components/common/commonComponent/CommonFallingComponent/CommonFallingComponent.js';


function MicroCallPhonePage({location, dispatch, call_phone}) {

    let {
		nIndex,
		mainData,
		playClassName,
		detailDataSource,
		initWindowHeight,
		swiperSlideClassName,
    } = call_phone;

	function dp(name, paramter) {
		dispatch({
			type: `call_phone/${name}`,
			payload: {
				...paramter
			},
		});
	}

    function touchMusic()                {
        var audio = document.getElementById('audio_cp');
        if(audio!==null){
            if(audio.paused){
                audio.play();
            } else {
                audio.pause();
            }
			dp('updateState', {playClassName : playClassName == "startPlayer" ? 'stopPlayer' : 'startPlayer'});
        }
	};

	function nextFunction() {
		mySwiper.slideNext();
		if(mySwiper.activeIndex == mySwiper.previousIndex) {
            return false;
        }
		dp('updateState', {nIndex : mySwiper.activeIndex});
	}

	let onSlideChangeEnd = function(){
		if(mySwiper.activeIndex == 0) {
			dp('updateState', {nIndex : mySwiper.activeIndex, swiperSlideClassName : 'swiper-slide stop-swiping'});
		} else {
			dp('updateState', {nIndex : mySwiper.activeIndex, swiperSlideClassName : 'swiper-slide'})
		}
    }
	
    let pageProps                      = {
		dp,
		nIndex,
        mainData,
		nextFunction,
		initWindowHeight,
		swiperSlideClassName,
	}
		
    let array = [];
	if(mainData&&mainData.name!= undefined) {
		 document.title = mainData&&mainData.name;
	}
	
    if(detailDataSource&&detailDataSource.length > 0) {
        detailDataSource.map(function(obj, index) {
        	return array.push(
				obj.type == 'Page1Component' ? <MicroCallPhonePage1Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page2Component' ? <MicroCallPhonePage2Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page3Component' ? <MicroCallPhonePage3Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page4Component' ? <MicroCallPhonePage4Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page5Component' ? <MicroCallPhonePage5Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page6Component' ? <MicroCallPhonePage6Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page7Component' ? <MicroCallPhonePage7Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page8Component' ? <MicroCallPhonePage8Component key={index} index={index} {...pageProps} data={obj} /> : ''
			)}
		);
    }

	let component = (
			<div className="swiper-container">
				<div className="swiper-wrapper">
					{
						array&&array.map(function(obj,index) {
							return <div key={index} onTouchEnd={onSlideChangeEnd} className={swiperSlideClassName}>{obj}</div>
						})
					}
				</div>
			</div>
	)

	let props = {
		number : 3,
		imageArr : [
			"http://img.ishanshan.com/gimg/ori/c0148c85443fc312c685e06cfc42713e",
			"http://img.ishanshan.com/gimg/ori/89ed4731e52ede48aeaca35ecd40e33f",
			"http://img.ishanshan.com/gimg/ori/de41d51ea36c2b67fbabbcf0f6162991",
			"http://img.ishanshan.com/gimg/ori/a20557926beb8d56be15fb9d8f9530a2",
			"http://img.ishanshan.com/gimg/ori/8a688778b9ec822b0de9242b0a39502b",
		],
		isCustomNumber : false,
	}
						
	let misic = '';
				
	if(nIndex != 0) {
		misic = mainData&&mainData.bg_music;
	} else {
		misic = 'http://saas.ishanshan.com/upload/1500559423124.mp3';
	}
			
    return (
		<div className="outside-base-d" >
			{nIndex != 0 ? <CommonFallingComponent {...props} /> : ''}
			{component}
			<div onClick={() => touchMusic()} className={playClassName} id="video_div"></div>
            <audio loop autoPlay height="0" width="0" hidden="true" src={misic} id='audio_cp'></audio>
		</div>
    );
}

MicroCallPhonePage.propTypes = {
    call_phone: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ call_phone }) {
    return { call_phone };
}

export default connect(mapStateToProps)(MicroCallPhonePage);
