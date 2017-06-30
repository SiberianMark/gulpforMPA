(function () {
	var dw = 750;
	var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	var recalc = function () {
		var clientWidth = document.body.clientWidth;console.log('clientWidth',clientWidth,'designWidth',dw);
		if(!clientWidth){
			return;
		}
		document.documentElement.style.fontSize = 10 * (clientWidth/(dw/2))+ 'px';
		console.log(clientWidth,dw,10 * (clientWidth/(dw/2)));
		document.documentElement.style.visibility = 'visible';
	}
	if(!document.documentElement.addEventListener){
		return;
	}
	window.addEventListener(resizeEvt,recalc,false);
	window.addEventListener('DOMContentLoaded',recalc,false);
})();
var VERSION=2.4.3;
/*全项目统一使用的外部js库*/
document.writeln("<script src='/web/assets/js/jquery.min.js?v=2.3.9'><\/script>");
document.writeln("<script src='/web/assets/js/jweixin-1.0.0.js?v=2.3.9'><\/script>");
document.writeln("<script src='/web/assets/js/jquery.cookie.js?v=2.3.9'><\/script>");
document.writeln("<script src='/web/assets/js/doT.min.js?v=2.3.9'><\/script>");
/*host配置js文件(全项目)*/
document.writeln("<script src='/web/assets/js/config/host.js?v=2.3.9'><\/script>");
/*php提供的api接口总汇js文件(本项目)*/
document.writeln("<script src='/web/car-service/assets/js/config.js?v=3.0.0'><\/script>");
/*全项目统一使用的内部部js库*/
document.writeln("<script src='/web/assets/js/function.js?v=2.4.0'><\/script>");
document.writeln("<script src='/web/assets/js/common.js?v=2.4.0'><\/script>");
/*本项目公用js文件*/
document.writeln("<script src='/web/car-service/assets/js/goto.js?v=3.0.0'><\/script>");
document.writeln("<script src='/web/car-service/assets/js/dotdee-car.js?v=3.0.0'><\/script>");
document.writeln("<script src='/web/car-service/assets/js/share-bar-compent.js?v=3.0.0'><\/script>");
/*本项目公用css文件*/
document.writeln('<link rel="stylesheet" type="text/css" href="/web/car-service/assets/css/dotdee-car.css?v=3.0.0">');
(function(){
	//By 何变
	//改进原来延时300毫秒再调用loadWxObject，js可能未加载完成。
	//这里会一直延时10毫秒去调用loadWxObject方法， forever !!
	this._load=false;
	this._itv=0;
	this.processL=function(){
		try{
			loadWxObject();//加载微信对象
			this._load=true;
		}catch(e){
			this._load=false;
			clearTimeout(this._itv);
			this._itv=setTimeout(function(){
				this.processL();
			},10);
		}
	}
	this.processL();
})();
/*百度统计公用js生成*/
/*var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?4808276e27817018256fbb21f2d0360a";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();*/
