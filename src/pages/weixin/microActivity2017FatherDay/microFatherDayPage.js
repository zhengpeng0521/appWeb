import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroFatherDayPage1Component from '../../../components/weixin/microActivity2017FatherDay/microFatherDayPage1';
import MicroFatherDayPage2Component from '../../../components/weixin/microActivity2017FatherDay/microFatherDayPage2';
import MicroFatherDayPage3Component from '../../../components/weixin/microActivity2017FatherDay/microFatherDayPage3';
import MicroFatherDayPage4Component from '../../../components/weixin/microActivity2017FatherDay/microFatherDayPage4';
import MicroFatherDayPage5Component from '../../../components/weixin/microActivity2017FatherDay/microFatherDayPage5';


function MicroFatherDayPage({location, dispatch, microFatherDay}) {

	let {
		nIndex,
		mainData,
		playClassName,
		detailDataSource,
		initWindowHeight,
    } = microFatherDay;

	function dp(name, paramter) {
		dispatch({
			type: `microFatherDay/${name}`,
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
				obj.type == 'Page1Component' ? <MicroFatherDayPage1Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page2Component' ? <MicroFatherDayPage2Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page4Component' ? <MicroFatherDayPage3Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page5Component' ? <MicroFatherDayPage4Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page6Component' ? <MicroFatherDayPage5Component key={index} index={index} {...pageProps} data={obj} /> : ''
			)}
		);
    }

	let onSlideChangeEnd = function(){
        if(mySwiper.activeIndex == mySwiper.previousIndex) {
            return false;
        }
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

MicroFatherDayPage.propTypes = {
    microFatherDay: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ microFatherDay }) {
    return { microFatherDay };
}

export default connect(mapStateToProps)(MicroFatherDayPage);
