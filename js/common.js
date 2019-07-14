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
			target.on("click", function(){
				if(layer.is(":visible")){
					layer.slideUp();
				}
				else{
					layer.slideDown();
				}
			});
		},
	}
};


$(function(){

	var BODY = $("body");

	/*호스트환경 체크*/
	COEX.resize.pf(BODY);
	COEX.resize.chk(BODY);

	/*푸터 토글*/
	COEX.event.toggle($(".footer .family_wrap .family_btn"));

	$(window).on("load", function(){
	});

	$(window).on("resize", function(){
		/*호스트환경 체크*/
		COEX.resize.chk(BODY);

	});


});

