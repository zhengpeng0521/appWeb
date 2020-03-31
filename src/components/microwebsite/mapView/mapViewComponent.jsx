import React from 'react';
import styles from './mapViewComponent.less';

function MicroMapViewComponent({

	dp,
	orgName,
	address,
	city,
	lng,
	lat,
	
}) {

	function navigation() {
				
		if(lng > 0 && lat > 0) {
			window.location.href = `https://api.map.baidu.com/direction?origin=latlng:${cuerrentLat},${cuerrentLng}|name:当前位置&destination=latlng:${lat},${lng}|name:${address}&mode=driving&origin_region=${currentCity}&destination_region=${city}&output=html&src=shanshan`;
		} else {
			window.location.href =  `https://api.map.baidu.com/geocoder?address=${address}&output=html&src='shanshan'`;
		}		
	}
		
	return(
		<div className={styles.map_box}>
			<div className="js_map_view" id="base_map"></div>
			<div className={styles.mapBottomView}>
				<div className={styles.mapView_orgName}>{orgName}</div>
				<div className={styles.mapView_orgAddress}>{address}</div>
				<div className={styles.mapViewMapBtn} onClick={() => navigation()}>地图导航</div>
			</div>
		</div>
    );
}


export default MicroMapViewComponent;
