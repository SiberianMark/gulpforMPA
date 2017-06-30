/*
    分享后的顶部光关注公众号引流条公用组件
    edit by 何变
    2016-12-22
 */
var last_mui_top=0;//记录原#pullrefresh的margin-top值
var share_bar_dlg = null;//弹框对象
$(document).ready(function () {
    /*页面加载中动画*/
    //load();
    /*顶部引流添加元素 add by 何变 2016-9-30*/
    var barEvent='click';
    if(Boolean(I('share'))){
        /*有下拉刷新组件 添加margin-top值才能显示出顶部引流*/
        var dialogRes='';
        dialogRes+='<link rel="stylesheet" type="text/css" href="/web/user/css/dialog.css?v=1.0.0">';
        dialogRes+='<script src="/web/user/js/dialogFx.js?v=1.0.0"></script>';
        $(dialogRes).appendTo($('head'));
        if($('#pullrefresh').length>0){
            barEvent='tap';
            var style=$('#pullrefresh').attr('style');
            if(style){
                //已有margin-top样式，在原来基础上加上引流样式的高度5rem;
                var mtop=style.match(/margin-top:(\s*\S*)/i);
                if(mtop&&mtop.length>=1){
                    var mtop_value=parseFloat(mtop[1].trim().replace('rem;',''));
                    last_mui_top=mtop_value;
                    mtop_value+=5;//已知share-info的高度为5rem
                    $('#pullrefresh').css('margin-top',mtop_value+'rem');
                }
            }else{
                //无margin-top样式，margin-top=5rem;
                $('#pullrefresh').css('margin-top','5rem');
                last_mui_top=0;
            }
        }
        $('body').prepend('<div class="share-info" style="display: none;"><a href="javascrip:;"></a></div>');
        $('.share-info').show();
    }
    /*顶部引流-关注公众号弹框提示信息 点击事件*/
    $('.share-info').on(barEvent,function () {
        if(share_bar_dlg==null){
            inputTipsText('加载中...',-1);
            getPubacctEwm();
        }else{
            if(share_bar_dlg){
                share_bar_dlg.toggle();
            }
        }
    });
    $('.share-info a').on(barEvent,function (event){
        event.stopPropagation();
        $('.share-info').remove();
        $('#pullrefresh').css('margin-top',last_mui_top+'rem');
        try{
            onShareClose();
        }catch(e){}
    });
    $(document).on(barEvent,'.codePic-close',function (event){
        event.stopPropagation();
        if(share_bar_dlg){
            share_bar_dlg.toggle();
        }
    });
    $(document).on(barEvent,'.attent-mask',function (event){
        event.stopPropagation();
    });
});

/*获取专属公众号二维码图片*/
function getPubacctEwm(){
    jsonAjax(API.API_LIST.GOLD_WXHOME_PICTURE,{},function(data){
        if(data.status==1){
            $('.inputTipsText').hide();
            $('body').append(attentMask(data.data.code));
            share_bar_dlg=new DialogFx(document.getElementById('share_bar_dlg'));
            share_bar_dlg.toggle();
        }else{
            inputTipsText('加载失败!');
        }
    });
}

/*生成关注公众号弹框提示信息*/
function attentMask() {
    var ewm = arguments[0]?arguments[0]:'/web/assets/image/default_ico.svg';
    var codeMask = "";
    codeMask='<div id="share_bar_dlg"class="dialog"><div class="dialog__overlay"></div><div class="dialog__content">';
    codeMask += "<div class='code-pic'>";
    codeMask += "<a href='javascript:;' class='codePic-close'></a>";
    codeMask += "<img class='onebuycode' src='"+ewm+"'>";
    codeMask += "</div></div></div>";
    return codeMask;
}