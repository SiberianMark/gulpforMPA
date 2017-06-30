/**
 * Created by didi on 2015/12/7.
 */
var wait = 60;//时间
var text;//内容
var message = true;
//var regex = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9][0-9]){8}$/;//手机号
var regex = /(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;//手机号
var regexp= /^(0\d{2,3}-?\d{5,9}(-?\d{1,5})?)/;//固定电话
var num = /^\d{4}$/;//字母数字
var code;//验证码
var mobile;//手机号
var picCode;//图形验证码
var scode;//服务器验证码
var isvoice = 0;//语音判断
var name;//收货人
var telphone;//联系电话
var proid;//省份id
var cityid;//城市id
var dte;//区域id
var detadd;//详细地址
var ide = I('id', 0);//地址id
var is_bind = I('is_bind', -1);//默认地址管理
var is_address = I('is_address', 1);  //0 无需地址添加
//console.log(ide);
//console.log(is_bind);
var citydata;
var source = I('source', ''); //跳转来源
var goods_id = I('goods_id', 0);  //商品id
var is_crowd = I('is_crowd',0); // 是否为众筹订单
var orderid = I('orderid', 0);
var callback = I('callback', '');
/////////////////双十一
var product_id = I('product_id',0);
var goods_id_sub=decodeURIComponent(I('goods_id_sub'),'');
var is_crowd = I('is_crowd',0);
var userid=I('userid',0);
var wxappid=I('wxappid',0);
var source = I('source',0);
var mid=I('mid',0);
var brand_id=I('brand_id',0);
///////////////
var useraddress_id;
var selectedName ='';
var date;
var oneid=I("oneid",0);//一元抢购
var openedSelect = 0;
var type=I("copy");
var goods=decodeURIComponent(I('goods'));
var product_id = I('product_id');//商品规格ID
$('.msg-ph').on('click',function () {
    $(this).find('label input').focus();
});

$('.ph-com').on('click',function () {
    $(this).find('label input').focus();
});

//提交
$(".tj-btn").on('click',function () {
    $(".tj-btn").attr("disabled","disabled");
    code = $(".code").val();
    name = $("#name").val().replace(new RegExp(/( )/g),"");
    telphone = $("#telphone").val().replace(new RegExp(/( )/g),"");
    detadd = $("#detadd").val().replace(new RegExp(/( )/g),"");
    if(is_address==0){//未绑定电话有地址
        if (code.length==4&&!isNaN(code)) {
            mobile = $(".in-ph").val();
            phone(mobile, code, name, telphone, detadd); //绑定手机号
        }else {
        console.log('Err:0',name,telphone,proid,cityid,dte,cityid,detadd);
            if (code.length == 0) {
                $(".modal").show();
                $(".pop-cover").text("请输入验证码");
            } else {
                $(".modal").show();
                $(".pop-cover").text("请输入正确的验证码");
            }
            //$(".modal").show();
            //$(".pop-cover").text("验证码格式有误!");
        }
    }else{
        if(name==''){
            $(".modal").show();
            $(".pop-cover").text("请输入收货人姓名");

        }else if (telphone.length <= 16 && regex.test(telphone)||regexp.test(telphone)) {
            //未绑定用户
            if (is_bind == 0) {
                if (code.length==4&&!isNaN(code)) {
                    if (proid != undefined && cityid != undefined && dte != undefined && telphone != '' && detadd != '' && name != '' && cityid != 0) {
                        mobile = $(".in-ph").val();
                        phone(mobile, code, name, telphone, detadd); //绑定手机号
                    } else {
                        console.log('Err:1',name,telphone,proid,cityid,dte,cityid,detadd);
                        if (name == '') {
                            $(".modal").show();
                            $(".pop-cover").text("请输入收货人姓名");
                        } else if (telphone == '') {
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
                } else {
                    console.log('Err:2',name,telphone,proid,cityid,dte,cityid,detadd);
                    if (code.length == 0) {
                        $(".modal").show();
                        $(".pop-cover").text("请输入验证码");
                    } else {
                        $(".modal").show();
                        $(".pop-cover").text("请输入正确的验证码");
                    }
                }
            }
            //已绑定用户
            else if (is_bind == 1) {
                if (proid != undefined && cityid != undefined && telphone != '' && detadd != '' && name != '' && cityid != 0) {
                    add(name, telphone, proid, cityid, dte, detadd);
                } else {
                    console.log('Err:3',name,telphone,proid,cityid,dte,cityid,detadd);
                    if (name == '') {
                        $(".modal").show();
                        $(".pop-cover").text("请输入收货人姓名");
                    } else if (telphone == '') {
                        $(".modal").show();
                        $(".pop-cover").text("您填写的收货人电话有误哦");
                    } else if (proid == undefined || cityid == undefined || dte == undefined) {
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
            }
            //地址管理
            else if (is_bind == -1) {
                if (ide == 0) {  //添加地址
                    if (proid != undefined && cityid != undefined && telphone != '' && detadd != '' && name != '' && cityid != 0) {
                        add(name, telphone, proid, cityid, dte, detadd);
                    } else {
                        console.log('Err:4',name,telphone,proid,cityid,dte,detadd);
                        if (name == '') {
                            $(".modal").show();
                            $(".pop-cover").text("请输入收货人姓名");
                        } else if (telphone == '') {
                            $(".modal").show();
                            $(".pop-cover").text("您填写的收货人电话有误哦");
                        } else if (proid == undefined || cityid == undefined || dte == undefined) {
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

                } else {   //编辑地址
                    if (proid != undefined && cityid != undefined && telphone != '' && detadd != '' && name != '') {
                        alter(name, telphone, proid, cityid, dte, detadd);
                    } else {
                        console.log('Err:5',name,telphone,proid,cityid,dte,cityid,detadd);
                        if (name == '') {
                            $(".modal").show();
                            $(".pop-cover").text("请输入收货人姓名");
                        } else if (telphone == '') {
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
                }
            }
        } else {
            console.log('Err:7',name,telphone,proid,cityid,dte,cityid,detadd);
            $(".modal").show();
            $(".pop-cover").text("您填写的收货人电话有误哦");
        }
    }
    setTimeout(function () {
        enablebtntime()
    }, 2500);
});
function enablebtntime() {
    $('.tj-btn').removeAttr("disabled");
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

$(".modal").on('click',function () {
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
    var firstLoad = true;
    pushHistory();
    $('.ps-pro').hide();
    $('.ps-city').hide();
    $('.ps-dt').hide();
    //setTimeout(function() {
        window.addEventListener("popstate", function(e) {
            //alert(openedSelect);
            if(openedSelect > 0){
                $('.ps-pro').slideLeftHide(200);
                $('.ps-city').slideLeftHide(200);
                $('.ps-dt').slideLeftHide(200);
                hidebackground(false);
                selectedName = '';
                openedSelect=0;
            }else{
                //alert(firstLoad);
                if(!firstLoad){
                    window.history.back();
                }
                firstLoad = false;
            }
        }, false);
    //}, 0);
    getPesentCookie();
    //useraddress_id = I('useraddress_id',0);
    useraddress_id = I('id',0);
    third();
    //编辑地址
    if (ide != 0) {
        jsonAjax(API.API_LIST.USER_GET_ADDRESSLIST, {userid: getUserid(), id: ide}, function (data) {
            if (data.status == 1) {
                for (var i = 0 in data.data) {
                    if (ide == data.data[i].id) {
                        //console.log(ide);
                        proid = data.data[i].province;
                        cityid = data.data[i].city;
                        dte = data.data[i].area;
                        $("#name").val(data.data[i].contact);
                        $("#telphone").val(data.data[i].mobile);
                        console.log(proid, cityid, dte);
                        $('.sel_area').text(findNameByID());
                        $("#detadd").val(data.data[i].detail);
                        $('.ph-setdefault').attr('data-default', data.data[i].default);
                        if (data.data[i].default == 1) {    //默认状态为1;则阻止修改
                            $('.ph-setdefault').attr('data-disable', 1);
                        } else {
                            $('.ph-setdefault').attr('data-disable', 0);
                        }
                    }
                }
            } else {
                inputTipsText(data.info);
            }
            loadEnd();
        });
    } else {
        loadEnd();
    }

    //复制地址
    if(type="copy"){
        var province_name = decodeURIComponent(I('province_name'));
        var city_name = decodeURIComponent(I('city_name'));
        var area_name = decodeURIComponent(I('area_name'));
        var detail = decodeURIComponent(I('detail'));
        var address_name = decodeURIComponent(I('address_name'));
        var address_phone = I('address_phone');
        var province = I('province');
        var city = I('city');
        var area = I('area');
        $("#name").val(address_name);
        $("#telphone").val(address_phone);
        $('.sel_area').text(province_name+" "+city_name+" "+area_name);
        $("#detadd").val(detail);
        proid = province;
        cityid = city;
        dte = area;
        console.log(province_name+city_name+area_name+proid+cityid+dte);
    }

    if (source != 'gift'){
        $('.bd-ph').html('&nbsp;');
    }
    if (is_bind == 0) {
        $(".phone_msg").show();
    }
    if (is_address == 1) {
        $(".good-ads").show();
        $(".rpt-msg").show();
    }
    console.log('Err:4',name,telphone,proid,cityid,dte,detadd);
}

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

function fleshVerify(){
    //重载验证码
    var time = new Date().getTime();
    document.getElementById('picCode').src= API.SERVER_URL+'gold/public/verify/'+time;
}
//领取游戏奖励
function getMyGameprize(id) {
    //showLoad('验证码将以短信的形式发送至您填写的手机');
    jsonAjax('/api4/ticketgame/ajaxGetMyPrize', {
        userid: getUserid(),
        pirzelog_id: I('pirzelog_id', 0),
        address_id: id,
    }, function (data) {
        //console.log(name, telphone, proid, cityid, dte, detadd);
        if (data.status == 1) {
            var obj = M();
            obj.pirzelog_id = I('pirzelog_id', 0);
            obj.canplaytimes = data.data.canplaytimes;
            Interface('gotoGamePrizeSucc', obj);  //地址管理列表
        } else {
            inputTipsText(data.info);
        }
    });
}
//绑定电话
function phone(mobile, code, name, telphone, detadd) {
    //showLoad('验证码将以短信的形式发送至您填写的手机');
    jsonAjax(API.API_LIST.BING_PHONE, {mobile: mobile, openid: getOpenid(), password: code}, function (data) {
        if (data.status == 1) {
            //更改userid
            setUserid(data.data.userid,data.data.logintoken);
            //无需地址添加时绑定成功进行跳转
            if (is_address == 0) {
                var obj = M();
                switch (source) {
                    case 'gift':   //跳转到领取礼物页面
                        obj.orderid = orderid;
                        obj.goods = goods;
                        obj.merge_no = I('merge_no');
                        // Interface('gotoFilled', obj);
                        Interface('gotoGiftBag',obj);
                        break;
                    case 'order':  //跳转到确认订单页面
                        obj.goods_id = goods_id;
                        obj.is_crowd = is_crowd;
                        obj.product_id = product_id;
                        Interface('gotoDeterOrder', obj);
                        break;
                    case 'seckill':
                        Interface('gotoSeckill', obj);
                        break;
                    case 'game':    //跳转到领取游戏奖励页面
                        getMyGameprize(0);
                        break;
                    default:   //错误的来源
                        break;
                }
				if (callback != '') {
					event_link(decodeURIComponent(callback));  //跳转
				}
            } else {
                add(name, telphone, proid, cityid, dte, detadd);
            }
        } else {
            inputTipsText(data.info);
        }
    });
}

//城市三级联动
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
                    $.cookie('presentproid',JSON.stringify(obj),{expires: 1/144,path: '/'});
                    $.cookie("presentdate", $.now(),{expires: 30,path:'/'});
                    $.cookie('presentcityid','',{expires: -1,path: '/'});
                    $.cookie('presentdte','',{expires: -1,path: '/'});
                    //pushHistory({title: "deft",url: "#1"});
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
                        $.cookie('presentcityid',JSON.stringify(obj),{expires: 1/144,path: '/'});
                        $.cookie("presentdate", $.now(),{expires: 30,path:'/'});
                        $.cookie('presentdte','',{expires: -1,path: '/'});
                        //pushHistory({title: "deft",url: "#2"});
                        dte = undefined;
                        //console.log($(this).text() + $(this).attr('value'));
                        $('.ps-dt .last_select').text(selectedName);
                        $(".ps-dt>ul").empty();
                        var hasDt = true;
                        for (var i = 0 in citydata) {
                            if (citydata[i].cityid == $(this).attr('value')) {
                                hasDt = citydata[i].district.length > 0 ? true : false;
                                for (var k in citydata[i].district) {
                                    $(".ps-dt>ul").append("<li border='bottom' value=" + citydata[i].district[k].districtid + ">" + citydata[i].district[k].districtname + "</li>");
                                }
                            }
                        }
                        if(!hasDt){
                            $('.ps-dt').slideLeftHide(200);
                            hidebackground(false);
                            hideother(false);
                            $('.sel_area').text(selectedName);
                            selectedName='';
                            openedSelect = 0;
                        }else{
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
                                $.cookie('presentdte',JSON.stringify(obj),{expires: 1/144,path: '/'});
                                $.cookie("presentdate", $.now(),{expires: 30,path:'/'});
                                selectedName='';
                                openedSelect = 0;
                            });
                        }
                    });
                });
        }
    });
}

function findNameByID(){
    if(citydata == null || citydata == undefined)
        return '';
    var result ='';
    $(".ps-pro>ul>li").each(function(){
        if($(this).attr('value') == proid){
            result = $(this).text();
            //$(this).css({'background-color':'#f55','font-color':'#fff'});
            $(".ps-city>ul").empty();
            for (var i = 0 in citydata) {
                if (citydata[i].provinceid == proid) {
                    $(".ps-city>ul").append("<li border='bottom' value=" + citydata[i].cityid + ">" + citydata[i]['cityname'] + "</li>");
                }
            }

            $(".ps-dt>ul").empty();
            for (var i = 0 in citydata) {
                if (citydata[i].cityid == cityid) {
                    for (var k in citydata[i].district) {
                        $(".ps-dt>ul").append("<li border='bottom' value=" + citydata[i].district[k].districtid + ">" + citydata[i].district[k].districtname + "</li>");
                    }
                }
            }
        }
    });
    $(".ps-city>ul>li").each(function(){
        if($(this).attr('value') == cityid){
            result += " "+$(this).text();
            //$(this).css({'background-color':'#f55','font-color':'#fff'});
        }
    });
    $(".ps-dt>ul>li").each(function(){
        if($(this).attr('value') == dte){
            result += " "+ $(this).text();
            //$(this).css({'background-color':'#f55','font-color':'#fff'});
        }
    });
    return result;
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

function pushHistory() {
    var obj = arguments[0]?arguments[0]:undefined;
    if(obj == undefined){
        obj = {
            title: "deft",
            url: "#"
        };
    }
    window.history.pushState(obj, '', '');
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

$('#new_sel_area').on('click',function(){
    hidebackground(true);
    hideother(true);
    $('.ps-pro').slideLeftShow(200);
    openedSelect = 1;
    pushHistory();
});

//添加地址
function add(name, telphone, proid, cityid, dte, detadd) {
    console.log({
        action: 'add',
        userid: getUserid(),
        id: ide,
        contact: name,
        mobile: telphone,
        province: proid,
        city: cityid,
        area: dte,
        address: detadd,
        default:$('.ph-setdefault').attr('data-default'),
    });
    jsonAjax(API.API_LIST.GOODS_ADDRESS, {
        action: 'add',
        userid: getUserid(),
        id: ide,
        contact: name,
        mobile: telphone,
        province: proid,
        city: cityid,
        area: dte,
        address: detadd,
        default:$('.ph-setdefault').attr('data-default'),
    }, function (data) {
        if (data.status == 1) {
            //添加地址成功进行跳转
                if (is_address == 1) {
                var obj = M();
                switch (source) {
                    case 'order':  //跳转到确认订单页面
                        obj.useraddress_id = data.data.id;
                        obj.goods_id = goods_id;
                        obj.is_crowd = is_crowd;
                        obj.product_id = product_id;
                        Interface('gotoDeterOrder', obj);
                        break;
                    case 'game':
                        getMyGameprize(data.data.id);
                        break;
                    case 'seckill':
                        Interface('gotoSeckill', obj);
                        break;
                    case 'fight_exps':
                        Interface('gotoBqMain', obj);
                        break;
                    case 'guess':
                        Interface('gotoGuess', obj);
                        break;
                    case 'present':
                        obj.id = orderid;
                        obj.merge_no = I("merge_no");
                        obj.useraddress_id = data.data.id;
                        Interface('gotoPresents',obj);
                        break;
                    case 'onebuy':  //跳转到一元购页面
                        obj.useraddress_id = data.data.id;
                        obj.id = oneid;
                        Interface('gotoOneBuyMyWinDet', obj);
                        break;
                    case 'usermessage':
                        obj.source = "usermessage";
                        Interface('gotoAddressMsg', obj);
                        changeBackUrlL('lottery/main_lottery',obj);
                        break;
                    case 'gift':
                        obj.source = "gift";
                        obj.orderid = orderid;
                        obj.merge_no = I("merge_no");
                        obj.goods = goods;
                        obj.useraddress_id = data.data.id;
                        // Interface('gotoDoneeFilled', obj);
                        // changeBackUrlL('wechat/donee-filled',obj);
                        Interface('gotoGiftBag',obj);
                        changeBackUrlL('wechat/recvgiftSuccess',obj);
                        break;
                    case 'giftbox'://跳转到收到礼物记录页面
                        obj.userid=getUserid();
                        obj.id=I('gift_id',0);
                        obj.merge_no=I('merge_no',0);
                        obj.address_id=data.data.id;
                        console.log(obj);
                        jsonAjax(API.API_LIST.GOLD_GIFT_AFFIRM,obj,function(data){
                            if(data.status==1){
                                Interface('gotoRecpGiftsList');
                            }
                        });
                        break;
                    case 'cRecord':
                        obj.source = "cRecord";
                        obj.period_id = I('period_id');
                        Interface('gotoAddressMsg', obj);
                        break;
                    case 'buyNow':
                        obj.source = "buyNow";
                        obj.period_id = I('period_id');
                        obj.r_goods_id = I('r_goods_id');
                        changeBackUrlL('challenge/trading-hall/buyNow',obj);
                        Interface('gotoAddressMsg', obj);
                        break;
                    case 'vbersky':  //双十一
                        obj.source = source;
                        obj.goods_id = goods_id;
                        obj.product_id = product_id;
                        obj.goods_id_sub=goods_id_sub
                        obj.is_crowd = is_crowd;
                        obj.useraddress_id = data.data.id;
                        obj.userid=userid;
                        obj.wxappid=wxappid;
                        obj.mid=mid;
                        obj.brand_id=brand_id;
                        Interface('gotoComfirmOrder',obj);
                        break;
                    default:
                        //obj.pirzelog_id = I('pirzelog_id', 0);
                        getMyGameprize(data.data.id);
                        //Interface('gotoAddressMsg',obj);  //地址管理列表
                        break;
                }
            }
        } else {
            inputTipsText(data.info);
        }
    });
}

//修改地址
function alter(name, telphone, proid, cityid, dte, detadd) {
    showLoad('正在请求');
        jsonAjax(API.API_LIST.GOODS_ADDRESS, {
        action: 'save',
        userid: getUserid(),
        id: ide,
        contact: name,
        mobile: telphone,
        province: proid,
        city: cityid,
        area: dte,
        address: detadd,
        default:$('.ph-setdefault').attr('data-default'),
    }, function (data) {
        //console.log(name, telphone, proid, cityid, dte, detadd);
        if (data.status == 1) {
            var obj = M();
            obj.source = source;
            obj.goods_id = goods_id;
            obj.orderid = orderid;
            obj.is_crowd = is_crowd;
            obj.period_id = I('period_id');
            obj.r_goods_id = I('r_goods_id');
            obj.useraddress_id = ide;
            obj.oneid=oneid;
            obj.product_id = product_id;
            if(source=='order'){
                var _obj=M();
                _obj.useraddress_id = ide;
                changeBackUrl('determine-order',_obj);
            }else if(source=='present'){
                var _obj=M();
                _obj.id = orderid;
                _obj.merge_no = merge_no;
                _obj.useraddress_id = useraddress_id;
                changeBackUrl('presents',_obj);
            }else if(source=='onebuy'){
                var _obj=M();
                _obj.id = oneid;
                _obj.useraddress_id = useraddress_id;
                changeBackUrlL('lottery/my_win_det',_obj);
            }else if(source=='usermessage'){
                var _obj=M();
                _obj.source="usermessage";
                changeBackUrlL('lottery/main_lottery',_obj);
            }else if(source=='cRecord'){
                var _obj=M();
                _obj.source="cRecord";
                _obj.period_id=I('period_id');
                console.log(source);
                changeBackUrlL('lottery/main_lottery',_obj);
            }else if(source=='buyNow'){
                var _obj=M();
                _obj.source="buyNow";
                _obj.period_id=I('period_id');
                _obj.r_goods_id = I('r_goods_id');
                console.log(source);
                changeBackUrlL('challenge/trading-hall/buyNow',_obj);
            }else if(source=='gift'){
                var _obj=M();
                obj.source = "gift";
                obj.orderid = orderid;
                obj.merge_no = I("merge_no");
                obj.goods = goods;
                obj.useraddress_id = data.data.id;
                // Interface('gotoDoneeFilled', obj);
                // changeBackUrlL('wechat/donee-filled',obj);
                Interface('gotoGiftBag',obj);
                changeBackUrlL('wechat/recvgiftSuccess',obj);
            }
            Interface('gotoAddressMsg', obj);  //地址管理列表
        } else {
            inputTipsText(data.info);
        }
    });
}

$('#name,#telphone,#detadd').on('change input',function(){
    $.cookie('present'+$(this).attr('id'),$(this).val(),{expires: 1/144,path: '/'});
    $.cookie("presentdate", $.now(),{expires: 30,path:'/'});
})


//新增地址cookies
function getPesentCookie(){
    name= $.cookie('presentname')||'';
    telphone= $.cookie('presenttelphone')||'';
    detadd=$.cookie('presentdetadd')||'';
    date = $.cookie("presentdate");
    var diff= $.now()-date;
    if (diff <= 600000) {
        if ($.cookie('presentproid') != undefined && $.cookie('presentcityid') != undefined) {
            if ($.cookie('presentdte') != undefined && $.cookie('presentdte') != '') {
                var dte_ = JSON.parse($.cookie('presentdte'));
            } else {
                var dte_ = {dte: undefined, dtename: ''};
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
    else{
        $('.sel_area').html('');
        $('#name').val('');
        $('#telphone').val('');
        $('#detadd').val('');
    }
}



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
    marginLeft: "show"
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
