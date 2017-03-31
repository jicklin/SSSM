/***
 * 
 * @function 自动填充数据
 * @author hjj
 */
jQuery.extend( {
	
	
	/************************************************************************
	 * 
	 * @function 时间格式化,如此用便于外部能够重写这个方法,不同页面的时间格式化不同
	 */
	formatDate : function (dtime) {
		if( dtime ) {
			if(typeof dtime == 'object')
				dtime = dtime.year + 1900 + "-" + dtime.month + 1 + "-" + dtime.date;
			else 
				dtime = dtime.split("T")[0];
		}
		return dtime;
	},
	
	formatYearDate : function (dtime) {
		if( dtime ) {
			dtime = dtime.split("-")[0];
		}
		return dtime;
	},
	
	/************************************************************************
	 * 
	 * @function 自动填充数据
	 * @tip 会识别带"."的id,先截取"."之后的字符串,如果页面存在这样的id标签则赋值,若不存在,
	 * 		则赋值整个带"."的字符串
	 */
	autofill : function(options) {
		//alert(JSON.stringify(options));
		//遍历data
		for ( var key in options) {

			var itemObj = options[key];

			if (itemObj != null) {
				
				//若为数组，取第一个值
				if ( $.type(itemObj) == "array" ) {
					itemObj = itemObj[0];
				}
				
				//临时做法
				if ( $("#"+key).length > 0 ) {
					
					if ( $("#"+key).is("span") ) {
						
						//若为时间,对时间进行格式化
						if ($("#"+key).hasClass("date")) {
							if($("#"+key).hasClass("year")) {
								options[key] = $.formatYearDate(options[key]);
							} else {
								options[key] = $.formatDate(options[key]);
							}
						}
						
						$("#"+key).text(options[key]);
						
					} else {
						
						//若为时间,对时间进行格式化
						if ($("#"+key).hasClass("date")) {
							if($("#"+key).hasClass("year")) {
								options[key] = $.formatYearDate(options[key]);
							} else {
								options[key] = $.formatDate(options[key]);
							}
						}
						
						$("#"+key).val(options[key]);
						
					}
					
				}
				
				for ( var itemkey in itemObj ) {
					var JQObj = null;
					var IDStr = "";
//					alert($("#"+key + "\\." + itemkey).length);
					//判断页面是否存在这样的id对应的jQuery对象
					if ( $("#"+key + "\\." + itemkey).length > 0 ) {
						IDStr = "#"+key + "\\." + itemkey;
					} else if ( $("#"+itemkey).length > 0 ) {
						IDStr = "#"+itemkey;
					}
					
					//若存在,则进行数据填充
					if ( IDStr != "" ) {
						JQObj = $(IDStr);
						var value = itemObj[itemkey];
//						alert(IDStr + "=" + value);
						
						//若为时间,对时间进行格式化
						if (JQObj.hasClass("date")) {
							if(JQObj.hasClass("year")) {
								value = $.formatYearDate(value);
							} else {
								value = $.formatDate(value);
							}
						}
						
						//若已经赋值的话,则不再赋值.防止覆盖
						if ( JQObj.is("span") /*&& JQObj.text() == ""*/ /*&& value != null*/ && value != JQObj.text() ) {
							//null值显示为""
							if( !value ) {
								value = "";
							}
							JQObj.text(value);
							
						} else if ( JQObj.is("div") && value != null &&
									JQObj.is(":has(input[type='checkbox'])")) 
						{//checkbox处理
//							alert(value);
							var checkbox = JQObj.find("input[type='checkbox']");
							
							checkbox.each(function( index, item ) {
								
								if( $.type(value) == "string" && value.indexOf(";") > 0 ) {
									
									var itemStr = value.split(";");
										
									for(var i in itemStr) {
										if( itemStr[i].indexOf("&") > 0 ) {
											if( itemStr[i].split("&")[0] == $(item).val() ) {
												$(item).attr("checked",true);
												$(item).next("input").val(itemStr[i].split("&")[1]);
											}
										} else {
											if( itemStr[i] == $(item).val() ) {
												$(item).attr("checked",true);
											}
										}
									}
								} else if ( $.type(value) == "string" && value.indexOf("/") > 0 ) {
									var itemStr = value.split("/");
									
									for(var i in itemStr) {
										if( itemStr[i].indexOf("&") > 0 ) {
											if( itemStr[i].split("&")[0] == $(item).val() ) {
												$(item).attr("checked",true);
												$(item).next("input").val(itemStr[i].split("&")[1]);
											}
										} else {
											if( itemStr[i] == $(item).val() ) {
												$(item).attr("checked",true);
											}
										}
									}
								} else {
									if( $.type(value) == "string" && value.indexOf("&") > 0 ) {
										if( value.split("&")[0] == $(item).val() ) {
											$(item).attr("checked",true);
											$(item).next("input").val(value.split("&")[1]);
										}
									} else {
										if( value == $(item).val() ) {
											$(item).attr("checked",true);
										}
									}
								}
							});
						
						//图片处理,针对签名
						} else if ( JQObj.is("img") ) {
							
							var imgID = JQObj.attr("id");
							
							//还未赋值前的jquery对象的值,没有权限时设置为true
							var auth = JQObj.val();
							
							//没有签名信息,有权限时
							if( value == null && !auth) {
								
								JQObj.replaceWith("<a id='"+imgID+"' href='javascript:void(0);'>点击签名</a>");
							
							//有签名信息时
							} else if ( value != null ) {
								
								var dt = "";
								
								for ( var i = 0; i < 6; i++) {
									dt += Math.floor(Math.random() * 10);
								}
								
								JQObj.val(value);
								
								JQObj.attr("src","getSignImg.action?dt="+dt+"&objid="+$("#objid").val()+"&signImgName="+value);
							
							//没有签名信息且没有权限时
							} else if( value == null && auth) {
								
								JQObj.replaceWith("<span id='"+imgID+"'></span>");
							
							}
							
							var mouseFlag = true;
							 
							$("#"+imgID).mouseover(function() {
								
								mouseFlag = false;
								
							});
							
							
							if( !auth ) {
								
								$("#"+imgID).bind('click',function(e) {
//									alert(imgID);
									$.signature(e,mouseFlag,$(this));
								});
							}
							
							
						} else if ( value == null ) {
							
							JQObj.val("");
							
						} else if ( JQObj.is("select") ) {
							
							JQObj.val(value);
							
						} else {
							JQObj.val(value);
						}
					}
					
				}

			}

		}
	},
	
	
	/************************************************************************
	 * 
	 * @function 签名,在某个区域的点击事件中添加此方法会弹出个div 手写签名并且自动保存
	 * @param e 事件  
	 * 	      mouseFlag 鼠标判定值,判定鼠标是否点击在某个区域  
	 *        JQImg 图片的Jquery对象
	 */
	signature : function( e, mouseFlag, JQImg) {
		var intX;
		
		var intY;
		
		if(e == null)
		{
			//当没收到时用window.event IE与Opera支持的
			e = window.event;
		} 
		
		if(e.pageX || e.pageY)
		{
			intX=e.pageX; intY=e.pageY;
		}
		else if(e.clientX || e.clientY)
		{
		    if(document.documentElement.scrollTop)
			{
		        intX=e.clientX+document.documentElement.scrollLeft;
		        intY=e.clientY+document.documentElement.scrollTop;
		    }
		    else
			{
		        intX=e.clientX+document.body.scrollLeft;
		        intY=e.clientY+document.body.scrollTop;
		    }
		}
		 $(document.body).append('<div id="follower" style="position:absolute;background-color:white;"></div>');
		 $("#follower").css({width:400,height:150,top:intY-175,left:intX-200});
		 $("#follower").html("<fieldset>"
				 			+ "<legend style='font-size:15px;color:#ccc;'>签名区域</legend>"
							+ "<div id='signature'></div>"
							+ "</fieldset>"
							+ "<button id='uploadSign' style='margin:0.5em 0.5em 0.5em 0.5em'>确认提交</button>"
							+ "<button id='reset' style='margin:0.5em 0.5em 0.5em 0.5em'>重写</button>");
		 
		 
		 $("#follower").mouseover(function() {
			 mouseFlag = false;
		 });
		 
		 $("#follower").mouseout(function() {
			 mouseFlag = true;
		 });
		 
		 
		 $(document).click(function() {
			 if( mouseFlag ) {
				 
				 $("#follower").remove();
				 
				 mouseFlag = false;
				 
				 JQImg.bind('click',function(e) {
//						alert(imgID);
						$.signature(e,mouseFlag,$(this));
				});
				 
			 }
			
		 });
		 
		 //重写
		 $("#reset").bind('click', function(e){
			$sigdiv.jSignature('reset');
		 });
		 
		 var $sigdiv = $("#signature").jSignature({'UndoButton':true});
		
		 // 点击按钮
		 $("#uploadSign").bind('click', function(e){

			// 取得所画的模板 type array
			var data = $sigdiv.jSignature('getData', 'image');
			var objid = $("#objid").val();
			var approvalFlag = $("#approvalFlag").val();
			
			$.post('uploadSign.action',{'objid' : objid, 'base64Data' : data[1], 'approvalFlag' : approvalFlag, 'signImgName' : JQImg.val()},function(data) {
				if( data.success ) {
					$("#follower").remove();
					var dt = MathRand();
					JQImg.replaceWith("<img id='"+JQImg.attr("id")+"' onclick='javascript:$.signature(e,"+mouseFlag+",$(this));' value="+data.data+" alt='负责人签名' src='getSignImg.action?dt="+dt+"&objid="+objid+"&signImgName="+data.data+"&approvalFlag="+approvalFlag+"' title='负责人签名' style='width:100px;' class='submitData'>");
//					alert($("#"+imgID).val());
//					window.location.reload();
//					alert(JQImg.length);
//					$("#"+JQImg.attr("id")).bind('click',function(e) {
//						$.signature(e,mouseFlag,$("#"+JQImg.attr("id")));
//					});
				} else {
					alert(data.errorMsg);
					$("#follower").remove();
				}
			});
		 });
	}

});