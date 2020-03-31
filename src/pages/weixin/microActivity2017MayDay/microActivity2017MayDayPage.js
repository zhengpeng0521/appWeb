import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';

import MicroActivity2017MayDayPage1Component from '../../../components/weixin/microActivity2017MayDay/microActivity2017MayDayPage1';
import MicroActivity2017MayDayPage2Component from '../../../components/weixin/microActivity2017MayDay/microActivity2017MayDayPage2';
import MicroActivity2017MayDayPage3Component from '../../../components/weixin/microActivity2017MayDay/microActivity2017MayDayPage3';
import MicroActivity2017MayDayPage4Component from '../../../components/weixin/microActivity2017MayDay/microActivity2017MayDayPage4';
import MicroActivity2017MayDayPage5Component from '../../../components/weixin/microActivity2017MayDay/microActivity2017MayDayPage5';
import MicroActivity2017MayDayPage6Component from '../../../components/weixin/microActivity2017MayDay/microActivity2017MayDayPage6';

function MicroActivity2017MayDay({location, dispatch, microActivity2017MayDay }) {

    const {
		babyName,
		babyPhone,
		nIndex,
		playClassName,
		mainData,
		detailDataSource,
        iosAutoPlay,
    } = microActivity2017MayDay;

	const assignmentBabyNameFunction = function(value) {
		dispatch({
			type:'microActivity2017MayDay/updateInputName',
			payload: {
				babyName : value,
			},
		});
	};

	const assignmentBabyPhoneFunction = function(value) {
		dispatch({
			type: 'microActivity2017MayDay/updateInputPhone',
			payload: {
				babyPhone : value,
			},
		})
	};

	const submitUserDataFunction = function(name, mobile) {
		dispatch({
			type : 'microActivity2017MayDay/submit',
			payload : {
				name,
				mobile,
			},
		});
	};
	
 	const switchPage                     = function(from, to) {
        if(from == to) {
            return false;
        }
        dispatch({
			type:'microActivity2017MayDay/changePageIndex',
			payload: {
                nIndex : to,
                iosAutoPlay : false,
			},
		});
    };

	const pageProps = {
        babyName,
		babyPhone,
		detailDataSource,
        iosAutoPlay,
		assignmentBabyNameFunction,
		assignmentBabyPhoneFunction,
		submitUserDataFunction,
	}

	function touchMusic() {
		let audio = document.getElementById('audio_cp');
		if(audio!==null){
			if(audio.paused){
					audio.play();
						dispatch({
						type : 'microActivity2017MayDay/startRotate',
					});
			 } else {
				  audio.pause();
				  dispatch({
					  type : 'microActivity2017MayDay/stopRotate',
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
		   return array.push(obj.type == 'Page1Component' ? <MicroActivity2017MayDayPage1Component key={index} obj={obj} newIndex={nIndex} index={index}/> :
							 obj.type == 'Page2Component' ? <MicroActivity2017MayDayPage2Component key={index} obj={obj} newIndex={nIndex} index={index}/> :
							 obj.type == 'Page3Component' ? <MicroActivity2017MayDayPage3Component key={index} obj={obj} newIndex={nIndex} index={index}/> :
							 obj.type == 'Page4Component' ? <MicroActivity2017MayDayPage4Component key={index} obj={obj} newIndex={nIndex} index={index}/> :
							 obj.type == 'Page5Component' ? <MicroActivity2017MayDayPage5Component key={index} obj={obj} newIndex={nIndex} index={index}/> : 
							 <MicroActivity2017MayDayPage6Component key={index} {...pageProps} obj={obj} newIndex={nIndex} index={index} />)

		});
	}
    return (
		<div className="outside-base-d" >
			<div onClick={touchMusic} className={playClassName} id="video_div"></div>
			<audio controls autoPlay loop height="0" width="0" hidden="true" src={mainData&&mainData.bg_music} id='audio_cp'></audio>
			<Carousel
				vertical={true}
                dots={false}
                beforeChange={(from, to) => {switchPage(from,to)}} >
                 {
                   array.length > 1 ? array : <div className="component_css">{array}</div>
                 }
			</Carousel>
		</div>
    );
}

MicroActivity2017MayDay.propTypes = {
  microActivity2017MayDay: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ microActivity2017MayDay }) {
  return { microActivity2017MayDay };
}

export default connect(mapStateToProps)(MicroActivity2017MayDay);
