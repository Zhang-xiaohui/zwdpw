(function(w){
// 空函数
function shield(){
	return false;
}
document.addEventListener('touchstart',shield,false);//取消浏览器的所有事件，使得active的样式在手机上正常生效
// document.oncontextmenu=shield;//屏蔽选择函数
// H5 plus事件处理
var ws=null,as='pop-in';
function plusReady(){
	ws=plus.webview.currentWebview();
	// Android处理返回键
	plus.key.addEventListener('backbutton',function(){
		back();
	},false);
	compatibleAdjust();
}
if(w.plus){
	plusReady();
}else{
	document.addEventListener('plusready',plusReady,false);
}
// DOMContentLoaded事件处理
// var domready=false;
// document.addEventListener('DOMContentLoaded',function(){
// 	domready=true;
// 	// gInit();
// 	document.body.onselectstart=shield;
// 	compatibleAdjust();
// },false);
// 处理返回事件
w.back=function(hide){
	if(w.plus){
		ws||(ws=plus.webview.currentWebview());
		if(hide||ws.preate){
			ws.hide('auto');
		}else{
			ws.close('auto');
		}
	}else if(history.length>1){
		history.back();
	}else{
		w.close();
	}
};
// 兼容性样式调整
var adjust=false;
function compatibleAdjust(){
	if(adjust||!w.plus||!domready){
		return;
	}	// iOS平台使用滚动的div
	if('iOS'==plus.os.name){
		var t=document.getElementById("dcontent");
		t&&(t.className="sdcontent");
		t=document.getElementById("content");
		t&&(t.className="scontent");
		//iOS8横竖屏切换div不更新滚动问题
		var lasto=window.orientation;
		window.addEventListener("orientationchange",function(){
			var nowo=window.orientation;
			if(lasto!=nowo&&(90==nowo||-90==nowo)){
				window.dcontent&&(0==dcontent.scrollTop)&&(dcontent.scrollTop=1);
				window.content&&(0==content.scrollTop)&&(content.scrollTop=1);
			}
			lasto=nowo;
		},false);
	}
	adjust=true;
};
})(window);


