if(!is_weixn(true)){
	document.writeln('<link rel="stylesheet" type="text/css" href="/web/assets/css/swipebox.min.css">');
	document.writeln('<script src="/web/assets/js/jquery.swipebox.min.js"></script>');
}

var _this;
function imageUpdate(){
	var imgToal =0;
	var submit=true;
	var img;//上传图片
	var i=0;//总共图片张数
	var images=new Array();//图片
	var len=0;
	var num = arguments[0]?arguments[0]:9;
	num = isNaN(num)?9:parseInt(num)<1||parseInt(num)>9?9:parseInt(num);

	//删除图片按钮
	$(".publish-btn").on("click",".del-img",function(e){
	    e.stopPropagation();
	    e.preventDefault();
	    var id=$(this).attr("id");
	    $(this).parent(".pub-img").remove();
        $('.publish-btn').children('span').show();
        $('.publish-btn').removeClass('no-bg');
	});
	$(".publish-btn1").on("click",".del-img",function(e){
	    e.stopPropagation();
	    e.preventDefault();
	    var id=$(this).attr("id");
	    $(this).parent(".pub-img").remove();
        $('.publish-btn1').children('span').show();
        $('.publish-btn1').removeClass('no-bg');
	});
	$(".publish-btn2").on("click",".del-img",function(e){
	    e.stopPropagation();
	    e.preventDefault();
	    var id=$(this).attr("id");
	    $(this).parent(".pub-img").remove();
        $('.publish-btn2').children('span').show();
        $('.publish-btn2').removeClass('no-bg');
	});

	if(is_weixn(true)){//微信环境
		//微信预览图片的接口.
	    $(".publish-btn,.publish-btn1,.publish-btn2").on("click", ".pub-img img", function (event) {
	        //预览图片接口
	        var imgArray = [];
	        var curImageSrc = $(this).attr('src');
	        if (curImageSrc) {
	            $('.pub-img img').each(function (index, el) {
	                var itemSrc = $(this).attr('src');
	                imgArray.push(itemSrc);
	            });
	            wx.previewImage({
	                current: curImageSrc,   // 当前显示图片的http链接
	                urls: imgArray  // 需要预览的图片http链接列表
	            });
	        }
	    });


		$(".publish-btn,.publish-btn1,.publish-btn2").on("click",".pub-btn", function () {
			var that = $(this);
		    //拍照或从手机相册中选图接口
		    var j=0;
		    console.log('wx,click');
		    wx.chooseImage({
		        count: num-len, // 默认9
		        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		        success: function (res) {
		            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		            img = localIds.toString().split(',');
		            var length = img.length;
		            if(length==1){

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
			                                    that.before("<div class='pub-img' id="+ i + "><div class='del-img' id=" + i + "></div><img src=" + result.data + " id=" + i + "></div>");
			                                    images[i]=result.data;
			                                    //inputTipsText('当前['+i+'/'+images.length+']:'+images[i],6000);
			                                    i++;
			                                    len++;
			                                    if(len>=num){
			                                    	if(num!=1){
	                									inputTipsText('不能超过'+num+'张图片');
			                                    	}
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
			            if(that.siblings('.pun-img').find('img').attr('src')!=''){
							that.parent().addClass('no-bg');
			                                        that.hide();
	                    };
		            }else{
		            	inputTipsText('只能上传1张图片');
		            }
		        }
		    });
		});

	} else {//网页环境

        var source='publish';
        $('.publish-btn').children().remove();
        $('.publish-btn1').children().remove();
        $('.publish-btn2').children().remove();
        $('<span class="pub-btn spec"><input type="file" capture="camera" accept="image/*" multiple="multiple" id="cameraInput" name="cameraInput" /></span>').appendTo($('.publish-btn'));
        $('<span class="pub-btn spec"><input type="file" capture="camera" accept="image/*" multiple="multiple" id="cameraInput1" name="cameraInput" /></span>').appendTo($('.publish-btn1'));
        $('<span class="pub-btn spec"><input type="file" capture="camera" accept="image/*" multiple="multiple" id="cameraInput2" name="cameraInput" /></span>').appendTo($('.publish-btn2'));

	        	document.getElementById('cameraInput').addEventListener("change",
		        function(){
		        	_this = $(this).parent('span');
		        	_this.siblings('a').show();
                    _this.hide();
                    _this.parent().addClass('no-bg');
		            var fileList = this.files;
		            console.log(fileList,111);
		            console.log(this);
		            if(fileList.length<=0 || fileList==null){
		                return;
		            }
		            if(fileList.length>1){
	            		_this.show();
                    	_this.parent().removeClass('no-bg');
		            	inputTipsText('不能超过1张图片');
		            	return;
		            };
		            imgToal = fileList.length;
		            if(i+imgToal>num){
		                imgToal = num - i ;
		            }
		            for( var index = 0 ; index < imgToal ; index++ ){
		                inputTipsText('正在上传...');
		                console.log(i,fileList[index].name,333);
		                drawOnCanvas(fileList[index],i,source);
		                i++;
		                if(i>=num){
		                	if(num!=1){
		                		inputTipsText('不能超过'+num+'张图片');
		                	}
		                }
		            }
		        }, false);
		        document.getElementById('cameraInput1').addEventListener("change",
		        function(){
		        	_this = $(this).parent('span');
                    _this.hide();
                    _this.parent().addClass('no-bg');
		            var fileList = this.files;
		            console.log(fileList,111);
		            console.log(this);
		            if(fileList.length<=0 || fileList==null){
		                return;
		            };
		            if(fileList.length>1){
	            		_this.show();
                    	_this.parent().removeClass('no-bg');
		            	inputTipsText('不能超过1张图片');
		            	return;
		            };
		            imgToal = fileList.length;
		            if(i+imgToal>num){
		                imgToal = num - i ;
		            }
		            for( var index = 0 ; index < imgToal ; index++ ){
		                inputTipsText('正在上传...');
		                console.log(i,fileList[index].name,333);
		                drawOnCanvas(fileList[index],i,source);
		                i++;
		                if(i>=num){
		                	if(num!=1){
		                		inputTipsText('不能超过'+num+'张图片');
		                	}
		                }
		            }
		        }, false);
		        document.getElementById('cameraInput2').addEventListener("change",
		        function(){
		        	_this = $(this).parent('span');
                    _this.hide();
                    _this.parent().addClass('no-bg');
		            var fileList = this.files;
		            console.log(fileList,111);
		            console.log(this);
		            if(fileList.length<=0 || fileList==null){
		                return;
		            }
		            if(fileList.length>1){
	            		_this.show();
                    	_this.parent().removeClass('no-bg');
		            	inputTipsText('不能超过1张图片');
		            	return;
		            };
		            imgToal = fileList.length;
		            if(i+imgToal>num){
		                imgToal = num - i ;
		            }
		            for( var index = 0 ; index < imgToal ; index++ ){
		                inputTipsText('正在上传...');
		                console.log(i,fileList[index].name,333);
		                drawOnCanvas(fileList[index],i,source);
		                i++;
		                if(i>=num){
		                	if(num!=1){
		                		inputTipsText('不能超过'+num+'张图片');
		                	}
		                }
		            }
		        }, false);


		function canvasSupport() {
		    return !!document.createElement('canvas').getContext;
		}

		function drawOnCanvas(file,index,source,cbk,end) {
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
		                len++;
		                images[index]=data.data;
		                //inputTipsText('image添加[ADD]:'+images.length+'.当前['+i+']',6000);
		                console.log('image添加:',images.length,index,images[index],images,i);
		                _this.before("<a class='pub-img swipebox' id="+ index + " href='"+data.data+"'><div class='del-img' id=" + index + "></div><img src=" + data.data + " id=" + index + "></a>");

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
    }
}