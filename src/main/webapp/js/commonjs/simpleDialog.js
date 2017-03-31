
function loadBusDict(callback,sortArr){
	//alert(sortArr);
	var selectEleCount = $(".select").length;
	$(".select").each(function(index,item) {
		$.get("getSudictListByCodeNo.action?dt=" + MathRand(),{selectId:$(item).attr("id")},function(data) {
			if(data.success) {
				//alert(JSON.stringify(data.data));
				var options = data.data;//字典表数据
				if(sortArr && sortArr.length > 0){//排序参数
					for ( var i = 0; i < sortArr.length; i++) {
						if(sortArr[i].name==$(item).attr("id")){
							var sortCodenoArr = sortArr[i].sortStr.split(",");//排序说明
							for ( var j = 0; j < sortCodenoArr.length; j++) {//开始排序
								for ( var m = 0; m < options.length; m++) {//遍历字典表
									if (options[m].codeno.indexOf(sortCodenoArr[j]) == 0) {
										$(item).append("<option value='"+ options[m].codename +"'>" + options[m].codename + "</option>");
										options.splice(m,1);
										m--;
									}
								}
							}
						}
					}
				}
				for(var oIndex in options) {
					var option = options[oIndex];
					$(item).append("<option value='"+ option.codename +"'>" + option.codename + "</option>");
				}
			}
			selectEleCount--;
			if (selectEleCount == 0) 
				callback.call();
		});
	});
}

function setDefaultOption(){
	$("select").each(function(index,item) {
		//alert($(item).children("option:selected").length);
		if ($(item).children("option").length > 0 && $(item).children("option:selected").length == 0) {
			//alert($(item).children("option:first").val());
			//$(item).children("option:first").attr('selected', true);//选中第一项,无效
			$(item).val($(item).children("option:first").val());//选中第一项
		}
	});
}

function getExtravalis(){
	var extravali =[];

	var dostateVali = {
		"selector" : "checkdostate",
		"message" : "该不动产正在办件！\n",
		"handle" : function(value) {
					return value==1;
					}
	};
	extravali.push( dostateVali );
	var prostateVali = {
			"selector" : "checkprostate",
			"message" : "该不动产已发证！\n",
			"handle" : function(value) {
						return value>0;
						}
	};
	extravali.push( prostateVali );
	return extravali;
}

function setElementsWidth(){
	$("select").filter(".fields").css("width","90%");
	//$("select").filter(".fields").css("border","0");
	$("input").filter(".fields").css("width","90%");
}

function setState(data,name) {
	if(!data[name] || data[name] == 0) {
		$("."+name).val(0);
	} else {
		$("."+name).val(1);
		$("#"+name).css("display","");
		$("#"+name).text(data[name]);
	}
}

function setState1(data,name) {
	if(!data[name] || data[name] == 0) {
		$("#"+name).val(0);
	} else {
		$("#"+name).val(1);
	}
}