import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroMotherDayPage1Component from '../../../components/weixin/microActivity2017MotherDay/microMotherDayPage1';
import MicroMotherDayPage2Component from '../../../components/weixin/microActivity2017MotherDay/microMotherDayPage2';
import MicroMotherDayPage3Component from '../../../components/weixin/microActivity2017MotherDay/microMotherDayPage3';
import MicroMotherDayPage4Component from '../../../components/weixin/microActivity2017MotherDay/microMotherDayPage4';
import MicroMotherDayPage5Component from '../../../components/weixin/microActivity2017MotherDay/microMotherDayPage5';


function MicroMotherDayPage({location, dispatch, microMotherDay}) {

    let {
		nIndex,
		mainData,
		playClassName,
		detailDataSource,
		initWindowHeight,
    } = microMotherDay;

	function dp(name, paramter) {
		dispatch({
			type: `microMotherDay/${name}`,
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
				obj.type == 'Page1Component' ? <MicroMotherDayPage1Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page2Component' ? <MicroMotherDayPage2Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page4Component' ? <MicroMotherDayPage3Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page5Component' ? <MicroMotherDayPage4Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page6Component' ? <MicroMotherDayPage5Component key={index} index={index} {...pageProps} data={obj} /> : ''
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

MicroMotherDayPage.propTypes = {
    microMotherDay: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ microMotherDay }) {
    return { microMotherDay };
}

export default connect(mapStateToProps)(MicroMotherDayPage);
