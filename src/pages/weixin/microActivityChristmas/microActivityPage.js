import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';
import MicroActivityPage1Component from '../../../components/weixin/microActivityChristmas/microActivityPage_1';
import MicroActivityPage2Component from '../../../components/weixin/microActivityChristmas/microActivityPage_2';
import MicroActivityPage3Component from '../../../components/weixin/microActivityChristmas/microActivityPage_3';
import MicroActivityPage4Component from '../../../components/weixin/microActivityChristmas/microActivityPage_4';
import MicroActivityPage5Component from '../../../components/weixin/microActivityChristmas/microActivityPage_5';
import MicroActivityPage6Component from '../../../components/weixin/microActivityChristmas/microActivityPage_6';

function MicroAitivity({location, dispatch, microactivity }) {
    const {
		babyName,
		babyPhone,
		playClassName,
		mainData,
		detailData,
        iosAutoPlay,
    } = microactivity;

	
	let maindata = mainData.length > 0 ? eval('(' + mainData + ')') : '';
	let detaildata = detailData.length > 0 ? eval('(' + detailData + ')') : '';
	
	const assignmentBabyNameFunction = function(value) {
		dispatch({
			type:'microactivity/updateInputName',
			payload: {
				babyName : value,
			},
		});
	};

	const assignmentBabyPhoneFunction = function(value) {
		dispatch({
			type: 'microactivity/updateInputPhone',
			payload: {
				babyPhone : value,
			},
		})
	};

	const submitUserDataFunction = function(name, mobile) {
		dispatch({
			type : 'microactivity/submit',
			payload : {
				name,
				mobile,
			},
		});
	};

	const pageProps = {
        babyName,
		babyPhone,
		detailData,
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
						type : 'microactivity/startRotate',
					});
			 } else {
				  audio.pause();
				  dispatch({
					  type : 'microactivity/stopRotate',
				  });
			 }
	 	}
	};

    let tempdetail = detaildata&&detaildata.length > 0 ? detaildata : '';
    let array = [];
    tempdetail&&tempdetail.map(function(obj, index) {
       return array.push(obj.type == 'Page1Component' ? <MicroActivityPage1Component key={index} obj={obj} /> :
                         obj.type == 'Page2Component' ? <MicroActivityPage2Component key={index} obj={obj} /> :
                         obj.type == 'Page3Component' ? <MicroActivityPage3Component key={index} obj={obj} /> :
                         obj.type == 'Page4Component' ? <MicroActivityPage4Component key={index} obj={obj} /> :
                         obj.type == 'Page5Component' ? <MicroActivityPage5Component key={index} obj={obj} /> :
                                                        <MicroActivityPage6Component key={index} {...pageProps} obj={obj} />)

    });
    return (
		<div className="outside-base-d">
			<div onClick={touchMusic} className={playClassName} id="video_div"></div>
			<audio controls autoPlay loop height="0" width="0" hidden="true" src={maindata.bg_music} id='audio_cp'></audio>
			<Carousel vertical={true} dots={false} >
                 {
                   array.length > 1 ? array : <div className="component_css">{array}</div>
                 }
			</Carousel>
		</div>
    );
}

MicroAitivity.propTypes = {
  microactivity: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ microactivity }) {
  return { microactivity };
}

export default connect(mapStateToProps)(MicroAitivity);
