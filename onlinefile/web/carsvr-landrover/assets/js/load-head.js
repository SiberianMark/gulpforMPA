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


var VERSION= "4.0.0"
/*全项目统一使用的外部js库*/
document.writeln("<script src='/web/assets/js/jquery.min.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/assets/js/jweixin-1.0.0.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/assets/js/jquery.cookie.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/assets/js/doT.min.js?v=" + VERSION + "'><\/script>");
/*host配置js文件(全项目)*/
document.writeln("<script src='/web/assets/js/config/host.js?v=" + VERSION + "'><\/script>");
/*php提供的api接口总汇js文件(本项目)*/
document.writeln("<script src='/web/carsvc-landrover/assets/js/config.js?v=" + VERSION + "'><\/script>");
/*全项目统一使用的内部部js库*/
document.writeln("<script src='/web/assets/js/function.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/assets/js/common.js?v=" + VERSION + "'><\/script>");
/*本项目公用js文件*/
document.writeln("<script src='/web/carsvc-landrover/assets/js/goto.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/carsvc-landrover/assets/js/dotdee-car.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/carsvc-landrover/assets/js/share-bar-compent.js?v=" + VERSION + "'><\/script>");
/*本项目公用css文件*/
document.writeln('<link rel="stylesheet" type="text/css" href="/web/carsvc-landrover/assets/css/dotdee-car.css?v=' + VERSION + '">');
(function(){
	//By 何变
	//改进原来延时300毫秒再调用loadWxObject，js可能未加载完成。
	//这里会一直延时10毫秒去调用loadWxObject方法， forever !!
	this._load=false;
	this._itv=0;
	this.processL=function(){
		try{
			loadWxObject(false,false,false,true);//加载微信对象
			InitFloatBtn();
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
