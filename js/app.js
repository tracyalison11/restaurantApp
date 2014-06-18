$(document).ready(function(){
	$(".taco").hide();

	$(".rest1").click(function(){
		$(".taco").toggle(1000);
	});

	$(".burgers").hide();

	$(".rest2").click(function(){
		$(".burgers").toggle(1000);
	});

});