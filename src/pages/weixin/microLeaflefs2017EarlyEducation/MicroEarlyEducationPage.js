import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MicroEarlyEducationc1Component from '../../../components/weixin/microLeaflefs2017EarlyEducation/MicroEarlyEducationcPage1';
import MicroEarlyEducationc2Component from '../../../components/weixin/microLeaflefs2017EarlyEducation/MicroEarlyEducationcPage2';
import MicroEarlyEducationc3Component from '../../../components/weixin/microLeaflefs2017EarlyEducation/MicroEarlyEducationcPage3';
import MicroEarlyEducationc4Component from '../../../components/weixin/microLeaflefs2017EarlyEducation/MicroEarlyEducationcPage4';
import MicroEarlyEducationc5Component from '../../../components/weixin/microLeaflefs2017EarlyEducation/MicroEarlyEducationcPage5';
import MicroEarlyEducationc6Component from '../../../components/weixin/microLeaflefs2017EarlyEducation/MicroEarlyEducationcPage6';
import MicroEarlyEducationc7Component from '../../../components/weixin/microLeaflefs2017EarlyEducation/MicroEarlyEducationcPage7';

function MicroLeafletsEarlyEducationPage({location, dispatch, early_education_namespace}) {

    let {
		
		nIndex,
		mainData,
		playClassName,
		detailDataSource,
		initWindowHeight,
		markOver,
		
    } = early_education_namespace;

	function dp(name, paramter) {
		dispatch({
			type: `early_education_namespace/${name}`,
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
		markOver,
		initWindowHeight,
	}

    let array = [];
	if(mainData&&mainData.name!= undefined) {
		 document.title = mainData&&mainData.name;
	}

    if(detailDataSource&&detailDataSource.length > 0) {
        detailDataSource.map(function(obj, index) {
        	return array.push(
				obj.type == 'Page1Component' ? <MicroEarlyEducationc1Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page2Component' ? <MicroEarlyEducationc2Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page3Component' ? <MicroEarlyEducationc3Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page4Component' ? <MicroEarlyEducationc4Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page5Component' ? <MicroEarlyEducationc5Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page6Component' ? <MicroEarlyEducationc6Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page7Component' ? <MicroEarlyEducationc7Component key={index} index={index} {...pageProps} data={obj} /> : 
				''
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
			{nIndex != detailDataSource.length-1 ? <div className="downArrowBlack"></div> : ''}
		</div>
    );
}

MicroLeafletsEarlyEducationPage.propTypes = {
    early_education_namespace: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ early_education_namespace }) {
    return { early_education_namespace };
}

export default connect(mapStateToProps)(MicroLeafletsEarlyEducationPage);
