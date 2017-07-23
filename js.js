window.onload=function(){
	var timer=null;
	var oMain=document.getElementById('main');
	var oContainer=getByClass(oMain,'container')[0];
	
	timer=setInterval(function(){
		var iTop=parseInt(getStyle(oContainer,'top'));
		console.log(iTop);
		oContainer.style.top=iTop+ 1 +'px';
		console.log(iTop);
		if(iTop>=0){
			oContainer.style.top=-120+'px';
		}
		
	},30);

	function init(){
		for(var i=0;i<4;i++){
			createRow();
		}
	}

	function createRow(){
		var oRow=document.createElement('div');
		oRow.className='row';

		var aClass=createBlock();
		for(var i=0;i<4;i++){
			var oBlock=document.createElement('div');
			oBlock.className=aClass[i];
			oRow.appendChild(oBlock);
		}
		oContainer.appendChild(oRow);
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

function getStyle(obj,attr){
	if(obj.currentStyle)
		return obj.currentStyle[attr];
	else
		return getComputedStyle(obj,false)[attr];
}