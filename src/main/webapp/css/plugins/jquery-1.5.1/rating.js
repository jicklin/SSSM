(function ($) {
    var themes = [];
    $.fn.slidy = function (options) {
        var defaultOptions = {
            width: 168,
            maxval: 12,
            minval: 1,
            interval: 1,
            scale: 20,
            numberOfValue: 0,
            finishedCallback: null,
            moveCallback: null,
            defaultValue: null,
            theme: {
                image: '/static/images/blue.png',
                width: 168,
                height: 36
            }
        }
        $.extend(defaultOptions, options);
        defaultOptions.width = defaultOptions.theme.width;
        var cacheImage = document.createElement('img');
        cacheImage.src = defaultOptions.theme.image;
        themes.push(cacheImage)
        defaultOptions.theme.height = defaultOptions.theme.height / 2;
        this.each(function () {
            var slider = $(this);
            $('<div class="value"></div><div class="cursor"></div>').appendTo(slider);
            slider.css({
                overflow: 'hidden',
                position: 'relative',
                'background-repeat': 'no-repeat',
                'background-image': "url('" + cacheImage.src + "')",
                'height': defaultOptions.theme.height + 'px',
                'width': defaultOptions.theme.width + 'px'
            });
            $('div', slider).css({
                margin: '0px',
                padding: '0px',
                'background-repeat': 'no-repeat'
            })
            $('.value', slider).css({
                top: '0px',
                position: 'absolute',
                'z-index': '1',
                'background-repeat': 'no-repeat',
                'background-position': '0px -' + defaultOptions.theme.height + 'px',
                left: '-95px',
                'background-image': "url('" + cacheImage.src + "')",
                'height': defaultOptions.theme.height + 'px',
                'width': defaultOptions.theme.width + 'px'
            })
            $('.cursor', slider).css({
                top: '0px',
                position: 'absolute',
                'z-index': 2,
                'background-repeat': 'no-repeat',
                'background-position': '0px -' + (2 * defaultOptions.theme.height) + 'px',
                left: '0px',
                'background-image': "url('" + cacheImage.src + "')",
                'height': defaultOptions.theme.height + 'px',
                'width': defaultOptions.theme.width + 'px'
            })
            var aSlider = {
                width: 106,
                maxval: 10,
                minval: 10,
                interval: 0.5,
                scale: 20,
                numberOfValue: 0,
                clickedOnCursor: false,
                currentValue: 1,
                previousValue: 0,
                isCalled: false,
                finishedCallback: null,
                moveCallback: null,
                init: function (options) {
                    this.width = options.width;
                    this.maxval = options.maxval;
                    this.minval = options.minval;
                    this.interval = options.interval;
                    this.finishedCallback = options.finishedCallback;
                    this.moveCallback = options.moveCallback;
                    this.numberOfValue = this.maxval / this.interval;
                    this.scale = this.width / this.numberOfValue;
                    if (options.defaultValue == null) {
                        this.setValue(options.minval / this.interval);
                    } else {
                        this.setValue(options.defaultValue / this.interval);
                    }
                    $(document).mouseup(function () {
                        aSlider.clickedOnCursor = false;
                        if (!aSlider.isCalled) {
                            aSlider.finishedCallback && aSlider.finishedCallback.call(this, aSlider.currentValue * aSlider.interval);
                            aSlider.isCalled = true;
                        }
                    }).mousemove(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        aSlider.handleCursor(e);
                    });
                    $('.cursor', slider).mouseup(function () {
                        aSlider.clickedOnCursor = false;
                    }).mousedown(function (e) {
                        e.preventDefault();
                        aSlider.clickedOnCursor = true;
                    });
                },
                handleCursor: function (e) {
                    if (aSlider.clickedOnCursor) {
                        var sliderOffest = $(slider).offset();
                        var pos = [];
                        pos[0] = e.pageX - sliderOffest.left;
                        var valueLevelAtCurosor = Math.floor(pos[0] * this.numberOfValue / this.width);
                        this.currentValue = valueLevelAtCurosor <= 1 ? 1 : valueLevelAtCurosor;
                        this.currentValue = this.currentValue >= this.numberOfValue ? this.numberOfValue : this.currentValue;
                        if (this.previousValue != this.currentValue) {
                            this.setValue(this.currentValue);
                            this.previousValue = this.currentValue;
                        }
                    }
                },
                setValue: function (value) {
                    this.currentValue = value;
                    aSlider.moveCallback && aSlider.moveCallback.call(this, aSlider.currentValue * aSlider.interval);
                    var newLeftPos = aSlider.width - Math.floor(value * this.scale);
                    if (newLeftPos >= (-aSlider.width + this.scale)) {}
                    $('.value', slider).css({
                        'left': '-' + newLeftPos + 'px'
                    });
                    aSlider.isCalled = false;
                }
            }
            aSlider.init(defaultOptions);
        });
    }
})(jQuery);