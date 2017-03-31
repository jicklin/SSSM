/***
 * 
 * @function 流程性业务的处理,包括单个向导式页面的显示,查询,数据下一步保存,上一步还原的功能,
 * 			 还有创建案件数据汇总的功能,还有办理案件时页面的显示以及数据修改保存的功能
 * @author hjj
 */
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
	var data 					= 			null ;
	
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
	
	//String,模块对应的模板类
	var model ;
	
	//数组,流程处理器中需要用到的字段
	var fieldCaseArr;
	
	
	$.fn.extend( {
		
		
		/*******************************************************************
		 * 
		 * @function 向导式单个页面的列表显示
		 */
		casedatagrid : function( options ) {
			
			//datagrid对应的列属性
			
			
			
			
			objList 		= 	$(this);
			CHname			=   options.CHname;
			objName 		= 	options.objName;
			columns 		= 	options.columns;
//			fieldIdArr 		= 	options.fieldIdArr;
			selRowDataJSON 	= 	options.selRowDataJSON;
			url				= 	options.url;
			queryParams		= 	options.queryParams;
			data 			= 	options.data;
			toolbarList 	= 	options.toolbarList;
			searchBar 		= 	options.searchBar;
			searchUrl 		= 	options.searchUrl;
			model			=	options.model;
			fieldCaseArr	=	options.fieldCaseArr;
			
			//在下个页面在点击上一步的时候这个方法才会走
			selRowDataJSON = lastStep(selRowDataJSON);
			
			
			/****************************************************************
			 * 
			 * 根据 data 和 queryParams 列出列表, 若 data 不为 null 的话,则根据 data
			 * 列出数据,若 data 为null 则根据 queryParams 列出数据
			 */
			objList.datagrid( {
				  border:false,
				  width:"100%",
				  height:"80%",
				  rownumbers:true,
				  singleSelect:true,
				  url:url,
				  queryParams:queryParams, 
				  data:data,
				  loadMsg:'<h7>正在加载中,请等待...</h7>',
				  method:'post',
				  singleSelect:false,
				  columns:columns,
			      toolbar: toolbarList,
			      pagination:false,
			      onLoadError:function(XMLHttpRequest) {
						  	alert(XMLHttpRequest.responseText.split("!!")[0]);
						  	objList.datagrid('loaded');
	  	 		  },
	  	 		  
	  	 		  //列表数据成功获取之后,会将获取到的数据的id摆入一个数组
		  	 	  onLoadSuccess:function(data) {
	  	 			  
	  	 			  	//在修改案件的时候才会添加进数组,若新建案件则不走这步
	  	 				if(selRowDataJSON.task.serialNO !=0) {
	  	 					
							$.each(data.rows,function(index,item) {
								deleteArr.push(item[fieldCaseArr[0]]);
							});
							
		  	 			}
	  			  },
	  			  
//	  			  onSelect:function(rowIndex, rowData){
//	  				  
//						clickRow(rowIndex,rowData);
//						
//	  			  },
	  			  
	  			  onCheck:function(rowIndex, rowData) {
	  				  
	  				  	clickRow(rowIndex,rowData);
	  				  
	  			  },
	  			  
	  			  onUncheck:function(rowIndex, rowData) {
	  				  
	  				  	unCheck(rowIndex);
	  				  
	  			  }
	  			  
//	  			  onUnselect:function(rowIndex, rowData) {
//	  				  
//	  				  //objList.datagrid('cancelEdit',rowIndex);
//	  				  
//	  				  //alert(editorIndexArr.length);
//	  				  
//	  			  }
	  			  
			  } );
			
			for(var i in searchBar) {
				var bar = searchBar[i];
				$("#"+bar.id).before("<span style='font-size:0.8em'>"+bar.text+":</span><input id='"+bar.inputId+"' type='text' style='width:10em;height:1.5em'/>");
			}
		},
	
		/*******************************************************************
		 * 
		 * 点击搜索按钮对应的方法,这个方法会根据传递进来的参数 searchBar 中的 searchAttr
		 * 进行条件查询
		 */
		searchFilter : function() {
			
			//遍历搜索按钮数组,把输入值赋值给对象对应的参数
			for(var i in searchBar) {
				var bar = searchBar[i];
				queryParams[model+"."+bar.searchAttr] = $("#"+bar.inputId).val();
			}
			
			
			
			if( searchUrl.indexOf("?") > -1 ) {
				
				searchUrl = searchUrl + "&dt=" + dt;
				
			} else {
				
				searchUrl = searchUrl + "?dt=" + dt;
				
			}
			
			//alert(searchUrl);
			
			objList.datagrid( { 
				url:searchUrl,
				queryParams:queryParams,
				
				
				/***********************************************************
				 * 
				 * 防止搜索之后列出的数据被添加到删除的数组中去,这里是覆盖上面 
				 * onLoadSuccess 方法
				 */
			    onLoadSuccess:function(){
		  		}
			} );
			
			
			/***************************************************************
			 * 
			 * 条件查询之后,按钮会消失,这里做重新的添加
			 */
			for(var i in searchBar) {
				var bar = searchBar[i];
				$("#"+bar.id).before("<span style='font-size:0.8em'>"+bar.text+":</span><input id='"+bar.inputId+"' type='text' style='width:10em;height:1.5em'/>");
			}
		},
		
		
		/********************************************************************
		 * 
		 * @function 下一步,供给父页面调用,把选择好的数据添加到 selRowDataJSON 中
		 */
		nextStep : function() {
			
			var selrows = objList.datagrid('getChecked');
			var name = objName;
			var _editorIndexArr = [];
			var _editorValArr;
			
			//获取所选行的行下标数组
			for(var i in selrows) {
				
				var _selrow = selrows[i];
				
				_editorIndexArr.push(objList.datagrid('getRowIndex',_selrow));
			}
			
			_editorValArr = getEditorValArr(_editorIndexArr);
			
			if(selrows == null || selrows == "") {
				
				return undefined;
				
			} else if( !$.fn.valiEditor( _editorValArr ) ) {
				
				return "";
				
			} else {
				
				
				var objArr = [];
				
				//遍历选择的每一行数据
				for(var i in selrows) {
					
					var selrow = selrows[i];
					
					var paramArr = [];
					
					var editorIndex = objList.datagrid('getRowIndex',selrow);
					
					ergodicEditor(editorIndex, selrow);
					
					
					
					//遍历此行数据对象
					for(var selfield in selrow) {
						
						//遍历列属性数组
						for(var j in columns[0]) {
							
							var column = columns[0][j];
							
							/***
							 * 
							 * 若列属性的属性名 field 与此行对象的 filed 相同,
							 * 则把列属性的 title , 此行对象的 value 一起值构成对象  
							 */
							if( selfield == column.field ) {
								var param  = {};
								param.field = column.field;
								param.title = column.title;
								param.value = selrow[selfield];
								
								//将拼凑好的数据对象摆入数组
								paramArr.push(param);
								
								//alert(JSON.stringify(paramArr));
								break;
							}
						}
					}
					//将数据对象的数组摆入数组中,这个参数最终将传递到下一个页面
					objArr.push(paramArr);
				}
				
				selRowDataJSON[name] = {};
				selRowDataJSON[name]["datadesc"] = objArr;
				selRowDataJSON[name]["CHname"] = CHname;
//				selRowDataJSON[name]["fieldIdArr"] = fieldIdArr;
				selRowDataJSON[name]["fieldCaseArr"] = fieldCaseArr;
				return JSON.stringify(selRowDataJSON);
			}
			
		},
		
		/*******************************************************************
		 * 
		 * @function 完成编辑
		 */
		finishDo : function() {
			
			var selrows = objList.datagrid('getChecked');
			
			var _editorIndexArr = [];
			
			var _editorValArr ;
			
			//获取所选行的行下标数组
			for(var i in selrows) {
				
				var _selrow = selrows[i];
				
				_editorIndexArr.push(objList.datagrid('getRowIndex',_selrow));
			}
			
			_editorValArr = getEditorValArr(_editorIndexArr);
			
			//若没有选择数据,或者保存删除数据id的数组为空的时候,若为空进行删除则会报错
			if(selrows == null || selrows == "" || deleteArr.length<0) {
				
				$.messager.alert("错误","请选择修改数据!","error");
				
			} else if( !$.fn.valiEditor( _editorValArr ) ) {
				
				return null;
				
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
					
					var _editorIndex = objList.datagrid('getRowIndex',addObj[i]);
					
					ergodicEditor(_editorIndex, addObj[i]);	
					
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
						
						$.messager.alert("成功","修改成功,若还需修改请继续操作!","success");
						return "doSuccess";
					} else {
						
						$.messager.alert("错误",data.errorMsg,"error");
					}
				});
			}
		},
		
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
						
						$("#fieldRow"+key+index).append("<td rowspan='2'>选择的"+selrows["CHname"]+"</td>");
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
					window.top.showMsg("创建案件成功!");
					window.top.closeTaskDialog();
				} else {
					$.messager.alert("错误",data.errorMsg,"error");
				}
			});
		},
		
		/********************************************************************
		 * 
		 * @function 保存代理人操作
		 */
		saveProxyer : function() {

					var selRowData = objList.datagrid("getSelected");

					if (selRowData == null) {
						$.messager.alert("错误", "请选择一条数据", "error");
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
							"ownandcase.cerproxyid" : cerproxyid
						};
						$.post("updateProxyer.action", param, function(data) {
							msg = "操作成功!";
							var proxyer = data.data;
							$("#" + objName + "Proxy\\.ownname",
									window.parent.document).text(proxyer.ownname);
							$("#" + objName + "Proxy\\.ownphone",
									window.parent.document).text(proxyer.ownphone);
							window.top.showMsg(msg);
							window.parent.closeDialog();
						});
					}
		},
			
		valiEditor : function () {
			/***
			 * 
			 * 没有编辑器的页面,在点击下一步或者完成编辑的时候走这个方法,
			 * 不做编辑器的验证,如果有编辑器的页面在各自的页面要重写这个方法,进行验证
			 */
			
			return true ;
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
		}
		
		
	} );
	
	
	/************************************************************************
	 * 私有方法
	 * 
	 * @function 点击上一步会将里面已经选择好的数据删除,并且把选择好的数据摆在 data 中,
	 * 			 然后显示在列表上
	 */
	function lastStep(selRowDataJSON) {
		
		if(selRowDataJSON[objName] != undefined) {
			
			var dataArr = [];
			
			//获取参数中的数据描述数组
			var dataDesc = selRowDataJSON[objName]["datadesc"];
			
			//遍历数据描述数组
			for(var index in dataDesc) {
				
				var dataDescItem = dataDesc[index];
				
				var dataObj  = {};
				
				//遍历每一个属性的数据描述
				for(var i in dataDescItem) {
					
					var attrDesc = dataDescItem[i];
					
					//构建成easyui datagrid 认识的JSON数据格式
					dataObj[attrDesc.field] = attrDesc.value;
				}
				
				dataArr.push(dataObj);
			}
			data = dataArr;
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
	
	/***********************************************************************
	 * 私有方法
	 * 
	 * @function 点击某行时候,将需要编辑的单元格显示成可编辑状态,开始编辑
	 * @param index Number 行下标 rowData JSONObject 行数据
	 */
	function clickRow(index,rowData){
		
		objList.datagrid('beginEdit',index);
		
		var editors = objList.datagrid('getEditors', index);
		
		//若有编辑器
		if( editors.length > 0 ) {
		
			editorIndexArr.push(index);
				
			
			//设置默认值
			for(var eIndex in editors) {
				
				var editorObj = editors[eIndex];
				
				var type = editorObj.type;
				
				var field = editorObj.field;
				
				var editor = objList.datagrid('getEditor', {index : index, field : field});
				
				//若没有值则给默认值
				if( type == "combobox" && $(editor.target)[type]("getValue") == "") {
					
					$(editor.target)[type]("select",1);
				
				}
				
				//若没有值则给默认值
				if( type == "numberbox" && $(editor.target)[type]("getValue") == "") {
					
					$(editor.target)[type]("setValue",100);
					
				}
			}
			
			//有编辑器并且没有'放弃编辑'按钮
			if( $("#cancelEditBar").length ==0 ) {
				
				//获取最后一个查询按钮
				var barParam = searchBar[searchBar.length-1];
				
				var lastBar = $("#"+barParam.id);
				
				//在最后一个查询按钮后面添加一个easyui的按钮
				lastBar.after("<a href='javascript:void(0);' id = 'cancelEditBar'></a>");
				
				$("#cancelEditBar").linkbutton({
					text	: '放弃编辑',
					plain	: true,
					size	: 'small',
					iconAlign: 'right'
				});
				
				//放弃编辑操作
				$("#cancelEditBar").click(function() {
					
					/***
					 * 
					 * 取消所选择的行,因为每次点击编辑都会选择一行,
					 * 放弃编辑之后,同时取消此行的选择特效,
					 * 防止下次再选择此行时与编辑器的特效不协调,纯粹是为了用户体验
					 */
					objList.datagrid('clearChecked');
					
					//遍历所有编辑器所在的行
					for(var eIndex in editorIndexArr) {
						
						//所有编辑器放弃编辑,
						objList.datagrid('cancelEdit',editorIndexArr[eIndex]);
						
					}
					
					//删除'放弃编辑'按钮
					$("#cancelEditBar").remove();
					
					//数组清空
					editorIndexArr = [];
					
				});
			}
		}
	}
	
	/***************************************************************************
	 * 私有方法
	 * 
	 * @function 编辑器随着所在行取消勾选对应的操作
	 * @param rowIndex
	 *            type Number 取消勾选的所在行
	 */
	function unCheck(rowIndex) {
		// alert(rowIndex);

		var delEditIndexArr = [];

		for ( var eIndex in editorIndexArr) {

			var editorIndex = editorIndexArr[eIndex];

			// 若本行有编辑器
			if (editorIndex == rowIndex) {
				// alert(editorIndex);
				// 此行放弃编辑
				objList.datagrid('cancelEdit', rowIndex);

				delEditIndexArr.push(eIndex);

			}

		}

		for ( var dIndex in delEditIndexArr) {

			// 编辑器数组中删除这一行的编辑器下标
			editorIndexArr.splice(delEditIndexArr[dIndex], 1);
		}

		// 若没有编辑器了,则把放弃编辑按钮删除
		if (editorIndexArr.length == 0 && $("#cancelEditBar").length > 0) {

			$("#cancelEditBar").remove();

		}

	}
	
	/***************************************************************************
	 * 私有方法
	 * 
	 * @function 遍历编辑器,把编辑的值传递给选择的数据对象
	 * @param _editorRow
	 *            编辑所在行, _selrow 数据对象
	 */
	function ergodicEditor( _editorRow, _selrow) {
		
		var editors = objList.datagrid('getEditors', _editorRow);
		
		//遍历此行编辑器
		for(var eIndex in editors) {
			
			//获取字段名对应的编辑器
			var editor = objList.datagrid('getEditor', {index : _editorRow, field : editors[eIndex].field});
			
			var editType = editors[eIndex].type;
			
			if( editor ) {
				
				//获取编辑器目标对象
				var target = editor.target;
//					alert($(target)[editType]('getValue'));
				
				//把编辑器的值传递给selrow,对号入座
				_selrow[editors[eIndex].field] = $(target)[editType]('getValue');
			}
			
		}
	}
	
	/***********************************************************************
	 * 私有方法
	 * 
	 * @function 获取编辑器的值
	 * @param _editorRowNumArr type 数组 包含每个编辑器所在行
	 * @return returnArr 返回数组
	 */
	function getEditorValArr( _editorRowNumArr ) {
		
		//返回数组
		var returnArr = [];
		
		//遍历编辑器所在行数组
		for(var _eIndex in _editorRowNumArr) {
			
			var rowNum = _editorRowNumArr[_eIndex];
			
			//根据所在行获取此行所有的编辑器
			var editors = objList.datagrid('getEditors', rowNum);
			
			//添加进returnArr的对象,数据结构:{field:value}
			var returnObj = {};
			
			//判断对象是否有属性的标记
			var hasProp = false;
		
			//遍历此行编辑器
			for(var eIndex in editors) {
				
				var editorObj = editors[eIndex];
				
				//编辑器类型
				var editType = editorObj.type;
				
				//编辑器字段
				var editField = editorObj.field;
				
				//获取字段名对应的编辑器
				var editor = objList.datagrid('getEditor', {index : rowNum, field : editField});
			
				if( editor ) {
					
					//获取编辑器目标对象
					var target = editor.target;
					
					var editorVal = $(target)[editType]('getValue');
					
					returnObj[editField] = editorVal;
					
				}
				
			}
			
			//判断是否有属性
			for(var _rIndex in returnObj) {
				
				hasProp = true;
				break;
				
			}
			
			if( hasProp ) {
				
				returnArr.push(returnObj);
				
			}
		}
		
		return returnArr;
	}
	
})(jQuery);