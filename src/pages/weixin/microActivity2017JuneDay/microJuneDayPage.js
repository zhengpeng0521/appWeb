import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroJuneDayPage1Component from '../../../components/weixin/microActivity2017JuneDay/microJuneDayPage1';
import MicroJuneDayPage2Component from '../../../components/weixin/microActivity2017JuneDay/microJuneDayPage2';
import MicroJuneDayPage3Component from '../../../components/weixin/microActivity2017JuneDay/microJuneDayPage3';
import MicroJuneDayPage4Component from '../../../components/weixin/microActivity2017JuneDay/microJuneDayPage4';
import MicroJuneDayPage5Component from '../../../components/weixin/microActivity2017JuneDay/microJuneDayPage5';


function MicroJuneDayPage({location, dispatch, microJuneDay}) {
	
    let {
		nIndex,
		mainData,
		playClassName,
		detailDataSource,
		initWindowHeight,
    } = microJuneDay;

	function dp(name, paramter) {
		dispatch({
			type: `microJuneDay/${name}`,
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
			dp('rotateStatus', {playClassName : playClassName});
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
				obj.type == 'Page1Component' ? <MicroJuneDayPage1Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page2Component' ? <MicroJuneDayPage2Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page4Component' ? <MicroJuneDayPage3Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page5Component' ? <MicroJuneDayPage4Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page6Component' ? <MicroJuneDayPage5Component key={index} index={index} {...pageProps} data={obj} /> : ''
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

MicroJuneDayPage.propTypes = {
    microJuneDay: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ microJuneDay }) {
    return { microJuneDay };
}

export default connect(mapStateToProps)(MicroJuneDayPage);