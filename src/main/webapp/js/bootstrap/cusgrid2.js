/*******************************************************************************
 * @desc 生成基于bootstrap样式的自定义表格
 * @author hjj
 * @date 2015/06/26
 */

(function($) {
	
	//table JQ对象
	var table;
	
	//获取数据的地址
	var url;
	
	//传递到后台的参数
	var queryParams;
	
	//自定义列
	var columns;
	
	//查询关键字,一般为id
	var searchKey;
	
	//id字段
	var fieldId;
	
	//是否添加竖线标志
	var bordered;
	
	//对话框的路径
	var dialogUrl;
	
	//删除对象的路径
	var deleteUrl;
	
	//是否为单选
	var singleSelected = true;
	
	//本页面所在iframe的下标
	var ifmNum = getQueryString("ifmNum");
	
	var totalPage;
	
	var JSONData;
	
	//查询按钮的查询路径
	var searchUrl;
	
	var onEndEdit;
	
	var onLoadSuccess;
	
	var onDblclick;
	
	var pageBtnVali = function() {
		
		var curPage = Number($("#curpage").val());
		//alert(curPage + "," + (totalPage?totalPage:1));
		if( curPage + 1 > (totalPage?totalPage:1) ) {
			$("#nextPage").closest("li").addClass("disabled");
		} else if( $("#nextPage").closest("li").hasClass("disabled") ) {
			$("#nextPage").closest("li").removeClass("disabled");
		}
		
		if( curPage == 1 ) {
			$("#prePage").closest("li").addClass("disabled");
		} else if( $("#prePage").closest("li").hasClass("disabled") ) {
			$("#prePage").closest("li").removeClass("disabled");
		}
		
	};
	
	var runFunction = function(callback,arg0,arg1,arg2) {
		callback(arg0,arg1,arg2);
	};
	
	var resolve = function( data ) {
		//alert(JSON.stringify(data));
		if( table.find("tbody").length > 0 ) {
			table.find("tbody").remove();
		}
		
		var rows ;
		
		if( data.rows ) {
			rows = data.rows;
		} else {
			rows = data.data;
		}
		
		table.data("allData",rows);
		
		var total = data.total;
		
		$("#seeCurPage").val($("#curpage").val());
		
		if( $("#total").length > 0 && total ) {
			$("#total").text("共"+total+"条");
		} else {
			$(document.body).append("<input type='hidden' id='total'>");
		}
		
		totalPage = parseInt(total/ Number($("#rows").val()));
		
		if( total % Number($("#rows").val()) > 0 ) {
			totalPage = totalPage + 1;
		}
		//alert("totalPage=" + totalPage);
		
		var actionFlag = false;
		var groupItemField;
		var groupField;
		var groupMap = {
			  	Set : function(key,value){this[key] = value;},     
			    Get : function(key){return this[key];},     
			    Contains : function(key){return this.Get(key) == null?false:true;},     
			    Remove : function(key){delete this[key];}   
			    };
		//如果有行标识,则提前删除
		$(".TRFlag").remove();
		//遍历后台传递过来的数据
		for( var rIndex in rows ) {
			
			var rows_item = rows[rIndex];
			var thStr = "";
			var trStr = "";
			var removeAction;
			var actionBtn;
			var tdHandlerArr = [];
			//行显示的颜色标示
			var isTRFlag = 1;
			//行特殊标示标记
			var isTRSign = false;
			//行特殊标示对象,里面是标示一些属性
			var TRSign={};
			
			//解析自定义列
			if( columns ) {
				for( var cIndex in columns ) {
					var columns_item = columns[cIndex];
					//若有行颜色标示,进行格式化赋值
					if(columns_item.TRColorFlag) {
						isTRFlag = columns_item.TRColorFlag.call(this,rows_item[columns_item.field]);
					}
					//若有行特殊标示,则对标示的属性进行赋值
					if(columns_item.TRSignFlag){
						isTRSign = columns_item.TRSignFlag.call(this,rows_item[columns_item.field]);
						TRSign = columns_item.TRSign;
					}
					
					//将需要添加的头部th,根据自定义参数columns进行拼接成字符串
					if( !table.find("thead").length > 0 && !columns_item.hidden ) {
						var th_tools_str = ""; 
						if( columns_item.filter ) {
							th_tools_str = th_tools_str + 
							//" <div class='filterDiv input-group-btn'>"+
							" <button type='button' "+
							"class='btn btn-default filterBtn' "+
							//"data-toggle='dropdown' aria-haspopup='true' "+
							"><span class='filter glyphicon "+
							"glyphicon-filter' data='"+JSON.stringify(columns_item.filter)+"'>"+
							"</span></button>";
						}
						if( columns_item.sort ) {
							th_tools_str = th_tools_str + 
							" <button type='button' "+
							"class='btn btn-default sortBtn'>"+
							"<span class='sort glyphicon glyphicon-sort'></span></button>";
						}
						var thClientSortClass = "";
						if( columns_item.clientsort ) {
							thClientSortClass = "thClientSort";
						}
						if( th_tools_str != "" ) {
							thStr = thStr + "<th class='text-center "+thClientSortClass+"' data='" + columns_item.field + "'>" + columns_item.title + th_tools_str + "</th>";
						} else if( columns_item.field == "ck" && !singleSelected ) {
							thStr = thStr + "<th class='text-center'><span class='glyphicon glyphicon-unchecked selectAll'></span>" + columns_item.title + "</th>";
						} else {
							thStr = thStr + "<th class='text-center "+thClientSortClass+"' data='" + columns_item.field + "'>" + columns_item.title + "</th>";
						}
					}
					/*//详细,删除操作列,若不需要可以在自定义中设置
					if( columns_item.field != "action") {
						trStr = trStr + "<td class='text-center'>" + rows_item[columns_item.field] + "</td>";
					} else {
						actionFlag = true;
					}*/
					
					if(columns_item.isGroup) {
						groupField = columns_item.field;
					}
					
					//添加多选框
					if( columns_item.field == "ck" ) {
						trStr = trStr + "<td class='text-center'><span class='glyphicon glyphicon-check checked'></span></td>";
					//添加详细,删除操作列
					} else if( columns_item.field == "action" ) {
						actionFlag = true;
						removeAction = columns_item.removeAction;
					//如果存在组单位函数,则判断是否满足组单位的函数
					//若满足,组单位这一行都不显示,数据存入map
					} else if(columns_item.groupItemFun 
							&& columns_item.groupItemFun.call(this,rows_item[columns_item.field])) {
						//关联的值
						var value = rows_item[columns_item.field];
						if( columns_item.groupItemFun.call(this,value) ) {
							trStr = "";
							if(!groupMap.Contains(value)) {
								groupMap.Set(value,[JSON.stringify(rows_item)]);
							} else {
								groupMap.Get(value).push(JSON.stringify(rows_item));
							}
							groupItemField = columns_item.field;
							actionFlag = false;
							break;
						}
					//普通的添加列,不添加隐藏的列
					} else if( !columns_item.hidden ) {
						
						var value = rows_item[columns_item.field];
						
						if( columns_item.formatter ) {
							/***
							 * 若本身为null值则会将格式化后的值赋给自己,
							 * 这里的处理是因为在新建案件的时候赋初值,
							 * 有点流程的影子,以后需修改
							 ***/
							if( value == null ) {
								var result = columns_item.formatter(value, rows_item, rIndex);
								
								//array是针对select那种真实值与显示值不相同的情况
								if( $.type(result) == "array" ) {
									rows_item[columns_item.field] = result[0];
									value = result[1];
								} else {
									//正则表达式判断是否为html语言
									var reg = new RegExp('^<([^>\s]+)[^>]*>(.*?<\/\\1>)?$');
									//若formatter是一个html语言则不赋值
									if( !reg.test(result) ) {
										value = rows_item[columns_item.field] = result;
									}
								}
							} else {
								value = columns_item.formatter(value, rows_item, rIndex);
							}
						}
						//若没有数据,则显示""
						value || (value = ""); 
//						console.log(value+": "+typeof value);
						if( typeof value == "string" ) 
							//去掉单引号,在html中有单引号容易导致不匹配
							value=value.replace(/\'/g,"");
						if( columns_item.editor ) {
							trStr = trStr + "<td class='text-center editor' title='"+value+"' data='"+JSON.stringify(columns_item)+"'>" + value + "</td>";
						} else {
							if(columns_item.handler) {
								trStr = trStr + "<td class='text-center tdClick' title='"+value+"'>" + value + "</td>";
								tdHandlerArr.push(columns_item.handler);
							} else {
								trStr = trStr + "<td class='text-center' title='"+value+"'>" + value + "</td>";
							}
						}
					}
				}
			}
			//添加表头th
			if( thStr != "" ) {
				table.append("<thead><tr>" + thStr + "</tr></thead>");
			}
			//添加操作列
			if( actionFlag ) {
				var actionStr = "";
				//若有自定义操作按钮
				if( actionBtn ) {
					for(var aI in actionBtn) {
						var actionBtn_item = actionBtn[aI];
						if(aI != 0) {
							actionStr = actionStr + " ";
						}
						//console.log(actionBtn_item.handler);
						actionStr = actionStr + "<a class='btn btn-"+actionBtn_item.type+" btn-xs' href='#'><span class='glyphicon "+actionBtn_item.signClass+"'></span> "+actionBtn_item.text+"</a>";
					}
				//若没有自定义操作按钮,则添加默认的
				} else {
					actionStr = "<a class='btn btn-info btn-xs detailBtn' href='#'><span class='glyphicon glyphicon-edit'></span> 详细</a> <a href='#' class='btn btn-danger btn-xs delBtn'><span class='glyphicon glyphicon-remove'></span> 删除</a>";
					if( removeAction == "del" ) {
						actionStr = "<a class='btn btn-info btn-xs detailBtn' href='#'><span class='glyphicon glyphicon-edit'></span> 详细</a>";
					}
					if( removeAction == "detail" ) {
						actionStr = "<a href='#' class='btn btn-danger btn-xs delBtn'><span class='glyphicon glyphicon-remove'></span> 删除</a>";
					}
				}
				trStr = trStr + "<td class='text-center gridAction'>" + actionStr + "</td>";
			}
			//添加数据行tr
			//alert(isTRFlag);
			var trClass = "";
			//行颜色标示转为对应class颜色
			isTRFlag == 2 && (trClass = "warning");
			isTRFlag == 3 && (trClass = "info");
			isTRFlag == 4 && (trClass = "success");
			isTRFlag == 5 && (trClass = "danger");
			isTRFlag == 6 && (trClass = "primary");
			//若不是数字,则为使用者自定义的class颜色
			if(isNaN(isTRFlag)) {
				var background = isTRFlag.background;
				var color = isTRFlag.color;
				var hover = isTRFlag.hover;
				var click = isTRFlag.click;
				table.append("<tr data='"+ JSON.stringify(rows_item) +"'>" + trStr + "</tr>");
				table.find("tr:last").css("background-color",background);
				table.find("tr:last").css("color",color);
				table.find("tr:last").hover(function() {
					$(this).find("td").css("background-color",hover);
				},function() {
					$(this).find("td").css("background-color",background);
				});
				table.find("tr:last").click(function(){
					if($(this).hasClass("selected")) {
						$(this).find("td").css("background-color",click);
					} else {
						$(this).find("td").css("background-color",background);
					}
				});
			} else {
				if(trStr != "") {
//					console.log(JSON.stringify(rows_item));
					var trDataTemp = JSON.stringify(rows_item);
					//去掉单引号,在html中有单引号容易导致不匹配
					trDataTemp = trDataTemp.replace(/\'/g,"");
					table.append("<tr class='"+trClass+"' data='"+ trDataTemp +"'>" + trStr + "</tr>");
				}
			}
			//是否需要显示行特殊标示
			if(isTRSign) {
				var $tr = table.find("tr:last");
				var offsetX = $tr.offset().left;
				var offsetY = $tr.offset().top;
				table.append(
						"<span class='"+TRSign.type+" TRFlag' style='position:absolute;'></span>"
						);
				//alert($(".TRFlag"+index).length);
				table.find(".TRFlag:last").css("left",offsetX-13);
				table.find(".TRFlag:last").css("top",offsetY-39);
				//去掉边框线
				table.find(".TRFlag:last").parent().css("border","none");
				//标示提示标签
				table.find(".TRFlag:last").tooltip({
				      title:TRSign.tip,
				      placement:TRSign.forwards
				    });
			}
			//若有自定义的操作按钮,则循环绑定对应的点击事件
			if( actionBtn ) {
				for(var aI in actionBtn) {
					var actionBtn_item = actionBtn[aI];
					var handler = actionBtn_item.handler;
					var $gridAction = table.find(".gridAction:last");
					var $tr = $gridAction.closest("tr");
					var index = $("table tr").index($tr) -1;
					var data = $gridAction.closest("tr").attr("data");
					$gridAction.find(".btn").eq(aI).on("click",null,{index:index,data:JSON.parse(data)},handler);
				}
			}
			//若有td单元格的单击事件,绑定对应的单击事件
			if(tdHandlerArr && tdHandlerArr.length > 0) {
				for(var tI in tdHandlerArr) {
					var tdHandlerArr_item = tdHandlerArr[tI];
//					console.log("tdHandlerArr_item="+tdHandlerArr_item);
					var $tr = table.find("tr:last");
					var data = $tr.attr("data");
//					console.log("length="+$tr.length);
					var $tdClick = $tr.find(".tdClick").eq(tI);
					$tdClick.on("click",null,{tdText:$tdClick.text(),trData:JSON.parse(data)},tdHandlerArr_item);
				}
			}
		}
		//若有组关联行,添加'+'号
		table.find("tbody tr").each(function(index,item) {
			var $tr = $(item);
			var data = JSON.parse($tr.attr("data"));
			//获取组的值
			var groupVal = data[groupField];
			//根据组的值获取,组单位的数据数组
			var groupItemDataArr = groupMap.Get(groupVal);
//			console.log(groupItemDataArr);
			//如果存在则添加'+'号
			if( groupItemDataArr ) {
				var $td = $tr.find("td:first");
				($td.find(".checkIcon").length > 0) && ($td = $td.next());
				$td.prepend("<span class='glyphicon glyphicon-plus launchSign'></span>");
			}
		});
		//'+'号绑定点击事件
		$(".launchSign").click(function() {
			$launchSign = $(this);
			$tr = $launchSign.closest("tr");
			var trIsSelected = $tr.hasClass("selected");
			var data = JSON.parse($tr.attr("data"));
			//获取组的值
			var groupVal = data[groupField];
//			console.log(groupVal);
			var groupItemDataArr = groupMap.Get(groupVal);
			if( $launchSign.hasClass("glyphicon-plus") ) {
				$launchSign.removeClass("glyphicon-plus").addClass("glyphicon glyphicon-minus");
				var gTrStr = "";
				//遍历组单位数据,进行在组下面添加一行操作
				for(var i in groupItemDataArr) {
					var groupItemData = groupItemDataArr[i];
					groupItemData = JSON.parse(groupItemData);
					if( trIsSelected ) {
						gTrStr = gTrStr + "<tr class='groupItem selected' data='"+JSON.stringify(groupItemData)+"'>";
					} else {
						gTrStr = gTrStr + "<tr class='groupItem' data='"+JSON.stringify(groupItemData)+"'>";
					}
					for( var cIndex in columns ) {
						var columns_item = columns[cIndex];
						//添加多选框
						if( columns_item.field == "ck" ) {
							if( trIsSelected ) {
								gTrStr = gTrStr + "<td class='text-center'><span class='glyphicon glyphicon-check checkIcon checked'></span></td>";
							} else {
								gTrStr = gTrStr + "<td class='text-center'><span class='glyphicon glyphicon-unchecked checkIcon'></span></td>";
							}
						//添加详细,删除操作列
						} else if( columns_item.field == "action" ) {
							actionFlag = true;
							removeAction = columns_item.removeAction;
						//普通的添加列,不添加隐藏的列
						} else if( !columns_item.hidden ) {
							var value = groupItemData[columns_item.field];
							if( columns_item.formatter ) {
								/***
								 * 若本身为null值则会将格式化后的值赋给自己,
								 * 这里的处理是因为在新建案件的时候赋初值,
								 * 有点流程的影子,以后需修改
								 ***/
								if( value == null ) {
									var result = columns_item.formatter(value, groupItemData, rIndex);
									
									//array是针对select那种真实值与显示值不相同的情况
									if( $.type(result) == "array" ) {
										groupItemData[columns_item.field] = result[0];
										value = result[1];
									} else {
										//正则表达式判断是否为html语言
										var reg = new RegExp('^<([^>\s]+)[^>]*>(.*?<\/\\1>)?$');
										//若formatter是一个html语言则不赋值
										if( !reg.test(result) ) {
											value = groupItemData[columns_item.field] = result;
										}
									}
								} else {
									value = columns_item.formatter(value, groupItemData, rIndex);
								}
							}
							//若没有数据,则显示""
							value || (value = "");
							if(columns_item.handler) {
								gTrStr = gTrStr + "<td class='text-center tdClick' title='"+value+"'>" + value + "</td>";
								tdHandlerArr.push(columns_item.handler);
							} else {
								gTrStr = gTrStr + "<td class='text-center' title='"+value+"'>" + value + "</td>";
							}
						}
					}
					if( actionFlag ) {
						var actionStr = "";
						//若有自定义操作按钮
						if( actionBtn ) {
							for(var aI in actionBtn) {
								var actionBtn_item = actionBtn[aI];
								if(aI != 0) {
									actionStr = actionStr + " ";
								}
								//console.log(actionBtn_item.handler);
								actionStr = actionStr + "<a class='btn btn-"+actionBtn_item.type+" btn-xs' href='#'><span class='glyphicon "+actionBtn_item.signClass+"'></span> "+actionBtn_item.text+"</a>";
							}
						//若没有自定义操作按钮,则添加默认的
						} else {
							actionStr = "<a class='btn btn-info btn-xs detailBtn' href='#'><span class='glyphicon glyphicon-edit'></span> 详细</a> <a href='#' class='btn btn-danger btn-xs delBtn'><span class='glyphicon glyphicon-remove'></span> 删除</a>";
							if( removeAction == "del" ) {
								actionStr = "<a class='btn btn-info btn-xs detailBtn' href='#'><span class='glyphicon glyphicon-edit'></span> 详细</a>";
							}
							if( removeAction == "detail" ) {
								actionStr = "<a href='#' class='btn btn-danger btn-xs delBtn'><span class='glyphicon glyphicon-remove'></span> 删除</a>";
							}
						}
						gTrStr = gTrStr + "<td class='text-center gridAction'>" + actionStr + "</td>";
					}
					gTrStr = gTrStr + "</tr>";
				}
//				console.log(gTrStr);
				$tr.after(gTrStr);
				//详细操作
				$(".detailBtn").click(function() {
					var data = JSON.parse($(this).closest("tr").attr("data"));
					
					var real_searchKey = {};
					
					if( searchKey ) {
						for( var sIndex in searchKey ) {
							var searchKey_item = searchKey[sIndex];
							if( $.type(searchKey_item) == "string" ) {
								real_searchKey[searchKey_item] = data[searchKey_item];
							} else if( $.type(searchKey_item) == "object" ) {
								for( var siIndex in searchKey_item ) {
									real_searchKey[siIndex] = searchKey_item[siIndex];
								}
							}
						}
					} else {
						real_searchKey["objid"] = data[fieldId];
					}
					
					var urlIcon = "?";
					
					if( dialogUrl.indexOf("?") > 0 ) {
						urlIcon = "&";
					}
					
					var url = dialogUrl + urlIcon + "searchKey=" + JSON.stringify(real_searchKey);
					window.top.dialog("detail",url,null,table.data("dlgHeight"),table.data("dlgWidth"));
				});
			} else {
				$tr.nextAll().each(function(index,item) {
					if($(item).hasClass("groupItem")) {
						$(item).remove();
					} else {
						return false;
					}
				});
				$launchSign.removeClass("glyphicon-minus").addClass("glyphicon-plus");
			}
		});
		//若有选中的数据,则添加到表头下方第一行的位置
		var checkedArr = table.data("checked");
		if( checkedArr && checkedArr.length > 0 ) {
			for( var cIndex in checkedArr ) {
				var checkedArr_item = checkedArr[cIndex];
				var cTrStr = "";
				for( var coIndex in columns ) {
					var columns_item = columns[coIndex];
					//添加多选框
					if( columns_item.field == "ck" ) {
						cTrStr = cTrStr + "<td class='text-center'><span class='glyphicon glyphicon-check checkIcon checked'></span></td>";
					//添加详细,删除操作列
					} else if( columns_item.field == "action" ) {
						actionFlag = true;
						removeAction = columns_item.removeAction;
						actionBtn = columns_item.actionBtn;
					//普通的添加列,不添加隐藏的列
					} else if( !columns_item.hidden ) {
						
						var value = checkedArr_item[columns_item.field];
						
						if( columns_item.formatter ) {
							/***
							 * 若本身为null值则会将格式化后的值赋给自己,
							 * 这里的处理是因为在新建案件的时候赋初值,
							 * 有点流程的影子,以后需修改
							 ***/
							if( value == null ) {
								var result = columns_item.formatter(value, rows_item, rIndex);
								
								//array是针对select那种真实值与显示值不相同的情况
								if( $.type(result) == "array" ) {
									checkedArr_item[columns_item.field] = result[0];
									value = result[1];
								} else {
									//正则表达式判断是否为html语言
									var reg = new RegExp('^<([^>\s]+)[^>]*>(.*?<\/\\1>)?$');
									//若formatter是一个html语言则不赋值
									if( !reg.test(result) ) {
										value = rows_item[columns_item.field] = result;
									}
								}
							} else {
								value = columns_item.formatter(value, checkedArr_item, rIndex);
							}
						}
						//若没有数据,则显示""
						value || (value = "");
						if( columns_item.editor ) {
							cTrStr = cTrStr + "<td class='text-center editor' title='"+value+"' data='"+JSON.stringify(columns_item)+"'>" + value + "</td>";
						} else {
							if(columns_item.handler) {
								cTrStr = cTrStr + "<td class='text-center tdClick' title='"+value+"'>" + value + "</td>";
							} else {
								cTrStr = cTrStr + "<td class='text-center' title='"+value+"'>" + value + "</td>";
							}
						}
					}
				}
				//添加操作列,防止在搜索记忆的时候,已经选择的数据行没有添加操作列
				if( actionFlag ) {
					var actionStr = "";
					//若有自定义操作按钮
					if( actionBtn ) {
						for(var aI in actionBtn) {
							var actionBtn_item = actionBtn[aI];
							if(aI != 0) {
								actionStr = actionStr + " ";
							}
							//console.log(actionBtn_item.handler);
							actionStr = actionStr + "<a class='btn btn-"+actionBtn_item.type+" btn-xs' href='#'><span class='glyphicon "+actionBtn_item.signClass+"'></span> "+actionBtn_item.text+"</a>";
						}
					//若没有自定义操作按钮,则添加默认的
					} else {
						actionStr = "<a class='btn btn-info btn-xs detailBtn' href='#'><span class='glyphicon glyphicon-edit'></span> 详细</a> <a href='#' class='btn btn-danger btn-xs delBtn'><span class='glyphicon glyphicon-remove'></span> 删除</a>";
						if( removeAction == "del" ) {
							actionStr = "<a class='btn btn-info btn-xs detailBtn' href='#'><span class='glyphicon glyphicon-edit'></span> 详细</a>";
						}
						if( removeAction == "detail" ) {
							actionStr = "<a href='#' class='btn btn-danger btn-xs delBtn'><span class='glyphicon glyphicon-remove'></span> 删除</a>";
						}
					}
					cTrStr = cTrStr + "<td class='text-center gridAction'>" + actionStr + "</td>";
				}
				(table.find("tbody").length == 0) && table.append("<tbody></tbody>");
				table.find("tbody").prepend("<tr data='"+ JSON.stringify(checkedArr_item) +"' class='selected'>" + cTrStr + "</tr>");
				//搜索记忆行,若有td单元格的单击事件,绑定对应的单击事件,这里获取的是第一行,
				//因为锁定行显示在第一行,tdHandlerArr这个数组在建表格的时候已经给值了
				//锁定行的时候tdHandlerArr这个值是不会变化的
				if(tdHandlerArr && tdHandlerArr.length > 0) {
					for(var tI in tdHandlerArr) {
						var tdHandlerArr_item = tdHandlerArr[tI];
						//与上面不同,因为最后一行的tr肯定是数据,可是第一行的tr可能是head
						var $tr = table.find("tbody tr:first");
						var data = $tr.attr("data");
						var $tdClick = $tr.find(".tdClick").eq(tI);
						$tdClick.on("click",null,{tdText:$tdClick.text(),trData:JSON.parse(data)},tdHandlerArr_item);
					}
				}
			}
		}
		
		//全选图标点击
		$(".selectAll").unbind("click");
		$(".selectAll").click(function() {
			$selectAllIcon = $(this);
			$selectAllIcon.toggleClass("glyphicon-unchecked glyphicon-check");
			if( $selectAllIcon.hasClass("glyphicon-check") ) {
				//alert("全选");
				$unCheckedIcon = table.find(".checkIcon.glyphicon-unchecked");
				$unCheckedIcon.removeClass("glyphicon-unchecked");
				$unCheckedIcon.addClass("glyphicon-check checked");
				//选中所有数据
				table.find("tr").has("td").not(".selected").addClass("selected");
			} else if( $selectAllIcon.hasClass("glyphicon-unchecked") ) {
				//alert("全取消");
				$checkedIcon = table.find(".checkIcon.glyphicon-check");
				$checkedIcon.removeClass("glyphicon-check checked");
				$checkedIcon.addClass("glyphicon-unchecked");
				//取消所有选中的数据
				table.find(".selected").removeClass("selected");
			}
		});
		

		table.find("th button.sortBtn").unbind("click");
		//服务器端排序
		table.find("th button.sortBtn").click(function() {
			//阻止冒泡,因为客户端排序是点击th,防止冲突
			event.stopPropagation();
			var $span = $(this).find(".sort");
			var $th = $span.closest("th");
			//alert($th.attr("data"));
			if( $span.hasClass("glyphicon-sort") ) {
				$span.attr("class","dropup sort");
				$span.append("<b class='caret'></b>");
				queryParams.sort = $th.attr("data");
			} else if( $span.hasClass("dropup") ) {
				$span.removeClass("dropup");
				queryParams.sort = $th.attr("data") + " desc";
			} else {
				$span.addClass("dropup");
				queryParams.sort = $th.attr("data");
			}
			table.find("tbody").remove();
			gridAjax();
			pageBtnVali();
		});
		
		//th工具栏:过滤
		table.find("th button.filterBtn").unbind("click");
		table.find("th button.filterBtn").click(function() {
			//阻止冒泡,因为客户端排序是点击th,防止冲突
			event.stopPropagation();
			var $span = $(this).find(".filter");
			var $th = $span.closest("th");
			var field = $th.attr("data");
			var filterDesc = JSON.parse($span.attr("data"));
			var filterType = filterDesc.type;
			var filterUrl = filterDesc.url;
			//范围过滤,输入大小值进行过滤搜索
			if( filterType == 'scope' || filterType == 'timeScope') {
				if( $span.closest("th").find("ul").length == 0 ) {
					$span.closest("button").after(
							"<ul id='tools_"+field+"_ul' class='scopeUL'></ul>"
					);
					var pageX = event.pageX;
					var pageY = event.pageY;
					$("#tools_"+field+"_ul").css("left",pageX+"px");
					$("#tools_"+field+"_ul").css("top",pageY+10+"px");
					$("#tools_"+field+"_ul").append(
							"<div>"+
							"<div class='input-group input-group-sm'>"+
							"<span class='input-group-addon' id='sizing-start'>起始位置</span>"+
							"<input id='startNum' class='form-control' placeholder='起始位置' aria-describedby='sizing-start'></input>"+
							"</div></br>"+
							"<div class='input-group input-group-sm'>"+
							"<span class='input-group-addon' id='sizing-end'>终点位置</span>"+
							"<input id='endNum' class='form-control' placeholder='终点位置' aria-describedby='sizing-end'></input>"+
							"</div></br>"+
							"<div class='input-group input-group-sm pull-right'>"+
							"<button id='toolsCancelFilter' class='btn btn-default btn-sm'>全部</button>"+
							"<button style='margin-left:5px;' id='toolsFilterBtn' class='btn btn-primary btn-sm'>搜索</button>"+
							"</div>"+
							"</div>"
					);
					if(filterType == 'timeScope') {
						$("#startNum,#endNum").addClass("scopeDate");
						$("#startNum,#endNum").attr("readonly",true);
						$(".scopeDate").datetimepicker({
							format: 'yyyy-mm-dd hh:ii:ss',
							language:  'zh-CN',
					        weekStart: 1,
					        todayBtn:  1,
							autoclose: 1,
							todayHighlight: 1,
							startView: 4,
//							minView: 2,
							forceParse: 0,
							resetBtn: 1,
							bootcssVer:3
						});
					}
					$("#toolsFilterBtn").click(function() {
						var startNum = $("#tools_"+field+"_ul").find("#startNum").val();
						var endNum = $("#tools_"+field+"_ul").find("#endNum").val();
						queryParams.startNum = startNum;
						queryParams.endNum = endNum;
						var tempUrl = url;
						if( filterUrl ) {
							url = filterUrl;
						}
						queryParams.filterField = field;
						table.find("tbody").remove();
						gridAjax();
						pageBtnVali();
						url = tempUrl;
						$("#tools_"+field+"_ul").css("display","none");
					});
					
					$("#toolsCancelFilter").click(function() {
						delete queryParams.startNum;
						delete queryParams.endNum;
						delete queryParams.filterField;
						table.find("tbody").remove();
						gridAjax();
						pageBtnVali();
						$("#tools_"+field+"_ul").css("display","none");
					});
					//ul中元素点击事件阻止冒泡,防止触发th中的客户端排序功能
					$("#tools_"+field+"_ul").click(function() {
						event.stopPropagation();
					});
					$(document).click(function() {
						$("#tools_"+field+"_ul").css("display","none");
					});
					/*$("#tools_"+field+"_ul").mouseenter(function() {
						$(this).mouseleave(function() {
							$("#tools_"+field+"_ul").css("display","none");
						});
					});*/
				} else {
					$span.closest("th").find("ul").css("display","block");
				}
			}
			//点击显示下拉框进行过滤
			if( filterType == 'choose' ) {
				var filterValArr = filterDesc.valueArr;
				var menuUrl = filterDesc.menuUrl;
				if( $span.closest("th").find("ul").length == 0 ) {
					$span.closest("button").after(
							"<ul id='tools_"+field+"_ul' class='chooseUL'>"+
							"<li role='presentation' key='cancelFilter'><a href='##'>取消过滤</a></li>"+
							"<li role='separator' class='divider'></li>"+
							"</ul>"		
					);
					var pageX = event.pageX;
					var pageY = event.pageY;
					$("#tools_"+field+"_ul").css("left",pageX+"px");
					$("#tools_"+field+"_ul").css("top",pageY+10+"px");
					if(filterValArr) {
						//valueArr 数组添加菜单项
						for(var fIndex in filterValArr) {
							var filterObj = filterValArr[fIndex];
							var filterVal = filterObj.value;
							var filterText = filterObj.text;
							$("#tools_"+field+"_ul").append(
								"<li role='presentation' key='"+filterVal+"'><a href='##'>"+filterText+"</a></li>"		
							);
						}
					}
					if(menuUrl) {
						//通过一个action 获取菜单项
						$.get(menuUrl,function(data) {
							var menuItemList = data;
							for(var mI in menuItemList) {
								var filterObj = menuItemList[mI];
								var filterVal = filterObj.id;
								var filterText = filterObj.name;
								$("#tools_"+field+"_ul").append(
									"<li role='presentation' key='"+filterVal+"'><a href='##'>"+filterText+"</a></li>"		
								);
							}
							$("#tools_"+field+"_ul").find("li").click(function() {
								if( $(this).attr("key") == "cancelFilter") {
									delete queryParams.selectVal;
									delete queryParams.inputVal;
									table.find("tbody").remove();
									gridAjax();
									pageBtnVali();
								} else {
									queryParams.selectVal = field;
									queryParams.inputVal = $(this).attr("key");
									var tempUrl = url;
									if( filterUrl ) {
										url = filterUrl;
									}
									table.find("tbody").remove();
									gridAjax();
									pageBtnVali();
									url = tempUrl;
								}
								$("#tools_"+field+"_ul").css("display","none");
							});
							//ul中元素点击事件阻止冒泡,防止触发th中的客户端排序功能
							$("#tools_"+field+"_ul").click(function() {
								event.stopPropagation();
							});
							$(document).click(function() {
								$("#tools_"+field+"_ul").css("display","none");
							});
							$("#tools_"+field+"_ul").mouseenter(function() {
								$(this).mouseleave(function() {
									$("#tools_"+field+"_ul").css("display","none");
								});
							});
						});
					}
					$("#tools_"+field+"_ul").find("li").click(function() {
						if( $(this).attr("key") == "cancelFilter") {
							delete queryParams.selectVal;
							delete queryParams.inputVal;
							table.find("tbody").remove();
							gridAjax();
							pageBtnVali();
						} else {
							queryParams.selectVal = field;
							queryParams.inputVal = $(this).attr("key");
							var tempUrl = url;
							if( filterUrl ) {
								url = filterUrl;
							}
							table.find("tbody").remove();
							gridAjax();
							pageBtnVali();
							url = tempUrl;
						}
						$("#tools_"+field+"_ul").css("display","none");
					});
					//ul中元素点击事件阻止冒泡,防止触发th中的客户端排序功能
					$("#tools_"+field+"_ul").click(function() {
						event.stopPropagation();
					});
					$(document).click(function() {
						$("#tools_"+field+"_ul").css("display","none");
					});
					$("#tools_"+field+"_ul").mouseenter(function() {
						$(this).mouseleave(function() {
							$("#tools_"+field+"_ul").css("display","none");
						});
					});
				} else {
					$("#tools_"+field+"_ul").css("display","block");
				}
			}
		});
		
		//删除操作
		$(".delBtn").click(function() {
			
			var $delBtn = $(this);
			
			$.cusconfirm({title : "确定要删除吗"},function() {
				
				var selData = JSON.parse($delBtn.closest("tr").attr("data"));
			
				delAjax(selData[fieldId]);
				
		});
			
			
			
			
		});
		
		//详细操作
		$(".detailBtn").click(function() {
			var data = JSON.parse($(this).closest("tr").attr("data"));
			
			var real_searchKey = {};
			
			if( searchKey ) {
				for( var sIndex in searchKey ) {
					var searchKey_item = searchKey[sIndex];
					if( $.type(searchKey_item) == "string" ) {
						real_searchKey[searchKey_item] = data[searchKey_item];
					} else if( $.type(searchKey_item) == "object" ) {
						for( var siIndex in searchKey_item ) {
							real_searchKey[siIndex] = searchKey_item[siIndex];
						}
					}
				}
			} else {
				real_searchKey["objid"] = data[fieldId];
			}
			
			var urlIcon = "?";
			
			if( dialogUrl.indexOf("?") > 0 ) {
				urlIcon = "&";
			}
			
			var url = dialogUrl + urlIcon + "searchKey=" + JSON.stringify(real_searchKey);
			window.top.dialog("detail",url,null,table.data("dlgHeight"),table.data("dlgWidth"));
		});
		
		table.find("tbody tr").dblclick(function() {
			var data = $(this).attr("data");
			var $checkIcon = $(this).find(".checkIcon");
			if( singleSelected ) {
				$(".checked").attr("class","glyphicon glyphicon-unchecked checkIcon");
//				$checkIcon.attr("class","glyphicon glyphicon-check  checkIcon checked");
//				$(this).addClass("selected");
			}
			$(this).addClass("selected");
			$checkIcon.attr("class","glyphicon glyphicon-check  checkIcon checked");
			onDblclick.call(this,JSON.parse(data));
		});
		
		/***
		 * @desc 关于checked和selected说明:点击某行,
		 * 会在此行的第一个td图标checkIcon中添加一个checked class,并且,
		 * 此行tr 会添加一个selected class,
		 */
		//选中行点击事件,除了编辑器
		table.find("tbody tr td").not(".editor,.tdClick").click(function() {
			
			var $tr = $(this).closest("tr");
			var $checkIcon = $tr.find(".checkIcon");
			var $allCheckIcon = table.find(".checkIcon");
			
			//多选
			if( $checkIcon.hasClass("checked") ) {
				$checkIcon.attr("class","glyphicon glyphicon-unchecked checkIcon");
			} else {
				if( singleSelected ) {
					$(".checked").attr("class","glyphicon glyphicon-unchecked checkIcon");
				}
				$checkIcon.attr("class","glyphicon glyphicon-check  checkIcon checked");
			}
			
			//全都选中或者全都取消的标示
			var iconSame = true;
			
			//遍历所有图标
			$allCheckIcon.each(function(index,item) {
				if( $(item).attr("class") != $checkIcon.attr("class") ) {
					iconSame = false;
				}
			});
			
			//若图标全都是选中状态,那么selectAll也要选中
			if( iconSame && $checkIcon.hasClass("checked") ) {
				$(".selectAll").toggleClass("glyphicon-check glyphicon-unchecked");
			//若有一个是取消状态,那么selectAll也要是取消
			} else if ( $(".selectAll").hasClass("glyphicon-check") ) {
				$(".selectAll").toggleClass("glyphicon-check glyphicon-unchecked");
			}
			
			//单选
			if( $tr.hasClass("selected") ) {
				$tr.removeClass("selected");
			} else {
				if( singleSelected ) {
					$(".selected").removeClass("selected");
				}
				$tr.addClass("selected");
			}
			//组单元的选中状态跟着组的选中状态走
			$tr.nextAll().each(function(index,item) {
				if($(item).hasClass("groupItem")) {
					var $groupItemCheckIcon = $(item).find(".checkIcon");
					if( $groupItemCheckIcon.hasClass("checked") ) {
						$groupItemCheckIcon.attr("class","glyphicon glyphicon-unchecked checkIcon");
					} else {
						$groupItemCheckIcon.attr("class","glyphicon glyphicon-check  checkIcon checked");
					}
					if( $(item).hasClass("selected") ) {
						$(item).removeClass("selected");
					} else {
						$(item).addClass("selected");
					}
				} else {
					return false;
				}
			});
			
		});
		
		//编辑器,开始编辑
		table.find("tbody tr td.editor").click(function() {
			var $td = $(this);
			var primary_val = $td.text();
			//获取这一格editor的一些属性,比如field,title,editor类型等
			var columnDataStr = $(this).attr("data");
			var columnDataJSON = JSON.parse(columnDataStr);
			var $tr = $td.closest("tr");
			var tr_index = table.find("tbody tr").index($tr);
			//获取所在行的数据
			var trDataStr = $tr.attr("data");
			var trDataJSON = JSON.parse(trDataStr);
			var editor = columnDataJSON.editor;
			var editor_field = columnDataJSON.field;
			var editor_val;
//			alert(columnDataStr);
			if( editor.type == "input" ) {
				var oldText = $td.text();
//				alert($td.html());
				$td.html("<input type='text' style='width:80px;height:18px;' value='"+oldText+"'></input>");
				var $input = $td.find("input");
				//阻止冒泡
				$input.click(function(event){
					 event.stopPropagation();
				});
				
				//需要重新激活焦点事件,上面的阻止冒泡阻止了获取焦点
				$input.trigger("focus");
				
				//设置默认值
				if( editor.value ) {
					$input.val(editor.value);
				}
				$input.blur(function() {
					//$.cusconfirm({title:"保存修改的内容?"},function() {
						editor_val = $input.val();
						$td.html("<span>" + $input.val() + "</span>");
						//修改td的title 悬浮显示内容为更改后的内容
						$td.attr("title",editor_val);
						for(var tIndex in trDataJSON) {
							if( tIndex == editor_field ) {
								trDataJSON[tIndex] = editor_val;
							}
						}
						trDataStr = JSON.stringify(trDataJSON);
						$tr.attr("data",trDataStr);
						var changes = null;
						/***
						 * 若值发生改变的话,则添加changes对象,
						 * 外部可以根据changes对象来判断是否发生改变来判断是否需要加载
						 */
						if(oldText != editor_val) {
							changes = {};
							changes[editor_field] = editor_val;
						}
						//runFunction(onEndEdit,tr_index,trDataJSON,changes);
						onEndEdit.apply(this,[tr_index,trDataJSON,changes,$td]);
					/*},function() {
						$td.html("<span>"+ primary_val +"</span>");
					});*/
				});
			}
			if( editor.type == "select" ) {
				var oldText = $td.text();
				//编辑之前select的value值
				var oldValue;
				$td.html("<select style='height:18px;font-size:12px;'></select>");
				var $select = $td.find("select");
				//阻止冒泡
				$select.click(function(event) {
					event.stopPropagation();
				});
				
				//需要重新激活焦点事件,上面的阻止冒泡阻止了获取焦点
				$select.trigger("focus");
				
				for( var oIndex = 0; oIndex < editor.options.length ; oIndex++) {
					var options_item = editor.options[oIndex];
					if( oldText == options_item.text ) {
						$select.append("<option selected='selected' value='"+options_item.value+"'>"+options_item.text+"</option>");
						//编辑之前select的value值,在这里赋值
						oldValue = options_item.value;
					} else {
						$select.append("<option value='"+options_item.value+"'>"+options_item.text+"</option>");
					}
				}
				
				//设置默认值
				if( editor.value ) {
					$select.val(editor.value);
				}
				$select.blur(function() {
					//$.cusconfirm({title:"保存修改的内容?"},function() {
						var editor_val = $select.val();
						$td.html("<span>"+ $select.find("option:selected").text() +"</span>");
						//修改td的title 悬浮显示内容为更改后的内容
						$td.attr("title",editor_val);
						for(var tIndex in trDataJSON) {
							if( tIndex == editor_field ) {
								trDataJSON[tIndex] = editor_val;
							}
						}
						trDataStr = JSON.stringify(trDataJSON);
						$tr.attr("data",trDataStr);
						//alert(trDataStr);
						var changes = null;
						/***
						 * 若值发生改变的话,则添加changes对象,
						 * 外部可以根据changes对象来判断是否发生改变来判断是否需要加载
						 */
						if( oldValue != editor_val ) {
							changes = {};
							changes[editor_field] = editor_val;
						}
						//runFunction(onEndEdit,tr_index,trDataJSON,changes);
						onEndEdit.apply(this,[tr_index,trDataJSON,changes,$td]);
					/*},function() {
						$td.html("<span>"+ primary_val +"</span>");
					});*/
				});
			}
			if( editor.type == "numbox" ) {
				var oldText = $td.text();
				$td.html("<select style='height:18px;font-size:12px;'></select>");
				var $select = $td.find("select");
				//阻止冒泡
				$select.click(function(event) {
					event.stopPropagation();
				});
				
				//需要重新激活焦点事件,上面的阻止冒泡阻止了获取焦点
				$select.trigger("focus");
				
				for( var oIndex = 0; oIndex < 10 ; oIndex++) {
					if( oldText == oIndex ) {
						$select.append("<option selected='selected' value='"+oIndex+"'>"+oIndex+"</option>");
					} else {
						$select.append("<option value='"+oIndex+"'>"+oIndex+"</option>");
					}
				}
				
				$select.blur(function() {
					//$.cusconfirm({title:"保存修改的内容?"},function() {
						var editor_val = $select.val();
						$td.html("<span>"+ $select.find("option:selected").text() +"</span>");
						//修改td的title 悬浮显示内容为更改后的内容
						$td.attr("title",editor_val);
						for(var tIndex in trDataJSON) {
							if( tIndex == editor_field ) {
								trDataJSON[tIndex] = editor_val;
							}
						}
						trDataStr = JSON.stringify(trDataJSON);
						$tr.attr("data",trDataStr);
						//alert(trDataStr);
						var changes = null;
						/***
						 * 若值发生改变的话,则添加changes对象,
						 * 外部可以根据changes对象来判断是否发生改变来判断是否需要加载
						 */
						if( oldText != editor_val ) {
							changes = {};
							changes[editor_field] = editor_val;
						}
						//runFunction(onEndEdit,tr_index,trDataJSON,changes);
						onEndEdit.apply(this,[tr_index,trDataJSON,changes,$td]);
					/*},function() {
						$td.html("<span>"+ primary_val +"</span>");
					});*/
				});
			}
			
		});
	
		//表格拉伸
		var tTD; // 用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题
		var tableDom = table[0];
		if( tableDom.rows.length > 0 ) {
			for (j = 0; j < tableDom.rows[0].cells.length; j++) {
				tableDom.rows[0].cells[j].onmousedown = function() {
					// 记录单元格
					tTD = this;
					if (event.offsetX > tTD.offsetWidth - 5) {
						tTD.mouseDown = true;
						tTD.oldX = event.pageX;
						tTD.oldWidth = tTD.offsetWidth;
					}
					// 记录Table宽度
					// table = tTD; while (table.tagName != ‘TABLE') table =
					// table.parentElement;
					// tTD.tableWidth = table.offsetWidth;
				};
				tableDom.rows[0].cells[j].onmouseup = function() {
					// 结束宽度调整
					if (tTD == undefined)
						tTD = this;
					tTD.mouseDown = false;
					tTD.style.cursor = 'default';
				};
				tableDom.rows[0].cells[j].onmousemove = function() {
					// 更改鼠标样式
					if (event.offsetX > this.offsetWidth - 10)
						this.style.cursor = 'col-resize';
					else
						this.style.cursor = 'default';
					// 取出暂存的Table Cell
					if (tTD == undefined)
						tTD = this;
					// 调整宽度
					if (tTD.mouseDown != null && tTD.mouseDown == true) {
						tTD.style.cursor = 'default';
						if (tTD.oldWidth + (event.pageX - tTD.oldX) > 0)
							tTD.width = tTD.oldWidth + (event.pageX - tTD.oldX);
						// 调整列宽
						tTD.style.width = tTD.width;
						tTD.style.cursor = 'col-resize';
						// 调整该列中的每个Cell
						tableDom = tTD;
						while (tableDom.tagName != 'TABLE')
							tableDom = tableDom.parentElement;
						for (j = 0; j < tableDom.rows.length; j++) {
							tableDom.rows[j].cells[tTD.cellIndex].width = tTD.width;
						}
						// 调整整个表
						// table.width = tTD.tableWidth + (tTD.offsetWidth –
						// tTD.oldWidth);
						//table.style.width = table.width; 
					}
				};
			} 
		}	
		//是否添加竖线,添加竖线之后,表格会隐藏掉超出部分
		if(bordered) {
			table.addClass("table-bordered");
			table.find("td").css("max-width","50px");
		}
		
		/***
		 * 取消默认的右击菜单事件
		 */
		
		if (window.Event)
			document.captureEvents && document.captureEvents(Event.MOUSEUP);
		function nocontextmenu() {
			event.cancelBubble = true;
			event.returnValue = false;
			return false;
		}
		function norightclick(e) {
			var e = e || window.event;
			if (window.Event) {
				if (e.which == 2 || e.which == 3)
					return false;
			} else if (event.button == 2 || event.button == 3) {
				event.cancelBubble = true;
				event.returnValue = false;
				return false;
			}
		}
		document.oncontextmenu = nocontextmenu; // for IE5+
		document.onmousedown = norightclick; // for all others
		
		/***
		 * 右击th,弹出选择,可隐藏/显示列
		 * */
		var thMenuArr = [{}];//存放th的文本以及是否已经隐藏的数组,{'text',isShow(true/false)}
		var isEmpty = true;//判断thMenuArr是否为空,初始化的时候用到
		table.find("th").mousedown(function(e) {
			var keycode = e.which;
			//右键点击
			if( keycode == 3 ) {
				e.preventDefault();
				$(".thMenu").remove();
				var $th = table.find("th");
				var thMenuHtml = "<div class='thMenu'>";
				//数组为空则初始化数组
				if(isEmpty) {
					$th.each(function(index,item) {
						var thText = $(item).text();
						if( thText != "" ) {
							var thObj = {};
							thObj[thText] = true;
							thMenuArr.push(thObj);
						}
					});
					isEmpty = false;
				}
				//遍历数组
				for(var i in thMenuArr) {
					var thMenuArrItem = thMenuArr[i];
					var iconClass = "glyphicon glyphicon-eye-open";
					for(var t in thMenuArrItem) {
						var isShow = thMenuArrItem[t];
						//如果是已经隐藏,则更换图标
						if( !isShow ) {
							iconClass = "glyphicon glyphicon-eye-close";
						}
						//拼接要添加的html
						thMenuHtml = thMenuHtml + "<div class='thMenuItem'><span class='"+iconClass+"'></span>"+t+"</div>";
					}
				}
				thMenuHtml = thMenuHtml + "</div>";
				table.append(thMenuHtml);
				$(".thMenu").css("top",e.offsetY+9+"px");
				$(".thMenu").css("left",e.clientX-25+"px");
				
				$(document).click(function() {
					$(".thMenu").remove();
				});
				//菜单项点击事件绑定
				$(".thMenuItem").unbind('click');
				$(".thMenuItem").click(function() {
					var clickText = $(this).text();
					var thMenuItemIndex = $(".thMenuItem").index(this);
					var $firstTh = table.find("tr").eq(0).find("th");
					$firstTh.each(function(index,item) {
						if($(item).text() == "") {
							thMenuItemIndex++;
						}
					});
					//遍历数组,把点击的那个text isShow标志更换
					for(var i in thMenuArr) {
						var thMenuArrItem = thMenuArr[i];
						for(var t in thMenuArrItem) {
							var isShow = thMenuArrItem[t];
							if( t == clickText ) {
								if(isShow) {
									table.find("tr").each(function(index,item) {
										$(item).find("td").eq(thMenuItemIndex).fadeOut();
										$(item).find("th").eq(thMenuItemIndex).fadeOut();
									});
								} else {
									table.find("tr").each(function(index,item) {
										$(item).find("td").eq(thMenuItemIndex).fadeIn();
										$(item).find("th").eq(thMenuItemIndex).fadeIn();
									});
								}
								isShow = !isShow;
								thMenuArrItem[t] = isShow;
							}
						}
					}
					
				});
			}
		});
		
		/***
		 * 客户端排序功能
		 */
		//先取消绑定,不然$.loader会没有等待时间
		table.find(".thClientSort").unbind("click");
		table.find(".thClientSort").click(function() {
			var allData = table.cusgrid("getData");
			var field = $(this).attr("data");
			var columnData = table.cusgrid("getColumnData",field);
			for(var i = 0;i<columnData.length;i++) {
				for(var j = i+1;j<columnData.length;j++) {
					if($(this).hasClass("downSort")) {
						if(columnData[i] < columnData[j]) {
							var temp = allData[i];
							allData[i] = allData[j];
							allData[j] = temp;
							var cDTemp = columnData[i];
							columnData[i] = columnData[j];
							columnData[j] = cDTemp;
						}
					} else {
						if(columnData[i] > columnData[j]) {
							var temp = allData[i];
							allData[i] = allData[j];
							allData[j] = temp;
							var cDTemp = columnData[i];
							columnData[i] = columnData[j];
							columnData[j] = cDTemp;
						}
					}
				}
			}
			/*for(var i in columnData) {
				alert(columnData[i]);
			}*/
			$(this).toggleClass("downSort");
			table.cusgrid("reload",{JSONData:allData,url:url/*传递url是为了记录下url*/});
			//刷新了过后JSONData设置为null,否则用户再次刷新的时候会还存在JSONData
			JSONData = null;
		});
		setTimeout("$.loader('hide');",500);
	};
	
	var gridAjax = function() {
		
		var dt = MathRand();
		
		//添加正在加载动画
		$.loader("show",{"cusMsg" : "请等待...","cusSize" : "sm"});
		
		if( JSONData ) {
			var data = {rows:JSONData};
			resolve(data);
		} else if( !url ) {
			
			var thStr = "";
			
			for( var cIndex in columns ) {
				var columns_item = columns[cIndex];
				
				//将需要添加的头部th,根据自定义参数columns进行拼接成字符串
				if( !table.find("thead").length > 0 && !columns_item.hidden) {
					thStr = thStr + "<th class='text-center'>" + columns_item.title + "</th>";
				}
				
			}
			
			//添加表头th
			if( thStr != "" ) {
				table.append("<thead><tr>" + thStr + "</tr></thead>");
			}
			
			setTimeout("$.loader('hide');",500);
		} else {
		
				if( url.indexOf("?") > 0 ) {
					url = url + "&dt="+dt;
				} else {
					url = url + "?dt="+dt;
				}
				//跟后台交互,默认使用post方式
				$.ajax({
					"type" : "post",
					"url" : url,
					"data" : queryParams,
					success : function(data) {
//						alert(JSON.stringify(data.rows));
						//后台默认查询出来的数据摆在rows中
//						runFunction(onLoadSuccess,data);
						onLoadSuccess.call(this,data);
						resolve(data);
				},
				error : function(XMLHttpRequest) {
					$.cusalert({
						"title" : "错误",
						"content": XMLHttpRequest.responseText.split("!")[0],
						"type" : "warning"
							});
					setTimeout("$.loader('hide');",500);
				}
			});
		}
	};
	
	var addObj = function() {
		
		window.top.dialog("add",dialogUrl,ifmNum,table.data("dlgHeight"),table.data("dlgWidth"));
		
	};
	
	//点击删除按钮
	var delObj = function() {
		
		if( $(".selected").length == 0 ) {
			$.cusalert({
				"title" : "错误",
				"content" : "请选择一条数据",
				"type"  : "WARNING"
			});
			
		} else {
			
			$.cusconfirm({title : "确定要删除吗"},function() {
				var selData = JSON.parse($(".selected").attr("data"));
				delAjax(selData[fieldId]);
			});
			
		}
		
			
	};
	
	//删除ajax
	var delAjax = function( objid ) {
		
		$.post(deleteUrl,{'objid':objid},
				
			function(data) {
			   if(data.success) {
				   $.cusalert({
						"title" :"成功",
						"content":"删除成功",
						"type":"success"
					});
					gridAjax();
					pageBtnVali();
			   } else {
					$.cusalert({
						"title" :"错误",
						"content":data.errorMsg,
						"type":"info"
					});
			   }
		});
		
	};
	
	var editObj = function() {
		
		if( $(".selected").length == 0 ) {
			$.cusalert({
				"title" : "错误",
				"content" : "请选择一条数据",
				"type"  : "WARNING"
			});
			
		} else {
			
			var selData = JSON.parse($(".selected").attr("data"));
			
			var urlIcon = "?";
			
			if( dialogUrl.indexOf("?") > 0 ) {
				urlIcon = "&";
			}
			
			var url = dialogUrl + urlIcon + "searchKey=" + JSON.stringify({"objid" : selData[fieldId]});
			window.top.dialog("edit",url,ifmNum,table.data("dlgHeight"),table.data("dlgWidth"));
			
		}
		
	};
	
	var cusgrid_methods = {
			
			init : function( options ) {
				return this.each(function() {
					
					var toolsBtn = [];
					
					if( toolsBtn.length == 0 ) {
						toolsBtn = [ {
							icon : 'glyphicon glyphicon-plus',
							text : '添加',
							auth : 'add',
							type : 'button',
							handler : function(){addObj();}
						}, {
							icon : 'glyphicon glyphicon-minus',
							text : '删除',
							auth : 'delete',
							type : 'button',
							handler : function(){delObj();}
						}, {
							icon : 'glyphicon glyphicon-pencil',
							text : '修改',
							auth : 'edit',
							type : 'button',
							handler : function(){editObj();}
						}, {
							icon : 'glyphicon glyphicon-print',
							text : '打印',
							auth : 'print',
							type : 'button',
							handler : function(){alert("请页面打印操作");}
						} ];
					}
					
					//添加当前页的隐藏input
					if( !$("#curpage").length > 0 ) {
						$(document.body).append("<input type='hidden' id='curpage' value='1'></input>");
					}
					
					//添加每页显示数量的隐藏input
					if( !$("#rows").length > 0 ) {
						$(document.body).append("<input type='hidden' id='rows' value='20'></input>");
					}
					
					var $this = $(this);
					
					var defaults = {
							toolsBtn : toolsBtn,
							singleSelected : true,
							pagination : true,
							toolsShow : true,
							bordered : false,
							searchRemember: false,
							queryParams : {
								"page" : $("#curpage").val(), 
								"rows" : $("#rows").val()
							},
							onLoadSuccess : function(data) {},
							onDblclick	: function(data) { editObj();},
							onEndEdit : function(rowIndex, rowData, changes,target) {}
					};
					
					if( options.addTools ) {
						options.addTools = $.merge(defaults.toolsBtn,options.addTools);
					}
					
					if( options.queryParams ) {
						$.extend(options.queryParams,defaults.queryParams);
					}
					
					settings = $.extend({},defaults,options);
					
					var toolsBtn	= 	settings.toolsBtn;
					var pagination	=	settings.pagination;
					var toolsShow	=	settings.toolsShow;
					
					bordered	=		settings.bordered;
					url 		= 		settings.url;
					columns 	= 		settings.columns;
					fieldId		= 		settings.fieldId;
					searchKey 	= 		settings.searchKey;
					dialogUrl 	= 		settings.dialogUrl;
					deleteUrl	=		settings.deleteUrl;
					queryParams	=		settings.queryParams;
					JSONData	=		settings.JSONData;
					onEndEdit	=		settings.onEndEdit;
					searchUrl	=		settings.searchUrl;
					onDblclick	=		settings.onDblclick;
					table		=		$this;
					
					//对话框的高度和宽度,不设置默认值是因为在dialog插件中已经设置了.
					table.data("dlgHeight",settings.dlgHeight);
					table.data("dlgWidth",settings.dlgWidth);
					
					gridAjax();
					onLoadSuccess	=	settings.onLoadSuccess;
					singleSelected	=	settings.singleSelected;
					
					//给表格添加bootstrap的布局
					table.wrap("<div class='container-fluid custabContainer'></div>");

					//添加bootstrap样式
					table.addClass("table table-striped table-hover custab");

					if( toolsShow ) {
						//添加工具栏
						table.before("<nav id='tools' class='navbar navbar-default navbar-fixed-top' role='navigation' ></nav>");
						table.parent(".container-fluid").before("<div id='hiddenTools'></div>");
						
						var tools = $("#tools");
						
						//$("#hiddenTools").css("height",$("#tools").css("height"));
						$("#hiddenTools").css("height","49px");
						/*alert("clientHeight:" + obj.clientHeight);
						alert("scrollHeight:" + obj.scrollHeight);
						alert("offsetHeight:" + obj.offsetHeight);*/
						//有滚动条时工具栏宽度缩小
						setTimeout("if( $('.container-fluid')[0].scrollHeight > $('.container-fluid')[0].clientHeight )$('#tools').css('width','95%');",100);
						
						//工具栏添加bootstrap组件
						tools.append("<div class='navbar-header'>"
										+ "<button type='button' class='navbar-toggle' data-toggle='collapse' data-target='#toolsBtn'>"
										+ "<span class='sr-only'>Toggle navigation</span>"
										+ "<span class='icon-bar'></span>"
										+ "<span class='icon-bar'></span>"
										+ "<span class='icon-bar'></span>"
										+ "</button>"
										+ "<a class='navbar-brand' href='#'><span class='glyphicon glyphicon-leaf'></span> <b>工具栏</b></a>"
										+ "</div>"

										+ "<div class='collapse navbar-collapse' id='toolsBtn'>"
										+ "</div>");
						
						//设置自定义工具栏按钮
						if( toolsBtn ) {
							
							for( var tIndex in toolsBtn ) {
								
								var toolsBtn_item = toolsBtn[tIndex];
								
								//配合后台的权限设置,(与框架本身无关)
								//页面操作权限校验,判断父页面是否有获取权限标志的函数
								if("getOpAuth" in window.parent) {
									
									//获取权限的表示
								    var opAuth = window.parent.getOpAuth();
								    //alert("opAth="+opAuth);
								    //设置创建权限的二进制码
								    var CREATE = 1 << 0;
								    
								    //设置读写权限的二进制码
									var WRITE = 1 << 1;
									
									//设置删除权限的二进制码
									var DELETE = 1 << 2;
									
									//设置打印权限的二进制码
									var PRINT = 1 << 3;
									
									//与操作判断,若有创建权限,则显示创建按钮
									if(!(opAuth & CREATE)&&toolsBtn_item.auth=='add') {
										continue;
									}
								
									//与操作判断,若有修改权限,则显示修改按钮
									if(!(opAuth & WRITE)&&toolsBtn_item.auth=='edit') {
										continue;
									}
								
									//与操作判断,若有删除权限,则显示删除按钮
									if(!(opAuth & DELETE)&&toolsBtn_item.auth=='delete') {
										if( columns ) {
											for(var i in columns) {
												var columns_item = columns[i];
												if( columns_item.field == 'action' ) {
													//如果已经删除了详细按钮
													if( columns_item.removeAction == 'detail' ) {
														columns.splice(i,1);
													} else {
														//console.log("去掉删除按钮1");
														//如果2个按钮都在,则添加删除删除按钮
														columns_item.removeAction = 'del';
													}
												}
											}
										}
										continue;
									}
									
									//与操作判断,若有打印权限,则显示打印按钮
									if(!(opAuth & PRINT)&&toolsBtn_item.auth=='print') {
										continue;
									}
								 } 
								
								if( toolsBtn_item.type == "button" ) {
									if( !$("#toolsBtn ul").length > 0 ) {
										$("#toolsBtn").append("<ul class='nav navbar-nav'></ul>");
									}
									//alert(toolsBtn_item.handler);
									$("#toolsBtn ul.nav").append("<li><a href='#'><i class='" + toolsBtn_item.icon + "'></i> " + toolsBtn_item.text + "</a></li>");
									$("#toolsBtn ul.nav").children("li:last-child").click(toolsBtn_item.handler);
								}
								
								
								
								if (toolsBtn_item.type == "search") {
									
									//查询功能实现
									var selBarOptions = toolsBtn_item.selBarOptions;
									
									$("#toolsBtn").append("<div class='input-group pull-right' style='width:30%;margin-top:11px;margin-right:2px;'>"
															+ "<div class='input-group-btn'>"
															+ "<button type='button' class='btn btn-default dropdown-toggle btn-sm' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><b>" +selBarOptions[0].text+ ":  </b><span class='caret'></span></button>"
															+ "<ul class='dropdown-menu selectVal'>"
															+ "<li key='all'><a href='#'>还原</a></li>"
															+ "<li role='separator' class='divider'></li>"
															+ "</ul>"
															+ "</div>"
															+ "<input id='inputVal' type='text' class='form-control input-sm'>"
															+ "<div class='input-group-btn'>"
															+ "<button id='searchBtn' type='button' class='btn btn-default btn-sm'><b><i class='glyphicon glyphicon-search'></i> 搜索</b></button>"
															+ " </div></div>");
									
									for( var sbIndex in selBarOptions) {
										var selBarOptions_item = selBarOptions[sbIndex];
										//alert(selBarOptions_item.text);
										$("#toolsBtn .input-group .selectVal").append("<li key='" + selBarOptions_item.value + "'><a href='#'>" +  selBarOptions_item.text + "</a></li>");
									}
									
//									var liChange = false;
									var selectVal = selBarOptions[0].value;
									var $input = $("#toolsBtn .input-group input");
									
									$("#toolsBtn .input-group .selectVal li").click(function() {
										
										var $li = $(this);
										if( $li.attr("key")=="all" ) {
											$input.val("");
											selectVal = selBarOptions[0].value;
											$("#toolsBtn .input-group .dropdown-toggle b").text(selBarOptions[0].text+":");
											delete queryParams.inputVal;
											delete queryParams.selectVal;
											gridAjax();
											setTimeout(pageBtnVali,500);
										} else {
											$("#toolsBtn .input-group .dropdown-toggle b").text($li.text() + ":");
//											liChange = true;
											selectVal = $li.attr("key");
										}
										
									});
									
									$("#toolsBtn .input-group #searchBtn").click(function() {
										if( $input.val().replace(/^\s+|\s+$/g, "") != "" ) {
											//清空以前查询过的参数
											queryParams = {};
											var tempUrl = url;
											//若有查询地址,针对修改案件的,易出bug 目前没测出
											if( searchUrl ) {
												url = searchUrl;
												queryParams[selectVal] = $input.val();
											} else {
												queryParams.inputVal = $input.val();
												queryParams.selectVal = selectVal;
											}
//											alert(JSON.stringify(queryParams));
											//若需要搜索记忆功能
											if( settings.searchRemember ) {
												var curCkData = table.cusgrid("getChecked") || [];
												//将搜索的数据存入table对象的一个缓存的属性中
												table.data("checked",curCkData);
											}
											gridAjax();
											setTimeout(pageBtnVali,500);
											url = tempUrl;
											
										} else {
											$.cusalert({"title":"警告","content":"请输入查询信息","type":"warning"});
										}
										
									});
									$(document.body).keydown(function(evt) {
										if(evt.which == 13 && $("#searchBtn").length > 0) {
											$("#searchBtn").trigger("click");
										}
									});
								}
								
								//过滤下拉框
								if( toolsBtn_item.type == "filter" ) {
									
									var btnFilterText = "过滤";
									var btnFilterUrl = toolsBtn_item.url;
									var btnFilterCustom = toolsBtn_item.valueArr;
									var onChange = toolsBtn_item.onChange;
									var onCancelFilter = toolsBtn_item.onCancelFilter;
									var isCancel = toolsBtn_item.isCancel;
									
									if( toolsBtn_item.text ) {
										btnFilterText = toolsBtn_item.text;
									}
									
									var btnFilterAppendStr = "<li class='dropdown filter'>"
										+"<a href='##' data-toggle='dropdown' class='dropdown-toggle' role='button' id='selFilter' key='-100'><i class='glyphicon glyphicon-filter'></i> "+btnFilterText+"<b class='caret'></b></a>"
										+"<ul style='overflow:auto;max-height:350px;' class='dropdown-menu' role='menu' aria-labelledby='selFilter'>"
										+"</ul>"
										+"</li>";
									
									if( isCancel ) {
										btnFilterAppendStr = "<li class='dropdown filter'>"
											+"<a href='##' data-toggle='dropdown' class='dropdown-toggle' role='button' id='selFilter' key='-100'><i class='glyphicon glyphicon-filter'></i> "+btnFilterText+"<b class='caret'></b></a>"
											+"<ul style='overflow:auto;max-height:350px;' class='dropdown-menu' role='menu' aria-labelledby='selFilter'>"
											+"<li role='presentation' key='cancelFilter'><a href='##'>取消过滤</a></li>"
											+"<li role='separator' class='divider'></li>"
											+"</ul>"
											+"</li>";
									}
									
									$("#toolsBtn ul.nav").append(btnFilterAppendStr);
									
									//通过url获取过滤的下拉列表
									if( btnFilterUrl ) {
										$.get(btnFilterUrl,function(data) {
											//alert(JSON.stringify(data));
											for(var dIndex in data) {
												var procItem = data[dIndex];
												$("#toolsBtn").find(".filter .dropdown-menu").append("<li role='presentation' key='" + procItem.id + "'><a href='##'>" + procItem.name + "</a></li>");
											}
											
											//切换过滤条件时
											$("#toolsBtn").find(".filter .dropdown-menu li").click(function() {
												var $li = $(this);
												var key = $li.attr("key");
												if( key == 'cancelFilter' ) {
													$("#selFilter").html("<i class='glyphicon glyphicon-filter'></i> "+btnFilterText+"<b class='caret'></b>");
													$("#selFilter").attr("key","-100");
													if( onCancelFilter ) {
														onCancelFilter.call();
													}
												} else {
													var preValue = {};
													var selValue = {};
													preValue.text = $("#selFilter").text();
													preValue.value = $("#selFilter").attr("key");
													selValue.text = $li.text();
													selValue.value= key;
													if(onChange) {
														onChange.apply(this,[preValue,selValue]);
													}
													$("#selFilter").html("<i class='glyphicon glyphicon-filter'></i> "+$li.text()+"<b class='caret'></b>");
													$("#selFilter").attr("key",$li.attr("key"));
												}
											});
											
										});
									}
									
									//通过自定义的下拉菜单过滤
									if( btnFilterCustom ) {
										for(var bfIndex in btnFilterCustom) {
											var customMenu = btnFilterCustom[bfIndex];
											$("#toolsBtn").find(".filter .dropdown-menu").append("<li role='presentation' key='" + customMenu.value + "'><a href='##'>" + customMenu.text + "</a></li>");
										}
										
										//切换过滤条件时
										$("#toolsBtn").find(".filter .dropdown-menu li").click(function() {
											var $li = $(this);
											var key = $li.attr("key");
											if( key == 'cancelFilter' ) {
												$("#selFilter").html("<i class='glyphicon glyphicon-filter'></i> "+btnFilterText+"<b class='caret'></b>");
												$("#selFilter").attr("key","-100");
												if( onCancelFilter ) {
													onCancelFilter.call();
												}
											} else {
												var preValue = {};
												var selValue = {};
												preValue.text = $("#selFilter").text();
												preValue.value = $("#selFilter").attr("key");
												selValue.text = $li.text();
												selValue.value= key;
												if(onChange) {
													onChange.apply(this,[preValue,selValue]);
												}
												$("#selFilter").html("<i class='glyphicon glyphicon-filter'></i> "+$li.text()+"<b class='caret'></b>");
												$("#selFilter").attr("key",$li.attr("key"));
											}
										});
									}
								}
								
							}
							
						}
					}
					
					
					if( pagination ) {
						
						var localObj = window.location;

						var contextPath = localObj.pathname.split("/")[1];

						var basePath = localObj.protocol+"//"+localObj.host+"/"+contextPath;
						
						//添加分页
						table.after("<!--[if lt IE 9]><script src='"+basePath+"/js/bootstrap/respond.js'></script>"
										+ "<![endif]-->"
										+ "<nav id='page' class='navbar navbar-default navbar-fixed-bottom' role='navigation'></nav>");

						var page = $("#page");
						
						//添加一个隐藏的div,在page的底层,占位置用的,防止数据被page栏给遮挡住
						table.parent(".container-fluid").after("<div id='hiddenPage'></div>");
						$("#hiddenPage").css("min-height","31px");
						
						//有滚动条时分页栏宽度缩小
						setTimeout("if( $('.container-fluid')[0].scrollHeight > $('.container-fluid')[0].clientHeight )$('#page').css('width','95%');",100);
						//分页添加bootstrap组件
						page.append("<div class='navbar-header'>"
										+ "<button type='button' class='navbar-toggle' data-toggle='collapse' data-target='#bs-example-navbar-collapse-2'>"
										+ "<span class='sr-only'>Toggle navigation</span>"
										+ "<span class='icon-bar'></span>"
										+ "<span class='icon-bar'></span>"
										+ "<span class='icon-bar'></span>"
										+ "</button>"
										/*+ "<a class='navbar-brand' href='#'><span class='glyphicon glyphicon-leaf'></span> <b>page</b></a>"*/
										+ "</div>"

										+ "<div class='collapse navbar-collapse' id='bs-example-navbar-collapse-2'>"
										+ "<ul class='nav navbar-nav'>"
										+ "<li class='dropup'>"
										+ "<a href='##' data-toggle='dropdown' class='dropdown-toggle' id='seeRow'><i class='glyphicon glyphicon-tag'></i> <b id='seeNum'>20</b><b class='caret'></b></a>"
										+ "<ul class='dropdown-menu' role='menu' aria-labelledby='pagetotal' id='seeRowMenu'>"
										+ "<li role='presentation'><a href='##'>20</a></li>"
										+ "<li role='presentation'><a href='##'>50</a></li>"
										+ "<li role='presentation'><a href='##'>100</a></li>"
										+ "</ul>"
										+ "</li>"
										+ "<li><a href='#' id='firstPage'><i class='glyphicon glyphicon-fast-backward'></i> 首页</a></li>"
										+ "<li><a href='#' id='prePage'><i class='glyphicon glyphicon-backward'></i> 上一页</a></li>"
										+ "<li><a href='#' id='nextPage'><i class='glyphicon glyphicon-forward'></i> 下一页</a></li>"
										+ "<li><a href='#' id='lastPage'><i class='glyphicon glyphicon-fast-forward'></i> 末页</a></li>"
										+ "<li><a href='#' id='reload'><i class='glyphicon glyphicon-refresh'></i> 刷新</a></li>"
										+ "<li><input type='text' id='seeCurPage'></input></li>"
										+ "<li><a href='#' id='toPage'><span class='glyphicon glyphicon-send'></span> <b>GO</b></a>"
										+ "	</li>" 
										+ "<li><div id='total'></div></li></ul>" + "</div>");
						
						//加载完毕,关闭载入动画
						//var timeout = setTimeout("$.loader('hide');",500);
						
						$("#reload").click(function() {
							
							table.find("tbody").remove();
							gridAjax();
							pageBtnVali();
						});
						
						$("#seeRowMenu").find("li").click(function() {
							var value = $(this).text();
							$("#rows").val(value);
							$("#seeRow").find("#seeNum").text(value);
							queryParams.rows = $("#rows").val();
							gridAjax();
							setTimeout(pageBtnVali,500);
						});
						
						$("#firstPage").click(function() {
							$("#curpage").val(1);
							queryParams.page = $("#curpage").val();
							gridAjax();
							pageBtnVali();
						});
						
						$("#lastPage").click(function() {
							$("#curpage").val(totalPage);
							queryParams.page = $("#curpage").val();
							gridAjax();
							pageBtnVali();
						});
						
						$("#nextPage").click(function() {
							
							var curPage = Number($("#curpage").val());
							
							if( curPage + 1 > totalPage ) {
								/*$.cusalert({
									title : "警告",
									content: "已经是最后一页",
									type : "warning"
								});*/
								return false;
							} else {
								$("#curpage").val( ++curPage );
								queryParams.page = $("#curpage").val();
								gridAjax();
								pageBtnVali();
							}
							
						});
						
						$("#prePage").click(function() {
							
							var curPage = Number($("#curpage").val());
							
							if( curPage == 1 ) {
								/*$.cusalert({
									title : "警告",
									content: "已经是第一页",
									type : "warning"
								});*/
								return false;
							} else {
								$("#curpage").val( --curPage );
								queryParams.page = $("#curpage").val();
								gridAjax();
								pageBtnVali();
							}
							
						});
						
						$("#toPage").click(function() {
							
							var inputPage = Number($("#seeCurPage").val());
							var re = /^[0-9]+.?[0-9]*$/;
							
							if( inputPage > totalPage ) {
								$.cusalert({
									"title" : "警告",
									"content" : "请输入小于" + totalPage + "的数",
									"type" : "warning"
								});
							} else if( !re.test(inputPage) ) {
								
								$.cusalert({
									"title" : "警告",
									"content" : "请输入数字",
									"type" : "warning"
								});
								
							} else if( !inputPage > 0 ) {
								
								$.cusalert({
									"title" : "警告",
									"content" : "请输入大于0的页码",
									"type" : "warning"
								});
								
							} else {
								$("#curpage").val($("#seeCurPage").val());
								queryParams.page = $("#curpage").val();
								gridAjax();
								pageBtnVali();
							}
							
						});
						
						setTimeout(pageBtnVali,500);
						
					}
					
					
				});
		},
		
		reload : function( options ) {
			/*if( options ) {
				queryParams = options.queryParams;
				url = options.url;
				JSONData = options.JSONData;
			}*/
			//alert(JSON.stringify(options));
			if( options ) {
				if( options.queryParams ) {
					queryParams = options.queryParams;
				}
				//如果同时有url跟JSONData 客户端排序需要,
				//因为排序完了之后还是要根据url来搜索
				if( options.url && options.JSONData ) {
					JSONData = options.JSONData;
					url = options.url;
				} else if( options.url ) {
					JSONData = null;
					url = options.url;
				} else if( options.JSONData ) {
					url = null;
					JSONData = options.JSONData;
				}
			}
			table.find("tbody").remove();
			gridAjax();
			//edit by hjj 2015-11-14 在添加或者删除数据时,正好页数发生变化处理方法.
			//pageBtnVali();
			setTimeout(pageBtnVali,100);
			
		},
		
		removeParam : function( array ) {
			if( Object.prototype.toString.call(array) != "[object Array]" ) {
				$.error("Please Make Sure The Param Typeof Array!");
			} else {
				if( array.length > 0 ) {
					for(var aIndex in array) {
						var item = array[aIndex];
						if( item in queryParams ) {
							delete queryParams[item];
						}
					}
				} else {
					$.error("The Param length : 0!");
				}
			}
		},
		
		getSelected : function() {
			if( $(".selected").length == 0 ) {
				return null;
			} else {
				return JSON.parse($(".selected").eq(0).attr("data"));
			}
		},
		
		getChecked : function() {
			
			if( $(".checked").length == 0 ) {
				return null;
			} else {
				var ckData = [];
				$(".checked").each(function(index,item) {
					ckData.push(JSON.parse($(item).closest("tr").attr("data")));
				});
				return ckData;
			}
			
		},
		
//		getAllChecked : function() {
//			var allCkData = table.data("checked");
//			return allCkData;
//		},
		
		getData : function() {
			return table.data("allData");
		},
		
		getColumnData : function( field ) {
			
			if( !field ) {
				$.error( 'Please pass a correct argument description field!' );
			} else {
				
				var columnData = [];
				var allData = table.data("allData");
				
				for( var aIndex in allData ) {
					var data_item = allData[aIndex];
					for( var dIndex in data_item ) {
						var data_item_value = data_item[dIndex];
						if( dIndex == field ) {
							columnData.push(data_item_value);
						}
					}
				}
				
				return columnData;
				
			}
			
		}
	};
	
	$.fn.cusgrid = function() {
		
		var method = arguments[0];
		
		if( cusgrid_methods[method] ) {
			method = cusgrid_methods[method];
			arguments = Array.prototype.slice.call(arguments,1);
		} else if( typeof(method) == 'object' || !method ) {
			method = cusgrid_methods.init;
		} else {
			$.error( 'Method : ' +  method + ' does not exist on jQuery.cusgrid!' );
            return this;
		}
		
		return method.apply(this, arguments);
	};
	
})(jQuery);
