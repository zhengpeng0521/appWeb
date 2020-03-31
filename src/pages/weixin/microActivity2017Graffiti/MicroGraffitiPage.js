import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MicroGraffitiComponent from '../../../components/weixin/microActivity2017Graffiti/MicroGraffiti';

function MicroActivityGraffitiPage({location, dispatch, graffiti}) {
	
    let {
		
		playClassName,
		mainData,
		detailDataSource,
		cleasBool,
		bg_color,
		touchScreen,
		
    } = graffiti;
	
	function dp(name, parameters) {
		dispatch({
			type : `graffiti/${name}`,
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
		cleasBool,
		bg_color,
		touchScreen,
	}
	
    let array = [];
	
	if(mainData&&mainData.name!= undefined) {
		 document.title = mainData&&mainData.name;
	}
   
    if(detailDataSource&&detailDataSource.length > 0) {
        detailDataSource.map(function(obj, index) {
			return array.push( 
				<MicroGraffitiComponent id="index1" {...pageProps} key={index} data={obj} />
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

MicroActivityGraffitiPage.propTypes = {
    graffiti: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ graffiti }) {
    return { graffiti };
}

export default connect(mapStateToProps)(MicroActivityGraffitiPage);