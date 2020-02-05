var COEX = COEX || {
	resize: {
		chk: function(target){
			if (target.width() >= 1025 ) {
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
		resize: function($BODY){
			$(window).on("resize", function(){
				COEX.resize.chk($BODY);
				COEX.resize.font();
			});
		},
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
				var targetDom = $(this);
				that.scrollTop = SCROLL_Top = $(window).scrollTop();

				if(callback){
					callback(show, layer, targetDom);
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
				var targetDom = $(this);
				if(target == dimmed){
					layer = $(parent);
					//console.log("dimmed");
				}
				else{
					layer = $(parent + "."+$(this).data("layer"));
				}
				
				if(callback){
					callback(hide, layer, targetDom);
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
		toggle: function(target, callback){

			$(document).on("click", target, function(e) {
				var targetDiv = $(this);
				var layer = $("." + targetDiv.data("target"));
				var sort = targetDiv.data("sort");
				var onClass = targetDiv.data("on");
				var siblings = targetDiv.data("siblings");
				//console.log(sort, onClass, siblings);

				function logic(){
					
					if(onClass){
						if(siblings){
							targetDiv.parent().siblings().find(target).removeClass("on");
							targetDiv.parent().siblings().find(target).siblings().removeClass("on");
						}
						if(targetDiv.hasClass("on")){
							targetDiv.removeClass("on");
							layer.removeClass("on");
						}
						else{
							targetDiv.addClass("on");
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
								targetDiv.parent().siblings().find(target).siblings().fadeOut();
							}
							layer.fadeIn();
						}
						else if (sort == "normal"){
							if(siblings){
								targetDiv.parent().siblings().find(target).siblings().hide();
							}
							layer.show();
						}
						else if (sort == "none"){
							return false;
						}
						else{
							if(siblings){
								targetDiv.parent().siblings().find(target).siblings().slideUp();
							}
							layer.slideDown();
						}
					}

				}

				if(callback) {
					callback(logic, layer);
				}
				else{
					logic();
				}
				//e.preventDefault();
				//console.log(1);
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
				var header_h = $("body").hasClass("pc") ? 100 : 0;
				var offsetTop = $(hrefString).offset();
				if(offsetTop){
					offsetTop = offsetTop.top - header_h;
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
					$("#header .inner").removeClass("on");
				}
				else{
					target.fadeIn();
					$("#header .inner").addClass("on");
				}
			}
			else{
				return;
			}
		},
		taps: function(tab_nav, callback){
			var target = tab_nav + " .tab_nav li";
			//console.log(target);
			$(document).on("click", target, function(e){
				var $this = $(this);
				var $layer = $this.parent().parent().next(".tab_cont");
				var idx = $this.index();

				function swap(){
					$this.addClass("on").siblings().removeClass("on");
					$layer.find("> div").eq(idx).show().siblings().hide();
				} 
				if(callback){
					callback(swap);
				}
				else{
					swap();
				}
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
				}
				else{
					$(parent).removeClass("on");
					$parent.addClass("on");
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

				e.preventDefault();
			});
		},
		changeSelect:function(target){
			$(document).on("change", target, function(e){
				var val = $(this).val();
				var target = $(this).parent().find(".selText");
				if (val == "DISP_ROOT") {
					target.html(target.attr("data-name"))
				} else {
					target.html($(this).find(".bestSubCate" + val).attr("data-name"))
				}
				//console.log(val, target);
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
								target.addClass("on");
							}
						},
						mouseleave: function(e){
							var target = $(this).find(".hover");
							if(target.is(":visible")){
								target.fadeOut();
								target.removeClass("on");
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
								target.removeClass("on");
							}	
							else{
								$(".regi_list_wrap .regi_in .hover").fadeOut().removeClass("on");
								target.fadeIn();
								target.addClass("on");
							}
						},
	
					}, targetDiv);
				}
			}

			$(window).on("resize", function(){
				$MYPAGE_REGILIST.off("click mouseenter mouseleave");
				event();
			});	
		},
		fixedTop: function(){
			var enScrollTop = 0,
				beScrollTop = 0,
				$header = $("#header"),
				$topBanner = $(".top_bn_w"),
				fixdTop = $header.offset().top,
				paddingTop = $header.height(),
				scrollThreshold = 90;

			if($topBanner.length && $topBanner.is(":visible")){
				$header.removeClass("fixed");
				$header.css({"height": "auto"});
			}
			else{
				$header.addClass("fixed");
				$header.css({"height": paddingTop});		
			}

			$(window).on('scroll', function(e) {

				var scrollpos = window.scrollY || window.pageYOffset;

				enScrollTop = scrollpos;

				if($topBanner.length && $topBanner.is(":visible")){
					//console.log(fixdTop, scrollpos);
					if(fixdTop <= scrollpos) {
						$header.addClass("fixed");
					}
					else {
						$header.removeClass("fixed");
					}
				}
				if (Math.abs(enScrollTop - beScrollTop) < scrollThreshold) return false;

				if(!$("body").hasClass("pc")) {	
					beScrollTop > enScrollTop ? $header.removeClass("on") : $header.addClass("on");
				}
				else{
					$header.removeClass("on");
				}

				beScrollTop = enScrollTop;
			});
		},
		amount: function(target){
			var minus = target + " .minus",
				plus = target + " .plus",
				input = target + " input";

			function isNumber(s) {
				s += ''; 
				s = s.replace(/^\s*|\s*$/g, '');
				if (isNaN(s)) return false;
				return true;
			}

			//console.log(minus, plus, input);

			$(document).on("click", minus, function(e){
				var $amountInput 	= $(this).siblings("input");
				var minAmount 		= Number($amountInput.data("minAmount")) || 1;
				var maxAmount 		= Number($amountInput.data("maxAmount")) || 999999;
				var packageAmount 	= Number($amountInput.data("packageAmount")) || 1;
				var checkedAmount 	= Number($amountInput.val());
				var currentAmount	= Number($amountInput.val());
				
				// min,max 유효성 체크
				if ( minAmount > packageAmount ){
					if( (minAmount % packageAmount) > 0 ){
						minAmount = ( minAmount + (packageAmount - (minAmount % packageAmount)));
					} else {
						minAmount = minAmount;
					}
				} else {
					minAmount = packageAmount;
				}
				
				if( maxAmount > packageAmount ){
					if ( (maxAmount % packageAmount) > 0 ){
						maxAmount = ( maxAmount - (maxAmount % packageAmount ));
					} else {
						maxAmount = maxAmount; 
					}
				} else {
					maxAmount = packageAmount;
				}
				
				if( checkedAmount % packageAmount > 0 ){
					checkedAmount = checkedAmount - (checkedAmount % packageAmount);
				}
				
				if( currentAmount <= maxAmount ){
					for( var i=0; i < packageAmount; i++ ){
						checkedAmount --;
					}
				}
				
				if( checkedAmount < minAmount ){
					alert("최소수량은 " + minAmount + "장 이상입니다." );
					checkedAmount = minAmount;
				} else if( checkedAmount > maxAmount ){
					checkedAmount = maxAmount;
					//alert("최대 수량은 " + maxAmount + "장입니다.");
				} 
				
				$amountInput.val(checkedAmount);
				$amountInput.data("prevCount" , checkedAmount);
				
				
				e.preventDefault();
			});

			$(document).on("click", plus, function(e){
				var $amountInput 	= $(this).siblings("input");
				var minAmount 		= Number($amountInput.data("minAmount")) || 1;
				var maxAmount 		= Number($amountInput.data("maxAmount")) || 999999;
				var packageAmount 	= Number($amountInput.data("packageAmount")) || 1;
				var checkedAmount 	= Number($amountInput.val());
				
				// min,max 유효성 체크
				if ( minAmount > packageAmount ){
					if( (minAmount % packageAmount) > 0 ){
						minAmount = ( minAmount + (packageAmount - (minAmount % packageAmount)));
					} else {
						minAmount = minAmount;
					}
				} else {
					minAmount = packageAmount;
				}
				
				if( maxAmount > packageAmount ){
					if ( (maxAmount % packageAmount) > 0 ){
						maxAmount = ( maxAmount - (maxAmount % packageAmount ));
					} else {
						maxAmount = maxAmount /* - packageAmount;  */
					}
				} else {
					maxAmount = maxAmount;
				}
				
				if( checkedAmount%packageAmount > 0 ){
					checkedAmount = checkedAmount - (checkedAmount%packageAmount);
				}
				
				if( checkedAmount < minAmount ){
					checkedAmount = minAmount;
				} else if( checkedAmount >= maxAmount ){
					checkedAmount = maxAmount;
					alert("최대 수량은 " + maxAmount + "장입니다.");
				} else {
					for( var i=0; i < packageAmount; i++ ){
						checkedAmount ++;
					}
				} 
				
				$amountInput.val(checkedAmount);
				$amountInput.data("prevCount" , checkedAmount);
				
				e.preventDefault();
			});

			$(document).on("change keyup", input , function(e){
		
				if( $(this).parents(".amount").find(".minus").size() > 0 || $(this).hasClass("amountInput") ){
					var $amountInput 	= $(this);
					var minAmount 		= Number($amountInput.data("minAmount")) || 1;
					var maxAmount 		= Number($amountInput.data("maxAmount")) || 999999;
					var packageAmount 	= Number($amountInput.data("packageAmount")) || 1;
					var checkedAmount 	= Number($amountInput.val());
					
					// min,max 유효성 체크
					if ( minAmount > packageAmount ){
						if( (minAmount % packageAmount) > 0 ){
							minAmount = ( minAmount + (packageAmount - (minAmount % packageAmount)));
						} else {
							minAmount = minAmount;
						}
					} else {
						minAmount = packageAmount;
					}
					
					if( maxAmount > packageAmount ){
						if ( (maxAmount % packageAmount) > 0 ){
							maxAmount = ( maxAmount - (maxAmount % packageAmount ));
						} else {
							maxAmount = maxAmount; 
						}
					} else {
						maxAmount = packageAmount;
					}
					
					if( e.type == "change" ){
						if( checkedAmount < minAmount ){
							alert("최소수량은 " + minAmount + "장 이상입니다." );
							$amountInput.val(minAmount);
							$amountInput.data("prevCount", minAmount);
						}
						else if( checkedAmount > maxAmount ){
							alert("최대 수량은 " + maxAmount + "장입니다.");
							$amountInput.val(maxAmount);
							$amountInput.data("prevCount", maxAmount);
						}
						else {
							$amountInput.data("prevCount", checkedAmount);
						}
					}
					
					if( e.type == "keyup" ){
						if( isNumber($(this).val()) == false ){
							$amountInput.val($amountInput.data("prevCount"));
						}	
					}	
				}
			});

		},		
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
		$HEADER = $("#header"),
		$FOOTER = $("#footer"),
		$GOTOP = $(".footer .btnTop"),
		$NOTICE = $(".main_wrap .cols_notice ul"),
		$REGI_LIST = $(".regi_list_wrap .regi_list"),
		$TOP_BANNER = $(".top_bn_w"),
		SELECTCUSTOM = ".select_custum",
		TOGGLE = ".toggle_btn",
		GOTARGET = ".go_target_bt",
		LAYER_BT_OPEN = ".layer_open_bt",
		LAYER_BT_CLOSE = ".layer_close_bt",
		LAYER_DIM = ".layer_dimmed",
		LAYER_DIV = ".pop_layer",
		SCROLL_Top = 0;



	/*호스트환경 체크*/
	COEX.resize.pf($BODY);
	COEX.resize.chk($BODY);
	COEX.resize.resize($BODY);
	

	$(window).on("scroll", function(){
		/*pc top으로 scroll*/
		COEX.event.topScrollCh($GOTOP, $BODY);
	});

	/*메인 상단배너 슬라이드*/
	if($(".top_bn_w ul").length && $.fn.slick) {
		(function(){
			COEX.slide.init($(".top_bn_w ul"), "slick", {
				infinite: true,
				autoplay: true,
				arrows: false,
				vertical: true,
				verticalSwiping: true,
			});

			/*
			$(".top_bn_w ul").on("afterChange", function(event, slick, currentSlide){
				var width = $(this).find("li[data-slick-index='"+ currentSlide + "']").width();

				$(".pc .top_bn_w .slick-slider .slick-track").animate({"width": width,},300);
				//$(".pc .top_bn_w .slick-slider .slick-track").width(width);

			});
			*/

		})();
	}

	/*메인 상단 슬라이드*/
	
	if($(".main_wrap .cols0 ul").length && $.fn.slick) {
		(function(){
			COEX.slide.init($(".main_wrap .cols0 ul"), "slick", {
				slidesToShow: 3, 
				slidesToScroll: 1, 
				infinite: true,
				autoplay: true,
				arrows: true,
				responsive: [ 
					{ breakpoint: 1025, settings: "unslick" }, 
				],
	
			});
		})();
	}

	if($(".main_wrap .cols1 ul").length && $.fn.slick) {
		(function(){
			COEX.slide.init($(".main_wrap .cols1 ul"), "slick", {
				slidesToShow: 4, 
				slidesToScroll: 1, 
				infinite: true,
				autoplay: true,
				arrows: true,
				autoplaySpeed: 3500,
				responsive: [ 
					{ breakpoint: 1025, settings: "unslick" }, 
				],
	
			});
		})();
	}

	if($(".main_wrap .cols3 ul").length && $.fn.slick) {
		(function(){
			COEX.slide.init($(".main_wrap .cols3 ul"), "slick", {
				slidesToShow: 3, 
				slidesToScroll: 1, 
				infinite: true,
				autoplay: true,
				arrows: true,
				autoplaySpeed: 4000,
				responsive: [ 
					{ breakpoint: 1025, settings: "unslick" }, 
				],
	
			});
		})();
	}

	/*메인 하단 슬라이드*/
	if($(".main_wrap .cols4 ul").length && $.fn.slick) {
		(function(){
			COEX.slide.init($(".main_wrap .cols4 ul"), "slick", {
				infinite: true,
				autoplay: true,
				arrows: true,
			});
		})();
	}
	
	
	/*메인 공지사항 슬라이드*/
	if($NOTICE.length && $.fn.slick) {
		(function(){
			COEX.slide.init($NOTICE, "slick", {
				infinite: true,
				autoplay: true,
				arrows: false,
				vertical: true,
				verticalSwiping: true,
			});
		})();
	}


	/*Online Directory 슬라이드*/
	if($(".sub_wrap .directory_cont .slide ul").length && $.fn.slick) {
		(function(){
			var $target = $(".sub_wrap .directory_cont .slide ul");
			var $texts = $(".sub_wrap .directory_cont .texts li");
			var slide = COEX.slide.init($target, "slick", {
				infinite: true,
				autoplay: true,
				adaptiveHeight: true,
			});
			
			$target.on("afterChange", function(event, slick, currentSlide){
				$texts.eq(currentSlide).addClass("on").siblings().removeClass("on");
			});
		})();
	}


	/*사전등록 리스트:pc-hover, mo-click*/
	if($REGI_LIST.length){
		COEX.event.hoverClick($BODY, $REGI_LIST, ".regi_in");
	}

	/*해더 스크롤*/
	COEX.event.fixedTop();


	/*커스텀 셀렉트*/
	COEX.event.customSelect(SELECTCUSTOM);
	COEX.event.changeSelect(".sort_select select");


	/*토글*/
	COEX.event.toggle(TOGGLE);

	COEX.event.toggle(".top_bn_close", function(logic, layer){
		var paddingTop = $HEADER.height();
		setTimeout(function(){
			$HEADER.addClass("fixed");
			$HEADER.css({"height": paddingTop});
			$(".panel_w .panel_in").css({"padding-top": paddingTop});
		},1000);
		
		logic();
		
	});
	
	COEX.event.toggle(".panel_btn", function(logic, layer){
		$(window).off("resize.panel");
		var paddingTop = 0;

		if(layer.hasClass("on")){
			$BODY.removeClass("fixed");

			$HEADER.removeClass("pt_open");
			$(window).scrollTop(SCROLL_Top);
		}
		else{
			SCROLL_Top = $(window).scrollTop();
			$BODY.addClass("fixed");
			$HEADER.addClass("pt_open");
		}

		function paddingCalculation() {

			
			/*
			if($TOP_BANNER.length && $TOP_BANNER.is(":visible")){
				paddingTop = $HEADER.height() + $TOP_BANNER.height();
			}
			else {
				paddingTop = $HEADER.height();
			}
			*/
			var banner_h = $TOP_BANNER.length && $TOP_BANNER.is(":visible") ? $TOP_BANNER.height() : 0; 
			var header_h = $BODY.hasClass("pc") ? 100 : 45;

			paddingTop = header_h + banner_h;
			
			layer.find(".panel_in").css({"padding-top": paddingTop});
		}

		paddingCalculation();


		$(window).on("resize.panel",function(){	
			paddingCalculation();
		});


		logic();
	});

	COEX.event.toggle(".panel_s_btn", function(logic, layer){
		$(".panel_s_close").addClass("on");
		$BODY.addClass("fixed");
		logic();
	});

	COEX.event.toggle(".panel_s_close", function(logic, layer){
		$(".panel_s_btn").removeClass("on");
		$BODY.removeClass("fixed");
		logic();
	});

	/*pc top으로 scroll*/
	COEX.event.topScrollCh($GOTOP, $BODY);

	/*amount*/
	if($(".amount_w").length) {
		COEX.event.amount(".amount_w");
	}

	/*top으로*/
	COEX.event.goTop($GOTOP);

	/*target으로*/
	COEX.event.goTarget(GOTARGET);

	/*layer팝업*/
	COEX.layer.open(LAYER_BT_OPEN, LAYER_DIM, LAYER_DIV);
	COEX.layer.close(LAYER_BT_CLOSE, LAYER_DIM, LAYER_DIV);
	//COEX.layer.close(LAYER_DIM, LAYER_DIM, LAYER_DIV);

	COEX.layer.open("#test01", LAYER_DIM, LAYER_DIV, function (show){
		alert("콜백");

		show();
	});
	COEX.layer.close("#test001", LAYER_DIM, LAYER_DIV, function (hide){
		alert("콜백");

		hide();
	});

	COEX.layer.open(".layer_enrollment", LAYER_DIM, LAYER_DIV, function (show){
		$(".prch-wrap").css({"z-index": 111});
		show();
	});

	COEX.layer.close(".layer_close_enrollment", LAYER_DIM, LAYER_DIV, function (hide){
		$(".prch-wrap").css({"z-index": 10});

		hide();
	});

	if($(".prch-wrap").length) {
		$FOOTER.css({"padding-bottom": "9rem"});
	}
	if($(".sub_wrap .order_view .order_pay").length) {
		$FOOTER.css({"padding-bottom": "9rem"});
	}


	/*업체정보 레이어
	if($(".layer_open_company").length){
		
		COEX.layer.open(".layer_open_company", LAYER_DIM, LAYER_DIV, function (show, layer){	
			show();
			var $target = $("." + layer + " .slide ul");
			var $texts = $("." + layer + " .texts li");
			COEX.slide.init($target, "slick", {
				infinite: true,
				autoplay: true,
				adaptiveHeight: true,
			});

			$target.on("afterChange", function(event, slick, currentSlide){
				$texts.eq(currentSlide).addClass("on").siblings().removeClass("on");
			});

		});
		COEX.layer.close(".layer_close_compony", LAYER_DIM, LAYER_DIV, function (hide, layer){
			hide();
			var $target = layer;
			$target.find(".slide ul").slick("unslick");
		});
	}*/
	

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
	COEX.event.taps(".tabs_w.tab-normal");
	
	COEX.event.taps(".tabs_w.tab-call01", function(swap){
		alert("콜백");
		swap();
	});

	$(".pc .gnb_wrap .log_wrap .mypage_bt_w").on({
		mouseenter: function(e){
			$(this).find(".mypage_bt_list").show();
		},
		mouseleave: function(e){
			$(this).find(".mypage_bt_list").hide();
		},
	});

	var TOUCH_EVENT = ("ontouchstart" in window) ? "touchstart" : "click";
	
	
	/*영역외 닫기-최종수정*/
	$(document).on(TOUCH_EVENT, function(e){
		//console.log(e.target);
		//console.log(SCROLL_Top);
		var family = $(".footer .family_wrap"),
			mypage = $(".gnb_wrap .log_wrap .mypage_bt_w"),
			panel_w = $(".panel_w"),
			panel_bt_w = $(".panel_bt_w"),
			panel_s_w = $(".panel_s_w"),
			search_bt_w = $(".search_bt_w"),
			cart_bt_w = $(".cart_bt_w"),
			links_w = $(".gnb_wrap .log_wrap .link"),
			select_custum = $(".pc .select_custum"),
			ticket_w = $(".ticket_w");
		

		if(!family.has(e.target).length){
			if(family.find("ul").is(":visible")){
				family.find(".family_btn").removeClass("on");
				family.find("ul").removeClass("on").slideUp();
				//alert(1);
			}
		}

		if(!panel_bt_w.has(e.target).length && !panel_w.has(e.target).length && !cart_bt_w.has(e.target).length && !links_w.has(e.target).length && !ticket_w.has(e.target).length){
			if(panel_w.is(":visible")){
				panel_bt_w.find(".panel_btn").removeClass("on");
				panel_w.removeClass("on");
				if(!mypage.has(e.target).length){
					$HEADER.removeClass("pt_open");
					mypage.find(".mypage_bt_list").hide();
				}
				if(!panel_s_w.hasClass("on") && !$(".pop_layer").is(":visible") && $BODY.hasClass("fixed")){					
					$BODY.removeClass("fixed");
					$(window).scrollTop(SCROLL_Top);
					//console.log(2);
				}
			}

		}
		

		if(!search_bt_w.has(e.target).length && !panel_s_w.has(e.target).length && !cart_bt_w.has(e.target).length && !links_w.has(e.target).length && !ticket_w.has(e.target).length){
			if(panel_s_w.is(":visible")){
				search_bt_w.find("button").removeClass("on");
				panel_s_w.removeClass("on");
				if(!panel_w.hasClass("on") && !$(".pop_layer").is(":visible") && $BODY.hasClass("fixed")){
					$BODY.removeClass("fixed");
					$(window).scrollTop(SCROLL_Top);
					//console.log(1);
				}
			}
		}
		
		if(!mypage.has(e.target).length && !mypage.find(".mypage_bt_list").has(e.target).length){
			if(mypage.find(".mypage_bt_list").is(":visible")){
				mypage.find(".mypage_bt_list").hide();
				$HEADER.removeClass("pt_open");
			}	
		}

		if(!select_custum.has(e.target).length){
			if(select_custum.find(".select_list").is(":visible")){
				select_custum.removeClass("on");
			}	
		}

	});
	/*영역외 닫기-최종수정 --end*/

	$(".layer_dimmed").on(TOUCH_EVENT, function(e){
		$(this).fadeOut();
		$(".pop_layer").fadeOut();
		$BODY.removeClass("fixed");
		$(window).scrollTop(SCROLL_Top);
	});

	/*qr코드 레이어*/
	$(".qr_bt.layer_open_bt").trigger('click');


	/*전시회 상세 최소높이*/
	if($(".sub_wrap .regi_sky").length) {
		var $regi_sky = $(".sub_wrap .regi_sky .regi_sky_in");
		function regiSkyCa() {
			var height = $regi_sky.height();
			if($BODY.hasClass("mobile")){
				$(".sub_wrap .regi_conts").css({"min-height": "auto"});
			}
			else {
				$(".sub_wrap .regi_conts").css({"min-height": height});
			}
		}
		regiSkyCa();
		$(window).on("resize", function(){
			regiSkyCa();
		});
	}


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
		//COEX.iscrolls.resize();
	});

	
});

