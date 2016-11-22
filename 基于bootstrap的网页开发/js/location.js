// JavaScript Document

$(document).ready(function() {
    $("#dropdown .dropdown-menu a").click(function() {
		var href = $(this).attr("href");
		$("#tablist a[href = '" + href + "']").tab("show");
	});
});