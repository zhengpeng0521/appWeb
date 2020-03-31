
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';

import AdmissionsMicroMarketingPage1Component from '../../../components/weixin/microActivityAdmissions/admissionsMicroMarketingPage_1';
import AdmissionsMicroMarketingPage2Component from '../../../components/weixin/microActivityAdmissions/admissionsMicroMarketingPage_2';
import AdmissionsMicroMarketingPage3Component from '../../../components/weixin/microActivityAdmissions/admissionsMicroMarketingPage_3';
import AdmissionsMicroMarketingPage4Component from '../../../components/weixin/microActivityAdmissions/admissionsMicroMarketingPage_4';
import AdmissionsMicroMarketingPage5Component from '../../../components/weixin/microActivityAdmissions/admissionsMicroMarketingPage_5';

function AdmissionsMicroMarketing({location, dispatch, admissionsMicroMarketing }) {
    const {
		babyName,
		babyPhone,
        nIndex,
		playClassName,
		admmMainData,
        iosAutoPlay,
		admmDetailDataSource,
    } = admissionsMicroMarketing;

	const assignmentBabyNameFunction     = function(value) {
		dispatch({
			type:'admissionsMicroMarketing/updateInputName',
			payload: {
				babyName : value,
			},
		});
	};

	const assignmentBabyPhoneFunction    = function(value) {
		dispatch({
			type: 'admissionsMicroMarketing/updateInputPhone',
			payload: {
				babyPhone : value,
			},
		})
	};

	const submitUserDataFunction         = function(name, mobile) {
		dispatch({
			type : 'admissionsMicroMarketing/submit',
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
			type:'admissionsMicroMarketing/changePageIndex',
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
        admmMainData,
		admmDetailDataSource,
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
                    type : 'admissionsMicroMarketing/startRotate',
                });
            } else {
                audio.pause();
                dispatch({
                    type : 'admissionsMicroMarketing/stopRotate',
                });
            }
        }
	};

    let array = [];
	if(admmMainData&&admmMainData.name!= undefined) {
		 document.getElementsByTagName('title')[0].innerHTML = admmMainData&&admmMainData.name;
	}
    if(admmDetailDataSource&&admmDetailDataSource.length > 0) {
        admmDetailDataSource.map(function(obj, index) {
        return array.push(  obj.type == 'Page1Component' ? <AdmissionsMicroMarketingPage1Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
                            obj.type == 'Page2Component' ? <AdmissionsMicroMarketingPage2Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
                            obj.type == 'Page4Component' ? <AdmissionsMicroMarketingPage3Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
                            obj.type == 'Page5Component' ? <AdmissionsMicroMarketingPage4Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
                                                           <AdmissionsMicroMarketingPage5Component key={index} {...pageProps} obj={obj} newIndex={nIndex} index={index} />)
                          });
    }
    return (
		<div className="outside-base-d" >
			<div onClick={touchMusic} className={playClassName} id="video_div"></div>
            <audio loop autoPlay height="0" width="0" hidden="true" src={admmMainData&&admmMainData.bg_music} id='audio_cp'></audio>
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

AdmissionsMicroMarketing.propTypes = {
    admissionsMicroMarketing: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ admissionsMicroMarketing }) {
    return { admissionsMicroMarketing };
}

export default connect(mapStateToProps)(AdmissionsMicroMarketing);
