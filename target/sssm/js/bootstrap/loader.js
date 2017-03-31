/**
 * @desc 加载中对话框
 *
 * @author hjj
 */

(function($) {
	'use strict';

	$.extend( {

		loader : function(action, options) {

			if (action == "show") {

				var $cusMsg = options.cusMsg;

				var $cusSize = options.cusSize;
				
				var $dialog;
				
				/*var pwindow = window.parent;
				
				var haven = false;
				
				//若父窗体中有一个有load则本页面不适用load
				while( pwindow != window.top ) {
					
					if( $(pwindow.document).find("#load").length > 0 ) {
						haven = true;
						break;
					}
					pwindow = pwindow.parent;
				}
				
				if( !haven ) {*/
				
					if( $("#load").length > 0 ) {
						
						$("#load .modal-dialog").attr("class","modal-dialog modal-"+ $cusSize);
						$("#load .modal-header").text($cusMsg);
						$dialog = $("#load");
						
					} else {
						
						$dialog = $('<div id="load" class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="overflow-y:visible;">'
								+ '<div class="modal-dialog modal-'
								+ $cusSize
								+ '">'
								+ '<div class="modal-content">'
								+ '<div class="modal-header"><h4 style="margin:0;">'
								+ $cusMsg
								+ '</h4></div>'
								+ '<div class="modal-body">'
								+ '<div class="progress progress-striped active" style="margin-bottom:0;height:12px;"><div class="progress-bar" style="width: 100%"></div></div>'
								+ '</div>' + '</div></div></div>');
	
					}
					
					$dialog.modal(action);
//				}
				
			}

			if (action == "hide") {
				
				$("#load").modal(action);
			}

		}

	});

})(jQuery);
