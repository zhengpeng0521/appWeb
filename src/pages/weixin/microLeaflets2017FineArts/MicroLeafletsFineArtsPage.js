import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MicroLeafletsFineArtsComponent from '../../../components/weixin/microLeaflets2017FineArts/MicrolLeafletsFineArtsComponent';

function MicroLeafletsFineArtsPage({location, dispatch, fine_arts}) {

    let {

		playClassName,
		mainData,
		detailDataSource,

    } = fine_arts;

	function dp(name, parameters) {
		dispatch({
			type : `fine_arts/${name}`,
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
				<MicroLeafletsFineArtsComponent {...pageProps} key={index} data={obj} />
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

MicroLeafletsFineArtsPage.propTypes = {
    fine_arts: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ fine_arts }) {
    return { fine_arts };
}

export default connect(mapStateToProps)(MicroLeafletsFineArtsPage);
