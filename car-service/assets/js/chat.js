if (typeof console == "undefined") {
	this.console = { log: function (msg) {  } };
}
WEB_SOCKET_SWF_LOCATION = "/swf/WebSocketMain.swf";
WEB_SOCKET_DEBUG = true;
var ws;
var heartbeat_timer = 0;
var last_health = -1;
var health_timeout = 60000;
var user_id = I('user_id',0);
var to_id = I('to_id',0);
var appid = I('appid', 0);//appid 1：用户端 2：商户端
var platform = I('platform', 'web'); //web端，pc端
var msg_page=1;
var logout=false;
var msgurl=I('msgurl','');

// 连接服务端
function connect() {
   // 创建websocket
   ws = new WebSocket(WS_URL);
   // 当socket连接打开时，输入用户名
   ws.onopen = onopen;
   // 当有消息时根据消息类型显示不同信息
   ws.onmessage = onmessage;
   clearInterval(heartbeat_timer);
   ws.onclose = function() {
		if(!logout){
			console.log("连接关闭，定时重连");
  			connect();
		}
   };
   ws.onerror = function() {
 	  console.log("出现错误");
   };
}

// 获取登录token
function getToken(){
    if(appid=='2'){
        return I('ak','');
    }else if(appid=='1'){
        return $.cookie('logintoken');
    }
}

// 连接建立时发送登录信息
function onopen(){
	//发送登录信息
    msg = new Object();
    msg.appid = appid;
    msg.platform = platform;
    msg.action = 'login';
    msg.user_id = user_id;
    msg.to_id = to_id;
    msg.logintoken=getToken();
    console.log("发送登录数据:"+JSON.stringify(msg));
    ws.send(JSON.stringify(msg)+'\r\n\r\n');
    if(!logout){
        heartbeat_timer = setInterval(function () {
            keepalive(ws)
        }, 30000);
    }
}

// 心跳机制
function keepalive(ws) {
	var time = new Date();
	if (last_health != -1 && (time.getTime() - last_health > health_timeout)) {
		//连接断开，可设置重连或者关闭连接
		init();
	} else {
		if (ws.bufferedAmount == 0) {
            try{
                if(!logout) {
                    msg = new Object();
                    msg.action = 'ping';
                    console.log("发送心跳:" + JSON.stringify(msg));
                    ws.send(JSON.stringify(msg) + '\r\n\r\n');
                }
            }catch(e){}
		}
	}
}

// 服务端发来消息时
function onmessage(e){
	try {
		var data = JSON.parse(e.data);
		console.log(data);
		switch(data.action){
			// 登录 更新用户列表
			case 'login':
				loadEnd();
				console.log("收到登录数据:"+JSON.stringify(data));
				//获取历史记录
                getNickname();
				getHistory();
				break;
			// 新消息
			case 'fromMsg':
				console.log("收到新消息数据:"+JSON.stringify(data));
				showMessage(data);
				break;
			case 'getHistory':
				//console.log("收到历史数据:"+JSON.stringify(data));
				if(pull_action == 'down'){
		            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		        }
		        if(data.data.length>0){
		        	msg_page++;
		        }
		        console.log('msg_page',msg_page);
				showHistory(data);
				break;
			// 用户退出 更新用户列表
			case 'logout':
				logout=true;
				$("#content-box").append('<p class="msginfo">下线通知，你的帐号已在其它设备登录.</p>');
				break;
            case 'getNickname':
                TitleReSet(data.data.nickname?data.data.nickname:'');
                break;
		}
	} catch (e) {
		//alert('异常:' + e.message);
	}
}

function getHistory(){
	msg = new Object();
	msg.page=msg_page;
	msg.action = 'getHistory';
	msg.appid = appid;
    msg.platform = platform;
	msg.user_id = user_id;
	msg.to_id = to_id;
    msg.logintoken=getToken();
	ws.send(JSON.stringify(msg)+'\r\n\r\n');
	console.log("发送获取历史记录指令:"+JSON.stringify(msg));
    //alert('msgurl----'+msgurl);
    if(msgurl.indexOf('http')>=0){
        console.log('自动发送msgurl。');
        setTimeout(function(){
            message.type='link';
            message.content=decodeURIComponent(msgurl);
            sendMessage(message);
            msgurl='';
            changeUrl(getParams());
        },1000);
    }
}

// 获取昵称
function getNickname(){
    msg = new Object();
    msg.page=msg_page;
    msg.action = 'getNickname';
    msg.appid = appid;
    msg.platform = platform;
    msg.user_id = user_id;
    msg.to_id = to_id;
    msg.logintoken=getToken();
    ws.send(JSON.stringify(msg)+'\r\n\r\n');
    console.log("发送获取昵称指令:"+JSON.stringify(msg));
}

// 获取url参数
function getParams() {
    var param = new Object();
    var reg = /(^|&)([^&]*)=([^&]*)/g;
    var r = window.location.search.match(reg);
    if (r != null) {
        param.push = function (o) {//Object动态添加键值-"key:value"
            if (typeof(o) == 'object') {
                //如果o是object
                for (var p in o) this[p] = o[p];
            } else if (typeof(o) == 'string') {
                //如果o是string e.g. "key:value"
                var _k = o.split(':')[0];
                var _v = o.split(':')[1];
                this[_k] = _v;
            }
        };
        for (var i in r) {
            var str = r[i].substr(1);
            if (str.indexOf('=') > -1) {
                var _k = str.split('=')[0];
                var _v = str.split('=')[1];
                param.push(_k + ":" + _v);
            }
        }
    }
    param.msgurl='';
    console.log('remove msgurl...');
    return param;
}

//修改浏览器历史记录
function changeUrl(param){
    if(typeof(param)=='object'){
        param=JSON.stringify(param).replace(/\{|\}|\"|\'/g,'').replace(/,/g,'&').replace(/:/g,'=');
    }else{
        try{
            param=param.toString().replace(',','&').replace(/:/g,'=').replace(/\"|\'/g,'');
        }catch(e){}
    }
    var path="/web/car-service/im/chat.html?"+param;
    history.replaceState(null, null, path);
}

// 显示历史记录
function showHistory(data){
	if(data.data.length<1){
		//dialog.innerHTML = '无历史消息'+'<br>';
	}else{
		for(var i=data.data.length-1;i>=0;i--){
			showMessage(data.data[i]);
		}
		if(msg_page>1&&pull_action=='down'){
			scrollToTop();
		}else{
	    	scrollToEnd();
		}
	}
}

/*显示消息*/
function showMessage(message){
	//console.log('showMessage',msg_page,pull_action);
	if(msg_page>1&&pull_action=='down'){
    	$("#content-box").prepend(render(message));
	}else{
		$("#content-box").append(render(message));
    	scrollToEnd();
	}
	$('.message img,.messageleft img').error(function () {
		mui('#pullrefresh').pullRefresh().refresh(false);
	    $(this).css({'width':'2.3rem','height':'2.3rem'});
	});
    $('.msg-voice[ev="0"]').each(function(n,obj){
        var audio=$(obj).find('audio')[0];
        var $this=$(this);
        if(audio){
            $this.parents('.message,.messageleft').addClass('msg-voice-box');
            audio.onloadedmetadata=function(){
                //alert('onloadedmetadata');
                console.log('audio duration',audio.currentSrc,audio.duration);
                if($this.parents('.message_content').find('.audio_dur').length==0){
                    $this.parents('.message_content').append('<div class="audio_dur">'+Math.round(audio.duration)+'\"</div>');
                }
            }
            audio.oncanplay=function(){
                //alert('oncanplay');
            }
            audio.oncanplaythrough=function(){
                //alert('oncanplaythrough');
            }
            audio.addEventListener('progress', function () {
                console.log("downloading audio");
            }, false);
            audio.addEventListener('play', function () {
                playstate=1;
                bgcolor=$this.parents('.message,.messageleft').css('background-color');
                $this.find('.ico_voice').css('visibility','hidden');
                $this.find('.audio_effect').show();
                $this.parents('.message,.messageleft').css({'background-color':'#F1F359'});
                if($this.parents('.message').length>0){
                    $this.siblings('.msg-after-block').css({'border-color':'transparent #F1F359 transparent transparent'});
                }else{
                    $this.siblings('.msg-after-block').css({'border-color':'transparent transparent transparent #F1F359'});
                }

            }, false);
            audio.addEventListener('pause', function () {
                playstate=0;
                $this.parents('.message,.messageleft').css({'background-color':bgcolor});
                $this.find('.ico_voice').css('visibility','visible');
                $this.find('.audio_effect').hide();
                if($this.parents('.message').length>0){
                    $this.siblings('.msg-after-block').css({'border-color':'transparent '+bgcolor+' transparent transparent'});
                }else{
                    $this.siblings('.msg-after-block').css({'border-color':'transparent transparent transparent '+bgcolor});
                }
            }, false);
            audio.addEventListener('ended', function () {
                playstate=0;
                $this.parents('.message,.messageleft').css({'background-color':bgcolor});
                $this.find('.ico_voice').css('visibility','visible');
                $this.find('.audio_effect').hide();
                $this.siblings('.msg-after-block').css({'border-color':'transparent '+bgcolor+' transparent transparent'});
                if($this.parents('.message').length>0){
                    $this.siblings('.msg-after-block').css({'border-color':'transparent '+bgcolor+' transparent transparent'});
                }else{
                    $this.siblings('.msg-after-block').css({'border-color':'transparent transparent transparent '+bgcolor});
                }
            }, false);
            audio.addEventListener('stalled', function () {
                //当浏览器尝试获取媒体数据，但数据不可用时。
                //尝试重新加载音频，并且播放。
                playstate=0;
                audio.load();
                //audio.play();
            }, false);
            audio.addEventListener('error', function (error) {
                playstate=0;
                //console.log(error);
            }, false);
            audio.load();
            $this.attr('ev','1');
        }
    });
}

/*发送消息*/
function sendMessage(msg){
    try{
        msg.action = 'fromMsg';
        msg.appid = appid;
        msg.platform = platform;
        msg.to_id = to_id;
        msg.user_id = user_id;
        msg.logintoken=getToken();
        msg.content = msg.content.replace(/"/g, '\\"').replace(/\n/g,'\\n').replace(/\r/g, '\\r');
        ws.send(JSON.stringify(msg)+'\r\n\r\n');
        console.log("发送新消息数据:"+JSON.stringify(msg));
    }catch(e){}
}

/*收到消息滚动到底部*/
function scrollToEnd(){
	//var box=document.getElementById('content-box');
    //box.scrollTop=box.scrollHeight;
    //
    //$('#content-box').animate({scrollTop:box.scrollHeight+'px'},500);
    //
    //$('#content-box>div:last-child')[0].scrollIntoView();

    mui('#pullrefresh').pullRefresh().refresh(true);
    mui('#pullrefresh').pullRefresh().scrollToBottom(300);
    //window.scrollTo(0, document.body.scrollHeight);
    //mui('#pullrefresh').scroll().scrollTo(0,Number.MAX_VALUE,300);
}

/*滚动到顶部*/
function scrollToTop(){
	//mui('#pullrefresh').pullRefresh().refresh(true);
	//mui('#pullrefresh').pullRefresh().scrollToTop(300);
	mui('#pullrefresh').scroll().scrollTo(0,-350,1000);
}
/******************************发送语音部分开始******************************/
/*
 * this is use for voice message
 * added by billyhero
 * 2017-01-16
 * 使用微信sdk进行录音，发送，播放。
*/
//开启微信录音
function startRecord(){
    if(!is_weixn(true)) return;
    wx.startRecord();

    //监听录音自动停止接口
    wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
            var localId = res.localId;
            showRecordState(0);
        }
    });

    //监听语音播放完毕接口
    wx.onVoicePlayEnd({
        success: function (res) {
            var localId = res.localId; // 返回音频的本地ID
        }
    });
}

//停止微信录音
function stopRecord(){
    if(!is_weixn(true)) return;
    wx.stopRecord({
        success: function (res) {
            var localId = res.localId;
            uploadVoice(localId);
        }
    });
}

//播放录音
function playVoice(){
    if(!is_weixn(true)) return;
    wx.playVoice({
        localId: '' // 需要播放的音频的本地ID，由stopRecord接口获得
    });
}

//暂停播放录音
function pauseVoice(){
    if(!is_weixn(true)) return;
    wx.pauseVoice({
        localId: '' // 需要暂停的音频的本地ID，由stopRecord接口获得
    });
}

//停止播放录音
function stopVoice(){
    if(!is_weixn(true)) return;
    wx.stopVoice({
        localId: '' // 需要停止的音频的本地ID，由stopRecord接口获得
    });
}

//上传录音
function uploadVoice(localId){
    if(!is_weixn(true)) return;
    wx.uploadVoice({
        localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
            var serverId = res.serverId; // 返回音频的服务器端ID
            message.type='voice';
            message.content=serverId;
            sendMessage(message);
        }
    });
}

//识别音频并返回识别结果接口
function translateVoice(){
    if(!is_weixn(true)) return;
    wx.translateVoice({
        localId: '', // 需要识别的音频的本地Id，由录音相关接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            alert(res.translateResult); // 语音识别的结果
        }
    });
}

var playstate=0;//播放状态
var audio=null;//播放音频对象
var bgcolor='';
function playVoice(obj){
    if(audio&&playstate==1&&audio.currentSrc!=obj.find('audio')[0].currentSrc){
        audio.pause();
        playstate=0;
    }
    audio=obj.find('audio')[0];
    console.log('playVoice',audio.currentSrc,audio.duration);
    if(audio){
        if(playstate==1){
            audio.pause();
        }else if(playstate==0){
            audio.play();
            // var play = function() {alert('play');
            //     document.removeEventListener("WeixinJSBridgeReady", play);
            //     audio.play();
            // };
            // if(is_weixn(true)){
            //     document.addEventListener("WeixinJSBridgeReady",play, false);
            // }else{
            //     audio.play();
            // }
        }
    }
}
/******************************发送语音部分结束******************************/
/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
/******************************发送图片部分开始******************************/
/*
 * this is use for image compress
 * added by billyhero
 * 2016-03-11
*/
var IMAGE_MAX=5;
var imgToal=0;
var images=[];
var img_index=0;

//是否支持canvas
function canvasSupport() {
    return !!document.createElement('canvas').getContext;
}

//压缩，上传图片
function drawOnCanvas(file,index,cbk,end) {
    var reader = new FileReader();
    reader.onload = function(e) {
        //alert("file.onload");
        var dataURL = e.target.result;
        if(getDeviceType() != 'android' && canvasSupport()){
            //alert('canvas');
            var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            img = new Image();
            img.onload = function() {
                //alert("img.onload");
                var square = 720;
                var lex = 102400;
                var scale=1;
                canvas.width = square;
                canvas.height = square;
                var context = canvas.getContext('2d');
                context.clearRect(0, 0, square, square);
                var imageWidth;
                var imageHeight;
                var offsetX = 0;
                var offsetY = 0;
                var flag = true;
                //alert('source img size'+ this.width + ","+this.height);
                //alert('source file length '+e.total);
                if(e.total > lex){
                    scale = 0.6;
                    if(this.width <= square || this.height <= square){
                        imageWidth  = this.width;
                        imageHeight = this.height;
                        flag = false;
                    }
                    if (this.width > this.height && flag) {
                        imageWidth = Math.round(square * this.width / this.height);
                        imageHeight = square;
                        //offsetX = -Math.round((imageWidth - square) / 2);
                    } else if(this.width < this.height && flag){
                        imageHeight = Math.round(square * this.height / this.width);
                        imageWidth = square;
                        //offsetY = -Math.round((imageHeight - square) / 2);
                    }else if(flag){
                        imageWidth  = square;
                        imageHeight = square;
                    }
                }else{
                    scale=0.8;
                    imageWidth  = this.width;
                    imageHeight = this.height;
                }
                console.log(imageWidth,imageHeight,offsetX,offsetY,scale);
                canvas.width = imageWidth;
                canvas.height = imageHeight;
                context.clearRect(0, 0, imageWidth, imageHeight);
                context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
                //alert(canvas.width+","+canvas.height+","+scale);
                var base64 = canvas.toDataURL('image/jpeg', scale);
                //var _img = new Image();
                //_img.src = base64;
                /*    if($('.inputTipsText').length==0){
                    $('body').append("<div class='inputTipsText'><div></div></div>");
                }
                $('.inputTipsText').removeClass('hide');
                $('.inputTipsText>div').html('正在上传...');*/
                postImage(index,base64,cbk,end);
            };
            img.src = dataURL;
        }else{
            //alert('no canvas');
            postImage(index,dataURL,cbk,end);
        }
    };
    reader.readAsDataURL(file);
}

//上传图片
function postImage(index,base64,cbk,end){
    //服务器请求地址
    var url = API.SERVER_URL + API.APP_LICATION + API.API_LIST.ONEBUY_UPD_IMAGE;
    $.ajax({
      type: 'POST',
      url: url,
      timeout: 30000,
      data: {'userid': getUserid(),'image': base64},
      dataType: 'json',
      success: function (data, textStatus) {
        console.log('ajax post success',data.data);
        if (data.status == 1) {
        	if(data.data){
        		imgToal--;
        		images[index]=data.data;
        		if(cbk&&cbk!=undefined&&cbk!=null){
                	cbk(data);//单张图片上传成功回调
            	}
        	}
        }else{
            inputTipsText(data.info);
        }
        if(imgToal<=0){
            if(end&&end!=undefined&&end!=null){
                end();//全部上传完成回调
            }
        }
        //隐藏提示框
        setTimeout(function(){
            $('.inputTipsText').addClass('hide');
        },1000);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        inputTipsText('网络异常,请稍后再试.');
        return false;
      }
    });
}
/******************************发送图片部分结束******************************/