/**
 * @function 根据不同的数据,基于easyui 的datagrid,列出列表
 * @author hjj 
 */
(function($) {
	
	//选择的数据
	var selRowData			=			null;
	//删除数据的url
	var deleteUrl;
	//添加页面
	var addPage;
	//修改页面
	var editPage;
	//id名称
	var fieldId;
	//工具栏
	var toolbar				=			 [];
	//列表本身的jquery对象
	var objList;
	
	/***********************************************************************
	 * 
	 * @function 修改操作
	 */
	function editObj(){
		
		//获取选择的数据
		selRowData			=			 objList.datagrid("getSelected");
		
		//若为空,则提示
		if(selRowData == null) {
			
			$.messager.alert("错误","请选择一条数据","error");
			
		} else {//否则,弹出对话框进行编辑
			
			$("#objDialog").dialog({
				title:'修改信息',
				width:800,
				height:400,
				content:"<iframe src='"+encodeURI(encodeURI(editPage+"?AUTHID="+$("#authID").val()/*+"&selRowDataStr="+selRowDataStr*/ + "&objid=" + selRowData[fieldId] ))+"' width='100%' height='100%' frameborder='0' scrolling='auto'></iframe>",
				modal:true,
				resizable:true
				
			});
		}
	}
	
	//页面操作权限校验,判断父页面是否有获取权限标志的函数
	if("getOpAuth" in window.parent) {
		
		//获取权限的表示
	    var opAuth = window.parent.getOpAuth();
	    
	    //设置创建权限的二进制码
	    var CREATE = 1 << 0;
	    
	    //设置读写权限的二进制码
		var WRITE = 1 << 1;
		
		//设置删除权限的二进制码
		var DELETE = 1 << 2;
	
		//与操作判断,若有创建权限,则显示创建按钮
		if(opAuth & CREATE) {
			if(toolbar.length > 0) {
				toolbar.push("-");
			}
			toolbar.push({
		  		iconCls: 'icon-add',
				text:'添加',
				handler: function(){addObj();}
			});
		}
	
		//与操作判断,若有修改权限,则显示修改按钮
		if(opAuth & WRITE) {
			if(toolbar.length > 0) {
				toolbar.push("-");
			}
			toolbar.push({
				iconCls: 'icon-edit',
				text:'修改',
				handler: function(){$.fn.editObj();}
	    	});
		} else {//若没有,则没有修改操作
			editObj = function() {};
		}
	
		//与操作判断,若有删除权限,则显示删除按钮
		if(opAuth & DELETE) {
			if(toolbar.length > 0) {
				toolbar.push("-");
			}
			toolbar.push({
				iconCls: 'icon-remove',
				text:'删除',
				handler: function(){delObj();}
			});
		}
	 } 
		
	$.fn.extend( {
		
		/*******************************************************************
		 * 
		 * @function 列表页面根据参数的不同,自动显示功能
		 */
		mydatagrid : function(options) {
			
			  //获取父页面传递过来AUTHID
			  var authid = getQueryString("AUTHID");
			
			  //页面上添加一个对话框的div
			  $(document.body).append("<div id='objDialog'></div>");
			
			  //页面添加一个存储AUTHID的隐藏input,方便传递给对话框
			  $(document.body).append("<input id='authID' type='hidden' value='"+authid+"'></input>");
			
			  //设置easyui空间的提示语言
			  $.messager.defaults = { ok: "是", cancel: "否" };
			  
			  //获取列表数据的url
			  var url = options.url;
			  
			  //数组,easyui datagrid 的数据格式
			  var columns = options.columns;
			  
			  //选择过滤按钮的一些参数
			  var selBarOptions;
			  
			  //把对象本身的jquery对象赋值
			  objList = $(this);
			  
			  
			  if( options.selBarOptions != undefined && options.selBarOptions !=null) {
				  selBarOptions = options.selBarOptions;
				   addToolBar({
						iconCls: 'icon-search',
						id:'selectBar',
						handler: function(){searchFilter();}
					});
				  } else {
					  selBarOptions = {};
				  }
			  
			  addPage = options.addPage;
			  editPage = options.editPage;
			  fieldId = options.fieldId;
			  deleteUrl = options.deleteUrl;
			  
			  //easyui datagrid方法
			  objList.datagrid({
				  border:false,
				  width:"100%",
				  height:"96%",
				  rownumbers:true,
				  singleSelect:true,
				  loadMsg:'<h7>正在加载中,请等待...</h7>',
				  url:url,
				  method:'post',
				  columns:columns,
		          toolbar: toolbar,
		          pagination:true,
		          pageSize: 20,
		          pageList: [20,50,100],
		          onLoadError:function(XMLHttpRequest){
						  	alert(XMLHttpRequest.responseText.split("!!")[0]);
						  	objList.datagrid('loaded');
				  			//selRowData = null;
				  	 		},
			 	  onDblClickRow:function(rowIndex, rowData){
				  	 		$.fn.editObj();
			  	 			}
				  });
			  
			  var p = objList.datagrid("getPager");
			  
			  $(p).pagination({  
			      beforePageText: '第',  
			      afterPageText: '页    共 {pages} 页',  
			      displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
			  }); 
	
			  $('#selectBar').before("<select id='selectVal'></select><input id='inputVal' type='text' />");
					  				  
			  for(var i in selBarOptions) {
				  $("#selectVal").append("<option value='"+selBarOptions[i].value+"'>"+selBarOptions[i].text+"</option>");
			  }
			  
			  //若选择过滤按钮发生改变,则数据刷新
			  $('#selectVal').change(function() {
					if($('#selectVal').val() == 'all'){
						$('#inputVal').attr("value","");
						//过滤参数传递null值过去,查询所有数据
						objList.datagrid('load',{});
					}
			  });
				
		
		},
		
		
		/********************************************************************
		 * 
		 * 将私有方法'添加工具'公开出去
		 */
		addToolBar : function(tool) {
			addToolBar(tool);
		},
		
		/*******************************************************************
		 * 
		 * 将私有方法'修改'公开出去
		 */
		editObj : function() {
			editObj();
		}
		
	} );
	
	
	/************************************************************************
	 * 私有方法
	 * 
	 * @function 过滤查询
	 */
	function searchFilter() {
		if($('#selectVal').val() == 'all') {
			$.messager.alert("警告","请选择过滤条件!","info");
		} else {
			objList.datagrid('load',{
				selectVal:$("#selectVal").val(),
				inputVal:$("#inputVal").val()
			});
		}
		//alert($("#inputVal").val());
	}

	/************************************************************************
	 * 私有方法
	 * 
	 * @function 添加,弹出对话框
	 */
	function addObj() {
		$("#objDialog").dialog({
			title:'添加信息',
			width:800,
			height:400,
			resizable:true,
			content:"<iframe src='"+addPage+"?AUTHID="+$("#authID").val()+"' width='100%' height='100%' frameborder='no' scrolling='auto'></iframe>",
			modal:true
			
		});
	}

	
	/************************************************************************
	 * 私有方法
	 * 
	 * @function 删除操作
	 */
	function delObj() {
		
		//获取选择的数据
		selRowData = objList.datagrid("getSelected");
		
		//若为空,则提示
		if(selRowData ==null) {
			$.messager.alert("错误","请选择一条数据","error");
		} else {
			$.messager.confirm("确认","确定要删除此条数据吗?",function(result) {
					if(result) {
						$.post(deleteUrl,{'objid':selRowData[fieldId]},
								function(data) {
								   if(data.success) {
										$.messager.alert("成功","删除成功","success");
										reload();		
								   } else {
										$.messager.alert("错误",data.errorMsg,"error");
								   }
								});
					}
			} );
		}
	}
	
	
	/************************************************************************
	 * 私有方法
	 * 
	 * @function 添加工具栏按钮
	 * @param 按钮数组  type Array
	 */
	function addToolBar(tool){
		toolbar.push('-');
		toolbar.push(tool);
	};
	
	/************************************************************************
	 * 私有方法
	 * 
	 * @function 列表刷新
	 */
	function reload(){
		objList.datagrid('load');
	}
	
})(jQuery);