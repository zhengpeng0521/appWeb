import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';

import EnglishaActivityPage1Component from '../../../components/weixin/microLeafletsEnglish/englishActivityPage1';
import EnglishaActivityPage2Component from '../../../components/weixin/microLeafletsEnglish/englishActivityPage2';
import EnglishaActivityPage3Component from '../../../components/weixin/microLeafletsEnglish/englishActivityPage3';


function EnglishaActivity({location, dispatch, englishaActivity}) {
    const {
		babyName,
		babyPhone,
        nIndex,  
		playClassName,
		mainData,
        iosAutoPlay, 
		detailDataSource,
    } = englishaActivity;

	const assignmentBabyNameFunction     = function(value) {
		dispatch({
			type:'englishaActivity/updateInputName',
			payload: {
				babyName : value,
			},
		});
	};

	const assignmentBabyPhoneFunction    = function(value) {
		dispatch({
			type: 'englishaActivity/updateInputPhone',
			payload: {
				babyPhone : value,
			},
		})
	};

	const submitUserDataFunction         = function(name, mobile) {
		dispatch({
			type : 'englishaActivity/submit',
			payload : {
				name,
				mobile,
			},
		});
	};

    const onSlideChangeEnd = function(){
        
        if(mySwiper.activeIndex == mySwiper.previousIndex) {
            return false;
        }
        dispatch({
			type:'englishaActivity/changePageIndex',
			payload: {
                nIndex : mySwiper.activeIndex,
                iosAutoPlay : false,
			},
		});
    };

    let pageProps                      = {
        babyName,
		babyPhone,
        iosAutoPlay,
        mainData,
		detailDataSource,
		assignmentBabyNameFunction,
		assignmentBabyPhoneFunction,
		submitUserDataFunction,
	}

    function touchMusic()                {
        var audio = document.getElementById('audio_cp');
        if(audio!==null){
            if(audio.paused){
                audio.play();
                dispatch({
                    type : 'englishaActivity/startRotate',
                });
            } else {
                audio.pause();
                dispatch({
                    type : 'englishaActivity/stopRotate',
                });
            }
        }
	};

    let array = [];
	if(mainData&&mainData.name!= undefined) {
		 document.getElementsByTagName('title')[0].innerHTML = mainData&&mainData.name;
	}
   
    if(detailDataSource&&detailDataSource.length > 0) {
        detailDataSource.map(function(obj, index) {
        return array.push(  obj.type == 'Page1Component' ? <EnglishaActivityPage1Component id="index1" key={index} obj={obj} newIndex={nIndex} index={index} /> :
                            obj.type == 'Page2Component' ? <EnglishaActivityPage2Component id="index2" key={index} obj={obj} newIndex={nIndex} index={index} /> :
                                                           <EnglishaActivityPage3Component id="index3" key={index} {...pageProps} obj={obj} newIndex={nIndex} index={index} />)
                          });
    }
                          
    return (        
        <div className="outside-base-d" >
    		<div className="swiper-container">
                <div className="swiper-wrapper" >
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

EnglishaActivity.propTypes = {
    englishaActivity: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ englishaActivity }) {
    return { englishaActivity };
}

export default connect(mapStateToProps)(EnglishaActivity);