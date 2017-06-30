(function () {
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var recalc = function () {
    var clientWidth = document.body.clientWidth;
    if(!clientWidth){
      return;
    }
    document.documentElement.style.fontSize = 50 * (clientWidth/375)+ 'px';
    document.documentElement.style.visibility = 'visible';
  }
  if(!document.documentElement.addEventListener){
    return;
  }
  window.addEventListener(resizeEvt,recalc,false);
  window.addEventListener('DOMContentLoaded',recalc,false);
})();

var VERSION="4.0.0";

document.writeln("<script src='/web/assets/js/jquery.min.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/assets/js/jweixin-1.0.0.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/assets/js/jquery.cookie.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/assets/js/config/host.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/assets/js/config.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/assets/js/function.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/assets/js/goto.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/assets/js/process_goto.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/assets/js/common.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/assets/js/doT.min.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/assets/js/dotdee.1.0.js?v=" + VERSION + "'><\/script>");
document.writeln('<link rel="stylesheet" type="text/css" href="/web/tianrongqipei/css/dotdee.1.0.css?v=' + VERSION + '">');

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

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?4808276e27817018256fbb21f2d0360a";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
