import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroLeafletsEnglishLongPage1Component from '../../../components/weixin/microLeafletsEnglishLong/microLeafletsEnglishLongComponent';


function MicroLeafletsEnglishLong({location, dispatch, microLeafletsEnglishLong}) {
    const {
		babyName,
		babyPhone,
		playClassName,
		mainData,
        iosAutoPlay, 
		modalisShow,
		detailDataSource,
    } = microLeafletsEnglishLong;

	const assignmentBabyNameFunction     = function(value) {
		dispatch({
			type:'microLeafletsEnglishLong/updateState',
			payload: {
				babyName : value,
			},
		});
	};

	const assignmentBabyPhoneFunction    = function(value) {
		dispatch({
			type: 'microLeafletsEnglishLong/updateState',
			payload: {
				babyPhone : value,
			},
		})
	};

	const submitUserDataFunction         = function(name, mobile) {
		dispatch({
			type : 'microLeafletsEnglishLong/submit',
			payload : {
				name,
				mobile,
			},
		});
	};
	
	const modalIshowFunction			= function(value) {
		dispatch({
			type : 'microLeafletsEnglishLong/updateState',
			payload : {
				modalisShow : value,
			},
		});
	};

    function touchMusic()                {
        var audio = document.getElementById('audio_cp');
        if(audio!==null){
            if(audio.paused){
                audio.play();
                dispatch({
                    type : 'microLeafletsEnglishLong/startRotate',
                });
            } else {
                audio.pause();
                dispatch({
                    type : 'microLeafletsEnglishLong/stopRotate',
                });
            }
        }
	};
	
    let pageProps                      = {
        babyName,
		babyPhone,
        iosAutoPlay,
        mainData,
		modalisShow,
		detailDataSource,
		assignmentBabyNameFunction,
		assignmentBabyPhoneFunction,
		submitUserDataFunction,
		modalIshowFunction,
	}

    let array = [];
	if(mainData&&mainData.name!= undefined) {
		 document.getElementsByTagName('title')[0].innerHTML = mainData&&mainData.name;
	}
   
    if(detailDataSource&&detailDataSource.length > 0) {
        detailDataSource.map(function(obj, index) {
        return array.push( <MicroLeafletsEnglishLongPage1Component id="index1" {...pageProps} key={index} obj={obj} />)});
    }
                          
    return (    
		<div className="outside-base-d" >
			<div onClick={touchMusic} className={playClassName} id="video_div"></div>
            <audio loop autoPlay height="0" width="0" hidden="true" src={mainData&&mainData.bg_music} id='audio_cp'></audio>
			{array}
		</div>
    );
}

MicroLeafletsEnglishLong.propTypes = {
    microLeafletsEnglishLong: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ microLeafletsEnglishLong }) {
    return { microLeafletsEnglishLong };
}

export default connect(mapStateToProps)(MicroLeafletsEnglishLong);