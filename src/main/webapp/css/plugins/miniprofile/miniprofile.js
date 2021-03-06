/** 
  *    迷你名片 by JinXin
  *    @2014-7-10
  */

define(function(require, exports, module) {
    var $ = window.jQuery || require('/static/js/jquery-1.10.2/jquery.min');
    var Base = require('arale/base/1.1.1/base');
    //var template = require('./miniprofile.tpl');
    require('./miniprofile.css');
    /**     
      *     target:  <a href="/general/ipanel/user/user_info.php?UID=146" data-uid="146"></a>
      *
      */
    
    function format(result, args){
        if (arguments.length > 1) {    
            if (arguments.length == 2 && typeof (args) == "object") {
                for (var key in args) {
                    if(args[key]!=undefined){
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
        }
        return result;
    }
    var MiniProfile = Base.extend({
        attrs: {
            url: '/inc/get_userinfo.php',
            store: {},
            target: '',
            container: 'body',
            offset: 5,
            className: 'miniprofile',
            focusCallback: function(){},
            unfocusCallback: function(){}
        },
        initialize: function(config) {
            if(MiniProfile.instance){
                return MiniProfile.instance;
            }else{
                MiniProfile.instance = this;
            }

            MiniProfile.superclass.initialize.call(this, config);
            this.delegateEvent();
        },
        getTmpl: function(c){
            var tmpl = {
                tip: [
                    '<div class="miniprofile">',
                        '<div class="miniprofile-arrow"><b></b></div>',
                        '<div class="miniprofile-inner">',
                            '<div class="miniprofile-loading"></div>',
                        '</div>',
                    '</div>'
                    ].join(''),
                content: [
                    '<div class="mp-avator"><img src="{avatar}"></div>',
                    '<div class="mp-info">',
                        '<h6 class="mp-name">{user_name} <span class="mp-online">{online}</span></h6>',
                        '<p>{dept_name} - {priv_name}</p>',
                        '<p class="mp-sign">{sign}</p>',
                    '</div>',
                    '<div class="mp-ft">',
                        '<div class="mp-focus-container"><input type="hidden" name="concern" class="concern" value="{concern}" /><button type="button" class="mp-button focus-btn hide">关注</button><button type="button" class="mp-button cancel-btn hide">取消关注</button></div>',
                        '<div class="mp-op-container"><button type="button" class="mp-button email-btn">邮件</button><button type="button" class="mp-button weixun-btn">微讯</button></div>',
                    '</div>',
                    '<input type="hidden" name="mp-uid" value="{uid}" />',
                    '<input type="hidden" name="mp-userid" value="{user_id}" />',
                    '<input type="hidden" name="mp-username" value="{user_name}" />'
                ].join('')
            };
            return tmpl[c] || '';
        },
        render: function(){
            this.$tip = $(this.getTmpl('tip')).appendTo(this.get('container'));
        },
        getCache: function(key, callback){
            var self = this, store = this.get('store');
            if(store[key]){
                callback && callback(store[key]);
            }else{
                this.fetch(key, callback);
            }
        },
        fetch: function(key, callback){
            var self = this, store = this.get('store');
            $.get(self.get('url'), { UID: key }, function(ret){
                if(ret){
                    store[key] = ret.data;
                    callback && callback(ret.data);
                }
            });
        },
        show: function(e){
            var self = this,
                $target = $(e.currentTarget),
                uid = $target.attr('data-uid');

            if(!uid){
                return;
            }
            this.uid = uid;
            this.$target = $target;
            !this.$tip && this.render();
            this.clearHideTimer();

            var $tip = this.$tip, 
                pos = this.getPosition();

            $tip.css({
                'display': 'block',
                'visibility': 'hidden'
            });
            actualWidth = $tip[0].offsetWidth
            actualHeight = $tip[0].offsetHeight

            var gravity = this.autoNS() + this.autoWE();
            
            var tp;
            switch (gravity.charAt(0)) {
                case 'n':
                    tp = {top: pos.top + pos.height + this.get('offset'), left: pos.left + pos.width / 2 - actualWidth / 2};
                    break;
                case 's':
                    tp = {top: pos.top - actualHeight - this.get('offset'), left: pos.left + pos.width / 2 - actualWidth / 2};
                    break;
                case 'e':
                    tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.get('offset')};
                    break;
                case 'w':
                    tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.get('offset')};
                    break;
            }
            
            if (gravity.length == 2) {
                if (gravity.charAt(1) == 'w') {
                    tp.left = pos.left + pos.width / 2 - 23;
                } else {
                    tp.left = pos.left + pos.width / 2 - actualWidth + 23;
                }
            }
            
            $tip.css(tp).attr('class', this.get('className')).addClass('miniprofile-' + gravity);
            
            this.loading();

            $tip.css({
                'display': 'block',
                'visibility': 'visible'
            });

            this.getCache(uid, function(data){
                self.updateContent(data);
            });
        },
        updateContent: function(data){
            var userInfo = format(this.getTmpl('content'), data);
            this.$tip.find('.miniprofile-inner').html(userInfo);
            this.$tip.find('.mp-focus-container button').hide();
            var isConcern = this.$tip.find('.concern').val();
            if(isConcern == 1){
                $('.cancel-btn').show();
            }else{
                $('.focus-btn').show();
            }
            //if isme, then the follow button will be hidden
            if(data.isme) {
                $('.mp-focus-container').hide();
            }
        },
        hide: function(){
            var self = this;
            this.clearHideTimer();
            this.hidetimer = setTimeout(function(){
                self.$tip.hide();
            }, 200);
        },
        clearHideTimer: function(){
            this.hidetimer && clearTimeout(this.hidetimer);
        },
        loading: function(){
            this.$tip.find('.miniprofile-inner').html('<div class="miniprofile-loading"></div>');
        },
        autoNS: function(){
            return this.$target.offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
        },
        autoWE: function(){
            return this.$target.offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
        },
        getPosition: function () {
            var el = this.$target[0];
            return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
                width: el.offsetWidth, 
                height: el.offsetHeight
            }, this.$target.offset())
        },
        delegateEvent: function(){
            var self = this;
            $('body').delegate('a[data-uid]', 'mouseenter', $.proxy(this.show, this));
            $('body').delegate('a[data-uid],.miniprofile', 'mouseleave', $.proxy(this.hide, this));
            $('body').delegate('.miniprofile', 'mouseenter', $.proxy(this.clearHideTimer, this));
            $('body').delegate('.email-btn', 'click', function(){
                var userid = self.$tip.find('[name="mp-userid"]').val();
                var username = self.$tip.find('[name="mp-username"]').val();
                window.open("/general/email/new/?TO_ID="+userid+"&TO_NAME="+username);
            });
            $('body').delegate('.weixun-btn', 'click', function(){
                var uid = self.$tip.find('[name="mp-uid"]').val();
                var username = self.$tip.find('[name="mp-username"]').val();
                window.open("/general/status_bar/sms_back.php?TO_UID="+uid+"&TO_NAME="+username);
            });
            $('body').delegate('.focus-btn', 'click', function(){
                var userid = self.$tip.find('[name="mp-userid"]').val();
                var uid = self.$tip.find('[name="mp-uid"]').val();
                $.get("/general/person_info/concern_user/concern_function.php", {load:"concern",concern_content:"COMMUNITY,",group_id:0,user_id:userid}, function(d){
                    if(d == "ok"){
                        self.getCache(uid, function(d){ d.concern = 1; });
                        self.$tip.find('.focus-btn').hide();
                        self.$tip.find('.cancel-btn').show();
                    }
                    var callback = self.get('focusCallback');
                    $.isFunction(callback) && callback(uid, userid);
                });
            });
            $('body').delegate('.cancel-btn', 'click', function(){
                var uid = self.$tip.find('[name="mp-uid"]').val();
                var userid = self.$tip.find('[name="mp-userid"]').val();
                $.get("/general/person_info/concern_user/concern_function.php", {load:"cancel_concern",user_id:userid}, function(d){
                    if(d == "ok"){
                        self.getCache(uid, function(d){ d.concern = 0; });
                        self.$tip.find('.cancel-btn').hide();
                        self.$tip.find('.focus-btn').show();
                    }
                    var callback = self.get('unfocusCallback');
                    $.isFunction(callback) && callback(uid ,userid);
                });
            });
        }
    });


    exports.MiniProfile = MiniProfile;

});