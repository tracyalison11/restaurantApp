$(document).ready(function(){
	// localStorage detection
	function supportsLocalStorage() {
	  return typeof(Storage)!== 'undefined';
	}

	$(".menu").hide();
	showList();

	calc();
	submitToLocalStorage();
});
var itemTotal = 0;
var orderTotal = 0;
function showList(){
	$('.rest').on('click', function(){
		$(this).parent().find('.menu').toggle();
		itemTotal = 0;
		orderTotal = 0;
	});
}

function calc(){
	$('input').on('click',function(){
	var click = $(this);
	var quantity = click.val();
	var price = click.data("price");
	itemTotal = price * quantity;
	//insert subtotal in last column
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
 function clearLocalStorage() {
   localStorage.clear();
 }
function submitToLocalStorage(){
	$('.submitOrder').on('click', function(){
		
		var trElem = $(this).closest('tbody').find('tr[class^=menu-item]');
		var menuItems = [];
		for(var k=0; k<trElem.length; k++){
			var tmp = trElem[k];
			menuItems.push(tmp);

		}
		// console.log(menuItems);
		var orders = [];
		for(var j=0; j<menuItems.length; j++){
			var menuItemNum = menuItems[j];
			if(menuItemNum.cells[2].childNodes[0].value != "" && menuItemNum.cells[2].childNodes[0].value != "0"){
				orders.push([menuItemNum.cells[0].innerHTML, 
							 menuItemNum.cells[1].innerHTML,
						 	 menuItemNum.cells[2].childNodes[0].value,
						 	 menuItemNum.cells[3].innerText]);
				console.log(orders);
			}
		}
		var customerName = $('.customerName').val();
		var newDate = new Date;
		orders.unshift(customerName, newDate)
		console.log(orders);
	  	// HTML5 localStorage Support
		try{
			localStorage.setItem('order', orders)
			console.log(localStorage.order);
		}
		catch(e){
			if (e == QUOTA_EXCEEDED_ERR) {
	          // alert("Local Storage Quota exceeded");
	          // you can clear local storage here:
	          
	       }
		}
	});
}