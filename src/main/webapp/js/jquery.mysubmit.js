/**
 * @function 自动验证提交表单
 * @author hjj 
 */
(function($) {
	
$.fn.extend( {
	
	/************************************************************************
	 * 
	 * @function 提交 
	 * @param options type object
	 * @tip 如果有多个对象提交,页面上请使用带"."的id表示多个对象,方法会自动识别并且提交,
	 * 		后台必须提供对应的对象名,以便struts2能够setProperty正确. 
	 */
	mysubmit : function( options ) {
	
		/*********************************************
		 * 获取元素已经绑定的事件,return object
		 */
		var obEvt =  $._data($(this)[0], "events");
		
		/*********************************************
		 *若已经绑定点击事件,则解绑,防止绑定多个点击事件 
		 */
		if(( obEvt && obEvt["click"] )) {
			$(this).unbind("click");
		}
		
		String.prototype.endWith = function(str) {
			var reg=new RegExp(str+"$");     
			return reg.test(this.trim());        
		};
		
		//IE8 下不支持trim
		String.prototype.trim = function () {  
		    return this.replace(/(^\s*)|(\s*$)/g, "");  
		};  
		
		/**********************************************
		 * 所有的非空选项后面添加(*)号
		 */
		if($(".notnull").length > 0) {
			$(".notnull").each(function(index,item) {
				var orgText = $(item).html();
				var tempText = orgText.trim();
//				console.log(orgText.indexOf("(*)"));
				if(orgText.indexOf("(*)") < 0) {
					if(orgText.endWith(":")) {
						var orgTextArr = orgText.split(":");
						orgText = orgTextArr[0]+"(*) :"+orgTextArr[1];
						$(item).html(orgText);
					} else {
						$(item).html(orgText+"(*)");
					}
				}
			});
		}
		
		$(this).click(function() {
			
			/****************************
			 * 正数正则表达式
			 */
			var regInt = /^(-|\+)?\d+$/;
			
			/****************************
			 * 手机正则表达式
			 */
			var regPhone = /^0?(13[0-9]|15[012356789]|18[01236789]|14[57])[0-9]{8}$/;
			
			/****************************
			 * double正则表达式
			 */
			var regDouble	= /^\d+(\.\d+)?$/;
			
			var defaults = [];
			var defaultsArr = [];
			var message = "";
			
			/*****************************
			 * 对象,里面的参数是验证所需要的
			 */
			var intvalidate = {
					"selector" : "integer",
					"message" : "必须为整数\n",
					"handle" : function(value) {
								return !regInt.test(Number(value));
								}
			};
			
			var nullvalidate = {
					"selector" : "notnull",
					"message" : "不能为空\n",
					"handle" : function(value) {
								return $.trim(value).length == 0;
								}
			};
			
			var phonevalidate = {
					"selector" : "phone",
					"message" : "填写不正确\n",
					"handle" : function(value) {
								return !regPhone.test(value);
								}
			};
			
			var doublevalidate = {
					"selector"	:	"double",
					"message"	:	"数值不正确！",
					"handle"	:	function(value){
										return !regDouble.test(value)&&value != "";
										}
									};
			
			defaultsArr.push(intvalidate.selector);
			defaultsArr.push(nullvalidate.selector);
			defaultsArr.push(phonevalidate.selector);
			defaultsArr.push(doublevalidate.selector);
			defaults.push(intvalidate);
			defaults.push(nullvalidate);
			defaults.push(phonevalidate);
			defaults.push(doublevalidate);
			
			//若含有额外的自定义验证法则,会一起得到验证
			if( options.extravali ) {
				//defaults = $.extend( {} , defaults, options.extravali);
				var extravali = options.extravali;
				
				for(var j =0; j < extravali.length; j++) {
					
//					alert($.inArray(extravali[j].selector, defaultsArr));
					//若有与默认的验证器重复,则覆盖
					if( $.inArray(extravali[j].selector, defaultsArr) >= 0) {
						
						defaults.splice($.inArray(extravali[j].selector, defaultsArr), 1);
					
					}
					
				}
				
				//合并默认的验证数组和自定义添加的数组
				$.merge( defaults,options.extravali );
			}
			
//			alert(JSON.stringify(defaults));
			
			for(var i =0;i < defaults.length; i++) {
				var itmMsg = "";
				itmMsg = validate( defaults[i].selector, defaults[i].handle );
				if(itmMsg != "") {
					itmMsg = itmMsg + defaults[i].message;
				}
				
				message = message+itmMsg;
			}
			
			//错误信息不为空,则打印出错误的信息 
			if(message != "") {
				//alert(message);
				$.cusalert && $.cusalert({title:"失败",content:message,type:"error"});
				$.cusalert || alert(message);
			} else {
				
				//若是提交的表单,可以直接把表单的id作为参数传递过来,然后做表单的处理
				if ( options.formId ) {
					
					/***
					 * 暂时还没写,不影响
					 */
					
				} else if( $(".submitJSON").length > 0 ) {
					/***
					 * 
					 * 后台action 必须提供一个String型成员变量jsonStr,获取参数用
					 * 前台的标签必须要有name值,遵循规则对象名称+数据下标,识别第几条数据
					 * id值必须遵循规则 对象名称+数据下标+"."+字段值
					 */
					
					
					//最终传递的数据的JSON格式
					var jsonObj 		= 	{};
					
					$(".submitJSON").each(function(index, item) {

						var name 		= 	$(item).attr("name");
						
						var field 		= 	$(item).attr("id").split(".")[1];

						var objName		=	name.match(/^[a-z|A-Z]+/gi);
						
						var dataIndex		=	$(item).attr("name").replace(/[^0-9]/ig,"");

						for( var dIndex = 0 ; dIndex < dataIndex.length ; dIndex++) {

							var index = dataIndex[dIndex];
							
							if( !(objName in jsonObj) ) {
								
								jsonObj[objName] = [];
								
							}

							var objArr = jsonObj[objName];

							if( $.type(objArr[index]) != "object" ) {
								
								objArr[index] = {};
								
							}
							
							if( $(item).hasClass('ckGroup') ) {
								$(item).find("input").each(function(cIndex,cItem) {
//									alert($(cItem).attr("checked"));
									if( $(cItem).attr("checked") == "checked" || $(cItem).attr("checked") ) {
										objArr[index][field] = $(cItem).val();
									}
								});
							} else if( $(item).is("span") ) {
								objArr[index][field] = $(item).text();
							} else {
								objArr[index][field] = $(item).val();
							}
						}
						
					});	

					$.post(options.url, {"jsonStr" : JSON.stringify(jsonObj)}, options.onSuccess);
					
					
				} else {//若没有放在表单中,则根据页面上的class类名为submitData的标签的内容,来获取参数
					
					var submitData		=	$(".submitData");
					var submitParam		=	{};
					var hasFile			=	false;
//						alert(submitData.length);
					submitData.each(function(index,item) {
						
						//若为span的返回text值
						var field 		= 	$(item).attr("id");
						var submitKey	= 	"";
						
						/***
						 * 
						 * 若id中含有".",则直接作为key提交,
						 * 解决含有多个对象提交的问题,不一定全是obj
						 */
						if(field.indexOf("\.")>0) {
							
							submitKey = field;
							
						} else {
							
							submitKey = "obj."+field;
							
						}
//						alert(submitKey);
						
						if( $(item).is("span") ) {
							
							submitParam[submitKey] = $(item).text();
							
						} else if ( $(item).attr("type") == "file" ) {//判断是否有文件
							
							hasFile = true;
							
						} else if ( $(item).is("div") && 
									$(item).is(":has(input[type='checkbox'])")) 
							
						{//checkbox处理
							
							var checkbox	= 	$(item).find("input[type='checkbox']");
							var cbValue		= 	"";
							
							checkbox.each(function(index, item) {
								
								if($(item).attr("checked")) {
									
									var itemVal = $(item).next("input").length > 0?$(item).val()+"&"+ $(item).next("input").val() : $(item).val();
									
									if(cbValue == "") {
										
										cbValue = itemVal;
										
									} else {
										
										cbValue = cbValue + ";" +itemVal;
										
									}
								}
							});
							
							submitParam[submitKey] = cbValue;
						
//							alert($(item).is(":has(input[type='checkbox'])"));
						} else if($(item).is("img")) {
							//img标签提交处理,因为谷歌和火狐浏览器$jQuery.val()取不到值.
							$(item).val() && (submitParam[submitKey] = $(item).val());
							$(item).attr("value") && (submitParam[submitKey] = $(item).attr("value"));
						} else if ( $(item).hasClass("year") ) {
							submitParam[submitKey] = $(item).val() + "-01-01";
						} else {//大多是返回value值
//							alert(submitKey+'='+$(item).val());
							submitParam[submitKey] = $(item).val();
						}
					} );
					
//						alert(JSON.stringify(submitParam));
					if( !hasFile ) {//无文件时
						
						//另外添加需要提交的字符串
						if( options.jsonStr && !submitParam.jsonStr) {
							submitParam.jsonStr = options.jsonStr;
						}
						//提交
						$.post(options.url, submitParam, options.onSuccess);
					} else {//有文件时

						//获取进度条的操作赋值给控制器
						timer =setInterval(progress,5);
						
						
						//文件上传操作, ajaxFileUplload 控件
						$.ajaxFileUpload({
				                url: options.url, //用于文件上传的服务器端请求地址
				                type:'post',
				                secureuri: false, //是否需要安全协议，一般设置为false
				                fileElementId: 'file1', //文件上传域的ID
				                dataType: 'json', //返回值类型 一般设置为json
				                data:submitParam,
				                success: options.onSuccess,
				                error: function (data, status, e)//服务器响应失败处理函数
				                {
				               	 alert("error1111");
				                }
				            });
					}
					
				}
			}
		});
	}
});

/***************************************************************************
 * 私有方法
 * @function 验证通用的方法
 * @param _selector 选择器 type String , _condition 为验证的条件 type boolean
 * @return msg type String 为""则验证通过,否则不通过
 */
function validate( _selector, _condition ) {
	var msg = "";
	var selector = $("."+_selector);
	if( selector.length > 0 ) {
		
		selector.each(function(index, item) {
			var $tag = $(item).next().children("input");
			if( $(item).next().children("input").length == 0 ) {
				$tag = $(item).next().children("textarea");
			}
			var value = $tag.val();
			if ( _condition(value) ) {
				if (msg == "") {
					msg = msg + $(this).text();
				} else {
					msg = msg + "," + $(this).text();
				}
			}
		});
	}
	
	return msg;
};

/************************************************************************
 * 私有方法
 * 
 * @function 从session中获取进度条
 */
function progress() {
	
	var dt = MathRand();
	
	$.ajax({
		url:'getProgressVal.action?dt='+dt,
		type:'get',
		success:function(data) {
		
			if(data.success) {
				
				if(data.data.rate == '100'){//文件上传完毕
					
					clearInterval(timer);
					msg = "文件上传成功!";
					
					//清除进度条
					$.ajax( {
						url:'clearState.action?dt='+dt,
						type:'get'
					} );
					
				} else {//文件正在上传
					
					//$("#progress").show();
					//$("#progressMsg").html("<font size='3' color='red'>"+data.data.progressMsg+"</font>");
					//$("#progress").progressbar('setValue', data.data.rate); 
					$(".progress").show();
					/*if( $("#progressMsg").length == 0 ) {
						$(".progress").before("<span id='progressMsg'><font size='5' color='red'>"+data.data.progressMsg+"</font></span>");
					} else {
						$("#progressMsg font").text(data.data.progressMsg);
					}*/
					
					$("#bar").html(data.data.rate+"%");
					$("#bar").css("width",data.data.rate+"px");
				}
				
			} else {//进度条获取异常
				
				$("#progressMsg").html("<font size='3' color='red'>"+data.errorMsg+"</font>");
				clearInterval(timer);
				result = false;
				msg = data.errorMsg;
			}
		},
		error:function(){
			clearInterval(timer);
			msg = "进度条进度获取异常!";
			}
		});	
};
})(jQuery);