import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';

import EnglishaPage1Component from '../../../components/weixin/microLeaflets2017English/englishPage1';
import EnglishaPage2Component from '../../../components/weixin/microLeaflets2017English/englishPage2';
import EnglishaPage3Component from '../../../components/weixin/microLeaflets2017English/englishPage3';
import EnglishaPage4Component from '../../../components/weixin/microLeaflets2017English/englishPage4';
import EnglishaPage5Component from '../../../components/weixin/microLeaflets2017English/englishPage5';
import EnglishaPage6Component from '../../../components/weixin/microLeaflets2017English/englishPage6';
import EnglishaPage7Component from '../../../components/weixin/microLeaflets2017English/englishPage7';

function EnglishaPage({location, dispatch, english2017}) {

    let {
		
        nIndex,
		playClassName,
		mainData,
		detailDataSource,
		answer_results,
		swiperSlideClassName,
		showMask,
		initWindowHeight,
		
    } = english2017;

	function dp(name, paramter) {
		dispatch({
			type: `english2017/${name}`,
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

    const onSlideChangeEnd = function(){
//        if(mySwiper.activeIndex == mySwiper.previousIndex) {
//				dp('updateState', {nIndex : mySwiper.activeIndex});
//            return false;
//        }
		dp('updateState', {nIndex : mySwiper.activeIndex});
    };
	
	function nextFunction() {
		mySwiper.slideNext();
		if(mySwiper.activeIndex == mySwiper.previousIndex) {
            return false;
        }
		dp('updateState', {nIndex : mySwiper.activeIndex});
	}

    let pageProps                      = {
		dp,
		showMask,
        mainData,
		nextFunction,
		answer_results,
		detailDataSource,
		swiperSlideClassName,
		initWindowHeight,
	}

    let array = [];
	if(mainData&&mainData.name!= undefined) {
		 document.getElementsByTagName('title')[0].innerHTML = mainData&&mainData.name;
	}

    if(detailDataSource&&detailDataSource.length > 0) {
        detailDataSource.map(function(item, index) {
			return array.push(
				item.type == 'Page1Component'
					? <EnglishaPage1Component key={index} data={item} newIndex={nIndex} index={index} />
					: item.type == 'Page2Component'
					? <EnglishaPage2Component key={index} data={item} newIndex={nIndex} index={index} {...pageProps}/>
					: item.type == 'Page3Component'
					? <EnglishaPage3Component key={index} data={item} newIndex={nIndex} index={index} {...pageProps} />
					: item.type == 'Page4Component'
					? <EnglishaPage4Component key={index} data={item} newIndex={nIndex} index={index} {...pageProps} />
					: item.type == 'Page5Component'
					? <EnglishaPage5Component key={index} data={item} newIndex={nIndex} index={index} {...pageProps} />
					: item.type == 'Page6Component'
					? <EnglishaPage6Component key={index} data={item} newIndex={nIndex} index={index} {...pageProps} />
				
					: <EnglishaPage7Component key={index} data={item} newIndex={nIndex} index={index} {...pageProps} />
			)
		});
    }
		
    return (
        <div className="outside-base-d" >
    		<div className="swiper-container">
                <div className="swiper-wrapper" >
                    {
						array&&array.map(function(item,index) {
							return <div key={index} onTouchEnd={onSlideChangeEnd} className={swiperSlideClassName}>{item}</div>
						})
					}
                </div>
            </div>
            <div onClick={touchMusic} className={playClassName} id="video_div"></div>
            <audio controls loop autoPlay height="0" width="0" hidden="true" src={mainData&&mainData.bg_music} id='audio_cp'></audio>			
			{showMask == true || nIndex == detailDataSource.length - 1  ? '' : <div className="downArrow"></div>}
		</div>
    );
}

EnglishaPage.propTypes = {
    english2017: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ english2017 }) {
    return { english2017 };
}

export default connect(mapStateToProps)(EnglishaPage);
