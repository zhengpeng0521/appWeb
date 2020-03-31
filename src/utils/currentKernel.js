export function CurrentKernel(){
    if (window.navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
        return 'ms';
    }
    //firefox
    if (window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
        return 'moz';
    }
    //Chrome || Safari
    if(window.navigator.userAgent.toLowerCase().indexOf("chrome") > -1 || window.navigator.userAgent.toLowerCase().indexOf("safari") > -1){
        return 'webkit';
    }
    //Opera
    if(window.navigator.userAgent.toLowerCase().indexOf("opera") > -1){
        return 'o';
    }
}

export function CurrentKernelCss(type,data){
    var obj = {};
    if (window.navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
        obj['-ms-' + type] = data;
    }
    //firefox
    else if (window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
        obj['-moz-' + type] = data;
    }
    //Chrome || Safari
    else if(window.navigator.userAgent.toLowerCase().indexOf("chrome") > -1 || window.navigator.userAgent.toLowerCase().indexOf("safari") > -1){
        obj['-webkit-' + type] = data;
    }
    //Opera
    else if(window.navigator.userAgent.toLowerCase().indexOf("opera") > -1){
        obj['-o-' + type] = data;
    }else{
        obj[type] = data;
    }
    return obj;
}
