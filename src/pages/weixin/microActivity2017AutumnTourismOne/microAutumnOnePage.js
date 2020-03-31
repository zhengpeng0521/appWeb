import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroAutumnPage1Component from '../../../components/weixin/microActivity2017AutumnTourismOne/microAutumnOneComponent1';
import MicroAutumnPage2Component from '../../../components/weixin/microActivity2017AutumnTourismOne/microAutumnOneComponent2';
import MicroAutumnPage3Component from '../../../components/weixin/microActivity2017AutumnTourismOne/microAutumnOneComponent3';
import MicroAutumnPage4Component from '../../../components/weixin/microActivity2017AutumnTourismOne/microAutumnOneComponent4';
import MicroAutumnPage5Component from '../../../components/weixin/microActivity2017AutumnTourismOne/microAutumnOneComponent4';
import MicroAutumnPage6Component from '../../../components/weixin/microActivity2017AutumnTourismOne/microAutumnOneComponent6';

function MicroAutumnOnePage({location, dispatch, autumn_one}) {

  let {
		nIndex,
		mainData,
		playClassName,
		detailDataSource,
		initWindowHeight,
    } = autumn_one;

	function dp(name, paramter) {
		dispatch({
			type: `autumn_one/${name}`,
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
				obj.type == 'Page1Component' ? <MicroAutumnPage1Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page2Component' ? <MicroAutumnPage2Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page3Component' ? <MicroAutumnPage3Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page4Component' ? <MicroAutumnPage4Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page5Component' ? <MicroAutumnPage5Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page6Component' ? <MicroAutumnPage6Component key={index} index={index} {...pageProps} data={obj} /> : ''
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

MicroAutumnOnePage.propTypes = {
    autumn_one: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ autumn_one }) {
    return { autumn_one };
}

export default connect(mapStateToProps)(MicroAutumnOnePage);
