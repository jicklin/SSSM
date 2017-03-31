/**
 * @desc 基于bootstrap 自定义tree
 * @author hjj
 * @date 2015/08/05
 */

(function() {
	
	var openedClass;
    var closedClass;
    var checkbox;
    var onBeforeNodeClick;
    var onNodeClick;
    var tree;
	
    var treeAjax_init = function( url,queryParams ) {
    	var dt = MathRand();
  	  
  	  if( url.indexOf("?") > 0 ) {
  		  url = url + "&dt=" + dt; 
  	  } else {
  		  url = url + "?dt=" + dt;
  	  }
  	  
  	  //1级id为0_开头,以此类推,目前只支持2级,待改进
  	  $.get(url,queryParams,function(data) {
			for(var dIndex in data) {
				var item = data[dIndex];
				var counter = 0;
				tree.append("<li id='"+ counter +"_" + item.id + "' data='"+JSON.stringify(item)+"'>" + item.text + "</li>");
				if( item.children ) {
					$("#"+ counter + "_" + item.id).append("<ul></ul>");
					var $ul_children = $("#"+ counter + "_" + item.id).find("ul");
					counter++;
					//alert(item.children.length);
					for(var cIndex in item.children) {
						var child = item.children[cIndex];
						$ul_children.append("<li id='"+ counter + "_" + child.id + "' data='"+JSON.stringify(child)+"'>" + child.text + "</li>");
					}
					//item = item.children;
				}
			}
			tree_init();
  	  });
    };
    
    var tree_init = function() {
    	
    	//初始化父集
        tree.addClass("tree");
        
        tree.find('li').has("ul").each(function () {
            var branch = $(this);
            branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
            branch.addClass('branch');
            
            //动态切换icon,并且显示子集
            branch.on('click', function (e) {
                if (this == e.target) {
                    var icon = $(this).children('i:first');
                    icon.toggleClass(openedClass + " " + closedClass);
                    $(this).children().children().toggle();
                    //onNodeClick.call(this,false);
                }
            });
            branch.children().children().toggle();
        });
        
      //点击父集指示器,关联li点击
      tree.find('.branch .indicator').each(function(){
        $(this).on('click', function () {
            $(this).closest('li').click();
        });
      });
      
      //若需要显示多选框
      if( checkbox ) {
    	  tree.find("li").each(function() {
    		  var $li = $(this);
    		  if( $li.find("i").length > 0 ) {
    			  $li.find("i").after("<i class='glyphicon glyphicon-unchecked'></i>");
    		  } else {
    			  $li.prepend("<i class='glyphicon glyphicon-unchecked'></i>");
    		  }
    		  
    		  //子集若全部勾选取消相应的父集也勾选取消
    		  $li.not(":has(ul)").click(function() {
    			  if( onBeforeNodeClick.call(this,{"target":$li}) ) {
    				  
    				//alert("子集");
        			  var $i = $(this).find("i");
        			  var $li_parent = $li.closest("ul").closest("li");
        			  //alert($li_parent.attr("class"));
        			  $i.toggleClass("glyphicon-check glyphicon-unchecked");
        			  var iconSame = true;
        			  $li.siblings().each(function(index,item) {
        				 if($(item).find("i").attr("class") != $i.attr("class")) {
        					 iconSame = false;
        				 } 
        			  });
        			  if( iconSame && $i.hasClass("glyphicon-check")) {
        				  //通常的写法,本身是没有错误,但是对于本次业务出现bug所以改用下面一句,包括上面if 后面的&&条件也是,经过测试效果是一致的
        				  //$li.closest("ul").closest("li").find(".glyphicon").not(".indicator").attr("class",$i.attr("class"));
        				  $li.closest("ul").closest("li").children("i").not(".indicator").trigger("click");
        			  //当子集从全都选中到取消选中一个的时候,父集要对应取消选中
        			  } else if( $li_parent.children("i").not(".indicator").attr("class") == "glyphicon glyphicon-check" ) {
        				  $li_parent.children("i").not(".indicator").attr("class","glyphicon glyphicon-unchecked");
        			  }
        			  onNodeClick.call(this,true);
    				  
    			  }
    		  });
    		  
    		  //父集勾选取消相应的子集菜单也跟着全部勾选取消
    		  $li.has("ul").find("i").not(".indicator").click(function() {
    			  if( onBeforeNodeClick.call(this,{"target":$li}) ) {
	    			  //alert("父集");
	    			  var _$i = $(this);
	    			  _$i.toggleClass("glyphicon-check glyphicon-unchecked");
	    			  _$i.closest("li").find("ul li").each(function() {
	    				  var _$li = $(this);
	    				  _$li.find("i").attr("class",_$i.attr("class"));
	    			  });
	    			  onNodeClick.call(this,true);
    			  }
    		  });
    		  
    	  });
      }
        //a 标签关联li点击事件
        tree.find('.branch>a').each(function () {
            $(this).on('click', function (e) {
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
        
        //button 标签关联li点击事件
        tree.find('.branch>button').each(function () {
            $(this).on('click', function (e) {
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
    };
    
	var tree_methods = {
			
			init : function( options ) {
				var defaults = {
			    		  openedClass : 'glyphicon-minus-sign',
			    		  closedClass : 'glyphicon-plus-sign',
			    		  checkbox : false,
			    		  onBeforeNodeClick : function( node ) {return true;},
			    		  onNodeClick : function(isLeaf) {}
			      };
			      
			      var settings = $.extend({},defaults,options);
			      
			      tree = $(this);
			      openedClass = settings.openedClass;
			      closedClass = settings.closedClass;
			      checkbox = settings.checkbox;
			      onBeforeNodeClick = settings.onBeforeNodeClick;
			      onNodeClick = settings.onNodeClick;
			      
			      var url = settings.url;
			      var queryParams = settings.queryParams;
			      
			      
			      if( url ) {
			    	  treeAjax_init(url,queryParams);
			      } else {
			    	  tree_init();
			      }
			      
			   
				},
				
				isLeaf : function( $target ) {
					if( $target.find("ul").length > 0 ) {
						return false;
					} else {
						return true;
					}
				},
				
				getChecked : function() {
					var checked = []; 
					tree.find("li").each(function() {
						var $li = $(this);
						var $i = $li.find("i").not(".indicator");
						var data = JSON.parse($li.attr("data"));
						data["target"] = $li;
						if( $i.attr("class") == "glyphicon glyphicon-check" ) {
							//alert($i.attr("class"));
							checked.push(data);
						}
					});
					//alert("checkedLength=" + checked.length);
					if( checked.length == 0 ) {
						return null;
					} else {
						return checked;
					}
				},
				
				unCheckedAll : function() {
					$(".glyphicon-check").toggleClass("glyphicon-check glyphicon-unchecked");
				},
				
				unChecked : function( target ) {
					target.find(".glyphicon-check").toggleClass("glyphicon-check glyphicon-unchecked");
				},
				
				reload : function( options ) {
					tree.children().each(function(index,item) {
						$(item).remove();
					});
					treeAjax_init(options.url,options.queryParams);
				},
				
				isParent : function( $children, $parent ) {
					if( $children.closest($parent).length > 0 ) {
						//alert("isParent");
						return true;
					} else {
						return false;
					}
				}
	};
	
	$.fn.treed = function() {
		
		var method = arguments[0];
				
		if( tree_methods[method] ) {
			method = tree_methods[method];
			arguments = Array.prototype.slice.call(arguments,1);
		} else if( typeof(method) == 'object' || !method ) {
			method = tree_methods.init;
		} else {
			$.error( 'Method : ' +  method + ' does not exist on jQuery.treed!' );
            return this;
		}
		
		return method.apply(this, arguments);
	};
	
})(jQuery);