/**
 * 公共跳转函数文件
 */
/**
*       修改整合goto方法
*       添加goto地址. 在 gotolink方法中添加UrlArr一个值. 值为数组类型.
*       如 'gotoMode':['https://www.baidu.com/?c=mode',1,1].
*       在页面中使用则依旧不变 , 如 : Interface('gotoMode');
*/
function gotolink(action,param) {
    var Urls = {
        'link':[],//自定义跳转方式,此值勿删!
        'gotoIndex':[SERVER_URL.substr(0, SERVER_URL.length - 1),0,1],//跳转到didi365.com的首页.
        //第一个数组参数代表路径,
        //第二个代表该页面是否需要验证登录,
        //第三个值代表该页面是否可分享. 不写默认为0/否.


        'gotoBindMobile':['/web/wechat/bind-phone.html',1,0],//跳转单独绑定手机号
        'gotoKeepIndex':['/web/car-service/keep-car/index.html',0,0],//养车首页
        'gotoLogin':['/web/car-service/login.html',0,0],//登录
        'gotoNavtoShop':['/web/car-service/keep-car/goto-shop.html',0,0],//一键到店
        'gotoRescue':['/web/car-service/keep-car/rescue.html',0,0],//一键救援
        'gotoRescueSuccess':['/web/car-service/keep-car/rescue-success.html',0,0],//一键救援-提交成功
        'gotoOneKeyPay':['/web/pub-acct/zhifu.html',0,0],//一键支付
        'gotoConsulting':['/web/car-service/keep-car/consulting-online.html',0,0],//一键咨询
        'gotoFillmilleage':['/web/car-service/keep-car/fill-mileage.html',0,0],//4S保养
        'gotoMaintain':['/web/car-service/keep-car/maintain.html',0,0],//4S维修
        'gotoSprayLacquer':['/web/car-service/keep-car/spray-lacquer.html',0,0],//喷漆
        'gotoMyPaintDetail':['/web/car-service/keep-car/paint-of-booking.html',0,0],//喷详情
        'gotoInsurance':['/web/car-service/keep-car/insurance-compensate.html',0,0],//保险理赔
        'gotoClaimsGuide1':['/web/car-service/keep-car/claims-guide1.html',0,0],//理赔指南步骤1
        'gotoClaimsGuide2':['/web/car-service/keep-car/claims-guide2.html',0,0],//理赔指南步骤2
        'gotoClaimsGuide3':['/web/car-service/keep-car/claims-guide3.html',0,0],//理赔指南步骤3
        'gotoMallHome':['/web/pub-acct/points-mall.html',0,0],//积分商城(暂无)
        'gotoKeepInsurance':['/web/car-service/keep-car/keep-insurance.html',0,0],//车险续保-首页
        'gotoCarInsurance':['/web/car-service/keep-car/car-insurance.html',0,0],//车险计算器
        'gotoReplacement':['/web/car-service/keep-car/replacement.html',0,0],//评估置换
        'gotoAgency':['/web/car-service/more-services/peccancy-agency.html',0,0],//违章查询
        'gotoReferralPolicy':['/web/car-service/keep-car/referral-policy.html',0,0],//转介购车
        'gotoSpecialSvc':['/web/car-service/keep-car/special-service.html',0,0],//特色服务
        'gotoAddCar':['/web/car-service/keep-car/add-car.html',0,0],//跳转到养车-添加车辆
        'gotoMyCar':['/web/car-service/keep-car/my-car.html',0,0],//跳转到养车-我的车辆
        'gotoEditCar':['/web/car-service/keep-car/edit-car.html',0,0],//跳转到养车-编辑车辆
        'gotoBaojia':['/web/car-service/buy-car/car-baojia.html',0,1],//跳转到买车-车型报价
        'gotoAdvisoryPrice':['/web/car-service/buy-car/advisory-price.html',1,0],//跳转到买车-咨询底价
        'gotoReserveDrivr':['/web/car-service/buy-car/reserve-drive.html',1,0],//跳转到买车-预约试驾
        'gotoAdvisorySuccess':['/web/car-service/buy-car/advisory-success.html',1,0],//跳转到买车-咨询成功
        'gotoReserveSuccess':['/web/car-service/buy-car/reserve-success.html',1,0],//跳转到买车-预约成功
        'gotoCalculator':['/web/car-service/buy-car/calculator.html',0,0],//跳转到买车-全款购车计算器
        'gotoCalculator2':['/web/car-service/buy-car/calculator2.html',0,0],//跳转到买车-贷款购车计算器
        'gotoMyConsultant':['/web/car-service/more-services/my-consultant.html',0,0],//跳转到我的专属顾问
        'gotoCoplain':['/web/car-service/more-services/complain.html',0,0],//跳转到专属顾问投诉或咨询页面secord=0为投诉页面secord=1咨询页面
        'gotoAdviserShare':['web/car-service/more-services/adviser-share.html',0,1],//从专属顾问跳转到分享页面
        'gotoCarLosts':['/web/car-service/car-lists.html',0,0],//跳转至选择车型页面（此页面数据为基础数据）
        'gotoFillMileage':['/web/car-service/keep-car/fill-mileage.html',0,0],//预约保养-填写里程
        'gotoChoseProject':['/web/car-service/keep-car/chose-project.html',0,0],//预约保养-选择方案
        'gotoConfirmBooking':['/web/car-service/keep-car/confirm-booking.html',0,0],//预约保养-确认预约
        'gotoKeepCarRS':['/web/car-service/keep-car/reserve-success.html',0,0],//预约保养-预约成功
        'gotoMyBook':['/web/car-service/keep-car/my-booking.html',0,0],//预约保养-我的预约
        'gotoMyBookDetail':['/web/car-service/keep-car/detail-of-booking.html',0,0],//预约保养-预约详情
        'gotoMyManual':['/web/car-service/keep-car/maintenance-manual.html',0,0],//预约保养-保养手册
        'gotoPeccancyAgency':['/web/car-service/more-services/peccancy-agency.html',0,0],//违章代办
        'gotoPeccancyList':['/web/car-service/more-services/peccancy-list.html',0,0],//违章代办-违章列表
        'gotoInsuranceCompensate':['/web/car-service/keep-car/insurance-compensate.html',0,0],//保险理赔
        'gotoFillFriendInfo':['/web/car-service/keep-car/fill-friend-info.html',0,0],//填写好友信息
        'gotoUsedPhone':['/web/car-service/keep-car/used-phone.html',0,0],//养车-保险理赔-常用电话
        'gotoBuyCarIndex':['/web/car-service/buy-car/index.html',0,0],//买车-车辆列表
        'gotoCGuide1':['/web/car-service/keep-car/claims-guide1.html',0,0],//养车-保险理赔-理赔流程
        'gotoCGuide2':['/web/car-service/keep-car/claims-guide2.html',0,0],//养车-保险理赔-理赔流程
        'gotoCGuide3':['/web/car-service/keep-car/claims-guide3.html',0,0],//养车-保险理赔-理赔流程
        'gotoGoodDetail':['/web/car-service/keep-car/goods-details.html',0,0],//养车-商品详情
        'gotoDeterOrder':['/web/car-service/more-services/determine-order.html',1,0],  //确认汽车服务订单页
        'gotoOrderList':['/web/wechat/orders.html',0,0],  //订单页面
        'gotoCashier':['/web/lottery/cashier.html',0,0],  //支付页面
        'gotoTurnTable':['/web/car-service/game/turntable.html',0,0],  //大转盘
        'gotoShakePlay':['/web/car-service/game/shake/shake-play.html',0,0],  //摇一摇
        'gotoShakeEtc':['/web/car-service/game/shake/shake-etc.html',0,0],  //摇一摇场次列表
        'gotoShakeList':['/web/car-service/game/shake/shake-list.html',0,0],  //摇一摇参与列表
        'gotoEvaluation':['/web/car-service/keep-car/evaluation-result.html',0,0],
        'gotoEnrollinfo':['/web/smdg/enrollinfo.html',0,0],//神马D馆-报名信息
        'gotoCarnivalEnrollinfo':['/web/smdg/carnival-enrollinfo.html',0,0],//神马D馆-嘉年华-报名信息
        'gotoCarEstimateLists':['/web/car-service/car-estimate-lists.html',0,0],//神马D馆-报名信息
        /***************************************韦邦VBMW项目**************************************/
        'gotoDemoPeccancyList':['/web/car-service/demo/baoma/peccancy-list.html',0,0],//违章代办-违章列表
        'gotoDemoBaoyao':['/web/car-service/demo/baoma/baoyan.html',0,0],//预约保养
        /*****************************************顾问*******************************************/
        'gotoEvaluta':['/web/car-service/im/evaluate.html',0,0],//评价顾问
        'gotoChatRoom':['/web/car-service/im/chat.html',0,0],//跳转到聊天页面
        'gotoChatRecord':['/web/car-service/im/record.html',0,0],//跳转到聊天消息列表
        'gotoChage':['/web/car-service/im/change.html',0,0],//更换顾问-顾问列表
        'gotoOnceConsult':['/web/car-service/im/once-consult.html',0,0],//一键咨询
        /*****************************************续保******************************************/
        'gotoInsuranceCalculate':['/web/car-service/keep-car/insurance-calculate.html',0,0],//续保-宝贝计算
        'gotoRecharge':['/web/user/recharge.html',1,0],//跳转去充值
        /****************************************mall********************************************************/
        'gotoMallIndex':['/web/car-service/mall/index.html',0,0],//mall首页
        'gotoMallPartake':['/web/car-service/mall/partake.html',0,0],//优惠券参与商品
        'gotoMallMyDraw':['/web/car-service/mall/myDraw.html',0,0],//我的优惠券
        'gotoMallDrawDetail':['/web/car-service/mall/drawDetail.html',0,0],//优惠券详情
        'gotoMallGoodsDetail':['/web/car-service/mall/goods-msg.html',0,0],//积分商品详情
        'gotoGoodsDetail':['/web/pub-acct/goods-msg.html',0,0],//积分商品详情
        'gotoMallDrawShop':['/web/car-service/mall/drawShop.html',0,0],//商品优惠券可领取列表
		'gotoMyCard':['/web/car-service/mall/myCard.html',0,0],//我的卡券
		'gotoMyPackageCard':['/web/car-service/mall/my-package-card.html',0,0],//我的套餐卡
		'gotoMyRecharge':['/web/car-service/mall/my-recharge.html',0,0],//我的充值卡
        'gotoCLIST':['/web/pub-acct/comment_list.html',0,1],  //评论列表
        'gotoBrandCommend':['/web/pub-acct/brand-recommend.html',0,0],  //店铺首页
        'gotoMallOrder':['/web/car-service/mall/determine-order.html',0,0],  //结算确认订单
        'gotoComboList':['/web/car-service/mall/combo.html',0,0],//套餐列表
		'gotoUsePackageCard':['/web/car-service/mall/use-package-card.html',0,0],//套餐卡使用
		'gotoPreview':['/home/config/preview',0,0],//使用规则
        'gotoAddress':['/web/wechat/donee-address.html',0,0],//添加地址
		'gotoPackageCardOrder':['/web/car-service/mall/package-card-determine-order.html'],//套餐卡确认订单
        'gotoPackageCardDetail':['/web/car-service/mall/package-card-detail.html'],//商城套餐卡详情
        'gotoMyMember':['/web/car-service/mall/my-member.html'],//我的会员
        'gotoMemberLevel':['/web/car-service/mall/member-level.html'],//会员等级
        'gotoIntegralSign':['/web/car-service/mall/integral-sign.html'],//积分
        'gotoMemberInterest':['/web/car-service/mall/member-interest.html'],//会员权益
        'gotoMemberExplain':['/web/car-service/mall/menmber-explain.html'],//会员说明
        'gotoHowAcqureSign':['/web/car-service/mall/how-acquire-sign.html'],//如何获得积分
        'gotoDeterSetOrder':['/web/wechat/orders.html',0,0],  //订单页面
        'gotoAddAddress':['/web/pub-acct/bd-phone.html',0,0],  //添加地址页面
        'gotoMallAdvice':['/web/car-service/mall/advice.html',0,0],  //添加地址页面
        'gotoMyStatements':['/web/car-service/more-services/my-statements.html'],//我的结算单
        'gotoMyGarage':['/web/smdg/my-garage.html'],//商城2.4--我的车库
    };
    if(Urls[action]){
        if (param != '') {
            if (typeof param != 'object') {
                param = JSON.parse(param);
            }
        }
        var _url = Urls[action];
        if (_url[2]) {                          //如果有第3个值且为1.则代表此页面可以分享. 添加isshare参数.
            param.isshare = 1;
        };
        if (_url[1]) {                          //如果有第2个值且为1.则代表此页面需要验证登录.成功才能跳转.
            // if (!isLogin()) {
            //     alert("未登陆！！！");
            //     return ;

            //}
            isLogin(function(ret){
                if(!ret){
                    return;
                }
            })
        }
        if(action == 'link'){                     //如果参数为'link', 则表示此次跳转为自定义链接跳转.从参数中取出link地址并跳转.
            param.isshare = 1;
            _url[0] = param.link;
            delete param.link;
        }
        console.log('redirect:---->',_url[0], param);
        redirect(_url[0], param);
    }
}
