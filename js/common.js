var COEX = COEX || {
	resize: {
		chk: function(target){
			if (target.width() >= 1024 ) {
				target.removeClass("pc mobile tablet").addClass("pc");
			}
			else if(target.width() >=  768){
				target.removeClass("pc mobile tablet").addClass("tablet");
			}
			else {
				target.removeClass("pc mobile tablet").addClass("mobile");
			}
		},
		pf: function(target){
			var pf = navigator.platform;
			if(/iphone/i.test(pf)){ //아이폰일때
				target.addClass("iphone");
			}
		}
	},
	event: {
		toggle: function(target){
			var layer = $(target.data("target"));
			target.on("click", function() {
				if(layer.is(":visible")){
					layer.slideUp();
				}
				else{
					layer.slideDown();
				}
			});
		},
		goTop: function(target){
			target.on("click",function(e) {
				$("html, body").stop().animate({"scrollTop": 0}, 1000);
            	e.preventDefault()
			});
		}, 
		topScrollCh: function(target, parent){
			if(parent.hasClass("pc")){
				var winScroll = $(window).scrollTop();
				if(winScroll == 0){
					target.fadeOut();
				}
				else{
					target.fadeIn();
				}
			}
			else{
				return;
			}
		},	
	},
};


$(function(){

	var BODY = $("body");
	var GOTOP = $(".footer .btnTop")

	/*호스트환경 체크*/
	COEX.resize.pf(BODY);
	COEX.resize.chk(BODY);

	/*푸터 토글*/
	COEX.event.toggle($(".footer .family_wrap .family_btn"));

	/*pc top으로 scroll*/
	COEX.event.topScrollCh(GOTOP, BODY);

	/*top으로*/
	COEX.event.goTop(GOTOP);

	$(window).on("load", function(){
	});

	$(window).on("scroll", function(){
		/*pc top으로 scroll*/
		COEX.event.topScrollCh(GOTOP, BODY);
	});

	$(window).on("resize", function(){
		/*호스트환경 체크*/
		COEX.resize.chk(BODY);

	});


});

