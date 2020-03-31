import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MicroLeafletsTechComponent from '../../../components/weixin/microLeaflets2017Tech/MicroLeafletsTechComponent';

function MicroLeafletsTechLong({location, dispatch, tech_namespace}) {

    let {

		playClassName,
		mainData,
		detailDataSource,

    } = tech_namespace;

	function dp(name, parameters) {
		dispatch({
			type : `tech_namespace/${name}`,
			payload : {
				...parameters
			}
		})
	}

    function touchMusic() {
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

    let pageProps = {
		dp,
        mainData,
		detailDataSource,
	}

    let array = [];

	if(mainData&&mainData.name!= undefined) {
		 document.title = mainData&&mainData.name;
	}

    if(detailDataSource&&detailDataSource.length > 0) {
        detailDataSource.map(function(obj, index) {
			return array.push(
				<MicroLeafletsTechComponent id="index1" {...pageProps} key={index} data={obj} />
			)
		});
    }

    return (
		<div className="outside-base-d" >
			<div onClick={() => touchMusic()} className={playClassName} id="video_div"></div>
            <audio loop autoPlay height="0" width="0" hidden="true" src={mainData&&mainData.bg_music} id='audio_cp'></audio>
			{array}
		</div>
    );
}

MicroLeafletsTechLong.propTypes = {
    tech_namespace: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ tech_namespace }) {
    return { tech_namespace };
}

export default connect(mapStateToProps)(MicroLeafletsTechLong);
