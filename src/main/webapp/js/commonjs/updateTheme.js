function updateTheme(){
	//主题变更
	var localObj = window.location;
	var contextPath = localObj.pathname.split("/")[1];
	var basePath = localObj.protocol+"//"+localObj.host+"/"+contextPath;
	$("#swicth-style").attr("href",basePath + "/" + $("#swicth-style",window.top.document).attr("href"));
}