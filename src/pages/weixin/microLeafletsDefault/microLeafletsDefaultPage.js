import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroLeafletsDefaultPage1Component from '../../../components/weixin/microLeafletsDefault/microLeafletsDefaultPage1';
import MicroLeafletsDefaultPage2Component from '../../../components/weixin/microLeafletsDefault/microLeafletsDefaultPage2';
import MicroLeafletsDefaultPage3Component from '../../../components/weixin/microLeafletsDefault/microLeafletsDefaultPage3';

function MicroLeafletsDefault({location, dispatch, microLeafletsDefault}) {
    let {
		babyName,
		babyPhone,
        nIndex,  
		playClassName,
		mainData,
        iosAutoPlay,
		detailDataSource,
    } = microLeafletsDefault;
	
	function dp(name, paramter) {
		dispatch({
			type: `microLeafletsDefault/${name}`,
			payload: {
				...paramter
			},
		});
	}
	
	function assignmentBabyNameFunction(value) {
		dp('updateInputName', {babyName : value});
	}

	function assignmentBabyPhoneFunction(value) {
		dp('updateInputPhone', {babyPhone : value});
	}  
	
	function submitUserDataFunction(name, mobile) {
		dp('submit', {name, mobile});
	}

    function onSlideChangeEnd(){
        if(mySwiper.activeIndex == mySwiper.previousIndex) {return false;}
		dp('changePageIndex', {nIndex : mySwiper.activeIndex, iosAutoPlay : false});
    }

    let pageProps                      = {
        mainData,
        babyName,
		babyPhone,
        iosAutoPlay,
		detailDataSource,
		submitUserDataFunction,
		assignmentBabyNameFunction,
		assignmentBabyPhoneFunction,
	}

    function touchMusic()                {
        var audio = document.getElementById('audio_cp');
        if(audio!==null){
            if(audio.paused){
                audio.play();
				dp('startRotate', {});
            } else {
                audio.pause();
				dp('stopRotate', {});
            }
        }
	};

    let array = [];
	if(mainData&&mainData.name != undefined) {
		 document.getElementsByTagName('title')[0].innerHTML = mainData.name;
	}
    
    if(detailDataSource&&detailDataSource.length > 0) {
        detailDataSource.map(function(obj, index) {
        return array.push(  obj.type == 'Page1Component' ? <MicroLeafletsDefaultPage1Component id="index1" key={index} data={obj} newIndex={nIndex} index={index} /> :
                            obj.type == 'Page2Component' ? <MicroLeafletsDefaultPage2Component id="index2" key={index} data={obj} newIndex={nIndex} index={index} /> :
                                                           <MicroLeafletsDefaultPage3Component id="index3" key={index} {...pageProps} obj={obj} newIndex={nIndex} index={index} />)
                          });
    }
                          
    return (  		  
        <div className="outside-base-d" >
    		<div className="swiper-container">
                <div className="swiper-wrapper">
                    {
						array&&array.map(function(obj,index) {
							return <div key={index} onTouchEnd={onSlideChangeEnd} className="swiper-slide">{obj}</div>
						})
					}
                </div>
            </div>
            <div onClick={touchMusic} className={playClassName} id="video_div"></div>
            <audio controls loop autoPlay height="0" width="0" hidden="true" src={mainData&&mainData.bg_music} id='audio_cp'></audio>
		</div>
    );
}

MicroLeafletsDefault.propTypes = {
    microLeafletsDefault: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ microLeafletsDefault }) {
    return { microLeafletsDefault };
}

export default connect(mapStateToProps)(MicroLeafletsDefault);