/**
 * Created by ZhouZelin on 2016/11/22.
 */
function image_upload(){
    var img;//上传图片
    if(is_weixn(true)){//微信环境

        $("#pic-box").on("click","img", function () {
            //拍照或从手机相册中选图接口
            console.log('wx,click');
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    img = localIds.toString().split(',');
                    var upload = function(){
                        wx.uploadImage({
                            localId: img[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                var serverId = res.serverId; // 返回图片的服务器端ID
                                $.ajax({
                                    url: '/Gold/Wechat/uploadImage',
                                    type: 'get',
                                    data: {serverId: serverId.toString()},
                                    dataType: 'json',
                                    success: function (result) {
                                        if (result.status == 1) {
                                            $("#pic-box img").attr("src",result.data);
                                        }else {
                                            alert('上传失败!');
                                        }
                                    }
                                });
                            }
                        });
                    }
                    upload();
                }
            });
        });

    } else {//网页环境
        $('<input type="file" capture="camera" accept="image/*" multiple="multiple" id="cameraInput" name="cameraInput" />').appendTo($('#pic-box'));

        //网页上传按钮监听
        document.getElementById("cameraInput").addEventListener("change",
            function(){
                var fileList = this.files;
                inputTipsText('正在上传...');
                drawOnCanvas(fileList[0]);

            }, false);


        function canvasSupport() {
            return !!document.createElement('canvas').getContext;
        }

        function drawOnCanvas(file) {
            var reader = new FileReader();
            reader.onload = function(e) {

                var dataURL = e.target.result;
                if(getDeviceType() != 'android' && canvasSupport()){

                    var canvas = document.createElement('canvas'),
                        ctx = canvas.getContext('2d'),
                        img = new Image();
                        img.onload = function() {

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

                            } else if(this.width < this.height && flag){
                                imageHeight = Math.round(square * this.height / this.width);
                                imageWidth = square;

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
                        var base64 = canvas.toDataURL('image/jpeg', scale);
                        postImage(base64);
                    };
                    img.src = dataURL;
                }else{
                    postImage(dataURL);
                }
            };
            reader.readAsDataURL(file);
        }

        function postImage(base64){
            //服务器请求地址
            var url = API.SERVER_URL + API.APP_LICATION + API.API_LIST.ONEBUY_UPD_IMAGE;
            $.ajax({
                type: 'POST',
                url: url,
                timeout: 30000,
                data: {'userid':getUserid(),'image': base64},
                dataType: 'json',
                success: function (data, textStatus) {
                    console.log('ajax post success',data.data);
                    if (data.status == 1) {
                        $("#pic-box img").attr("src",data.data);
                    }else{
                        inputTipsText(data.info);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    inputTipsText('网络异常,请稍后再试.');
                    return false;
                }
            });
        }
    }
}