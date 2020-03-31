import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroLegoPage1Component from '../../../components/weixin/microActivity2017LegoOne/microLegoOneComponent1';
import MicroLegoPage2Component from '../../../components/weixin/microActivity2017LegoOne/microLegoOneComponent2';
import MicroLegoPage3Component from '../../../components/weixin/microActivity2017LegoOne/microLegoOneComponent3';
import MicroLegoPage4Component from '../../../components/weixin/microActivity2017LegoOne/microLegoOneComponent4';
import MicroLegoPage5Component from '../../../components/weixin/microActivity2017LegoOne/microLegoOneComponent5';

function MicroLegoOnePage({location, dispatch, lego_one}) {

  let {
		nIndex,
		mainData,
		playClassName,
		detailDataSource,
		initWindowHeight,
    } = lego_one;

	function dp(name, paramter) {
		dispatch({
			type: `lego_one/${name}`,
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

    let pageProps                      = {
		dp,
		nIndex,
        mainData,
		initWindowHeight,
	}

    let array = [];
	if(mainData&&mainData.name!= undefined) {
		 document.title = mainData&&mainData.name;
	}

    if(detailDataSource&&detailDataSource.length > 0) {
        detailDataSource.map(function(obj, index) {
        	return array.push(
				obj.type == 'Page1Component' ? <MicroLegoPage1Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page2Component' ? <MicroLegoPage2Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page3Component' ? <MicroLegoPage3Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page4Component' ? <MicroLegoPage4Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page5Component' ? <MicroLegoPage5Component key={index} index={index} {...pageProps} data={obj} /> : ''
			)}
		);
    }

	let onSlideChangeEnd = function(){
		dp('updateState', {nIndex : mySwiper.activeIndex});
    };

	let component = (
			<div className="swiper-container">
				<div className="swiper-wrapper">
					{
						array&&array.map(function(obj,index) {
							return <div key={index} onTouchEnd={onSlideChangeEnd} className="swiper-slide">{obj}</div>
						})
					}
				</div>
			</div>
	)

    return (
		<div className="outside-base-d" >
			{component}
			<div onClick={() => touchMusic()} className={playClassName} id="video_div"></div>
            <audio loop autoPlay height="0" width="0" hidden="true" src={mainData&&mainData.bg_music} id='audio_cp'></audio>
		</div>
    );
}

MicroLegoOnePage.propTypes = {
    lego_one: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ lego_one }) {
    return { lego_one };
}

export default connect(mapStateToProps)(MicroLegoOnePage);
