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
	$(this).parent().parent().find('.itemTotal').html("<span class='subTotal'>" + itemTotal + "</span>");

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
		$(this).parent().parent().parent().find('.orderTotal').html(orderTotal);

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