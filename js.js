window.onload=function(){
	var timer=null;
	var oScore=document.getElementById('score');
	var oMain=document.getElementById('main');
	var oContainer=getByClass(oMain,'container')[0];
	var iSpeed=3;
	
	timer=setInterval(function(){
		var iTop=parseInt(getStyle(oContainer,'top'));
		
		if(iTop>=0){
			iTop=0;
		}else{
			iTop+=iSpeed;
		}
		oContainer.style.top=iTop+'px';

		if(iTop==0){
			var aRows = oContainer.childNodes;
			createRow();
			oContainer.style.top=-120+'px';
			drow();
			if( (aRows.length == 5) && (aRows[aRows.length-1].pass !== 1)) {
				fail();
			} 
		}
		
	},30);

	oMain.onclick=function(ev){
		if(ev.target.className.indexOf('black')!=-1){
			ev.target.className='block';
			ev.target.parentNode.pass = 1;
			score();
		}else{
			fail();
		}
	}

	function init(){
		for(var i=0;i<4;i++){
			createRow();
		}
	}

	//失败
	function fail(){
		clearInterval(timer);
		alert(oScore.innerHTML)
	}

	//得分
	function score(){
		var newScore=parseInt(oScore.innerHTML)+1;
		oScore.innerHTML=newScore;

		if(newScore%10==0){
			iSpeed++;
		}
	}

	//删除最后一行
	function drow(){
		var oContainer=getByClass(oMain,'container')[0];
		if(oContainer.childNodes.length == 6) {
    		oContainer.removeChild(oContainer.lastChild);
		}
	}

	//生成一行
	function createRow(){
		var oRow=document.createElement('div');
		oRow.className='row';

		var aClass=createBlock();
		for(var i=0;i<4;i++){
			var oBlock=document.createElement('div');
			oBlock.className=aClass[i];
			oRow.appendChild(oBlock);
		}
		if(oContainer.firstChild==null){
			oContainer.appendChild(oRow);
		}else{
			oContainer.insertBefore(oRow , oContainer.firstChild);
		}
	}

	init();
}


//生成黑白格子
function createBlock(){
	var arr=['block','block','block','block'];
	var i=Math.floor(Math.random()*4);

	arr[i]='block black';
	return arr;
}

//通过class获取元素
function getByClass(oPar,sclass){
	var aClass=oPar.getElementsByTagName('*');
	var iResult=[];

	for(var i=0;i<aClass.length;i++){
		if(aClass[i].className==sclass){
			iResult.push(aClass[i]);
		}
	}
	return iResult;
}

//获取元素的样式
function getStyle(obj,attr){
	if(obj.currentStyle)
		return obj.currentStyle[attr];
	else
		return getComputedStyle(obj,false)[attr];
}