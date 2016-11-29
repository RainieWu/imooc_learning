// JavaScript Document

$(document).ready(function() {
    $("#first").on("click", "a", function() {
		if($(this).hasClass("clicked")) {
			$("#close").click();
			return false;
		}
		
		var index = $(this).index();
		var mgLeft = "-" + index * 100 + "%";
		
		if($("#second").hasClass("active")) {
			$("#content").animate({marginLeft: mgLeft});
		}
		else {
			$("#content").css({marginLeft: mgLeft});
			$("#second").animate({height: "130px"}).addClass("active");
		}
		
		$(this).addClass("clicked").siblings().removeClass("clicked");
		
		return false;
	});
	$("#close").on("click", function() {
		$("#second").animate({height: "0px"}, function() {
			$(this).removeClass("active");
			$("#first .clicked").removeClass("clicked");
		});
		return false;
	});
});