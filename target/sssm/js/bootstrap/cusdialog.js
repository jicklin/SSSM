/*******************************************************************************
 * @desc 生成基于bootstrap样式的dialog
 * @author hjj
 * @date 2015/06/30
 */

(function($){
	
	var control = 1;
	
	var dlg_margin_top;
	var dlg_width;
	var dlg_height;
	var dragMinWidth = 580;
	var dragMinHeight = 250;
	
	/**
	 * dialog 拉伸函数
	 * position 未null或者是1时,绝对定位的div,其他值,相对定位的div
	 */
	var resize = function(oParent, handle, isLeft, isTop, lockX, lockY,position) {
		position || (position = 1);
		handle.onmousedown = function (event) {
			var event = event || rDrag.fixEvent(event);
			var disX = event.clientX - handle.offsetLeft;
			var disY = event.clientY - handle.offsetTop;
			//alert(handle.offsetWidth);
			var iParentTop = oParent.offsetTop;
			var iParentLeft = oParent.offsetLeft;
			var iParentWidth = oParent.offsetWidth;
			var iParentHeight = oParent.offsetHeight;
			if($(oParent).find("iframe").length > 0) {
				//存在iframe要添加遮罩层,否则拖动会不自然
				var iframeX = $(oParent).find("iframe").offset().left;
				var iframeY = $(oParent).find("iframe").offset().top;
				var iframeWidth = $(oParent).find("iframe").width();
				var iframeHeight = $(oParent).find("iframe").height();
				$(oParent).find("iframe").after("<div class='iframeShadow' style='left:"+iframeX+";top:"+iframeY+";"
						+"width:"+iframeWidth+"px;height:"+iframeHeight+"px;'></div>");
				$(oParent).find("iframe").hide();
			}
			document.onmousemove = function (event) {
				var event = event || rDrag.fixEvent(event);
				var iL = event.clientX - disX;
				var iT = event.clientY - disY;
				var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
				var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;
				var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
				var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
				isLeft && (oParent.style.marginLeft = iParentLeft + iL + "px");
				isTop && (oParent.style.marginTop = iParentTop + iT + "px");
				if(position == 1) {
					isLeft && (oParent.style.marginLeft = iParentLeft + iL + "px");
					isTop && (oParent.style.marginTop = iParentTop + iT + "px");
				} else {
					isLeft && (oParent.style.left = iParentLeft + iL + "px");
					isTop && (oParent.style.top = iParentTop + iT + "px");
				}
				iW < dragMinWidth && (iW = dragMinWidth);
				iW > maxW && (iW = maxW);
				lockX || (oParent.style.width = iW + "px");
				lockX || ($(".iframeShadow")[0].style.width = iW-20 + "px");
				iH < dragMinHeight && (iH = dragMinHeight);
				iH > maxH && (iH = maxH);
				lockY || (oParent.style.height = iH + "px");
				lockY || ($(".iframeShadow")[0].style.height = iH-50 + "px");
				if((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove = null;
				return false;
			};
			document.onmouseup = function () {
				document.onmousemove = null;
				document.onmouseup = null;
				$(oParent).find("iframe").show();
				$(".iframeShadow").remove();
			};
			return false;
		};
	};
	
	/***
	 * dialog 拖动函数
	 * position 未null或者是1时,绝对定位的div,其他值,相对定位的div
	 */
	var rDrag = {
			o : null,
			dragger : null,
			position:1,
			init : function(dragger,handler,position) {
				position && (rDrag.position = position);
//				console.log("rDrag.position="+rDrag.position);
				rDrag.dragger = dragger;
				handler.style.cursor = "move";
				handler.onmousedown = this.start;
			},
			start : function(e) {
				var o;
				e = rDrag.fixEvent(e);
				e.preventDefault && e.preventDefault();
				rDrag.o = o = this;
				//alert(rDrag.o.offsetLeft);
				//console.log(parseInt(rDrag.dragger.style.left));
				if(rDrag.position == 1) {
					o.x = e.clientX - rDrag.dragger.offsetLeft;
					o.y = e.clientY - rDrag.dragger.offsetTop;
				} else {
					o.x = e.clientX - parseInt(rDrag.dragger.style.left);
					o.y = e.clientY - parseInt(rDrag.dragger.style.top);
				}
				document.onmousemove = rDrag.move;
				document.onmouseup = rDrag.end;
				this.setCapture && this.setCapture();
			},
			move : function(e) {
				e = rDrag.fixEvent(e);
				var oLeft, oTop;
				oLeft = e.clientX - rDrag.o.x;
				oTop = e.clientY - rDrag.o.y;
				var maxLeft = document.documentElement.clientWidth - rDrag.dragger.offsetWidth;
				var maxTop = document.documentElement.clientHeight - rDrag.dragger.offsetHeight;
				oLeft <= 0 && (oLeft = 0);
				oTop <= 0 && (oTop = 0);
				oLeft >= maxLeft && (oLeft = maxLeft);
				oTop >= maxTop && (oTop = maxTop);
				if(rDrag.position == 1) {
					rDrag.dragger.style.marginLeft = oLeft + 'px';
					rDrag.dragger.style.marginTop = oTop + 'px';
				} else {
					rDrag.dragger.style.left = oLeft + 'px';
					rDrag.dragger.style.top = oTop + 'px';
				}
			},
			end : function(e) {
				e = rDrag.fixEvent(e);
				rDrag.o = document.onmousemove = document.onmouseup = null;
				this.releaseCapture && this.releaseCapture();
			},
			fixEvent : function(e) {
				if (!e) {
					e = window.event;
					e.target = e.srcElement;
					e.layerX = e.offsetX;
					e.layerY = e.offsetY;
				}
				return e;
			}
	};
	
	/***
	 * @function dialog 拖动函数
	 * 			jquery写法,上面那个有些bug,为了不影响以前的,
	 * 			重新写了一个用jquery实现的,以后维护优化的时候可以合并
	 */
	
	/*var JQDrag = function($dragger,$handler) {
		$handler.css("cursor","move");
		$handler.mousedown(function(e) {
            dragging = true;
            iX = e.clientX - this.offsetLeft;
            iY = e.clientY - this.offsetTop;
            this.setCapture && this.setCapture();
            return false;
		});
		document.onmousemove = function(e) {
            if (dragging) {
                var e = e || window.event;
                var oX = e.clientX - iX;
                var oY = e.clientY - iY;
                $dragger.css({"margin-left":oX + "px", "margin-top":oY + "px"});
                return false;
            }
        };
        $(document).mouseup(function(e) {
            dragging = false;
            $dragger[0].releaseCapture && $dragger[0].releaseCapture();
            e.cancelBubble = true;
        });
		
	};*/
	
	/***
	 * @function 字闪烁
	 */
	var flash = function() {
		
		if (control == 1){
			$("#shade-text").fadeIn(300);
			control=0;
		}else{
			$("#shade-text").fadeOut();
			control=1;
		}
		
	};
	
	var cusdialog_methods = {
			
			init : function( options ) {
					return this.each(function() {
						var $this = $(this);
//						var settings = $this.data("cusdialog");
						
//						if( $.type(settings) == "undefined" ) {
							
						var defaults = {
								width:"600px", height: "280px",
								title: "title",	content: "content",
								addBtn:[],
								button:[
								        {text:"提交",type:"primary",signClass:"glyphicon-check"},
								        {text:"关闭",type:"danger",
								        signClass:"glyphicon-remove",
								        handler:function() {
								        	$this.find(".btn[data-dismiss='modal']").trigger("click");
								        	}}
								        ],
						        tools : [],
								hideBtn: false,
								maxable: false,
								draggable : false,
								resizeable : false,
								onCusDialogSubmit: function() {
									alert("提交");
								},
								onBeforeClose : function() {}
							};
						settings = $.extend({},defaults,options);
//							$this.data("cusdialog",settings);
							
//						} else {
//							settings = $.extend({},settings,options);
//						}
//						alert($.type(settings.onCusDialogSubmit));
						
						var width = settings.width;
						
						var height = settings.height;
						
						var hideBtn = settings.hideBtn;
						
						var maxable = settings.maxable;
						
						var draggable = settings.draggable;
						
						var resizeable = settings.resizeable;
						
						var dialog_title = settings.title;
						
						var dialog_content = settings.content;
						
						var dialog_button = settings.button;
						
						var onCusDialogSubmit = settings.onCusDialogSubmit;
						
						var onBeforeClose	=	settings.onBeforeClose;
						
						var addBtn = settings.addBtn;
						
						var tools = settings.tools;
						
						//若有内容先清空
						if( $this.children().length > 0 ) {
							$this.children().remove();
						}
						
						if( addBtn && addBtn.length > 0 ) {
							dialog_button = $.merge(dialog_button,addBtn);
						}
						
						//添加bootstrap样式
						$this.addClass("modal fade cusdialog");
						
						//添加bootstrap组件
						$this.append("<div class='modal-dialog' style='width:"+width+";height:"+height+";'>"
						        +"<div class='panel panel-primary'>"
						        +"<div class='panel-heading'>"
						        +"<h4 class='panel-title'>"+dialog_title+"</h4>"
						        +"<span class='cusdialog-tools'>"
						        +"<a class='btn btn-primary remove' data-dismiss='modal'><span class='glyphicon glyphicon-remove'></span></a>"
						        +"</span>"
						        +"</div>"
						        +"<div class='panel-body'>"+dialog_content
						        +"</div>"
						        +"<div class='modal-footer'>"
						        +"<div class='btn-group'>"
//						        +"<button class='btn btn-danger' data-dismiss='modal'><span class='glyphicon glyphicon-remove'></span> 关闭</button>"
//						        +"<button id='cusSubmit' class='btn btn-primary'><span class='glyphicon glyphicon-check'></span> 提交</button>"
						        +"</div>"
						        +"</div>"
						        +"</div>"
						        +"</div>");
						
						/*if( width ) {
							$(".modal-dialog").css("width",width);
						}
						
						if( height ) {
							$(".modal-dialog").css("height",height);
						}*/
						
						if( maxable ) {
							$(".panel-heading").find("a[data-dismiss='modal']").before("<a class='btn btn-primary max'><span style='font-size:17px;' class='glyphicon glyphicon-resize-full'></span></a>");
							$(".panel-heading").find("a[data-dismiss='modal']").before("<a class='btn btn-primary min'><span style='font-size:17px;' class='glyphicon glyphicon-resize-small'></span></a>");
						}
						
						//添加自定义工具栏按钮
						if( tools && tools.length > 0 ) {
							for(var tI in tools) {
								var tool = tools[tI];
								var title = tool.title || "";
								$this.find(".cusdialog-tools").prepend(
										"<a title='"+title+"' class='btn btn-primary'>"
										+"<span style='font-size:17px;' class='glyphicon "
										+tool.iconCls+"'></span></a>"
										);
								$this.find(".cusdialog-tools").find(".btn").eq(0).click(tool.handler);
							}
						}
						
						//添加对话框的自定义按钮
						for( var bIndex in dialog_button ) {
							var dialog_button_item = dialog_button[bIndex];
							var type = dialog_button_item.type || "default";
							var signClass = dialog_button_item.signClass || "glyphicon-remove";
							var text = dialog_button_item.text || "按钮";
							$this.find(".btn-group").append("<button class='btn btn-"+type+"'><span class='glyphicon "+signClass+"'></span> "+text+"</button>");
							if( !dialog_button_item.handler && text == "提交" ) {
								$this.find(".btn-group .btn:last").click(onCusDialogSubmit);
							} else {
								$this.find(".btn-group .btn:last").click(dialog_button_item.handler);
							}
						}
						
						if( hideBtn ) {
							$this.find(".btn-group").css("display","none");
							$this.find(".modal-dialog .panel-primary .panel-body").css("height","90%");
						} else {
							$this.find(".modal-dialog .panel-primary .panel-body").css("height","87%");
						}
						
						$this.modal({backdrop: 'static'});
						
						if( draggable ) {
							//$(".panel-heading").css("cursor","move");
							rDrag.init($(".modal-dialog")[0],$(".panel-heading")[0]);;
						}
						
						if( resizeable ) {
							$(".modal-dialog").append("<div id='left' class='resizeDIV'></div>"
									+"<div id='right' class='resizeDIV'></div>"
									+"<div id='top' class='resizeDIV'></div>"
									+"<div id='bottom' class='resizeDIV'></div>"
									+"<div id='TL' class='resizeDIV'></div>"
									+"<div id='TR' class='resizeDIV'></div>"
									+"<div id='BL' class='resizeDIV'></div>"
									+"<div id='BR' class='resizeDIV'></div>");
							
							resize($(".modal-dialog")[0],document.getElementById("TL"),true, true, false, false);
							resize($(".modal-dialog")[0],document.getElementById("TR"),false, true, false, false);
							resize($(".modal-dialog")[0],document.getElementById("BL"),true, false, false, false);
							resize($(".modal-dialog")[0],document.getElementById("BR"),false, false, false, false);
							resize($(".modal-dialog")[0],document.getElementById("left"),true, false, false, true);
							resize($(".modal-dialog")[0],document.getElementById("right"),false, false, false, true);
							resize($(".modal-dialog")[0],document.getElementById("top"),false, true, true, false);
							resize($(".modal-dialog")[0],document.getElementById("bottom"),false, false, true, false);
						}
						
						//提交事件
//						$this.find("#cusSubmit").click(onCusDialogSubmit);
						//alert($(".btn[data-dismiss='modal']").length);
						$this.find(".btn[data-dismiss='modal']").click(function() {
							return onBeforeClose.call();
						});
						
						/*$this.on('hide.bs.modal', function () {
							return onBeforeClose.call();
						});*/
						
						//最大化
						$(".modal .panel-heading .max").click(function() {
							$(this).css("display","none");
							$(".modal .panel-heading .min").css("display","inline-block");
							dlg_margin_top = $(".modal-dialog").css("margin-top");
							dlg_width = $(".modal-dialog").css("width");
							dlg_height = $(".modal-dialog").css("height");
							$(".modal-dialog").css("margin-top","0").css("margin-left","0").css("margin-bottom","auto").css("margin-right","auto");
							$(".modal-dialog").css("width","100%");
							$(".modal-dialog").css("height","100%");
						});
						
						//最大化还原
						$(".modal .panel-heading .min").click(function() {
							$(this).css("display","none");
							$(".modal .panel-heading .max").css("display","inline-block");
							$(".modal-dialog").css("margin-top",dlg_margin_top).css("margin-left","auto");
							$(".modal-dialog").css("width",dlg_width);
							$(".modal-dialog").css("height",dlg_height);
						});
						
					});
			},
			
			close : function() {
				return this.each(function() {
					var $this = $(this);
					$this.find(".panel-heading").find("[data-dismiss='modal']").trigger("click");
				});
			},
			
			setTitle : function( title ) {
				return this.each(function() {
					var $this = $(this);
					$this.find(".panel-title").text(title);
				});
			},
			
			resize : function( options ) {
				return this.each(function() {
					var $this = $(this);
					$this.find(".modal-dialog").css("height",options.height);
					$this.find(".modal-dialog").css("width",options.width);
				});
			},
			
			addTools : function( toolsArr ) {
				return this.each(function() {
					var $this = $(this);
					for(var tI in toolsArr) {
						var tool = toolsArr[tI];
						var title = tool.title || "";
						$this.find(".cusdialog-tools").prepend(
								"<a title='"+title+"' class='btn btn-primary'>"
								+"<span style='font-size:17px;' class='glyphicon "
								+tool.iconCls+"'></span></a>"
								);
						$this.find(".cusdialog-tools").find(".btn").eq(0).click(tool.handler);
					}
				});
			}
	};
	
	var cusFlickerDlg_methods = {
			
			init : function( options ) {
				return this.each(function() {
					var $this = $(this);
					var settings = $this.data("cusFlickerDlg");
					
					if( $.type(settings) == "undefined" ) {
						
						var defaults = {
							"width" : "auto",
							"height" : "auto",
							"title" : "title",
							"content":"content",
							"flicker" : "click!",
							"draggable": false,
							"resizeable": false
						};
						
						settings = $.extend({},defaults,options);
						$this.data("cusFlickerDlg",settings);
					} else {
						settings = $.extend({},settings,options);
					}
					
				var width = settings.width;
				
				var height = settings.height;
				
				var title = settings.title;
				
				var content = settings.content;
				
				var flicker = settings.flicker;
				
				var draggable = settings.draggable;
				
				var resizeable = settings.resizeable;
				
				//清空dialog操作
				if( $this.children().length > 0 ) {
					$this.children().remove();
				}
				
				//添加遮罩
				$(document.body).append("<div id='shade'></div>");
				
				//添加闪烁字
				$(document.body).append("<div id='shade-text'></div>");
				
				//设置遮罩的大小
				$("#shade").height(document.body.scrollHeight);
				$("#shade").width(document.body.scrollWidth);
				
				//闪烁字设置
				$("#shade-text").text(flicker);
				$("#shade-text").css("top",document.body.scrollHeight*4/5 + "px");
				$("#shade-text").css("left",document.body.scrollWidth*0.43 + "px");
				
				//dialog设置
				$this.addClass("flickerDlg");
				$this.css("width",width);
				$this.css("height",height);
				var top = ($(window).height()-$this.height())/4;
				var left = ($(window).width()-$this.width())/2;
				$this.css("top",top+"px");
				$this.css("left",left+"px");
				$this.append("<div class='flickerDlg-header' ><b>"+ title +"</b>"
						+"<a class='btn btn-default remove pull-right'><span class='glyphicon glyphicon-remove'></span></a>"
						+"<a class='btn btn-default max pull-right'><span class='glyphicon glyphicon-resize-full'></span></a>"
						+"<a class='btn btn-default min pull-right'><span class='glyphicon glyphicon-resize-small'></span></a>"
						+"</div>"
						+"<div class='flickerDlg-body'>"
						+ content
						+"</div>");

				//遮罩淡入效果
				$("#shade").fadeTo(200, 0.5);

				//对话框淡入效果
				$this.fadeIn(300);

				//设置闪烁是时间
				var timer = setInterval(flash,800);
				
				var flickerDlg_top = 0;
				var flickerDlg_left = 0;
				var flickerDlg_width = 0;
				var flickerDlg_height = 0;
				
				//最大化
				$(".flickerDlg-header .max").click(function() {
					$(this).css("display","none");
					$(".flickerDlg-header .min").css("display","inline");
					flickerDlg_top = $(".flickerDlg").css("top");
					flickerDlg_left = $(".flickerDlg").css("left");
					flickerDlg_width = $(".flickerDlg").css("width");
					flickerDlg_height = $(".flickerDlg").css("height");
					$(".flickerDlg").css("top","0").css("left","0").css("bottom","auto").css("right","auto");
					$(".flickerDlg").css("width","100%");
					$(".flickerDlg").css("height","100%");
				});
				
				//最大化还原
				$(".flickerDlg-header .min").click(function() {
					$(this).css("display","none");
					$(".flickerDlg-header .max").css("display","inline");
					$(".flickerDlg").css("top",flickerDlg_top).css("left",flickerDlg_left).css("bottom","auto").css("right","auto");
					$(".flickerDlg").css("width",flickerDlg_width);
					$(".flickerDlg").css("height",flickerDlg_height);
				});
				
				$("#shade,.flickerDlg-header .remove").click(function() {
					//删除操作
					$this.fadeOut();
					$("#shade").fadeOut();
					clearInterval(timer);
					
					var $iframe = $this.find("iframe");
					
					if( $iframe.length > 0 ) {
						for ( var i = 0; i < $iframe.length; i++) {
							$iframe[i].src = '';
							$iframe[i].contentWindow.document.write('');
							$iframe[i].contentWindow.close();
						}
						$iframe.remove();
						if (navigator.userAgent.indexOf("MSIE") > 0) {// IE特有回收内存方法
							try {
								CollectGarbage();
							} catch (e) {
							}
						}
					}
					$this.children().each(function(index,item) {
						$(item).remove();
					});
					$("#shade").remove();
					$("#shade-text").remove();
				});
				
				if(draggable) {
					//JQDrag($this,$(".flickerDlg-header"));
					rDrag.init($this[0],$(".flickerDlg-header")[0],2);
				}
				
				if(resizeable) {
					$this.append("<div id='left' class='resizeDIV'></div>"
							+"<div id='right' class='resizeDIV'></div>"
							+"<div id='top' class='resizeDIV'></div>"
							+"<div id='bottom' class='resizeDIV'></div>"
							+"<div id='TL' class='resizeDIV'></div>"
							+"<div id='TR' class='resizeDIV'></div>"
							+"<div id='BL' class='resizeDIV'></div>"
							+"<div id='BR' class='resizeDIV'></div>");
					
					resize($this[0],document.getElementById("TL"),true, true, false, false,2);
					resize($this[0],document.getElementById("TR"),false, true, false, false,2);
					resize($this[0],document.getElementById("BL"),true, false, false, false,2);
					resize($this[0],document.getElementById("BR"),false, false, false, false,2);
					resize($this[0],document.getElementById("left"),true, false, false, true,2);
					resize($this[0],document.getElementById("right"),false, false, false, true,2);
					resize($this[0],document.getElementById("top"),false, true, true, false,2);
					resize($this[0],document.getElementById("bottom"),false, false, true, false,2);
				}
				
			});
		},
		
		resize : function( options ) {
			var $this = $(this);
			$this.css("height",options.height);
			$this.css("width",options.width);
			var top = ($(window).height()-$this.height())/4;
			var left = ($(window).width()-$this.width())/2;
			$this.css("top",top+"px");
			$this.css("left",left+"px");
		},
		
		close : function() {
			var $this = $(this);
			$this.find(".flickerDlg-header .remove").trigger("click");
		},
		
		setTitle : function( title ) {
			return this.each(function() {
				var $this = $(this);
				$this.find(".flickerDlg-header b").text(title);
			});
		}
	};
	
	$.fn.cusdialog =  function() {
		
		var method = arguments[0];
		
		if( cusdialog_methods[method] ) {
			method = cusdialog_methods[method];
			arguments = Array.prototype.slice.call(arguments,1);
		} else if( typeof(method) == 'object' || !method ) {
			method = cusdialog_methods.init;
		} else {
			$.error( 'Method : ' +  method + ' does not exist on jQuery.cusdialog!' );
            return this;
		}
		
		return method.apply(this, arguments);
	};
	
	$.fn.cusFlickerDlg = function() {
		
		var method = arguments[0];
		
		if( cusFlickerDlg_methods[method] ) {
			method = cusFlickerDlg_methods[method];
			arguments = Array.prototype.slice.call(arguments,1);
		} else if( typeof(method) == 'object' || !method ) {
			method = cusFlickerDlg_methods.init;
		} else {
			$.error( 'Method : ' +  method + ' does not exist on jQuery.cusFlickerDlg!' );
            return this;
		}
		
		return method.apply(this, arguments);
	};
	
})(jQuery);