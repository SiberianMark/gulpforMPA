/**
 * Created by didi on 2015/12/9.
 */
//页面加载完回调方法

var debug=true;
var jsdata;
var pull_action = '';
var render=getRender('gift-list');
var userid = "";
var page =I('page',1);
var _index = I('type',0);
var $div_li=$("ul.shop-order-nav > li");
var _this;
var buy = 0;

function onStart() {
    _initMui();
    isLogin(function (ret) {
        if (ret) {
            getData();
        } else {
            $(".cart-nogoods").show();
            loadEnd();
        }
    });
}
    function getData(){
        jsonAjax(API.API_LIST.GOODS_SEND, {userid: getUserid(), page: page,status:_index}, function (data) {
            if (data.status == 1) {
                jsdata = data;
                if(jsdata.data.length <= 0){
                    if(pull_action ==  'up'){
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                    }
                    else if(pull_action == 'down'){
                        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                    }
                    if(page <= 1){
                        $(".cart-nogoods").show();
                    }
                    loadEnd();
                    return;
                }
                var html  = render(jsdata);
                if(page == 1){
                    $("#data-r-list").html(html);
                }else{
                    $("#data-r-list").append(html);
                }
                setTimeout(function(){
                    mui('#pullrefresh').pullRefresh().setStopped(false);
                },200);

                page++;
                if(pull_action ==  'up'){
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                }
                else if(pull_action == 'down'){
                    mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                }
            }else{
                if(page <= 1)
                    $(".cart-nogoods").show();
                if(pull_action ==  'up'){
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                }
                else if(pull_action == 'down'){
                    mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                }
                else{
                    $(".cart-nogoods").show();
                }
                for(var i=0;i<data.data.length;i++){
                    var status = data.data[i].status;
                    if (status != 5) {
                        $(".goods-time").eq(i).hide();
                    }
                }
            }
            $('.mui-pull-caption').show();
            loadEnd();
        });
        jsonAjax(API.API_LIST.QUOTA_NOTICE, {'userid':getUserid(),'type':1}, function (data) {
            if (data.status == 1) {
                if(I('pub_acct','')!= 1){ // pubOrder为专属公众号订单标记
                    $('.cartPro-text span').text('123');
                    $('.cartPro-text span').html(data.data.notice);
                    $('.cartPro-text').css('display','block');
                }
            }

        });
    }

// 再买一份
$("#data-r-list").on('tap','.goods-con', function () {
    var gift_again=[];
    var gift_type = $(this).parents(".gt-box-main").attr('gift_type');
    var i=$(this).parents(".gt-box-main").find(".give-goods").attr('giftnum');
    var is_crowd = $(this).attr('is_crowd');
    if(is_crowd == "1"){
        var obj = new Object();
        obj.goods_id = $('.gt-content-li .good-image').attr('id');
        InterfaceTap('gotoCrowdfund',obj);
        return false;
    }
    if (gift_type == 1) {
        for (var m = 0; m < i; m++) {
            var j = $(this).parents(".gt-box-main").find(".good-image").eq(m).attr('id');
            var k = $(this).parents(".gt-box-main").find(".goods-img").eq(m).attr('id');
            var l = $(this).parents(".gt-box-main").find(".good-image").eq(m).attr('product_id');
            gift_again.push({'id': j, 'num': k,'product_id':l});
        }
    }else{
        var idlth=$(this).parents(".gt-box-main").find(".good-image").attr('id').split(",").sort();
        var pro_idlth=$(this).parents(".gt-box-main").find(".good-image").attr('product_id').split(",").sort();
        var num=1;
        for(var m=0;m<idlth.length;m++){
            if (idlth[m]==idlth[m+1]&&pro_idlth[m]==pro_idlth[m+1]){
                //alert("数组重复内容："+idlth[m]);
                num++;
                console.log(num);
            }else{
                gift_again.push({'id': idlth[m], 'num': num,'product_id':pro_idlth[m]});
                num=1;
            }
        }
    }
    (function addCart(n){
        if(n<=gift_again.length-1){

            jsonAjax(API.API_LIST.CART_ADDTOCART, {userid: getUserid(), goods_id: gift_again[n].id,num:gift_again[n].num,product_id:gift_again[n].product_id}, function (data) {
                if (data.status == 1) {
                    addCart(n + 1);
                }
                inputTipsText(data.info);
            });

        }else {

            //跳转到购物车
            //debugger
            InterfaceTap('gotoShopCart');
            return;
        }
    }(0));
});

// 跳转到礼物详情
$("#data-r-list").on('tap','.goods-wl,.give-goods', function () {
    var status=$(this).parents(".gt-box-main").attr('status');
    var pay_status=$(this).parents(".gt-box-main").attr('pay_status');
    if(status==1&&pay_status==0){
        return false;
    }else {
        var obj = new Object();
        obj.id = $(this).parents(".gt-box-main").attr('id');
        obj.merge_no = $(this).parents(".gt-box-main").attr('merge_no');
        InterfaceTap('gotoSendDetails', JSON.stringify(obj));
    }
});

// 立即送出
$("#data-r-list").on('tap','.goods-ds', function () {
    var orderid=$(this).parents(".gt-box-main").attr('id');
    var merge_no = $(this).parents(".gt-box-main").attr('merge_no');
    jsonAjax(API.API_LIST.GIFT_SEND, {userid: getUserid(), merge_no: merge_no,id:orderid}, function (data) {
        if (data.status == 1) {
            if(data.data.surplus_num!=0){
                var obj = new Object();
                obj.orderid = orderid;
                obj.merge_no = merge_no;
                InterfaceTap('gotoSend', JSON.stringify(obj));
            }
            else{
                if(data.data.status==2) {
                    inputTipsText("您的礼物已被领取完啦。再买一份送给朋友吧！");
                    page=1;
                    getData();
                }else if(data.data.status==3){
                    inputTipsText("您的礼物已失效！");
                    page=1;
                    getData();
                }
            }
        }
    });
});

// 删除礼物
$("#data-r-list").on('tap','.goods-del', function () {
    _this=null;
    _this=$(this);
    $('.alert-box').addClass('show');
    $('.alert-box div p').text('是否删除礼物');
    $('.alert-box>div>div>span').eq(1).attr('u_id',1);
});
//取消订单
$("#data-r-list").on('tap','.goods-cancel', function () {
    _this=null;
    _this=$(this);
    $('.alert-box').addClass('show');
    $('.alert-box div p').text('是否取消订单');
    $('.alert-box>div>div>span').eq(1).attr('u_id',1);
});
//是否删除礼物(订单)
$('.alert-box').on('tap','span',function(e){
    var _text=$(this).attr('u_id');
    if(_text==1){
        console.log(_this);
        var orderid = _this.parents('.gt-box-main').attr('id');
        var merge_no = _this.parents('.gt-box-main').attr('merge_no');
        console.log(orderid+'--'+merge_no);
        jsonAjax('/Gold/gift/delGift',{merge_no:merge_no,id:orderid,userid: getUserid(),},function(data){
            if (data.status == 1) {
                $('.alert-box').removeClass('show');
                _this.parents('.gt-box-main').hide();
                setTimeout(function(){
                    inputTipsText(data.info);
                },500);
            }else{
                $('.alert-box').removeClass('show');
                setTimeout(function(){
                    inputTipsText(data.info);
                },500);
            }
        });
    }else{
        $('.alert-box').removeClass('show');
    }
});
//点嘀生活
$("#cart-nogoods-btn").on("tap",function(){
    InterfaceTap('gotoMallHome');
});
//礼物攻略
$("#raiders").on("tap",function(){
    InterfaceTap('gotoRaiders');
});
//切换列表
$div_li.on('tap',function () {
    _index = parseInt($(this).attr('index'));
    console.log(_index);
    $(this).addClass("cur").siblings().removeClass("cur");
    $('.cart-list').html('');
    $('.cart-nogoods').hide();
    pull_action ='';
    page=1;
    oFirst = true;
    $('.mui-pull-caption').hide();
    isLogin(function(ret){
        if(ret){
            getData();
        }else {
            $(".cart-nogoods").show();
        }
    });
    mui('#pullrefresh').pullRefresh().refresh();
});
//立即付款
$("#data-r-list").on('tap','.goods-payment', function () {
    if(!isLogin()){
        return false;
    }
    if(buy==1){
        return false;
    }
    buy = 1;
    var obj = M();
    obj.orderid = $(this).parents('.gt-box-main').attr('id');
    obj.merge_no = $(this).parents('.gt-box-main').attr('merge_no');
    if(is_weixn(true)){
        //获取微信支付参数
        //wxPay(obj);
        var gobj = M();
        var go_param = M();
        go_param.orderid=obj.orderid;
        go_param.merge_no=obj.merge_no;
        gobj.orderid = obj.orderid;
        gobj.merge_no = obj.merge_no;
        gobj.go_action="gotoSend";
        gobj.go_param=go_param;
        gobj.from_page='didi';
        InterfaceTap('gotoCashier',gobj);
    }else{
        //DOTO: APP端购买
        if(obj.orderid==0){
            obj.orderid = obj.merge_no;  //合并订单号赋值给订单id
        }
        if(obj.merge_no==''){
            obj.merge_no=0;
        }
        event_link(API.SERVER_URL + 'sdp/' + API.API_LIST.ORDER_ORDERPAY + '?userid='+getUserid()+'&orderid='+obj.orderid+'&merge_no='+obj.merge_no);
    }
});
