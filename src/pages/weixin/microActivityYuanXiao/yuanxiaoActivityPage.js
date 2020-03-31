import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';

import YuanxiaoActivityPage1Component from '../../../components/weixin/microActivityYuanXiao/yuanxiaoActivityPage1';
import YuanxiaoActivityPage2Component from '../../../components/weixin/microActivityYuanXiao/yuanxiaoActivityPage2';
import YuanxiaoActivityPage3Component from '../../../components/weixin/microActivityYuanXiao/yuanxiaoActivityPage3';
import YuanxiaoActivityPage4Component from '../../../components/weixin/microActivityYuanXiao/yuanxiaoActivityPage4';
import YuanxiaoActivityPage5Component from '../../../components/weixin/microActivityYuanXiao/yuanxiaoActivityPage5';
import YuanxiaoActivityPage6Component from '../../../components/weixin/microActivityYuanXiao/yuanxiaoActivityPage6';


function YuanxiaoActivity({location, dispatch, yuanxiaoActivity}) {
    const {
		babyName,
		babyPhone,
        nIndex,
		playClassName,
		mainData,
        iosAutoPlay,
		detailDataSource,
    } = yuanxiaoActivity;
	
	const assignmentBabyNameFunction     = function(value) {
		dispatch({
			type:'yuanxiaoActivity/updateInputName',
			payload: {
				babyName : value,
			},
		});
	};

	const assignmentBabyPhoneFunction    = function(value) {
		dispatch({
			type: 'yuanxiaoActivity/updateInputPhone',
			payload: {
				babyPhone : value,
			},
		})
	};

	const submitUserDataFunction         = function(name, mobile) {
		dispatch({
			type : 'yuanxiaoActivity/submit',
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
			type:'yuanxiaoActivity/changePageIndex',
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
		detailDataSource,
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
                    type : 'yuanxiaoActivity/startRotate',
                });
            } else {
                audio.pause();
                dispatch({
                    type : 'yuanxiaoActivity/stopRotate',
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
        return array.push(  obj.type == 'Page1Component' ? <YuanxiaoActivityPage1Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
                            obj.type == 'Page2Component' ? <YuanxiaoActivityPage2Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
                            obj.type == 'Page3Component' ? <YuanxiaoActivityPage3Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
                            obj.type == 'Page4Component' ? <YuanxiaoActivityPage4Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
                            obj.type == 'Page5Component' ? <YuanxiaoActivityPage5Component key={index} obj={obj} newIndex={nIndex} index={index} /> :
                                                           <YuanxiaoActivityPage6Component key={index} {...pageProps} obj={obj} newIndex={nIndex} index={index} />)
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

YuanxiaoActivity.propTypes = {
    yuanxiaoActivity: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ yuanxiaoActivity }) {
    return { yuanxiaoActivity };
}

export default connect(mapStateToProps)(YuanxiaoActivity);
