import React from 'react';
import styles from './ResultComponent.less';
import { Button , InputItem , List ,} from 'antd-mobile';
import QRCode from 'qrcode.react';
const Item = List.Item;
function ResultComponent({
	picEnlargeFunc,
}) {
	let qrcodeInfo = {
        payUrl:'http://www.ishanshan.com/thinknode/checkstand/h5/checkstandH5/index?sourceOpenId='+window._init_data.openId+'&appId=999999',
		picEnlargeFunc
    }

	return(
        <div className={styles.results}>
            <div style={{textAlign:'center',paddingTop:'2.1rem'}}>
                <div className={styles.contain_img}>
                    <img src='//img.ishanshan.com/gimg/img/e3e028b34366997371c284277a3e41f5' />
					<div className={styles.tip}>注册成功</div>
                </div>
                <div className={styles.footer}>
					<div>您已成功注册成为收银宝推广员，请长按</div>
					<div>保存下方海报至手机相册，并开始推广吧</div>
				</div>
				<GameQrcodeCont qrcodeInfo={qrcodeInfo} />
				{/*<div className={styles.card_info}>
					<img src="/thinknode/upload/imageProxy?src=https://img.ishanshan.com/gimg/img/f83e1838bda8f3dfa3fd59d8c632379e" />
					<div style={{backgroundImage:"url('/thinknode/upload/imageProxy?src=https://img.ishanshan.com/gimg/img/d359e1bbb051be6e78d603aafc741246')",backgroundSize:'contain',position:'absolute'}} className={styles.img_all}>
						<div className={styles.qrCode}>
							<QRCode value = {qrcodeInfo.payUrl} size = { 125 } />
						</div>
					</div>
				</div>*/}
            </div>
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
				<img src="/thinknode/upload/imageProxy?src=https://img.ishanshan.com/gimg/img/f83e1838bda8f3dfa3fd59d8c632379e" />
				<div style={{backgroundImage:"url('/thinknode/upload/imageProxy?src=https://img.ishanshan.com/gimg/img/d359e1bbb051be6e78d603aafc741246')",backgroundSize:'contain',position:'absolute'}} className={styles.img_all}>
					<div className={styles.qrCode}>
						<QRCode value = {qrcodeInfo.payUrl} size = { 125 } />
					</div>
				</div>
			</div>
		);

		return (
            <div className={styles.payCard} id="payCode_24322" >

                {div_to_img ?
                    image_render_cont
                     :
                    div_render_cont
                }
            </div>
        )
	}
}


export default ResultComponent;
