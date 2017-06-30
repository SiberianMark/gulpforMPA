(function () {
	var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	var recalc = function () {
		var clientWidth = document.body.clientWidth;
		if(!clientWidth){
			return;
		}
		document.documentElement.style.fontSize = 10 * (clientWidth/320)+ 'px';
		document.documentElement.style.visibility = 'visible';
	}
	if(!document.documentElement.addEventListener){
		return;
	}
	window.addEventListener(resizeEvt,recalc,false);
	window.addEventListener('DOMContentLoaded',recalc,false);
})();


var VERSION= "4.0.0";

document.writeln("<script src='/web/pub-acct/assets/js/jquery.min.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/pub-acct/assets/js/jweixin-1.0.0.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/pub-acct/assets/js/jquery.cookie.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/pub-acct/assets/js/host.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/pub-acct/assets/js/config.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/pub-acct/assets/js/function.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/pub-acct/assets/js/goto.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/pub-acct/assets/js/process_goto.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/pub-acct/assets/js/common.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/pub-acct/assets/js/doT.min.js?v=" + VERSION + "'><\/script>");
document.writeln("<script src='/web/pub-acct/assets/js/dotdee.1.0.js?v=" + VERSION + "'><\/script>");
document.writeln('<link rel="stylesheet" type="text/css" href="/web/pub-acct/assets/css/dotdee.1.0.css">');

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?4808276e27817018256fbb21f2d0360a";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
