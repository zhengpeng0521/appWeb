import React from 'react';
class licrowebVideo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            poster: ''
        }
    }

    videoClick(url) {
        window.open(url)
    }
    render() {
        return (
            <div style={{ position: "relative",width:"100%",height:"100%"}}>
                <video style={{ objectFit: "fill", background: "rgba(0,0,0,.8)", borderRadius: "10px" }} className="video" width="100%" height="100%" >
                    <source src={this.props.ingurl} type="video/mp4" />
                </video>
                <img onClick={this.videoClick.bind(this, this.props.ingurl)} src="http://img.ishanshan.com/gimg/n/20190729/57a0a9e3929437e627aed14e68828f6d" alt="" style={{ position: "absolute", width: "70px", height: "70px", left: "50%", top: "50%",transform:"translate(-50%, -50%)"}} />
            </div>
        )
    }
}

export default licrowebVideo