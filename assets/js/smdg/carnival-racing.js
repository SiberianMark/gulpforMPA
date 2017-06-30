function getData(){
    jsonAjax(API.API_LIST.GOLD_MATCHINDEX,{userid:getUserid()},function(data){
        if(data.status==1){
            match_id=data.data.id;
            $('.racing-wrap').html(race_tml(data.data));
        }
        loadEnd();
    });
}
if(!is_weixn()){
    $('.modal-img').html('<input type="file" capture="camera" accept="image/*" multiple="multiple" id="cameraInput" name="cameraInput" />');
    document.getElementById("cameraInput").addEventListener("change",function(){
        var fileList = this.files;
        imgToal = fileList.length;
        if(fileList.length<=0 || fileList==null){
            return;
        }
        if(imgToal==1){
            drawOnCanvas(fileList[0],0,'publish');
        }
    });
}else{
    $('.modal-img').on('click',function(){
        $('.modal-img').html('');
        var j=0;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                img = localIds.toString().split(',');
                var length = img.length;
                var upload = function(){
                    wx.uploadImage({
                        localId: img[j], // 需要上传的图片的本地ID，由chooseImage接口获得
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
                                        $(".pub-btn").attr('imgUrls',result.data);
                                        $(".pub-btn").css('background-image','url('+result.data+')');
                                        if(hasReturn){
                                            callback(0);
                                        }
                                    }else {
                                        alert('上传失败!');
                                    }
                                    j++;
                                    if (j < length) {
                                        upload();
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
}
//添加
$('.racing-wrap').on('click','.adds-btn',function(){
    var $this=$(this);
    if($this.parent('.radius-circle').attr('edit')=='1'){
        $(".input-modal").addClass('fade');
        $('.pub-btn').attr('imgurls','');
        $('.uploads').find('input').val('');
        $(".pub-btn").css('background-image',"url('/web/assets/image/smdg/race/usrs.png')");
        $('#btn-confirm').attr('types',$this.parent().attr('types'));
        $('#btn-confirm').attr('acid',$this.parent().attr('acid'));
        $('#btn-confirm').attr('didiid',$this.parent().attr('didiid'));
    }else {
        inputTipsText('没有权限');
    }
});
$('#btn-confirm').on('click',function(){
    var $this=$(this);
    var regex = /(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;//手机号
    var input_val=$(this).parents('.modal').find('input').val();
    if(input_val=='' && !$('.pub-btn').attr('imgurls')){
        inputTipsText('嘀嘀号或手机号不能为空');
        return;
    }
    if(input_val.length=='11' && !regex.test(input_val)){
        inputTipsText('请输入正确的手机号！');
        return;
    }
    var param={
        userid:getUserid(),
        match_id:match_id,
        action:'update',
        type:$this.attr('types'),
        id:$this.attr('acid'),
        user:(input_val.length=='7')?input_val:'',
        mobile:(input_val.length=='11')?input_val:'',
        photo:$('.pub-btn').attr('imgurls')
    };
    jsonAjax(API.API_LIST.GOLD_MATCHACTION,param,function(data){
        if(data.status==1){
            getData();
        }else {
            inputTipsText(data.info);
        }
        $(".input-modal").removeClass('fade');
    });

});
//删除
$('.racing-wrap').on('click','.del-btn',function(){
    var $this=$(this);
    if($this.parent('.radius-circle').attr('edit')=='1'){
        $(".modal-del").addClass('fade');
        $('#btn-confirm1').attr('types',$this.parent().attr('types'));
        $('#btn-confirm1').attr('acid',$this.parent().attr('acid'));
        $('#btn-confirm1').attr('didiid',$this.parent().attr('didiid'));
    }else {
        inputTipsText('没有权限');
    }
});
$('#btn-confirm1').on('click',function(){
    var $this=$(this);
    var param={
        userid:getUserid(),
        match_id:match_id,
        action:'del',
        type:$this.attr('types'),
        id:$this.attr('acid'),
        user:$this.attr('didiid'),
        mobile:'',
        photo:''
    };
    console.log(param);
    jsonAjax(API.API_LIST.GOLD_MATCHACTION,param,function(data){
        if(data.status==1){
            getData();
        }else {
            inputTipsText(data.info);
        }
        $(".modal-del").removeClass('fade');
    });
});
$('#btn-cancel1').on('click',function(){
    $(".modal-del").removeClass('fade');
});
$('#btn-cancel').on('click',function(){
    $(".input-modal").removeClass('fade');
});
function canvasSupport() {
return !!document.createElement('canvas').getContext;
}

function drawOnCanvas(file,index,source,cbk,end) {
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
            postImage(index,base64,source,cbk,end);
        };
        img.src = dataURL;
    }else{
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
            // images[index]=data.data;
            // console.log('image添加:',images.length,index,images[index],images,i);
            $(".pub-btn").attr('imgUrls',data.data);
            $(".pub-btn").css('background-image','url('+data.data+')');
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
