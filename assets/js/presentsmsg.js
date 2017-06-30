var wait = 60;//时间
var text;//内容
var message = true;
var regex = /(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;//手机号
var regexp= /^(0\d{2,3}-?\d{5,9}(-?\d{1,5})?)/;//固定电话
var code;//验证码
var mobile;//手机号
var scode;//服务器验证码
var isvoice = 0;//语音判断
var name;//收货人
var telphone;//联系电话
var proid;//省份id
var cityid;//城市id
var dte;//区域id
var detadd;//详细地址
var ide;//地址id
var is_bind;//绑定状态
var has_address;//抵制状态
var citydata;//城市
var source = I('source', ''); //跳转来源
var goods_id = I('goods_id', 0);  //商品id
var is_crowd = I('is_crowd',0); // 是否为众筹订单
var orderid = I('orderid', 0);
var callback = I('callback', '');
var useraddress_id;
var selectedName ='';
var id=I('id');
var merge_no=I('merge_no');
var useraddress_id = I('useraddress_id',0);
var date;

function onStart() {
    $('#picCode').attr('src',API.SERVER_URL+'gold/public/verify');
    $('.ps-pro').hide();
    $('.ps-city').hide();
    $('.ps-dt').hide();
    third();
    getPesentCookie();
    //礼物判断

    address(id,merge_no,useraddress_id);
}

function address(id,merge_no) {
    jsonAjax(API.API_LIST.GET_GIFT, {'userid': getUserid(), id: id, merge_no: merge_no ,useraddress_id:useraddress_id}, function (data) {
        var mad=data.data;
            if (data.status == 1) {
                $(".tx-time").text(mad.refundmentInfo);
                is_bind = mad.is_bind;
                has_address = mad.has_address;
                if (mad.address.length > 0){
                    ide = mad.address[0].id;
                console.log(ide);
                }
                console.log(is_bind,has_address);
                doTer(data,$('#address_hv'));
                TitleReSet('来自'+mad.nickname+"的礼物");
                if(mad.has_address==1&&mad.is_bind==1){
                    console.log(data);
                    $(".ord-address,.ord-address-border").show();
                }else if(mad.has_address==0&&mad.is_bind==1){
                    $(".rpt-msg").show();
                }else if(mad.has_address==1&&mad.is_bind==0){
                    $(".phone_msg").show();
                }else if(mad.has_address==0&&mad.is_bind==0){
                    $(".rpt-msg,.phone_msg").show();
                }
            }
        loadEnd();
        }
    )
}

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
        if (picCode.length != 4 || !isNaN(picCode) ) {
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

//取消提示
$(".modal").on('click',function () {
    $(this).hide();
});

//三级联动
function third() {
    $.ajax({
        type: 'get',    //请求方式  get  post
        url: '../assets/json/city.json',      //请求url
        timeout: 30, //超时时间设置，单位毫秒 30秒
        data: '',    //请求参数
        dataType: 'json',  //返回类型
        async:false,
        success: function (data){
            //console.log(data);
            //var Arr = new Array();
            var arrayLi = new Array();
            var Al = 0;
            citydata = data;
            for (var j = 0 in data) {
                var only = true;
                for (var n = 0; n < j; n++) {
                    if (data[n].provinceid == data[j].provinceid) {
                        only = false;
                        break;
                    }
                }
                if (only) {
                    var provinceid = data[j].provinceid;
                    var provincename = data[j].provincename;
                    //Arr[Al] = "<option value='" + provinceid + "'>" + provincename + "</option>";
                    arrayLi[Al] = "<li border='bottom' value='" + provinceid + "'>" + provincename + "</li>";
                    Al++;
                }
            }
            for (var k = 0 in arrayLi) {
                //$(".pro").append(Arr[k]);
                $(".ps-pro>ul").append(arrayLi[k]);
            }
            $(".ps-pro>ul>li").bind('click',function(){
                //console.log($(this).text() + $(this).attr('value'));
                $('.ps-pro').hide();
                $('.ps-city').slideLeftShow(200);
                var pname=$(this).text();
                var id=$(this).attr('value');
                proid = id;
                cityid = undefined;
                dte = undefined;
                selectedName += pname;
                var obj=M();
                obj.proid=proid;
                obj.proididname=pname;
                $.cookie('presentproid',JSON.stringify(obj),{expires: 1/144, path: '/'});
                $.cookie("presentdate", $.now(),{expires: 30,path:'/'});
                $('.ps-city .last_select').text(pname);
                $(".ps-city>ul").empty();
                for (var i = 0 in citydata) {
                    if (citydata[i].provinceid == id) {
                        $(".ps-city>ul").append("<li border='bottom' value=" + citydata[i].cityid + ">" + citydata[i]['cityname'] + "</li>");
                    }
                }
                $(".ps-city>ul>li").bind('click',function(){
                    $('.ps-city').hide();
                    $('.ps-dt').slideLeftShow(200);
                    selectedName += " "+$(this).text();
                    cityid = $(this).attr('value');
                    var obj=M();
                    obj.cityid=cityid;
                    obj.cityidname=$(this).text();
                    $.cookie('presentcityid',JSON.stringify(obj),{expires: 1/144, path: '/'});
                    $.cookie("presentdate", $.now(),{expires: 30,path:'/'});
                    dte = undefined;
                    //console.log($(this).text() + $(this).attr('value'));
                    $('.ps-dt .last_select').text(selectedName);
                    $(".ps-dt>ul").empty();
                    for (var i = 0 in citydata) {
                        if (citydata[i].cityid == $(this).attr('value')) {
                            for (var k in citydata[i].district) {
                                $(".ps-dt>ul").append("<li border='bottom' value=" + citydata[i].district[k].districtid + ">" + citydata[i].district[k].districtname + "</li>");
                            }
                        }
                    }
                    $(".ps-dt>ul>li").bind('click',function(){
                        $('.ps-dt').slideLeftHide(200);
                        hidebackground(false);
                        hideother(false);
                        selectedName += " "+$(this).text();
                        dte = $(this).attr('value');
                        $('.sel_area').text(selectedName);
                        var obj=M();
                        obj.dte=dte;
                        obj.dtename=$(this).text();
                        $.cookie('presentdte',JSON.stringify(obj),{expires: 1/144, path: '/'});
                        $.cookie("presentdate", $.now(),{expires: 30,path:'/'});
                        selectedName='';
                    });

                });
            });
        }
    });
}

function hidebackground(flag){
    if(flag){
        $('.rpt-msg').hide();
        $('.tj-btn').hide();
        $('.good-ads').hide();
    }else{
        $('.rpt-msg').show();
        $('.tj-btn').show();
        $('.good-ads').show();
    }
}

function hideother(flag){
    if(flag){
        $('.head-bg').hide();
        $('.bottom').hide();
    }else{
        $('.head-bg').show();
        $('.bottom').show();
    }
}

//添加地址
function add(name, telphone, proid, cityid, dte, detadd) {
    jsonAjax(API.API_LIST.GOODS_ADDRESS, {
        action: 'add',
        userid: getUserid(),
        contact: name,
        mobile: telphone,
        province: proid,
        city: cityid,
        area: dte,
        address: detadd
    }, function (data) {
        if (data.status == 1) {
            ide = data.data.id;
            confirmGift();
        } else {
            inputTipsText(data.info);
        }
    });
}

function confirmGift(){
    jsonAjax(API.API_LIST.GIFT_CONFIRM_GIFT, {'userid': getUserid(), id: id, merge_no: merge_no ,address_id:ide}, function (data) {
        console.log(data);
        if(data.status==1){
            inputTipsText('恭喜您领取成功!',500);
            var obj = M();
            obj.orderid = id;
            obj.address_id = ide;
            obj.merge_no = merge_no;
            setTimeout(function () {
                Interface('gotoGiftBag',obj);
            },1000);
        }else{
            var obj = M();
            obj.orderid = id;
            obj.address_id = ide;
            obj.merge_no = merge_no;
            Interface('gotoGetGiftPage',obj);
        }
    });
    //添加地址成功进行跳转

}

//绑定手机
function phone(mobile, code, name, telphone, detadd) {
    showLoad('正在请求');
    jsonAjax(API.API_LIST.BING_PHONE, {mobile: mobile, openid: getOpenid(), password: code}, function (data) {
        if (data.status == 1) {
            //更改userid
            setUserid(data.data.userid,data.data.logintoken);
            //无需地址添加时绑定成功进行跳转
            if (has_address == 1) {
                confirmGift();
            } else {
                //$.cookie('addaddress', true, {expires: 1/144, path: '/'});
                add(name, telphone, proid, cityid, dte, detadd);
            }
        } else {
            inputTipsText(data.info);
        }
    });
}




//选择地址
$('#new_sel_area').on('click',function(){
    hidebackground(true);
    hideother(true);
    $('.ps-pro').slideLeftShow(200);
});

//跳转到地址列表
$(".ord-address").on('click',function () {
        var obj = M();
        obj.goods_id = goods_id;
        obj.is_crowd = is_crowd;
        obj.useraddress_id = useraddress_id;
        obj.source='present';
        obj.orderid=id;
        obj.merge_no = merge_no;
        Interface('gotoAddress', obj);
});

//提交
$(".tj-btn").on('click',function () {
    code = $(".code").val();
    name = $("#name").val();
    telphone = $("#telphone").val();
    detadd = $("#detadd").val();
    //if (telphone.length == 11 && regex.test(telphone)) {
    if(has_address==1&&is_bind==0){//未绑定电话有地址
        if (code.length==4&&!isNaN(code)) {
            mobile = $(".in-ph").val();
            phone(mobile, code, name, telphone, detadd); //绑定手机号
        } else {
            codefalse();
        }
    }else if(has_address==0&&is_bind==0) {//未注册用户

        if (proid != undefined && cityid != undefined && dte != undefined && telphone != '' && detadd != '' && name != '' && cityid != 0 && regexp.test(telphone)||regex.test(telphone)) {
            mobile = $(".in-ph").val();
            if (regex.test(mobile)) {
                if (code.length==4&&!isNaN(code)) {
                    phone(mobile, code, name, telphone, detadd); //绑定手机号
                } else {
                    codefalse();
                }
            } else {
                mobilefalse();
            }
        } else {
            addressfalse();
        }

    }else if(has_address==0&&is_bind==1){//已绑定没地址
            if (proid != undefined && cityid != undefined && dte != undefined && telphone != '' && detadd != '' && name != '' && cityid != 0 &&regexp.test(telphone) ||regex.test(telphone)) {
                add(name, telphone, proid, cityid, dte, detadd);
            }else{
                addressfalse();
            }
    }else if(has_address==1&&is_bind==1){
        confirmGift();
    }
});

jQuery.fn.extend({
    slideRightShow: function(speed, callback) {
        return this.each(function() {
            $(this).show('slide', {direction: 'right'}, 1000);
        });
    },
    slideLeftHide: function(speed, callback) {
        return this.each(function() {
            $(this).hide('slide', {direction: 'left'}, 1000);
        });
    },
    slideRightHide: function(speed, callback) {
        return this.each(function() {
            $(this).hide('slide', {direction: 'right'}, 1000);
        });
    },
    slideLeftShow: function(speed, callback) {
        return this.each(function() {
            $(this).show('slide', {direction: 'left'}, 1000);
        });
    }
});


//地址判断
function addressfalse(){
    if (name == '') {
        $(".modal").show();
        $(".pop-cover").text("请输入收货人姓名");
    } else if (telphone == ''|| !regex.test(telphone)|| !regexp.test(telphone)) {
        $(".modal").show();
        $(".pop-cover").text("您填写的收货人电话有误哦");
    } else if (proid == undefined && cityid == undefined && dte == undefined) {
        $(".modal").show();
        $(".pop-cover").text("您填写的收货地址有误哦");
    } else if (cityid == undefined||cityid == 0) {
        $(".modal").show();
        $(".pop-cover").text("您填写的收货地址有误哦");
    } else if (detadd == '') {
        $(".modal").show();
        $(".pop-cover").text("请输入详细地址");
    }
}

//mobile判断
function mobilefalse(){
    if (mobile.length == 0) {
        $(".modal").show();
        $(".pop-cover").text("手机号不能为空!");
    } else {
        $(".modal").show();
        $(".pop-cover").text("请输入正确的手机号!");
    }
}

//验证码判断
function codefalse(){
    if (code.length == 0) {
        $(".modal").show();
        $(".pop-cover").text("请输入验证码");
    } else {
        $(".modal").show();
        $(".pop-cover").text("请输入正确的验证码");
    }
}

$('#name,#telphone,#detadd').on('change input',function(){
    $.cookie('present'+$(this).attr('id'),$(this).val(),{expires: 1/144, path: '/'});
    $.cookie("presentdate", $.now(),{expires: 30,path:'/'});
})

//新增地址cookies
function getPesentCookie() {
    name = $.cookie('presentname') || '';
    telphone = $.cookie('presenttelphone') || '';
    detadd = $.cookie('presentdetadd') || '';
    date = $.cookie("presentdate");
    var diff = $.now() - date;
    if (diff <= 600000) {
        if ($.cookie('presentproid') != undefined && $.cookie('presentcityid') != undefined) {
            if ($.cookie('presentdte') != undefined) {
                var dte_ = JSON.parse($.cookie('presentdte'));
            } else {
                var dte_ = {dte: '', dtename: ''};
            }
            var city_id = JSON.parse($.cookie('presentcityid'));
            var pro_id = JSON.parse($.cookie('presentproid'));
            dte = dte_.dte;
            cityid = city_id.cityid;
            proid = pro_id.proid;
            var selname = pro_id.proididname + "&nbsp;&nbsp;" + city_id.cityidname + "&nbsp;&nbsp;" + dte_.dtename;
            $('.sel_area').html(selname);
        }
        $('#name').val(name);
        $('#telphone').val(telphone);
        $('#detadd').val(detadd);
    }
    else {
        $('.sel_area').html('');
        $('#name').val('');
        $('#telphone').val('');
        $('#detadd').val('');
    }

}

jQuery.fn.slideLeftHide = function(speed, callback) {
    this.animate({
        width: "hide",
        paddingLeft: "hide",
        paddingRight: "hide",
        marginLeft: "hide",
        marginRight: "hide"
    }, speed, callback);
}

jQuery.fn.slideLeftShow = function(speed, callback) {
    this.animate({
        width: "show",
        paddingLeft: "show",
        paddingRight: "show",
        marginLeft: "show",
        marginRight: "show"
    }, speed, callback);
}

jQuery.fn.slideRightShow = function(speed, callback) {
    this.animate({
        width: "show",
        paddingRight: "show",
        paddingLeft: "show",
        marginRight: "show" ,
        marginLeft: "show",
    }, speed, callback);
}

jQuery.fn.slideRightHide = function(speed, callback) {
    this.animate({
        width: "hide",
        paddingLeft: "hide",
        paddingRight: "hide",
        marginLeft: "hide",
        marginRight: "hide"
    }, speed, callback);
}

function fleshVerify(){
    //重载验证码
    var time = new Date().getTime();
    document.getElementById('picCode').src= API.SERVER_URL+'gold/public/verify/'+time;
}