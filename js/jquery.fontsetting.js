/**
 * jQuery's fontsetting Plugin
 *
 */
(function($) {
    var em = [];
	var colors=[];
	var colorIndex=255;
	while(colorIndex>0){
		var rgb=getRGB(colorIndex);
		colors.push('<span value="'+rgb+'" style="background:#'+rgb+';width:15px;height:15px;float:left;"></span>')
		colorIndex-=25;
	}
	function getRGB(num){
		num=new Number(num||0);
		return num.toString(16)+''+num.toString(16)+''+num.toString(16);
	}
    $.fn.extend({
    fontsetting : function(options) {
        var defaults = {
            containerObj : '', //父对象
            emotions : em,//表情信息json格式，id表情排序号 phrase表情使用的替代短语url表情文件名
			imageurl: 'images/face/',
            top : 0, //相对偏移
            left : 0 //相对偏移
        };
        var options = $.extend(defaults, options);
        
        return this.each(function() {
			
            var Obj = $(this);
            var container = options.containerObj;
            $(Obj).bind("click", function(e) {
				$('<div></div>').html(colors.join('')).dialog({width:50,height:50});
			});
		
			
			return ;

            var Obj = $(this);
            var container = options.containerObj;
            $(Obj).bind("click", function(e) {
                e.stopPropagation();
                var faceHtml = '<div id="face">';
                faceHtml += '<div id="texttb"><a class="f_close" title="关闭" href="javascript:void(0);"></a></div>';
                faceHtml += '<div id="facebox">';
                faceHtml += '<div id="face_detail" class="facebox clearfix"><ul>';

                for( i = 0; i < options.emotions.length; i++) {
                    faceHtml += '<li text=' + options.emotions[i].phrase + ' type=' + i + '><img title=' + options.emotions[i].phrase + ' src="'+options.imageurl + options.emotions[i].url + '"  style="cursor:pointer; position:relative;"   /></li>';
                }
                faceHtml += '</ul></div>';
                faceHtml += '</div><div class="arrow arrow_t"></div></div>';

                container.find('#face').remove();
                container.append(faceHtml)

                container.find("#face_detail ul >li").bind("click", function(e) {
                    var txt = $(this).attr("text");
                    var faceText = txt;

                    options.txtAreaObj.val(options.txtAreaObj.val() + faceText);
                    container.find("#face").remove();

                    var setFocusText = options.txtAreaObj;
                    var setFocusTextLeg = setFocusText.val().length;
                    setFocusText.focus();
                    // 默认使用focus方法聚焦
                    // 判断是否为Ie浏览器
                    if($.browser&&$.browser.msie) {
                        var txt = setFocusText[0].createTextRange();
                        // 将传入的控件对象转换为Dom对象，并创建一个TextRange对象
                        txt.moveStart('character', setFocusTextLeg);
                        // 设置光标显示的位置
                        txt.collapse(true);
                        txt.select();
                    }
                });
                //关闭表情框
                container.find(".f_close").bind("click", function() {
                    container.find("#face").remove();
                });
                //处理js事件冒泡问题
                $('body').bind("click", function(e) {
                	e.stopPropagation();
                    container.find('#face').remove();
                });
                container.find('#face').bind("click",function(e){
                	e.stopPropagation();
                });

                var offset = $(e.target).position();
                offset.top += options.top;
                offset.left += options.left;
                container.find("#face").css(offset).show();
            });
        });
    }
    })
})(jQuery);
