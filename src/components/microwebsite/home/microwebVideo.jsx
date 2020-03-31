import React from 'react';
// import { Player } from 'video-react';
import styles from './microwebsteComponent.less';
class microwebVideo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            poster: ''
        }
    }

    // componentDidMount() {
    //     var video = document.getElementsByClassName('video')[0]
    //     // var video = this.refs.video
    //     const that = this
    //     console.log(video)
    //     // //监听页面加载事件
    //     video.addEventListener("loadeddata", function () {
    //         alert(1)
    //         //创建一个画布
    //         const canvas = document.createElement('canvas');
    //         alert(2)
    //         canvas.width = 300;
    //         canvas.height = 300 
    //         canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    //         alert(3)
    //         const poster = canvas.toDataURL()
    //         // video.poster = canvas.toDataURL()
    //         console.log(poster)
    //         alert(4)
    //         that.setState({
    //             poster
    //         })
    //     });
    // }
    // loadeddata(e) {
    //    onLoadedData={this.loadeddata.bind(this)} 
    // const canvas = document.createElement('canvas');
    // alert(2)
    // // console.log(e.target)
    // canvas.width = 300;
    // canvas.height = 300;
    // canvas.getContext('2d').drawImage(e.target, 0, 0, canvas.width, canvas.height);
    // alert(3)
    // const poster = canvas.toDataURL()
    // // video.poster = canvas.toDataURL()
    // alert(4)
    // this.setState({
    //     poster
    // })
    // }
    videoClick(url) {
        window.open(url)
    }
    render() {
        return (
            // <a href={this.props.ingurl} target="_blank" style={{ width: "100%",height:"100%" }}>
            <div style={{ position: "relative",width:"100%",height:"100%"}}>
                <video style={{ objectFit: "fill", background: "rgba(0,0,0,.8)", borderRadius: "10px" }} className="video" width="100%" height="100%" >
                    <source src={this.props.ingurl} type="video/mp4" />
                </video>
                <img onClick={this.videoClick.bind(this, this.props.ingurl)} src="http://img.ishanshan.com/gimg/n/20190729/57a0a9e3929437e627aed14e68828f6d" alt="" style={{ position: "absolute", width: "70px", height: "70px", left: "50%", top: "50%",transform:"translate(-50%, -50%)" }} />
            </div>
            // </a>
            // <Player width={264} height={170} src={this.props.ingurl} />
        )
    }
}

export default microwebVideo