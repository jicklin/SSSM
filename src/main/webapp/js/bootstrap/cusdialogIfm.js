/***
 * @desc 对话框中的内容
 * @author hjj
 * @date 2015/07/17
 */

(function($) {
	
	$.fn.extend({
			
		/**
		 * @desc 核心方法
		 */
		cusdialogIfm : function( options ) {
			
			//操作标示
			var flag = getQueryString("flag");
			//查询obj的时候的关键字
			var searchKey = getQueryString("searchKey");
			var $table =$(this);
			//默认配置
			var defaults = {
					hasFile : false,
					extravali : null,
					onAdd : function() {
				
					},
					onEdit : function() {
						
					},
					onDetail : function() {
						
					},
					onAfterFill : function(data) {
						
					}
			};
			//实际配置
			var settings = $.extend({},defaults,options);
			
			var hasFile = settings.hasFile;
			var url = settings.url;
			var editUrl = settings.editUrl;
			var extravali = settings.extravali;
			var onSuccess = settings.onSuccess;
			var getObjUrl = settings.getObjUrl;
			var fieldID = settings.fieldID;
			var onAdd = settings.onAdd;
			var onEdit = settings.onEdit;
			var onDetail = settings.onDetail;
			var onAfterFill = settings.onAfterFill;
			
			$(document.body).append("<button id='upload' style='display:none;'></button>");
			
			if(flag == "add" || flag == "edit" ) {
				if( hasFile ) {
					$table.append("<tr class='fileupload'>"
							+"<td class='custhead'>附件 : </td>"
							+"<td><a href='javascript:void(0);' class='file'>选择文件"
						    +"<input type='file' id='file1' class='submitData' name='file1'>"
							+"</a></td><td colspan='2'><div class='progress'> <strong id='bar' style='width:1%;'></strong> </div></td>"
							+"</tr>");
					
					$("#file1").change(function() {
						var value = $(this).val();
						if( $("#fileName").length == 0 ) {
							$(this).closest("tr").after("<tr><td class='custhead'>文件 : </td><td colspan='3'><span id='fileName'>" + value + "</span></td></tr>");
						} else {
							$("#fileName").text(value);
						}
					});
				}
				
				if( flag == "edit" && editUrl ) {
					$("#upload").mysubmit({
						"extravali" : extravali,
						"url":editUrl,
						"onSuccess": onSuccess
					});
				} else {
					$("#upload").mysubmit({
						"extravali" : extravali,
						"url":url,
						"onSuccess": onSuccess
					});
				}
				
				
			}
			
			//添加
			if( flag == "add" ) {
				//设置默认值
				var $default	=	$table.find(".default");
				$default.each(function(index,item) {
					if( $(item).hasClass("date") ) {
						$(item).val(getNowTime());
					} else {
						$(item).val($(item).attr("data"));
					}
					
				});
				
				//回调函数,运行自定义的脚本
				runFunction(onAdd);
			}
			
			//详细
			if( flag == "detail" ) {
				$.get(getObjUrl+"?dt=" + MathRand(),JSON.parse(searchKey),function( data ) {
					$("table input").attr("readonly","readonly");
					$("table textarea").attr("readonly","readonly");
					$("table select").attr("disabled","disabled");
					if( data.success ) {
						fill(data.data,$table);
					} else if( data.rows ) {
						fill(data.rows[0],$table);
					}
					onAfterFill.call(this,data.data);
				});
				
				//回调函数,运行自定义的脚本
				runFunction(onDetail);
			}
			
			//修改
			if( flag == "edit" ) {
				
				//回调函数,运行自定义的脚本
				runFunction(onEdit);
				
				$(document.body).append("<input type='hidden' id='"+fieldID+"' class='submitData fields'>");
				$.get(getObjUrl+"?dt=" + MathRand(),JSON.parse(searchKey),function( data ) {
					if( data.success ) {
						fill(data.data,$table);
						onAfterFill.call(this,data.data);
					}
				});
				
			}
			
		}
			
	});
	
	//修改或者详细信息的填充
	function fill( result, $table ) {
		
		var $fields = $(".fields");
		$fields.each(function(index,item) {
			var IDStr = $(item).attr("id");
//			alert(IDStr);
			//带"."ID的处理方式
			if ( IDStr.indexOf("\.") > 0 ) {
				$(item).val(result[IDStr.split("\.")[1]]);
			} else {
//				alert(result[$(item).attr("id")]);
				$(item).val(result[$(item).attr("id")]);
			}
			
			if( $(item).hasClass("date") ) {
//				console.log("date");
				var value = $(item).val();
				if($(item).hasClass("year")) {
//					console.log("year");
					$(item).val(formatYearDate(value));
				} else {
					$(item).val(formatDate(value));
				}
			}
		});
		
	}
	
	//回调函数,运行自定义的脚本
	function runFunction ( callBack ) {
		
		callBack();
	}
	
	//时间格式化
	function formatDate (dtime) {
		if( dtime ) {
			dtime = dtime.split("T")[0];
		}
		return dtime;
	}
	
	function formatYearDate (dtime) {
		if( dtime ) {
			dtime = dtime.split("-")[0];
		}
		return dtime;
	}
})(jQuery);