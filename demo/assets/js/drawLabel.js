
	function addimgLabels(articles){
    	//为每个图片绑定canvas
    	if(articles){
    		bindimgCanvas(articles);
    	}
    	
	};
	    function bindimgCanvas(articles){
	    	var imgWidth,imgHeight,imgoffsetLeft,imgoffsetTop;
	    	var imgs=$('.img');
	    	var labels=[];

	    	for(var k=0;k<articles.length;k++){
	    		if(articles[k].cid==2){
	    			if(imgs.length>0){
		    			labels.push(articles[k].pic_label);
		    		}   	
	    		}
	    	}
    		if(imgs.length==1){
    			if(labels[0]){
	    			imgWidth=imgs.width();
					imgHeight=imgs.height();
					imgoffsetTop=imgs.offset().top;
					imgoffsetLeft=imgs.offset().left;
					//绑定一个canvas
					labelCanvas.createCanvas(0,imgWidth,imgHeight,imgoffsetTop,imgoffsetLeft);
					//开始构建标签
					//labels=imgs.attr("pic_label");
					
					 for(var j=0;j<labels[0].length;j++){
						labelCanvas.createLabel("picCavans0",labels[0][j],imgWidth,imgHeight);
						labelCanvas.clickgoto("picCavans0",labels[0][j],imgWidth,imgHeight)
					}
				}
    		
	    	}else{
			    	for(var i=0;i<imgs.length;i++){
			    		if(labels[i]){
			    			console.log(imgs.eq(i));
				    		imgWidth=imgs.eq(i).width();
							imgHeight=imgs.eq(i).height();
							imgoffsetTop=imgs.eq(i).offset().top;
							imgoffsetLeft=imgs.eq(i).offset().left;
							//为每个图片绑定一个canvas
							labelCanvas.createCanvas(i,imgWidth,imgHeight,imgoffsetTop,imgoffsetLeft);
							//开始构建标签
							//labels=imgs[i].prop("pic_label");
							
							for(var j=0;j<labels[i].length;j++){
								labelCanvas.createLabel("picCavans"+i,labels[i][j],imgWidth,imgHeight);
								labelCanvas.clickgoto("picCavans"+i,labels[i][j],imgWidth,imgHeight)
							}	
						}	
			    	}
	    	}	    	    	
	    };
	    var ctx;
		var labelCanvas={
			createCanvas:function(picid,imgWidth,imgHeight,imgoffsetTop,imgoffsetleft){
				var fontSize=parseInt($('html').css('font-size'));
				var c=document.createElement('canvas');    
				c.id="picCavans"+picid;
				c.width=imgWidth;
				c.height=imgHeight;
				 //c.style="opacity: 1;position:absolute;top:"+imgoffsetTop+"px;left:"+imgoffsetleft+"px;"+"width:"+imgWidth+"px;"+"height:"+imgHeight+"px;"
				//c.style.="opacity: 1;position:absolute;top:"+imgoffsetTop+"px;left:"+imgoffsetleft+"px;";
				c.style.cssText="opacity: 1;position:absolute;top:"+imgoffsetTop+"px;left:"+imgoffsetleft+"px;";
				$("#data-note").append(c);
				ctx=c.getContext("2d");

			},
			createLabel:function(_canvas,picLabel,imgWidth,imgHeight){
				var cvs=document.getElementById(_canvas);
				var ctx=cvs.getContext("2d");
				var labeldetails=picLabel.split(",");
				var x=imgWidth*labeldetails[5];
				var y=imgHeight*labeldetails[6];
				var startX,startY,endX,endY;
				//填充图
				var img=document.createElement('img');
				img.src="/web/assets/image/xuanzhuan.png";
				img.onload=function(){	
					ctx.drawImage(img,x-(iconWidth/2),y-(iconWidth/2),iconWidth,iconWidth);	
				};
				switch(labeldetails[7]){
					case "1"://左下
					{
						startX=x-4;
						startY=y+10;
						endX=x-6;
						endY=y+22;
						for(var i=0;i<5;i++){
							if(labeldetails[i]!=""){
								txtWidth=ctx.measureText(labeldetails[i]).width;
								 this.drawLine(ctx,startX,startY,endX,endY,"#ffffff");//画斜线
								 this.drawLine(ctx,endX,endY,endX-txtWidth-30,endY,'#ffffff');//画横线
								 if(i==1){
								 		labeldetails[i]="￥"+ labeldetails[i];
								 	}
								 if("1234".indexOf(i)>0){															 	
								 	console.log(txtWidth);
								 	if(txtWidth>50){
								 		this.drawText(ctx,labeldetails[i],startX-100,endY-5,"rgb(234,184,29)");
								 	}else{
								 		this.drawText(ctx,labeldetails[i],startX-50,endY-5,"rgb(234,184,29)");//画文字，水平负数向左，正数向右；垂直负数向上，正数向下
								 	}
								 }else{
								 	
								 	console.log(txtWidth);
								 	if(txtWidth>50){
								 		this.drawText(ctx,labeldetails[i],startX-100,endY-5,"#ffffff");
								 	}else{
								 		this.drawText(ctx,labeldetails[i],startX-50,endY-5,"#ffffff");//画文字，水平负数向左，正数向右；垂直负数向上，正数向下
								 	}
								 }
								 
								 // this.drawLine(42,42,62,72,"#ffffff");
								 // this.drawText("hello",62+20,72-10);
								startX=endX;
								startY=endY;
								endX=endX-6;
								endY=endY+22;
							}
						}

					}
					break;
					case "2"://右下
					{
						startX=x+4;
						startY=y+10;
						endX=x+6;
						endY=y+22;
						for(var i=0;i<5;i++){
							if(labeldetails[i]!=""){
								txtWidth=ctx.measureText(labeldetails[i]).width;
								 this.drawLine(ctx,startX,startY,endX,endY,"#ffffff");//画斜线
								 this.drawLine(ctx,endX,endY,endX+txtWidth+20,endY,'#ffffff');//画横线
								 if(i==1){
								 		labeldetails[i]="￥"+ labeldetails[i];
								 	}
								 if("1234".indexOf(i)>0){
								 	this.drawText(ctx,labeldetails[i],startX+20,endY-5,"rgb(234,184,29)");//画文字，水平负数向左，正数向右；垂直负数向上，正数向下
								 	console.log(txtWidth);
								 }else{
								 	this.drawText(ctx,labeldetails[i],startX+20,endY-5,"#ffffff");//画文字，水平负数向左，正数向右；垂直负数向上，正数向下
								 	console.log(txtWidth);
								 }
								 // this.drawLine(ctx,42,42,62,72,"#ffffff");
								 // this.drawText("hello",62+20,72-10);
								startX=endX;
								startY=endY;
								endX=endX+6;
								endY=endY+22;
							}
						}
					}
					break;
					case "3"://右上
					{
						startX=x+4;
						startY=y-10;
						endX=x+6;
						endY=y-22;
						for(var i=0;i<5;i++){
							if(labeldetails[i]!=""){
								txtWidth=ctx.measureText(labeldetails[i]).width;
								 this.drawLine(ctx,startX,startY,endX,endY,"#ffffff");//画斜线
								 this.drawLine(ctx,endX,endY,endX+txtWidth+20,endY,'#ffffff');//画横线
								 if(i==1){
								 		labeldetails[i]="￥"+ labeldetails[i];
								 	}
								 if("1234".indexOf(i)>0){
								 	this.drawText(ctx,labeldetails[i],startX+25,endY-5,"rgb(234,184,29)");//画文字，水平负数向左，正数向右；垂直负数向上，正数向下
									console.log(txtWidth);
								 }else{
								 	this.drawText(ctx,labeldetails[i],startX+25,endY-5,"#ffffff");//画文字，水平负数向左，正数向右；垂直负数向上，正数向下
								 	console.log(txtWidth);
								 }
								 // this.drawLine(ctx,42,42,62,72,"#ffffff");
								 // this.drawText("hello",62+20,72-10);
								startX=endX;
								startY=endY;
								endX=endX+6;
								endY=endY-22;
							}
						}
					}
					break;
					case "4"://左上
					{
						startX=x-4;
						startY=y+10;
						endX=x-6;
						endY=y-22;
						for(var i=0;i<5;i++){
							if(labeldetails[i]!=""){
								txtWidth=ctx.measureText(labeldetails[i]).width;
								 this.drawLine(ctx,startX,startY,endX,endY,"#ffffff");//画斜线
								 this.drawLine(ctx,endX,endY,endX-txtWidth-20,endY,'#ffffff');//画横线
								 if(i==1){
								 		labeldetails[i]="￥"+ labeldetails[i];
								 	}
								 if("1234".indexOf(i)>0){
								 	console.log(txtWidth);
								 	if(txtWidth>50){
								 		this.drawText(ctx,labeldetails[i],tartX-75,endY-5,"rgb(234,184,29)");
								 	}else{
								 		this.drawText(ctx,labeldetails[i],tartX-25,endY-5,"rgb(234,184,29)");//画文字，水平负数向左，正数向右；垂直负数向上，正数向下
								 	}
								 }else{
								 	
								 	console.log(txtWidth);
								 	if(txtWidth>50){
								 		this.drawText(ctx,labeldetails[i],tartX-75,endY-5,"#ffffff");
								 	}else{
								 		this.drawText(ctx,labeldetails[i],startX-25,endY-5,"#ffffff");//画文字，水平负数向左，正数向右；垂直负数向上，正数向下
								 	}
								 }
								 // this.drawLine(42,42,62,72,"#ffffff");
								 // this.drawText("hello",62+20,72-10);
								startX=endX;
								startY=endY;
								endX=endX-6;
								endY=endY-22;
							}
						}
					}
					break;
				}
				
			},
			//绑定点击跳转事件
			clickgoto:function(_canvas,_picLabel,_imgWidth,_imgHeight,_url){
				var _this=this;
				var cvs=document.getElementById(_canvas);
				var labeldetails=_picLabel.split(",");
				var _x=_imgWidth*labeldetails[5];
				var _y=_imgHeight*labeldetails[6];
				var _url=labeldetails[8];
				var evpos;
				var labelPos=[_x+iconWidth,_x-iconWidth,_y+iconWidth,_y-iconWidth];
				cvs.addEventListener('click',function(e){
					evpos=_this.getEventPosition(e);
					if(evpos.x<labelPos[0] && evpos.x>labelPos[1] && evpos.y<labelPos[2] && evpos.y>labelPos[3]){
						window.location.href=_url;
					}

				},false);
			},
			//获取事件对象e的触发坐标
			getEventPosition:function(ev){
				var x,y;
				if(ev.layerX || ev.layerX==0){
					x=ev.layerX;
					y=ev.layerY;
				}else if(ev.offsetX || ev.offsetX==0){//Opera
					x=ev.offsetX;
					y=ev.offsetY;
				}
				return {x:x,y:y};
			},
			//判断当前上下文是否覆盖某个坐标
			//填充图
			drawImg:function(img,_x,_y,_width,_height){
			},
			//划线
			drawLine:function(_ctx,_startX,_startY,_endX,_endY,_color){
				
				_ctx.moveTo(_startX+0.5,_startY+0.5);
				_ctx.lineTo(_endX+0.5,_endY+0.5);
				_ctx.strokeStyle="#ffffff";//设置画笔颜色
				_ctx.lineWidth = 1.5;
				_ctx.stroke();//渲染画出路径
				_ctx.closePath();
			},
			//填充文字
			drawText:function(_ctx,text,_posX,_posY,_color){
				_ctx.font="1.4rem";
				_ctx.fillStyle = _color;//设置填充颜色
				
				_ctx.fillText(text,_posX,_posY);//渲染
			}
		}
