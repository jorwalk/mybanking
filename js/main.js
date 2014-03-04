var totalRunning = 0;
var overlayShown = true;
var avoidWaiver = '';
var cartContainer = document.querySelector('#cartFeatures');
var $container = $('#cartFeatures');
// initialize
$container.masonry({
  columnWidth: 17,
  itemSelector: '.feature'
});
var msnry = $container.data('masonry');

$('document').ready(function(){
	// hover over the feature cards
	$('.feature').hover(
		function () {
			$(this).children("div.front").find("h2").css({"-webkit-box-shadow":"inset 0px 1px 7px rgba(5, 5, 5, 0.50)"});
			$(this).children("div.front").find("h2").css({"-moz-box-shadow":"inset 0px 1px 7px rgba(5, 5, 5, 0.50)"});
			$(this).children("div.front").find("h2").css({"box-shadow":"inset 0px 1px 7px rgba(5, 5, 5, 0.50)"});
			$(this).children("div.front").find(".monthly").css({"-webkit-box-shadow":"inset 0px 1px 7px rgba(5, 5, 5, 0.50)"});
			$(this).children("div.front").find(".monthly").css({"-moz-box-shadow":"inset 0px 1px 7px rgba(5, 5, 5, 0.50)"});
			$(this).children("div.front").find(".monthly").css({"box-shadow":"inset 0px 1px 7px rgba(5, 5, 5, 0.50)"});
		
		}, 
		function () {
			$(this).children("div.front").find("h2").css({"-webkit-box-shadow":"inset 0px 0px 0px rgba(5, 5, 5, 0.50)"});
			$(this).children("div.front").find("h2").css({"-moz-box-shadow":"inset 0px 0px 0px rgba(5, 5, 5, 0.50)"});
			$(this).children("div.front").find("h2").css({"box-shadow":"inset 0px 0px 0px rgba(5, 5, 5, 0.50)"});
		
			$(this).children("div.front").find(".monthly").css({"-webkit-box-shadow":"inset 0px 0px 0px rgba(5, 5, 5, 0.50)"});
			$(this).children("div.front").find(".monthly").css({"-moz-box-shadow":"inset 0px 0px 0px rgba(5, 5, 5, 0.50)"});
			$(this).children("div.front").find(".monthly").css({"box-shadow":"inset 0px 0px 0px rgba(5, 5, 5, 0.50)"});
		}
	);
	
	// onclick waiver
	$('#waiver a').on('click',function(){
		// check to see if has active
		yesActive = $('#waiver a.yes').hasClass('active');
		noActive = $('#waiver a.no').hasClass('active');
	
		// if you click on the no button
		if( $(this).hasClass('no') ){
		
			// stop the counter on each click
			$('.count').counter('stop');
			fnCounter(''+totalRunning+':00',''+totalRunning+':00', 'up');
		
			$('#waiver a.yes').removeClass('active');
			$('.yesWaiver').hide();
			$('.separate').hide();
			// check to see if it already has the active class
			if(noActive){ 
				console.log('you clicked no twice');
			} else {
				
				if(overlayShown){
					// show overlay, then monthly service note
					$('.waiverOverlay').fadeIn().show();
					$('.cartOverlay').fadeIn().show();
					// modify the monthly services class
					$('.monthlyService').addClass('onNo').fadeIn().show();
					overlayShown = false;
				}
				
				// start the counter up eight	
				var newTotal = totalRunning + 8;
				if(totalRunning == 0){var initial = '00:00'; }
				else{ var initial = '0'+totalRunning+':00'; }
				
				fnCounter("0"+newTotal+":00","0"+newTotal+":00", 'up');
				totalRunning += 8;
				avoidWaiver = 'no';
				$(this).toggleClass('active');
			}
		} else { // use clicked yes
			
			$('.count').counter('stop');
			fnCounter(''+totalRunning+':00',''+totalRunning+':00', 'down');
	
			$('#waiver a.no').removeClass('active');
			$('.yesWaiver').show();
			$('.separate').show();
			
			if(yesActive){
				// clicked yes twice
				console.log('clicked yes twice');
			}else{
				// check to see if the avoid waiver no button has been set
				if(avoidWaiver=='no'){
					var newTotal = totalRunning - 8;
					var initial = '0'+totalRunning+':00';
					fnCounter("0"+newTotal+":00","0"+newTotal+":00", 'down');
					totalRunning -= 8;
					avoidWaiver = 'no';
				}
				
				avoidWaiver = 'yes';
				$(this).toggleClass('active');
			}
		}
	});
	
	// onclick event div.feature
	$('.feature h2').on('click',function(e){
		var safeDepositBox = $(this).parents('.feature').hasClass('safe'); 
		if(safeDepositBox){
			fnDepositBox($(this),'h2');
		}else{
			fnClick($(this));
		}
	});
	
	// set the cards first value to actived
	$( ".card" ).each(function( index ) {
		if(index==0){
			$(this).addClass('activated');
		}
	});
	
	// onclick event div.monthly p
	$('.monthly p').on('click',function(e){
		// check to see if the safe deposit box
		var safeDepositBox = $(this).parents('.feature').hasClass('safe'); 
		if(safeDepositBox){
			fnDepositBox($(this),'p');
		}else{
			fnClick($(this));
		}
	});
	
	fnCounter('00:00','00:00', 'up');
	
	// navigational helpers
	fnStart();
	fnValuable();
});




function fnDepositBox(box,location){
	// check to see if the feature is active
	var isActive = $('#safeBox').hasClass("active");
	// check to see if it is the safe deposit
	var first = box.parents('.card').hasClass('first');
	var second = box.parents('.card').hasClass('second');
	var third = box.parents('.card').hasClass('third');
	var thisCard = box.parents('.card');
	var hasTwo = $('#safeBox').hasClass("two");
	var hasFive = $('#safeBox').hasClass("five");
	var hasSeven = $('#safeBox').hasClass("seven");
	var initial = totalRunning;
	
	if(isActive){ // if the safe deposit box is active
		// decrease the amount of the box
		if(hasTwo){ // two dollars clicked
			totalRunning -= 2;
		}else if(hasFive){ // five dollars clicked
			totalRunning -= 5;
		}else if(hasSeven){ // seven dollars clicked
			totalRunning -= 7;
		} 
		// removes the row from the table
		var id = $('#safeBox').data("id");
		$('#'+id).remove()
	} 
	// check to see if the card is active first one
	if( thisCard.hasClass('activated') ){
		// check to see if feature has class active
		if(location == 'p'){
			var classList = box.parent().attr('class').split(/\s+/);
			$.each( classList, function(index, item){
				if (item != 'monthly') {
					$('#safeBox').addClass(item);
				}
			});
		} else if(location == 'h2'){
			var classList = box.siblings(".monthly").attr('class').split(/\s+/);
			$.each( classList, function(index, item){
				if (item != 'monthly') {
					$('#safeBox').addClass(item);
				}
			});
		}
		
		if(isActive){
			$('#safeBox').removeClass("active");
			//fnSafeClick();
			$('.count').counter('stop');
			fnCounter("0"+totalRunning+":00","0"+totalRunning+":00", 'down');
		}else{
			fnSafeClick();
		}
		
	} else {
		if(second){ // first will always be active
			// remove first place
			$( ".card" ).each(function( index ) {
				if($(this).hasClass('activated')){
					$(this).fadeOut(100,function(){
						$(this).removeClass('activated');
						$(this).removeClass('first');
						$(this).addClass('second');
					});
				}
			});
			thisCard.css({'position':'absolute','top':'44px'});
			thisCard.stop().addClass('activated').animate({
				'top': "0px"
			}, 500,function(){
				$(this).removeClass('second');
				$(this).addClass('first');
				$(this).removeAttr( 'style' );
				$('.card.second').fadeIn();
			});
			
			// remove any extra classes
			var featureClasses = $(box).parents(".feature").attr('class').split(/\s+/);
			$.each( featureClasses, function(index, item){
				if(item != "feature"){
					if(item != 'safe'){
						if(item != 'active'){
							$('#safeBox').removeClass(item);
						}
					}
				}
			});
			
			// set the class to increment
			var classList = box.parent().attr('class').split(/\s+/);
			$.each( classList, function(index, item){
				if (item != 'monthly') {
					$('#safeBox').addClass(item);
				}
			});
			fnSafeClick();
		}else if(third){
			// remove first place
			$( ".card" ).each(function( index ) {
				if($(this).hasClass('activated')){
					$(this).fadeOut(100,function(){
						$(this).removeClass('activated');
						$(this).removeClass('first');
						$(this).addClass('third');
					});
				}
			});
			thisCard.css({'position':'absolute','top':'88px'});
			thisCard.stop().addClass('activated').animate({
				'top': "0px"
			}, 500,function(){
				$(this).removeClass('third');
				$(this).addClass('first');
				$(this).removeAttr( 'style' );
				$('.card.third').fadeIn();
			});
			
			// remove any extra classes
			var featureClasses = $(box).parents(".feature").attr('class').split(/\s+/);
			$.each( featureClasses, function(index, item){
				if(item != "feature"){
					if(item != 'safe'){
						if(item != 'active'){
							$('#safeBox').removeClass(item);
						}
					}
				}
			});
			
			// set the class to increment
			var classList = box.parent().attr('class').split(/\s+/);
			$.each( classList, function(index, item){
				if (item != 'monthly') {
					$('#safeBox').addClass(item);
				}
			});
			fnSafeClick();
		}
	}
}

function  fnSafeClick(){
	// stop the counter on each click
	var hasTwo = $('#safeBox').hasClass("two");
	var hasFive = $('#safeBox').hasClass("five");
	var hasSeven = $('#safeBox').hasClass("seven");
	var isActive = $('#safeBox').hasClass("active");
	var title = $('#safeBox').data("title");
	var id = $('#safeBox').data("id");

	var initial = totalRunning;
	
	if(isActive){ // if the safe deposit box is active
		// decrease the amount of the box
		if(hasTwo){ // two dollars clicked
			totalRunning += 2;
		}else if(hasFive){ // five dollars clicked
			totalRunning += 5;
		}else if(hasSeven){ // seven dollars clicked
			totalRunning += 7;
		} 

		$('.count').counter('stop');
		fnCounter("0"+totalRunning+":00","0"+totalRunning+":00", 'up');

	}else{ // the deposit box is not active
		// increase the amount of the box
		if(hasTwo){ // two dollars clicked
			totalRunning += 2;
			var row = '<tr id="'+id+'"><td><p><i class="info info'+id+'"></i>'+title+'</p></td><td><p>$2.00/mo</p></td></tr>';
		}else if(hasFive){ // five dollars clicked
			totalRunning += 5;
			var row = '<tr id="'+id+'"><td><p><i class="info info'+id+'"></i>'+title+'</p></td><td><p>$5.00/mo</p></td></tr>';
		}else if(hasSeven){ // seven dollars clicked
			totalRunning += 7;
			var row = '<tr id="'+id+'"><td><p><i class="info info'+id+'"></i>'+title+'</p></td><td><p>$7.00/mo</p></td></tr>';
		} 
		$('.tbl_feeCostFeatures').append(row);
		$('#safeBox').addClass("active");
		$('.count').counter('stop');
		fnCounter("0"+totalRunning+":00","0"+totalRunning+":00", 'up');
	}
}



function fnStart(){
	// show the splash screen
	$('#splash').show();
	$('footer').show();
	
	// detect the splash screen cta button click
	$('.btn-gold').on('click',function(){
		$('#splash').fadeOut().hide();
		// change the footer to relative position, top 0
		$('footer').stop().animate().css({'position':'relative','top':'0'});
		$('#cart').fadeIn().show();
		$('.total').fadeIn().show();
		$('#waiver').fadeIn().show();
		msnry.layout();
	});
	
	$('i.serviceCharge').on('click', function(e){
		// show overlay, then monthly service note
		$('.waiverOverlay').fadeIn().show();
		$('.cartOverlay').fadeIn().show();
		// modify the monthly services class
		$('.monthlyService').addClass('onNo').fadeIn().show();
		overlayShown = false;
	});
	
	
	$('i.info').on('click', function(e){
		e.preventDefault();
		// check to see if the parent has a class of monthly
		var safeBox = $(this).parents('.feature').hasClass('safe');
		if(safeBox){
			var monthlyValue = $(this).parent();
			var hasTwo = monthlyValue.hasClass('two');
			var hasFive = monthlyValue.hasClass('five');
			var hasSeven = monthlyValue.hasClass('seven');
			
			if(hasTwo){
				$('.safeSize').html('3 x 10');
			}else if(hasFive){
				$('.safeSize').html('5 x 10');
			}else if(hasSeven){
				$('.safeSize').html('10 x 10');
			}
			
			console.log(monthlyValue);
		}
		
		
		// loop over each of the feature card boxes
		$( ".feature" ).each(function( index ) {
			// check for the class of information
			var info = $(this).hasClass('information');
			
			if(info){
				// decrease the size of the box
				$(this).css({'background-color':'#ffffff'});
				$('.close').remove();
				$(this).stop().animate({'width' : 136,'height':136}, 700, function(){
					$(this).css('background', 'none');
					
					$(this).removeClass('information');
					msnry.layout();
				}).children('div.back').fadeOut();
			} 
		});
		// show the card that was clicked
		var showCard = $(this).parents('.feature').addClass('information');
		var settings = {
			showArrows: true,
			autoReinitialise: true,
			contentWidth : 290
			
		};
		
		var pane = $('.scroll-pane');
		pane.jScrollPane(settings);
	
		$(this).parents('.information').css({'width':290, 'height':287});
		msnry.layout();
		
		$(this).parents('.feature').flip({
			color:'#f5f5f5',
			direction:'rl',
			speed:300,
			onEnd: function(){
				showCard.children('div.back').show();
			}
		}); 
		
		
		// prepend the done button
		$(this).parents('.information').append('<a class="close">DONE</a>');
		
		// onclick event to close the window
		$('.close').on('click',function(){
			$(this).parents('.information').css({'background-color':'#ffffff'});
			$(this).remove('');
			// decrease the size of the box
			$('.information').animate({'width' : 136,'height':136}, 700, function(){
				$(this).css('background', 'none');
				$('.feature').removeClass('information');
				msnry.layout();
			}).children('div.back').fadeOut();
		})
		
	});
	
	
	
	// detect the done button click on the cart page
	$('.btn-done').on('click',function(){
		// set the summary month cost
		$('.yesWaiver span').html('$'+totalRunning+'.00');
		
		// check to see if waiver is set
		if(avoidWaiver != ''){
			if(avoidWaiver == 'yes'){
				var withOutWaiver = totalRunning + 8;
				$('.noWaiver span').html('$'+withOutWaiver+'.00');
			}else{
				$('.noWaiver span').html('$'+totalRunning+'.00');
			}
			
			$('.fyi').hide();
			$('#cart').fadeOut().hide();
			$('#waiver').fadeOut().hide();
			$('#valuable').fadeIn().show();
			
		} else {
			var withOutWaiver = totalRunning + 8;
			$('.noWaiver span').html('$'+withOutWaiver+'.00');
			
			//$('#waiver').css({'background-color':'#fffeb7'});
			$('.waiverOverlay').fadeIn().show();
			$('.cartOverlay').fadeIn().show();
			
			$('.monthlyService').css({
				position:'absolute',
				left: ($('#cart').width() - $('.monthlyService').outerWidth())/2,
				top: ($('#cart').height() - $('.monthlyService').outerHeight())/2
			});
			$('.monthlyService').fadeIn().show();
			overlayShown = false;
		
		}
		
	});
	/*
	// onclick, avoid monthly service charge
	$('.goBack').on('click',function(){
		$('.monthlyService').fadeOut().hide();
		$('a.no').removeClass('active');
		// decrease the running total minus 8
		var newTotal = totalRunning-8;
		
		console.log(newTotal);
		
		if(totalRunning == 0){var initial = '00:00'; }
		else{ var initial = '0'+totalRunning+':00'; }
		
		console.log(initial);
		console.log(newTotal);
		
		fnCounter(initial,"0"+newTotal+":00", 'down');
		totalRunning -= 8;
		
		console.log(totalRunning);
		
		$('.waiverOverlay').fadeOut().hide();
		$('.cartOverlay').fadeOut().hide();
	});
	*/
	// onclick avoid monthly charge continue
	$('.continue').on('click',function(){
		onNoClass = $('.monthlyService').hasClass('onNo');
		if(onNoClass){
			$('.monthlyService').fadeOut().hide();
			$('.waiverOverlay').fadeOut().hide();
			$('.cartOverlay').fadeOut().hide();
			$('#waiver').fadeIn().show();
			$('#cart').fadeIn().show();	
			// remove the onNo class
			$('.monthlyService').removeClass('onNo');
		}else{
			$('#cart').fadeOut().hide();
			$('#waiver').fadeOut().hide();
			$('#valuable').fadeIn().show();		
			$('.monthlyService').fadeOut().hide();
			$('.cartOverlay').fadeOut().hide();
			$('.waiverOverlay').fadeOut().hide();
		}
	});
}
function fnValuable(){
	// global amount
	var OneTimeCharge = 0;
	var amount = '';
	var summary = '';
	
	// check the state of the checkbox
	$('a.check').on('click',function(){
		var checked = $(this).hasClass('checked');
		var id = $(this).attr('id');
		// unhide the display of the table in the summary screen
		switch(id){
			case "chk_debitCard":
				amount = 5;
				summary = '<tr class="tr_debitCard"><td><p><i class="info infoPersonalizedDebitCard"></i>Personalized Debit Card</p></td><td><p>$5.00</p></td></tr>';
				if(checked){
					OneTimeCharge -= amount;
					$('.tr_debitCard').remove();
				}else{
					OneTimeCharge += amount;
					$('.tbl_oneTimeCharge').append(summary);
				}
			break;
			case "checkOrder":
				amount = 20;
				summary = '<tr class="tr_checkOrder"><td><p><i class="info infoCheckOrder"></i>Check Order</p></td><td><p>$20.00</p></td></tr>';
				if(checked){
					OneTimeCharge -= amount;
					$('.tr_checkOrder').remove();
				}else{
					OneTimeCharge += amount;
					$('.tbl_oneTimeCharge').append(summary);
				}
			break;
			case "prepaidCard":
				amount = 5.95;
				summary = '<tr class="tr_prepaidCard"><td><p><i class="info infoPrePaid"></i>Pre-Paid Card</p></td><td><p>$5.95</p></td></tr>';
				if(checked){
					OneTimeCharge -= amount;
					$('.tr_prepaidCard').remove();
				}else{
					OneTimeCharge += amount;
					$('.tbl_oneTimeCharge').append(summary);
				}
			break;
			case  "switchKit":
				amount = 20;
				summary = '<tr class="tr_switchKit"><td><p><i class="info infoSwitchKit"></i>Switch Kit</p></td><td><p>$20.00</p></td></tr>';
				if(checked){
					OneTimeCharge -= amount;
					$('.tr_switchKit').remove();
				}else{
					OneTimeCharge += amount;
					$('.tbl_oneTimeCharge').append(summary);
				}
			break;
		}
		
		$(this).toggleClass('checked');
		$('#oneTimeCharge').html('$'+ parseFloat(OneTimeCharge).toFixed(2));
		// set the value on the summary page
		$('.oneTimeChargeVal').html('$'+ parseFloat(OneTimeCharge).toFixed(2));
	});
	
	// onclick personalized debit card
	$('.infoPersonalizedDebitCard').on('click',function(){
		$('.valuableOverlay').fadeIn().show();
		// center the modal window
		$('.modalPersonalizedDebitCard').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalDebitCard').outerWidth())/2,
			top: ($('.container').height() - $('.modalDebitCard').outerHeight())/2
		});
		$('.modalPersonalizedDebitCard').fadeIn().show();
	});
	$('.infoCheckOrder').on('click',function(){
		$('.valuableOverlay').fadeIn().show();
		// center the modal window
		$('.modalCheckOrder').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalCheckOrder').outerWidth())/2,
			top: ($('.container').height() - $('.modalCheckOrder').outerHeight())/2
		});
		$('.modalCheckOrder').fadeIn().show();
	});
	
	$('.infoPrePaid').on('click',function(){
		$('.valuableOverlay').fadeIn().show();
		// center the modal window
		$('.modalPrePaid').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalPrePaid').outerWidth())/2,
			top: ($('.container').height() - $('.modalPrePaid').outerHeight())/2
		});
		$('.modalPrePaid').fadeIn().show();
	});
	$('.infoSwitchKit').on('click',function(){
		$('.valuableOverlay').fadeIn().show();
		$('.modalSwitchKit').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalSwitchKit').outerWidth())/2,
			top: ($('.container').height() - $('.modalSwitchKit').outerHeight())/2
		});
		$('.modalSwitchKit').fadeIn().show();
	});
	
	// onclick to close the modal
	$('.closeModal').on('click',function(){
		$('.modalValuable').fadeOut().hide();
		$('.valuableOverlay').fadeOut().hide();
		$('.summaryOverlay').fadeOut().hide();
	});
	
	// onclick continue to the summary screen
	$('.continueSummary').on('click', function(){
		// call the summary function to bind the info windows
		fnSummary();
		$('#valuable').fadeOut().hide();
		$('#summary').fadeIn().show();
	});
	
	// onclick Go Back
	$('.backCart').on('click', function(){
		$('#valuable').fadeOut().hide();
		$('#cart').fadeIn().show();
		$('#waiver').fadeIn().show();
		msnry.layout();
	});
}

function fnSummary(){
	// check to see if there is any data in the table
	// if the table has tr then display the outer containing div
	var tbl_oneTimeCharge_count = $('.tbl_oneTimeCharge tr').length;
	if(tbl_oneTimeCharge_count > 0){
		$('.oneCharge').show();
		$('.oneTimeCharge').show();
	}else{
		$('.oneCharge').hide();
		$('.oneTimeCharge').hide();
	}
	
	var tbl_noCostFeatures_count = $('.tbl_noCostFeatures tr').length;
	if(tbl_noCostFeatures_count > 0){
		$('.valuableFeatures').show();
	} else {
		$('.valuableFeatures').hide();
	}
		
	var tbl_feeCostFeatures_count = $('.tbl_feeCostFeatures tr').length;	
	if(tbl_feeCostFeatures_count > 0){
		$('.featuresValuable').show();
	} else {
		$('.featuresValuable').hide();
	}	
	
	
	// onclick to modify the valuable features
	$('.btn-modify').on('click', function(){
		$('#summary').fadeOut().hide();
		$('#valuable').fadeIn().show();
	});
	
	// onclick to confirm charges
	$('a.btn-confirm').on('click', function(){
		$('.summaryOverlay').fadeIn().show();
		$('#congratulations').css({
			position:'absolute',
			left: ($('.container').width() - $('#congratulations').outerWidth())/2,
			top: ($('.container').height() - $('#congratulations').outerHeight())/2
		});
		$('#congratulations').fadeIn().show();
	});
	
	// onclick to close the congratulations modal
	$('.closeCongratulations').on('click', function(){
		$('#congratulations').fadeOut().hide();
		$('.summaryOverlay').fadeOut().hide();
	});
	
	// onclick to modalDebitCard
	$('.infodebitCard').on('click', function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalDebitCard').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalDebitCard').outerWidth())/2,
			top: ($('.container').height() - $('.modalDebitCard').outerHeight())/2
		});
		$('.modalDebitCard').fadeIn().show();
	});
	
	// onclick to infoonlineBanking
	$('.infoonlineBanking').on('click', function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalOnlineBanking').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalOnlineBanking').outerWidth())/2,
			top: ($('.container').height() - $('.modalOnlineBanking').outerHeight())/2
		});
		$('.modalOnlineBanking').fadeIn().show();
	});
	
	// onclick to infoeStatement
	$('.infoeStatement').on('click', function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalEStatement').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalEStatement').outerWidth())/2,
			top: ($('.container').height() - $('.modalEStatement').outerHeight())/2
		});
		$('.modalEStatement').fadeIn().show();
	});
	
	// onclick to infomobileBanking
	$('.infomobileBanking').on('click', function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalMobileBanking').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalMobileBanking').outerWidth())/2,
			top: ($('.container').height() - $('.modalMobileBanking').outerHeight())/2
		});
		$('.modalMobileBanking').fadeIn().show();
	});
	
	// onclick to infoonlineBillPay
	$('.infoonlineBillPay').on('click', function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalBillPay').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalBillPay').outerWidth())/2,
			top: ($('.container').height() - $('.modalBillPay').outerHeight())/2
		});
		$('.modalBillPay').fadeIn().show();
	});
	
	// onclick to infooverdraftService
	$('.infooverdraftService').on('click', function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalOverdraft').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalOverdraft').outerWidth())/2,
			top: ($('.container').height() - $('.modalOverdraft').outerHeight())/2
		});
		$('.modalOverdraft').fadeIn().show();
	});
	
	// onclick to infoemailAlerts
	$('.infoemailAlerts').on('click', function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalEmailAlerts').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalEmailAlerts').outerWidth())/2,
			top: ($('.container').height() - $('.modalEmailAlerts').outerHeight())/2
		});
		$('.modalEmailAlerts').fadeIn().show();
	});
	
	// onclick to infosafeDeposit
	$('.infosafeDeposit').on('click', function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalDepositBox').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalDepositBox').outerWidth())/2,
			top: ($('.container').height() - $('.modalDepositBox').outerHeight())/2
		});
		$('.modalDepositBox').fadeIn().show();
	});
	
	// onclick to infofamilyID
	$('.infofamilyID').on('click', function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalFamilyId').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalFamilyId').outerWidth())/2,
			top: ($('.container').height() - $('.modalFamilyId').outerHeight())/2
		});
		$('.modalFamilyId').fadeIn().show();
	});
	
	// onclick to infounlimitedCheck
	$('.infounlimitedCheck').on('click', function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalCheckSupply').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalCheckSupply').outerWidth())/2,
			top: ($('.container').height() - $('.modalCheckSupply').outerHeight())/2
		});
		$('.modalCheckSupply').fadeIn().show();
	});
	
	// onclick to infopaperStatement
	$('.infopaperStatement').on('click', function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalPaperStatement').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalPaperStatement').outerWidth())/2,
			top: ($('.container').height() - $('.modalPaperStatement').outerHeight())/2
		});
		$('.modalPaperStatement').fadeIn().show();
	});
	
	// onclick to infoforeignAtms
	$('.infoforeignAtms').on('click', function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalForeignAtms').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalForeignAtms').outerWidth())/2,
			top: ($('.container').height() - $('.modalForeignAtms').outerHeight())/2
		});
		$('.modalForeignAtms').fadeIn().show();
	});
	
	
	// onclick personalized debit card
	$('#summary .infoPersonalizedDebitCard').on('click',function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalPersonalizedDebitCard').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalDebitCard').outerWidth())/2,
			top: ($('.container').height() - $('.modalDebitCard').outerHeight())/2
		});
		$('.modalPersonalizedDebitCard').fadeIn().show();
	});
	
	// onclick for the check order
	$('#summary .infoCheckOrder').on('click',function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalCheckOrder').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalCheckOrder').outerWidth())/2,
			top: ($('.container').height() - $('.modalCheckOrder').outerHeight())/2
		});
		$('.modalCheckOrder').fadeIn().show();
	});
	
	// onclick for the prepaid card
	$('#summary .infoPrePaid').on('click',function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalPrePaid').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalPrePaid').outerWidth())/2,
			top: ($('.container').height() - $('.modalPrePaid').outerHeight())/2
		});
		$('.modalPrePaid').fadeIn().show();
	});
	
	// onclick for the switch kit
	$('#summary .infoSwitchKit').on('click',function(){
		$('.summaryOverlay').fadeIn().show();
		$('.modalSwitchKit').css({
			position:'absolute',
			left: ($('.container').width() - $('.modalSwitchKit').outerWidth())/2,
			top: ($('.container').height() - $('.modalSwitchKit').outerHeight())/2
		});
		$('.modalSwitchKit').fadeIn().show();
	});
	
	// onclick the print button
	$('a.print').on('click',function(){
		window.print();
	});
}

function fnRule(div){
	// E-Statements requires Online Banking
	var onlineBanking = $('.feature.onlineBanking').hasClass("active");
	var eStatement = $('.feature.eStatement').hasClass("active");
	var mobileBanking = $('.feature.mobileBanking').hasClass("active");
	var onlinePay = $('.feature.onlinePay').hasClass("active");
	var emailAlerts = $('.feature.emailAlerts').hasClass("active");
	
	// E-Statement
	if(eStatement){
		// check to see if onlineBanking is active
		if(!onlineBanking){
			$('.fyi').fadeIn().show();
			$('.onlineBanking').addClass('active');
			$('#fyiContent').html("E-Statement");
			
			var row = '<tr id="onlineBanking"><td><p><i class="info infoonlineBanking"></i>Online Banking</p></td><td><p>$0.00/mo</p></td></tr>';
			$('.tbl_noCostFeatures').append(row);
		}
	}
	// Mobile Banking requires Online Banking
	if(mobileBanking){
		// check to see if onlineBanking is active
		if(!onlineBanking){
			$('.fyi').fadeIn().show();
			$('.onlineBanking').addClass('active');
			$('#fyiContent').html("Mobile Banking");
			
			var row = '<tr id="onlineBanking"><td><p><i class="info infoonlineBanking"></i>Online Banking</p></td><td><p>$0.00/mo</p></td></tr>';
			$('.tbl_noCostFeatures').append(row);
		}
	}
	// Online Bill Pay
	if(onlinePay){
		// check to see if onlineBanking is active
		if(!onlineBanking){
			$('.fyi').fadeIn().show();
			$('.onlineBanking').addClass('active');
			$('#fyiContent').html("Online Bill Pay");
			
			var row = '<tr id="onlineBanking"><td><p><i class="info infoonlineBanking"></i>Online Banking</p></td><td><p>$0.00/mo</p></td></tr>';
			$('.tbl_noCostFeatures').append(row);
		}
	}
	// Email Alerts
	if(emailAlerts){
		// check to see if onlineBanking is active
		if(!onlineBanking){
			$('.fyi').fadeIn().show();
			$('.onlineBanking').addClass('active');
			$('#fyiContent').html("Email Alerts");
			
			var row = '<tr id="onlineBanking"><td><p><i class="info infoonlineBanking"></i>Online Banking</p></td><td><p>$0.00/mo</p></td></tr>';
			$('.tbl_noCostFeatures').append(row);
		}
	}
	
	// Set the timeout of auto hidding of the fyi box
	$('.closeFyi').on('click',function(){
		$('.fyi').fadeOut().hide();
	});
}

function fnClick(div){

	var activeClass = div.parents('.feature').hasClass("active");
	var oneDollar = div.parents('.feature').hasClass("one");
	var twoDollars = div.parents('.feature').hasClass("two");
	var fiveDollars = div.parents('.feature').hasClass("five");
	var sevenDollars = div.parents('.feature').hasClass("seven");
	var title = div.parents('.feature').data("title");
	var id = div.parents('.feature').data("id");
	
	// stop the counter on each click
	$('.count').counter('stop');
	fnCounter(''+totalRunning+':00',''+totalRunning+':00', 'up');
	
	// if true decrease the counter, else increase the counter
	if(activeClass){
		
		if(oneDollar){ // one dollars clicked
			var newTotal = totalRunning - 1;
			if(totalRunning == 0){var initial = '00:00'; }
			else{ var initial = '0'+totalRunning+':00'; }
			fnCounter("0"+newTotal+":00","0"+newTotal+":00", 'down');
			totalRunning -= 1;
		} else if(twoDollars){ // two dollars clicked
			var newTotal = totalRunning-2;
			if(totalRunning == 0){var initial = '00:00'; }
			else{ var initial = '0'+totalRunning+':00'; }
			fnCounter("0"+newTotal+":00","0"+newTotal+":00", 'down');
			totalRunning -= 2;
		}else if(fiveDollars){ // five dollars clicked
			var newTotal = totalRunning-5;
			if(totalRunning == 0){var initial = '00:00'; }
			else{ var initial = '0'+totalRunning+':00'; }
			fnCounter("0"+newTotal+":00","0"+newTotal+":00", 'down');
			totalRunning -= 5;
		}else if(sevenDollars){ // seven dollars clicked
			var newTotal = totalRunning-7;
			if(totalRunning == 0){var initial = '00:00'; }
			else{ var initial = '0'+totalRunning+':00'; }
			fnCounter("0"+newTotal+":00","0"+newTotal+":00", 'down');
			totalRunning -= 7;
		} 
		$('#'+id).remove()
			// toggle the background color
		div.parents('.feature').toggleClass('active');
		
	}else{ 
		
		if(oneDollar){ // one dollars clicked
			var newTotal = totalRunning + 1;
			if(totalRunning == 0){var initial = '00:00'; }
			else{ var initial = '0'+totalRunning+':00'; }
			fnCounter("0"+newTotal+":00","0"+newTotal+":00", 'up');
			totalRunning += 1;
			var row = '<tr id="'+id+'"><td><p><i class="info info'+id+'"></i>'+title+'</p></td><td><p>$1.00/mo</p></td></tr>';
			$('.tbl_feeCostFeatures').append(row);
		} else if(twoDollars){ // two dollars clicked
			var newTotal = totalRunning + 2;
			if(totalRunning == 0){var initial = '00:00'; }
			else{ var initial = '0'+totalRunning+':00'; }
			fnCounter("0"+newTotal+":00","0"+newTotal+":00", 'up');
			totalRunning += 2;
			var row = '<tr id="'+id+'"><td><p><i class="info info'+id+'"></i>'+title+'</p></td><td><p>$2.00/mo</p></td></tr>';
			$('.tbl_feeCostFeatures').append(row);
		}else if(fiveDollars){ // two dollars clicked
			var newTotal = totalRunning+5;
			if(totalRunning == 0){var initial = '00:00'; }
			else{ var initial = '0'+totalRunning+':00'; }
			fnCounter("0"+newTotal+":00","0"+newTotal+":00", 'up');
			totalRunning += 5;
			var row = '<tr id="'+id+'"><td><p><i class="info info'+id+'"></i>'+title+'</p></td><td><p>$5.00/mo</p></td></tr>';
			$('.tbl_feeCostFeatures').append(row);
		}else if(sevenDollars){ // seven dollars clicked
			var newTotal = totalRunning+7;
			if(totalRunning == 0){var initial = '00:00'; }
			else{ var initial = '0'+totalRunning+':00'; }
			fnCounter("0"+newTotal+":00","0"+newTotal+":00", 'up');
			totalRunning += 7;
			var row = '<tr id="'+id+'"><td><p><i class="info info'+id+'"></i>'+title+'</p></td><td><p>$7.00/mo</p></td></tr>';
			$('.tbl_feeCostFeatures').append(row);
		}else {
			// no dollar amount
			var row = '<tr id="'+id+'"><td><p><i class="info info'+id+'"></i>'+title+'</p></td><td><p>$0.00/mo</p></td></tr>';
			$('.tbl_noCostFeatures').append(row);
		}
		// toggle the background color
		div.parents('.feature').toggleClass('active');
	}
	// check the rules
	fnRule(div);
}

function fnCounter(fnInitial,fnStop,fnDirection){
	$('.count').addClass('counter counter-analog').counter({
		initial: fnInitial,
		direction: fnDirection,
		format: "99.99",
		interval: 1,
		stop: fnStop
	});
}
