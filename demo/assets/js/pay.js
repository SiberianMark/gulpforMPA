/**
 * 微信支付
 */

/**
 * 微信支付
 */
function wxPay(order) {
    var flag = arguments[1] ? arguments[1] : 0;
    showLoad('正在启动微信支付');
    //获取微信支付参数
    jsonAjax(API.API_LIST.WXPAY_DOPAY, {
        'userid': getUserid(),
        'openid': getOpenid(),
        'orderid': order.orderid,
        'merge_no': order.merge_no
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
                    jsonAjax(API.API_LIST.WXPAY_CHECKORDER, {
                        'userid': getUserid(),
                        'orderid': order.orderid,
                        'merge_no': order.merge_no
                    }, function (data) {
                        if (data.status == 1) {
                            //进行跳转
                            var obj = M();
                            if (order.order_type == 2) {
                                showLoad('支付成功正在进行跳转...');
                                //送出礼物
                                obj.orderid = order.orderid;
                                obj.merge_no = order.merge_no;
                                Interface('gotoSend', obj);
                            }else if(order.order_type == 40){
                                //一元购支付成功跳转
                                obj.orderid = order.orderid;
                                obj.id=order.id;
                                //专场处理
                                if(data.data.is_pakeage==1){
                                    Interface('gotoEndBalcony',obj);
                                }else{
                                    Interface('gotoOneBuyPayment',obj);
                                }
                            }else {
                                //店铺推广
                                processBrand();
                            }
                        // 处理一元拍的退款订单
                        } else if(data.status == 2){
                            //一元购支付成功跳转
                            obj.orderid = order.orderid;
                            obj.id=order.id;
                            Interface('gotoOneBuyPayment',obj);
                        } else {
                            inputTipsText(data.info);
                            //支付确认中,启动定时器
                            process(order);
                        }
                    });
                },
                cancel: function (res) {
                    buy = 0;
                    try{
                       $('#btn_submmit .submmit').slideDown(200);
                    }catch(e){}
                    if (flag == 1) {
                        if (order.order_type == 2) {
                            //从确认订单页面过来跳转到上一个页面
                            history.go(-1);
                        } else {
                            //从确认订单页面过来跳转到订单列表页面
                            Interface('gotoOrderList');
                        }
                    } else {
                        inputTipsText("已取消支付");
                    }
                }
            });
        } else if (data.status == 2) {
            showLoad('支付成功正在进行跳转...');
            //进行跳转
            if (order.order_type == 2) {
                //送出礼物
                var obj = M();
                obj.orderid = order.orderid;
                obj.merge_no = order.merge_no;
                Interface('gotoSend', obj);
            } else {
                //店铺推广
                var obj = M();
                obj.orderid = order.orderid;
                Interface('gotoWBExtsion', obj);
            }
        } else {
            inputTipsText(data.info);
        }
    });
}

//定时检查订单支付状态
function process(order) {
    var t = setInterval(function () {
        jsonAjax(API.API_LIST.WXPAY_CHECKORDER, {
            'userid': getUserid(),
            'orderid': order.orderid,
            'merge_no': order.merge_no
        }, function (data) {
            if (data.status == 1) {
                //关闭定时器
                clearInterval(t);
                //进行跳转
                var obj = M();
                if (order.order_type == 2) {
                    showLoad('支付成功正在进行跳转...');
                    //送出礼物

                    obj.orderid = order.orderid;
                    obj.merge_no = order.merge_no;
                    Interface('gotoSend', obj);
                }
                else if(order.order_type == 40){
                    //一元购支付成功跳转
                    showLoad('支付成功正在进行跳转...');
                    //一元购支付成功跳转
                    obj.orderid = order.orderid;
                    obj.id=order.id;
                    //专场处理
                    if(data.data.is_pakeage==1){
                        Interface('gotoEndBalcony',obj);
                    }else{
                        Interface('gotoOneBuyPayment',obj);
                    }
                }else {
                    //店铺推广
                    processBrand();
                }
            // 处理一元拍的退款订单
            } else if(data.status == 2){
                //一元购支付成功跳转
                obj.orderid = order.orderid;
                obj.id=order.id;
                Interface('gotoOneBuyPayment',obj);
            }
        });
    }, 1000);
}

function processBrand() {
    return true;
    /*showLoad("支付确认中，请稍候...");
    var t = setInterval(function () {
        jsonAjax(API.API_LIST.WEIXIN_SPREAD, {'userid': getUserid(), 'page': 1}, function (data) {
            if (data.status == 1) {
                //关闭定时器
                clearInterval(t);
                showLoad('支付成功正在进行跳转...');
                //进行跳转 店铺推广
                var obj = M();
                obj.orderid = order.orderid;
                Interface('gotoWBExtsion', obj);
            }
        });
    }, 1000);*/
}

