/***
 * 
 * @function 根据class自动填充多条数据
 * @author sjw
 */
jQuery.extend( {
	/************************************************************************
	 * 
	 * @function 时间格式化,如此用便于外部能够重写这个方法,不同页面的时间格式化不同
	 */
	formatDate : function (dtime) {
		if (dtime) {
			var time = dtime.replace("T", " ");
			return time;
		}
		return dtime;
	},
	formatDate2 : function (dtime) {
		if (dtime) {
			var time = dtime.split("T")[0];
			return time;
		}
		return dtime;
	},
	/************************************************************************
	 * 
	 * @function 自动填充数据
	 * @tip 如果页面存在第obj_index个这样的class标签则赋值
	 */
	autofill2 : function(itemObj,obj_index) {
		//alert(JSON.stringify(itemObj));
		//信息状态为1的记录可以修改
		//var info_readonly = true;
		//if(itemObj.casenum == serialNO)//对象的案件号为本案件案件编号则可以编辑修改
			//info_readonly = false;
		for ( var itemkey in itemObj ) {
			var JQObj = null;
			var classStr = "";
			if ( $("."+itemkey + ":eq(" + obj_index + ")").length > 0 ) {//筛选第obj_index个class名为itemkey的元素
				classStr = "."+itemkey + ":eq(" + obj_index + ")";
			}
			if ( classStr != "" ) {
				JQObj = $(classStr);
				//if(!info_readonly)//可编辑的需要提交，添加submitData class，提交时直接获取有submitData class的元素值
					//JQObj.addClass("submitData");
				//JQObj.addClass("submitData" + obj_index);
				var value = itemObj[itemkey];
//				alert(IDStr + "=" + value);
				//若为时间,对时间进行格式化
				if(value){
					if (JQObj.hasClass("date")) {
						value = $.formatDate(value);
					}
					if (JQObj.hasClass("date2")) {
						value = $.formatDate2(value);
					}
					if ( JQObj.is("span")) {
						JQObj.text(value);
					}else{
						JQObj.val(value);
					}
				}
			}
		}
	}
});