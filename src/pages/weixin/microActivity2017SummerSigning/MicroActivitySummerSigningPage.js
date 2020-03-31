import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroActivitySummerSigningPage1Component from '../../../components/weixin/microActivity2017SummerSigning/MicroActivitySummerSigningPage1';
import MicroActivitySummerSigningPage2Component from '../../../components/weixin/microActivity2017SummerSigning/MicroActivitySummerSigningPage2';
import MicroActivitySummerSigningPage3Component from '../../../components/weixin/microActivity2017SummerSigning/MicroActivitySummerSigningPage3';
import MicroActivitySummerSigningPage4Component from '../../../components/weixin/microActivity2017SummerSigning/MicroActivitySummerSigningPage4';
import MicroActivitySummerSigningPage5Component from '../../../components/weixin/microActivity2017SummerSigning/MicroActivitySummerSigningPage5';
import MicroActivitySummerSigningPage6Component from '../../../components/weixin/microActivity2017SummerSigning/MicroActivitySummerSigningPage6';
import MicroActivitySummerSigningPage7Component from '../../../components/weixin/microActivity2017SummerSigning/MicroActivitySummerSigningPage7';


function MicroSummerSigningPage({location, dispatch, summer_signing}) {

    let {
		nIndex,
		mainData,
		playClassName,
		detailDataSource,
		initWindowHeight,
    } = summer_signing;

	function dp(name, paramter) {
		dispatch({
			type: `summer_signing/${name}`,
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
				obj.type == 'Page1Component' ? <MicroActivitySummerSigningPage1Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page2Component' ? <MicroActivitySummerSigningPage2Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page3Component' ? <MicroActivitySummerSigningPage3Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page4Component' ? <MicroActivitySummerSigningPage4Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page5Component' ? <MicroActivitySummerSigningPage5Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page6Component' ? <MicroActivitySummerSigningPage6Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page7Component' ? <MicroActivitySummerSigningPage7Component key={index} index={index} {...pageProps} data={obj} /> :
				''
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

MicroSummerSigningPage.propTypes = {
    summer_signing: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ summer_signing }) {
    return { summer_signing };
}

export default connect(mapStateToProps)(MicroSummerSigningPage);
