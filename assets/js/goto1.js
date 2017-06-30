/**
 * 公共跳转函数文件
 */
/*专属公众号收银员*/
function gotoCashierDesk(param){
    redirect('/web/cashier/desk.html', param);
}
function gotoCashierIndex(param){
    redirect('/web/cashier/index.html', param);
}
function gotoCashierPayments(param){
    redirect('/web/cashier/payments.html', param);
}
function gotoCashierStatis(param){
    redirect('/web/cashier/statistics.html', param);
}
/*专属公众号收银员*/
/*商人系统*/
//解绑成功后回调函数
function unbindPaySuccess(param){
    inputTipsText('解除绑定...');
    jsonAjax(API.API_LIST.GOLD_AUCTION_CHANGE,{'userid':getUserid(),option_id:param.option_id},function(data){
        if(data.status==1){
            gotoBusinessSystem();
        }else{
            inputTipsText(data.info);
        }
    });
}
//跳转到商人系统首页
function gotoBusinessSystem(param){
    redirect('/web/interact/business-sys/index.html', param);
}
/*商人系统*/
/**
 * 跳转到didi365.com的首页.
 */
function gotoIndex(param) {
	param.isshare = 1;
    redirect(SERVER_URL.substr(0, SERVER_URL.length - 1), param);
}
function gotoCashier(param) {
    redirect('/web/lottery/cashier.html', param);
}
/**
 * 跳转全部店铺列表页面
 */
function gotoShopDetail(param) {
    redirect('/web/wechat/shopdetail.html', param);
}
/**
 * 跳转全部店铺优惠券页面
 */
function goBrandCoupon(param) {
    redirect('/web/wechat/brand_coupon.html', param);
}
/**
 * 跳转店铺详情页面
 */
function gotoBrand(param) {
    param.isshare = 1;
    redirect('/web/wechat/brand.html', param);
}
/**
 * 跳转单独绑定手机号
 */
function gotoBindMobile(param) {
    redirect('/web/wechat/bind-phone.html', param);
}
/**
 * 跳转至购物车页面
 */
function gotoShopCart(param) {
    redirect('/web/wechat/shopcart.html', param);
}

/**
 * 跳转商品详情页面
 */

function gotoGoodsMsg(param) {
    param.isshare = 1;
    redirect('/web/wechat/goodsmsg.html', param);
}

/**
 * 跳转送礼说明
 */

function gotoSendGift(param) {
    param.isshare = 1;
    redirect('/web/wechat/explain.html', param);
}

/**
 * 跳转商城首页
 */
function gotoCart(param) {
    param.isshare = 1;
    redirect('/web/wechat/mall-home.html', param);
}

/**
 * 跳转商城首页
 */
function downApp(param) {
    param.isshare = 1;
    redirect('http://www.didi365.com', param);
}
/**
 * 跳转我的 (main-didi) 页面
 */
function gotoMainDidi(param) {
    param.isshare = 1;
    redirect('/web/user/main-didi.html', param);
}

/**
 * 跳转3-推广页面
 */
function gotoWBExtsion(param) {
    if (isLogin()) {
        redirect('/web/wechat/wbExtsion-container.html', param);
    }
    // body...
}
/**
 * 跳转3-收益页面
 */
function gotoBrokerage(param) {
    if (isLogin()) {
        redirect('/web/wechat/shouyi.html', param);
    }
    // body...
}
/**
 * 跳转3-订单页面
 */
function gotoOrderList(param) {
    if (isLogin()) {
        redirect('/web/wechat/orders.html', param);
    }
    // body...
}
function gotoOrderSList(param) {
    if (isLogin()) {
        redirect('/web/wechat/orders-service.html', param);
    }
    // body...
}
/**
 * 跳转订单结算页面
 */
function gotoOrder(param) {
    //alert('userid='+param.userid);
    redirect('/web/wechat/shopcart.html', param)
}

/*
 *跳转到收到的礼物详情页面
 */
function gotoGiftDetails(param) {
    redirect('/web/wechat/giftdetails.html', param)
}

/*
 *跳转到物流详情页面
 */
function gotoLgstcDtls(param) {
    redirect('/web/wechat/wuliu-details.html', param)
}
/*
 *跳转到退款页面
 */
function gotoTuikuan(param) {
    redirect('/web/wechat/refundment.html', param)
}
/*
 *跳转到 发货 页面
 */
function gotoSendGoods(param) {
    redirect('/web/wechat/order-details2.html', param)
}

/*跳转到物流详情页面
 */
function gotoReceiptNotice(param) {
    redirect('/web/wechat/receipt-notice.html', param)
}


/*
 *跳转到粉丝列表页面
 */
function gotoFansLists(param) {
    redirect('/web/wechat/fanslists.html', param)
}

/*跳转到家族粉丝页面
 */
function gotoFamilyfans(param) {
    redirect('/web/wechat/familyfans.html', param)
}

/*跳转到分享页面
 */
function gotoShopshare(param) {
    param.isshare = 1;
    redirect('/web/wechat/shopshare.html', param)
}

/*
 *跳转到收益详情页面
 */
function gotoshouyi(param) {
    redirect('/web/wechat/shouyi.html', param)
}

/*
 *跳转到粉丝列表页面
 */
function gototixian(param) {
    redirect('/web/wechat/tixian.html', param)
}

/*
 *跳转店铺二维码分享页面
 */
function gotoShopshareCode(param) {
    param.isshare = 1;
    redirect('/web/wechat/shopshre-qcode.html', param)

}

/*
 *跳转微信公众号二维码分享页面
 */
function gotoDIDIshareCode(param) {
    redirect('/web/wechat/follow.html', param)
}

function gotoDIDIshareCode2(param) {
    redirect('/web/lottery/my_ewm.html', param)
}
/*
 *跳转至赚钱攻略页面
 */
function gotoMakeMoney(param) {
    param.code = 'MerchantCase';
    param.userid = getUserid();
    param.isshare = 1;
    redirect('/home/config/preview', param)
}

/*
 *跳转点嘀生活
 */
function gotoMallHome(param) {
    param.isshare = 1;
    redirect('/web/wechat/mall-home.html', param)
    // body...
}
/*
 *跳转邀请好友
 */
function gotoMallEwm(param) {
    param.isshare = 1;
    redirect('/web/lottery/my_ewm.html', param)
    // body...
}
/*
 *跳转商城栏目页面
 */
function gotoColumn(param) {
    param.isshare = 1;
    redirect('/web/wechat/column.html', param)
    // body...

}
/*
 *跳转商城栏目楼层页面
 */
function gotoColumnGoodsList(param) {
    param.isshare = 1;
    redirect('/web/wechat/column-list.html', param)
    // body...
}

/*
 *跳转分部分类栏目楼层页面
 */
function gotoColumnGoodsList2(param) {
    param.isshare = 1;
    redirect('/web/wechat/column-list2.html', param)
    // body...
}

/*
 *跳转到送出的礼物详情页面
 */
function gotoSendDetails(param) {
    redirect('/web/wechat/receive.html', param)
}

/*
 *跳转到送出礼物成功页面
 */
function gotoSendOver(param) {
    redirect('/web/wechat/benefactor.html', param)
}
/*
 *跳转到送出礼物页面
 */
function gotoSend(param) {
    redirect('/web/wechat/benefactor-del.html', param);
}

/*
 *跳转到地址页面
 */
function gotoAddressMsg(param) {
    redirect('/web/wechat/donee-address.html', param)
}

/*
 *跳转到游戏奖励领取成功页面
 */
function gotoGamePrizeSucc(param) {
    redirect('/web/wechat/donee-gamesuccess.html', param)
}

/*
 *跳转到游戏奖励领取成功页面
 */
function gotoGameindex(param) {
    redirect('/Public/Game/qiangpiao/index.html', param)
}

// /*
//  *跳转到确认订单页面
//  */
// function confirmorder(param){
//     redirect('benefactor-del.html',param)
// }
/*
 *跳转至领取礼物按钮跳转页面
 */

function gotoGetGift(param) {
    redirect('/web/wechat/donee-filled.html', param)
};

/*
 *跳转至结算确认订单
 */

function gotoDeterOrder(param) {
    // if (isLogin()) {
        redirect('/web/wechat/determine-order.html', param);
    // }
};

function gotoLink(param) {
    param.isshare = 1;
    var link = param.link;
    delete param.link;
    redirect(link, param);
}

/**
 * 跳转到地址管理页面
 */
function gotoAddress(param) {
    redirect('/web/wechat/donee-address.html', param);
}


/**
 * 添加地址页面
 */
function gotoAddAddress(param) {
    redirect('/web/wechat/bd-phone.html', param);
}

/**
 * 跳转到礼物领取成功页面
 */
function gotoSuccess(param) {
    redirect('/web/wechat/donee-success.html', param);
};

/**
 * 跳转到礼物领取页面
 */
function gotoGetGiftPage(param) {
    redirect('/web/wechat/donee-on.html', param);
};

/**
 * 跳转到订单详情页面
 */
function gotoOrdersDetails(param) {
    redirect('/web/wechat/order-details.html', param);
};

/**
 * 跳转到 boss版 订单详情页面
 */
function gotoOrdersDetails2(param) {
    redirect('/web/wechat/order-details2.html', param);
};

/**
 * 领取礼物
 */
function gotoFilled(param) {
    redirect('/web/wechat/donee-filled.html', param)
};

/**
 * 送出的礼物列表
 */
function gotoSendGiftsList(param) {
    if (isLogin()) {
        redirect('/web/wechat/goods-detailed.html', param);
    }
};

/**
 * 接收的礼物列表
 */

function gotoRecpGiftsList(param) {
    if (isLogin()) {
        redirect('/web/wechat/giftbox.html', param);
    }
};

/**
 * 跳转至众筹商品详情
 */
function gotoCrowdDetails(param) {
    redirect('/web/wechat/crowdfund-details.html', param)
};


function gotoCrowdNotice(param) {
    redirect('/web/wechat/crowdfund-notice.html', param)
};

/**
 * 众筹主页
 */
function gotoCrowdfund(param) {
    param.isshare = 1;
    redirect('/web/wechat/crowdfunding-detail.html', param)
};

/**
 * 我的众筹
 */
function gotoMycrowdfund(param) {
    // if (isLogin()) {
        redirect('/web/wechat/mycrowdfund.html', param);
    // }
};

/*
 *跳转至接收人页面
 */

function gotoPresents(param) {
    if (isLogin()) {
        redirect('/web/wechat/presents.html', param);
    }
};

/*
 *跳转至礼物包裹界面
 */
function gotoGiftBag(param) {
    if (isLogin()) {
        redirect('/web/wechat/recvgiftSuccess.html', param);
    }
};

function shareIframeCode(param) {
    redirect('/sdp/distribution/qrcode', param)
    // body...
}
/**
 * 全部搜索
 */
function gotoMallClassify(param) {
    redirect('/web/wechat/mall-classify2.html', param)
};

/**
 * 故事详情
 */
function gotoBrandNote(param) {
    param.isshare = 1;
    redirect('/web/wechat/note.html', param)
};

/**
 * 礼物攻略
 */
function gotoRaiders(param) {
    param.isshare = 1;
    redirect('/web/wechat/present_raiders.html', param)
    // body...
}
/**
 * 收支详情
 */
function gotoShouzhiDetail(param) {
    redirect('/web/wechat/shouzhi-details.html', param)
}

/**
 * 富士康我的专属链接
 */
function gotoCode(param) {
    redirect('/web/wechat/code.html', param);
}
function gotoBrandClassMenu(param) {
    redirect('/web/wechat/mall-classify.html', param);
}
function gotoBrandClassList(param) {
    redirect('/web/wechat/mall-classify2.html', param);
}
function gotoBGSearch(param) {
    redirect('/web/wechat/search.html', param);
}
function gotoBrandList(param) {
    redirect('/web/wechat/brandlist.html', param);
}

/**
 * 跳转到评论列表
 */
function gotoCommentList(param) {
    redirect('/web/wechat/comment_list.html', param)
};
function gotoCommentAdd(param) {
    redirect('/web/wechat/comment_add.html', param)
};
function gotoCommentDtls(param) {
    redirect('/web/wechat/comment_dtls.html', param)
};
function gotoBSCommentAdd(param) {
    redirect('/web/wechat/bs_comment_add.html', param)
};
function gotoBSCommentList(param) {
    redirect('/web/wechat/bs_comment_list.html', param)
};
function gotoBSCommentAllList(param) {
    redirect('/web/wechat/bs_comment_alllist.html', param)
};
function gotoNoteAddComment(param) {
    redirect('/web/wechat/note_comment_add.html', param)
};
function gotoAddComment(param){
    redirect('/web/wechat/add-comment.html', param)
};
/**
 * 一元购跳转
 */
function gotoOneBuyIndex(param) {     //一元拍首页
    param.isshare = 1;
    redirect('/web/lottery/index.html',param)
}
function gotoOneBuyGoodMsg(param) {     //抢购商品的抢购详情页
    param.isshare = 1;
    redirect('/web/lottery/good_msg.html',param)
}
function gotoOneBuyAllCodes(param) {     //所有抢购码
    param.isshare = 1;
    redirect('/web/lottery/panicbuy_codes.html',param)
}

function gotoOneBuyGoodTGMsg(param) {   //抢购商品的商品详情页
    redirect('/web/lottery/good_tg_msg.html',param)
}
function gotoOneBuyWinnerNum(param) {   //获奖者的参与信息页
    redirect('/web/lottery/winner_num.html',param)
}
function gotoOneBuyMyWinDet(param) {    //获奖记录详情
    param.isshare = 1;
    redirect('/web/lottery/my_win_det.html',param)
}
function gotoOneBuyLotteriesList(param) {   //一元购首页
    param.isshare = 1;
    redirect('/web/lottery/lotteries_list.html',param)
}
function gotoOneBuyLotteryMsg(param) {  //去抢购详情
    redirect('/web/lottery/lottery_msg.html',param)
}
function gotoOneBuyMyList(param) {  //去我的记录
    redirect('/web/lottery/my_list.html',param)
}
function gotoOneBuyLotteryTally(param) {   //所有抢购记录
    redirect('/web/lottery/lottery_tally.html',param)
}
function gotoOneBuyDepictDes(param) {   //计算详情
    redirect('/web/lottery/depict_des.html',param)
}
function gotoOneBuyPayment(param) {   //支付结果
    redirect('/web/lottery/payment.html',param)
}
function gotoOneBuyAllPeriods(param) {   //选择期数
    redirect('/web/lottery/all_periods.html',param)
}
function gotoOneBuyAllPublished(param) {   //发布晒单
    redirect('/web/lottery/published_order.html',param)
}
function gotoOneBuyShareDetails(param) {   //发布晒单
    param.isshare = 1;
    redirect('/web/lottery/share_details.html',param)
}
function gotoOneBuyAllCOMMENT(param) {   //所有评论
    if(isLogin()){
        redirect('/web/lottery/lottery_comment.html',param);
    }
}
function gotoOneBuyRULE(param) {   //神马互动
    param.isshare = 1;
    redirect('/web/lottery/rule.html',param)
}
function gotoOneBuyShowOrder(param) {   //神马互动晒单
    redirect('/web/lottery/goods_showorder.html',param)
}
function gotoOneBuyShowOrderNew(param) {   //神马互动晒单新
    redirect('/web/lottery/goods_showorder_new.html',param)
}
function gotoOneGoodsDetail(param) {   //发起专场
    if (isLogin()) {
        redirect('/web/lottery/balcony_buy.html',param);
    }
}
function gotoAllBalconyList(param) {   //所有专场列表
    if (isLogin()) {
        redirect('/web/lottery/all_balcony_list.html',param);
    }
}
function gotoProewm(param) {   //商品二维码
    redirect('/web/lottery/pro_ewm.html',param)
}
function gotoEndBalcony(param) {   //专场成功
    param.isshare = 1;
    redirect('/web/lottery/end_balcony.html',param)
}
function gotoShareBalcony(param) {   //专场成功
    param.isshare = 1;
    redirect('/web/lottery/share_balcony.html',param)
}
function gotoOneBuyMainlottery(param) {  //去我的记录
    if (isLogin()) {
        param.refresh = 1 ;
        redirect('/web/lottery/main_lottery.html',param);
    }
    //redirect('/web/lottery/main_lottery2.html',param)
}

function gotoOneBuyShopCart(param) {  //去我的记录
    if (isLogin()) {
        param.refresh = 1 ;
        redirect('/web/lottery/shopcart.html',param);
    }
}

function gotoMyBalconylist(param) {   //我的专场列表
    redirect('/web/lottery/my_balcony_list.html',param)
}

function gotoOneBuyMyInfo(param) {   //个人信息
    redirect('/web/lottery/my_info.html',param)
}

function gotoBalconyInfo(param) {   //我的专场列表
    param.isshare = 1;
    redirect('/web/lottery/balcony.html',param)
}

function gotoOneBuyMyNickname(param) {   //修改昵称
    redirect('/web/lottery/my_nickname.html',param)
}

function gotoOneBuyMySex(param) {   //修改性别
    redirect('/web/lottery/my_sex.html',param)
}

function gotoPresentSMLB(param){    //神马礼包
    redirect('/web/wechat/smlb.html',param)
}
function gotoServiceAgrement(param) {   //神马互动服务协议
    redirect('/home/config/preview',param)
}
function gotoBalconyDetail(param) {
    redirect('/web/lottery/balcony_detail.html',param)
}

function gotoCarshowRule(param) { //车展领奖说明
    redirect('/web/lottery/carshow-rule.html',param)
}

function gotoUserPreson(param) {
    redirect('/api4/user/person',param)
}

function gotorecharge(param) {   //充值服务
    redirect('/web/user/recharge.html',param)
}
function gotopurse(param) {   //充值服务
    redirect('/web/user/purse.html',param)
}

function gotoWhathl() {   //什么是红利？
    redirect('/web/wechat/whathl.html#m')
}
function gotoSeckill_comment(param) {
    redirect('/web/wechat/seckill_comment.html',param);
}
function gotoSeckill(param) {
    param.isshare=1;
    redirect('/web/wechat/seckill.html',param);
}
/* s4店新增 */
function gotoActivityList(param) {
    redirect('/web/lottery/activity.html',param)
}
function goto4SGetform(param) {
    redirect('/web/lottery/4s_getform.html',param)
}
function gotospikepro(param) {
    param.isshare=1;
    redirect('/web/wechat/seckill_product.html',param)
}

function gotoLiveList() {   //夺宝活动首页
    redirect('/web/lottery/live-list.html')
}
function gotoLiveList2(param) {   //夺宝活动首页
    redirect('/web/lottery/live-list2.html',param)
}
function gotoLiveRule() {   //夺宝活动规则
    redirect('/web/lottery/live-rule.html')
}

//表情包大战 old

function gotoBqIndex(param) {   //表情包大战首页
    redirect('/web/fight_exps/index.html',param)
}
function gotoBqMain(param) {   //表情包大战支持列表
    redirect('/web/fight_exps/main.html',param)
}
function gotoBqHistoryLists(param) {   //表情包大战支持详情列表
    redirect('/web/fight_exps/support.html',param)
}
function gotoShareRule(param) {   //表情包大战支持详情列表
    redirect('/web/fight_exps/exps-notice.html',param)
}
function gotoExchange(param) {   //作战计划
    redirect('/web/fight_exps/exc-list.html',param)
}
function gotoHistorye(param) {   //作战记录
    redirect('/web/fight_exps/his-list.html',param)
}
function gotoSupport(param) {   //兑换专区
    redirect('/web/fight_exps/sup-list.html',param)
}

//表情包大战

function gotoBqIndex2(param) {   //表情包大战首页
    redirect('/web/interact/fight_exps/index.html',param)
}
function gotoShareRule2(param) {   //表情包大战规则
    redirect('/web/interact/fight_exps/exps-notice.html',param)
}
function gotoBqHistoryLists2(param) {   //表情包大战支持详情列表
    redirect('/web/interact/fight_exps/support.html',param)
}


//表情包大战-低级场
function gotoLowBqMain(param) {   //表情包大战活动列表
    redirect('/web/interact/fight_exps/low/main.html',param)
}
function gotoLowExchange(param) {   //作战计划
    redirect('/web/interact/fight_exps/low/exc-list.html',param)
}
function gotoLowHistorye(param) {   //作战记录
    redirect('/web/interact/fight_exps/low/his-list.html',param)
}
function gotoLowSupport(param) {   //兑换专区
    redirect('/web/interact/fight_exps/low/sup-list.html',param)
}
//表情包大战-中级场
function gotoMidBqMain(param) {   //表情包大战活动列表
    redirect('/web/interact/fight_exps/mid/main.html',param)
}
function gotoMidExchange(param) {   //作战计划
    redirect('/web/interact/fight_exps/mid/exc-list.html',param)
}
function gotoMidHistorye(param) {   //作战记录
    redirect('/web/interact/fight_exps/mid/his-list.html',param)
}
function gotoMidSupport(param) {   //兑换专区
    redirect('/web/interact/fight_exps/mid/sup-list.html',param)
}
//表情包大战-高级场
function gotoHighBqMain(param) {   //表情包大战活动列表
    redirect('/web/interact/fight_exps/high/main.html',param)
}
function gotoHighExchange(param) {   //作战计划
    redirect('/web/interact/fight_exps/high/exc-list.html',param)
}
function gotoHighHistorye(param) {   //作战记录
    redirect('/web/interact/fight_exps/high/his-list.html',param)
}
function gotoHighSupport(param) {   //兑换专区
    redirect('/web/interact/fight_exps/high/sup-list.html',param)
}

//车展表情包
function gotoCarBqIndex(param) {   //首页
    redirect('/web/interact/car-show/index.html',param)
}
function gotoCarExchange(param) {   //作战计划
    redirect('/web/interact/car-show/exc-list.html',param)
}
function gotoCarHistorye(param) {   //作战记录
    redirect('/web/interact/car-show/his-list.html',param)
}
function gotoCarSupport(param) {   //兑换专区
    redirect('/web/interact/car-show/sup-list.html',param)
}
function gotoCarShowRule(param) {   //表情包大战支持详情列表
    redirect('/web/interact/car-show/exps-notice.html',param)
}
//红利
/*
 *跳转红利明细页面
 */
/*红包明细*/
function gotoRedDtls(param) {
    //param.isshare = 1;
    redirect('/web/red/red-details.html', param)
}
/*推广活动*/
function gotoMyCoupon(param) {
    redirect('/web/wechat/my-coupon.html', param)
}
/*我的红利*/
function gotoMyRed(param){
    redirect('/web/red/myred-details.html', param)
}
/*冻结金额*/
function gotoRedAmountFroze(param){
    redirect('/web/red/red-dongjie.html', param)
}
/*红利英雄榜（总榜）*/
function gotoRedHeroList(param){
    redirect('/web/red/red-herolist.html', param)
}
/*今日红利英雄排名*/
function gotoRedTodayList(param){
    redirect('/web/red/red-todaylist.html', param)
}
/*已抢/冻结金额*/
function gotoRedYiQiang(param){
    redirect('/web/red/red-yiqiang.html', param)
}
/*红利首页*/
function gotoRedHome(param){
    redirect('/web/red/red-home.html', param)
}

/*专属公众号详情页 */
function gotoPubGoodsMsg(param){
    redirect('/web/pub-acct/goods-msg.html', param)
}

// 汽车服务专属公众号
function gotoCarBaojia(param){
    redirect('/web/car-service/buy-car/car-baojia.html', param)
}
// 汽车服务养车-商品详情
function gotoGoodDetail(param){
    redirect('/web/car-service/keep-car/goods-details.html', param)
}
// 汽车服务养车-商品详情
function gotoCarGoodsOrder(param){
    redirect('/web/car-service/more-services/determine-order.html', param)
}
function gotoBindPro(param){
    redirect('/web/technician/loadmachine.html', param)
}

//神马D馆活动详情页
function gotosmdgActivityDetail(param){
    redirect('/web/smdg/activity-detail.html',param)
}


//神马D馆领取报名凭证
function gotovoucher(param){
    redirect('/web/smdg/Voucher.html',param)
}

//神马D馆头条文章
function gotosmdgHeadlines(param){
    redirect('/web/smdg/NewsNote.html',param)
}

//神马D馆资讯详情页
function gotosmdgInfoDetail(param){
    redirect('/web/smdg/info-detail.html',param)
}


//神马D馆文章详情
function gotoCarDetail(param){
    redirect('/web/smdg/artical-detail.html',param)
}

//神马D馆车型选择按钮
function gotoCarLists(param){
    redirect('/web/car-service/car-lists.html',param)
}


//神马D馆评论列表
function gotoCommenLists(param){
    redirect('/web/smdg/comment.html',param)
}
//神马D馆报名列表
function gotoEnrolLists(param){
    redirect('/web/smdg/enrollnum.html',param)
}

//神马D馆报名成功
function gotoenrol(param){
    redirect('/web/smdg/enrol.html',param)
}

//报名信息
function gotoEnrollinfo(param){
    redirect('/web/smdg/enrollinfo.html',param)
}

//直播互动
function gotoLiveInteractive(param){
    redirect('/web/smdg/live-Interactive.html',param)
}
//神马假日
function gotoSMholiday(param){
    redirect('/web/smdg/smholiday.html',param)
}
//神马明星评论列表
function gotoStarComment(param){
    redirect('/web/smdg/starComment.html',param)
}


//神马D馆精品推荐
function gotoGiftComment(param){
    redirect('/web/smdg/best-commends.html',param)
}

//报名信息
function gotoEnrollinfo(param){
    redirect('/web/smdg/enrollinfo.html',param)
}

//去明星店铺列表
function gotoStarBrand(param){
    redirect('/web/smdg/starStore.html',param)
}
// todo hebian 奥运竞猜 url: /web/fight_exps/guess.html , 神马竞猜 url: /web/interact/guess/guess.html
function gotoGuess(param){
    redirect('/web/interact/guess/guess.html',param)
}
// todo hebian 奥运竞猜 url: /web/fight_exps/guess.html , 神马竞猜 url: /web/interact/guess/guess.html,宝马竞猜 url: /web/interact/guess/guess-bmw.html
function gotoGuessBmw(param){
    redirect('/web/interact/guess/guess-bmw.html',param)
}
function gotoMyRecrod(param){
    redirect('/web/interact/guess/my-record.html',param)
}
//华唐教育马蹄兑换
function gotoChangeMT(param){
    redirect('/web/wechat/tangB-exchange.html',param)
}
//汽车服务专属公众号--我的一元拍
function gotoMyOneAuction(param){
    redirect('/web/pub-acct/my-one-auction.html',param)
}
//汽车专属公众号--我的页面
function gotoCarMyInfo(param){
    redirect('/web/pub-acct/myinfo.html',param)
}
//专属公众号--一元拍
function gotoPubIndex(param){
    redirect('/web/lottery/pub-index.html',param)
}
//专属公众号--我的钱包
function gotoMyPurse(param){
    redirect('/web/pub-acct/my-purse.html',param)
}
//专属公众号--完善个人信息
function gotoAddMyInfo(param){
    redirect('/web/pub-acct/bd-phone.html',param)
}
//专属公众号--嘀卡充值页面
function gotoDKRecharge(param){
    redirect('/web/pub-acct/recharge.html',param)
}
//会员福利专区-福利会员首页
function gotoVipActivity(param){
    redirect('/web/lottery/vip-activity.html')
}
//会员福利专区-活动规则
function gotoActivityDesc(param){
    redirect('/web/lottery/activity-desc.html')
}


//神马生活改版-- 领取礼物
function gotoDoneeFilled(param){
	redirect('/web/wechat/donee-filled.html',param);
}
//神马生活改版-- 领取礼物第二步
function gotoDoneeFilled2(param){
	redirect('/web/wechat/donee-filled2.html',param);
}
//神马生活改版-- 领取礼物详情
function gotoReceive2(param){
    redirect('/web/wechat/receive2.html',param);
}

//神马假日--已报名状态goto报名凭证
function gotoVoucher(param){
    redirect('/web/smdg/Voucher.html',param);
}

//任务系统
function gotoTask(param){
    param.isshare=1;
    redirect('/web/lottery/task.html',param);
}

//退款详情 提交页面
function gotoRefundDtls(param){
    redirect('web/wechat/refundment-detail.html',param);
}
//申诉平台介入页面
function gotoComplaints(param){
    redirect('/web/wechat/user-complaints.html',param);
}
