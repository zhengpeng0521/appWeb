import React from 'react';
import styles from './PicEnlargeComponent.less';
import { Button , InputItem , List ,} from 'antd-mobile';
import QRCode from 'qrcode.react';
const Item = List.Item;
function PicEnlargeComponent({

}) {
	let qrcodeInfo = {
        payUrl:'http://www.ishanshan.com/thinknode/checkstand/h5/checkstandH5/index?sourceOpenId='+window._init_data.openId+'&appId=999999',
    }

	return(
        <div className={styles.results}>
			<GameQrcodeCont qrcodeInfo={qrcodeInfo}/>
        </div>
    );
}

class GameQrcodeCont extends React.Component {

	constructor(props){
        super(props);
//        let initVisible = props && props.visible;
        this.state = {
        	div_to_img: false,//是否转化为image
        	image_render_cont: undefined,
        };
        this.qrcodeDivToImg = this.qrcodeDivToImg.bind(this);

    }

	componentDidMount() {
		this.qrcodeDivToImg();
	}

	qrcodeDivToImg() {
		let me = this;
        let qrcodeUrl = me.props.qrcodeInfo.payUrl;

        if(qrcodeUrl != undefined && qrcodeUrl.length > 0) {
            let payCode = document.getElementById('payCode_24322');
             if(payCode) {
                    html2canvas(payCode).then(function(canvas) {
                    let image_data = canvas.toDataURL("image/png");

                    me.setState({
                        div_to_img: true,
                        image_render_cont: (
                            <img className={styles.qrcode_image_show_cont} src={image_data} style={{width:'100%'}}/>
                        )
                    });
                });
             }

        } else {
            setTimeout(me.qrcodeDivToImg, 500);
        }
	}

	render() {

		let {qrcodeInfo} = this.props;

		let {div_to_img, image_render_cont} = this.state;

		let div_render_cont = (
            <div className={styles.card_info}>
				<img src="/thinknode/upload/imageProxy?src=https://img.ishanshan.com/gimg/img/5138411d6064fd6c4149ac4478484fde" />
				<div style={{backgroundImage:"url('/thinknode/upload/imageProxy?src=https://img.ishanshan.com/gimg/img/d359e1bbb051be6e78d603aafc741246')",backgroundSize:'contain',position:'absolute'}} className={styles.img_all}>
					<div className={styles.qrCode}>
						<QRCode value = {qrcodeInfo.payUrl} size = { 205 } />
					</div>
				</div>
			</div>
		);

		return (
            <div className={styles.payCard} id="payCode_24322">

                {div_to_img ?
                    image_render_cont
                     :
                    div_render_cont
                }
            </div>
        )
	}
}


export default PicEnlargeComponent;
