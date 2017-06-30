
//微信端统一支付入口js
//add by 何变
var orderid = I('orderid', 0);
var merge_no = I('merge_no', 0);
var go_action = I('go_action', 'gotoOneBuyPayment');
var buy = 0;
var order = null;
var payid = 1;//支付方式 1-马蹄 2-零钱 3-嘀卡 4-微信 5-支付宝 6-银联 7-易宝 8-易宝微信支付 9-浦发银行
var go_param = getGoParam();
var is_pub_acct=false;
var dialog=new Object();
var paymt=0;
var paymentpwd=0;
var unpay_url='';
var openid='';

$(document).ready(function () {
    //alert("pub_acct "+I('pub_acct','0')  +" "+ go_param.source);
    //console.log('go_param source:'+go_param.source);
    if(go_param.source=='f2f'||I('from_page','')=='pub-acct'){
        is_pub_acct=true;
        var f = document.createElement("script");
    　　f.setAttribute("type","text/javascript");
    　　f.setAttribute("src","/web/pub-acct/assets/js/goto.js?v=1.0.2");
    　　document.body.appendChild(f);
        console.log('pay from pub-acct, its goto.js load complete!');
    }
});

//确认支付fddfds

function dopay(mt) {
    if (order == null || buy == 1) return;
    buy = 1;
    if(payid==4 || payid==9){
        jsObj.platform = 'jsapi';
        openid = getOpenid();
    }else{
        jsObj.platform = 'web';
        var pageUrl = location.href.split('#')[0];
        pageUrl+='&unionpay=1';
        unpay_url=encodeURIComponent(pageUrl);
    }
    sync = 0; //0 异步  1同步
    //payid=payid==4?8:payid;
    jsonAjax(API.API_LIST.PAY_DOPAY, {
            'orderid': orderid,
            'merge_no': merge_no,
            'userid': getUserid(),
            'openid': openid,
            'mt': mt,
            'payid': payid,
            'sync': sync,
            'paymentpwd':paymentpwd,
            'return_url':unpay_url
        },
        function (data) {
            if (data.status == 1) {
                if (data.data.sync != undefined && data.data.sync == 0) { //异步处理
                    inputTipsText(data.info);
                    getPayParameter(payid, data.data.token);
                } else {
                    if (payid == 4) {//微信支付
                        inputTipsText('支付启动中...');
                        call_WxPay(data);
                    }else if(payid == 9){ //浦发银行微信支付
						inputTipsText('支付启动中...');
                        callpay(data);
					}else if(payid >= 5){//银联支付|易宝支付|支付宝支付
                        unionPay(data);
                    }else {
                        checkorder();//检查订单支付状态
                    }
                    $('.inputTipsText').addClass('hide');//隐藏 '正在支付中...' 提示框
                }
            } else {
                buy = 0;
                inputTipsText(data.info);
            }
        });
    setTimeout(function(){
        buy = 0;
    },5000);
}

//获取支付参数
function getPayParameter(payid, token) {
    var t = setInterval(function () {
        jsonAjax(API.API_LIST.GET_PAY_PARAMETER, {'userid': getUserid(), 'token': token}, function (data) {
            if (data.status == 1) {
                //关闭定时器
                clearInterval(t);
                if (payid == 4) {//微信支付
                    inputTipsText('支付启动中...');
                    call_WxPay(data);
                }else if(payid == 9){  //浦发银行微信支付
                    inputTipsText('支付启动中...');
                        callpay(data);
				}else if(payid >= 5){//支付宝支付|银联支付|易宝支付|易宝微信支付
                    unionPay(data);
                }else {
                    checkorder();//检查订单支付状态
                }
                $('.inputTipsText').addClass('hide');//隐藏 '正在支付中...' 提示框
            } else if (data.status == 0) {
                //关闭定时器
                clearInterval(t);
                inputTipsText(data.info);
            } else {
                inputTipsText(data.info);
            }
        });
    }, 2000);
}

//检查订单支付状态
function checkorder() {
    inputTipsText('支付确认中，请稍候...');
    go_param.payid = payid;
    jsonAjax(API.API_LIST.PAY_CHECKORDER, {
        'userid': getUserid(),
        'orderid': orderid,
        'merge_no': merge_no
    }, function (data) {
        //alert('checkorder status '+data.status);
        if (data.status == 1) {
            inputTipsText('支付成功正在进行跳转...');
            //进行跳转
            setTimeout(function () {
                //alert('checkorder is_pub_acct '+is_pub_acct);
                //alert('go_action '+go_action +" go_param"+JSON.stringify(go_param));
                if(!is_pub_acct){
                    doCallback(eval(go_action), go_param);
                }else{
                    gotolink(go_action,go_param);
                }
            }, 300);
        } else if (data.status == 2) {
            inputTipsText('支付成功正在进行跳转...');
            //处理一元拍的退款订单
            setTimeout(function () {
                if(!is_pub_acct){
                    doCallback(eval(go_action), go_param);
                }else{
                    gotolink(go_action,go_param);
                }
            }, 300);
        } else {
            process();
        }
    });
}

function process() {
    //支付确认中,启动定时器
    inputTipsText('支付确认中，请稍候...');
    var t = setInterval(function () {
        jsonAjax(API.API_LIST.PAY_CHECKORDER, {
            'userid': getUserid(),
            'orderid': orderid,
            'merge_no': merge_no
        }, function (data) {
            if (data.status == 1) {
                clearInterval(t);
                inputTipsText('支付成功正在进行跳转...');
                //进行跳转
                if(!is_pub_acct){
                    doCallback(eval(go_action), go_param);
                }else{
                    gotolink(go_action,go_param);
                }
            } else if (data.status == 2) {
                clearInterval(t);
                inputTipsText('支付成功正在进行跳转...');
                //处理一元拍的退款订单
                if(!is_pub_acct){
                    doCallback(eval(go_action), go_param);
                }else{
                    gotolink(go_action,go_param);
                }
            } else {
                //支付确认中,启动定时器
                inputTipsText('支付确认中，请稍候...');
            }
        });
    }, 1000);
}

//JS调起微信支付组件
function call_WxPay(data) {
    wx.chooseWXPay({
        timestamp: data.data.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.data.result.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.data.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: data.data.result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.data.result.paySign, // 支付签名
        success: function (res) {
            checkorder();
        },
        cancel: function (res) {
            buy = 0;
            inputTipsText("已取消支付");
        }
    });
}

//调用微信JS api 支付
function jsApiCall(data){
	WeixinJSBridge.invoke(
		'getBrandWCPayRequest', {
            "appId": data.appId,     //公众号名称，由商户传入
            "timeStamp": data.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr": data.nonceStr, //随机串
            "package": data.package,
            "signType": data.signType,         //微信签名方式：
            "paySign": data.paySign //微信签名
        },
		function(res){
			WeixinJSBridge.log(res.err_msg);
			if(res.err_msg=='get_brand_wcpay_request:ok'){
				checkorder();
			}else if(res.err_msg=='get_brand_wcpay_request:cancel'){
				buy = 0;
				inputTipsText("已取消支付");
			}
		}
	);
}

function callpay(data){
	if (typeof WeixinJSBridge == "undefined"){
		if( document.addEventListener ){
			document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		}else if (document.attachEvent){
			document.attachEvent('WeixinJSBridgeReady', jsApiCall);
			document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		}
	}else{
		jsApiCall(data.data.result);
	}
}

//银联支付跳转
function unionPay(data){
    if(payid==6||payid==5){
       $('body').append(data.data.result);
    }else if(payid==7){
        redirect(data.data.result);
    }
}

//获取跳转页面参数
function getGoParam() {
    var param = new Object();
    var reg = /(^|&)go_param.([^&]*)=([^&]*)/g;
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        param.push = function (o) {//Object动态添加键值-"key:value"
            if (typeof(o) == 'object') {
                //如果o是object
                for (var p in o) this[p] = o[p];
            } else if (typeof(o) == 'string') {
                //如果o是string e.g. "key:value"
                var _k = o.split(':')[0];
                var _v = o.split(':')[1];
                this[_k] = _v;
            }
        };
        for (var i in r) {
            var str = r[i].substr(1);
            if (str.indexOf('.') > -1 && str.indexOf('=') > -1) {
                var _k = str.split('=')[0].split('.')[1];
                var _v = str.split('=')[1];
                param.push(_k + ":" + _v);
            }
        }
    }
    return param;
}

/*check user has password or not*/
function checkHasPwd(mt){
    paymt=mt;
    jsonAjax(API.API_LIST.USER_MOREINFO,{'id':getUserid()},function(data){
        if(data.status==1){
            //data.data.has_paypwd=0;
            if(data.data.has_paypwd==0){//no password
                setPwdMsg();
            }else if(data.data.has_paypwd==1){//has password
                checkPwd();
            }
        }
    });
}
/*verify password popup dialog*/
function checkPwd(){
    //mui-active
    //mui-popup-in mui-popup-out
    var html='<div class="mui-popup">';
            html+='<div class="mui-popup-inner">';
            html+='<i></i>';
            html+='   <div class="mui-popup-title">提示</div>';
            html+='   <pre class="mui-popup-text">请输入支付密码</pre>';
            html+='</div>';
            html+='<div class="mui-popup-bott">';
                html+='<div class="verify-box">';
                html+='<div class="pwd-box">';
                html+='    <input type="tel"  maxlength="6" class="pwd-input" id="pwd-input" />';
                html+='    <div class="fake-box">';
                html+='       <input type="password" readonly="" border="ccc,top,left,bottom"/><input type="password" readonly="" border="ccc,top,left,bottom"/><input type="password" readonly="" border="ccc,top,left,bottom"/><input type="password" readonly="" border="ccc,top,left,bottom"/><input type="password" readonly="" border="ccc,top,left,bottom"/><input type="password" readonly="" border="ccc,all"/>'
                html+='    </div>';
                html+='</div>';
                html+='<div>下一步</div>';
                html+='</div>';
            html+='</div>';
        html+='</div>';
    html+='<div class="mui-popup-backdrop"></div>';
    if($('.mui-popup').length<=0){
        $('body').append(html);
    }
    showPopup();
}
/*input password*/
function enterPassword(){
    var $input = $(".fake-box input");
    $('.pwd-box>input').val('');
    $('.pwd-box>input').eq(0).focus();
    $("#pwd-input").on("input", function() {
        var pwd = $(this).val().trim();
        var len = pwd.length;
        len=len==0?1:len;
        var patt=new RegExp('\\d{1,'+len+'}','g');
        if(patt.test(pwd)){
            for (var i = 0; i < len; i++) {
                $input.eq(i).val(pwd[i]);
            }
        }else{
            $input.val('');
        }
        $input.each(function() {
            var index = $(this).index();
            if (index >= len) {
                $(this).val("");
            }
        });
        if(len==6){
            $(this).blur();
        }
    }).on('click',function(){
        $input.val('');
        $(this).val('');
    });
}
/*verify password*/
function verfiyEvent(){
    $('.mui-popup-inner>i').on('click',function(){
        hidePopup();
    });
    $('.verify-box>div').eq(1).on('click',function(){
        var value="";
        $('.fake-box input').each(function(i,item){
          value+=item.value;
        });
        if(value.length<6){
            $('.pwd-box>input').val('');
            $('.pwd-box>input').eq(0).focus();
            $('.fake-box input').each(function(i,item){
                item.value="";
            });
            return;
        }
        var obj=M();
        obj.id=getUserid();
        obj.password=value;
        obj.type=1;
        obj.appid=1;
        hidePopup();
        setTimeout(function(){
            jsonAjax(API.API_LIST.USER_PAYMENTPWD,obj,function(data){
                if(data.status==1){//success
                    paymentpwd=value;
                    dopay(paymt);
                }else if(data.status==3){//password error
                    errPwdMsg(data.info);
                }else if(data.status==2){//account locked
                    forgetPwdMsg(data.info);
                }
            });
        },1000);
    });
}
function showPopup(){
    $('.mui-popup-backdrop')[0].style.display='block';
    $('.mui-popup')[0].style.display='block';
    $('.mui-popup-backdrop').addClass('mui-active');
    setTimeout(function(){
        $('.mui-popup').addClass('mui-popup-in');
    },100);
    enterPassword();
    verfiyEvent();
}
function hidePopup(){
    $('.mui-popup-backdrop').removeClass('mui-active');
    $('.mui-popup').removeClass('mui-popup-in').addClass('mui-popup-out');
    $('.verify-box>div').unbind('click');
    setTimeout(function(){
        $('.mui-popup-backdrop').remove();
        $('.mui-popup').remove();
    },1000);
}
/*go to set password*/
function setPwdMsg(){
    dialog.title='';
    dialog.messge='你还未设置支付密码，是否立即去设置？';
    dialog.btnArray=['取消', '现在去设置'];
    dialog.leftBtn=function(){//left btn click
        hidePopup();
    };
    dialog.rightBtn=function(){ //right btn click
        var go=M();
        var obj = M();
        obj.orderid = orderid;
        obj.merge_no = merge_no;
        obj.go_action=go_action;
        obj.go_param=go_param;
        obj.from_page=from_page;
        obj.source=I('source','');
        go.cashier=obj;
        go.source=2;
        redirect('/web/pub-acct/set-password.html', go);
    };
    muiDialog(dialog);
}
/*input password err,remind left times*/
function errPwdMsg(){
    dialog.title='';
    dialog.btnArray=['忘记密码', '重新输入'];
    dialog.messge=arguments[0]?arguments[0]:'支付密码错误，您还可以输入3次密码。';
    dialog.leftBtn=function(){//left btn click
        var go=M();
        var obj = M();
        obj.orderid = orderid;
        obj.merge_no = merge_no;
        obj.go_action=go_action;
        obj.go_param=go_param;
        obj.from_page=from_page;
        obj.source=I('source','');
        go.cashier=obj;
        go.source=2;
        redirect('/web/pub-acct/retrieve-password.html', go);
    };
    dialog.rightBtn=function(){//right btn click
        hidePopup();
        setTimeout(function(){
           checkPwd();
       },1100);
    };
    muiDialog(dialog);
}
/*forget password and input err five times*/
function forgetPwdMsg(){
    dialog.title='';
    dialog.btnArray=['取消', '忘记密码'];
    dialog.messge=arguments[0]?arguments[0]:'支付密码不正确，已错误5次，请点击忘记密码进行找回或10分钟后重试。';
    dialog.leftBtn=function(){//left btn click
        hidePopup();
    };
    dialog.rightBtn=function(){//right btn click
        var go=M();
        var obj = M();
        obj.orderid = orderid;
        obj.merge_no = merge_no;
        obj.go_action=go_action;
        obj.go_param=go_param;
        obj.from_page=from_page;
        obj.source=I('source','');
        go.cashier=obj;
        go.source=2;
        redirect('/web/pub-acct/retrieve-password.html', go);
    };
    muiDialog(dialog);
}
function muiDialog(dialog){
    /*
    dialog.messge      提示信息
    dialog.title       提示标题
    dialog.btnArray    按钮文字
    dialog.leftBtn();  左边按钮点击回调函数
    dialog.rightBtn(); 右边按钮点击回调函数
     */
    mui.confirm(dialog.messge, dialog.title, dialog.btnArray, function(e) {
        if (e.index == 1) {
            dialog.rightBtn();
        }else{
            dialog.leftBtn();
        }
    });
}