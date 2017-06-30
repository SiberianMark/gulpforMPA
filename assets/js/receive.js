//var pot;//退款个数
//页面加载完回调方法
var jsdata;
var render=getRender('gift-list');
var page =I('page',1);
var st=true;
var _this;

function onStart() {
isLogin(function(ret){
    if(ret){
   	getData(); 
    }
});
}
    function getData(){
        var id = I('id');
        //console.log(id);
        var merge_no = I('merge_no');
        console.log(merge_no);
        jsonAjax(API.API_LIST.GIFT_SEND, {userid: getUserid(), merge_no: merge_no,id:id}, function (data) {
            if (data.status == 1) {
                $("#data").html(render(data));
                $(".cmsg").addClass("cur");
                if(data.data.is_address=="0"){
                    $(".give-present .for").addClass("gift-address");
                }else{
                    $(".address-color").removeClass();
                }
            }
            loadEnd();
        });
    }





//点击领取
$("#data").on("click",".tmsg",function(){
    $(".cmsg").removeClass("cur");
    $(".usc").hide();
    $(".tmsg").addClass("cur");
    $(".refundment").show();
});

//点击退款
$("#data").on("click",".cmsg",function(){
    $(".tmsg").removeClass("cur");
    $(".refundment").hide();
    $(".cmsg").addClass("cur");
    $(".usc").show();
});

// 跳转到商品详情
//$("#data").on('click', '.give-goods', function () {
//    var obj = M();
//    obj.goodsid = $(this).attr('data');
//    InterfaceTap('gotoGoodsMsg', JSON.stringify(obj));
//});

// 再买一份
$("#data").on('click', '#buyAgain', function () {
    var gift_again=[];
    var i=$(".con-goods").attr('giftnum');
    var is_crowd = $(this).attr('is_crowd');
    if(is_crowd == "1"){
        var obj = new Object();
        obj.goods_id = $('.give-goods').attr('data');
        InterfaceTap('gotoCrowdfund',obj);
        return false;
    }
    for(var m=0;m<i;m++){
        var j=$('#data').find(".give-goods").eq(m).attr('data');
        var k=$("#data").find(".goods-word[goods_num]").eq(m).attr('goods_num');
        var l=$('#data').find(".give-goods").eq(m).attr('product_id');
        gift_again.push({'id':j,'num':k,'product_id':l});
    }
    console.log(gift_again);
    (function addCart(n){
        if(n<=gift_again.length-1){
            jsonAjax(API.API_LIST.CART_ADDTOCART, {userid: getUserid(), goods_id: gift_again[n].id,num:gift_again[n].num,product_id:gift_again[n].product_id}, function (data) {
                if (data.status == 1) {
                    addCart(n + 1);
                }
            });
        }else {
            //跳转到购物车
            Interface('gotoShopCart');
            return;
        }
    }(0));
    //Interface('gotoShopCart');
});

// 立即送出
$("#data").on('click', '.r-btn', function () {
    //var obj = new Object();
    var orderid = I('id');
    var merge_no = I('merge_no');
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
                    var obj = new Object();
                    obj.id = orderid;
                    obj.merge_no = merge_no;
                    inputTipsText("您的礼物已被领取完啦。再买一份送给朋友吧！");
                    InterfaceTap('gotoSendDetails', JSON.stringify(obj));
                }else if(data.data.status==3){
                    var obj = new Object();
                    obj.id = orderid;
                    obj.merge_no = merge_no;
                    inputTipsText("您的礼物已失效！");
                    InterfaceTap('gotoSendDetails', JSON.stringify(obj));
                }
            }
        }
    });
});

// 订单详情(领取)
$("#data").on('click', '.goods-user', function () {
    var obj = new Object();
    obj.orderid = $(this).attr('id');
    //obj.userid = I('userid');
    obj.source = I('source','receive');
    Interface('gotoOrdersDetails', JSON.stringify(obj));
});

// 订单详情(退款)
$("#data").on('click', '.ddh', function () {
    var obj = new Object();
    obj.orderid = $(this).attr('data');
    obj.source = I('source','receive');
    //obj.userid = I('userid');
    Interface('gotoOrdersDetails', JSON.stringify(obj));
});

//提醒好友(弹出层)
//$("#data").on('tap','.goods-con',function () {
//    $('.mask').show();
//    st=true;
//});
$('.mask span').click(function(event){
    event.stopPropagation();
    $('.mask').hide();
    return false;
});
//提醒好友(弹出层)
//$('.mask').on('click','.a', function () {
//    if(st){
//        $(".text span").hide();
//        $(".text p").text("您的好友还未绑定手机号，请换种方式提醒吧");
//        st=false;
//        return false;
//    }else{
//        $(".text p").text("确认提醒好友完善收货地址吗");
//        $(".text span").show();
//        $('.mask').hide();
//    }
//});

//提醒好友(弹框)
$("#data").on('click','.goods-con',function () {
    var gift_id=$(this).parents(".gift-message").find(".give-goods").attr("id");
    jsonAjax(API.API_LIST.GIFT_REMAINDFRIENDS,{'userid':getUserid(),'order_id':gift_id},function(data){
            if(data.status == 1){
                inputTipsText(data.info);
            }else{
                inputTipsText(data.info);
            }
    });
});

//确认收货
$('#data').on('click',".goods-ds",function(){
    var gift_id=$(this).parents(".gift-message").find(".give-goods").attr("id");
    var goods_ds=$(this);
    jsonAjax(API.API_LIST.GIFT_CONFIRM_ORDER,{'userid':getUserid(),'id':gift_id},
        function(data){
            if(data.status == 1){
                inputTipsText('确认收货成功！');
                goods_ds.hide();
            }else{
                inputTipsText('操作失败！');
            }
        }
    );
});

//订单物流信息
$('#data').on('click','.goods-wl',function(){
    var orderid = $(this).parents(".gift-message").attr('id');
    var obj = new Object();
    obj.orderid = orderid;
    Interface('gotoLgstcDtls', JSON.stringify(obj));
    //InterfaceTap('gotoOrdersDetails',JSON.stringify(obj));
});

//订单详情
$('#data').on('click','.give-goods',function(){
    var orderid = $(this).parents(".gift-message").attr('id');
    var gift_status = $(this).attr('gift_status');
    var distribution_status=$(this).attr('distribution-status');
    var obj = new Object();
    obj.orderid = orderid;
    obj.source = I('source','receive');
    InterfaceTap('gotoOrdersDetails',JSON.stringify(obj));
});

// 删除礼物
$("#data").on('click','.goods-del', function () {
    _this=null;
    _this=$(this);
    $('.alert-box').addClass('show');
    $('.alert-box div p').text('是否删除礼物');
    $('.alert-box>div>div>span').eq(1).attr('u_id',1);
});

// 通知发货
$("#data").on('click','.goods-tell', function () {
    var gift_id=$(this).parents(".gift-message").find(".give-goods").attr("id");
    jsonAjax(API.API_LIST.GOLD_REMAINDELIVERY,{userid: getUserid(),orderid:gift_id},function(data){
        if (data.status == 1) {
            inputTipsText(data.info);
        }else{
            inputTipsText(data.info);
        }
    });
});
//是否删除礼物(订单)
$('.alert-box').on('click','span',function(e){
    var _text=$(this).attr('u_id');
    var gift_max=$(".gift-max").text();
    if(_text==1){
        console.log(_this);
        var orderid = _this.parents('.gift-message').attr('id');
        var merge_no = _this.parents('.gift-message').attr('merge_no');
        var gift_type = _this.parents('.gift-message').attr('gift_type');
        if(gift_type=="2"){
            merge_no='';
        }
        jsonAjax('/Gold/gift/delGift',{userid: getUserid(),merge_no:merge_no,id:orderid},function(data){
            if (data.status == 1) {
                $('.alert-box').removeClass('show');
                _this.parents('.gift-message').remove();
                setTimeout(function(){
                    inputTipsText(data.info);
                    if(gift_type=="2"){
                        gift_max=parseInt(gift_max)-1;
                        $(".gift-max").text(gift_max);
                    }
                    var lenth=$('.gift-message').length;
                    if(lenth==0){
                        changeBackUrlL('wechat/goods-detailed',{});
                        InterfaceTap('gotoSendGiftsList');
                    }
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
