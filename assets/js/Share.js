$(function() {

    var userIdentify = $("input[name='userIdentify']").val() || "";
    var relativeUserIdentify = $("input[name='relativeUserIdentify']").val() || "";
    var type = 12;
/*
    //公共配置
    var hd_config = {
        url: window.location.href,// 分享的网页链接
        title: document.title,// 标题
        desc: '',// 描述
        img: '',
        img_title: '',
        from: '',
        appid:"wx62522547cafea617"
    };
*/
    var options = {};
    try{
    	options = (shareConfig != null && shareConfig != undefined && shareConfig.constructor == Object) ? shareConfig : {};
    }catch (e) {
    	options = {};
	}
    var hd_config = $.extend({
    	url : window.location.href,// 分享的网页链接
        title : document.title,// 标题
        desc : '',// 描述
        img : '',
        img_title : '',
        from : '',
        appid:"wx62522547cafea617"
    }, options);
    
    //wxConfig(hd_config);
    console.log(hd_config.title);
    console.log(hd_config.desc);
    console.log(hd_config.img);

    var plusHTML='<!-- UC 和 QQ 浏览器可使用 -->'
                    +'<div class="share-content share-qq-uc">'
                        +'<div class="share">'
                            +'<div class="share-title">分享到</div>'
                            +'<ul class="clear share-target-list">'
                                +'<li class="weixin nativeShare" data-app="weixin" hdsource="8">'
                                    +'<img src="/web/assets/image/share/weixin.png"><p>微信好友</p>'
                                +'</li>'
                                +'<li class="pengyouquan nativeShare" data-app="weixinFriend" hdsource="9">'
                                    +'<img src="/web/assets/image/share/pengyouquan.png"><p>朋友圈</p>'
                                +'</li>'
                                +'<li class="weibo nativeShare" data-app="sinaWeibo" hdsource="14">'
                                    +'<img src="/web/assets/image/share/weibo.png"><p>微博</p>'
                                +'</li>'
                                +'<li class="qq nativeShare" data-app="QQ" hdsource="10">'
                                    +'<img src="/web/assets/image/share/qq.png"><p>QQ好友</p>'
                                +'</li>'
                                +'<li class="qqzone nativeShare" data-app="QZone" hdsource="11">'
                                    +'<img src="/web/assets/image/share/qq_zone.png"><p>QQ空间</p>'
                                +'</li>'
                            +'</ul>'
                        +'</div>'
                        +'<div class="share-cancel">取&nbsp;&nbsp;&nbsp;消</div>'
                    +'</div>'

                    +'<!-- 其他浏览器可使用 -->'
                    +'<div class="share-content share-other">'
                        +'<div class="share share-cont">'
                            +'<div class="share-title">分享到</div>'
                            +'<div class="bdsharebuttonbox">'
                                +'<a href="#" class="bds_tsina" data-cmd="tsina" hdsource="14">微博</a>'
                                +'<a href="#" class="bds_sqq" data-cmd="sqq" hdsource="10">QQ</a>'
                                +'<a href="#" class="bds_qzone" data-cmd="qzone" hdsource="11">QQ空间</a>'
                            +'</div>'
                        +'</div>'
                        +'<div class="share-cancel">取&nbsp;&nbsp;&nbsp;消</div>'
                    +'</div>'
                    +'<!-- 分享引导 -->'
                    +'<div class="share-weixin">'
                        +'<p class="weixin-share"><img src="/web/assets/image/share/weixin-share.png" alt=""></p>'
                        +'<p class="i-know"><a class="i-know-btn"><img src="/web/assets/image/share/i-know.png" alt=""></a></p>'
                    +'</div>';
    function init(){
        $('#share-dialog').append(plusHTML);
    }
    init();
    
    function getShareUrl(element) {
        var url = hd_config.url;
        if (url.indexOf("?") > 0) {
            url = url.substr(0, url.indexOf("?"));
        }
        url = url + "?aa=aa";
        if (element == null) {
            return url;
        }
        if (userIdentify != null && userIdentify != undefined && userIdentify != '') {
            url = url + "&relativeUserIdentify=" + userIdentify;
        }
        var hdSource = $(element).attr("hdSource");
        if (hdSource == null) {
            hdSource = 10;
        }
        url = url + "&hdSource=" + hdSource;
        return url;
    }

    function nativeShare(config) {
        var self = this;
        this.UA = navigator.appVersion;
        this.Browsers = {
            "qq":{
                keyword:"MQQBrowser/",
                innerKeyword:"TBS",
                level:{forbid: 0, lower: 1, higher: 2},
                apiSrc:{
                    lower: "http://3gimg.qq.com/html5/js/qb.js",
                    higher: "http://jsapi.qq.com/get?api=app.share"
                }
            },
            "uc":{
                keyword:"UCBrowser/",
                level:{forbid: 0, allow: 1},
                apiSrc:{}
            },
            "wx":{
                keyword:"MicroMessenger/",
                level:{forbid: 0, allow: 1},
                apiSrc:{}
            },
            "other":{}
        };
        this.version = 0;
        this.isUCBrowser = function () {
            return (self.UA.split(self.Browsers.uc.keyword).length > 1) ? self.Browsers.uc.level.allow : self.Browsers.uc.level.forbid;
        };
        this.isQQBrowser = function () {
            return (self.UA.split(self.Browsers.qq.keyword).length > 1 && (self.UA.split(self.Browsers.qq.innerKeyword).length <= 1)) ? self.Browsers.qq.level.higher : self.Browsers.qq.level.forbid;
        };
        this.isWXBrowser = function () {
            return self.UA.split(self.Browsers.wx.keyword).length > 1 ? self.Browsers.wx.level.allow : self.Browsers.wx.level.forbid;
        };
        this.isSupport = function() {
            return self.isQQBrowser() || self.isWXBrowser() || self.isUCBrowser();
        };
        this.getVersion = function () {
            var c;
            if(self.isQQBrowser()) {
                c = this.UA.split(self.Browsers.qq.keyword)[1];
            } else if(self.isUCBrowser()) {
                c = this.UA.split(self.Browsers.uc.keyword)[1];
            } else {
                return "0.0";
            }
            var a = c.split(".");
            return parseFloat(a[0] + "." + a[1]);
        };
        this.getPlatform = function () {
            var ua = navigator.userAgent;
            if ((ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
                return "iPhone";
            }
            return "Android";
        };
        this.share = function (element) {
            var platform_os = this.getPlatform();
            var to_app = element.getAttribute('data-app');
            var ucAppList = {
                sinaWeibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
                weixin: ['kWeixin', 'WechatFriends', 1, '微信好友'],
                weixinFriend: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
                QQ: ['kQQ', 'QQ', '4', 'QQ好友'],
                QZone: ['kQZone', 'QZone', '3', 'QQ空间']
            };
            var title = config.title, url = getShareUrl(element), desc = config.desc, img = config.img, img_title = config.img_title, from = config.from;
            if (self.isUCBrowser()) {
                to_app = to_app == '' ? '' : (platform_os == 'iPhone' ? ucAppList[to_app][0] : ucAppList[to_app][1]);
                if (to_app == 'QZone') {
                    B = "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url=" + img + "&title=" + title + "&description=" + desc + "&url=" + url + "&app_name=" + from;
                    k = document.createElement("div"), k.style.visibility = "hidden", k.innerHTML = '<iframe src="' + B + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(k), setTimeout(function () {
                        k && k.parentNode && k.parentNode.removeChild(k);
                    }, 5E3);
                }
                if (typeof(ucweb) != "undefined") {
                    ucweb.startRequest("shell.page_share", [title, desc, url, to_app, "", "@" + from, img]);
                } else {
                    if (typeof(ucbrowser) != "undefined") {
                        ucbrowser.web_share(title, desc, url, to_app, "", "@" + from, img);
                    }
                }
            } else if (self.isQQBrowser() && !self.isWXBrowser()) {
                to_app = to_app == '' ? '' : ucAppList[to_app][2];
                var ah = {
                    url: url,
                    title: title,
                    description: desc,
                    img_url: img,
                    img_title: img_title,
                    to_app: to_app,
                    cus_txt: "请输入此时此刻想要分享的内容"
                };
                ah = to_app == '' ? '' : ah;
                if (typeof(browser) != "undefined") {
                    if (typeof(browser.app) != "undefined" && self.isQQBrowser() == self.Browsers.qq.level.higher) {
                        browser.app.share(ah);
                    }
                } else {
                    if (typeof(window.qb) != "undefined" && self.isQQBrowser() == self.Browsers.qq.level.lower) {
                        window.qb.share(ah);
                    } else {
                    }
                }
            } else if (self.isWXBrowser()) {

            } else {
            }
        };
        this.ready = function (QQCallback, UCCallback, WXCallback, OtherCallback) {
            if(self.isQQBrowser() && !self.isWXBrowser()) {
                LoadQQApi();
                //uc和qq浏览器时添加click事件
                var items = document.getElementsByClassName('nativeShare');
                for (var i = 0; i < items.length; i++) {
                    items[i].onclick = function () {
                        self.share(this);
                    };
                }
                QQCallback();
            } else if(self.isUCBrowser()) {
                //uc和qq浏览器时添加click事件
                items = document.getElementsByClassName('nativeShare');
                for (i = 0; i < items.length; i++) {
                    items[i].onclick = function () {
                        self.share(this);
                    };
                }
                UCCallback();
            } else if(self.isWXBrowser()) {
                LoadWXApi();
                WXCallback();
            }else {
                LoadOtherApi();
                OtherCallback();
            }
        };
        var LoadQQApi = function () {
            var b = (self.getVersion() < 5.4) ? self.Browsers.qq.apiSrc.lower : self.Browsers.qq.apiSrc.higher;
            var d = document.createElement("script");
            var a = document.getElementsByTagName("body")[0];
            d.setAttribute("src", b);
            a.appendChild(d);
        };
        var LoadWXApi = function() {
            var b = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
            var d = document.createElement("script");
            var a = document.getElementsByTagName("body")[0];
            d.setAttribute("src", b);
            a.appendChild(d);
        };
        var LoadOtherApi = function() {
            //百度分享控制
            window._bd_share_config = {
                "common": {
                    "bdSnsKey": {},
                    "bdText": hd_config.title,
                    "bdDesc": hd_config.desc,
                    "bdUrl": hd_config.url,
                    "bdPic": hd_config.img,
                    "bdMini": "1",
                    "bdMiniList": false,
                    "bdStyle": "0",
                    "bdSize": "16",
                    "onBeforeClick": function (cmd, config) {
                        config.bdUrl = getShareUrl("a[data-cmd='" + cmd + "']");
                        return config;
                    },
                    "onAfterClick": function (cmd) {
                        console.log(cmd);
                    }

                },
                "share": {}
            };
            //以下为js加载部分
            with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
        };
    }
    var nativeShare = new nativeShare(hd_config);
    var shareDialogObj = $("#share-dialog");
    nativeShare.ready(
        //QQ
        function(){
            $(".share-btn").on("click", function (event) {
                    type = $(this).attr("type");
                    shareDialogObj.find(".share-qq-uc").show();
                    shareDialogObj.addClass("is-visible");
                    $("body").css("overflow", "hidden");
                    event.preventDefault();                      
            });
        },
        //UC
        function(){
            $(".share-btn").on("click", function (event) {
                    type = $(this).attr("type");
                    if(type == null) type = 12;
                    shareDialogObj.find(".share-qq-uc").show();
                    shareDialogObj.addClass("is-visible");
                    $("body").css("overflow", "hidden");
                    event.preventDefault();
            });
        },
        //WX
        function(){
            $(".share-btn").on("click", function (event) {

                    if(type == null) type = 12;
                    shareDialogObj.find(".share-weixin").show();
                    shareDialogObj.addClass("is-visible");
                    $("body").css("overflow", "hidden");
                    //wxConfig(hd_config);
                    event.preventDefault();
            });
        },
        //OTHER
        function(){
            $(".share-btn").on("click", function (event) {

                    type = $(this).attr("type");
                    if(type == null) type = 12;
                    shareDialogObj.find(".share-other").show();
                    shareDialogObj.addClass("is-visible");
                    $("body").css({"height": "100%", "overflow": "hidden"});
                    event.preventDefault();
            });
        });

    $(".i-know-btn").on("click",function(){
        shareDialogObj.removeClass("is-visible");
        $("body").css({"height": "auto", "overflow": "auto"});
    });
    
    shareDialogObj.on("touchend", function (event) {
    	if ($(event.target).parents(".share-content").length == 0 || $(event.target).hasClass("share-cancel")) {
    		shareDialogObj.removeClass("is-visible");
    		$("body").css({"height": "auto", "overflow": "auto"});
    		event.preventDefault();
    	}
    });

    //微信分享自定义
    //微信分享api 兼容旧版本 start
    function wxConfig(hd_config) {
        var shareData = {
            appid: hd_config.appid,
            title: hd_config.title,
            desc: hd_config.desc,
            link: getShareUrl(null),
            imgUrl: ""
        };
        //获取微信签名等
        $.ajax({
            url: "/WeiXinJsSdkConfiger",
            data: {
                "url": window.location.href.split('#')[0]
            }, //以键/值对的形式
            async: true,
            dataType: "json",
            success: function (data) {
                console.log("获取 signature 成功");
                wx.config({
                    debug: false,
                    appId: data.appid,
                    timestamp: data.timeStamp,
                    nonceStr: data.noncestr,
                    signature: data.signature,
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone'
                    ]
                });
                var wxApi = new WeixinShare(shareData);
            },
            error: function (xhr, json, e) {
                console.log("获取 signature 失败");
                console.log("json" + JSON.stringify(json));
            }
        });
    }

    function WeixinShare(shareData) {
        this.shareData = shareData;
        if (wx && wx.checkJsApi) {
            this.shareType = "api";
            this.initByAPI();
        }
        else {
            this.shareType = "bridge";
            this.initByBridge();
        }
    }

    WeixinShare.prototype.initByAPI = function () {
        var me = this;
        wx.ready(function () {
            var getShareData = function (hdParam) {
                return {
                    title: me.getParam("title"),
                    desc: me.getParam("desc"),
                    link: me.getParam("link", hdParam),
                    imgUrl: me.getParam("imgUrl"),
                    trigger: function (res) {
                        //this.title = me.getParam("title");
                        //this.desc = me.getParam("desc");
                        //this.link = me.getParam("link", hdParam);
                        //this.imgUrl = me.getParam("imgUrl");
                    },
                    success: function () {
                    },
                    cancel: function () {
                        console.log(me.getParam("link", hdParam));
                    }
                };
            };
            wx.onMenuShareAppMessage(getShareData(8));
            wx.onMenuShareTimeline(getShareData(9));
            wx.onMenuShareQQ(getShareData(10));
            wx.onMenuShareWeibo(getShareData(14));
            wx.onMenuShareQZone(getShareData(11));
        });
    };
    WeixinShare.prototype.initByBridge = function () {
        var me = this;
        document.addEventListener('WeixinJSBridgeReady',
            function onBridgeReady() {
                WeixinJSBridge.on('menu:share:appmessage',
                    function (argv) {
                        me.shareFriend();
                    }
                );
                WeixinJSBridge.on('menu:share:timeline',
                    function (argv) {
                        me.shareTimeline();
                    }
                );
            }, false);
    };

    WeixinShare.prototype.getParam = function (name, hdParam) {
        var val = this.shareData[name];
        if (typeof val == "function") {
            return val();
        }
        if (name == "link") {
            if (userIdentify != null && userIdentify != undefined && userIdentify != '') {
                val = val + "&relativeUserIdentify=" + userIdentify;
            }
            val = val + "&hdSource=" + hdParam;
            return val;
        }
        return val;
    };

    WeixinShare.prototype.shareFriend = function () {
        WeixinJSBridge.invoke('sendAppMessage', {
                appid: this.getParam("appid"),
                img_url: this.getParam("imgUrl"),
                img_width: 120,
                img_height: 120,
                link: this.getParam("link", 8),
                title: this.getParam("title"),
                desc: this.getParam("desc")
            },
            function (res) {
                _report('send_msg', res.err_msg);
            });
    };

    WeixinShare.prototype.shareTimeline = function () {
        WeixinJSBridge.invoke('shareTimeline', {
                appid: this.getParam("appid"),
                img_url: this.getParam("imgUrl"),
                img_width: 120,
                img_height: 120,
                link: this.getParam("link", 9),
                title: this.getParam("title"),
                desc: this.getParam("desc")
            },
            function (res) {
                _report('timeline', res.err_msg);
            });
    };
    //微信分享api 兼容旧版本 end
});