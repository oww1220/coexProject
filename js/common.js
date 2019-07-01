$(document).ready(function(){
	$("#navBtnOpen").click(function(){
		$("#localMenuBox").addClass("on");
		$(".dimmed").addClass("on");
	});
	$("#navBtnClose").click(function(){
		$("#localMenuBox").removeClass("on");
		$(".dimmed").removeClass("on");
	});

	$(".portList > li > a.none").click(function(){
		$(this).parents("li").addClass("on").siblings().removeClass("on");
	});
	$(".portList > li > a.active").click(function(){
		$(this).parents("li").removeClass("on");
	});
});


/*$(document).on('click', function (e) {
	if(!$(e.target).is("#navBtn, #navBtn span")){
		$("#navBtn").removeClass("on");
	} else {
		$("#navBtn").toggleClass("on");
	}
});*/