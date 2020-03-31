import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Carousel} from 'antd-mobile';

import SpringOutingActivityPage1Component from '../../../components/weixin/microActivitySpringOuting/springOutingActivityPage1';
import SpringOutingActivityPage2Component from '../../../components/weixin/microActivitySpringOuting/springOutingActivityPage2';
import SpringOutingActivityPage3Component from '../../../components/weixin/microActivitySpringOuting/springOutingActivityPage3';
import SpringOutingActivityPage4Component from '../../../components/weixin/microActivitySpringOuting/springOutingActivityPage4';
import SpringOutingActivityPage5Component from '../../../components/weixin/microActivitySpringOuting/springOutingActivityPage5';


function SpringOutingActivity({location, dispatch, springOutingActivity}){
    const {
		babyName,
		babyPhone,
        nIndex,
		playClassName,
		mainData,
        iosAutoPlay,
		detailDataSource,
		closeState,
    } = springOutingActivity;
	
	const assignmentBabyNameFunction     = function(value) {
		dispatch({
			type:'springOutingActivity/updateInputName',
			payload: {
				babyName : value,
			},
		});
	};

	const assignmentBabyPhoneFunction    = function(value) {
		dispatch({
			type: 'springOutingActivity/updateInputPhone',
			payload: {
				babyPhone : value,
			},
		})
	};

	const submitUserDataFunction         = function(name, mobile) {
		dispatch({
			type : 'springOutingActivity/submit',
			payload : {
				name,
				mobile,
			},
		});
	};
	
	const closeBottomBarFunction		 = function() {
		dispatch({
			type : 'springOutingActivity/updateState',
			payload : {
				closeState : !closeState,
			},
		});
	}

    const switchPage                     = function(from, to) {
        if(from == to) {
            return false;
        }
        dispatch({
			type:'springOutingActivity/changePageIndex',
			payload: {
                nIndex : to,
                iosAutoPlay : false,
			},
		});
    };

    const pageProps                      = {
        babyName,
		babyPhone,
        iosAutoPlay,
        mainData,
		closeState,
		detailDataSource,
		assignmentBabyNameFunction,
		assignmentBabyPhoneFunction,
		submitUserDataFunction,
		closeBottomBarFunction,
	}

    function touchMusic()                {
        let audio = document.getElementById('audio_cp');
        if(audio!==null){
            if(audio.paused){
                audio.play();
                dispatch({
                    type : 'springOutingActivity/startRotate',
                });
            } else {
                audio.pause();
                dispatch({
                    type : 'springOutingActivity/stopRotate',
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
        return array.push(  obj.type == 'Page1Component' ? <SpringOutingActivityPage1Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
                            obj.type == 'Page2Component' ? <SpringOutingActivityPage2Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
                            obj.type == 'Page4Component' ? <SpringOutingActivityPage3Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
                            obj.type == 'Page5Component' ? <SpringOutingActivityPage4Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
                            							   <SpringOutingActivityPage5Component key={index} obj={obj} newIndex={nIndex} index={index} {...pageProps} />)
                          });
    }

    return (
		<div className="outside-base-d" >
			<div onClick={touchMusic} className={playClassName} id="video_div"></div>
            <audio controls loop autoPlay height="0" width="0" hidden="true" src={mainData&&mainData.bg_music} id='audio_cp'></audio>
			<Carousel
                vertical={true}
                dots={false}
                beforeChange={(from, to) => {switchPage(from,to)}}
            >
                          {array.length > 1 ? array : <div className="component_css">{array}</div>}
			</Carousel>
		</div>
    );
}

SpringOutingActivity.propTypes = {
    springOutingActivity: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ springOutingActivity }) {
    return { springOutingActivity };
}

//SpringOutingActivity = connect(mapStateToProps)(SpringOutingActivity);
export default connect(mapStateToProps)(SpringOutingActivity);
