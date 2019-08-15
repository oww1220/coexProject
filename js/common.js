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
			COEX.resize.resize(target);
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
		resize: function($BODY){
			$(window).on("resize", function(){
				COEX.resize.chk($BODY);
				COEX.resize.font();
			});
		}
	},
	Map: {
		init: function(){
			var JqMap = function(){
				this.map = new Object();
			};
			JqMap.prototype = {
				/* key, value 값으로 구성된 데이터를 추가 */
				put: function (key, value) {
					this.map[key] = value;
				},
				/* 지정한 key값의 value값 반환 */
				get: function (key) {
					return this.map[key];
				},
				/* 구성된 key 값 존재여부 반환 */
				containsKey: function (key) {
					return key in this.map;
				},
				/* 구성된 value 값 존재여부 반환 */
				containsValue: function (value) {
					for (var prop in this.map) {
						if (this.map[prop] == value) {
							return true;
						}
					}
					return false;
				},
				/* 구성된 데이터 초기화 */
				clear: function () {
					for (var prop in this.map) {
						delete this.map[prop];
					}
				},
				/*  key에 해당하는 데이터 삭제 */
				remove: function (key) {
					delete this.map[key];
				},
				/* 배열로 key 반환 */
				keys: function () {
					var arKey = new Array();
					for (var prop in this.map) {
						arKey.push(prop);
					}
					return arKey;
				},
				/* 배열로 value 반환 */
				values: function () {
					var arVal = new Array();
					for (var prop in this.map) {
						arVal.push(this.map[prop]);
					}
					return arVal;
				},
				/* Map에 구성된 개수 반환 */
				size: function () {
					var count = 0;
					for (var prop in this.map) {
						count++;
					}
					return count;
				}
			};

			return new JqMap();

		}
	},
	slide: {
		init: function(target, sort, option){
			if(sort == "slick") {
				//console.log("slick");
				return target.slick(option);
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
				layerIn.find(".pop_scroll").removeAttr("style");

			var layerH = layer.height(),
				layerW = layer.width(),
				marginH = parseInt(layerIn.css("marginTop")) + parseInt(layerIn.css("marginBottom"));
			//console.log(layer, winH, winW, layerH, layerW, marginH);
			
			if(winH < layerH){
				layerIn.find(".pop_scroll").css({
					height: winH - marginH,
					overflow: "auto",
				});
				layer.css({
					top: 0,
					left: (winW - layerW) / 2,
				});
			}
			else{
				layerIn.find(".pop_scroll").removeAttr("style");
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
					callback(show, layer);
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
					callback(hide, layer);
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

			$(document).on("click", target, function(e) {
				var layer = $("." + $(this).data("target"));
				var sort = $(this).data("sort");
				var onClass = $(this).data("on");
				var siblings = $(this).data("siblings");
				//console.log(sort, onClass, siblings);
				if(onClass){
					if(siblings){
						$(this).parent().siblings().find(target).removeClass("on");
						$(this).parent().siblings().find(target).siblings().removeClass("on");
					}
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
						if(siblings){
							$(this).parent().siblings().find(target).siblings().fadeOut();
						}
						layer.fadeIn();
					}
					else if (sort == "normal"){
						if(siblings){
							$(this).parent().siblings().find(target).siblings().hide();
						}
						layer.show();
					}
					else if (sort == "none"){
						return false;
					}
					else{
						if(siblings){
							$(this).parent().siblings().find(target).siblings().slideUp();
						}
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
		customSelect:function(parent){
			var target = parent + " button";
			var listTarget = parent + " a";
			var $parent;
			$(document).on("click", target, function(e){
				$parent = $(this).parent();
				if($parent.hasClass("on")){
					$parent.removeClass("on");
					$parent.css({"z-index": 0});
				}
				else{
					$(parent).css({"z-index": 0});
					$(parent).removeClass("on");
					$parent.addClass("on");
					$parent.css({"z-index": 1});
				}
				//console.log($parent);
			});
			$(document).on("click", listTarget, function(e){
				var bt = $parent.find("button");
				var input = $parent.find("input");
				var val = $(this).data("val");
				var text = $(this).text();

				input.val(val);
				bt.text(text);
				//console.log(input, input.val());

				$parent.addClass("select");
				$parent.removeClass("on");
				$parent.css({"z-index": 0});

				e.preventDefault();
			});
		},
		hoverClick: function($BODY, $MYPAGE_REGILIST, targetDiv){
			event();
			function event(){
				//console.log($BODY.hasClass("pc"))
				if($BODY.hasClass("pc")){
					$MYPAGE_REGILIST.on({
						mouseenter: function(e){
							var target = $(this).find(".hover");
							if(!target.is(":visible")){
								target.fadeIn();
							}
						},
						mouseleave: function(e){
							var target = $(this).find(".hover");
							if(target.is(":visible")){
								target.fadeOut();
							}
						},
					}, targetDiv);
				}
				else{
					$MYPAGE_REGILIST.on({
						click: function(e){
							var target = $(this).find(".hover");
							if(target.is(":visible")){
								target.fadeOut();
							}	
							else{
								target.fadeIn();
								$(this).parent().siblings().find(".hover").fadeOut();
							}
						},
	
					}, targetDiv);
				}
			}

			$(window).on("resize", function(){
				$MYPAGE_REGILIST.off("click mouseenter mouseleave");
				event();
			});	
		}
		
	},
	iscrolls: {
		cash: null,
		init: function(target, option, sort){
			this.cash = this.cash ? this.cash : COEX.Map.init();

			if(sort) {
				if($("body").hasClass(sort)){
					$(target)[0].iscrolls = new IScroll(target, option);
				}
			}
			else{
				$(target)[0].iscrolls = new IScroll(target, option);
			}
			this.cash.put(target, {sort: sort, option: option});

		},
		resize: function(){
			var that = this;
			if(that.cash){
				$.each(that.cash.map, function(key, value){
					if(value.sort) {

						if($("body").hasClass(value.sort)){
							if(!($(key)[0].iscrolls)){
								$(key).removeAttr("style");
								$($(key)[0].children[0]).removeAttr("style");
								$(key)[0].iscrolls = new IScroll(key, value.option);
								$(key)[0].iscrolls.refresh();
							}
						}
						else{
							if(($(key)[0].iscrolls)){
								$(key).removeAttr("style");
								$($(key)[0].children[0]).removeAttr("style");
								$(key)[0].iscrolls.destroy();
								$(key)[0].iscrolls = null;
							}
							
						}
						
					}
				});
			}
			else{
				return;
			}
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
		$REGISLIDE = $(".sub_wrap .regi_conts .slide ul"),
		$REGI_LIST = $(".regi_list_wrap .regi_list"),
		SELECTCUSTOM = ".select_custum",
		TOGGLE = ".toggle_btn",
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
	

	$(window).on("scroll", function(){
		/*pc top으로 scroll*/
		COEX.event.topScrollCh($GOTOP, $BODY);
	});

	
	/*메인 공지사항 슬라이드*/
	if($NOTICE.length && $.fn.slick) {
		(function(){
			COEX.slide.init($NOTICE, "slick", {
				infinite: true,
				autoplay: true,
				arrows: false,
				vertical: true,
			});
		})();
	}

	/*사전등록 슬라이드*/
	if($REGISLIDE.length && $.fn.slick) {
		(function(){
			var slide = COEX.slide.init($REGISLIDE, "slick", {
				infinite: true,
				autoplay: true,
			});
		})();
	}

	/*사전등록 리스트:pc-hover, mo-click*/
	if($REGI_LIST.length){
		COEX.event.hoverClick($BODY, $REGI_LIST, ".regi_in");
	}


	/*커스텀 셀렉트*/
	COEX.event.customSelect(SELECTCUSTOM);

	/*토글*/
	COEX.event.toggle(TOGGLE);

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

	/*업체정보 레이어*/
	if($(".layer_open_company").length){
		
		COEX.layer.open(".layer_open_company", LAYER_DIM, LAYER_DIV, function (show, layer){	
			show();
			var $target = $("." + layer + " .slide ul");
			var $texts = $("." + layer + " .texts li");
			//console.log($target);
			COEX.slide.init($target, "slick", {
				infinite: true,
				autoplay: true,
				adaptiveHeight: true,
			});

			$target.on("afterChange", function(event, slick, currentSlide){
				//console.log(currentSlide);
				$texts.eq(currentSlide).addClass("on").siblings().removeClass("on");
			});

		});
		COEX.layer.close(".layer_close_compony", LAYER_DIM, LAYER_DIV, function (hide, layer){
			hide();
			var $target = layer;
			$target.find(".slide ul").slick("unslick");
		});
	}
	

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




	



});

$(window).on("load", function(){

	/*아이스크롤*/
	if($("#iscroll01").length){
		COEX.iscrolls.init("#iscroll01", { 
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: true,
		}, "pc");
		if($("#iscroll01")[0].iscrolls){
			$("#iscroll01")[0].iscrolls.refresh();
		}	
	}

	/*아이스크롤 리사이징*/
	$(window).on("resize",function(){	
		COEX.iscrolls.resize();
	});
	

});

