/***
 * 
 * @function 数据汇总
 * @author hjj
 */
(function($) {
	
$.fn.extend( {
	
	/********************************************************************
	 * 
	 * @function 数据汇总,将传递过来的数据以表格的方式显示在页面上
	 */
	totaldata : function( options ) {
	
		//汇总的数据
		var selRowDataJSON         =         options;
		
		//遍历传递过来的JSON对象参数
		for(var key in selRowDataJSON) {
			
			//若不是 task 和 pathArr , 剩下的都是选择好的数据对象
			if(key != "task" && key != "pathArr") {
				
				var selrows = selRowDataJSON[key];
				
				//遍历选择的数据
				for (var index in selrows["datadesc"]) {
					
					var selrow = selrows["datadesc"][index];
					//插入行,此行填充字段名
					$(this).append("<tr style='background:#EAF2D3;font-size:13px;' id='fieldRow"+key+index+"'></tr>");
					//插入行,此行填充属性
					$(this).append("<tr style='background:#EFF3FB;font-size:13px;' id='propertyRow"+key+index+"'></tr>");
					
					//遍历选择的数据的每一个对象
					for (var selIndex in selrow) {
						
						var attrDesc = selrow[selIndex];
						
						//插入单元格,填充字段名
						$("#fieldRow"+key+index).append("<td>"+attrDesc.title+"</td>");
						//插入单元格,填充属性
						$("#propertyRow"+key+index).append("<td>"+attrDesc.value+"</td>");
					
					}
				}
				
			}
		}
		
	},

	/**********************************************************************
	 * 
	 * @function 创建完成时,提交数据,这个是每个汇总页面必须要提供的
	 */
	finishCreate : function( options ) {
		
		//汇总的数据
		var selRowDataJSON         =         options;
		
		//type 数组,包含对象的名称
		var objNameArr             =         [];
		
		//type 对象,通过objName获取对应的id名称
		var objid              	   =         {};
		
		//type 数组,包含添加的对象名称
		var objAddArr              =         [];
		
		//遍历传递过来的JSON对象参数
		for(var key in selRowDataJSON) {
			
			//若不是 task 和 pathArr , 剩下的都是选择好的数据对象
			if(key != "task" && key != "pathArr") {
				
				var selrows = selRowDataJSON[key];
				
				objNameArr.push(key);
				
				objid[key]  = selrows.fieldIdArr;
				
				objAddArr.push("add"+firstToUpper(key));
				
			}
		}
		
		
		//最后传递的参数JSON格式
		var param = {
				'task':{
						'procID':selRowDataJSON.task.procID,
						'serialNO':selRowDataJSON.task.serialNO
					}
				};
		
		//遍历名称数组
		for(var i in objNameArr) {
			
			//对象的名称
			var objName         =	objNameArr[i];
			
			//添加的对象的名称
			var objAdd          =	objAddArr[i];
			
			//获取选择的数据的JSON格式
			var objArr          =   selRowDataJSON[objName]["datadesc"];
			
			//获取对应的id名称
			var objidArr        =	objid[objName];
			
			param[objName] 		=	{};
			var objectp 		=	param[objName];
			var tempArr 		=	[];
			
			//选择了多个相同的obj
			for(var j in objArr) {
				
				var paramObj ={};
				
				//获取单条数据的JSON
				var obj = objArr[j];
				var objidItem = "";
				
				//若有多个id的存在 ===>联合id
				if(objidArr.length > 1) {
					
					//遍历联合id数组
					for(var s in objidArr) {
						objidItem = objidArr[s];
						
						//遍历参数描述对象数组
						for(var m in obj) {
							
							var attrDesc = obj[m];
							
							//如果参数描述对象中的 field 与联合id之一对应上,则添加id数据
							if( attrDesc.field == objidItem) {
								paramObj[objidItem] = attrDesc.value;
								//alert(JSON.stringify(paramObj));
								break;
							}
						}
					}
				} else {
					objidItem = objidArr[0];
					
					//遍历参数描述对象数组
					for(var m in obj) {
						
						var attrDesc = obj[m];
						
						//如果参数描述对象中的 field 与联合id之一对应上,则添加id数据
						if( attrDesc.field == objidItem) {
							paramObj[objidItem] = attrDesc.value;
							//alert(JSON.stringify(paramObj));
							break;
						}
					}
				}
				
				//添加进param对象,作为最后的参数传递
				tempArr.push(paramObj);
				objectp[objAdd] = tempArr;
				//alert(JSON.stringify(objectp));
			}
		}
		
		var jsonStr = JSON.stringify(param);
		
		//提交数据
		$.post('createAndChangeCase.action',{'jsonStr':jsonStr},function(data){
			if(data.success) {
				window.top.showMsg("创建案件成功!");
				window.top.closeTaskDialog();
			} else {
				$.messager.alert("错误",data.errorMsg,"error");
			}
		});
	}
	
} ); 

	/***********************************************************************
	 * 私有方法
	 * 
	 * @function 将字符串第一个字母大写
	 */
	function firstToUpper(str) {
		
		var char = str.substring(0,1);
		
		char = char.toUpperCase();
		var result = char + str.substring(1,str.length);
		
		return result;
	}

})(jQuery);