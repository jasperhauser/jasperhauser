
// todo:
// • redo show classes with pure css!!!

// why jquery
// • event touch/click/scroll/resize/etc. handling
// • async content loading

$(document).ready(function() {

	// global variable that defines mobile device width
	var mobileWidth = 480;

	// nav menu style change
	var header_image = document.getElementById('header-image');
	var header_image_height = getComputedStyle(header_image).height.split('px')[0];
	var nav = document.getElementById('nav');
	var nav_height = getComputedStyle(nav).height.split('px')[0];
	var switch_point = header_image_height - nav_height;
	
	$(window).bind('load scroll resize', function navStyle(e) {
		if( window.pageYOffset > switch_point) {
			document.getElementById("nav").classList.add("white");
		}
		if( window.pageYOffset < switch_point) {
			document.getElementById("nav").classList.remove("white");
		}
	});


	// mail me link/button behaviour
	$("#mail-me").bind('touchstart click', function(e) {
		// var windowWidth = window.innerWidth;
		if (window.innerWidth <= mobileWidth) { // mobile, hardcoded in CSS
			e.stopPropagation();
			e.preventDefault();
			$('#name').focus();
			console.log("issue 1");
			setbackdrop();
		}
	});
	// open and close the mobile menu
	$("#hamburger").bind('touchstart click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		setbackdrop();
	});
	// section links on mobile
	$(".nav-link").bind('click', function() {
		setbackdrop();
	});

	// usefull tool to have lying around
	function setbackdrop(e){ // tool for mail-me & hamburger control
		$('#nav').toggleClass( "nav-open" ); // nav has a special style for this state
		$('#nav-backdrop').fadeToggle( "fast", "linear" ); // let's make this things smooth
		$('body').toggleClass("noscroll"); // body should not be scrollable when menu is open
	};
	

	// url has handling
	// detect url hash change
	var hash = window.location.hash; // setup hash on load
	checkHash(); // now go check what to do
	window.onhashchange = locationHashChanged; // has url changed?
	function locationHashChanged() {
		hash = window.location.hash; // update hash
		checkHash(); // now go check what to do
	}
	function checkHash(){ // when # = go do something
		if (hash == "#contact") {
			// contact section
			document.getElementById("name").focus();
		}
	};
	function clearHash(){
		history.pushState('', document.title, window.location.pathname); // clear the #hash
	};

	
	// nav scroll progress bar
	$("#nav-bar").prepend('<div id="nav-progressbar"></div>'); // this one first so it's below #click-bar
	$('#nav-progressbar').css({"height":"100%", "position":"absolute", "top":"0px", "left":"0px", "background-color":"rgba(0,0,0,0.05)"}); // setup styling
	$(window).bind('scroll resize', function navBarProgress(){
		var navProgress =  window.scrollY / ($(document).height() - $(window).height()); // how far are we?
		var navProgressWidth = (100 * navProgress.toFixed(3)) + "%"; // round a bit
		$('#nav-progressbar').css({"width": navProgressWidth}); // apply all the math in CSS
	});

	// scroll back up when you tap "empty" part of the nav bar
	$("#nav-bar > div.content").prepend('<div id="click-bar"></div>'); // should ontop of progressbar
	$('#click-bar').css({"height":"50px", "width":"100%", "position":"absolute", "margin":"0 -16px 0 -16px"});
	$("#click-bar").bind('touchstart click', function() {
		$('html,body').animate({scrollTop: 0}, 500);
		// console.log("clicked on bar");
	});


	// header copyrights <3 my friends
	$("#header-image").append('<div id="copy"></div>');
	$(".brown > #copy").append('Photo: <a target="_blank" href="http://jtaby.com" rel="noreferrer">Majd Taby</a>');


	// show/hide scroll to top button based on scroll speed & direction
	var lastPos = null,
	    timer = 0,
	    delta = '',
	    newPos = '';
	function clear() {
	    lastPos = null;
	};

	$(window).bind('scroll resize', function checkScrollSpeed(){
		var topScrollTrigger = window.innerHeight * 0.5; // nearing the top
		var bottomScrollTrigger = $(document).height() - (window.innerHeight * 1.75); // nearing the bottom
		var newPos = window.scrollY;

		if (lastPos != null){
	        delta = newPos - lastPos;
	    }
		// scroll top show
	    if (delta < 0 && window.pageYOffset > topScrollTrigger || bottomScrollTrigger <= window.pageYOffset){
	    	$('#scroll-top').addClass("show");
	    }
	    // scroll top hide
	   	if (bottomScrollTrigger > window.pageYOffset && delta > 0 || window.pageYOffset <= topScrollTrigger){
	    	$('#scroll-top').removeClass("show");
	    }

	    lastPos = newPos;
	    timer && clearTimeout(timer);
	    timer = setTimeout(clear, 100);
	});

	// scroll button state
	$('#scroll-top').click(function() {
		$('#scroll-top').removeClass("show");
	});


	// icon grid truncation
	$(".more-btn").bind('touchstart mousedown', function(f) {
		f.stopPropagation();
		f.preventDefault();
 		var MoreButton = this;
		$(MoreButton).toggle();
		$(MoreButton).parent().toggleClass("show");
	});


	// face flip
	var face = document.getElementById("face");
	// setup the events
	face.addEventListener('mouseenter', faceFlip);
	face.addEventListener('touchstart', faceFlip);
	face.addEventListener('mouseleave', faceFlip);
	// flip the damn thing
	function faceFlip(g) {
		g.stopPropagation();
		g.preventDefault();
		face.classList.toggle('flip');
	}


	// Let's make all dates dynamic because that's what they are
	var BirthDay = 27,
		BirthMonth = 10,
		BirthYear = 1980,
		now = new Date(),
		CurrDay = now.getDate(),
		CurrMonth = now.getMonth()+1,
		CurrYear = now.getFullYear(),
		MyAge = CurrYear-BirthYear-1;
	if ((BirthMonth < CurrMonth) || ((BirthMonth == CurrMonth) && (BirthDay <= CurrDay))) { MyAge++; }
	
	$(window).bind('load', function displayAgeDates() {
	    document.getElementById("myage").innerHTML = MyAge;
	    document.getElementById("this-year").innerHTML = CurrYear;
	});

	// used to have good placeholder text in the email form
	// Released under MIT license: http://www.opensource.org/licenses/mit-license.php
	// See more at: http://www.syntacticsugr.com/23-javascript/sugr_cubes/112-detect-html5-placeholder-attribute-support#sthash.g81NfAk7.dpuf 
	placeholderSupport = ("placeholder" in document.createElement("input"));
	if(!placeholderSupport){
		//This browser does not support the placeholder attribute
		//use javascript instead
		// console.log("issue 3");
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() === input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
		}
		}).blur(function() {
			var input = $(this);
			if (input.val() === '' || input.val() === input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
		}
		}).blur().parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() === input.attr('placeholder')) {
					input.val('');
				}
			})
		});
	}

    
    // *** Tools ***

	// http://bxslider.com goodness
	$('.bxslider').bxSlider({
		auto:true,
		tickerHover:true, // only works with css turned off :(
		// useCSS:true,
		stopAutoOnClick:true,
		controls:true,
		keyboardEnabled:true,
		captions:true
	});

   	
	// smoothly scroll anchor links on page
	// origin: http://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link
	var $root = $('html, body');
	$('a').click(function() {
	    var href = $.attr(this, 'href');
	    var hrefPositionCompensated = Number($(href).offset().top) - Number(nav_height); // ensure #nav bar won't hide content
	    $root.animate({
	        scrollTop: hrefPositionCompensated
	        // scrollTop: $(href).offset().top // was the original code
	    }, 500, function () {
	        window.location.hash = href;
	    });
	    return false;
	});


	// device & window info HUD
	$(document.body).append('<div id="hud" style=""><span id="hud-toggle"></span><span id="hud-info"></span></div>');
	var myRatio = window.devicePixelRatio;
	$(window).bind('load resize scroll deviceorientation', function displayWindowSize() {
		var myWidth = window.innerWidth,
			myHeight = window.innerHeight;
		$("#hud-info").text(myWidth + " px" + " / " + myHeight + " px" + " : " + "@" + myRatio);
		if (lastPos != null){ // need some speed first
	        $("#hud-info").append(" : V" + delta); // - is going up, + is going down
	    }
	});
	$('#hud-toggle').click(function() {
		$('#hud').toggleClass("show");
	});
});