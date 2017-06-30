function MyOrders (obj) {
    MyOrder_Shop(obj);//商品订单相关事件方法.
    MyOrder_Gift(obj);//礼物订单相关事件方法.
	//是否删除礼物
	$('.alert-box').on('tap','span',function(e){
	    var _text=$(this).attr('u_id');
	    if(_text==0){//取消商品订单
	        console.log(_this);
	        var orderid = _this.parents('.cartPro').attr('orderid');
	        var cartpro=_this.parents('.cartPro');
	        jsonAjax(API.API_LIST.CANCEL_ORDER, {'orderid':orderid,'userid':getUserid()}, function (data) {
	            if (data.status == 1) {
	                //cartpro.remove();
	                //$('.cartPro-total em').html(data.data.totalMoney);
	            }
	        });
	        _this.next("button").text("删除订单").removeClass("pay-now").addClass("orders-dele");
	        _this.parents('.cartPro').find(".refund").text("交易关闭");
	        _this.remove();
	    }else if(_text==1){//删除商品订单
	        var orderid = _this.parents('.cartPro').attr('orderid');
	        var cartpro=_this.parents('.cartPro');
	        cartpro.remove();
	        jsonAjax(API.API_LIST.DELE_ORDER, {'orderid':orderid,'userid':getUserid()}, function (data) {
	            if (data.status == 1) {
	                //$('.cartPro-total em').html(data.data.totalMoney);
	            }
	        });
	    }else if(_text==2){//取消礼物订单
	        var orderid = _this.parents('.gt-box-main').attr('id');
	        var merge_no = _this.parents('.gt-box-main').attr('merge_no');
	        jsonAjax('/Gold/gift/delGift',{merge_no:merge_no,id:orderid,userid:getUserid()},function(data){
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
	    }
		$('.alert-box').removeClass('show');
	});

}
var buy = 0;
function MyOrder_Shop (obj) {
	var proBox = '.cartPro ';
	//立即付款
	obj.on('tap',proBox+'.pay-now',function(){
	    if(!isLogin()){
	        return false;
	    }
	    if(buy==1){
	        return false;
	    }
	    buy = 1;
	    var obj = M();
	    obj.orderid = $(this).parents('.cartPro').attr('orderid');
	    obj.order_type = $(this).parents('.cartPro').attr('order_type');
	    obj.merge_no = $(this).parents('.cartPro').attr('merge_no');
	    var cartpro=$(this).parents('.cartPro');
	    if(is_weixn()){
	        //获取微信支付参数
	        //wxPay(obj);
	        var gobj = M();
	        var go_param = M();
	        go_param.orderid=obj.orderid;
	        go_param.merge_no=obj.merge_no;
	        gobj.orderid = obj.orderid;
	        gobj.merge_no = obj.merge_no;
	        gobj.go_action="gotoOrderList";
	        if(gobj.order_type==2){
	            gobj.go_action="gotoSend";
	        }
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
	//确认收货
	obj.on('tap',proBox+'.confirm-receipt',function(){
	    var orderid = $(this).parents('.cartPro').attr('orderid');
	    var cartpro=$(this).parents('.cartPro');
	    jsonAjax(API.API_LIST.CONFIRM_RECGOODS, {'orderid':orderid,'userid':getUserid()}, function (data) {
	        if (data.status == 1) {
	            $('#data-r-list tap').html('');
	            page=1;
	            getData();
	            //cartpro.remove();
	            //$('.cartPro-total em').html(data.data.totalMoney);
	        }
	    });
	});
	//去店铺
	obj.on('tap',proBox+'.brand-name',function(){
	    var brandid = $(this).attr('brandid');
	    var obj = new Object();
	    obj.brandid = brandid;
	    InterfaceTap('gotoBrand',JSON.stringify(obj));
	});
	//物流详情
	obj.on('tap',proBox+'.wuliu-view',function(){
	    var orderid = $(this).attr("orderid");
	    var obj = new Object();
	    obj.orderid = orderid;
	    InterfaceTap('gotoLgstcDtls',JSON.stringify(obj));
	});
	//去评论
	obj.on('tap',proBox+'.go-comm',function(){
	    var orderid = $(this).attr("orderid");
	    var obj = new Object();
	    obj.orderid = orderid;
		obj.source ='myorder';
	    InterfaceTap('gotoCommentAdd',JSON.stringify(obj));
	});
	//添加评论
	$('.shop-cart').on('tap','.add-comm',function(){
		var orderid = $(this).attr("orderid");
		var obj = new Object();
		obj.orderid = orderid;
		obj.userid=getUserid();
		obj.source ='myorder';
		InterfaceTap('gotoAddComment',JSON.stringify(obj));
	});
	//评论列表
	obj.on('tap',proBox+'.dtl-comm',function(){
	    var orderid = $(this).attr("orderid");
	    var obj = new Object();
	    obj.orderid = orderid;
	    InterfaceTap('gotoCommentDtls',JSON.stringify(obj));
	});
	//订单详情
	obj.on('tap',proBox+'.orderdetails-view',function(){
	    var orderid = $(this).parents('.cartPro').attr('orderid');
	    var obj = new Object();
	    obj.orderid = orderid;
	    obj.source = I('source','myorder');
	    InterfaceTap('gotoOrdersDetails',JSON.stringify(obj));
	});
	//点击删除订单弹出确认窗口.
	obj.on('tap',proBox+'.orders-dele',function(){
	    _this=null;
	    _this=$(this);
	    $('.alert-box').addClass('show');
	    $('.alert-box div p').text('是否删除订单');
	    $('.alert-box>div>div>span').eq(1).attr('u_id',1);
	});
	//取消订单
	obj.on('tap',proBox+'.orders-cancel',function(){
	    _this=null;
	    _this=$(this);
	    $('.alert-box').addClass('show');
	    $('.alert-box div p').text('是否取消订单');
	    $('.alert-box>div>div>span').eq(1).attr('u_id',0);
	});
	//通知收货人弹出层
	obj.on('tap',proBox+'.receipt-notice',function(){
	    var share=JSON.parse($(this).parents('.cartPro-list').find('li').eq(0).attr('share'));
	    if(is_weixn()){ //微信环境
	        $('.share-cover').addClass('fade');
	        wxShare(share);
	    }else{
	        if(isLogin()){
	            wxShare(share); //获取微信分享对象
	        }
	    }
	});
	//提醒卖家发货
	obj.on('tap',proBox+'.goods-tell',function(){
	    var orderid=$(this).attr('orderid');
	    jsonAjax(API.API_LIST.GOLD_REMAINDELIVERY,{userid: getUserid(),orderid:orderid},function(data){
	       if (data.status == 1) {
	           $('.notice-text').text(data.info);
	           $('.notice-modal').addClass('fade');
	       }else{
	           inputTipsText(data.info);
	       }
	   });
	});
}
function MyOrder_Gift (obj) {
	var buy = 0;
	var proBox = '.gt-box-main ';
	// 再买一份
	obj.on('tap',proBox+'.goods-con', function () {
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
	    }(0))
	});
	// 跳转到礼物详情
	obj.on('tap',proBox+'.goods-wl,.give-goods', function () {
	    var obj = new Object();
	    obj.id = $(this).parents(".gt-box-main").attr('id');
	    obj.merge_no = $(this).parents(".gt-box-main").attr('merge_no');
	    InterfaceTap('gotoSendDetails', JSON.stringify(obj));
	});
	// 立即送出
	obj.on('tap',proBox+'.goods-ds', function () {
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
	//取消订单
	obj.on('tap',proBox+'.goods-cancel', function () {
	    _this=null;
	    _this=$(this);
	    $('.alert-box').addClass('show');
	    $('.alert-box div p').text('是否取消订单');
	    $('.alert-box>div>div>span').eq(1).attr('u_id',2);
	});
	//立即付款
	obj.on('tap',proBox+'.goods-payment', function () {
	    if(!isLogin()){
	        return false;
	    }
	    if(buy==1){
	        return false;
	    }
	    buy = 1;
	    var _obj = M();
	    _obj.orderid = $(this).parents('.gt-box-main').attr('id');
	    _obj.merge_no = $(this).parents('.gt-box-main').attr('merge_no');
	    if(is_weixn()){
	        //获取微信支付参数
	        //wxPay(obj);
	        var gobj = M();
	        var go_param = M();
	        go_param.orderid=_obj.orderid;
	        go_param.merge_no=_obj.merge_no;
	        gobj.orderid = _obj.orderid;
	        gobj.merge_no = _obj.merge_no;
	        gobj.go_action="gotoSend";
	        gobj.go_param=go_param;
	        gobj.from_page='didi';
	        InterfaceTap('gotoCashier',gobj);
	    }else{
	        //DOTO: APP端购买
	        if(_obj.orderid==0){
	            _obj.orderid = _obj.merge_no;  //合并订单号赋值给订单id
	        }
	        if(_obj.merge_no==''){
	            _obj.merge_no=0;
	        }
	        event_link(API.SERVER_URL + 'sdp/' + API.API_LIST.ORDER_ORDERPAY + '?userid='+getUserid()+'&orderid='+_obj.orderid+'&merge_no='+_obj.merge_no);
	    }
	});
}
