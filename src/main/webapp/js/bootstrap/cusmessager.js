/*******************************************************************************
 * @desc 生成基于bootstrap样式的自定义消息提示框
 * @author hjj
 * @date 2015/07/01
 */
(function($) {

	
	var cusMessager_methods = {
			
			/********************************************************
			 * @function 自定义消息提示框 从浏览器底部渐入效果
			 */
			init : function(options) {
		
				$(document.body).append("<div id='messager'></div>");
				
				var messager = $("#messager");
				
				var text = options.text;
		
				var timeout;
				
				//若存在内容先清空
				if (messager.children().length > 0) {
					messager.children().remove();
				}
		
				//添加bootstrap样式
				messager.addClass("panel panel-primary cusMessager");
		
				//添加bootstrap组件
				messager.append("<div class='panel-heading'>"
								+ "<h5 class='panel-title'><span class='glyphicon glyphicon-exclamation-sign'></span> 3秒后自动关闭</h5>"
								+ "<a id='msgbtn' class='btn btn-primary pull-right'><span class='glyphicon glyphicon-remove'></span></a></div>"
								+ "<div class='panel-body'><h5><b>" + text
								+ "</b></h5></div>");
				
				//渐入动画
				messager.animate( {"bottom" : "-35px"}, 500);
		
				//渐出
				$("#msgbtn").click(function() {
					messager.animate( {
						"bottom" : "-200px"
					}, 500);
		//			clearTimeout(timeout);
					setTimeout("$(messager).remove()",1000);
				});
		
				//5秒后自动渐出
				timeout = setTimeout(
						"var bottom = Number($(messager).css('bottom').replace(/[^0-9]/ig,''));"
								+ "if( bottom > 0 || bottom == 0 ) {"
								+ "$(messager).animate( {'bottom' : '-200px'}, 500);"
		//						+ "clearTimeout(timeout);" 
								+"setTimeout('$(messager).remove()',1000);}", 3000);

			}
	};
	
	$.cusMessager =  function() {
		
		var method = arguments[0];
		
		if( cusMessager_methods[method] ) {
			method = cusMessager_methods[method];
			arguments = Array.prototype.slice.call(arguments,1);
		} else if( typeof(method) == 'object' || !method ) {
			method = cusMessager_methods.init;
		} else {
			$.error( 'Method : ' +  method + ' does not exist on jQuery.cusMessager!' );
            return this;
		}
		
		return method.apply(this, arguments);
	};
	
})(jQuery);