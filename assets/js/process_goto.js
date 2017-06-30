/*
 *
 * 本文件用于定义支付完成后并非单一的调用Interface进行跳转页面的js全局方法。
 * (单一进行跳转页面的方法定义在goto.js中)
 * add by 何变
 *
 *processBrand
 *跳转到店铺推广页面
 *由于生成店铺推广信息存在延迟，这里要判断数据生成成功后
 *才进入店铺推广页面
 *备注:项目中如有有其它类似的情况，支付完成后还需要进行其它操作的，
 *都统一在这个js文件(process_goto.js)中定义处理方法，然后传递方法名，参数到收银台页面中转处理。
*/
function processBrand(param) {
    showLoad("支付确认中，请稍候...");
    var t = setInterval(function () {
        jsonAjax(API.API_LIST.WEIXIN_SPREAD, {'userid': getUserid(), 'page': 1}, function (data) {
            if (data.status == 1) {
                //关闭定时器
                clearInterval(t);
                showLoad('支付成功正在进行跳转...');
                //进行跳转 店铺推广
                var obj = M();
                obj.orderid = param.orderid;
                Interface('gotoWBExtsion', obj);
            }
        });
    }, 1000);
}