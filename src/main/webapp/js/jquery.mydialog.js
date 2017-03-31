/**
 * @function 根据不同的数据,跳出对话框
 * @author hjj 
 */
(function($) {
	
	$.fn.extend( {
		
		
		/********************************************************************
		 * 
		 * @function 对话框自动填充字段名和数据的方法
		 */
		mydialog : function(options) {
		
			//获取表格自身的jquery对象
			var objTable = $(this);
			
			//获取传递过来的objid
			var objid = getQueryString("objid");
			
			//添加一个存储objid的隐藏input,用于判断是修改操作还是添加操作
			$(document.body).append("<input id='objid' type='hidden' value='"+objid+"'></input>");
			
			var fields = [];
			
			//非自定义视图
			if( options && options.fields != undefined) {
				
				//数组,包括对话框页面要显示内容的描述
				fields = options.fields;
				//alert("selRowDataStr="+selRowDataStr);
				
				for(var i in fields){
					
					//String,要在对话框页面添加的标签以及数据
					var bar = "";
					
					var validate = "";
						
					if(	fields[i].validate != undefined ) {
						validate = " "+fields[i].validate;
					}
					//若有input标签
					if(fields[i].type=="input") {
						bar = "<td class='customThead"+validate+"'><span>"+fields[i].text+":</span></td><td><input id='"+fields[i].fieldId+"' class='submitData' name='"+fields[i].fieldId+"' type='text' /></td>";
						if(fields[i].readonly && fields[i].value != undefined) {
							bar = "<td class='customThead'><span>"+fields[i].text+":</span></td><td><input id='"+fields[i].fieldId+"' class='submitData' name='"+fields[i].fieldId+"' type='text' readonly='readonly' disable='disable' value='"+fields[i].value+"'/></td>";
						}
					}
					
					//若有input hidden 标签
					if(fields[i].type=="hidden") {
						bar = "<td class='hidden'></td><td class='hidden'><input id='"+fields[i].fieldId+"' type='hidden' class='submitData' ></td>";
					}
					
					//若有textarea标签
					if(fields[i].type=="textarea") {
						bar = "<td class='customThead"+validate+"'><span>"+fields[i].text+":</span></td><td><textarea id='"+fields[i].fieldId+"' class='submitData' name='"+fields[i].fieldId+"' row='3'/></td>";
					}
					
					//若有文件 file 标签
					if(fields[i].type=="file") {
						bar = "<td class='customThead'><span>"+fields[i].text+":</span></td><td><input  id='file1' class='submitData' name='file1' type='file'/>"+
						"<div id='progress' style='width:120px;height:15px;'></div>"+
		                "<span id='progressMsg'></span>"+
						"</td>";
					}
					
					//日期
					if(fields[i].type=="date") {
						bar = "<td class='customThead"+validate+"'><span>"+fields[i].text+":</span></td><td><input id='"+fields[i].fieldId+"' class='submitData' name='"+fields[i].fieldId+"' type='text' onclick='JTC.setday()'/></td>";
					}
					
					//若有选择 select 标签
					if(fields[i].type=="select") {
						bar = "<td class='customThead'><span>"+fields[i].text+":</span></td><td><select id='"+fields[i].fieldId+"' class='submitData' ></select></td>";
						objTable.append("<tr>"+bar+"</tr>");
						bar = "";
						for(var j in fields[i].option) {
							$("[id='"+fields[i].fieldId+"']").append("<option value='"+fields[i].option[j].value+"'>"+fields[i].option[j].name+"</option>");
						}
					}
					
					//alert(bar);
					
					//添加所有标签
					if(bar != "") {
						objTable.append("<tr>"+bar+"</tr>");
					} 
					
					//修改时候obj的原始值赋值
					/*if(!$.isEmptyObject(selRowDataJSON)){
						//alert("#"+fields[i].fieldId+"="+selRowDataJSON[fields[i].fieldId]);
						$("#"+fields[i].fieldId).val(selRowDataJSON[fields[i].fieldId]);
						}*/
				}
			} else {//自定义视图
				fields = $(".fields");
			}
			
			
			//修改操作的时候显示原有的数据
			if($("#objid").val() != "null" && $("#objid").val() != "") {
				
				var dt = MathRand();
				
				$.get(options.getObjUrl+"?dt="+dt,{'objid':$("#objid").val()},function(data){
					
					if(data.success) {
						
						var obj = data.data; 
//						alert(JSON.stringify(obj));
						//非自定义视图
						if(options.fields != undefined) {
							for(var i in fields) {
								
								var field = fields[i];
								var fieldId = field.fieldId;
								
								
								//带"."ID的处理方式
								if ( fieldId.indexOf("\.") > 0 ) {
									$("[id='"+fieldId+"']").val(obj[fieldId.split("\.")[1]]);
								} else {
									$("#"+fieldId).val(formatDate(obj[fieldId], field.type));
								}
								
							}
						} else {//自定义视图
							
							fields.each(function (index,item) {
								
								var IDStr = $(item).attr("id");
								
								//带"."ID的处理方式
								if ( IDStr.indexOf("\.") > 0 ) {
									$(item).val(obj[IDStr.split("\.")[1]]);
								} else {
									$(item).val(obj[$(item).attr("id")]);
								}
								
							} );
						}
						
					}
				});
			}
			
			//添加提交,取消2个按钮
			objTable.append("<tr><td style='text-align:center;'>"+
								  "<a id ='upload' href='javascript:void(0);' style='margin-top:8px;margin-left:0;' >确认</a>"+
								  "</td>"+
					              "<td style='text-align:center;'>"+
					              "<a id='cancel' href='javascript:void(0);' style='margin-top:8px;margin-left:50px;' onclick='javascript:window.parent.closeDialog();'>取消</a>"+
					              "</td></tr>");
			
			$('#upload').linkbutton({    
			    iconCls: 'icon-ok'   
			}); 
			
			$('#cancel').linkbutton({    
			    iconCls: 'icon-cancel'   
			});
			
			$('#progress').progressbar(); 
			
			$("#progress").hide();
		}
	
	} );
	
	
	/***********************************************************************
	 * 私有方法
	 * 
	 * 
	 * @function 修改数据的时候,格式化时间的
	 * @param _dtime type String 时间, _type type String 此行填充数据的格式
	 */
	function formatDate( _dtime, _type ) {
		
		if ( _dtime && _type == "date" ) {
			
			var time = _dtime.split("T")[0];
			
			return time;
			
		}
		
		return _dtime;
		
	}
	
})(jQuery);