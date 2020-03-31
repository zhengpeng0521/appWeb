import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MicroTeachersDayComponent from '../../../components/weixin/microActivity2017TeachersDay/MicroTeachersDay';

function MicroTeachersDayPage({location, dispatch, teachers_day}) {
	
    let {
		
		playClassName,
		mainData,
		detailDataSource,
		
    } = teachers_day;
	
	function dp(name, parameters) {
		dispatch({
			type : `teachers_day/${name}`,
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
	}
	
    let array = [];
	
	if(mainData&&mainData.name!= undefined) {
		 document.title = mainData&&mainData.name;
	}
   	
    if(detailDataSource&&detailDataSource.length > 0) {
        detailDataSource.map(function(obj, index) {
			return array.push( 
				<MicroTeachersDayComponent id="index1" {...pageProps} key={index} data={obj} />
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

MicroTeachersDayPage.propTypes = {
    teachers_day: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ teachers_day }) {
    return { teachers_day };
}

export default connect(mapStateToProps)(MicroTeachersDayPage);