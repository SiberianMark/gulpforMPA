/**
 * Created by yubok on 2016/9/22.
 */
var page =I('page',1);
var live_act = getRender('live-act');
var waterfalls=true;
var title=decodeURIComponent(I('title'));//栏目
function onStart() {
    _initMui();
    getData();
    sharemsg();
}
function getData(){
//        TitleReSet(title);
    jsonAjax('/gold/Home/interestingLists',{id:I('id'),userid:getUserid(),page:page},function(data){
        if(data.status==1){
            if (data.data.length <= 0) {
                if (pull_action == 'up') {
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                }
                else if (pull_action == 'down') {
                    mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                }
                loadEnd();
                return;
            }
            if (page == 1) {
                $('#out').html(live_act(data));
            } else {
                $('#out').append(live_act(data));
                if(page>=3){
                    $(".top").show();
                }
            }
            $('.mui-pull-caption').show();
            setTimeout(function () {
                mui('#pullrefresh').pullRefresh().setStopped(false);
            }, 200);
            page++;
            if (pull_action == 'up') {
                mui('#pullrefresh').pullRefresh().endPullupToRefresh();
            }
            else if (pull_action == 'down') {
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
            }
        } else {
            if(page <= 1)
                $(".cart-nogoods").show();
            if (pull_action == 'up') {
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
            }
            else if (pull_action == 'down') {
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
            }else{
                $(".cart-nogoods").show();
            }
        }
        waterfall();
        idcook();
        if(is_weixn(true)&&share_ornot==0){
            downloadApp('body','bottom');
        }else{
            $("#pullrefresh").css("margin-bottom","0");
        }
        // if(!is_weixn(true)&&!is_smdd()){
        //     $(".app-download").hide();
        //     $(".mui-scroll").css("padding-bottom","0");
        // }
        loadEnd();
    });
}

//收藏
function collections(id,action,_this){
    jsonAjax('/Gold/Home/doCollectArticle',{userid:getUserid(),type:I('type',3),action:action,id:id},function(data){
        if(data.status==1){
            inputTipsText(data.info);
            if(action=="cancel"){
                _this.removeClass("follow");
                var value=parseInt(_this.parent().find(".collections").text())-1;
                _this.parent().find(".collections").text(value);
                _this.attr("action","");
            }else{
                _this.addClass("follow");
                var value=parseInt(_this.parent().find(".collections").text())+1;
                _this.parent().find(".collections").text(value);
                _this.attr("action","cancel");
            }
        }else {
//                inputTipsText(data.info);
        }
    });
}

//瀑布流
function waterfall(){
    var $container = $('#out');
    $container.imagesLoaded( function(){
        if(waterfalls){
            $container.masonry({
                itemSelector : '.act',
                gutterWidth : 20,
                isAnimated: true,
            });
            waterfalls=false;
        }else{
            $container.masonry('reloadItems');
            $container.masonry('layout');
        }
    });
}

//花絮IDcookies
function idcook(){
    var idArr = new Array();
    $("#out").find(".act").each(function(index){
        idArr[index]=$("#out").find(".act").eq(index).attr("article_id");
    });
    $.cookie('idcook', idArr, {expires: 1/12, path: '/'});
}

//分享
function sharemsg(){
    jsonAjax('/Gold/Home/showActivity',{userid:getUserid(),id:I('id')},function(data){
        if(data.status==1) {
            if (data.data.status == 1) {
                $(".release").show();
                $(".top").addClass("top-add-release");
            }else{
            }
            WxShare.title = data.data.share_title;
            WxShare.imgUrl = data.data.share_pic;
            WxShare.link = data.data.share_link;
            WxShare.desc = data.data.share_content;
            loadWxObject(true); //获取微信分享对象
        }
        // if(I("apply")=="holiday"){
        //     $(".live-return").text("返回活动列表");
        // }else{
        //     $(".live-return").text("返回活动详情");
        // }
    });
}

//收藏
$("#out").on("tap",".act-follow",function(){
    var id=$(this).attr("article_id");
    var action=$(this).attr("action");
    var _this = $(this);
    isLogin(function (ret) {
        if(ret){
            collections(id,action,_this);
        }
    });
});

$("#out").on("tap",".act-img,.act-comment",function(){
    var article_id= $(this).attr("article_id");
    var obj = new Object();
    obj.id=I("id");
    obj.article_id=article_id;
    Interface('gotoCarDetail',JSON.stringify(obj));
});

// 返回顶部
$("a[href='#top']").on("click",function() {
    mui('#pullrefresh').pullRefresh().scrollTo(0,0,1000);
    window.scrollTo(0, 1000);
    $(".top").hide();
    return false;
});

//报名状态
$(".release").on('click',function () {
    $('.mask').show();
});

$('.mask span').click(function(event){
    event.stopPropagation();
    $('.mask').hide();
    return false;
});

$('.mask').on('click','.a', function () {
    Interface('gotoIndex');
    return false;
});
$('.down_btn').on('click', function () {
    Interface('gotoIndex');
    return false;
});

$(".close").on('click',function () {
    $('.app-download').hide();
});

$(".live-return").on('click',function () {
    var obj = new Object();
    obj.id=I("id");
    obj.activity_id=I("id");
    Interface('gotosmdgActivityDetail',JSON.stringify(obj));
});
