var id2Name = {
			  	Set : function(key,value){this[key] = value;},     
			    Get : function(key){return this[key];},     
			    Contains : function(key){return this.Get(key) == null?false:true;},     
			    Remove : function(key){delete this[key];}   
			    };

function MathRand() 
{ 
	var Num=""; 
	for(var i=0;i<6;i++) 
	{ 
	Num+=Math.floor(Math.random()*10); 
	}
	return Num;
}

var localObj = window.location;
var contextPath = localObj.pathname.split("/")[1];
var basePath = localObj.protocol+"//"+localObj.host+"/"+contextPath;

function updateTheme(){
	//主题变更
	$("#swicth-style").attr("href",basePath + "/" + $("#swicth-style",window.top.document).attr("href"));
}

function backspace(evt){
	evt=evt?evt:window.event;
	if (evt.keyCode == 8 && evt.srcElement.tagName != "INPUT" && evt.srcElement.type != "text" && evt.srcElement.type != "textarea")
		evt.returnValue=false;
	if( evt.keyCode == 13 ) {
		if( $("#cusSubmit").length > 0 ) {
			$("#cusSubmit").trigger("click");
		}/* else if ( $("#searchBtn").length > 0 ) {
			$("#searchBtn").trigger("click");
		}*/
	}
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
    }

function getNowTime() {
	
	 var now = new Date();
       
       var year = now.getFullYear();       //年
       var month = now.getMonth() + 1;     //月
       var day = now.getDate();            //日
       
       var hh = now.getHours();            //时
       var mm = now.getMinutes();          //分
       var ss = now.getSeconds();           //秒
       
       var clock = year + "-";
       
       if(month < 10)
           clock += "0";
       
       clock += month + "-";
       
       if(day < 10)
           clock += "0";
           
       clock += day + " ";
       
       if(hh < 10)
           clock += "0";
           
       clock += hh + ":";
       if (mm < 10) clock += '0'; 
       clock += mm + ":"; 
        
       if (ss < 10) clock += '0'; 
       clock += ss; 
       return(clock); 
}

function formatDate(dtime){
	var time = dtime.replace("T"," ");
	return time;
	}

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
/*
function Map() {  
    this.elements = new Array();  
    //获取MAP元素个数  
    this.size = function() {  
        return this.elements.length;  
    };  
    //判断MAP是否为空  
    this.isEmpty = function() {  
        return (this.elements.length < 1);  
    };  
    //删除MAP所有元素  
    this.clear = function() {  
        this.elements = new Array();  
    };  
    //向MAP中增加元素（key, value)   
    this.put = function(_key, _value) {  
        this.elements.push( {  
            key : _key,  
            value : _value  
        });  
    };  
    //删除指定KEY的元素，成功返回True，失败返回False  
    this.remove = function(_key) {  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].key == _key) {  
                    this.elements.splice(i, 1);  
                    return true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    };  
    //获取指定KEY的元素值VALUE，失败返回NULL  
    this.get = function(_key) {  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].key == _key) {  
                    return this.elements[i].value;  
                }  
            }  
        } catch (e) {  
            return null;  
        }  
    };  
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL  
    this.element = function(_index) {  
        if (_index < 0 || _index >= this.elements.length) {  
            return null;  
        }  
        return this.elements[_index];  
    };  
    //判断MAP中是否含有指定KEY的元素  
    this.containsKey = function(_key) {  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].key == _key) {  
                    bln = true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    };  
    //判断MAP中是否含有指定VALUE的元素  
    this.containsValue = function(_value) {  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].value == _value) {  
                    bln = true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    };  
    //获取MAP中所有VALUE的数组（ARRAY）  
    this.values = function() {  
        var arr = new Array();  
        for (i = 0; i < this.elements.length; i++) {  
            arr.push(this.elements[i].value);  
        }  
        return arr;  
    };  
    //获取MAP中所有KEY的数组（ARRAY）  
    this.keys = function() {  
        var arr = new Array();  
        for (i = 0; i < this.elements.length; i++) {  
            arr.push(this.elements[i].key);  
        }  
        return arr;  
    };  
}  */