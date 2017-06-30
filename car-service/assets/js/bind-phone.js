/**
 * Created by zhouzelin on 2016/7/31.
 */
var wait = 60;//时间
var text;//内容
var message = true;
var regex = /(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;//手机号
var code;//验证码
var mobile;//手机号
var picCode;//图形验证码
var isvoice = 0;//语音判断
var source=I('source');
var gender=0;


////短信验证
//$(".getCode").on('click',function () {
//    mobile = $("input[name='mobile']").val();
//    if (mobile.length == 11 && regex.test(mobile)) {
//        if (message) {
//            time(this);
//            message = false;
//            //console.log(message);
//            mobmessage(mobile, isvoice);
//        }
//    }
//    else {
//        if (mobile.length == 0) {
//            $(".modal").show();
//            $(".pop-cover").text("请填写手机号码");
//        } else {
//            $(".modal").show();
//            $(".pop-cover").text("请输入正确的手机号");
//        }
//    }
//});

//短信验证
$(".getCode").on('click',function () {
    mobile = $("input[name='mobile']").val();
    picCode = $(".in-pic").val();
    mobmessage(mobile, isvoice , picCode,this);
});

$("#modal-Pop").on('click',function () {
    $(this).hide();
});

//倒计时
function time() {
    if (wait == -1) {
        $(".getCode i").text("获取验证码");
        message = true;
        //console.log(message);
        $(".getCode").on('click');
        wait = 60;
    } else {
        $(".getCode i").text(wait + "s");
        wait--;
        $(".getCode").off('click');
        setTimeout(function () {
            time()
        }, 1000);
    }
}
////提交
//$("#login").on('click',function () {
//    code = $("input[name='code']").val();
//    mobile = $("input[name='mobile']").val();
//    //未绑定用户
//    if (code.length==4&&!isNaN(code)) {
//        changeBg('#ff9402','#f55',$(this));
//        phone(mobile,code); //绑定手机号
//    } else {
//        $("#modal-Pop").show();
//        $(".pop-cover").text("验证码错误!");
//    }
//});

//提交
$("#login").on('click',function () {
    code = $("input[name='code']").val();
    mobile = $("input[name='mobile']").val();
    //未绑定用户
    if (code.length==4&&!isNaN(code)) {
        phone(mobile,code); //绑定手机号
    } else {
        inputTipsText("验证码错误!");
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
                        inputTipsText("等待语音验证码!");
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
            inputTipsText("请填写正确验证码");
            return false;
        }
        if (mobile.length == 0) {
            inputTipsText("请填写手机号码");
            return false;
        } else {
            inputTipsText("请输入正确的手机号");
            return false;
        }
    }
}
var clicked=false;
//绑定电话
function phone(mobile,code) {
    //$("#modal-Pop").show();
    //$(".pop-cover").text("正在处理中...");
    if(clicked){
        return;
    }
    clicked=true;
    jsonAjax(API.API_LIST.BING_PHONE, {mobile: mobile, openid: getOpenid(),password:code}, function (data) {
        if (data.status == 1) {
            //更改userid
            if(I('source')=='RP'){
                PageJump('gotoFillFriendInfo');
            }else{
                PageJump('gotoKeepIndex');
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
