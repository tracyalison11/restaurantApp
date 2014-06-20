$(document).ready(function(){
	// localStorage detection
	function supportsLocalStorage() {
	  return typeof(Storage)!== 'undefined';
	}
	//show and hide all panels
	(function($) {
    
	  var allPanels = $('.menu').hide();
	    
	  $('.rest').click(function() {
	    allPanels.hide();
	    $(this).parent().find('.menu').toggle();
	    $( "input[name*='quantity']" ).val(0);
	    $(this).parent().find('.subTotal').html("")
	    $(this).parent().find('.orderTotal').html("");
	    resetItemRelatedVars();
	    return false;
	  });

})(jQuery);
	calcPrices();
	submitToLocalStorage();
});

//GLOBAL VARS
var itemTotal = 0;
var orderTotal = 0;
var lineItemCost = 0;
//reset total related values whenever users click on different restaurant
function resetItemRelatedVars(){
	itemTotal = 0;
	orderTotal = 0;
	lineItemCost = 0;
}

//calculate line item values and subtotal
function calcPrices(){
	$('input').on('click',function(){

	resetItemRelatedVars();
	var quantity = 0;
	var price = 0;
	quantity = $(this).val();
	console.log('quantity= ' + quantity);
	price = $(this).data("price");
	console.log('price= ' + price);
	itemTotal = price * quantity;
<<<<<<< HEAD
	//insert subtotal in last column
	var orderTotal=0;
	$(this).parent().parent().find('.itemTotal').html("<span class='subTotal'>" + itemTotal + "</span>");
	
	


	
=======

	console.log("calcPrices orderTotal= " + orderTotal);
	console.log("calcPrices itemTotal= " + itemTotal);

	//insert subtotal in item total column
	$(this).parent().parent().find('.itemTotal').html("<span class='subTotal'>" + itemTotal + "</span>");
	// orderTotal = 0;
	// Hardcoded value of 7 for number of entrees
>>>>>>> c5ae431ca8f0e527350218b85cef02506856f100
	for (var i=1; i < 7; i++) {
		//set var to value inside of last column of row
		lineItemCost = parseInt($(this).parent().parent().parent().find('.price' + i).find('.subTotal').html());
		console.log(lineItemCost);
		//check to see if its not a valid number, if not set it to 0
		if(isNaN(lineItemCost) == true) {
			lineItemCost = 0;
		}
		$(this).parent().parent().parent().find('.orderTotal').html(orderTotal);

		orderTotal += lineItemCost;	

	}
<<<<<<< HEAD
	$(this).reset();
=======
	console.log("calcPrices orderTotal= " + orderTotal);
	console.log("calcPrices itemTotal= " + itemTotal);
	$(this).parent().parent().parent().find('.orderTotal').html(orderTotal);
>>>>>>> c5ae431ca8f0e527350218b85cef02506856f100

	});
}
 function clearLocalStorage() {
   localStorage.clear();
 }
function submitToLocalStorage(){
	$('.submitOrder').on('click', function(){
		clearLocalStorage();
		var trElem = $(this).closest('tbody').find('tr[class^=menu-item]');
		var menuItems = [];
		for(var k=0; k<trElem.length; k++){
			var tmp = trElem[k];
			menuItems.push(tmp);

		}

		function setItems(key, data){
				localStorage.setItem(key,data);
		}

		var orders = {};
		for(var j=0; j<menuItems.length; j++){
			var menuItemNum = menuItems[j];
			if(menuItemNum.cells[2].childNodes[0].value != "" && menuItemNum.cells[2].childNodes[0].value != "0"){
				orders[j] = menuItemNum.cells[0].innerHTML + ": " + menuItemNum.cells[2].childNodes[0].value;
				setItems('order'+j,orders[j]);
			}
		}

		var customerName = "Customer Name: " + $('.customerName').val();
		setItems('custName', customerName);
		var orderTotal = "Total Amount: $" + $(this).parent().parent().parent().find('.orderTotal').html() + ".";
		setItems('orderTotal', orderTotal);

		//Formatting DATE and TIME
		var newDate = new Date();
		var am_pm = " "; 
		var currDate = newDate.getDate();
		var currMonth = newDate.getMonth() + 1;
		var currYear = newDate.getFullYear();
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
		var orderTimestamp = "Order Date: " +currMonth + "/" + currDate + "/" + currYear + " " + currHour + ":" + currMin + am_pm;
		setItems('date', orderTimestamp);
	  	// HTML5 localStorage Support
		try{	
			for (var key in localStorage){
				$('.orderContainer').find('.listOrders').append('<li>' + localStorage[key] + ' </li>');
			}
			$('.orderContainer').find('.listOrders').append('<hr />');
			// $('.orderContainer').find('.listOrders').append('<li>' + localStorage.date + localStorage.order + '</li>');
		}
		catch(e){
			if (e == QUOTA_EXCEEDED_ERR) {
	          alert("Local Storage Quota exceeded");
	          // you can clear local storage here:
	          
	       }
		}
	});
}