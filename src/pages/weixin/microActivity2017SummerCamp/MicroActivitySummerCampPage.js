import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MicroLeafletsSummerCampComponent from '../../../components/weixin/microActivity2017SummerCamp/MicroActivitySummerCampComponent';

function MicroActivitySummerCampPage({location, dispatch, summer_camp}) {

    let {

		playClassName,
		mainData,
		detailDataSource,

    } = summer_camp;

	function dp(name, parameters) {
		dispatch({
			type : `summer_camp/${name}`,
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
				<MicroLeafletsSummerCampComponent id="index1" {...pageProps} key={index} data={obj} />
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

MicroActivitySummerCampPage.propTypes = {
    summer_camp: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ summer_camp }) {
    return { summer_camp };
}

export default connect(mapStateToProps)(MicroActivitySummerCampPage);
