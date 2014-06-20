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
	var quantity = $(this).val();
	var price = $(this).data("price");
	itemTotal = price * quantity;
	//insert subtotal in last column
	var orderTotal=0;
	$(this).parent().parent().find('.itemTotal').html("<span class='subTotal'>" + itemTotal + "</span>");
	
	


	
	for (var i=1; i < 7; i++) {
		//set var to value inside of last column of row
		var lineItemCost = parseInt($('.price' + i).find('.subTotal').html());
		//check to see if its not a valid number, if not set it to 0
		if(isNaN(lineItemCost) == true) {
			lineItemCost = 0;
		}
		$(this).parent().parent().parent().find('.orderTotal').html(orderTotal);

		orderTotal += lineItemCost;	

	}
	$(this).reset();

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
			}
		}
		var customerName = $('.customerName').val();
		var orderTotal = $(this).parent().parent().parent().find('.orderTotal').html();
		
		//Formatting DATE and TIME
		var newDate = new Date();
		var am_pm = " "; 
		var currDate = newDate.getDate();
		console.log("currDate = " + currDate);
		var currMonth = newDate.getMonth() + 1;
		console.log("currMonth = " + currMonth)
		var currYear = newDate.getFullYear();
		console.log("currYear = " + currYear)
		orders.unshift(customerName, newDate, orderTotal);
		// console.log(orders);

		var currHour = newDate.getHours();
		if (currHour < 12) {
			am_pm = "AM";
		}
		else {
			am_pm = "PM";
		}
		if (currHour == 0) {
			currHour = currHour - 12;
		}

		var currMin = newDate.getMinutes();
		currMin = currMin + " ";

		if (currMin.length == 1) {
			currMin = "0" + currMin;
		}
	  	// HTML5 localStorage Support
		try{
			localStorage.setItem('order', orders);
			var newOrder = localStorage.getItem(orders);
			$('.orderContainer').find('.listOrders').append('<li>' + "Order Date " +currMonth + " " + currDate + " " + currYear + " " + currHour + ":" + currMin + am_pm + localStorage.order+ '</li>');
			// console.log(localStorage.order);
		}
		catch(e){
			if (e == QUOTA_EXCEEDED_ERR) {
	          // alert("Local Storage Quota exceeded");
	          // you can clear local storage here:
	          
	       }
		}
	});
}