;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	//  wow
	var wow = new WOW({
	  mobile: false // trigger animations on mobile devices (default is true)
	});
	wow.init();

	//loading
	var loadPage = function(){
		$(window).on('load', function () {
		    $("#loading").delay(1000).fadeOut(1000);
		});
	}

	
	// Document on load.
	$(function(){

		loadPage();

	});


}());