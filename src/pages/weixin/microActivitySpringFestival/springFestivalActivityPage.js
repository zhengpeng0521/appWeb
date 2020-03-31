import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';

import SpringFestivalActivityPage1Component from '../../../components/weixin/microActivitySpringFestival/springFestivalActivityPage1';
import SpringFestivalActivityPage2Component from '../../../components/weixin/microActivitySpringFestival/springFestivalActivityPage2';
import SpringFestivalActivityPage3Component from '../../../components/weixin/microActivitySpringFestival/springFestivalActivityPage3';
import SpringFestivalActivityPage4Component from '../../../components/weixin/microActivitySpringFestival/springFestivalActivityPage4';
import SpringFestivalActivityPage5Component from '../../../components/weixin/microActivitySpringFestival/springFestivalActivityPage5';


function SpringFestivalActivity({location, dispatch, springFestivalActivity}) {
	
    const {
		babyName,
		babyPhone,
        nIndex,
		playClassName,
		mainData,
        iosAutoPlay,
		detailDataSource,
    } = springFestivalActivity;

	const assignmentBabyNameFunction     = function(value) {
		dispatch({
			type:'springFestivalActivity/updateInputName',
			payload: {
				babyName : value,
			},
		});
	};

	const assignmentBabyPhoneFunction    = function(value) {
		dispatch({
			type: 'springFestivalActivity/updateInputPhone',
			payload: {
				babyPhone : value,
			},
		})
	};

	const submitUserDataFunction         = function(name, mobile) {
		dispatch({
			type : 'springFestivalActivity/submit',
			payload : {
				name,
				mobile,
			},
		});
	};

    const pageProps                      = {
        babyName,
		babyPhone,
        iosAutoPlay,
		assignmentBabyNameFunction,
		assignmentBabyPhoneFunction,
		submitUserDataFunction,
	}

    function touchMusic()                {
        let audio = document.getElementById('audio_cp');
        if(audio!==null){
            if(audio.paused){
                audio.play();
                dispatch({
                    type : 'springFestivalActivity/startRotate',
                });
            } else {
                audio.pause();
                dispatch({
                    type : 'springFestivalActivity/stopRotate',
                });
            }
        }
	};

    let onSlideChangeEnd = function(){
        
        if(mySwiper.activeIndex == mySwiper.previousIndex) {
            return false;
        }
        dispatch({
			type:'springFestivalActivity/changePageIndex',
			payload: {
                nIndex : mySwiper.activeIndex,
                iosAutoPlay : false,
			},
		});
    };

    let array = [];
	
    if(detailDataSource&&detailDataSource.length > 0) {
        detailDataSource.map(function(obj, index) {
			return array.push(  obj.type == 'Page1Component' ? <SpringFestivalActivityPage1Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
								obj.type == 'Page2Component' ? <SpringFestivalActivityPage2Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
								obj.type == 'Page4Component' ? <SpringFestivalActivityPage3Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
								obj.type == 'Page5Component' ? <SpringFestivalActivityPage4Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
															   <SpringFestivalActivityPage5Component key={index} {...pageProps} obj={obj} newIndex={nIndex} index={index} />
							 )
		});
    }
					  
	let l = array.length;
    if(mainData&&mainData.name!= undefined) {
		 document.getElementsByTagName('title')[0].innerHTML = mainData&&mainData.name;
	}
    let component = <div className="swiper-container">
						<div className="swiper-wrapper">
							{
							  	array&&array.map(function(obj,index) {
							  		return <div key={index} onTouchEnd={onSlideChangeEnd} className="swiper-slide">{obj}</div>
							  	})
							}
						</div>
					</div> 					 
    return (
		<div className="outside-base-d">
            {component}
			<div onClick={touchMusic} className={playClassName} id="video_div"></div>
            <audio controls loop autoPlay height="0" width="0" hidden="true" src={mainData&&mainData.bg_music} id='audio_cp'></audio>
		</div>
    );
}

SpringFestivalActivity.propTypes = {
    springFestivalActivity: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ springFestivalActivity }) {
    return { springFestivalActivity };
}

export default connect(mapStateToProps)(SpringFestivalActivity);