import React from 'react';
import { connect } from 'dva';
import TwoCodePageComponent from '../../../components/weixin/twoCode/TwoCodePageComponent.js';
import styles from '../../../components/weixin/twoCode/twoCodePage.less';

class TwoCodePage extends React.Component{
	constructor(props){
		super(props);

		this.state = {
        	div_to_img: false,//是否转化为image
        	image_render_cont: undefined,
            urlCode:'',
        }
	}
	componentDidMount() {
//        this.qrcodeDivToImg();
	}

	qrcodeDivToImg() {
		let me = this;
        let qrcode_img_cont_455645432 = document.getElementById('qrcode_img_cont_455645432');
		 if(qrcode_img_cont_455645432) {

		 	html2canvas(qrcode_img_cont_455645432).then(function(canvas) {
                let image_data = canvas.toDataURL("image/png");
                me.setState({
                	div_to_img: true,
                	image_render_cont: (
                		<img className={styles.qrcode_image_show_cont} src={image_data} />
                	)
                });
            });
		 }
	}

	render(){
		const {div_to_img,image_render_cont} = this.state;
        let {
            codeImageUrl,
            codeUrl,
        } = window.init_data;
		return(
			<div>
                {div_to_img ?
                    image_render_cont
                 :
                 <TwoCodePageComponent urlCode={codeImageUrl} />
                }

            </div>
		)
	}

}
function mapStateToProps({ twoCodeModel }) {
    return { twoCodeModel };
}

export default TwoCodePage;
