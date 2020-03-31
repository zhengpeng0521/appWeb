import React, { PropTypes } from 'react';
import { connect } from 'dva';
import MicroLeafletsInvitation1Component from '../../../components/weixin/microLeaflets2017Invitation/MicroLeafletsInvitationPage1';
import MicroLeafletsInvitation2Component from '../../../components/weixin/microLeaflets2017Invitation/MicroLeafletsInvitationPage2';
import MicroLeafletsInvitation3Component from '../../../components/weixin/microLeaflets2017Invitation/MicroLeafletsInvitationPage3';
import MicroLeafletsInvitation4Component from '../../../components/weixin/microLeaflets2017Invitation/MicroLeafletsInvitationPage4';
import MicroLeafletsInvitation5Component from '../../../components/weixin/microLeaflets2017Invitation/MicroLeafletsInvitationPage5';
import MicroLeafletsInvitation6Component from '../../../components/weixin/microLeaflets2017Invitation/MicroLeafletsInvitationPage6';
import MicroLeafletsInvitation7Component from '../../../components/weixin/microLeaflets2017Invitation/MicroLeafletsInvitationPage7';

function MicroLeafletsInvitationPage({location, dispatch, invitation_namespace}) {

    let {
		
		nIndex,
		mainData,
		playClassName,
		detailDataSource,
		initWindowHeight,
		
    } = invitation_namespace;

	function dp(name, paramter) {
		dispatch({
			type: `invitation_namespace/${name}`,
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
	}

    let array = [];
	if(mainData&&mainData.name!= undefined) {
		 document.title = mainData&&mainData.name;
	}

    if(detailDataSource&&detailDataSource.length > 0) {
        detailDataSource.map(function(obj, index) {
        	return array.push(
				obj.type == 'Page1Component' ? <MicroLeafletsInvitation1Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page2Component' ? <MicroLeafletsInvitation2Component key={index} index={index} {...pageProps} data={obj} /> :
				obj.type == 'Page3Component' ? <MicroLeafletsInvitation3Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page4Component' ? <MicroLeafletsInvitation4Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page5Component' ? <MicroLeafletsInvitation5Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page6Component' ? <MicroLeafletsInvitation6Component key={index} index={index} {...pageProps} data={obj} /> : 
				obj.type == 'Page7Component' ? <MicroLeafletsInvitation7Component key={index} index={index} {...pageProps} data={obj} /> : 
				''
			)}
		);
    }

	let onSlideChangeEnd = function(){
		dp('updateState', {nIndex : mySwiper.activeIndex});
    };

	let component = (
			<div className="swiper-container">
				<div className="swiper-wrapper">
					{
						array&&array.map(function(obj,index) {
							return <div key={index} onTouchEnd={onSlideChangeEnd} className="swiper-slide">{obj}</div>
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

MicroLeafletsInvitationPage.propTypes = {
    invitation_namespace: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ invitation_namespace }) {
    return { invitation_namespace };
}

export default connect(mapStateToProps)(MicroLeafletsInvitationPage);
