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
		},
		font: function(){
			var doc = document.documentElement,
			fontSizeVal = (parseFloat((doc.clientWidth / 320 * 62.5) * 100) / 100);
			fontSizeVal = (fontSizeVal >= 85) ? 85 : fontSizeVal;

			doc.style.fontSize = fontSizeVal + '%';
		},
	},
	slide: {
		init: function(target, sort, option){
			if(sort == "slick") {
				//console.log("slick");
				target.slick(option);
			}
		},
	},
	layer: {
		scrollTop: 0,
		calculate: function(layer){
			var layer = $("." + layer),
				layerIn = layer.find(".pop_inner"),
				winH = $(window).height(),
				winW = $(window).width();
				layerIn.removeAttr("style");

			var layerH = layer.height(),
				layerW = layer.width(),
				marginH = parseInt(layerIn.css("marginTop")) + parseInt(layerIn.css("marginBottom"));
			//console.log(layer, winH, winW, layerH, layerW, marginH);
			
			if(winH < layerH){
				layerIn.css({
					height: winH - marginH,
					overflow: "auto",
				});
				layer.css({
					top: 0,
					left: (winW - layerW) / 2,
				});
			}
			else{
				layerIn.removeAttr("style");
				layer.css({
					top: (winH - layerH) / 2,
					left: (winW - layerW) / 2,
				});
			}

		},
		open: function(target, dimmed, parent, callback){
			var that = this;
			$(document).on("click", target, function(e){
				var layer = $(this).data("layer");
				that.scrollTop = $(window).scrollTop();

				if(callback){
					callback(show);
				}
				else{
					show();
				}
				
				function show(){
					$("body").addClass("fixed");
				
					if(dimmed) $(dimmed).fadeIn();
					$(parent + "." + layer).show();
					that.calculate(layer);
					//console.log(layer, that.scrollTop);

					$(window).on("resize.layer", function(){
						that.calculate(layer);
					});
				}

				e.preventDefault();
			});
		},
		close: function(target, dimmed, parent, callback){
			var that = this;
			$(document).on("click", target, function(e){
				var layer;
				if(target == dimmed){
					layer = $(parent);
					//console.log("dimmed");
				}
				else{
					layer = $(parent + "."+$(this).data("layer"));
				}
				
				if(callback){
					callback(hide);
				}
				else{
					hide();
				}

				function hide() {
					layer.hide();
					$("body").removeClass("fixed");
					$(window).scrollTop(that.scrollTop);
					if(dimmed) $(dimmed).fadeOut();
					//console.log(layer, that.scrollTop);

					$(window).off("resize.layer");
				}

				e.preventDefault();
			});
		},
	},
	event: {
		toggle: function(target){
			var layer = $("." + target.data("target"));

			target.on("click", function(e) {
				var sort = target.data("sort");
				var onClass = target.data("on");
				//console.log(sort, onClass);
				if(onClass){
					if($(this).hasClass("on")){
						$(this).removeClass("on");
						layer.removeClass("on");
					}
					else{
						$(this).addClass("on");
						layer.addClass("on");
					}	
				}

				if(layer.is(":visible")){
					if(sort == "fade"){
						layer.fadeOut();
					}
					else if (sort == "normal"){
						layer.hide();
					}
					else if (sort == "none"){
						return false;
					}
					else{
						layer.slideUp();
					}
				}
				else{
					if(sort == "fade"){
						layer.fadeIn();
					}
					else if (sort == "normal"){
						layer.show();
					}
					else if (sort == "none"){
						return false;
					}
					else{
						layer.slideDown();
					}
				}
				e.preventDefault();
			});
		},
		goTop: function(target){
			target.on("click",function(e) {
				$("html, body").stop().animate({"scrollTop": 0}, 1000);
            	e.preventDefault();
			});
		}, 
		goTarget:function(target){
			$(document).on("click", target, function(e){
				var hrefString = $(this).attr("href");
				var offsetTop = $(hrefString).offset();
				if(offsetTop){
					offsetTop = offsetTop.top;
					$("html, body").stop().animate({"scrollTop": offsetTop}, 1000);
				}
				e.preventDefault();
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
		tap: function(tab_nav, tab_cont){
			$(document).on("click", tab_nav, function(e){
				var parent = $(this).parent().parent().data("tab");
				var layer = (tab_cont + "." + parent + " > div");
				var idx = $(this).index();

				$(this).addClass("on").siblings().removeClass("on");
				$(layer).eq(idx).show().siblings().hide();
				//console.log(layer, idx);
				e.preventDefault();
			});
		},
		calander: function(target, option, callback){
			$(target).each(function(){
				$(this).datepicker(option); 
				$(this).datepicker("setDate", "today"); 
				$(this).on("change", callback);
			});
		},
		
	},
};

/*돔컨텐츠로즈 전에 실행 함수-root엘리먼트만 존재하는시점*/
COEX.resize.font();


$(function(){

	/*제이쿼리 객체 캐쉬 및 상수*/
	var $BODY = $("body"),
		$GOTOP = $(".footer .btnTop"),
		$NOTICE = $(".main_wrap .cols_notice ul"),
		$TOGGLE = $(".toggle_btn"),
		GOTARGET = ".go_target_bt"
		LAYER_BT_OPEN = ".layer_open_bt",
		LAYER_BT_CLOSE = ".layer_close_bt",
		LAYER_DIM = ".layer_dimmed",
		LAYER_DIV = ".pop_layer",
		TAB_NAV = ".tab_nav li",
		TAB_CONTS= ".tab_cont";



	/*호스트환경 체크*/
	COEX.resize.pf($BODY);
	COEX.resize.chk($BODY);


	/*메인 공지사항 슬라이드*/
	if($NOTICE && $.fn.slick) {
		COEX.slide.init($NOTICE, "slick", {
			infinite: true,
			autoplay: true,
			arrows: false,
			vertical: true,
		});
	}


	/*토글*/
	COEX.event.toggle($TOGGLE);

	/*pc top으로 scroll*/
	COEX.event.topScrollCh($GOTOP, $BODY);

	/*top으로*/
	COEX.event.goTop($GOTOP);

	/*target으로*/
	COEX.event.goTarget(GOTARGET);

	/*layer팝업*/
	COEX.layer.open(LAYER_BT_OPEN, LAYER_DIM, LAYER_DIV);
	COEX.layer.close(LAYER_BT_CLOSE, LAYER_DIM, LAYER_DIV);
	COEX.layer.close(LAYER_DIM, LAYER_DIM, LAYER_DIV);

	COEX.layer.open("#test01", LAYER_DIM, LAYER_DIV, function (show){
		alert("콜백");

		show();
	});
	COEX.layer.close("#test001", LAYER_DIM, LAYER_DIV, function (hide){
		alert("콜백");

		hide();
	});

	/*pc용 달력*/
	COEX.event.calander(".datepicker", {
		changeMonth:true,
		changeYear:true,
		showOn:"button",
		buttonText: "선택",
		buttonImageOnly:false,
		showMonthAfterYear:true,
		minDate:null,  //최소 기간
		maxDate:null,  //최대 노출
		yearRange:"c-5:c+5",  //노출되는 범위
		dateFormat :"yy-mm-dd",
		dayNamesMin:["일", "월", "화", "수", "목", "금", "토"],
		monthNamesShort: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ],
	},
	function(e){
		console.log("날짜변경됨");
	});

	


	/*탭버튼*/
	COEX.event.tap(TAB_NAV, TAB_CONTS);

	$(window).on("load", function(){
	});

	$(window).on("scroll", function(){
		/*pc top으로 scroll*/
		COEX.event.topScrollCh($GOTOP, $BODY);
	});

	$(window).on("resize", function(){
		/*호스트환경 체크*/
		COEX.resize.chk($BODY);

		/*rem 용 폰트 리사이즈*/
		COEX.resize.font();

	});


});

