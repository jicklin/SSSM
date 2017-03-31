jQuery.extend( {

	myValidate : function() {

		var common = function(_selector, _condition) {

			var msg = "";
			
			if( _selector.length > 0 ) {
				
				_selector.each(function(index, item) {
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

		//整数正则表达式
		var regInt = /^(-|\+)?\d+$/;
		//手机正则表达式
		var regPhone = /^0?(13[0-9]|15[012356789]|18[01236789]|14[57])[0-9]{8}$/;
		
		var intMessage = "";
		var nullMessage = "";
		var phoneMessage = "";
		
		intMessage = common($(".integer"), function(value) {
			return !regInt.test(Number(value));
		});
		
		nullMessage = common($(".notnull"), function(value) {
			return $.trim(value).length == 0;
		});
		
		phoneMessage = common($(".phone"), function(value) {
			return !regPhone.test(value);
		});
		
		if(intMessage != "") {
			intMessage = intMessage + "必须为整数\n" ; 
		}
		
		if(nullMessage != "") {
			nullMessage = nullMessage + "不能为空\n" ;
		}
		
		if(phoneMessage != "") {
			phoneMessage = phoneMessage + "填写不正确\n" ;
		}
		return intMessage + nullMessage + phoneMessage;

	}

});
