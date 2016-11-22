// JavaScript Document

$(window).ready(function(){
    $("#text").keydown(function(event){
		$("#result").show();
		if(event.which==13){
			event.preventDefault();
			if($("#text").val()!=''){
				var keyword=$("#text").val();
				location.href='https://www.baidu.com/s?wd='+keyword;
			}
			else location.reload();
		}
	});
	
	$(document).click(function(){
		$("#result").hide();
	});
	
	$("li").click(function(){
		var keyword=$(this).text();
		location.href='https://www.baidu.com/s?wd='+keyword;
	});
	
	$("#submit").click(function(){
		var keyword=$("#text").val();
		location.href='https://www.baidu.com/s?wd='+keyword;
	});
});