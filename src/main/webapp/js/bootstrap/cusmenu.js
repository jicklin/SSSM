/*******************************************************************************
 * @desc 生成基于bootstrap样式的左侧菜单栏
 * @author hjj
 * @date 2015/07/01
 */

(function($) {
	
	//产生随机数
	var MathRand = function() {
		var Num = "";
		for ( var i = 0; i < 6; i++) {
			Num += Math.floor(Math.random() * 10);
		}
		return Num;
	};
	
	//显示一级菜单
	var show = function(headNode, bodyNode) {
		var windowHeight = $(document.body).height();
		var headHeight = 0;
		
		$(".cusmenu .panel-heading").each(function() {
			
			//38px是bootstrap默认panel-primary高度为38px
			headHeight = headHeight + 38;
			var head_1 = $(this);
			var body_1 = $(this).next(".panel-body");
			if (body_1.hasClass("collapsed")) {
				hide(head_1, body_1);
			}
		});
		headNode.find("span").attr("class",
				"glyphicon glyphicon-chevron-up pull-right");
		bodyNode.css("display", "block").css("border-left", "1px solid #dddddd")
				.css("border-right", "1px solid #dddddd").animate( {
					"height" : windowHeight - headHeight
				}, 300, function() {
					bodyNode.addClass("collapsed");
				});
	};
	
	//隐藏一级菜单
	var hide = function(headNode, bodyNode) {
		headNode.find("span").attr("class",
		"glyphicon glyphicon-chevron-down pull-right");
		bodyNode.animate( {
			"height" : 0
		}, 300, function() {
			bodyNode.css("display", "none");
			bodyNode.removeClass("collapsed");
		});
	};
	
	var cusmenu_methods = {
			/***
			 * @desc 左侧菜单栏初始化
			 */
			init : function(options) {
		
				var url = options.url;
		
				var dt = MathRand();
		
				var menu = $(this);
				
				menu.addClass("cusmenu");
				
				//根据参数url获取数据
				$.ajax( {
		
							type : "GET",
		
							url : url + "?dt=" + dt,
		
							success : function(data) {
		
					
								var attributes = {};
					
								//数据解析
								for ( var i in data) {
		
									var item = data[i];
									
									//一级菜单添加bootstrap组件
									menu.append("<div id='firstMenu-"
													+ item.id
													+ "' class='panel panel-primary'>"
													+ "<div class='panel-heading'>"
													+ "<h4 class='panel-title'>"
													+ item.text
													+ "</h4><span class='glyphicon glyphicon-chevron-down pull-right'></span>"
													+ "</div>"
													+ "<div class='panel-body'>"
													+ "</div>" + "</div>");
									
									//存在二级则继续添加二级菜单
									if (item.children != null
											&& item.children.length > 0) {
		
										var item_children = item.children;
										
										//一级菜单中添加树
										$("#firstMenu-" + item.id
														+ " div.panel-body")
												.append(
														"<ul class='myTree'></ul>");
										//遍历二级菜单
										for ( var icIndex = 0; icIndex < item_children.length; icIndex++) {
											
											var item_children_item = item_children[icIndex];
											
											//添加二级菜单到对应的一级菜的树中
											$("#firstMenu-"+ item.id
															+ " div.panel-body ul.myTree")
													.append(
															"<li id='secMenu-"
																	+ item_children_item.id
																	+ "'><a href='#'><i class='"+item_children_item.iconCls+"'></i> "
																	+ item_children_item.text
																	+ "</a></li>");
											//alert(item_children_item.attributes.url);
											attributes["secMenu-"+ item_children_item.id] = item_children_item.attributes;
											
											//若存在三级菜单则添加三级菜单
											if (item_children_item.children != null
													&& item_children_item.children.length > 0) {
												
												var item_children_item_children = item_children_item.children;
												
												//添加三级菜单的树
												$("#firstMenu-"+ item.id
																+ " div.panel-body ul.myTree li#secMenu-"
																+ item_children_item.id)
														.append("<ul></ul>");
												
												//遍历三级菜单,并添加到对应的二级菜单的树中
												for ( var icicIndex in item_children_item_children) {
													
													var item_children_item_children_item = item_children_item_children[icicIndex];
													
													$("#firstMenu-"+ item.id
																	+ " div.panel-body ul.myTree li#secMenu-"
																	+ item_children_item.id
																	+ " ul")
															.append(
																	"<li id='thirMenu-" + item_children_item_children_item.id + "'><a href='#'>"
																			+ item_children_item_children_item.text
																			+ "</a></li>");
													attributes["thirMenu-"+ item_children_item_children_item.id] = item_children_item_children_item.attributes;
												}
											}
										}
									}
								}
		
								//根节点点击时触发添加标签方法
								$(".panel-body li").not(":has(ul)").click(
										function() {
											/*
											 * var tabName =
											 * $(this).parent().siblings().find(".panel-title").text();
											 * window.parent.frames["contentIfm"].addTab(tabName);
											 * return false;
											 */
											var options = attributes[$(this).attr("id")];
											
											options.tabName = $(this).text();
											
											var tabOptions = JSON.stringify(options);
											
											window.parent.frames["contentIfm"]
													.addTab(tabOptions);
											return false;
										});
		
								//形成树
								$(".myTree").treed( {
									openedClass : 'glyphicon-folder-open',
									closedClass : 'glyphicon-folder-close'
								});
								
								//一级菜单被点击时的动画处理
								$(".panel-heading").click(function() {
									var head = $(this);
									var body = $(this).next(".panel-body");
		
									if (body.hasClass("collapsed")) {
										hide(head, body);
									} else {
										show(head, body);
									}
								});
								
								//第一个默认是打开的
								$(".panel-heading").each(function(index, item) {
									if( index == 0 ) {
										$(item).trigger("click");
									}
								});
								
								//子菜单的第一级默认打开
								$(".myTree").find("li").has("ul").each(function(index,item) {
									if( index == 0 ) {
										$(item).trigger("click");
									}
								});
								
							}
		
						});
		
					}
		};
	
	$.fn.cusmenu = function() {
		
		var method = arguments[0];
				
		if( cusmenu_methods[method] ) {
			method = cusmenu_methods[method];
			arguments = Array.prototype.slice.call(arguments,1);
		} else if( typeof(method) == 'object' || !method ) {
			method = cusmenu_methods.init;
		} else {
			$.error( 'Method : ' +  method + ' does not exist on jQuery.cusmenu!' );
            return this;
		}
		
		return method.apply(this, arguments);
	};

}(jQuery));
