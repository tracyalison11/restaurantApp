$(document).ready(function(){
	// localStorage detection
	function supportsLocalStorage() {
	  return typeof(Storage)!== 'undefined';
	}

	// Run the support check
	if (!supportsLocalStorage()) {
	  // No HTML5 localStorage Support
	} else {
	  // HTML5 localStorage Support

	}
	$(".menu").hide();
	
	// need to find better way to do this
	$(".rest1").click(function(){
		$(".taco").toggle(1000);
	});

	$(".rest2").click(function(){
		$(".burgers").toggle(1000);
	});
	// showList();

});
// function showList(){

// 	$('.rest').on('click', function(){
// 		console.log(this);
// 		$(this).toggle(1000);
// 	});
// }