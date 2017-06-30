
// 3. 插件开发三步曲第三步实现接口
;(function(){
	//插件三步走，1.定义默认参数
	var name = "drawLabel",//插件名
	 instance = null,//初始对象
	 defaults={//默认接收参数
	 };
	 var s;
	 var draw;
	 
	 

	// 2.定义插件对象，接收目标以及配置参数
	function addimgLabels(elem,options){
		this.img=$(elem).find("img");
		this.pic_label=$(elem).attr("pic_labels");
		this.svgid=$(elem).attr("id");
		this.imgoffsetTop=this.img.offset().top;
		this.imgoffsetleft=this.img.offset().left;
		this.imgwidth=this.img.width();
		this.imgheight=this.img.height();
		this.options = $.extend({}, defaults, options);
		this.labels=new Array();//标签数据
		this.init();//创建对象后的入口函数
	}
	addimgLabels.prototype={
			init: function(){
				//初始化标签数据
					this._strToarr(this.pic_label);
					console.log(this.labels);
		    		this.createSvg();
					this.createLabel(this.labels);				
		 	},
			createSvg:function(){
				// var svg=document.createElement('div');
				// svg.class="svg";
				// svg.id="picSvg"+this.options.picid;
				// svg.style="opacity: 1;position:absolute;top:"+this.imgoffsetTop+"px;left:"+this.imgoffsetleft+"px;"+"width:"+this.imgwidth+"px;height:"+this.imgheight+"px;";
				// $("#data-note").append(svg);
				var style="position:absolute;top:"+this.imgoffsetTop+"px;"+"left:"+this.imgoffsetleft+"px;"
				draw = SVG(this.svgid).size(parseInt(this.imgwidth), parseInt(this.imgheight)).attr({style:style});
							
			},
			_strToarr:function(pic_label){
				var dat=pic_label.split(",");
				if(dat){
					var j=0;
					var tenarr=[];
					for(var i=0;i<dat.length;i++){	
						if((i+1)%9!=0){
							tenarr.push(dat[i])	
						}else{	
							tenarr.push(dat[i])
							this.labels.push(tenarr);
							tenarr=[];
						}
					}
				}	
			},
			createLabel:function(_labels){
				for(var i=0;i<_labels.length;i++){	
					var direction=_labels[i][7];
					var image=this.drawImg(_labels[i]);
					this.drawgroup(_labels[i]);
					console.log($(image));
					image.node.setAttribute("url",_labels[i][8]);
					image.node.setAttribute("id","image"+i);
					$("#image"+i).on('click',function(){
						window.location.href=$(this).attr("url");
					});
					 //this.drawLine();
					 //this.drawText("text",0,0,"#fff");
				}
				
				
			},
			drawgroup:function(labeldetails){
				var startX,startY,endX,endY,txtWidth;
				var x=this.imgwidth*labeldetails[5];
				var y=this.imgheight*labeldetails[6];
				switch(labeldetails[7]){
					case "1"://左下
					{
						startX=x-8;
						startY=y+10;
						endX=x-12;
						endY=y+22;
						for(var i=0;i<5;i++){
							if(labeldetails[i]!=""){
								
								 //this.drawLine(ctx,endX,endY,endX-txtWidth-15,endY,'#ffffff');//画横线
								if(i==1){
								 		labeldetails[i]="￥"+ labeldetails[i];
								}
								txtWidth=labeldetails[i].length*14;
								 if(txtWidth>180){
								 	this.drawLine(startX,startY,endX,endY,endX-txtWidth+100,endY,"#ffffff");//画折线
								 }else{
								 	this.drawLine(startX,startY,endX,endY,endX-txtWidth,endY,"#ffffff");//画折线
								 }
								 if("1234".indexOf(i)>0){															 	
								 	console.log(txtWidth);
								 		this.drawText(labeldetails[i],startX-25,endY-10,"end","rgb(234,184,29)");	
								 }else{	
								 	console.log(txtWidth);
								 		this.drawText(labeldetails[i],startX-25,endY-10,"end","#ffffff");
								 }
								 
								 // this.drawLine(42,42,22,72,"#ffffff");
								 // this.drawText("hello",22+20,72-10);
								startX=endX;
								startY=endY;
								endX=endX-8;
								endY=endY+22;
							}
						}

					}
					break;
					case "2"://右下
					{
						startX=x+6;
						startY=y+8;
						endX=x+10;
						endY=y+22;
						for(var i=0;i<5;i++){
							if(labeldetails[i]!=""){
								if(i==1){
								 	labeldetails[i]="￥"+ labeldetails[i];
								}
								txtWidth=labeldetails[i].length*14;
								if(txtWidth>180){
									this.drawLine(startX,startY,endX,endY,endX+txtWidth-100,endY,"#ffffff");//画折线
								}else{
									this.drawLine(startX,startY,endX,endY,endX+txtWidth,endY,"#ffffff");//画折线
								}
								
								 //this.drawLine(endX,endY,endX+txtWidth+20,endY,'#ffffff');//画横线
								
								 if("1234".indexOf(i)>0){
								 
								 		this.drawText(labeldetails[i],startX+10,endY-10,"start","rgb(234,184,29)");
								 	
								 	console.log(txtWidth);
								 }else{
								 	
								 		this.drawText(labeldetails[i],startX+10,endY-10,"start","#ffffff");
								 	console.log(txtWidth);
								 }
								 // this.drawLine(ctx,42,42,22,72,"#ffffff");
								 // this.drawText("hello",22+20,72-10);
								startX=endX;
								startY=endY;
								endX=endX+8;
								endY=endY+22;
							}
						}
					}
					break;
					case "3"://右上
					{
						startX=x+4;
						startY=y-5;
						endX=x+8;
						endY=y-22;
						for(var i=0;i<5;i++){
							if(labeldetails[i]!=""){
								if(i==1){
								 		labeldetails[i]="￥"+ labeldetails[i];
								 }
								txtWidth=labeldetails[i].length*14;
								if(txtWidth>180){
									this.drawLine(startX,startY,endX,endY,endX+txtWidth-150,endY,"#ffffff");//画斜线
								}else{
									this.drawLine(startX,startY,endX,endY,endX+txtWidth,endY,"#ffffff");//画斜线
								}
								
								 //this.drawLine(endX,endY,endX+txtWidth+20,endY,'#ffffff');//画横线
								 
								 if("1234".indexOf(i)>0){
								 		this.drawText(labeldetails[i],startX+10,endY-10,"start","rgb(234,184,29)");
								 	console.log(txtWidth);
								 }else{
								 		this.drawText(labeldetails[i],startX+10,endY-10,"start","#ffffff");//画文字，水平负数向左，正数向右；垂直负数向上，正数向下
									
								 	console.log(txtWidth);
								 }
								 // this.drawLine(ctx,42,42,22,72,"#ffffff");
								 // this.drawText("hello",22+20,72-10);
								startX=endX;
								startY=endY;
								endX=endX+5;
								endY=endY-22;
							}
						}
					}
					break;
					case "4"://左上
					{
						startX=x-4;
						startY=y-5;
						endX=x-8;
						endY=y-22;
						for(var i=0;i<5;i++){
							if(labeldetails[i]!=""){
								 
								 if(i==1){
								 		labeldetails[i]="￥"+ labeldetails[i];
								 	}
								 txtWidth=labeldetails[i].length*14;
								 if(txtWidth>180){
								 	this.drawLine(startX,startY,endX,endY,endX-txtWidth,endY,"#ffffff");//画斜线
								 }else{
								 	this.drawLine(startX,startY,endX,endY,endX-txtWidth,endY,"#ffffff");//画斜线
								 }
								 
								 //this.drawLine(ctx,endX,endY,endX-txtWidth-20,endY,'#ffffff');//画横线
								 if("1234".indexOf(i)>0){
								 	console.log(txtWidth);
								 		this.drawText(labeldetails[i],startX-30,endY-10,"end","rgb(234,184,29)");
								 }else{ 	
								 	console.log(txtWidth);
								 		this.drawText(labeldetails[i],startX-30,endY-10,"end","#ffffff");
			
								 }
								 // this.drawLine(42,42,22,72,"#ffffff");
								 // this.drawText("hello",22+20,72-10);
								startX=endX;
								startY=endY;
								endX=endX-4;
								endY=endY-22;
							}
						}
					}
					break;
				}
			},
			drawLine:function(_startX,_startY,_redX,_redY,_endX,_endY){
				// var svg = Snap("#picSvg1");
				// var c = svg.paper.path("M10 10L90 90").attr({
				//     stroke: "#000",
				//     strokeWidth: 5	
				// });
				var polyline = draw.polyline([[_startX,_startY], [_redX,_redY], [_endX,_endY]]).fill('none').stroke({ width: 2 });
				polyline.attr({stroke:"#fff"});
			},
			drawText:function(_text,_posX,_posY,_auchor,_color){
				// var svg = Snap("#picSvg1");
				// var t1 = svg.paper.text(50, 50, "Snap");
				// var t2 = svg.paper.text(150, 50, ["S","n","a","p"]);
				// create text
		        var text = draw.text(_text).move(10+_posX, +_posY)
		        text.font({
		         size: 14
		        , anchor: _auchor
		        , leading: 1
		        })
		        text.attr({fill:_color});
			},
			drawImg:function(_label){
				var imgX=this.imgwidth*_label[5];
				var imgY=this.imgheight*_label[6];
				var image = draw.image('/web/assets/image/xuanzhuan.png', 26, 26).move(imgX-15,imgY-10);
				return image;
			},
			clickEvent:function(_url){	
					window.location.href=_url;
			}
			
	}
	// 绑定到jQuery对象中
	$.fn[name]=function(arg){
		var type = $.type(arg);
		//创建插件对象方法
		if(type==="object"){
			if(this.length && this.data(this,name)){
				var that=this;
				setTimeout(function(){instance = new addimgLabels(that, arg);},1000)//传入调用对象以及配置参数
				this.each(function(){//为元素绑定对象
					$.data(this,name,instance);
				});
				console.log(instance);
			}	
			return this;
		}
		//销毁插件对象方法
		if(type==="string" && arg==="destory"){
			instance.destory();
			this.each(function(){
				$.removeData(this,name);
			});
			return this;
		}
		
	}
	
})(jQuery,window,document);