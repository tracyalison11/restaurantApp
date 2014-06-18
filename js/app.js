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
	showList();

});
var prev = null,  curr = null;
function showList(){
	$('.rest').on('click', function(e){
		$(this).parent().find('.menu').toggle();
	});
}
