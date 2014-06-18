$(document).ready(function(){
	$(".menu").hide();
	//need to find better way to do this
	$(".rest1").click(function(){
		$(".taco").toggle(1000);
	});

	$(".rest2").click(function(){
		$(".burgers").toggle(1000);
	});

});
