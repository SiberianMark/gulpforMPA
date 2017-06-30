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
var carmodels=decodeURIComponent(I('carmodels'));//车型


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
        return;;
    }
    clicked=true;
    jsonAjax(API.API_LIST.BING_PHONE, {mobile: mobile, openid: getOpenid(),password:code,sex:gender,nickname:$('#nick').val()}, function (data) {
        if (data.status == 1) {
            //更改userid
            setUserid(data.data);
            //无需地址添加时绑定成功进行跳转
           /* var obj = M();
            if(I('pub_acct')==1){
                obj.userid = getUserid();
                obj.pub_acct = 1;
                Interface('gotoBwaIndex', obj);
            }else{    
                obj.userid = getUserid();
                obj.pub_acct = 0;            
                Interface('gotoBwaIndex', obj);
            }*/
            //inputTipsText('信息绑定成功');
            $('div[type=0]').attr('type',1);
            $('.cancel-btn').click();
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
