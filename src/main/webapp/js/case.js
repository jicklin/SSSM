(function($) {

	//JSON,包含一些必要的参数,后面会把这个页面所选择的参数摆到这个对象中
	var selRowDataJSON 			= 			null;
	
	//String,获取列表的url
	var url						=			null;
	
	//对象,获取列表时前台传递到后台的参数
	var queryParams				=			{};
	
	//产生的一个随机数,用于$.get方法去除缓存
	var dt 						= 			MathRand();
	
	//JSON,符合easyui datagrid的JSON数据格式,若data不为null则直接显示data的数据
	var JSONData 				= 			JSONData ;
	
	//数组,需要删除的objid都在这个数组里面
	var deleteArr 				= 			[];
	
	//数组,工具栏
	var toolbarList 			= 			[];
	
	//数组,存放所有编辑器所在的行下标
	var editorIndexArr			=			[];
	
	//对象,列表本身的jquery对象
	var objList;
	
	//数组,搜索按钮的数组,包含每个搜索按钮必要的参数
	var searchBar;
	
	//String,搜索地址,有时候与上面url相同
	var searchUrl;
	
	//String,对应的对象的名称
	var objName;
	
	//数组,id名称
//	var fieldIdArr;
	
	//数组,包含列属性
	var columns;
	
	//String,模块中文名
	var CHname;
	
	//数组,流程处理器中需要用到的字段
	var fieldCaseArr;
	
	//编辑器验证
	var editorVail;
	
	var singleSelected = true;
	
	$.fn.extend({
		
		//针对流程处理的表格
		caseCusgrid : function( options ) {

			objList 		= 	$(this);
			CHname			=   options.CHname;
			objName 		= 	options.objName;
			columns 		= 	options.columns;
			selRowDataJSON 	= 	options.selRowDataJSON;
			fieldCaseArr	=	options.fieldCaseArr;
			editorVail		=	options.editorVail;
			
			var searchUrl	=	options.searchUrl;
			var toolsBtn	=	options.toolsBtn;
			var	toolsShow	=	false;
			var pagination	=	options.pagination;
			var url			=	options.url;
			var queryParams	=	options.queryParams;
			var searchRemember = options.searchRemember;
			var onCaseLoadSuccess = options.onCaseLoadSuccess;
			var fieldId = options.fieldId;
			var dialogUrl = options.dialogUrl;
			var dlgHeight = options.dlgHeight;
			var dlgWidth = options.dlgWidth;
			
			if( options.toolsShow ) {
				toolsShow = options.toolsShow;
			}
			//在下个页面在点击上一步的时候这个方法才会走
			selRowDataJSON = lastStep(selRowDataJSON);
			
			if( options.singleSelected != null && options.singleSelected != undefined ) {
				singleSelected = options.singleSelected;
			}
			
			objList.cusgrid({
				"fieldId":fieldId,
				"columns" : columns,
				"pagination" : pagination,
				"toolsShow"  : toolsShow,
				"JSONData"	: JSONData,
				"singleSelected":singleSelected,
				"searchUrl":searchUrl,
				"toolsBtn" : toolsBtn,
				"searchRemember": searchRemember,
				"url":url,
				"queryParams":queryParams,
				"dialogUrl" : dialogUrl,
				"dlgHeight" : dlgHeight,
				"dlgWidth"  : dlgWidth,
				"onDblclick" : function(data){},
				"onLoadSuccess" : function( data ) {
					/**
					 * 在修改案件的时候才会添加进数组,若新建案件则不走这步,
					 * 因为查询也走这个方法,所以只有第一次的时候给值,否则会有多余的值
					 */
		 				if( selRowDataJSON && selRowDataJSON.task.serialNO !=0 && deleteArr.length == 0 && data.rows ) {
							$.each(data.rows,function(index,item) {
								deleteArr.push(item[fieldCaseArr[0]]);
							});
						
		 				}
		 				if( onCaseLoadSuccess ) {
		 					onCaseLoadSuccess.call(this,data);
		 				}
				}
			});
			
		},
		
		/********************************************************************
		 * 
		 * @function 数据汇总,将传递过来的数据以表格的方式显示在页面上
		 */
		totaldata : function( options , formatter ) {
		
			//$(this).addClass("vertical-custable");
			
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
						$(this).append("<tr id='fieldRow"+key+index+"'></tr>");
						
						$("#fieldRow"+key+index).append("<td class='cusThead' rowspan='2'>选择的"+selrows["CHname"]+"</td>");
						//插入行,此行填充属性
						$(this).append("<tr id='propertyRow"+key+index+"'></tr>");
						//遍历选择的数据的每一个对象
						for (var selIndex in selrow) {
							
							var attrDesc = selrow[selIndex];
							if( !attrDesc.hidden ) {
								//插入单元格,填充字段名
								$("#fieldRow"+key+index).append("<td class='cusThead'>"+attrDesc.title+"</td>");
								//插入单元格,填充属性
								var value = attrDesc.value;
								//若属性存在于格式化对象中,则对值进行格式化
								if( attrDesc.field in formatter ) {
									value = formatter[attrDesc.field].call(this,attrDesc.value);
								}
								$("#propertyRow"+key+index).append("<td>"+value+"</td>");
							}
						
						}
					}
					
				}
			}
			
		},

		/*******************************************************************
		 * 
		 * @function 完成编辑
		 */
		finishDo : function(checkedDate) {
			
			var selrows = objList.cusgrid('getChecked');
			if( selrows == null && checkedDate ) {
				selrows = checkedDate;
			}
			//若没有选择数据,或者保存删除数据id的数组为空的时候,若为空进行删除则会报错
			if(selrows == null || selrows == "" || deleteArr.length<0) {
				
				$.cusalert({"title":"错误","content":"请选择修改数据!","type":"INFO"});
				
			} else {
				
				var addObj = selrows;
				var addObjName = "add" + firstToUpper(objName);
				var delObjName = "del" + firstToUpper(objName);
				var param = {
						'task':{
							'procID':selRowDataJSON.task.procID,
							'serialNO':selRowDataJSON.task.serialNO
						}
				};
				
				//定义为何类型, 相当于new,若不做new,下列操作为报找不到对象
				param[objName] = {};
				param[objName][addObjName] = [];
				param[objName][delObjName] = [];
				
				//遍历删除数组,删除对象
				for(var i =0;i<deleteArr.length;i++) {
					
					var del = {};
					
					del[fieldCaseArr[0]] = deleteArr[i];
					param[objName][delObjName].push(del);
				}
				
				//添加操作
				for(var i = 0;i<addObj.length;i++) {
					
					var add = {};
					
					for(var j in fieldCaseArr) {
						
						var fieldId = fieldCaseArr[j];
						add[fieldId] = addObj[i][fieldId];
					}
					
					param[objName][addObjName].push(add);
				}
				
				var jsonStr = JSON.stringify(param);
				
				//提交数据
				$.post('createAndChangeCase.action',{'jsonStr':jsonStr},function(data){
					
					if(data.success) {
						$.cusalert({"title":"成功","content":"修改成功,若还需修改请继续操作!","type":"SUCCESS"});
						return "doSuccess";
					} else {
						$.cusalert({"title":"错误","content":data.errorMsg,"type":"WARNING"});
					}
				});
			}
		},
		
		/********************************************************************
		 * 
		 * @function 保存代理人操作
		 */
		saveProxyer : function(owncasetype) {

					var selRowData = objList.cusgrid("getSelected");

					if (selRowData == null) {
						$.cusalert({"title":"错误","content":"请选择修改数据!","type":"INFO"});
					} else {
						var owners = selRowDataJSON.owners;
						var ownersid = owners[objName + "sid"];
						var proxyid = selRowData.ownersid;
						var casenum = selRowDataJSON.task.serialNO;
						var cerproxyid = selRowData.certificateid;
						var param = {
							"ownandcase.casenum" : casenum,
							"ownandcase.ownersid" : ownersid,
							"ownandcase.ownproxyid" : proxyid,
							"ownandcase.cerproxyid" : cerproxyid,
							"ownandcase.owncasetype" : owncasetype
						};
						$.post("updateProxyer.action", param, function(data) {
							var proxyer = data.data;
							$("#" + objName + "Proxy\\.ownname",
									window.parent.document).text(proxyer.ownname);
							$("#" + objName + "Proxy\\.ownphone",
									window.parent.document).text(proxyer.ownphone);
							window.top.show("操作成功!");
							window.parent.closeDialog();
							return "doSuccess";
						});
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
					
					objid[key]  = selrows.fieldCaseArr;
					
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
					window.top.show("创建案件成功!");
					window.top.closeDialog();
				} else {
					$.cusalert({title:"错误",content:data.errorMsg,type:"warning"});
				}
			});
		}
		
	});
	
	$.extend( {

		nextStep : function( options ) {

			var defaults = {
				"checkRule" : "",
				"datatype"  : "",
				"key" : "",
				"checkedDate":null
			};
			var settings = $.extend({},defaults,options);
			var checkRule = settings.checkRule;
			var datatype = settings.datatype;
			var key = settings.key;
			var checkedDate = settings.checkedDate;
			
			var selrows = objList.cusgrid('getChecked');
			if(selrows == null && checkedDate) {
				selrows = checkedDate;
			}
			var name = objName;

			if (selrows == null) {

				return selrows;

			} else {

				var objArr = [];
				var editorContent = {};

				//遍历选择的每一行数据
			for ( var i in selrows) {

				var selrow = selrows[i];
				var paramArr = [];

				//遍历此行数据对象
				for ( var selfield in selrow) {

					//遍历列属性数组
					for ( var j in columns) {

						var column = columns[j];

						/***
						 * 
						 * 若列属性的属性名 field 与此行对象的 filed 相同,
						 * 则把列属性的 title , 此行对象的 value 一起值构成对象  
						 */
						if (selfield == column.field) {
							var param = {};
							param.field = column.field;
							param.title = column.title;
							param.value = selrow[selfield];
							if( column.hidden ) {
								param.hidden = column.hidden;
							}

							//将拼凑好的数据对象摆入数组
							paramArr.push(param);

							//编辑器中的内容,格式化下后传递到页面,用户编辑器内容校验用的
							if (column.editor) {
								if (!editorContent[column.field]) {
									editorContent[column.field] = [];
								}
								editorContent[column.field]
										.push(selrow[selfield]);
							}
							//alert(JSON.stringify(paramArr));
							break;
						}
					}
				}
				//将数据对象的数组摆入数组中,这个参数最终将传递到下一个页面
				objArr.push(paramArr);
			}

			if ( editorVail ) {
				var result = runFunction(editorVail, editorContent);
				if (result) {
					return result;
				}
			}
			var searchValArr = [];
			for(var i in selrows) {
				searchValArr.push(selrows[i][key]);
			}
			/*$.post("checkRuleForCase.action",
					{"checkRule":checkRule,"datatype":datatype,
					 "searchValArr":JSON.stringify(searchValArr)},function(data) {
						 if(data.success) {
							 selRowDataJSON[name] = {};
								selRowDataJSON[name]["datadesc"] = objArr;
								selRowDataJSON[name]["CHname"] = CHname;
								//		selRowDataJSON[name]["fieldIdArr"] = fieldIdArr;
								selRowDataJSON[name]["fieldCaseArr"] = fieldCaseArr;
								onComplete.call(this,selRowDataJSON);
								//return JSON.stringify(selRowDataJSON);
						 } else {
							 return data.errorMsg;
						 }
			});*/
			var result;
			if(!checkRule||!datatype||!key) {
				checkRule = datatype = "";
				searchValArr = [];
			}
			$.ajax({ 
		        type: "POST", 
		        cache: false, 
		        data: {"checkRule":checkRule,"datatype":datatype,
					 "searchValArr":JSON.stringify(searchValArr)},
		        async: false, 
		        url: "checkRuleForCase.action", 
		        success: function(data) { 
						 if(data.success) {
							 selRowDataJSON[name] = {};
								selRowDataJSON[name]["datadesc"] = objArr;
								selRowDataJSON[name]["CHname"] = CHname;
								//		selRowDataJSON[name]["fieldIdArr"] = fieldIdArr;
								selRowDataJSON[name]["fieldCaseArr"] = fieldCaseArr;
								//onComplete.call(this,selRowDataJSON);
								result = JSON.stringify(selRowDataJSON);
						 } else {
							 result = data.errorMsg;
						 }
		        }, error: function(data) { 
		        	return "连接有误";
		        } 
		    });
			return result;
			}

		},
		
		/*******************************************************************
		 * 
		 * 
		 * @function 获取某个对象的某个值
		 * @param objKey type String 对象对应的key值
		 * 		  field type String 要获取的字段值
		 * @return value 返回值
		 */
		getValue : function ( dataJSON, objKey , field ) {
			               
			var obj = dataJSON[objKey];
			
			var objdesc = obj["datadesc"];

			var value;

			for(var oIndex in objdesc) {
				var _obj = objdesc[oIndex];
				for(var _oIndex in _obj) {
					if( _obj[_oIndex].field == field) {
						value = _obj[_oIndex].value;
					}
				}
			}
			
			return value;
		},
		
		/*******************************************************************
		 * 
		 * 
		 * @function 获取某个对象的某个值
		 * @param objKey type String 对象对应的key值
		 * 		  field type String 要获取的字段值
		 * @return value 返回值
		 */
		getValueArr : function ( dataJSON, objKey , field ) {
			               
			var obj = dataJSON[objKey];
			
			var objdesc = obj["datadesc"];

			var valueArr = [];

			for(var oIndex in objdesc) {
				var _obj = objdesc[oIndex];
				for(var _oIndex in _obj) {
					if( _obj[_oIndex].field == field) {
						valueArr.push( _obj[_oIndex].value);
					}
				}
			}
			
			return valueArr;
		}
	

	});
	
	/******************************************************************
	 * 私有方法
	 * 
	 * @desc 运行回调函数
	 * @param callback 回调函数 , arg0 回调函数的参数
	 */
	function runFunction(callback, arg0) {
		return callback(arg0);
	}
	
	/******************************************************************
	 * 私有方法
	 * 
	 * @desc 上一步
	 */
	function lastStep() {
		if ( selRowDataJSON && selRowDataJSON[objName] != undefined) {
			
			var dataArr = [];
	
			//获取参数中的数据描述数组
			var dataDesc = selRowDataJSON[objName]["datadesc"];
	
			//遍历数据描述数组
			for ( var index in dataDesc) {
	
				var dataDescItem = dataDesc[index];
	
				var dataObj = {};
	
				//遍历每一个属性的数据描述
				for ( var i in dataDescItem) {
	
					var attrDesc = dataDescItem[i];
	
					//构建成easyui datagrid 认识的JSON数据格式
					dataObj[attrDesc.field] = attrDesc.value;
				}
	
				dataArr.push(dataObj);
			}
			JSONData = dataArr;
			//alert(JSON.stringify(data));
	
			var name = objName;
	
			//删除此数据,用户会重新选择,否则会重复
			delete selRowDataJSON.name;
			return selRowDataJSON;
	
		} else {
			return selRowDataJSON;
		}
	}
	
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