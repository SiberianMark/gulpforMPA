/**
 * Created by didi on 2015/12/20.
 */
var wait = 60;//时间
var text;//内容
var message = true;
var regex = /(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;//手机号
var num = /^\d{4}$/;//字母数字
var code;//验证码
var mobile;//手机号
var picCode;//图形验证码
var scode;//服务器验证码
var isvoice = 0;//语音判断
var source=I('source');
var gender=0;
var address=decodeURIComponent(I('address'));//地址



//短信验证
$(".ph-yz").on('click',function () {
    mobile = $(".in-ph").val();
    picCode = $(".in-pic").val();
    mobmessage(mobile, isvoice , picCode,this);
});


//语音验证
$(".ph-md").on('click',function () {
    picCode = $(".in-pic").val();
    mobile = $(".in-ph").val();
    isvoice = 1;
    mobmessage(mobile, isvoice, picCode, this);
});

$("#modal-Pop").on('click',function () {
    $(this).hide();
});

//倒计时
function time() {
    if (wait == -1) {
        $(".ph-yz").text("验证").css("background-color", "#f55");
        message = true;
        //console.log(message);
        wait = 60;
    } else {
        $(".ph-yz").text(wait + "s").css("background-color", "#999");
        if (wait == 40) {
            $(".ph-md").css("visibility", "visible");
        }
        wait--;
        setTimeout(function () {
            time()
        }, 1000);
    }
}
function onStart() {
    $('#picCode').attr('src',API.SERVER_URL+'gold/public/verify');
    if(source=='car'){
        $('.ext').show();
    }
    loadEnd();
}


//提交
$(".tj-btn").on('click',function () {
    changeBg('#ff9402','#f55',$(this));
    if($('#boy').is(':checked')){
        gender=1;
    }else if($('#girl').is(':checked')){
        gender=2;
    }
    code = $(".code").val();
    telphone = $("#telphone").val();
    //未绑定用户
    if (code.length==4&&!isNaN(code)) {
        mobile = $(".in-ph").val();
        phone(mobile,code); //绑定手机号
    } else {
        $("#modal-Pop").show();
        $(".pop-cover").text("验证码错误!");
    }
});

//提交信息
function mobmessage(mobile, isvoice, picCode, obj) {
    if (mobile.length == 11 && regex.test(mobile) && picCode.length == 4 && !isNaN(picCode) ) {
        if (message) {
            message = false;
            //console.log(message);
            jsonAjax(API.API_LIST.PHONE_NUMBER, {mobile: mobile, isvoice: isvoice,code: picCode}, function (data) {
                if (data.status == 1) {
                    if(isvoice){
                        $("#modal-Pop").show();
                        $(".pop-cover").text("等待语音验证码!");
                    }else{
                        time(obj);
                    }
                    //scode = data.data;
                } else {
                    message = true;
                    inputTipsText(data.info);
                }
            });
        }
    }
    else {
        if (picCode.length != 4) {
            $(".modal").show();
            $(".pop-cover").text("请填写正确验证码");
            return false;
        }
        if (mobile.length == 0) {
            $(".modal").show();
            $(".pop-cover").text("请填写手机号码");
            return false;
        } else {
            $(".modal").show();
            $(".pop-cover").text("请输入正确的手机号");
            return false;
        }
    }
}

var clicked=false;
//绑定电话
function phone(mobile,code) {
    $("#modal-Pop").show();
    $(".pop-cover").text("正在处理中...");
    if(clicked){
        return;
    }
    clicked=true;
    jsonAjax(API.API_LIST.BING_PHONE, {mobile: mobile, openid: getOpenid(),password:code,sex:gender,nickname:$('#nick').val()}, function (data) {
        if (data.status == 1) {
            //更改userid

            setUserid(data.data);
            //无需地址添加时绑定成功进行跳转
            var obj = M();
            if(I('redirect') == 'balcony_buy'){
                obj.goods_id=I('goods_id',0);
                Interface('gotoOneGoodsDetail',JSON.stringify(obj));
            }else if(I('redirect') == 'lottery'){
                if(I('source')=='car'){
                    obj.source=I('source','');
                }
                obj.periodid=I('periodid',0);
                Interface('gotoOneBuyGoodMsg',JSON.stringify(obj));
            }else if(I('redirect') == 'balcony'){
                obj.periodid=I('periodid',0);
                Interface('gotoBalconyInfo',JSON.stringify(obj));
            }else if(I('redirect') == 'lottery-myinfo'){
                obj.userid = getUserid();
                Interface('gotoOneBuyMainlottery');
            }else if(I('redirect') == 'guess'){
                Interface('gotoGuess');
            }else if(I('redirect') == 'MainDidi'){
                obj.userid = getUserid();
                Interface('gotoMainDidi');
            }else if(I('redirect') == 'fight_exps'){
                Interface('gotoBqMain');
            }else if(I('redirect') == 'fight_exps_low'){
                Interface('gotoLowBqMain');
            }else if(I('redirect') == 'fight_exps_mid'){
                Interface('gotoMidBqMain');
            }else if(I('redirect') == 'fight_exps_high'){
                Interface('gotoHighBqMain');
            }else if(I('redirect') == 'shopcart'){/*购物车*/
                Interface('gotoOneBuyShopCart');
            }else if(I('redirect') == 'technician'){
                obj.pid=I('pid');
                obj.latitude=I('latitude');
                obj.longitude=I('longitude');
                obj.address=address;
                redirect('/web/technician/loadmachine.html',obj);
            }else if(I('redirect') == 'CarServiceGoodsOrder'){/*汽车服务订单提交页面*/
                obj.id=I('id');
                obj.product_id=I('product_id');
                Interface('gotoCarGoodsOrder',JSON.stringify(obj));
            }else if(I('redirect')=='put-acct-myinfo'){/*专属公众号--嘀卡充值*/
                obj.oV=I('oV','pub_acct');
                obj.pub_acct=1;
                Interface('gotoDKRecharge',JSON.stringify(obj));
            }else if(I('redirect')=='task'){/*任务系统*/
                obj.isshare=1;
                Interface('gotoTask',JSON.stringify(obj));
            }else if(I('redirect')=='fightexps'){/*任务系统--跳转到表情包首页*/
                obj.isshare=1;
                Interface('gotoBqIndex',JSON.stringify(obj));
            }else if(I('redirect')=='LiveList'){/*任务系统--跳转到虚拟专区*/
                obj.tid=I('paramid');
                Interface('gotoLiveList',JSON.stringify(obj));
            }else if(I('source')=='holiday') {
                obj.source=I('source','');
                obj.activity_id=I('id','');
                Interface('gotosmdgActivityDetail', obj);
            }else if(I('status_mobile')=='status_mobile'){
                Interface('gotoChangeMT');/*返回唐币兑换*/
            }else{
                Interface('gotoMallHome', obj);
            }
        }else{
            inputTipsText(data.info);
        }
    });
    setTimeout(function(){
        clicked=false;
        $("#modal-Pop").hide();
    },5000);
}

function fleshVerify(){
    //重载验证码
    var time = new Date().getTime();
    document.getElementById('picCode').src= API.SERVER_URL+'gold/public/verify/'+time;
}
