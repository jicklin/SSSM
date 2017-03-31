window.onload = function(){
	var myTbodyRow = getElementsByClassName("tr","myTbodyRow");
	var myThead = getElementsByClassName("td","myThead");
	addEvent(myTbodyRow);
	for(var i in myThead){
		addEventTH(myThead[i]);
	}
	resize();
	myPage();
};

function getElementsByClassName(_tagName,_className){
	var classElements = [];
	var allElements = [];
	allElements = document.getElementsByTagName(_tagName);
	for(var i in allElements){
		if(allElements[i].className == _className){
			classElements.push(allElements[i]);
		}
	}
	return classElements;
}

function addEvent(elements){
	for(var i in elements){
		elements[i].onmouseover = function(){
			this.style.background="#EAF2FF";
		};
		elements[i].onmouseout = function(){
			this.style.background="#ffffff";
		};
	}
}

function addEventTH(element){
	element.onmouseover = function(){
		element.className = "myThead-hover";
	};
	element.onmouseout = function(){
		element.className = "myThead";
	};
}

function resize(){
	var tTD; //用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题 
	var table = getElementsByClassName("table","myTable")[0];
	for (j = 0; j < table.rows[0].cells.length; j++) {
	table.rows[0].cells[j].onmousedown = function () {
	//记录单元格
	tTD = this;
	if (event.offsetX > tTD.offsetWidth - 10) {
	tTD.mouseDown = true;
	tTD.oldX = event.x;
	tTD.oldWidth = tTD.offsetWidth;
	}
	//记录Table宽度
	//table = tTD; while (table.tagName != ‘TABLE’) table = table.parentElement;
	//tTD.tableWidth = table.offsetWidth;
	};
	table.rows[0].cells[j].onmouseup = function () {
	//结束宽度调整
	if (tTD == undefined) tTD = this;
	
	tTD.mouseDown = false;
	tTD.style.cursor = 'default';
	};
	table.rows[0].cells[j].onmousemove = function () {
	//更改鼠标样式
	if (event.offsetX > this.offsetWidth - 10)
	this.style.cursor = 'col-resize';
	else
	this.style.cursor = 'default';
	
	//取出暂存的Table Cell
	if (tTD == undefined) tTD = this;
	
	//调整宽度
	if (tTD.mouseDown != null && tTD.mouseDown == true) {
	tTD.style.cursor = 'default';
	if (tTD.oldWidth + (event.x - tTD.oldX)>0)
	tTD.width = tTD.oldWidth + (event.x - tTD.oldX);
	//调整列宽
	tTD.style.width = tTD.width;
	tTD.style.cursor = 'col-resize';
	//调整该列中的每个Cell
	table = tTD; while (table.tagName != 'TABLE') table = table.parentElement;
	for (j = 0; j < table.rows.length; j++) {
	table.rows[j].cells[tTD.cellIndex].width = tTD.width;
	}
	//调整整个表
	//table.width = tTD.tableWidth + (tTD.offsetWidth – tTD.oldWidth);
	//table.style.width = table.width;
	}
	};
	}
}

function myPage(){
	var firstPage = document.getElementById("firstPage");
	var prePage = document.getElementById("prePage");
	var nextPage = document.getElementById("nextPage");
	var lastPage = document.getElementById("lastPage");
	var selPageSize = document.getElementById("selPageSize");
	var pageSize = document.getElementById("pageSize").value;
	var pageInt = Number(document.getElementById("pageInt").value);
	var totalPage = Number(document.getElementById("totalPage").value);
	//alert(pageInt+1);
	for(var i=0;i<selPageSize.options.length;i++){
		if(selPageSize.options[i].text == pageSize){
			selPageSize.options[i].selected = true;  
			}
		//alert(selPageSize.options[i].value);
		}
	firstPage.onmouseover = function(){
		this.setAttribute("src","../images/firstPageHover.jpg");
		};
	firstPage.onmouseout = function(){
		this.setAttribute("src","../images/firstPage.jpg");
		}
	firstPage.onclick = function(){
		window.location.href="tableList.action?pageSize="+selPageSize.value+"&pageInt=0";
		}
	prePage.onmouseover = function(){
		this.setAttribute("src","../images/prePageHover.jpg");
		};
	prePage.onmouseout = function(){
		this.setAttribute("src","../images/prePage.jpg");
		}
	prePage.onclick = function(){
		if(pageInt==0){
			alert("已经是首页!");
		}else{
			window.location.href="tableList.action?pageSize="+selPageSize.value+"&pageInt="+(pageInt-1);
			}
		}
	nextPage.onmouseover = function(){
		this.setAttribute("src","../images/nextPageHover.jpg");
		};
	nextPage.onmouseout = function(){
		this.setAttribute("src","../images/nextPage.jpg");
		}
	nextPage.onclick = function(){
		if(pageInt+1==totalPage){
			alert("已经是末页!");
			}else{
			window.location.href="tableList.action?pageSize="+selPageSize.value+"&pageInt="+(pageInt+1);
			}
		}
	lastPage.onmouseover = function(){
		this.setAttribute("src","../images/lastPageHover.jpg");
		};
	lastPage.onmouseout = function(){
		this.setAttribute("src","../images/lastPage.jpg");
		}
	lastPage.onclick = function(){
		window.location.href="tableList.action?pageSize="+selPageSize.value+"&pageInt="+(totalPage-1);
		}
	selPageSize.onchange = function(){
		window.location.href="tableList.action?pageSize="+selPageSize.value;
		}
}