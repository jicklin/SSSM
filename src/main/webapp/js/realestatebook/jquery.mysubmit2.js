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
	 * @tip 后台必须提供对应的对象名,以便struts2能够setProperty正确. 
	 */
	mysubmit2 : function( options ) {
	
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
		
		$(this).click(function() {
			
			/****************************
			 * 正数正则表达式
			 */
			var regInt		= /^(-|\+)?\d+$/;
			
			/****************************
			 * 手机正则表达式
			 */
			var regPhone	= /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
			
			
			/****************************
			 * double正则表达式
			 */
			var regDouble	= /^[-\+]?\d+(\.\d+)?$/;

			
			var defaults 	= [];
			var defaultsArr = [];
			var message		= "";
			
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
				alert(message);
			} else {
				
				//若是提交的表单,可以直接把表单的id作为参数传递过来,然后做表单的处理
				if ( options.formId ) {
					
					/***
					 * 暂时还没写,不影响
					 */
					
				} else {//若没有放在表单中,则根据页面上的class类名为submitData的标签的内容,来获取参数
					var submitParams = [];//定义提交对象数组
					var hasFile			=	false;
					//for(var i = 0;i < 4;i++ )
					{
						//var submitData		=	$(".submitData" + i);
						var submitData		=	$(".submitData");//获取提交参数值
						var submitParam		=	{};//定义提交对象
	//						alert(submitData.length);
						submitData.each(function(index,item) {
							
							//若为span的返回text值
							var field 		= 	$(item).attr("class").split(" ")[0];//页面规定第一个class名为变量名
							var submitKey	= 	field;
							
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
										
										if(cbValue == "") {
											
											cbValue = $(item).val();
											
										} else {
											
											cbValue = cbValue + ";" +$(item).val();
											
										}
									}
								});
								
								submitParam[submitKey] = cbValue;
							
	//							alert($(item).is(":has(input[type='checkbox'])"));
							} else {//大多是返回value值
	//							alert(submitKey+'='+$(item).val());
								submitParam[submitKey] = $(item).val();
							}
						} );
						if(submitData.length > 0)
							submitParams.push(submitParam);
					}
					//alert(JSON.stringify(submitParams));
					if(submitParams.length == 1)
						$.post(options.url, submitParams[0], options.onSuccess);//在自动填充时已根据案件编号过滤，因此只会有一条需提交数据
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
			var value = $(item).next().children().val();
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

})(jQuery);