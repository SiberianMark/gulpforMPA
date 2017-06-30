// JavaScript Document

function ING()
{
var imgNum=0;///第几张
var imgWidth=document.getElementById("listBOX").offsetWidth;///图片宽度  动态获得
var boxOffset=0;////盒子的偏移
var istartTouch=0;////用于记录当前点击时的x位置
var istartx=0;////记录当前位置
var listBOX=document.getElementById("listBOX");
var olist=document.getElementById("listSroll");
var oolist=document.getElementById("oo").children;

auto()

function auto()
{
	 roll=setInterval(function(){
	 imgNum++;
	 imgNum=imgNum%oolist.length;
	 tab()
	 },3000);
}
function tab()
{
	 imgWidth=document.getElementById("listBOX").offsetWidth;
	 boxOffset=-imgWidth*imgNum;
	/* console.log(imgNum+" "+imgWidth+" "+boxOffset);*/
	 olist.style.transition="0.5s";
	 olist.style.WebkitTransform=olist.style.transform="translateX(" + boxOffset + "px)";
	 for(i=0;i<oolist.length;i++)
	 {
		removeClass(oolist[i],"active"); 
	 }
	 addClass(oolist[imgNum],"active");
}

///////////////////////////////////////////////////////////////////////////////////
function fnStart(ev)
{	
 	 ev=ev.changedTouches[0];////手指列表
	 istartTouch=ev.pageX;
	 istartx=boxOffset;////记录当前位置
	 clearInterval(roll);
}
function fnMove(ev)
 {
	 olist.style.transition='none';
	 ev=ev.changedTouches[0];
	 var idis=ev.pageX-istartTouch;///手指的移动距离
	 ///console.log(idis)
	 ////console.log(" idis:"+idis+" ev.pageX:"+ev.pageX+" istartTouch:"+istartTouch);
	 boxOffset=istartx+idis;
	 olist.style.WebkitTransform=olist.style.transform="translateX(" + boxOffset + "px)";
	
 }
function fnEnd()
{	
	var imgNum2=boxOffset/imgWidth;
	imgNum2=-Math.round(imgNum2);
	/////////////////////////////////////逻辑
	if(imgNum==imgNum2)
	{
	var w=boxOffset+(imgNum2*imgWidth);
		if(w>imgWidth*0.2)
		{
			imgNum--;
			if(imgNum<0)imgNum=0
			if(imgNum>oolist.length-1)imgNum=oolist.length-1;
			tab()
		}
		if(w<-imgWidth*0.2)
		{
			imgNum++;
			if(imgNum<0)imgNum=0
			if(imgNum>oolist.length-1)imgNum=oolist.length-1;
			tab()
		}
		if(imgWidth*0.2>w>-imgWidth*0.2)
		{
			tab();
		}
	}
	else
	{
	imgNum=imgNum2;
	if(imgNum<0)imgNum=0
	if(imgNum>oolist.length-1)imgNum=oolist.length-1;
	///console.log(inow);
	tab()
	}
	auto();
}




///////////////////////////////////////////////////////////////////////////////////
bind(listBOX,"touchstart",fnStart);///绑定的目标 绑定事件 绑定函数
bind(listBOX,"touchmove",fnMove);
bind(listBOX,"touchend",fnEnd);

bind(listBOX,"touchmove",function(ev){ev.preventDefault();});
///////////////////////////////////////////////////////////////////////////////////
function bind(obj, ev, fn) { 
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');/////split(' ')意思是将一段句子以" "空格为标记 分成数组
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}
}