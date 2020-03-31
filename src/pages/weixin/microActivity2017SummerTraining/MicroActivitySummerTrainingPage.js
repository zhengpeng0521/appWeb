import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MicroLeafletsSummerTrainingComponent from '../../../components/weixin/microActivity2017SummerTraining/MicroActivitySummerTrainingComponent';

function MicroActivitySummerTrainingLong({location, dispatch, summer_training_namespace}) {

    let {

		playClassName,
		mainData,
		detailDataSource,

    } = summer_training_namespace;

	function dp(name, parameters) {
		dispatch({
			type : `summer_training_namespace/${name}`,
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
				<MicroLeafletsSummerTrainingComponent id="index1" {...pageProps} key={index} data={obj} />
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

MicroActivitySummerTrainingLong.propTypes = {
    summer_training_namespace: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ summer_training_namespace }) {
    return { summer_training_namespace };
}

export default connect(mapStateToProps)(MicroActivitySummerTrainingLong);
