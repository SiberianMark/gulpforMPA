/*
    ver:V1.0.0
 */
(function(){
	/*写入引用MUI库文件*/
  	document.writeln("<script src='/web/assets/js/mui_2_7_0.js?v=2.7.0'><\/script>");
	document.writeln('<link rel="stylesheet" type="text/css" href="/web/assets/css/mui_2_7_0.css?v=2.7.0">');
})();
(function($){
    /*使用MUI-JS插件，动态绑定上下拉刷新列表的数据
    **ADD BY 何变
    **2016-05-13
    */
    $.fn.MuiDataList=function(opts){
        var DEBUG=false;//开启日志打印
        var defaults = {
            mode : 1,//列表模式 1-普通列表,2-只有下拉刷新（禁用上拉加载），3-禁用上下拉刷新
            api:null,//数据来源,请求的API接口
            api_param:{},//请求API接口所需参数
            beforeGet:null,//开始ajax请求之前回调函数
            afterGet:null,//结束ajax请求之后回调函数
            firstGet:null,//首次请求接口回调函数
            dot_template:null,//数据列表doT.js模版ID,多个模版使用逗号分隔。
            dataName:null,//列表数据来源的数组名
            pageSize:1,//数据分页大小
            containerIndex:0,//默认显示的哪个列表数据，默认:0,对应渲染dot_template第一个模版。
            dotIndex:0,//默认显示的哪个列表数据，默认:0,对应渲染dot_template第一个模版。
        };//默认参数
        var option = $.extend(defaults, opts);
        var p_type=0;
        var r_timeout=1000;
        var pull_action="";
        var first=true;
        var renderList=new Array();
        var pageList=new Array();
        var dotIndex=0;
        var containerIndex=0;
        var $this = $(this);
        var mui_pull=null;
        DEBUG = option.debug;
        var T={
            /*日志输出*/
            log:function(text,type){
                var debug = arguments[2] ? arguments[2] : false;
                if(DEBUG||debug){
                    switch(type){
                        case -1:
                            console.log("%c%s","color:black;font-weight:bold;font-size:1.0rem;text-shadow: 1px 1px 1px gray",text);
                            break;
                        case 0:
                            console.log("%c%s","color:green;font-weight:bold;font-size:1.2rem;text-shadow: 1px 1px 1px black",text);
                            break;
                        case 1:
                            console.log("%c%s","color:blue;font-weight:bold;font-size:1.0rem;text-shadow: 1px 1px 1px gray",text);
                            break;
                        case 2:
                            console.log("%c%s","color:red;font-weight:bold;font-size:1.5rem;text-shadow: 1px 1px 1px gray",text);
                            break;
                        case 3:
                            console.log("%c%s","color:#ff9402;font-size:0.8rem;",text);
                            break;
                        default:
                            console.log("%c%s","color:black;font-weight:bold;font-size:1.0rem;text-shadow: 1px 1px 1px gray",text);
                            break;
                    }
                }
            },
            logObj:function(obj,name){
                var self=this;
                self.log(name+":",1);
                if(obj!=undefined){
                    $.each(obj,function(name,value) {
                        var _value = typeof(value)=='object'?JSON.stringify(value):value;
                        self.log(name+":(type:"+typeof(value)+") "+_value,3);
                    });
                }else{
                    self.log('undefined',3);
                }
            },
            /*判断元素是否在屏幕显示范围内*/
            isElemInScreen:function(el){
                var self=this;
                if(el){
                    var inScreen=true;
                    var offsetTop = el.offset().top;
                    var scroll_top = $(document).scrollTop();
                    var win_height = $(window).height();
                    inScreen = (offsetTop>0&&offsetTop<win_height)?true:false;
                    self.log("isElemInScreen-> ["+el[0].localName+"."+el[0].className+"] "+offsetTop+" "+scroll_top+" "+win_height+" "+inScreen,-1);
                }else{
                    self.log('isElemInScreen-> el is undefined');
                }

            }
        }
        /*Mui 初始化*/
        var Mui={
            setStopped:function(stop){
                mui_pull.setStopped(stop);
            },
            setMainContainer:function(container){
                $this=container;
            },
            initMui:function(){
                T.log('Mui initMui',1);
                var setStop = arguments[0] ? arguments[0] : false;
                var self=this;
                mui.init({
                    pullRefresh: {
                        container: '#pullrefresh',
                        down: {
                            contentdown:'下拉刷新',
                            contentover:'释放刷新',
                            contentrefresh: '正在加载...',
                            callback: self.pulldownRefresh
                        },
                        up: {
                            contentrefresh: '正在加载...',
                            callback: self.pullupRefresh
                        }
                    }
                });
                mui_pull=mui('#pullrefresh').pullRefresh();
                if(!setStop){
                    p_type = 0;//普通列表刷新
                    mui_pull.setStopped(true);
                }else{
                    mui_pull.endPullupToRefresh(true);
                    r_timeout = 1500;
                    p_type = 1;//首页刷新，首页刷新动作是重新加载整个页面
                }
                dotIndex=option.dotIndex;
                containerIndex=option.containerIndex;
                this.setPage(containerIndex,1);
                self.getRenders();
                mui_pull.pullupLoading();
            },
            pulldownRefresh:function(){
                T.log('↓ Mui pulldownRefresh down ↓',-1);
                pull_action = 'down';
                Mui.setPage(containerIndex,1);
                setTimeout(function() {
                    if(p_type == 0){
                        Mui.getDataList();
                    }else if(p_type == 1){
                        onStart();
                        mui_pull.endPullupToRefresh(true);
                        $('.mui-pull-bottom-pocket').removeClass('mui-visibility');
                    }
                },r_timeout);
            },
            pullupRefresh:function(){
                T.log('↑ Mui pullupRefresh up ↑',-1);
                pull_action = 'up';
                setTimeout(function() {
                    if(p_type == 0){
                        Mui.getDataList();
                    }else if(p_type == 1){
                        mui_pull.endPullupToRefresh(true);
                    }
                },r_timeout);
            },
            getRenders:function(){
                if(option.dot_template){
                    var arr = option.dot_template.split(',');
                    for(var i in arr){
                        try{
                            T.log("render:"+i+" "+arr[i],-1);
                            var _render=this.getRender(arr[i]);
                            if(_render&&_render!=undefined&&_render!=null){
                                renderList.push(_render);
                                $('#'+arr[i]).remove();
                            }
                        }catch(e){
                            T.log(e.message,2,true);
                        }
                    }
                    T.log("renders count:"+renderList.length,-1);
                }
            },
            getRender:function(id){
                var tmpl = document.getElementById(id);
                if(tmpl != undefined){
                    var doTtmpl = doT.template(tmpl.innerHTML);
                    return doTtmpl;
                }else{
                    throw new Error('template: ['+id+'] is not exsits!');
                }
            },
            getDataList:function(){
                T.log('Mui getDataList',-1);
                var self=this;
                if(option.api!='undefined'&&option.api!=null){
                    if(option.dataName){
                        if(option.beforeGet){
                            option.beforeGet();
                        }
                        T.logObj(option.api_param,"Ajax api_param");
                        jsonAjax(option.api, option.api_param,function(data){
                            if(first){
                                if(option.firstGet){
                                    try{
                                        option.firstGet(data);
                                    }catch(e){T.log('firstGet error :'+e);}
                                }
                                first=false;
                            }
                            var dataLength=eval(option.dataName)?eval(option.dataName).length:0;
                            var ret=data;
                            T.log('DataList Length:'+dataLength,-1);
                            if(data.status==1&&dataLength>0){
                                $('.listNoData').remove();
                                var html=renderList[dotIndex](data);
                                if(pageList[containerIndex].page==1){
                                    $this.eq(containerIndex).html(html);
                                }else{
                                    $this.eq(containerIndex).append(html);
                                }
                                setTimeout(function(){mui_pull.setStopped(false);},200);
                                var lastEleIndex=(pageList[containerIndex].page-1)*option.pageSize+dataLength-1;
                                //T.log("lastEleIndex "+lastEleIndex,1);
                                //T.isElemInScreen($this.eq(containerIndex).children().eq(dataLength-1));
                                self.endPullAction(dataLength<option.pageSize?true:false,pageList[containerIndex].page>1?1:0);
                                if(dataLength==option.pageSize){
                                    self.setPage(containerIndex,++pageList[containerIndex].page);
                                }else if(dataLength<option.pageSize){
                                    self.setPageState(1);
                                }
                            }else{
                                var showMore=1;
                                if(pageList[containerIndex].page==1){
                                    $('.listNoData').remove();
                                    var _html='<div class="listNoData">';
                                        _html+='<img src="/web/assets/image/wudingdan_ico.png">';
                                        _html+='<p>暂无数据</p></div>';
                                    $this.eq(containerIndex).after(_html);
                                    ret=null;
                                    showMore=0;
                                    self.setPageState(2);
                                }else{
                                    self.setPageState(1);
                                }
                                self.endPullAction(true,showMore);
                            }
                            if(option.afterGet){
                                $('img').error(function () {
                                    console.log('image load error -> '+$(this).attr('src'));
                                    $(this).attr('src', '/web/assets/image/default_ico.svg');
                                });
                                option.afterGet(ret);
                            }
                        });
                    }else{
                        T.log('option.dataName is undefined!',2,true);
                    }
                }else{
                    T.log('option.api is undefined!',2,true);
                }
            },
            endPullAction:function(){
                var nomore=arguments[0] ? arguments[0] : false;
                var showMore=arguments[1];
                T.log('Mui endPullAction '+nomore+' '+showMore,-1);
                if(pull_action=='up'){
                    mui_pull.endPullupToRefresh(nomore);
                }else if(pull_action=='down'){
                    mui_pull.endPulldownToRefresh();
                    if(!nomore){mui_pull.refresh(true);}
                }
                if(showMore==0){
                    setTimeout(function(){
                        $('.mui-pull-bottom-pocket').removeClass('mui-visibility');
                    },10);
                }
            },
            setPage:function(index,p){
                if(pageList[index]==null||pageList[index]==undefined){
                    pageList[index]={page:1,state:0};
                }
                pageList[index].page=p;
                option.api_param.page=pageList[containerIndex].page;
            },
            setPageState:function(state){
                pageList[containerIndex].state=state;
            },
            setParams:function(dot_index,container_index,param,firsrLoad){
                T.log('Mui setParams');
                T.logObj(pageList[container_index],'pageList '+container_index);
                T.logObj(arguments,"setParams() Param");
                dotIndex=dot_index;
                containerIndex=container_index;
                $.each(option.api_param,function(name,value) {
                    if(param[name] != undefined)
                        option.api_param[name]=param[name];
                });
                if(pageList[containerIndex]!=undefined){
                    $('.listNoData').remove();
                    var r_state=false;
                    r_state = pageList[containerIndex].state==0?true:false;
                    mui_pull.refresh(r_state);
                    T.log('r_state '+r_state);
                    if(pageList[containerIndex].state==2){
                        mui_pull.disablePullupToRefresh();
                    }else{
                        mui_pull.enablePullupToRefresh();
                    }
                }else{
                    mui_pull.refresh(true);
                    mui_pull.enablePullupToRefresh();
                }
                if(firsrLoad) {this.switchList();}
            },
            switchList:function(){
                T.log('Mui SwitchList');
                mui_pull.scrollTo(0,0,100);
                this.setPage(containerIndex,1);
                mui_pull.pullupLoading();
            }
        }
        var M={
            init:function(){
                T.log('MuiDataList M init',0);
                /*T.logObj(option,"input optins");*/
                Mui.initMui();
            },
            setRequestParams:function(dot_index,container_index,param,firsrLoad){
                Mui.setParams(dot_index,container_index,param,firsrLoad);
            },
            setMainContainer:function(container){
                Mui.setMainContainer(container);
            },
            setStopped:function(stop){
                Mui.setStopped(stop);
            }
        }
        M.init();
        return M;
    }
    return $.fn.MuiDataList;
})(jQuery);