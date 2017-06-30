var regex_mobile = /(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;//手机号正则
/*
 *获取友好的日期提示信息
 *added by billyhero
 *2016-01-28 17:33
 *参数，字符串：2016-01-28 17:21:30
 *返回：2分钟前，2天前...
*/
var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var month = day * 30;
var year = month * 12;
function getFrendlyDate(dateTimeStamp){
    if(dateTimeStamp == "" || typeof(dateTimeStamp) == 'undefined'){
        return '';
    }
    var now = new Date().getTime();
    var diffValue = 0;
    var result = '';
    try{
        diffValue = now - Date.parse(dateTimeStamp.replace(/-/gi,"/"));
    }catch(e){
        console.log('getFrendlyDate(); 异常:' + e.message);
        return result;
    }
    if(diffValue < 0){
        //结束日期不能小于开始日期！
        return result;
    }
    var yearC =diffValue/year;
    var monthC =diffValue/month;
    var weekC =diffValue/(7*day);
    var dayC =diffValue/day;
    var hourC =diffValue/hour;
    var minC =diffValue/minute;
    if(yearC>=1){
        result=parseInt(yearC) + "年前";
    }
    else if(monthC>=1){
        result=parseInt(monthC) + "个月前";
    }
    else if(weekC>=1){
        result=parseInt(weekC) + "周前";
    }
    else if(dayC>=1){
        result=parseInt(dayC) +"天前";
    }
    else if(hourC>=1){
        result=parseInt(hourC) +"个小时前";
    }
    else if(minC>=1){
        result=parseInt(minC) +"分钟前";
    }else{
        result="刚刚";
    }
    return result;
}

Date.prototype.format = function(format) {
   var date = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3),
          "S+": this.getMilliseconds()
   };
   if (/(y+)/i.test(format)) {
          format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
   }
   for (var k in date) {
          if (new RegExp("(" + k + ")").test(format)) {
                 format = format.replace(RegExp.$1, RegExp.$1.length == 1
                        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
          }
   }
   return format;
}
// console.log(new Date().format('yyyy-MM-dd h:m:s'));

/**
 * 公共提示框方法
 * edit by 何变 2016-04-21
 * 修改扩展功能:
 * 1.加入显示图标（可选）arguments[2]设置是否显示ICON，arguments[3]设置显示ICON的类型
 * 2.提示框常驻不会消失，需手动让其消失(arguments[1]:time设置为-1)(项目中已有多场景需要此功能)
 * 3.以上修改不影响原方法的使用
 */
/*测试提示框功能*/
/*$(document).ready(function(){
    inputTipsText('this is test!',-1,true,-6);
});*/
var is_tipstext_timeout;
function inputTipsText(text,time){
    var showIcon = arguments[2]?arguments[2]:false;//是否显示图标
    var icon_num = arguments[3]?arguments[3]:1;//图标样式icon1,icon2,icon3....
    var effect = Math.abs(icon_num);//动画效果id
    var hide=true;
    var icon_src = '/web/assets/image/seckill/icon'+icon_num+'.png';
    if($('.inputTipsText').length==0){
        if(!showIcon){
            $('body').append("<div class='inputTipsText hide'><div><span></span></div></div>");
        }else if(icon_num>0){
            $('body').append("<div class='inputTipsText hide'><div><p><img src='"+icon_src+"'></p><span></span></div></div>");
        }else{//不使用icon img，而是显示css3生成的动画效果
            $('body').append("<div class='inputTipsText hide'><div><p></p><span></span></div></div>");
            createLoadingEffect(effect);
        }
    }else if(!showIcon){
        $('.inputTipsText>div>p').remove();
    }else if(showIcon){
        $('.inputTipsText>div>p').remove();
        //if(!$('.inputTipsText>div').has('p').length)
        if(icon_num>0){
            $('.inputTipsText>div').prepend("<p><img src=''/></p>");
            $('.inputTipsText>div>p>img').attr('src',icon_src);
        }else{
            $('.inputTipsText>div').prepend("<p></p>");
            createLoadingEffect(effect);
        }
    }
	if(typeof(arguments[1])=='undefined'){
		time=3000;//默认2秒自动隐藏提示框
	}else if(arguments[1]==-1){
        hide=false;//当参数 time == -1时，提示框常驻不会消失,需手动让其消失
    }
    if($('.inputTipsText').attr('class').indexOf('hide')>-1){//当提示框隐藏时
        $('.inputTipsText>div>span').html(text);
        $('.inputTipsText').removeClass('hide');
        if(hide){
            is_tipstext_timeout=setTimeout(function(){
              $('.inputTipsText').addClass('hide');
            },time);
        }
    }else{//提示框正在显示时
        clearTimeout(is_tipstext_timeout);  //清除上一个倒计时
        $('.inputTipsText>div>span').html(text);
        $('.inputTipsText').removeClass('hide');
        if(hide){
            is_tipstext_timeout=setTimeout(function(){
              $('.inputTipsText').addClass('hide');
            },time);
        }
    }
}
/**
 * [createLoadingEffect 生成提示框loading动画]
 * @param  {[number]} effect [动画序号]
 * @author 何变
 * @return {[null]}
 */
function createLoadingEffect(effect){
    var html="<div class='loading_eff_"+effect+"'>";
    var load_inner_count = 0;
    switch(effect){
        case 1:
        case 2:
            load_inner_count=8;
            break;
        case 3:
        case 4:
        case 6:
            load_inner_count=3;
            break;
        case 5:
            load_inner_count=5;
            break;
        default:
            load_inner_count=8;
            break;
    }
    for(var i=0;i<load_inner_count;i++){html+='<div></div>'}
    html+='</div>';
    $('.inputTipsText>div>p').append(html);
}
/*
*根据js模版ID获取渲染函数
*@param id - 模版的ID
*如果id不存在抛出异常
*/
function getRender(id){
	var tmpl = document.getElementById(id);
	if(tmpl != undefined){
		var doTtmpl = doT.template(tmpl.innerHTML);
		return doTtmpl;
	}else{
		throw new Error('template: ['+id+'] is not exsits!');
	}
}

function doTer(data,obj){
    var dotDom = obj.find('script');
    var ModeStr = dotDom[0].innerHTML;
    var doTtmpl = doT.template(ModeStr);
    obj.html(doTtmpl(data));
}

function doTAppend(data,obj){
    var dotDom = obj.find('script');
    var ModeStr = dotDom[0].innerHTML;
    var doTtmpl = doT.template(ModeStr);
    obj.append(doTtmpl(data));
}
/**
*初始化mui_js组件
*getData(),上拉或下拉触发后加载数据都执行该方法
*p_type p_type = 0; //普通列表刷新
*p_type = 1;        //首页刷新(首页刷新动作是重新加载整个页面)
*r_timeout=1500；   //默认上下拉刷新触发间隔时间
*/
var p_type=0;
var r_timeout=1500;
var pull_action="";
var resetDown=true;//重置下拉刷新
function _initMui(){
    var setStop = arguments[0] ? arguments[0] : false;
    var downObj = arguments[1] ? arguments[1] : null;
    resetDown= arguments[2] ? arguments[2] : true;
    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            down: downObj?downObj:{
                contentinit:'下拉刷新',
                contentdown:'下拉刷新',
                contentover:'释放刷新',
                contentrefresh: '正在刷新...',
                callback: pulldownRefresh
            },
            up: {
                contentrefresh: '正在加载...',
                callback: pullupRefresh
            }
        }
    });
    if(!setStop){
        p_type = 0;//普通列表刷新
        mui('#pullrefresh').pullRefresh().setStopped(true);
    }else{
        mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
        r_timeout = 1500;
        p_type = 1;//首页刷新，首页刷新动作是重新加载整个页面
    }
}
/**
*mui_js 下拉触发刷新函数
*/
function pulldownRefresh() {
    console.log('pulldownRefresh down');
    pull_action = 'down';
    page =1;
    setTimeout(function() {
        if(p_type == 0){
            getData();
            if(resetDown){
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                mui('#pullrefresh').pullRefresh().refresh(true);
            }
        }else if(p_type == 1){
            //window.location.reload();
            onStart();
            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
            $('.mui-pull-bottom-pocket').removeClass('mui-visibility');
        }
    },r_timeout);
}
/**
*mui_js 上拉触发加载函数
*/
function pullupRefresh() {
    console.log('pullupRefresh up');
    pull_action = 'up';
    setTimeout(function() {
        if(p_type == 0){
            getData();
        }else if(p_type == 1){
            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
        }
    },r_timeout);
}

/**
 * 控制用户返回的方法
 */
function changeBackUrl(url,param){
    param.share=I('share');
    if(typeof(param)=='object'){
    param=JSON.stringify(param).replace(/\{|\}|\"|\'/g,'').replace(/,/g,'&').replace(/:/g,'=');
    }else{
        try{
            param=param.toString().replace(',','&').replace(/:/g,'=').replace(/\"|\'/g,'');
        }catch(e){}
    }
    var path="/web/wechat/"+url+".html?"+param;
    history.replaceState(null, null, path);
}

function changeBackUrlL(url,param){
    param.share=I('share');
    if(typeof(param)=='object'){
    param=JSON.stringify(param).replace(/\{|\}|\"|\'/g,'').replace(/,/g,'&').replace(/:/g,'=');
    }else{
        try{
            param=param.toString().replace(',','&').replace(/:/g,'=').replace(/\"|\'/g,'');
        }catch(e){}
    }
    var path="/web/"+url+".html?"+param;
    history.replaceState(null, null, path);
}

/*格式化日期*/
function formatDate(date, format) {
    if (!date) return;
    if (!format) format = "yyyy-MM-dd";
    switch(typeof date) {
        case "string":
            if(isNaN(Number(date))){
                date = new Date(date.replace(/-/g, "/"));
            }else{
                date = new Date(Number(date));
            }
            break;
        case "number":
            date = new Date(date);
            break;
    }
    if (!date instanceof Date) return;
    var dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
        return dict[arguments[0]];
    });
}

/*
*js String prototype
*字符串处理,emoji表情转义和反转等
*2016-02-26 added by 何变
*/
//是否为空或null
isNullOrEmpty = function(s) {
    return s === undefined || s === null || s === "" || typeof s === 'undefined';
}
js = {lang:{}};
js.lang.String=function(){
    this.REGX_CHINESE=/^[\u0391-\uFFE5]+$/i;
    this.REGX_EX_CHINESE=/^[\x00-\xff]*$/;
    this.REGX_TRIM = /(^\s*)|(\s*$)/g;
    this.REGX_MOBILE = /^1[3|4|5|7|8]\d{9}$/i;
    this.REGX_TEL=/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i;
    this.REGX_EMAIL=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
    this.REGX_CONTACTS=/^[A-Za-z0-9\u4E00-\u9FA5]{1,32}$/;
    this.REGX_ADDRESS=/[A-Za-z0-9\u4E00-\u9FA5]/;
    //反转义实体编号
    this.decodeHtml=function(s){
        s = (s != undefined) ? s : this.toString();
        var d = document.createElement('div');
        d.innerHTML = s;
        return d.innerText;
    };
    /**
     * 用于把用utf16编码的字符转换成实体字符，以供后台存储
     * @param  {string} str 将要转换的字符串，其中含有utf16字符将被自动检出
     * @return {string}     转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符
     */
    this.utf16toEntities=function(s){
        var patt=/[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
        s = (s != undefined) ? s : this.toString();
        return (typeof s != "string") ? s :
        s.replace(patt, function(char){
            var H, L, code;
            if (char.length===2) {
                H = char.charCodeAt(0); // 取出高位
                L = char.charCodeAt(1); // 取出低位
                code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
                return "&#" + code + ";";
            } else {
                return char;
            }
        });
    };
    //去前后空格
    this.trim = function(s){
        s = (s != undefined) ? s : this.toString();
        return (typeof s != "string") ? s :
            s.replace(this.REGX_TRIM, "");
    };
    //取字符长度，中文字符2，英文1
    this.gblen=function(s){
        s = (s != undefined) ? s : this.toString();
        var len = 0;
        for (var i=0; i<s.length; i++) {
            if (s.charCodeAt(i)>127 || s.charCodeAt(i)==94) {
                len += 2;
            } else {
                len ++;
            }
        }
        return len;
    }
    //截取限定字符长度.需要传长度num;
    this.setgblen=function (num) {
        var s = this.toString();
        var len = 0;
        var i = 0 ;
        for (;i<s.length;i++) {
            if (s.charCodeAt(i)>127 || s.charCodeAt(i)==94) {
                len += 2;
            } else {
                len ++;
            }
            if(len>=num){
                break;
            }
        }
        return s.substring(0,i);
        // body...
    }
    //去除字符串左边的空格，返回处理后副本，并不改变原有的字符串。
    this.ltrim=function(){
        return this.replace(/(^\s*)/g, "");
    }
    //去除字符串右边的空格，返回处理后副本，并不改变原有的字符串。
    this.rtrim=function(){
        return this.replace(/(\s*$)/g, "");
    }
    //是否是手机号
    this.isMobile=function(){
        return isNullOrEmpty(this) ? false : this.REGX_MOBILE.test(this);
    }
    //是否是电话
    this.isTelOrFax=function(){
        return isNullOrEmpty(this) ? false : this.REGX_TEL.test(this);
    }
    //是否是邮箱地址
    this.isMail=function(){
        return isNullOrEmpty(this) ? false : this.REGX_EMAIL.test(this);
    }
    //判断字符串是否全是汉字
    this.isChinese=function(){
        return isNullOrEmpty(this) ? false : this.REGX_CHINESE.test(this);
    }
    //判断字符串是否存在汉字
    this.isExistChinese=function(){
        return isNullOrEmpty(this) ? false :!this.REGX_EX_CHINESE.test(this);
    }
    //字符串转int
    this.toInt=function () {
        return isNaN(parseInt(this)) ? 0 : parseInt(this);
    }
    //字符串转float
    this.toFloat=function () {
        return isNaN(parseFloat(this)) ? 0.0 : parseFloat(this);
    }
    //将字符串日期转换成日期类型
    this.toDate=function () {
        try { return new Date(this.replace(/-/g, "\/")); }
        catch (e) { return null; }
    }
    //将数字字符串转换成字符串日期
    this.toDateString=function (s) {
        s = (s != undefined) ? s : 'yyyy-MM-dd HH:mm:ss';
        return formatDate(this.toString(),s);
    }
    //联系人不能输入特殊字符且中文不能超过16个，字符不能超过32个
    this.isContacts=function (){
        return this.REGX_CONTACTS.test(this);
    }
    //地址不能输入特殊字符
    this.isAddress=function(){
        return this.REGX_ADDRESS.test(this);
    }
    //拆分小数
    //参数0：获取小数点前面部分
    //参数1：获取小数点后面部分
    this.splitNumber=function (index) {
        if(this.toString().indexOf('.')<0) {
            return this.toString();
        }
        if(Number(index)==0) {
            return Math.floor(this);
        }else  if(Number(index)==1) {
            return this.toString().substr(this.toString().indexOf('.')+1);
        }else{
            return Math.floor(this);
        }
    }
};
js.lang.String.call(String.prototype);//扩展String的prototype
/*get user info*/
function getUserData(){
    var call=arguments[0]?arguments[0]:undefined;
    //获取用户信息
    jsonAjax(API.API_LIST.CAR_CARI_GETUSERINFO,{'userid':getUserid()},function(data){
        if(data.status==1&&data.data){
            UserInfo.mobile=data.data.mobile;
            UserInfo.nickname=isNullOrEmpty(data.data.nickname)?'':data.data.nickname;
            UserInfo.photo=data.data.photo;
            UserInfo.sex=data.data.sex;
            UserInfo.isbind='0';
            console.log('getUserData',UserInfo);
            UserInfo.nickname=UserInfo.nickname.replace(/[^A-Za-z0-9\u4E00-\u9FA5]/g,'');
            setUserInfo();
        }
        if(call){
            call();
        }
    });
}
/*保存用户信息到cookies*/
function setUserInfo(){
    if(!isNullOrEmpty(UserInfo.mobile)){
        if(UserInfo.mobile.isMobile()){
            $.cookie('did_mobile', UserInfo.mobile, {expires: 30, path: '/'});
            $.cookie('did_isbind', '1', {expires: 30, path: '/'});
            UserInfo.isbind='1';
        }else{
            UserInfo.mobile='';
            $.cookie('did_mobile', '', {expires: 30, path: '/'});
            $.cookie('did_isbind', '0', {expires: 30, path: '/'});
        }
    }else{
        $.cookie('did_mobile', '', {expires: 30, path: '/'});
        $.cookie('did_isbind', '0', {expires: 30, path: '/'});
    }
    $.cookie('did_nickname', UserInfo.nickname?UserInfo.nickname:'', {expires: 30, path: '/'});
    $.cookie('did_photo', UserInfo.photo?UserInfo.photo:'', {expires: 30, path: '/'});
    $.cookie('did_sex', UserInfo.sex?UserInfo.sex:'', {expires: 30, path: '/'});
}

/*获取用户信息
UserInfo.mobile 手机号
UserInfo.nickname 昵称
UserInfo.photo 头像
UserInfo.sex 性别
UserInfo.isbind 是否绑定手机
*/
function getUserInfo(){
    if($.cookie('did_mobile')==''||typeof $.cookie('did_mobile')=='undefined'
        ||$.cookie('did_nickname')==''||typeof $.cookie('did_nickname')=='undefined'){
        console.log('cookies has no userinfo , get it.');
        getUserData();
    }else{
        UserInfo.mobile=$.cookie('did_mobile');
        UserInfo.nickname=$.cookie('did_nickname');
        UserInfo.photo=$.cookie('did_photo');
        UserInfo.sex=$.cookie('did_sex');
        UserInfo.isbind=$.cookie('did_isbind');
        console.log('getUserInfo',UserInfo);
    }
}

/*获取顾问标签.
@author 唐滔(Taoist Tang)
许多页面都有个顾问模块,虽然读取的接口不一样. 但接口数据结构都一样,于是此处考虑做个公用的.
传入参数: E_api, E_Tag;
E_api : 需要调用的接口字符串.
E_Tag : 模板生成标签.
页面内使用方法:例: getEmployee(API.API_LIST.CAR_REPAIR_EMPLOYEE,$('.guwen'));
*/
function getEmployee (E_api,E_Tag) {//生成顾问标签.
    $('body').append('<script type="text/template" id="tmpl-Employee"><\/script>');
    var Str_tmpl = '';
    Str_tmpl += '<img aid="{{=it.aid}}" src="{{=it.logo}}"/>';
    Str_tmpl += '<div class="info" aid="{{=it.aid}}">';
    Str_tmpl +=     '<div class="name">';
    Str_tmpl +=         '<span>{{=it.realname}}</span>';
    Str_tmpl +=         '<i class="zx" onclick="consult({{=it.aid}});"></i>';
    Str_tmpl +=         '<i class="gh" onclick="changeA({{=it.aid}});"></i>';
    Str_tmpl +=     '</div>';
    Str_tmpl +=     '<div class="contact">';
    Str_tmpl +=         '<span class="shouji"><i></i><a href="tel:{{=it.mobile}}">{{=it.mobile}}</a></span>';
//  Str_tmpl +=         '<span class="weixin"><i></i><span copy="true">{{=it.wx_number}}</span></span>';
    Str_tmpl +=     '</div>';
    Str_tmpl +=     '<div class="hello" style="line-height: 1.6rem;">您好，我是您的专属顾问，您可以直接联系我！</div>';
    Str_tmpl += '</div>';
    $('#tmpl-Employee').html(Str_tmpl);
    var render_Emp = getRender('tmpl-Employee');
    jsonAjax(E_api,{userid:getUserid()},function (res) {
        //console.log(res);
        if(res.status == 1){
            if(res.data.aid){
                E_Tag.html(render_Emp(res.data));
            }else{
                $('.guwen').hide();
            }
        }else{
            $('.guwen').hide();
        }
        empLoad = true;
        allLoadEnd();
    });
}
//获取选择车型/询底价/预约试驾页面广告点击次数
function collectClick(adid,obj){
    jsonAjax(API.API_LIST.CAR_INDEX_BANNER_CLICK,{adid:adid},function(data){
        if(data.status==1){
            PageJump('link', JSON.stringify(obj));
            loadEnd();
        }
    });
}
//咨询
function consult(aid){
    var obj = M();
    obj.user_id = getUserid();
    obj.to_id = aid;
    obj.appid = 1;
    PageJump('gotoChatRoom',obj);
}
//更换
function changeA(aid) {
    var obj = M();
    obj.aid = aid;
    PageJump('gotoChage', obj);
}
//返回养车首页
function BackKeepIndex(){
    setTimeout(function(){
        PageJump('gotoKeepIndex',{});
    },2500)
}
//返回买车首页
function BackBuyIndex(){
    setTimeout(function(){
        PageJump('gotoBuyCarIndex',{});
    },2500)
}
//创建当前月份日历
var CreateCalendar=function(obj,data){
    this.obj=obj;
    this.data=data;
    this.day=new Date().getDate();
};
//判断每个月1号是星期几并返回其在页面对应的li标签的位置
CreateCalendar.prototype.whatOneDay=function(data){
    var day=new Date(data),D=day.getDay();
    return parseInt(D);
};
//获得当前月份的天数
CreateCalendar.prototype.getMonthDay=function(data){
    var date=null;
    if(arguments[0]){
        date=new Date(data);
    }else{
        date=new Date();
    }
    var Y=date.getFullYear(),//获得年份
        M=date.getMonth()+1,//获得月份;
        par1=[1,3,5,7,8,10,12],//大月份 31天
        par2=[4,6,9,11],//小月份30天
        day;//当前月份的天数
    if(par1.indexOf(M)!==-1){
        day=31
    }else if(par2.indexOf(M)!==-1){
        day=30;
    }else{
        if(Y%4===0&&Y%100!==0||Y%400===0){//闰年
            day=29;
        }else{//平年
            day=28;
        }
    }
    return day;
};
//渲染一个月的数据
CreateCalendar.prototype.showData=function(arr,data,D){
    var day=this.whatOneDay(data),lis=arr.slice(day,D+day);
    for(var i= 0,len=lis.length;i<len;i++){
        if(this.data[i].if_sign==1){
            lis[i].className='sign-ico';
        }
    }
};
//创建7天的的数据
CreateCalendar.prototype.createSevenDay=function(obj,type){
    if(type){
         var  day=this.getMonthDay(type);
    }else{
        day=this.getMonthDay();
    }
    console.log(day+'----');
    var doc=document,
        what_day=this.day>day?day:this.day,//如果当前号的数字大于当前月份的总天数 则等于当前月份的天数
        Li=null,
        text=null,
        num=0,a= 1, b=day-(3-what_day),
        len=this.data.length,
        fragment=doc.createDocumentFragment();
        num=what_day-3;
    for(var j=0;j<7;j++){
        Li=doc.createElement('li');
        if(0<num&&num<=day){
            text=doc.createTextNode(num);
            if(this.data[num-1].if_sign==1&&!type){
                Li.className='sign-ico';
            }
            Li.appendChild(text);
        }else{
           /* if(num>day){//当日历只显示7天是且当天的是1-3号或28-31号，填充为上个月 或下个月的日期月初几天
                text=doc.createTextNode(a);
                Li.appendChild(text);
                a++;
            }else if(num<=0){
                text=doc.createTextNode(b);
                Li.appendChild(text);
                b++;
                console.log(j+'----');
            }
            Li.style='color:#ddd;';*/
        }
        num++;
        fragment.appendChild(Li);
    }
    obj.innerHTML='';
    obj.appendChild(fragment);
}
//创建日历
CreateCalendar.prototype.createCalendarInfo=function(data){
    var doc=document, Li=null,num= 0,text=null,date=new Date(data),
        D=this.getMonthDay(data),//当前月份的天数
        day=this.whatOneDay(data),//当前月份1号是星期几
        fragment=doc.createDocumentFragment(),len= 0,arr=[];//创建文本片段
    if(day===6&&D>29){
        len=42;
    }else{
        len=35;
    }
    for(var i=0;i<len;i++){
        if(i>=day){
            num++;
            text=doc.createTextNode(num+'');
            Li=doc.createElement('li');
            Li.appendChild(text);
            day=num===D?45:day;
        }else{
            Li=doc.createElement('li');
        }
        fragment.appendChild(Li);
         arr.push(Li);
    }
    this.obj.innerHTML='';
    this.obj.appendChild(fragment);
    if(arguments[1]){
        this.showData(arr,data,D);
    }
    if(arguments[2]){
        this.createSevenDay(arguments[2],arguments[3]);
    }
};
