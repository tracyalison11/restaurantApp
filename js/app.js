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

	calc();

});
var itemTotal = 0;
function showList(){
	$('.rest').on('click', function(){
		$(this).parent().find('.menu').toggle();
		itemTotal = 0;
	});
}

function calc(){
	$('input').on('click',function(){
	var click = $(this);
	var quantity = click.val();
	var price = click.data("price");
	itemTotal = price * quantity;

	click.parent().parent().find('.itemTotal').html("<span class='subTotal'>" + itemTotal + "</span>");

	var orderTotal = 0;
	
	for (var i=1; i < 7; i++) {
		//set var to value inside of last column of row
		var lineItemCost = parseInt($('.price' + i).find('.subTotal').html());
		//check to see if its not a valid number, if not set it to 0
		if(isNaN(lineItemCost) == true) {
			lineItemCost = 0;
		}
		orderTotal += lineItemCost;	
	}
		click.parent().parent().parent().find('.orderTotal').html(orderTotal);

	});



}