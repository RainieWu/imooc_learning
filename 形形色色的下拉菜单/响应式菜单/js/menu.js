// JavaScript Document

$(document).ready(function() {
	$("#icon").on("click", function() {
		if($("#menu ul li").hasClass("active")) {
			$("#menu ul li").css("visibility", "hidden").removeClass("active");
		}
		else {
			$("#menu ul li").css("visibility", "visible").addClass("active");
		}
	});
});