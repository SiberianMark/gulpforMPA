/*
 * this is use for image compress
 * added by billyhero
 * 2016-03-11
*/

function canvasSupport() {
    return !!document.createElement('canvas').getContext;
}

function drawOnCanvas(file,index,source,cbk,end) {
    var Orientation=null;
    var reader = new FileReader();
    try{
        //获取照片方向角属性，用户旋转控制
        EXIF.getData(file, function() {
            EXIF.getAllTags(this);
            Orientation = EXIF.getTag(this, 'Orientation');
            console.log('Orientation number:'+Orientation);
        });
    }catch(e){console.log('exit js is not exitis');}

    reader.onload = function(e) {
        //alert("file.onload");
        var dataURL = e.target.result;
        if(getDeviceType() != 'android' && canvasSupport()){
            //alert('canvas');
            var canvas = document.createElement('canvas'),
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
                var base64 =null;
                //alert(canvas.width+","+canvas.height+","+scale);
                //var _img = new Image();
                //_img.src = base64;
                /*    if($('.inputTipsText').length==0){
                    $('body').append("<div class='inputTipsText'><div></div></div>");
                }
                $('.inputTipsText').removeClass('hide');
                $('.inputTipsText>div').html('正在上传...');*/
                //修复ios
                if (getDeviceType()=='ios') {
                    if(Orientation != "" && Orientation != 1){
                        switch(Number(Orientation)){
                            case 6://需要顺时针（向左）90度旋转
                                console.log('需要顺时针（向左）90度旋转');
                                rotateImg(this,'left',canvas);
                                break;
                            case 8://需要逆时针（向右）90度旋转
                                console.log('需要逆时针（向右）90度旋转');
                                rotateImg(this,'right',canvas);
                                break;
                            case 3://需要180度旋转
                                console.log('需要180度旋转');
                                rotateImg(this,'right',canvas);//转两次
                                rotateImg(this,'right',canvas);
                                break;
                            default:
                                console.log('default...');
                                break;
                        }
                    }
                }
                base64 = canvas.toDataURL('image/jpeg', scale);
                postImage(index,base64,source,cbk,end);
            };
            img.src = dataURL;
        }else{
            //alert('no canvas');
            postImage(index,dataURL,source,cbk,end);
        }
    };
    reader.readAsDataURL(file);
}

function postImage(index,base64,source,cbk,end){
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
            if(source=="myinfo"){
                jsonAjax(API.API_LIST.PACKAGE_UPDATEMYINFO, {'userid': getUserid(),type: 1,content: data.data},function (data) {  //得到期数信息
                    if (data.status == 1) {
                        $(".user-image").attr("src",data.data);
                    }
                    inputTipsText(data.info);
                });
            }else if(source=='publish'){
                len++;
                images[index]=data.data;
                //inputTipsText('image添加[ADD]:'+images.length+'.当前['+i+']',6000);
                console.log('image添加:',images.length,index,images[index],images,i);
                $(".pub-btn").before("<a class='pub-img swipebox' id="+ index + " href='"+data.data+"'><div class='del-img' id=" + index + "></div><img src=" + data.data + " id=" + index + "></a>");
            }else{
                if(cbk&&cbk!=undefined&&cbk!=null){
                    cbk(data);//上传成功回调函数
                }
            }
        }else{
            inputTipsText(data.info);
        }
        imgToal--;
        if(imgToal<=0){
            if(end&&end!=undefined&&end!=null){
                end();//全部上传完成
            }
        }
        if(imgToal<=0&&(source=="publish")){
            $('.swipebox').swipebox({clickEventType:'click',showByGroup:false});
        }
        setTimeout(function(){
            $('.inputTipsText').addClass('hide');
        },500);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        inputTipsText('网络异常,请稍后再试.');
        return false;
      }
    });
}

//对图片旋转处理 added by lzk
function rotateImg(img, direction,canvas) {
    console.log('rotateImg - '+direction);
    //alert(img);
    //最小与最大旋转方向，图片旋转4次后回到原方向
    var min_step = 0;
    var max_step = 3;
    //var img = document.getElementById(pid);
    if (img == null)return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    var height = img.height;
    var width = img.width;
    //var step = img.getAttribute('step');
    var step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }
    //img.setAttribute('step', step);
    /*var canvas = document.getElementById('pic_' + pid);
    if (canvas == null) {
        img.style.display = 'none';
        canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'pic_' + pid);
        img.parentNode.appendChild(canvas);
    }  */
    //旋转角度以弧度值为参数
    var degree = step * 90 * Math.PI / 180;
    var ctx = canvas.getContext('2d');
    console.log('step:'+step+'  degree:'+degree);
    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
    }
}