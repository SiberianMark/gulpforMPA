var ring = false;
var call = false;
var show_num_img=false;
if(ring){
    $(document).ready(function () {
        $('<audio id="notifyAudio" preload="auto"><source src="/web/assets/audio/notify.ogg" type="audio/ogg"><source src="/web/assets/audio/notify.mp3" type="audio/mpeg"><source src="/web/assets/audio/notify.wav" type="audio/wav"></audio>').appendTo('body');
        //$('<audio preload="auto" loop="loop" autoplay="autoplay"><source src="/web/assets/audio/cutdown.ogg" type="audio/ogg"><source src="/web/assets/audio/cutdown.mp3" type="audio/mpeg"><source src="/web/assets/audio/cutdown.wav" type="audio/wav"></audio>').appendTo('body');
    });
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

var isend = false;
var itv_serverTime = null;
//alert(formatDate(new Date(), "yyyy-MM-dd HH:mm:ss"));
$.extend($.fn,
    {
        stopCutDown:function(){
            isend = true;
            clearInterval(itv_serverTime);
        }
    },{
    fnTimeCountDown:function(d,now,gotoStr,M_obj){
        call = false;
        isend = false;
        var unend = arguments[4] ? arguments[4] : false;
        var sup_hour = arguments[5] ? arguments[5] : false;
        var before_End = arguments[6];
        var after_End = arguments[7];
        if(unend){
            d = formatDate(new Date().setTime(new Date().getTime()+30*60*1000),"yyyy-MM-dd HH:mm:ss");
            now = formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");
        }
        this.each(function(){
            var $this = $(this);
            var date = new Date(now.replace(/-/g, "/"));
            var loc_now = new Date(
            	date.getFullYear(),
            	date.getMonth(),
            	date.getDate(),
            	date.getHours(),
            	date.getMinutes(),
            	date.getSeconds()
            );
            itv_serverTime = setInterval(function(){
            	loc_now.setTime(loc_now.getTime()+10);
                //console.log('loc_now:'+loc_now.getTime());
            },10);
            var o = {
                hm: $this.find(".hm"),
                sec: $this.find(".sec"),
                mini: $this.find(".mini"),
                hour: $this.find(".hour"),
                day: $this.find(".day"),
                month:$this.find(".month"),
                year: $this.find(".year")
            };
            var f = {
                haomiao: function(n){
                    if(n < 10) return "00";//n.toString()
                    if(n < 100) return "0" + Math.floor((n/10)).toString();
                    return Math.floor((n/10)).toString();
                },
                zero: function(n){
                    var _n = parseInt(n, 10);//解析字符串,返回整数
                    if(_n > 0){
                        if(_n <= 9){
                            _n = "0" + _n
                        }
                        return String(_n);
                    }else{
                        return "00";
                    }
                },
                dv: function(){
                    //d = d || Date.UTC(2050, 0, 1); //如果未定义时间，则我们设定倒计时日期是2050年1月1日
                    var _d = $this.data("end") || d;
                    var now = loc_now,
                    endDate = new Date(_d.replace(/-/g, "/"));
                    //现在将来秒差值
                    //alert(future.getTimezoneOffset());
                    var dur = (endDate - now.getTime()) / 1000 , mss = endDate - now.getTime() ,pms = {
                        hm:"00",//hm:"000",
                        sec: "00",
                        mini: "00",
                        hour: "00",
                        day: "00",
                        month: "00",
                        year: "0"
                    };
                    if(mss > 0){
                        pms.hm = f.haomiao(mss % 1000);
                        pms.sec = f.zero(dur % 60);
                        pms.mini = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
                        if(sup_hour){
                            pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
                        }
                        //pms.day = Math.floor((dur / 86400)) > 0? f.zero(Math.floor((dur / 86400)) % 30) : "00";
                        //月份，以实际平均每月秒数计算
                        //pms.month = Math.floor((dur / 2629744)) > 0? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
                        //年份，按按回归年365天5时48分46秒算
                        //pms.year = Math.floor((dur / 31556926)) > 0? Math.floor((dur / 31556926)) : "0";
                    }else{
                        pms.year=pms.month=pms.day=pms.hour=pms.mini=pms.sec=pms.hm="00";
                        //pms.hm = "000";
                        if(ring){
                            $('#notifyAudio')[0].play(); //播放声音
                        }
                        if(unend){
                            setTimeout(function(){
                                d = formatDate(new Date().setTime(new Date().getTime()+1*10*1000),"yyyy-MM-dd HH:mm:ss");
                                now = formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");
                                var date = new Date(now.replace(/-/g, "/"));
                                loc_now = new Date(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate(),
                                    date.getHours(),
                                    date.getMinutes(),
                                    date.getSeconds()
                                );
                                //$("#TimeCountDown").fnTimeCountDown(null,null,true);
                            },500);
                        }else{
                            isend = true;
                            if(before_End!=null && !call){
                                call = true;
                                eval(before_End());
                                before_End =null;
                            }
                            if(after_End!=null && !call){
                                call = true;
                                eval(after_End());
                                after_End =null;
                            }
                            clearInterval(itv_serverTime);
                            setTimeout(function(){
                                //刷新页面
                                if(gotoStr!=null){
                                    InterfaceTap(gotoStr,M_obj);
                                }
                            },1500);
                        }
                        return pms;
                    }
                    return pms;
                },
                ui: function(){
                    //console.log(f.dv().hour+':'+f.dv().mini+':'+f.dv().sec);
                    if(o.hm){
                        if(!show_num_img){
                            o.hm.text(f.dv().hm);
                        }else{
                            var str=f.dv().hm;
                            o.hm.html("<i num='"+str.substring(0,1)+"'></i><i num='"+str.substring(1)+"'></i>");
                        }
                    }
                    if(o.sec){
                        if(!show_num_img){
                            o.sec.text(f.dv().sec);
                        }else{
                            var str=f.dv().sec;
                            o.sec.html("<i num='"+str.substring(0,1)+"'></i><i num='"+str.substring(1)+"'></i>");
                        }
                    }
                    if(o.mini){
                        if(!show_num_img){
                            o.mini.text(f.dv().mini);
                        }else{
                            var str=f.dv().mini;
                            o.mini.html("<i num='"+str.substring(0,1)+"'></i><i num='"+str.substring(1)+"'></i>");
                        }
                    }
                    if(o.hour){
                        if(!show_num_img){
                            o.hour.text(f.dv().hour);
                        }else{
                            var str=f.dv().hour;
                            o.hour.html("<i num='"+str.substring(0,1)+"'></i><i num='"+str.substring(1)+"'></i>");
                        }
                    }
                    // if(o.day){
                    //     o.day.html(f.dv().day);
                    // }
                    // if(o.month){
                    //     o.month.html(f.dv().month);
                    // }
                    // if(o.year){
                    //     o.year.html(f.dv().year);
                    // }
                    if(!isend) setTimeout(f.ui, 10);
                }
            };
            f.ui();
        });
    }
});