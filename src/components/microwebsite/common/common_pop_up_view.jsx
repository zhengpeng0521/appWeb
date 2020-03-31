/**
 * 自定义popUpView
 * @param(string)      attrTitleString     (标题）
 * @param(string)      attrBottomString    (底部按钮文案）
 * @param(function)    attrButtonStyle     (自定义按钮样式)
 * @param(array)       attrDataSource     （传入的数据源） 必传
 * @param(function)    aSingleDataFunction（获取点击的行数据事件）
 * @param(object)      aBottomFunction    （取消点击事件）
 * @param(bool)        attrMaskClose      （点击蒙层是否关闭）
 */

import React from 'react';
import styles from './common_pop_up_view.less';
import { Button } from "antd-mobile";

class MicroPopUpViewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _attrBottomString   : this.props.attrBottomString || '',
            _attrDataSource     : this.props.attrDataSource || [],
            _attrShowPopUpModal : false,
            _attrFirstTouch     : true,
            _attrTitleString    : this.props.attrTitleString || '',
            _attrButtonStyle    : this.props.attrButtonStyle || undefined,
            _attrMaskClose      : this.props.attrMaskClose || true,
            _attrSelectValue    : undefined,
        }
        this.rowEvent = this.rowEvent.bind(this);
        this.bottomButtonFunction = this.bottomButtonFunction.bind(this);
        this.popViewFunction = this.popViewFunction.bind(this);
        this.maskCloseFunction = this.maskCloseFunction.bind(this);  
        this.clearRowStyle = this.clearRowStyle.bind(this);  
    }
    componentWillReceiveProps(nextProps) {
        // console.info('22222')
        this.setState({
            _attrDataSource: nextProps.attrDataSource
        })
    }
    componentDidMount() {
        // console.info('11111')
        console.info('isSaveBaby---',this.props.isSaveBaby)
        if(this.props.isSaveBaby) {
            this.setState({
                _attrFirstTouch: false,
                _attrShowPopUpModal: !this.state._attrShowPopUpModal
            })
        }
    }
    bottomButtonFunction() {
        this.setState({
            _attrShowPopUpModal: !this.state._attrShowPopUpModal,
        })
        //取消
        this.props.aBottomFunction && this.props.aBottomFunction();
    }

    rowEvent(item, index) {

        if (item.disabled) {

        } else {
            let element = document.getElementById('pop_up_view_row' + index);
            element.style.backgroundColor = 'rgb(219, 214, 214)';
            this.setState({
                _attrShowPopUpModal : !this.state._attrShowPopUpModal,
                _attrSelectValue    : item.name,
            })
            //获取
            this.props.aSingleDataFunction&&this.props.aSingleDataFunction(item);
        }
    }

    popViewFunction() {
        this.clearRowStyle();
        this.setState({
            _attrFirstTouch: false,
            _attrShowPopUpModal: !this.state._attrShowPopUpModal,
        })
    }

    clearRowStyle() {
        for (let idx in this.state._attrDataSource) {
            let element = document.getElementById('pop_up_view_row' + idx);
            element.style.backgroundColor = 'white';
        }
    }

    maskCloseFunction() {
        if (this.state._attrMaskClose) {
            this.setState({
                _attrShowPopUpModal: !this.state._attrShowPopUpModal,
            })
        }
    }

    render() {
        
        let _attrShowPopUpModal = this.state._attrShowPopUpModal;

        let _totalHeight = this.state._attrDataSource && this.state._attrDataSource.length * 88 + 20 + 98 + 20;
        // console.info('_attrShowPopUpModal',_attrShowPopUpModal)
        if (_attrShowPopUpModal) {
            document.addEventListener('touchmove', function (event) {
                event.preventDefault();
            })
        } else {
            document.addEventListener('touchmove', function (e) {
                e.returnValue = true;
            });
        }

        return (
            <div>
                <div className={styles.pop_up_view_row_content} onClick={this.popViewFunction}>
                    <p className={styles.pop_up_view_row_left}>{this.state._attrTitleString || ''}</p>
                    <p className={styles.pop_up_view_row_right}>{this.state._attrSelectValue || ''}
                        <svg aria-hidden="true"
                            style={{ float: 'right', marginTop: 30, width: 30, height: 30, transform: 'rotate(-90deg)', marginLeft: '10px' }}>
                            <use xlinkHref="#anticon-arrow"></use>
                        </svg>
                        
                    </p>
                </div> 
                <div className={this.state._attrFirstTouch ? styles.pop_up_view_none : _attrShowPopUpModal ? styles.pop_up_view_ani : styles.pop_up_view} onClick={this.maskCloseFunction}>
                    <div className={_attrShowPopUpModal ? styles.pop_up_view_box_ani : styles.pop_up_view_box} style={{ 
                            height: _totalHeight,
                            bottom: -_totalHeight + 'px',
                        }}>
                        <div className={styles.pop_up_view_total_row}>
                            {
                                this.state._attrDataSource.map((item, index) => {
                                    let _fc = item.disabled&&item.disabled ? { color: '#DDD' } : { color: '#333' };
                                    let _spanfc = item.disabled&&item.disabled ? { color: '#DDD' } : { color: '#999' };
                                    return <a  id={`pop_up_view_row${index}`} key={index}
                                                className={styles.pop_up_view_row_style}
                                                onClick={ this.rowEvent.bind(this, item, index)}>
                                                <p className={styles.pop_up_view_row_style_p} style={_fc}>{item.name}
                                                <span className={styles.pop_up_view_row_style_span} style={_spanfc}>
                                                    {
                                                        (item.joinStatus == "0" || item.joinStatus == 0 || item.joinStatus == "4" || item.joinStatus == 4 )
                                                            ? '立即报名'
                                                            :
                                                        (item.joinStatus == "1" || item.joinStatus == 1)
                                                            ? '等位中'
                                                            :
                                                        (item.joinStatus == "2" || item.joinStatus == 2)
                                                            ? '已报名'
                                                            :
                                                        (item.joinStatus == "3" || item.joinStatus == 3)
                                                            ? '待支付'
                                                            : ''
                                                    }
                                                    </span>
                                                </p>
                                            </a>
                                })
                            }
                        </div>
                        <div className={styles.pop_up_view_button} onClick={this.bottomButtonFunction} style={{ ...this.state._attrButtonStyle }}>{this.state._attrBottomString}</div>
                    </div>
                </div>
            </div>
        )
    }
} 

export default MicroPopUpViewComponent;
