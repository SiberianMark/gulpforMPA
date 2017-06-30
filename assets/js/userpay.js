/**
 * 微信支付
 */
var payid = 1;//支付方式 1-马蹄 2-零钱 3-嘀卡 4-微信 5-支付宝 6-银联 7-易宝
var unpay_url='';
var openid='';
function wxPay(recharge) {
    showLoad('正在启动支付...');
    payid = recharge.payid;
    if(payid==4){
        payid=9;
    }
    if(payid==4 || payid==9){
        jsObj.platform = 'jsapi';
        openid = getOpenid();
    }else{
        jsObj.platform = 'web';
        var pageUrl = location.href.split('#')[0];
        pageUrl+='&unionpay=1';
        unpay_url=encodeURIComponent(pageUrl);
    }
    //获取微信支付参数
    jsonAjax(API.API_LIST.PAY_DKRECHARGE, {
        'userid': getUserid(),
        'openid': openid,
        'amount': recharge.num,
        'payid': payid,
        'return_url':unpay_url
    }, function (data) {
        if (data.status == 1) {
            if (payid == 4) {//微信支付
                inputTipsText('支付启动中...');
                call_WxPay(data);
            }else if(payid == 9){ //浦发银行微信支付
                inputTipsText('支付启动中...');
                callpay(data);
            }else if(payid >= 5){//银联支付|易宝支付|支付宝支付
                unionPay(data);
            }
            $('.inputTipsText').addClass('hide');//隐藏 '正在支付中...' 提示框
        }else{
            inputTipsText(data.info);
        }
    });
}

//银联支付跳转
function unionPay(data){
    if(payid==6||payid==5){
       $('body').append(data.data.result);
    }else if(payid==7){
        redirect(data.data.result);
    }
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
        jsApiCall(data);
    }
}

//调用微信JS api 支付
function jsApiCall(data){
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId": data.data.result.appId,     //公众号名称，由商户传入
            "timeStamp": data.data.result.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr": data.data.result.nonceStr, //随机串
            "package": data.data.result.package,
            "signType": data.data.result.signType,         //微信签名方式：
            "paySign": data.data.result.paySign //微信签名
        },
        function(res){
            WeixinJSBridge.log(res.err_msg);
            if(res.err_msg=='get_brand_wcpay_request:ok'){
                checkorder(data);
            }else if(res.err_msg=='get_brand_wcpay_request:cancel'){
                buy = 0;
                inputTipsText("已取消支付");
            }
        }
    );
}

function checkorder(data){
    var id = data?data.data.id:I('id');
    //检查订单支付状态
    jsonAjax(API.API_LIST.PAY_CHECKRECHARGE, {
        'userid': getUserid(),
        'id': id,
    }, function (data) {
        if (data.status == 1) {
            //进行跳转
            reGoto();
        } else {
            //支付确认中,启动定时器
            process(data?data.data:null);
        }
    });
}

function call_WxPay(data){
    //JS-SDK调起微信支付组件
    wx.chooseWXPay({
        timestamp: data.data.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.data.result.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.data.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: data.data.result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.data.result.paySign, // 支付签名
        success: function (res) {
            checkorder(data);
        },
        cancel: function (res) {
            buy = 0;
            inputTipsText("已取消支付");
        }
    });
}

//定时检查订单支付状态
function process(recharge) {
    inputTipsText('充值确认中，请稍候...');
    var t = setInterval(function () {
        jsonAjax(API.API_LIST.PAY_CHECKRECHARGE, {
            'userid': getUserid(),
            'id': recharge?recharge.id:I('id'),
        }, function (data) {
            if (data.status == 1) {
                //关闭定时器
                clearInterval(t);
                //进行跳转
                reGoto();
            } else {
                inputTipsText('充值确认中，请稍候...');
            }
        });
    }, 1000);
}

function reGoto () {
    var oV = I('oV','');
    inputTipsText('充值成功,正在进行跳转...');
    setInterval(function(){
        var obj = M();
        if(recharge.order_type == 901) {
            //收银台. 嘀卡充值
            obj.orderid = recharge.orderid;
            obj.merge_no = recharge.merge_no;
            obj.go_action = recharge.go_action;
            obj.go_param = recharge.go_param;
            Interface('gotoCashier', obj);
        }else{
            if(oV=='shop'){
                Interface('gotoMainDidi', obj);
            }else if(oV=='lottery'){
                Interface('gotoOneBuyMainlottery', obj);
            }if(oV=='pub_acct'){
                Interface('gotoMyPurse', obj);
            }else if(oV=='carsvc'){
                Interface('gotoCarRecharge', obj);
            }
        }
    },1000);
}