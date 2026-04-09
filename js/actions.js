var jQBody = $(document);
var jqWindow = $(window);
var triggers = {
	desktop:[
		{
			in:0,
			out:0.14
		},
		{
			in:0.05865,
			out:0.11
		},
		{
			in:0.12,
			out:0.204
		},
		{
			in:0.223,
			out:0.3
		},
		{
			in:0.3395,
			out:0.4282
		},
		{
			in:0.548,
			out:0.627
		},
		{
			in:0.603,
			out:0.659
		},
		{
			in:0.721,
			out:0.782
		},
		{
			in:0.769,
			out:0.82
		},
		{
			in:0.858,
			out:0.921
		},
	],
	mobile:[
		{
			in:0,
			out:0.0651
		},
		{
			in:0.0324,
			out:0.057
		},
		{
			in:0.114,
			out:0.138
		},
		{
			in:0.21,
			out:0.236
		},
		{
			in:0.334,
			out:0.356
		},
		{
			in:0.497,
			out:0.523
		},
		{
			in:0.516,
			out:0.544
		},
		{
			in:0.732,
			out:0.755
		},
		{
			in:0.807,
			out:0.832
		},
		{
			in:0.847,
			out:0.871
		},
	]
};
var player,
playerReady = false,
startPlayer = false;

jQBody.ready(function(){
	jqWindow.scroll(eventScroll);
	$("body").addClass("parallax");
	$(".accordion").each(initAccordion);
	if(($("#videoMessage").get(0))) {
		$("#videoMessage").click(function(){
			if(playerReady) {
				player.playVideo();
			} else {
				startPlayer = true;
			}
		});
		// Load the IFrame Player API code asynchronously.
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/player_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
	$("#hideBtn").click(hideTextToggle);
	scrollInit();
});

function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytPlayer',{
    	width: "560",
    	height: "315",
    	videoId: "HsM541EOMZU", 
    	events: {
    		onReady: onPlayerReady,
    		onStateChange: onPlayerStateChange
    	}
    });
}
function onPlayerReady() {
	playerReady = true;
	if(startPlayer) player.playVideo();
}
function onPlayerStateChange(e) {
	switch(e.data) {
	case YT.PlayerState.PLAYING:
		$("#videoMessage img").css('opacity',0).css('z-index',0);
		$("#ytPlayer").css('opacity',1).css('z-index',1);
		break;
	case YT.PlayerState.ENDED:
		$("#videoMessage img").css('opacity',1).css('z-index',1);
		$("#ytPlayer").css('opacity',0).css('z-index',0);
		break;
	}
}
function eventScroll(e) {
	var scroll = jqWindow.scrollTop();
	var viewport = jqWindow.height();
	var percent = scroll/(jQBody.height()-viewport);
	var sTrigger = (jQBody.width()<=755) ? triggers.mobile : triggers.desktop;
	if(scroll > 50) {
		$("#jump").removeClass("off");
	} else {
		$("#jump").addClass("off");
	}
	//Exploring new frontiers
	if(percent < sTrigger[0].out) {
		var bgScroll = normalisePercent(percent,sTrigger[0].in,sTrigger[0].out)*100;
		$("#about").css('background-position',bgScroll+'% 0');
	}
	//The Spirit of the Sea
	if(betweenTrigger(percent,1,sTrigger)) {
		var i = 1;
		var p = normalisePercent(percent,sTrigger[i].in,sTrigger[i].out);
		$("#our-spirit .col-left").css('opacity',p);
		$("#our-spirit .col-right").css('left',25-(p*25)+"%").css('opacity',p);
	}
	//The Spirit of Commerce
	if(betweenTrigger(percent,2,sTrigger)) {
		var i = 2;
		var p = normalisePercent(percent,sTrigger[i].in,sTrigger[i].out)*1.6;
		var p1 = (p-0.6 > 0) ? (p-0.6 <= 1) ? p-0.6 : 1 : 0;
		var p2 = (p-0.4 > 0) ? (p-0.4 <= 1) ? p-0.4 : 1 : 0;
		var p3 = (p-0.2 > 0) ? (p-0.2 <= 1) ? p-0.2 : 1 : 0;
		var p4 = (p <= 1) ? p : 1;
		$("#spirit-commerce .col-right h1").css('opacity',p4);
		$("#spirit-commerce .col-right p:nth-child(2)").css('opacity',p3);
		$("#spirit-commerce .col-right p:nth-child(3)").css('opacity',p2);
		$("#spirit-commerce .col-right p:nth-child(4)").css('opacity',p1);
		if(p1 > 0.1) $("#hideBtn").text("Hide Text");
		else $("#hideBtn").text("Show Text");
	}
	//The Spirit of Emergo
	if(betweenTrigger(percent,3,sTrigger)) {
		var i = 3;
		var p = normalisePercent(percent,sTrigger[i].in,sTrigger[i].out);
		$("#spirit-emergo .col-left").css('opacity',p);
		$("#spirit-emergo .col-right").css('left',25-(p*25)+'%');
	}
	//Tennyson Quote
	if(betweenTrigger(percent,4,sTrigger)) {
		var i = 4;
		var p = normalisePercent(percent,sTrigger[i].in,sTrigger[i].out)*2.05;
		var p1 = (p-1.05 > 0) ? (p-1.05 <= 1) ? p-1.05 : 1 : 0;
		var p2 = (p-0.7 > 0) ? (p-0.7 <= 1) ? p-0.7 : 1 : 0;
		var p3 = (p-0.35 > 0) ? (p-0.35 <= 1) ? p-0.35 : 1 : 0;
		var p4 = (p <= 1) ? p : 1;
		$("#spirit-quote blockquote p:nth-child(1)").css('opacity',p4);
		$("#spirit-quote blockquote p:nth-child(2)").css('opacity',p3);
		$("#spirit-quote blockquote p:nth-child(3)").css('opacity',p2);
		$("#spirit-quote blockquote cite").css('opacity',p1);
	}
	//Portfolio
	if(betweenTrigger(percent,5,sTrigger)) {
		var i = 5;
		var p = normalisePercent(percent,sTrigger[i].in,sTrigger[i].out);
		$("#our-portfolio").css('opacity',p);
	}
	if(aboveTrigger(percent,5,sTrigger)) {
		$("#our-portfolio").css('opacity',1);
	}
	//Our Industries
	if(betweenTrigger(percent,6,sTrigger)) {
		var i = 6;
		var p = normalisePercent(percent,sTrigger[i].in,sTrigger[i].out);
		$("#our-industries").css('opacity',p);
	}
	if(aboveTrigger(percent,6,sTrigger)) {
		$("#our-industries").css('opacity',1);
	}
	//Industry Quote
	if(betweenTrigger(percent,7,sTrigger)) {
		var i = 7;
		var p = normalisePercent(percent,sTrigger[i].in,sTrigger[i].out);
		$("#industry-quote .col-left").css('left',(p*25)-25+"%").css('opacity',p);
	}
	//A Message
	if(betweenTrigger(percent,8,sTrigger)) {
		var i = 8;
		var p = normalisePercent(percent,sTrigger[i].in,sTrigger[i].out);
		$("#a-message").css('opacity',p);
	}
	//A Few Words
	if(betweenTrigger(percent,9,sTrigger)) {
		var i = 9;
		var p = normalisePercent(percent,sTrigger[i].in,sTrigger[i].out);
		$("#a-few-words").css('opacity',p);
	}
}

function initAccordion(ind,el) {
	var _parent = this;
	$("section",this).each(function(i,e){
		$(this).click(function(){onAccordionClick(this,_parent)});
		if(i==0) return;
		
		setCollapse(this);
	});
}
function onAccordionClick(e,a) {
	var el = $(e);
	if(el.hasClass("off")) {
		$("section",a).each(function(i,e){
			if($(this).hasClass("off") == false) {
				$(this).height($(this).height());
				setCollapse(this);
			}
		});
		el.removeClass("off").height(el.data("exp"));
		setTimeout(function() { setExpand(el) },510);
	}
}
function setCollapse(el) {
	var collapse = $(el).children().first().outerHeight(true)+3;
	var max = $(el).height();
	$(el).addClass("off").height(collapse).data("exp",max);
}
function setExpand(el) {
	el.height("auto");
}
function scrollInit() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var speed = Math.abs(target.offset().top-$(window).scrollTop())/3;
				$('html,body').animate({
					scrollTop: target.offset().top
				}, speed);
				return false;
			} else if(this.hash == "") {
				
			}
		}
	});
}
function onPlayerExitFullscreen() {
	this.src = "";
	this.removeAttribute("src");
}
function normalisePercent(p,m,x) {
	return (p-m)/(x-m);
}
function betweenTrigger(p,i,t) {
	return (p > t[i].in && p < t[i].out);
}
function belowTrigger(p,i,t) {
	return (p <= t[i].in);
}
function aboveTrigger(p,i,t) {
	return (p >= t[i].out);
}
function hideTextToggle(e) {
	var on = ($("#hideBtn").text() == "Hide Text");
	if(on) {
		$("#spirit-commerce .col-right p").css("opacity", 0);
		$("#spirit-commerce .col-right h1").css("opacity", 0);
		$("#hideBtn").text("Show Text");
	} else {
		$("#spirit-commerce .col-right p").css("opacity", 1);
		$("#spirit-commerce .col-right h1").css("opacity", 1);
		$("#hideBtn").text("Hide Text");
	}
}