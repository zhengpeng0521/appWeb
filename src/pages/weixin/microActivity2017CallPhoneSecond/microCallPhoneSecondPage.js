import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroCallPhoneSecondPage1Component from '../../../components/weixin/microActivity2017CallPhoneSecond/microCallPhoneSecondComponent1';
import MicroCallPhoneSecondPage2Component from '../../../components/weixin/microActivity2017CallPhoneSecond/microCallPhoneSecondComponent2';
import MicroCallPhoneSecondPage3Component from '../../../components/weixin/microActivity2017CallPhoneSecond/microCallPhoneSecondComponent3';
import MicroCallPhoneSecondPage4Component from '../../../components/weixin/microActivity2017CallPhoneSecond/microCallPhoneSecondComponent4';
import MicroCallPhoneSecondPage5Component from '../../../components/weixin/microActivity2017CallPhoneSecond/microCallPhoneSecondComponent5';
import MicroCallPhoneSecondPage6Component from '../../../components/weixin/microActivity2017CallPhoneSecond/microCallPhoneSecondComponent6';
import MicroCallPhoneSecondPage7Component from '../../../components/weixin/microActivity2017CallPhoneSecond/microCallPhoneSecondComponent7';
import MicroCallPhoneSecondPage8Component from '../../../components/weixin/microActivity2017CallPhoneSecond/microCallPhoneSecondComponent8';
import CommonFallingComponent from '../../../components/common/commonComponent/CommonFallingComponent/CommonFallingComponent.js';


function MicroCallPhonePage({location, dispatch, call_phone_second}) {

    let {
		nIndex,
		mainData,
		playClassName,
		detailDataSource,
		initWindowHeight,
		swiperSlideClassName,
    } = call_phone_second;

	function dp(name, paramter) {
		dispatch({
			type: `call_phone_second/${name}`,
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
				obj.type == 'Page1Component' ? <MicroCallPhoneSecondPage1Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page2Component' ? <MicroCallPhoneSecondPage2Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page3Component' ? <MicroCallPhoneSecondPage3Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page4Component' ? <MicroCallPhoneSecondPage4Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page5Component' ? <MicroCallPhoneSecondPage5Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page6Component' ? <MicroCallPhoneSecondPage6Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page7Component' ? <MicroCallPhoneSecondPage7Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page8Component' ? <MicroCallPhoneSecondPage8Component key={index} index={index} {...pageProps} data={obj} /> : ''
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
		number : 5,
		imageArr : [
			"http://img.ishanshan.com/gimg/ori/945c37a9a79312e297729e031d8f660d",
			"http://img.ishanshan.com/gimg/ori/6375b2a2e78d08e400e7af6b93bafe89",
			"http://img.ishanshan.com/gimg/ori/cb136faa95aa0431a92307881d6bc10c",
			"http://img.ishanshan.com/gimg/ori/77e21f9465c7f623362ca3c569d5b936",
			"http://img.ishanshan.com/gimg/ori/ad1eb7dab15ab2488ef0565f1394ab57",
		],
		isCustomNumber : true,
		itemImageStyle : {
			height : '0.3rem',		
			width : '0.3rem',
		}
	}
						
	let misic = '';
				
	if(nIndex != 0) {
		misic = mainData&&mainData.bg_music;
	} else {
		misic = 'http://saas.ishanshan.com/upload/1500621404871.mp3';
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

function mapStateToProps({ call_phone_second }) {
    return { call_phone_second };
}

export default connect(mapStateToProps)(MicroCallPhonePage);
