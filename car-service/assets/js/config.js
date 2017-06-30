/**
 * 公共配置文件
 */

var DEBUG = 0; //1开启调试模式
var TIMEOUT = 30000; //超时时间 30秒
var EXPIRE = 1800000; //缓存有效期 30分钟
var METHOD = 'get';  //网络请求方式
var WxShare = new Object();  //分享对象
var CLREAR_COPY=true;//屏蔽页面复制内容
var UserInfo = new Object();//用户信息
/*养车首页菜单配置*/
var car_index_menu=[
    {id:0,icon:'/web/car-service/assets/image/',show:0,gt:''},
    {id:1,pos:1,name:'一键到店',icon:'daodian1@2x.png',show:0,gt:'gotoNavtoShop',disable:false},//一键到店
    {id:2,pos:1,name:'一键救援',icon:'jiuyuan@2x.png',show:0,gt:'gotoRescue',disable:0},//一键救援
    {id:3,pos:1,name:'一键支付',icon:'zhifu@2x.png',show:0,gt:'gotoOneKeyPay',disable:false},//一键支付
    {id:4,pos:1,name:'一键咨询',icon:'zixun@2x.png',show:0,gt:'gotoOnceConsult',disable:false},//一键咨询
    /****************************广告栏上方菜单******************************/
    {id:5,pos:2,name:'4S保养',icon:'4sbaoyang@2x.png',show:0,gt:'gotoFillmilleage',disable:false},//4S保养
    {id:6,pos:2,name:'4S维修',icon:'4sweixiu@2x.png',show:0,gt:'gotoMaintain',disable:false},//4S维修
    {id:7,pos:2,name:'喷漆',icon:'penqi@2x.png',show:0,gt:'gotoSprayLacquer',disable:false},//喷漆
    {id:8,pos:2,name:'保险理赔',icon:'lipei@2x.png',show:0,gt:'gotoInsurance',disable:false},//保险理赔
    {id:9,pos:2,name:'商城',icon:'jifen@2x.png',show:0,gt:'gotoMallIndex',disable:false},//积分商城
    {id:10,pos:2,name:'车险续保',icon:'chexian@2x.png',show:0,gt:'gotoKeepInsurance',disable:false},//车险续保
    {id:11,pos:2,name:'评估置换',icon:'zhihuan@2x.png',show:0,gt:'gotoReplacement',disable:false},//评估置换
    {id:12,pos:2,name:'违章查询',icon:'weizhang@2x.png',show:0,gt:'gotoAgency',disable:false},//违章查询
    {id:13,pos:2,name:'转介购车',icon:'zhuanjie@2x.png',show:0,gt:'gotoReferralPolicy',disable:false},//转介购车
    {id:14,pos:2,name:'特色服务',icon:'tese@2x.png',show:0,gt:'gotoSpecialSvc',disable:false},//特色服务
    {id:15,pos:3,name:'会员特惠',icon:'',show:0,gt:'',disable:false}//会员特惠
    /****************************广告栏下方菜单******************************/
];
var API = {
    'SERVER_URL': SERVER_URL,  //服务器url
    'APP_LICATION': 'gold/',  //项目名
    'APPID': '1',
    'PLATFORM': 'web',
    'VERSION': '1.0',
    'API_LIST': {  //api接口列表
        'WECHAT_JSSDK': 'public/jssdk', //微信JS-SDK配置接口
        'LOGIN_WEChAT': 'user/login',  //微信授权、用户登录 (APP拦截)
        'API_CODE': 'api_paths/api_name',    //设置API的配置代码. 原来的先全删掉,需要的再一个个加.
        'PHONE_NUMBER': 'public/sms', //手机验证码
        'BING_PHONE': 'login/ajaxbinding',      //绑定手机
        'GOODS_ADDRESS': 'user/addAddress',  //设置收货地址
        'GOLD_WXHOME_PICTURE': 'gold/wxhome/picture',//专属公众号的二维码
        'WXPAY_DOPAY': 'wxpay/dopay',  //获取微信支付参数
        'WXPAY_CHECKORDER': 'wxpay/checkorder',  //检查订单支付状态
        'API4_ORDER_ORDERPAY': 'api4/order/orderpay',  //确认支付
        'PAY_DOPAY': 'api4/pay/dopay',  //统一下单接口
        'GET_PAY_PARAMETER': 'api4/pay/getPayParameter', //获取第三方支付参数
        'PAY_CHECKORDER': 'api4/pay/checkorder',  //检查订单支付状态
        'LOGIN_USER': 'user/is_login',//判断用户是否登录
        'PURSE_DC':'/api4/user/recharge',//钱包-嘀卡

        'ARTICLE_LIST':'gold/onebuycar/articleLists',//文章列表
        'ARTICLE_DETAILS':'gold/onebuycar/articleDetail',//文章详情
        'ADD_ARTICLE_COMMENT':'Gold/onebuycar/addArticleComment',//文章评论提交
        'SUPPORT_YOU':'gold/onebuycar/doLikeArticleComment',//评论点赞
        'BRAND_HEAD':'gold/wxhome/getHome',// 店长推荐头部
        'COMMEND_PRODUCT':'gold/wxhome/getRecommended',// 店长推荐 推荐
        'BRAND_COMMEND_SHARE':'gold/wxhome/share',// 店长推荐 分享信息
        'BRAND_COMMENDDETAILS_SHARE':'gold/wxhome/getCommodities',// 店长推荐详情 分享信息
        'CATEGORY_LIST':'gold/wxhome/getClassification',// 店长推荐 分类
        'ALL_PRODUCT':'gold/wxhome/getSales',// 店长推荐 全部商品
        'RECOMMEND_GETSEARCH':'gold/wxhome/seek',// 店长推荐 搜索
        'PUBACCT_GETSEARCHHISTORY':'Tech/serve/getRecord',// 店长推荐 搜索历史记录
        'GOLD_WXHOME_MYCENTE':'gold/Wxuser/myCenter',//我的个人中心
        'GOLD_WXHOME_BROKERAGE':'gold/Wxuser/brokerage',//我的佣金
        'GOLD_WXHOME_PROFITDETAIL':'gold/Wxuser/profitDetail',//佣金明细
        'GOLD_WXHOME_GETRESULT':'gold/wxhome/getresult',//商品结果集
        'GOLD_WXHOME_GETSUBDETAILS':'gold/wxhome/getSubdetails',//商品详情

        'GOODS_COMMENT': 'circle/allcomment',// 商品评论
        'CART_GETCARTINFO': 'cart/getCartInfo', //获取购物车信息
        'CART_ADDTOCART': 'cart/addToCart',  //加入购物车
        'CART_DELGOODS': 'cart/delCartGoods',            //删除购物车商品
        'CART_CHANGEGOODS': 'cart/changeCartGoods', //修改购物车
        'ORDER_CONFIRM': 'order/confirm',  //确认订单
        'ORDER_CREATEORDER': 'order/createorder',  //生成订单
        'ORDER_GETORDERNO': 'order/getOrderNo',  //获取订单号
        'USER_GET_ADDRESSLIST': 'user/getAddressList',  //收货地址列表接口
        'USER_ADDADDRESS': 'user/addAddress',  //添加、编辑、删除收货接口
        'CHANNELPOINT_GETEXCHANGEINFO':'ChannelPoint/get_exchange_info',//用户第三方信息
        'CHANNELPOINT_EXCHANGEPOINT':'ChannelPoint/exchange_point',//确定使用第三方抵扣
        'ACTIVITY_QUERY': 'gold/order/queryActivity',//查询优惠券
        'PERSONAL_INFO':'gold/Wxuser/myCenter',//我的个人信息
        'PACKAGE_UPDATEMYINFO': 'package/updateMyInfo',//更新信息
        'PACKAGE_UPD_IMAGE': 'api4/public/uploadimage',//上传头像
        'MYQRCODE_INFO':'gold/Wxuser/qrcode',//店铺推广二维码
        'MYFAMILY_INFO':'gold/circle/myfamily',//我的家族
        'MYFAMILYLIST_INFO':'gold/circle/myfamily',//家族成员列表
        'GOLD_ORDER_PERSONPAY':'gold/order/personPay', //当面付订单
        'GOLD_ORDER_CREATEPERSONPAY':'gold/order/createPersonPay',//生成当面付订单
        'USER_MYCARD':'api4/user/mycard', //我的绑定的银行卡
        'USER_WITHDRAW': 'api4/user/withdraw',  //结款操作
        'INTOACCOUNT':'circle/intoaccount',//提现
        'ONEBUYCAR_GETFORM':'onebuycar/getNewForm',//预约信息获取表单
        'ONEBUYCAR_subscribe':'onebuycar/newSubscribe',//预约信息提交表单
        'INDEX_GETSEARCH': 'index/getSearch',//商品，店铺搜索接口
        'INDEX_GETSEARCHHISTORY': 'index/getSearchHistory',//得到搜索历史
        'USER_MOREINFO':'api4/user/moreinfo',//我的钱包页面信息
        'USER_PAYMENTPWD':'api4/user/paymentpwd',//type=1验证支付密码,type=2修改支付密码,type=6验证密保问题及重置支付密码,type=5设置支付密码及密保问题
        'USER_DEFAULTCARD':'api4/user/defaultcard',//设置默认银行卡
        'USER_DELETECARD':'api4/user/deletecard',//解除绑定银行卡
        'USER_ADDCARD':'api4/user/addcard',//添加银行卡
        'WXUSER_BANKLISTS':'Wxuser/bankLists',//微信端银行卡列表



        /************************汽车服务专属公众号接口******************************/
        'CAR_CARI_GETUSERINFO':'car/user/getUserInfo',//获取用户信息
        'CAR_CARINFO_GETMENU':'car/carinfo/getMenu',//养车-获取首页菜单
        'CAR_GOODS_INDEX':'car/goods/index',//养车-获取会员特惠列表
        'CAR_INDEX_BANNER':'car/carinfo/getUpkeepAd',//养车-首页广告
        'CAR_INDEX_BANNER_CLICK':'car/carinfo/incUpkeepAd',//养车-首页广告点击
        'CAR_CARINFO_NEWESTCUT':'car/buycar/newestcut',//买车-最新优惠
        'CAR_CARINFO_GETCARINFO':'Car/Carinfo/getCarInfo',//养车-我的车辆 接口
        'CAR_CARINFO_SETDEFAULTCAR':'Car/Carinfo/setDefaultCar',//养车-我的车辆-设置默认车辆
        'CAR_CARINFO_DELCAR':'Car/Carinfo/delCar',//养车 -删除车辆
        'CAR_CARINFO_ADDCAR':'Car/Carinfo/addCar',//养车 -添加车辆
        'CAR_BUYCAR_BUYCARAD':'car/buycar/buycarad',//买车--选择车型/询底价/预约试驾-广告位
        'CAR_BUYCAR_CARBRAND':'car/buycar/carbrand',//买车-车品牌列表
        'CAR_BUYCAR_CARMODEL':'car/buycar/carmodel',//买车-车型列表
        'CAR_BUYCAR_CARDETAIL':'car/buycar/cardetail',//买车-车型报价
        'CAR_BUYCAR_CONSULTPRICE':'car/buycar/consultprice',//买车-询底价
        'CAR_BUYCAR_CONSULTPRICEOK':'car/buycar/consultpriceok',//买车-询底价提交
        'CAR_BUYCAR_TRYDRIVE':'car/buycar/trydrive',//买车-预约试驾成功
        'CAR_BUYCAR_PRICECOUNSELOR':'car/buycar/pricecounselor',//买车-询低价-顾问
        'CAR_BUYCAR_DRIVECOUNSELOR':'car/buycar/drivecounselor',//买车-试驾-顾问
        'CAR_BUYCAR_COUNSELOR':'car/buycar/counselor',//买车-我的专属顾问
        'CAR_CARINFO_GETONECARINFO':'Car/Carinfo/getOneCarInfo',//养车-获取单辆车辆信息
        'CAR_CARINFO_GETCARINFO':'Car/Carinfo/getCarInfo',//养车-获取车辆信息
        'CAR_CARINFO_EDITCAR':'Car/Carinfo/editCar',//养车-修改车辆
        'CAR_BUYCAR_LOCATION':'car/buycar/location',//一键到店
        'CAR_CARINFO_GETCARBRAND':'Car/Carinfo/getCarBrand',//三级联动-获得车品牌
        'CAR_CARINFO_GETCARMODEL':'Car/Carinfo/getCarModel',//三级联动-获得车型
        'CAR_CARINFO_GETCARDETAIL':'Car/Carinfo/getCarDetail',//三级联动-获得车款
        'CAR_UPKEEP_ONEKEYSAVEEMPLOYEE':'car/upkeep/oneKeySaveEmployee',//养车-一键救援-获得顾问
        'CAR_UPKEEP_ONEKEYSAVE':'Car/Upkeep/oneKeySave',//养车-发起一键救援
        'CAR_UPKEEP_MAINTAINOPTIONS':'car/Upkeep/maintainOptions',//预约保养-查看保养方案
        'CAR_UPKEEP_LOADRESERVATION':'car/Upkeep/loadReservation',//预约保养-加载确认保养预约页面
        'CAR_UPKEEP_MANUALSHARE':'car/Upkeep/manualShare',//预约保养-保养手册分享
        'CAR_UPKEEP_RESERVATION':'car/Upkeep/reservation',//预约保养-确认保养的预约
        'CAR_UPKEEP_RESERVATIONINFO':'car/Upkeep/reservationInfo',//预约保养-预约详情
        'CAR_UPKEEP_MANUALINFO':'car/Upkeep/manualInfo',//预约保养-保养手册
        'CAR_UPKEEP_RESERVATIONLIST':'car/Upkeep/reservationList',//预约保养-我的预约列表
        'CAR_UPKEEP_UPKEEPEMPLOYEE':'car/upkeep/upkeepEmployee',//预约保养-预约保养顾问
        'CAR_REPAIR_EMPLOYEE':'car/Repair/repairEmployee',//养车-4s维修-获得顾问
        'CAR_INSURANCE_PAYMONEYEMPLOYEE':'car/Insurance/payMoneyEmployee',//养车-保险理赔-顾问以及欢迎语
        'CAR_REPAIR_ORDER':'car/Repair/repairOrder',//养车-4s维修-获得顾问
        'CAR_BUYCAR_LACQUER':'car/buycar/lacquer',//养车-喷漆
        'CAR_INSURANCE_PAYMONEYORDER':'Car/Insurance/payMoneyOrder',//养车-保险理赔-提交表单
        'CAR_REFFERAL_INDEX':'car/referral/index',//用户注册接口
        'CAR_BUYCAR_REPLACEFLAG': '/car/buycar/replaceFlag', //更换顾问
        'CAR_REFFERAL_SHARE':'car/referral/referralshare',//养车-转介购车-分享
        'CAR_REFERRAL_PAL_INFO':'car/referral/pal_info',//养车-填写好友信息-获取顾问
        'CAR_BUYCAR_LACQUERCOUNSELOR':'car/buycar/lacquercounselor',//养车-喷漆-顾问
        'CAR_BUYCAR_LACQUEROK':'car/buycar/lacquerok',//养车-喷漆-提交预约
        'CAR_BUYCAR_LACQUERVIEW':'car/buycar/lacquerview',//养车-喷漆-预约详情
        'CAR_INSURANCE_PAYMONEYPHONE':'car/Insurance/payMoneyPhone',//养车-保险理赔-常用电话
        'CAR_INSURANCE_PAYMONEYGUIDEOPTION':'car/Insurance/payMoneyGuideOption',//养车-保险理赔-理赔流程
        'CAR_INSURANCE_PAYMONEYGUIDE':'car/Insurance/payMoneyGuide',//养车-保险理赔-理赔流程2
        'CAR_REFERRAL_ADD_FRIEND':'car/referral/add_friend',//养车-转介购车-提交好友信息
        'CAR_REFFERAL_FEATURE':'car/referral/feature',//养车-特色服务
        'CAR_REFFERAL_FEATURESHARE':'car/referral/featureshare',//养车-特色服务
        'CAR_BUYCAR_CALCULATOR':'car/buycar/calculator',//买车-全款购车计算器
        'CAR_BUYCAR_CALCULATORLOAN':'car/buycar/calculatorloan',//买车-贷款购车计算器
        'CAR_BUYCAR_CALCULATORNEXT':'car/buycar/calculatornext',//买车-计算器可选
        'CAR_INSURANCE_RENEWINSURANCEEMPLOYEE':'car/Insurance/renewInsuranceEmployee',//养车-车险续保-顾问以及欢迎语
        'CAR_INSURANCE_RENEWINSURANCEORDER':'car/Insurance/renewInsuranceOrder',//养车-车险理赔-确定顾问
        'CAR_INSURANCE_CALCULATOR':'car/Insurance/calculator',//养车-车险续保-试算新车保费
        'CAR_VIOLATE_GETCARLIST':'car/Violate/getCarList',//违章代办-汽车列表
        'CAR_VIOLATE_GETCARVIOLATION':'car/Violate/getCarViolation',//违章代办-汽车详情
        'CAR_VIOLATE_GETCARALL':'car/Violate/getCarall',//违章代办-汽车信息
        'CAR_VIOLATE_DELETECAR':'car/Violate/deleteCar',//违章代办-删除车辆信息
        'CAR_USER_COUNSELOR':'car/user/counselor',//我的专属顾问
        'CAR_USER_COMPLAINT':'car/user/complaint',//专属顾问投诉
        'CAR_USER_SHARE':'car/user/share',//专属顾问分享信息
        'CAR_UPKEEP_ONEKEYCONSULT':'Car/Upkeep/oneKeyConsult',
        'CAR_ASSESS_INDEX':'car/assess/assess_result',//评估置换-开始估价
        'CAR_ASSESS_PROVINCE':'car/assess/get_province',//评估置换-开始估价-选择省
        'CAR_ASSESS_CITY':'car/assess/get_city',//评估置换-开始估价-选择城市
        'CAR_GET_BRAND':'car/assess/get_brand',//评估置换-开始估价-选择车品牌
        'CAR_GET_MODEL':'car/assess/get_model',//评估置换-开始估价-选择车型
        'CAR_GET_DETAIL':'car/assess/get_detail',//评估置换-开始估价-选择车款
        'CAR_ASSESS_ADD_ASSESSS':'car/assess/add_assess',//评估置换-申请置换
        'CAR_ASSESS_GET_SERVER':'car/assess/get_server',//评估置换-获取顾问
        'CAR_INSURANCE_PAYMONEYWELCOME':'car/Insurance/payMoneyWelcome',//保险理赔欢迎语
        'CAR_BUYCAR_NEWESTSHARE':'car/buycar/newestshare',//买车-最新优惠-分享
        'CAR_BUYCAR_BUYCARSHARE':'car/buycar/buycarshare',//买车-车型报价-分享
        /************************图片上传接口******************************/
        'ONEBUY_UPD_IMAGE': 'onebuy/uploadBaskImage',//上传图片
        /************************汽车服务订单接口******************************/
        'CAR_GOODS_DETAILS':'car/goods/details',//汽车服务商品详情接口
        'ORDER_CONFIRMSERVER':'api4/order/confirmServer',//提交订单界面接口
        'ORDER_CREATE_SERVER':'api4/order/createServerOrder',//生成会员特惠订单
        /************************摇一摇游戏******************************/
        'CAR_GAME_SHAKE': 'car/game/shake',//摇一摇首页
        'CAR_GAME_SHAKETIMES': 'car/game/shakeitems',//摇一摇主页
        'CAR_GAME_SHAKEVALUE': 'car/game/shakevalue',//获取摇一摇的速度值
        'CAR_GAME_SHAKETIMESLOG': 'car/game/shakeitemslog',//获取摇一摇场次列表
        'CAR_GAME_SHAKELOG': 'car/game/shakelog',//获取摇一摇参与列表
        'CAR_GAME_SHAKEWIN': 'car/game/shakewinning',//获取摇一摇中奖信息
        'CAR_GAME_SHAKESHARE': 'car/game/shakeshare',//获取摇一摇分享信息
        /************************摇一摇游戏******************************/
        /***************************大转盘*******************************/
        'CAR_DIAL_GAME_INDEX':'car/dial/game_index',//活动进入页获取信息
        'CAR_DIAL_INDEX':'car/dial/index',//活动主页面获取信息
        'CAR_DIAL_GET_RAND':'car/dial/get_rand',//获取角度
        'CAR_DIAL_DIALSHARE':'car/dial/dialshare',//获取大转盘分享信息
        /************************韦帮合正的项目***************************/
        'TECH_CARINFO_GETONECARINFO':'tech/Carinfo/getOneCarInfo',//获取单辆车信息
        'TECH_VB_MYSHOP':'tech/vb/myShop',//获取我的专营店号码
        'TECH_UPKEEP_GETCARLIST':'tech/upkeep/getCarList',//获取违章车辆列表
        'TECH_UPKEEP_GETCARVIOLATION':'tech/upkeep/getCarViolation',
        'TECH_UPKEEP_GETCARALL':'tech/upkeep/getCarall',
        'TECH_CARINFO_SAVECONSULT':'Tech/Carinfo/saveConsult',//保存咨询信息
        'TECH_UPKEEP_ADD_SUBSCRIBE':'tech/upkeep/add_subscribe',//保存保养信息
        'TECH_CARINFO_ADDSAVE':'Tech/Carinfo/addSave',//保存理赔救援信息
        'TECH_CARINFO_UPKEEP':'tech/carinfo/upkeep',//获取车辆保养信息
        'TECH_CARINFON_EDITUPKEEP':'tech/carinfo/editUpkeep',//设置上次保养信息
        'TECH_VB_AROUNDSHOPS':'/tech/vb/aroundShops',//根据经纬度和车架号获取专营店列表
        'TECH_VB_ADDSHOP':'tech/vb/addShops',//添加专营店数据
        /*****************************顾问********************************/
        'CAR_USER_COMMENT':'car/user/comment',//评价顾问
        /************************IM***************************/
        'CAR_USER_MSGLIST':'car/user/msglist',
        'CAR_BUYCAR_OPTFLAG':'/car/buycar/optFlag',//更换顾问
        'CAR_USER_ADVICE':'/car/user/advice',//一键咨询
        'CAR_USER_SETFEEDBACK':'car/user/setFeedback',//用户意见反馈
        /*********************续保***************************/
        'CAR_INSURANCE_GETMYINSURANCE':'car/Insurance/getMyInsurance',//获取我的保单
        'CAR_INSURANCE_GETADVISER':'car/Insurance/getAdviser',//获取续保顾问列表
        'CAR_INSURANCE_GETINSURANCEUSERINFO':'car/Insurance/getInsuranceUserInfo',//获取
        'CAR_MANAGEPLATFORM_INSURANCEEDIT':'car/ManagePlatform/insuranceEdit',//可编辑的保单详情
        'CAR_INSURANCE_GETINSCOMPANY':'car/Insurance/getInscompany',//选择保险公司
        'CAR_MANAGEPLATFORM_INSURANCEEDITOK':'car/ManagePlatform/insuranceEditOK',//续保详情---商户端提交接口
        'CAR_INSURANCE_PUTINSURANCEINFO':'car/Insurance/putInsuranceInfo',//续保详情---客户端提交接口
        'CAR_INSURANCE_PUTINSURANCEORDER':'car/Insurance/putInsuranceOrder',//续保详情---生成订单接口

        /*********************积分商城***************************/
        'CAR_SIGN_GETGOODS':'car/sign/getGoods',//获取积分商品
        'CAR_SIGN_GOODSCATEGORIES':'car/sign/goodsCategories',//商品分类
        'CAR_SIGN_GOODDETAILS':'car/sign/goodDetails',//商品详情
        'CAR_SIGN_MYINTEGRAL':'car/sign/myIntegral',//我的积分
        'CAR_PACKAGECARD_MALLCARDLIST':'car/packageCard/mallCardList',//套餐卡列表
        'CAR_ORDER_CONFIRM':'car/order/confirm',//积分商品-确认支付
        'CAR_ORDER_CREATEORDER':'car/order/createorder',//积分商品-生成订单
        'CAR_SIGN_STORESHARE':'car/sign/storeshare',//商城首页分享
        'CAR_INTEGRAL_USERSHARE':'car/Integral/Usershare',//会员特惠分享
        /*********************套餐卡相关***************************/
        'CAR_CARD_CARDDETAILED':'car/packageCard/cardDetailed',//查看套餐卡详情
        'GOLD_PRIVILEGE_USER':'gold/privilege/user_privilege',//优惠券---我的优惠券
        'GOLD_PRIVILEGE_DETAILS':'gold/privilege/privilege_details',//优惠券---详情
        'GOLD_PRIVILEGE_JOINGOODS':'gold/privilege/join_goods',//优惠券---参与商品
        'GOLD_PRIVILEGE_USERPRIVILEGELIST':'gold/privilege/user_privilege_list',//优惠券---查看店铺优惠券
        'GOLD_PRIVILEGE_SHOWPRIVILEGE':'gold/privilege/show_privilege',//优惠券---公众号优惠券
        'GOLD_PRIVILEGE_GETPRIVILEGE':'gold/privilege/get_privilege',//优惠券---领取
        'GOLD_PRIVILEGE_HELPPRIVILEGE':'gold/privilege/help_privilege',//优惠券---领取
		'CAR_CARD_CARDLIST':'car/packageCard/cardlist',//用户套餐卡列表
        'CAR_CARD_FETCHCARD':'Car/PackageCard/fetch',//用户领取卡片
        'CAR_CARD_USECARD': 'car/packageCard/use_card',//用户确认核销项目
		'CAR_CARD_BINDCARDNO':'car/packageCard/bind_card_no',//套餐卡绑定车牌
        'CAR_CARD_MALLCARDDETAIL':'car/packageCard/mallCardDetailed',//商城套餐卡详情
		'CAR_CARD_CONFIRMORDERSHOW':'car/packageCard/confirm_order_show',//套餐卡购买显示页面
		'DOLD_PRIVILEGE':'gold/privilege/get_project_privilege',//改变订单数量更新优惠券
		'DOLD_MYPACKGECARDCONUT':'car/packageCard/myPackageCardCount',//套餐卡优惠券总数量
        /*************************会员提交相关***********************************************/
        'CAR_USER_MYMEMBER':'car/user/myMember',//我的会员
        'CAR_USER_USERRANK':'car/user/userRank',//会员等级
        'CAR_USER_INTEGRAL':'car/user/integral',//积分明细
        'CAR_SIGN_SIGNDETAIL':'car/sign/signDetail',//签到明细
        'CAR_SIGN_INTEGRALRULE':'car/sign/integralRule',//积分规则
        'CAR_SIGN_SIGN':'car/sign/sign',//签到
		'CAR_CARD_SHARE':'Car/PackageCard/wx_share',//套餐卡分享
		'CAR_CARD_CREATESHOPORDER':'car/PackageCard/createShopOrder',//套餐卡生成订单(商城)
		'CAR_CARD_CREATEORDER':'car/PackageCard/createOrder',//套餐卡生成订单
		'CAR_INTEGRAL_GETSHARE':'car/Integral/getShareIntegral',//分享获得积分
        'CAR_CARD_ISBINDPHONE':'/Gold/Lowprice/isBind',//是否绑定手机

		'CAR_CARD_PAYCALLBACK':'car/packageCard/payCallback',//套餐卡支付返回

		'CAR_USER_STATEMENTSDETAILS':'car/user/statements_details',//用户结算单详情
		'CAR_USER_PAYSATEMENTS':'car/user/pay_statements',//用户结算单支付
		'CAR_USER_CONFIRM':'car/user/statements_confirm',//用户结算单确认
    }
};
