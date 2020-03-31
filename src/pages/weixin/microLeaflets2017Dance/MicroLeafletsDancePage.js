import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroLeafletsDance1Component from '../../../components/weixin/microLeaflets2017Dance/MicroLeafletsDancePage1';
import MicroLeafletsDance2Component from '../../../components/weixin/microLeaflets2017Dance/MicroLeafletsDancePage2';
import MicroLeafletsDance3Component from '../../../components/weixin/microLeaflets2017Dance/MicroLeafletsDancePage3';
import MicroLeafletsDance4Component from '../../../components/weixin/microLeaflets2017Dance/MicroLeafletsDancePage4';
import MicroLeafletsDance5Component from '../../../components/weixin/microLeaflets2017Dance/MicroLeafletsDancePage5';
import MicroLeafletsDance6Component from '../../../components/weixin/microLeaflets2017Dance/MicroLeafletsDancePage6';


function MicroDancePage({location, dispatch, dance}) {

    let {
		nIndex,
		mainData,
		playClassName,
		detailDataSource,
		initWindowHeight,
    } = dance;

	function dp(name, paramter) {
		dispatch({
			type: `dance/${name}`,
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
				obj.type == 'Page1Component' ? <MicroLeafletsDance1Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page2Component' ? <MicroLeafletsDance2Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page3Component' ? <MicroLeafletsDance3Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page4Component' ? <MicroLeafletsDance4Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page5Component' ? <MicroLeafletsDance5Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page6Component' ? <MicroLeafletsDance6Component key={index} index={index} {...pageProps} data={obj} /> : ''
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

MicroDancePage.propTypes = {
    dance: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ dance }) {
    return { dance };
}

export default connect(mapStateToProps)(MicroDancePage);
