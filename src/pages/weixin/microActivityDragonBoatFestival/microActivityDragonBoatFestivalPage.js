import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';

import DragonBoatFestivalPage1Component from '../../../components/weixin/microActivityDragonBoatFestival/microActivityDragonBoatFestival1';
import DragonBoatFestivalPage2Component from '../../../components/weixin/microActivityDragonBoatFestival/microActivityDragonBoatFestival2';
import DragonBoatFestivalPage3Component from '../../../components/weixin/microActivityDragonBoatFestival/microActivityDragonBoatFestival3';
import DragonBoatFestivalPage4Component from '../../../components/weixin/microActivityDragonBoatFestival/microActivityDragonBoatFestival4';
import DragonBoatFestivalPage5Component from '../../../components/weixin/microActivityDragonBoatFestival/microActivityDragonBoatFestival5';


function MicroActivityDragonBoatFestival({location, dispatch, microActivityDragonBoatFestival}) {
	
    const {
		babyName,
		babyPhone,
        nIndex,
		playClassName,
		mainData,
        iosAutoPlay,
		detailDataSource,
    } = microActivityDragonBoatFestival;

	const assignmentBabyNameFunction     = function(value) {
		dispatch({
			type:'microActivityDragonBoatFestival/updateInputName',
			payload: {
				babyName : value,
			},
		});
	};

	const assignmentBabyPhoneFunction    = function(value) {
		dispatch({
			type: 'microActivityDragonBoatFestival/updateInputPhone',
			payload: {
				babyPhone : value,
			},
		})
	};

	const submitUserDataFunction         = function(name, mobile) {
		dispatch({
			type : 'microActivityDragonBoatFestival/submit',
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
                    type : 'microActivityDragonBoatFestival/startRotate',
                });
            } else {
                audio.pause();
                dispatch({
                    type : 'microActivityDragonBoatFestival/stopRotate',
                });
            }
        }
	};

    let onSlideChangeEnd = function(){
        
        if(mySwiper.activeIndex == mySwiper.previousIndex) {
            return false;
        }
        dispatch({
			type:'microActivityDragonBoatFestival/changePageIndex',
			payload: {
                nIndex : mySwiper.activeIndex,
                iosAutoPlay : false,
			},
		});
    };

    let array = [];
	
    if(detailDataSource&&detailDataSource.length > 0) {
        detailDataSource.map(function(obj, index) {
			return array.push(  obj.type == 'Page1Component' ? <DragonBoatFestivalPage1Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
								obj.type == 'Page2Component' ? <DragonBoatFestivalPage2Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
								obj.type == 'Page4Component' ? <DragonBoatFestivalPage3Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
								obj.type == 'Page5Component' ? <DragonBoatFestivalPage4Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
															   <DragonBoatFestivalPage5Component key={index} {...pageProps} obj={obj} newIndex={nIndex} index={index} />
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

MicroActivityDragonBoatFestival.propTypes = {
    springFestivalActivity: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ microActivityDragonBoatFestival }) {
    return { microActivityDragonBoatFestival };
}

export default connect(mapStateToProps)(MicroActivityDragonBoatFestival);