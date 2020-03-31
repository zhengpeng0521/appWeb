export function matchingIcon(name) {

	let icon_name = '';
	switch(name) 
	{ 
		case '母婴室': 
			icon_name = 'babyroom';
			break; 
		case 'TV监视器': 
			icon_name = 'Monitor';
			break; 
		case '公园绿地': 
			icon_name = 'PublicPark';
			break; 
		case '门禁': 
			icon_name = 'Insertmemorycard';
			break; 
		case '茶水间': 
			icon_name = 'coffee';
			break; 
		case '休息室': 
			icon_name = 'Sofa';
			break; 
		case '电脑上网': 
			icon_name = 'Laptop';
			break; 
		case '逃生设备': 
			icon_name = 'Stairsdown';
			break; 
		case '急救包': 
			icon_name = 'Firstaidhandbag';
			break; 
		case '餐饮': 
			icon_name = 'Foodtraywithcover';
			break; 
		case '美容美发': 
			icon_name = 'BigHandMirror';
			break; 
		case '停车场': 
			icon_name = 'Parkingsignfreeic';
			break; 
		case '安全防护': 
			icon_name = 'heart';
			break; 
		case '便利店': 
			icon_name = 'Shop';
			break; 
		case 'WiFi': 
			icon_name = 'WI-FI';
			break; 
		case '地铁': 
			icon_name = 'transporttrain';
			break; 
		case '宝宝卫生间': 
			icon_name = 'Toilet';
			break; 
		default: 
	} 
		
	return icon_name;
}

