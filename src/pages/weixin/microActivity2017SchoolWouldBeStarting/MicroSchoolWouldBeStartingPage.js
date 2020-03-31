import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroSchoolWouldBeStarting1Component from '../../../components/weixin/microActivity2017SchoolWouldBeStarting/MicroSchoolWouldBeStartingPage1';
import MicroSchoolWouldBeStarting2Component from '../../../components/weixin/microActivity2017SchoolWouldBeStarting/MicroSchoolWouldBeStartingPage2';
import MicroSchoolWouldBeStarting3Component from '../../../components/weixin/microActivity2017SchoolWouldBeStarting/MicroSchoolWouldBeStartingPage3';
import MicroSchoolWouldBeStarting4Component from '../../../components/weixin/microActivity2017SchoolWouldBeStarting/MicroSchoolWouldBeStartingPage4';
import MicroSchoolWouldBeStarting5Component from '../../../components/weixin/microActivity2017SchoolWouldBeStarting/MicroSchoolWouldBeStartingPage5';
import MicroSchoolWouldBeStarting6Component from '../../../components/weixin/microActivity2017SchoolWouldBeStarting/MicroSchoolWouldBeStartingPage6';
import MicroSchoolWouldBeStarting7Component from '../../../components/weixin/microActivity2017SchoolWouldBeStarting/MicroSchoolWouldBeStartingPage7';


function MicroSchoolWouldBeStartingPage({location, dispatch, school_would_be_starting}) {

    let {
		nIndex,
		mainData,
		playClassName,
		detailDataSource,
		initWindowHeight,
    } = school_would_be_starting;

	function dp(name, paramter) {
		dispatch({
			type: `school_would_be_starting/${name}`,
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
				obj.type == 'Page1Component' ? <MicroSchoolWouldBeStarting1Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page2Component' ? <MicroSchoolWouldBeStarting2Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page3Component' ? <MicroSchoolWouldBeStarting3Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page4Component' ? <MicroSchoolWouldBeStarting4Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page5Component' ? <MicroSchoolWouldBeStarting5Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page6Component' ? <MicroSchoolWouldBeStarting6Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page7Component' ? <MicroSchoolWouldBeStarting7Component key={index} index={index} {...pageProps} data={obj} /> :''
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

MicroSchoolWouldBeStartingPage.propTypes = {
    school_would_be_starting: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ school_would_be_starting }) {
    return { school_would_be_starting };
}

export default connect(mapStateToProps)(MicroSchoolWouldBeStartingPage);
