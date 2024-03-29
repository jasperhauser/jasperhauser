
// show/hide scroll to top button based on scroll speed & direction
var lastPos = null,
timer = 0,
delta = '',
newPos = '';
function clear() {
	lastPos = null;
};

window.addEventListener('resize', checkScrollSpeed);
window.addEventListener('scroll', checkScrollSpeed);

function checkScrollSpeed(){
	var topScrollTrigger = window.innerHeight * 0.5; // nearing the top
	var bottomScrollTrigger = document.body.clientHeight - (window.innerHeight * 1.75); // nearing the bottom
	var newPos = window.scrollY;

	if (lastPos != null){
		delta = newPos - lastPos;
	}
	// scroll top show
	if (delta < 0 && window.pageYOffset > topScrollTrigger || bottomScrollTrigger <= window.pageYOffset){
		document.getElementById('scroll-top').classList.add('show');
	}
	// scroll top hide
	if (bottomScrollTrigger > window.pageYOffset && delta > 0 || window.pageYOffset <= topScrollTrigger){
		document.getElementById('scroll-top').classList.remove('show');
	}

	lastPos = newPos;
	timer && clearTimeout(timer);
	timer = setTimeout(clear, 100);
}

// scroll button state
document.getElementById("scroll-top").onclick = function(){
	document.getElementById("scroll-top").classList.toggle('show');
}


// mail me link/button behaviour
var mobileWidth = 480;
document.getElementById("mail-me").onclick = function(){
	if (window.innerWidth <= mobileWidth) { // mobile, hardcoded in CSS
		document.getElementById("name").focus();
		setbackdrop();
	}
};

// open and close the mobile menu
document.getElementById("hamburger").onclick = function(){
	setbackdrop();
};

// section links on mobile
document.getElementById("nav-sections").onclick = function(){
	setbackdrop();
};

// usefull tool to have lying around
function setbackdrop(e){ // tool for mail-me & hamburger control
	document.getElementById("nav").classList.toggle('nav-open'); // nav has a special style for this state
	document.getElementById("nav-backdrop").classList.toggle('show'); // let's make this things smooth
	document.body.classList.toggle('noscroll'); // body should not be scrollable when menu is open
};

// nav menu style change
var header_image = document.getElementById('header-image');
var header_image_height = getComputedStyle(header_image).height.split('px')[0];
var nav = document.getElementById('nav');
var nav_height = getComputedStyle(nav).height.split('px')[0];
var switch_point = header_image_height - nav_height;

window.addEventListener('load', navSwitch);
window.addEventListener('resize', navSwitch);
window.addEventListener('scroll', navSwitch);

function navSwitch(){
	if( window.pageYOffset > switch_point) {
		document.getElementById("nav").classList.add("white");
	}
	if( window.pageYOffset < switch_point) {
		document.getElementById("nav").classList.remove("white");
	}
}

// nav scroll progress bar
window.addEventListener('resize', navBarProgress);
window.addEventListener('scroll', navBarProgress);

function navBarProgress(){
	var navProgress =  window.scrollY / (document.body.clientHeight - window.innerHeight); // how far are we?
	var navProgressWidth = (100 * navProgress.toFixed(3)) + "%"; // round a bit
	document.getElementById("nav-progressbar").style.width = navProgressWidth; // apply all the math in CSS
}

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
}
function clearHash(){
	history.pushState('', document.title, window.location.pathname); // clear the #hash
}

// face flip
var face = document.getElementById("face");
// setup the events
face.addEventListener('touchstart', faceFlip, {passive: true});
face.addEventListener('mouseenter', faceFlip);
face.addEventListener('mouseleave', faceFlip);
// flip the damn thing
function faceFlip(g) {
	// g.stopPropagation();
	// g.preventDefault();
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

window.onload = (event) => {
	document.getElementById("myage").innerHTML = MyAge;
	document.getElementById("this-year").innerHTML = CurrYear;
}

// ### Tools ###

// device & window info HUD
document.body.insertAdjacentHTML('beforeend', '<div id="hud" style=""><span id="hud-toggle"></span><span id="hud-info"></span></div>');
var myRatio = window.devicePixelRatio;

window.addEventListener('load', displayWindowSize);
window.addEventListener('resize', displayWindowSize);
window.addEventListener('scroll', displayWindowSize);

function displayWindowSize() {
	var myWidth = window.innerWidth,
		myHeight = window.innerHeight;
	document.getElementById('hud-info').textContent = myWidth + " px" + " / " + myHeight + " px" + " : " + "@" + myRatio;
	if (lastPos != null){ // need some speed first
		document.getElementById('hud-info').append(" : V" + delta); // - is going up, + is going down
	}
}
document.getElementById("hud-toggle").onclick = function(){
	document.getElementById("hud").classList.toggle("show");
}