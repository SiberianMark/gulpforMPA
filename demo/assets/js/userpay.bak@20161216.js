/**
 * 微信支付
 */
var payid = 1;//支付方式 1-马蹄 2-零钱 3-嘀卡 4-微信 5-支付宝 6-银联 7-易宝
var unpay_url='';
function wxPay(recharge) {
    var flag = arguments[1] ? arguments[1] : 0;
    showLoad('正在启动微信支付');
    jsObj.platform = 'jsapi';
    //获取微信支付参数
    jsonAjax(API.API_LIST.PAY_DKRECHARGE, {
        'userid': getUserid(),
        'openid': getOpenid(),
        'amount': recharge.num,
        'payid': recharge.payid
    }, function (data) {
        if (data.status == 1) {
            //JS 调起微信支付组件
            wx.chooseWXPay({
                timestamp: data.data.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: data.data.result.nonceStr, // 支付签名随机串，不长于 32 位
                package: data.data.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: data.data.result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: data.data.result.paySign, // 支付签名
                success: function (res) {
                    //检查订单支付状态
                    jsonAjax(API.API_LIST.PAY_CHECKRECHARGE, {
                        'userid': getUserid(),
                        'id': data.data.id,
                    }, function (data) {
                        if (data.status == 1) {
                            //进行跳转
                            reGoto();
                        } else {
                            inputTipsText(data.info);
                            //支付确认中,启动定时器
                            process(data.data);
                        }
                    });
                },
                cancel: function (res) {
                    buy = 0;
                    inputTipsText("已取消支付");
                }
            });
        }
        else{
            inputTipsText(data.info);
        }
    });
}

//定时检查订单支付状态
function process(recharge) {
    var t = setInterval(function () {
        jsonAjax(API.API_LIST.PAY_CHECKRECHARGE, {
            'userid': getUserid(),
            'id': recharge.id,
        }, function (data) {
            if (data.status == 1) {
                //关闭定时器
                clearInterval(t);
                //进行跳转
                reGoto();
                // inputTipsText("充值成功!");
                // setInterval(function(){
                //     var obj = M();
                //     Interface('gotoOneBuyMainlottery', obj);
                // },1000);
            } else {
                inputTipsText(data.info);
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
            obj.go_param = recharge.go_param;
            Interface('gotoCashier', obj);
        }else{
            if(oV=='shop'){
                Interface('gotoMainDidi', obj);
            }else if(oV=='lottery'){
                Interface('gotoOneBuyMainlottery', obj);
            }if(oV=='pub_acct'){
                Interface('gotoMyPurse', obj);
            }
        }
    },1000);
}