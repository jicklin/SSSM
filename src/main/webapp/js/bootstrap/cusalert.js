/*******************************************************************************
 * @desc 生成自定义alert
 * @author hjj
 * @date 2015/07/03
 */

(function($) {
	$.extend( {

		
		/***
		 * @desc 自定义alert核心方法
		 */
		cusalert : function(options) {

			var title = options.title;

			var content = options.content;

			//类型:'DEFAULT' 'PRIMARY' 'INFO' 'WARNING' 'SUCCESS'
			var type = options.type;

			//标题图标类名
			var titleIcon = "glyphicon glyphicon-hand-right";

			//类名,决定alert的类型
			var typeStr = "";

			//关闭的图标类名,决定关闭的图标样式
			var closeIcon = "";

			//判断是否IE浏览器,因为IE浏览器对div旋转支持的不好,所有要分开配置
			if ((navigator.userAgent.indexOf('MSIE') >= 0)
					&& (navigator.userAgent.indexOf('Opera') < 0)) {
				closeIcon = "glyphicon glyphicon-remove";
			} else {
				closeIcon = "glyphicon glyphicon-plus";
			}

			if (type == "DEFAULT" || type == "default") {
				typeStr = "offer-default";
			}

			if (type == "SUCCESS" || type == "success") {
				typeStr = "offer-success";
				titleIcon = "glyphicon glyphicon-ok-sign";
			}

			if (type == "INFO" || type == "info") {
				typeStr = "offer-info";
			}

			if (type == "WARNING" || type == "warning") {
				typeStr = "offer-warning";
				titleIcon = "glyphicon glyphicon glyphicon-exclamation-sign";
			}

			if (type == "PRIMARY" || type == "primary") {
				typeStr = "offer-primary";
			}

			if (type == "DANGER" || type == "danger") {
				typeStr = "offer-danger";
				titleIcon = "glyphicon glyphicon-remove-sign";
			}

			//若已经存在,则在div上进行修改,若不存在则添加,这样设计就可以始终就一个div
			if (!$("#shade").length > 0) {

				$(document.body).append("<div id='shade'></div>");
				$(document.body).append(
						"<div class='offer offer-radius " + typeStr + "'>"
								+ "<div class='shape'>"
								+ "<div class='shape-text'>" + "<span class='"
								+ closeIcon + "'></span>" + "</div>" + "</div>"
								+ "<div class='offer-content'>"
								+ "<h3 class='lead'>"
								+ "<span style='font-size:15px;' class='glyphicon " + titleIcon
								+ " pull-left'>&nbsp;</span>" + "<p id='title'>"
								+ options.title + "</p></h3>"
								+ "<p id='content'>" + options.content
								//+"<br> 操作有误!"
								+ "</p>" + "</div>" + "</div>");

			} else {

				$(".offer").attr("class", "offer offer-radius " + typeStr);
				$(".lead span").attr("class",
						"glyphicon " + titleIcon + " pull-left");
				$("#title").text(options.title);
				$("#content").html(options.content);
			}

			//设置遮罩的大小
			$("#shade").height(document.body.scrollHeight);
			$("#shade").width(document.body.scrollWidth);

			//遮罩淡入效果
			$("#shade").fadeTo(300, 0.5);

			//alert淡入效果
			$(".offer").fadeIn(500);

			//点击关闭图标,淡出
			$("#shade,.shape-text span").click(function() {
				$(".offer").fadeOut();
				$("#shade").fadeOut();
			});
			$(document.body).keydown(function(evt) {
				evt=evt?evt:window.event;
				if( evt.keyCode == 27) {
					if( $(".shape-text span").length > 0 ) {
						$(".shape-text span").trigger("click");
					}
				}
			});

		},
	
		/**
		 * @desc 自定义confirm 依赖于cusalert
		 */
		cusconfirm : function( options , confirm , cancel ) {
			
			var title = options.title;
			
			$.cusalert({
				
				title : title,
				
				content : "<button class='btn btn-primary trueBtn btn-sm' style='width:65px;height:30px;'>确定</button>" +
						"<button class='btn btn-default falseBtn btn-sm' style='width:65px;height:30px;'>取消</button>",
				
				type  : "primary"
			});
			
			$(".trueBtn").click(function() {
				runFunction(confirm);
				$(".offer").fadeOut();
				$("#shade").fadeOut();
				$(".offer").remove();
				$("#shade").remove();
				return true;
			});
			
			if( cancel ) {
				$(".falseBtn").click(function() {
					runFunction(cancel);
					$(".offer").fadeOut();
					$("#shade").fadeOut();
					return false;
				});
			} else {
				$(".falseBtn").click(function() {
					$(".offer").fadeOut();
					$("#shade").fadeOut();
					return false;
				});
				
			}
		},
	
		/********************************************************
		 * @function 自定义danger 款alert 省的每次都要写好多参数
		 */	
		cusdangeralert : function(content) {
			$.cusalert({
				title : "提示",
				content :content,
				type  : "danger"
			});
		},
		
		/********************************************************
		 * @function 自定义success 款alert 省的每次都要写好多参数
		 */	
		cussuccessalert : function(content) {
			$.cusalert({
				title : "提示",
				content :content,
				type  : "success"
			});
		}
	});
	
	function runFunction(callback) {
		callback();
	}
})(jQuery);
