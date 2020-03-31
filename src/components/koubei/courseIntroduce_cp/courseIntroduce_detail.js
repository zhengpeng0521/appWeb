import React, {PropTypes} from 'react';
import courseDetailStyle from './courseIntroduce_detail.less';
import MaaComponent from '../koubeiComponent_cp/koubeiComponent';
import SupplierComponent from '../supplier_cp/supplier';

function CourseDetail({
	courseDetailData,
	alipayUserId,
	course_id,
	shop_id,
	tenant_id,
	isShowMaa,
	merchant_pid,
}) {

	let maaProps = {
		alipayUserId,
		shop_id,
		merchant_pid,
	};

	let isSM = {
		isShowMaa,
	};

	let data = (courseDetailData && courseDetailData.course_detail != null) ? courseDetailData.course_detail : null;
	return(
        <div>
			<p className={courseDetailStyle.course_title}>{courseDetailData.course_name}</p>
			{data != null ? <p className={courseDetailStyle.course_content_p} dangerouslySetInnerHTML={{__html: courseDetailData&&courseDetailData.course_detail&&courseDetailData.course_detail.replace(/\n/g,'<br/>')}} /> : ''}
			<SupplierComponent {...isSM}/>
			{isShowMaa ? <MaaComponent {...maaProps}/> : ''}
        </div>
    );   
} 

CourseDetail.propTypes = {
	courseDetailData     : PropTypes.any,
	isShowMaa			 : PropTypes.any,
};
  
export default CourseDetail;
