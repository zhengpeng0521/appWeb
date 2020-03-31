import React, { PropTypes } from 'react';
import { connect } from 'dva';

import MicroBarrageComponent from '../../../components/weixin/microActivity2017Barrage/microBarrageComponent';


function MicroBarragePage({location, dispatch, barrage}) {

    let {
		nIndex,
		mainData,
		playClassName,
		detailDataSource,
		initWindowHeight,
		barrageSwitch,

	} = barrage;

	function dp(name, paramter) {
		dispatch({
			type: `barrage/${name}`,
			payload: {
				...paramter
			},
		});
	}

    function touchMusic()                {
        var audio = document.getElementById('audio_cp');
        if(audio!==null){
            if(audio.paused){
                audio.play();
            } else {
                audio.pause();
            }
			dp('updateState', {playClassName : playClassName == "startPlayer" ? 'stopPlayer' : 'startPlayer'});
        }
	};

    let pageProps                      = {
		dp,
		nIndex,
        mainData,
		initWindowHeight,
		barrageSwitch,
	}
		
    let array = [];
	if(mainData&&mainData.name!= undefined) {
		 document.title = mainData&&mainData.name;
	}
	
    if(detailDataSource&&detailDataSource.length > 0) {
        detailDataSource.map(function(obj, index) {
        	return array.push(
				obj.type == 'Page1Component' ? <MicroBarrageComponent key={index} index={index} {...pageProps} data={obj} /> : ''
			)}
		);
    }


	let component = (
			<div className="swiper-container">
				<div className="swiper-wrapper">
					{
						array&&array.map(function(obj,index) {
							return <div style={{width:'100%'}} key={index}>{obj}</div>
						})
					}
				</div>
			</div>
	)

    return (
		<div className="outside-base-d" >
			{component}
			<div onClick={() => touchMusic()} className={playClassName} id="video_div"></div>
            <audio loop autoPlay height="0" width="0" hidden="true" src={mainData&&mainData.bg_music} id='audio_cp'></audio>
		</div>
    );
}

MicroBarragePage.propTypes = {
    barrage: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ barrage }) {
    return { barrage };
}

export default connect(mapStateToProps)(MicroBarragePage);
