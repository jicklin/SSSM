/**
 * @author HJJ
 * @function js框架,包含一些可能常用的到的函数方法,如ajax等
 */
var myFrame = (function() {

	/**
	 * @function 声明函数
	 */
	var myFrame = function() {
	};

	/***************************************************************************
	 * @function Inner ID selector
	 * @id ID
	 */
	var $ = function(id) {
		return typeof id == "object" ? id : document.getElementById(id);
	};

	/***************************************************************************
	 * @function Outter ID selector
	 * @id ID
	 */
	myFrame.$ = function(id) {
		return $(id);
	};

	/***************************************************************************
	 * @function Get param in URL
	 * @param name
	 *            参数名 type String
	 */
	myFrame.getQueryString = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	};

	/***************************************************************************
	 * @function ajax
	 * @param method
	 *            传递方式 type String url 路径 type String function_success 成功后回调函数
	 *            type function data 传递数据 type Object
	 */

	myFrame.ajax = function(_method, _url, _function_success, _data) {
		var XMLHttpReq;
		var param = "";

		if (_data) {
			_method = "POST";
		}

		/***********************************************************************
		 * @function 传递参数的转换
		 */
		if (typeof _data == "String") {
			param = _data;
		} else {
			for ( var i in _data) {
				param != "" ? param = param + "&" + i + "=" + _data[i]
						: param = param + i + "=" + _data[i];
			}
		}

		createXMLHttpRequest(); // 创建XMLHttpRequest对象
		XMLHttpReq
				.open(_method, encodeURI(encodeURI(_url + "?" + param)), true);
		// 若要用send传递数据 必须设置此连接头
		/*
		 * XMLHttpReq.setRequestHeader("Content-Type",
		 * "application/x-www-form-urlencoded");
		 */
		XMLHttpReq.onreadystatechange = processResponse; // 指定响应函数
		XMLHttpReq.send();

		function createXMLHttpRequest() {
			try {
				XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP");// IE高版本创建XMLHTTP
			} catch (E) {
				try {
					XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");// IE低版本创建XMLHTTP
				} catch (E) {
					XMLHttpReq = new XMLHttpRequest();// 兼容非IE浏览器，直接创建XMLHTTP对象
				}
			}

		}
		// 回调函数
		function processResponse() {
			if (XMLHttpReq.readyState == 4) {
				if (XMLHttpReq.status == 200) {
					var text = XMLHttpReq.responseText;
					_function_success(text);
				}
				if (XMLHttpReq.status == 404) {
					var text = XMLHttpReq.responseText;
					alert(text);
				}
			}

		}
	};

	/***************************************************************************
	 * @function 循环遍历
	 * @param _object
	 *            循环值 _function 循环体
	 */
	myFrame.each = function(_object, _function) {
		for ( var i in _object) {
			_function(i, _object[i])
		}
	};

	return myFrame;
})();