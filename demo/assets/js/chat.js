var ws = {};
var fd;

$(document).ready(function () {
    //使用原生WebSocket
    if (window.WebSocket || window.MozWebSocket) {
        ws = new WebSocket(WS_URL);
    }
    //使用flash websocket
    else if (webim.flash_websocket) {
        WEB_SOCKET_SWF_LOCATION = "/assets/flash-websocket/WebSocketMain.swf";
        $.getScript("/assets/flash-websocket/swfobject.js", function () {
            $.getScript("/assets/flash-websocket/web_socket.js", function () {
                ws = new WebSocket(WS_URL);
            });
        });
    }
    //使用http xhr长轮循
    else {
        ws = new Comet(WS_URL);
    }
    listenEvent();
});

function listenEvent() {
    /**
     * 连接建立时触发
     */
    ws.onopen = function (e) {
        var obj = M();
        obj.action = 'login';
        obj.userid = getUserid();
        ws.send(JSON.stringify(obj));
    };

    //有消息到来时触发
    ws.onmessage = function (e) {
        var data = JSON.parse(e.data);
        var action = data.action;
        switch (action){
            case 'login':
                fd = data.fd;
                alert(data.msg);
                break;
            case 'push':
                alert('服务器推送信息：'+data.msg);
                break;
        }
    };

    /**
     * 连接关闭事件
     */
    ws.onclose = function (e) {
        alert('已断开连接');
    };

    /**
     * 异常事件
     */
    ws.onerror = function (e) {
        alert("异常");
    };
}

