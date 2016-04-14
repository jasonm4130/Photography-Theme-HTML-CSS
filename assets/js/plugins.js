// Unslider
!function($){return $?($.Unslider=function(t,n){var e=this;return e._="unslider",e.defaults={autoplay:!1,delay:3e3,speed:750,easing:"swing",keys:{prev:37,next:39},nav:!0,arrows:{prev:'<a class="'+e._+'-arrow prev">Prev</a>',next:'<a class="'+e._+'-arrow next">Next</a>'},animation:"horizontal",selectors:{container:"ul:first",slides:"li"},animateHeight:!1,activeClass:e._+"-active",swipe:!0,swipeThreshold:.2},e.$context=t,e.options={},e.$parent=null,e.$container=null,e.$slides=null,e.$nav=null,e.$arrows=[],e.total=0,e.current=0,e.prefix=e._+"-",e.eventSuffix="."+e.prefix+~~(2e3*Math.random()),e.interval=null,e.init=function(t){return e.options=$.extend({},e.defaults,t),e.$container=e.$context.find(e.options.selectors.container).addClass(e.prefix+"wrap"),e.$slides=e.$container.children(e.options.selectors.slides),e.setup(),$.each(["nav","arrows","keys","infinite"],function(t,n){e.options[n]&&e["init"+$._ucfirst(n)]()}),jQuery.event.special.swipe&&e.options.swipe&&e.initSwipe(),e.options.autoplay&&e.start(),e.calculateSlides(),e.$context.trigger(e._+".ready"),e.animate(e.options.index||e.current,"init")},e.setup=function(){e.$context.addClass(e.prefix+e.options.animation).wrap('<div class="'+e._+'" />'),e.$parent=e.$context.parent("."+e._);var t=e.$context.css("position");"static"===t&&e.$context.css("position","relative"),e.$context.css("overflow","hidden")},e.calculateSlides=function(){if(e.total=e.$slides.length,"fade"!==e.options.animation){var t="width";"vertical"===e.options.animation&&(t="height"),e.$container.css(t,100*e.total+"%").addClass(e.prefix+"carousel"),e.$slides.css(t,100/e.total+"%")}},e.start=function(){return e.interval=setTimeout(function(){e.next()},e.options.delay),e},e.stop=function(){return clearTimeout(e.interval),e},e.initNav=function(){var t=$('<nav class="'+e.prefix+'nav"><ol /></nav>');e.$slides.each(function(n){var i=this.getAttribute("data-nav")||n+1;$.isFunction(e.options.nav)&&(i=e.options.nav.call(e.$slides.eq(n),n,i)),t.children("ol").append('<li data-slide="'+n+'">'+i+"</li>")}),e.$nav=t.insertAfter(e.$context),e.$nav.find("li").on("click"+e.eventSuffix,function(){var t=$(this).addClass(e.options.activeClass);t.siblings().removeClass(e.options.activeClass),e.animate(t.attr("data-slide"))})},e.initArrows=function(){e.options.arrows===!0&&(e.options.arrows=e.defaults.arrows),$.each(e.options.arrows,function(t,n){e.$arrows.push($(n).insertAfter(e.$context).on("click"+e.eventSuffix,e[t]))})},e.initKeys=function(){e.options.keys===!0&&(e.options.keys=e.defaults.keys),$(document).on("keyup"+e.eventSuffix,function(t){$.each(e.options.keys,function(n,i){t.which===i&&$.isFunction(e[n])&&e[n].call(e)})})},e.initSwipe=function(){var t=e.$slides.width();"fade"!==e.options.animation&&e.$container.on({movestart:function(t){return t.distX>t.distY&&t.distX<-t.distY||t.distX<t.distY&&t.distX>-t.distY?!!t.preventDefault():void e.$container.css("position","relative")},move:function(n){e.$container.css("left",-(100*e.current)+100*n.distX/t+"%")},moveend:function(n){Math.abs(n.distX)/t>e.options.swipeThreshold?e[n.distX<0?"next":"prev"]():e.$container.animate({left:-(100*e.current)+"%"},e.options.speed/2)}})},e.initInfinite=function(){var t=["first","last"];$.each(t,function(n,i){e.$slides.push.apply(e.$slides,e.$slides.filter(':not(".'+e._+'-clone")')[i]().clone().addClass(e._+"-clone")["insert"+(0===n?"After":"Before")](e.$slides[t[~~!n]]()))})},e.destroyArrows=function(){$.each(e.$arrows,function(t,n){n.remove()})},e.destroySwipe=function(){e.$container.off("movestart move moveend")},e.destroyKeys=function(){$(document).off("keyup"+e.eventSuffix)},e.setIndex=function(t){return 0>t&&(t=e.total-1),e.current=Math.min(Math.max(0,t),e.total-1),e.options.nav&&e.$nav.find('[data-slide="'+e.current+'"]')._active(e.options.activeClass),e.$slides.eq(e.current)._active(e.options.activeClass),e},e.animate=function(t,n){if("first"===t&&(t=0),"last"===t&&(t=e.total),isNaN(t))return e;e.options.autoplay&&e.stop().start(),e.setIndex(t),e.$context.trigger(e._+".change",[t,e.$slides.eq(t)]);var i="animate"+$._ucfirst(e.options.animation);return $.isFunction(e[i])&&e[i](e.current,n),e},e.next=function(){var t=e.current+1;return t>=e.total&&(t=0),e.animate(t,"next")},e.prev=function(){return e.animate(e.current-1,"prev")},e.animateHorizontal=function(t){var n="left";return"rtl"===e.$context.attr("dir")&&(n="right"),e.options.infinite&&e.$container.css("margin-"+n,"-100%"),e.slide(n,t)},e.animateVertical=function(t){return e.options.animateHeight=!0,e.options.infinite&&e.$container.css("margin-top",-e.$slides.outerHeight()),e.slide("top",t)},e.slide=function(t,n){if(e.options.animateHeight&&e._move(e.$context,{height:e.$slides.eq(n).outerHeight()},!1),e.options.infinite){var i;n===e.total-1&&(i=e.total-3,n=-1),n===e.total-2&&(i=0,n=e.total-2),"number"==typeof i&&(e.setIndex(i),e.$context.on(e._+".moved",function(){e.current===i&&e.$container.css(t,-(100*i)+"%").off(e._+".moved")}))}var o={};return o[t]=-(100*n)+"%",e._move(e.$container,o)},e.animateFade=function(t){var n=e.$slides.eq(t).addClass(e.options.activeClass);e._move(n.siblings().removeClass(e.options.activeClass),{opacity:0}),e._move(n,{opacity:1},!1)},e._move=function(t,n,i,o){return i!==!1&&(i=function(){e.$context.trigger(e._+".moved")}),t._move(n,o||e.options.speed,e.options.easing,i)},e.init(n)},$.fn._active=function(t){return this.addClass(t).siblings().removeClass(t)},$._ucfirst=function(t){return(t+"").toLowerCase().replace(/^./,function(t){return t.toUpperCase()})},$.fn._move=function(){return this.stop(!0,!0),$.fn[$.fn.velocity?"velocity":"animate"].apply(this,arguments)},void($.fn.unslider=function(t){return this.each(function(){var n=$(this);if("string"==typeof t&&n.data("unslider")){t=t.split(":");var e=n.data("unslider")[t[0]];if($.isFunction(e))return e.apply(n,t[1]?t[1].split(","):null)}return n.data("unslider",new $.Unslider(n,t))})})):console.warn("Unslider needs jQuery")}(window.jQuery);

// End Unslider

// jQuery.event.swipe
// 0.5
// Stephen Band

// Dependencies
// jQuery.event.move 1.2

// One of swipeleft, swiperight, swipeup or swipedown is triggered on
// moveend, when the move has covered a threshold ratio of the dimension
// of the target node, or has gone really fast. Threshold and velocity
// sensitivity changed with:
//
// jQuery.event.special.swipe.settings.threshold
// jQuery.event.special.swipe.settings.sensitivity

(function (thisModule) {
	if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', undefined, 'jquery.event.move'], thisModule);
    } else if ((typeof module !== "undefined" && module !== null) && module.exports) {
        module.exports = thisModule;
	} else {
		// Browser globals
        thisModule(jQuery);
	}
})(function(jQuery, undefined){
	var add = jQuery.event.add,

	    remove = jQuery.event.remove,

	    // Just sugar, so we can have arguments in the same order as
	    // add and remove.
	    trigger = function(node, type, data) {
	    	jQuery.event.trigger(type, data, node);
	    },

	    settings = {
	    	// Ratio of distance over target finger must travel to be
	    	// considered a swipe.
	    	threshold: 0.4,
	    	// Faster fingers can travel shorter distances to be considered
	    	// swipes. 'sensitivity' controls how much. Bigger is shorter.
	    	sensitivity: 6
	    };

	function moveend(e) {
		var w, h, event;

		w = e.currentTarget.offsetWidth;
		h = e.currentTarget.offsetHeight;

		// Copy over some useful properties from the move event
		event = {
			distX: e.distX,
			distY: e.distY,
			velocityX: e.velocityX,
			velocityY: e.velocityY,
			finger: e.finger
		};

		// Find out which of the four directions was swiped
		if (e.distX > e.distY) {
			if (e.distX > -e.distY) {
				if (e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
					event.type = 'swiperight';
					trigger(e.currentTarget, event);
				}
			}
			else {
				if (-e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
					event.type = 'swipeup';
					trigger(e.currentTarget, event);
				}
			}
		}
		else {
			if (e.distX > -e.distY) {
				if (e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
					event.type = 'swipedown';
					trigger(e.currentTarget, event);
				}
			}
			else {
				if (-e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
					event.type = 'swipeleft';
					trigger(e.currentTarget, event);
				}
			}
		}
	}

	function getData(node) {
		var data = jQuery.data(node, 'event_swipe');

		if (!data) {
			data = { count: 0 };
			jQuery.data(node, 'event_swipe', data);
		}

		return data;
	}

	jQuery.event.special.swipe =
	jQuery.event.special.swipeleft =
	jQuery.event.special.swiperight =
	jQuery.event.special.swipeup =
	jQuery.event.special.swipedown = {
		setup: function( data, namespaces, eventHandle ) {
			var data = getData(this);

			// If another swipe event is already setup, don't setup again.
			if (data.count++ > 0) { return; }

			add(this, 'moveend', moveend);

			return true;
		},

		teardown: function() {
			var data = getData(this);

			// If another swipe event is still setup, don't teardown.
			if (--data.count > 0) { return; }

			remove(this, 'moveend', moveend);

			return true;
		},

		settings: settings
	};
});


// jquery.event.move
//
// 1.3.6
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:   Page coordinates of pointer.
// startX:
// startY:  Page coordinates of pointer at movestart.
// distX:
// distY:  Distance the pointer has moved since movestart.
// deltaX:
// deltaY:  Distance the finger has moved since last event.
// velocityX:
// velocityY:  Average velocity over last few events.


(function (thisModule) {
	if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], thisModule);
    } else if ((typeof module !== "undefined" && module !== null) && module.exports) {
        module.exports = thisModule;
	} else {
		// Browser globals
        thisModule(jQuery);
	}
})(function(jQuery, undefined){

	var // Number of pixels a pressed pointer travels before movestart
	    // event is fired.
	    threshold = 6,

	    add = jQuery.event.add,

	    remove = jQuery.event.remove,

	    // Just sugar, so we can have arguments in the same order as
	    // add and remove.
	    trigger = function(node, type, data) {
	    	jQuery.event.trigger(type, data, node);
	    },

	    // Shim for requestAnimationFrame, falling back to timer. See:
	    // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	    requestFrame = (function(){
	    	return (
	    		window.requestAnimationFrame ||
	    		window.webkitRequestAnimationFrame ||
	    		window.mozRequestAnimationFrame ||
	    		window.oRequestAnimationFrame ||
	    		window.msRequestAnimationFrame ||
	    		function(fn, element){
	    			return window.setTimeout(function(){
	    				fn();
	    			}, 25);
	    		}
	    	);
	    })(),

	    ignoreTags = {
	    	textarea: true,
	    	input: true,
	    	select: true,
	    	button: true
	    },

	    mouseevents = {
	    	move: 'mousemove',
	    	cancel: 'mouseup dragstart',
	    	end: 'mouseup'
	    },

	    touchevents = {
	    	move: 'touchmove',
	    	cancel: 'touchend',
	    	end: 'touchend'
	    };


	// Constructors

	function Timer(fn){
		var callback = fn,
		    active = false,
		    running = false;

		function trigger(time) {
			if (active){
				callback();
				requestFrame(trigger);
				running = true;
				active = false;
			}
			else {
				running = false;
			}
		}

		this.kick = function(fn) {
			active = true;
			if (!running) { trigger(); }
		};

		this.end = function(fn) {
			var cb = callback;

			if (!fn) { return; }

			// If the timer is not running, simply call the end callback.
			if (!running) {
				fn();
			}
			// If the timer is running, and has been kicked lately, then
			// queue up the current callback and the end callback, otherwise
			// just the end callback.
			else {
				callback = active ?
					function(){ cb(); fn(); } :
					fn ;

				active = true;
			}
		};
	}


	// Functions

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	function preventDefault(e) {
		e.preventDefault();
	}

	function preventIgnoreTags(e) {
		// Don't prevent interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

		e.preventDefault();
	}

	function isLeftButton(e) {
		// Ignore mousedowns on any button other than the left (or primary)
		// mouse button, or when a modifier key is pressed.
		return (e.which === 1 && !e.ctrlKey && !e.altKey);
	}

	function identifiedTouch(touchList, id) {
		var i, l;

		if (touchList.identifiedTouch) {
			return touchList.identifiedTouch(id);
		}

		// touchList.identifiedTouch() does not exist in
		// webkit yet… we must do the search ourselves...

		i = -1;
		l = touchList.length;

		while (++i < l) {
			if (touchList[i].identifier === id) {
				return touchList[i];
			}
		}
	}

	function changedTouch(e, event) {
		var touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		// Chrome Android (at least) includes touches that have not
		// changed in e.changedTouches. That's a bit annoying. Check
		// that this touch has changed.
		if (touch.pageX === event.pageX && touch.pageY === event.pageY) { return; }

		return touch;
	}


	// Handlers that decide when the first movestart is triggered

	function mousedown(e){
		var data;

		if (!isLeftButton(e)) { return; }

		data = {
			target: e.target,
			startX: e.pageX,
			startY: e.pageY,
			timeStamp: e.timeStamp
		};

		add(document, mouseevents.move, mousemove, data);
		add(document, mouseevents.cancel, mouseend, data);
	}

	function mousemove(e){
		var data = e.data;

		checkThreshold(e, data, e, removeMouse);
	}

	function mouseend(e) {
		removeMouse();
	}

	function removeMouse() {
		remove(document, mouseevents.move, mousemove);
		remove(document, mouseevents.cancel, mouseend);
	}

	function touchstart(e) {
		var touch, template;

		// Don't get in the way of interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

		touch = e.changedTouches[0];

		// iOS live updates the touch objects whereas Android gives us copies.
		// That means we can't trust the touchstart object to stay the same,
		// so we must copy the data. This object acts as a template for
		// movestart, move and moveend event objects.
		template = {
			target: touch.target,
			startX: touch.pageX,
			startY: touch.pageY,
			timeStamp: e.timeStamp,
			identifier: touch.identifier
		};

		// Use the touch identifier as a namespace, so that we can later
		// remove handlers pertaining only to this touch.
		add(document, touchevents.move + '.' + touch.identifier, touchmove, template);
		add(document, touchevents.cancel + '.' + touch.identifier, touchend, template);
	}

	function touchmove(e){
		var data = e.data,
		    touch = changedTouch(e, data);

		if (!touch) { return; }

		checkThreshold(e, data, touch, removeTouch);
	}

	function touchend(e) {
		var template = e.data,
		    touch = identifiedTouch(e.changedTouches, template.identifier);

		if (!touch) { return; }

		removeTouch(template.identifier);
	}

	function removeTouch(identifier) {
		remove(document, '.' + identifier, touchmove);
		remove(document, '.' + identifier, touchend);
	}


	// Logic for deciding when to trigger a movestart.

	function checkThreshold(e, template, touch, fn) {
		var distX = touch.pageX - template.startX,
		    distY = touch.pageY - template.startY;

		// Do nothing if the threshold has not been crossed.
		if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

		triggerStart(e, template, touch, distX, distY, fn);
	}

	function handled() {
		// this._handled should return false once, and after return true.
		this._handled = returnTrue;
		return false;
	}

	function flagAsHandled(e) {
		e._handled();
	}

	function triggerStart(e, template, touch, distX, distY, fn) {
		var node = template.target,
		    touches, time;

		touches = e.targetTouches;
		time = e.timeStamp - template.timeStamp;

		// Create a movestart object with some special properties that
		// are passed only to the movestart handlers.
		template.type = 'movestart';
		template.distX = distX;
		template.distY = distY;
		template.deltaX = distX;
		template.deltaY = distY;
		template.pageX = touch.pageX;
		template.pageY = touch.pageY;
		template.velocityX = distX / time;
		template.velocityY = distY / time;
		template.targetTouches = touches;
		template.finger = touches ?
			touches.length :
			1 ;

		// The _handled method is fired to tell the default movestart
		// handler that one of the move events is bound.
		template._handled = handled;

		// Pass the touchmove event so it can be prevented if or when
		// movestart is handled.
		template._preventTouchmoveDefault = function() {
			e.preventDefault();
		};

		// Trigger the movestart event.
		trigger(template.target, template);

		// Unbind handlers that tracked the touch or mouse up till now.
		fn(template.identifier);
	}


	// Handlers that control what happens following a movestart

	function activeMousemove(e) {
		var timer = e.data.timer;

		e.data.touch = e;
		e.data.timeStamp = e.timeStamp;
		timer.kick();
	}

	function activeMouseend(e) {
		var event = e.data.event,
		    timer = e.data.timer;

		removeActiveMouse();

		endEvent(event, timer, function() {
			// Unbind the click suppressor, waiting until after mouseup
			// has been handled.
			setTimeout(function(){
				remove(event.target, 'click', returnFalse);
			}, 0);
		});
	}

	function removeActiveMouse(event) {
		remove(document, mouseevents.move, activeMousemove);
		remove(document, mouseevents.end, activeMouseend);
	}

	function activeTouchmove(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = changedTouch(e, event);

		if (!touch) { return; }

		// Stop the interface from gesturing
		e.preventDefault();

		event.targetTouches = e.targetTouches;
		e.data.touch = touch;
		e.data.timeStamp = e.timeStamp;
		timer.kick();
	}

	function activeTouchend(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		removeActiveTouch(event);
		endEvent(event, timer);
	}

	function removeActiveTouch(event) {
		remove(document, '.' + event.identifier, activeTouchmove);
		remove(document, '.' + event.identifier, activeTouchend);
	}


	// Logic for triggering move and moveend events

	function updateEvent(event, touch, timeStamp, timer) {
		var time = timeStamp - event.timeStamp;

		event.type = 'move';
		event.distX =  touch.pageX - event.startX;
		event.distY =  touch.pageY - event.startY;
		event.deltaX = touch.pageX - event.pageX;
		event.deltaY = touch.pageY - event.pageY;

		// Average the velocity of the last few events using a decay
		// curve to even out spurious jumps in values.
		event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
		event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
		event.pageX =  touch.pageX;
		event.pageY =  touch.pageY;
	}

	function endEvent(event, timer, fn) {
		timer.end(function(){
			event.type = 'moveend';

			trigger(event.target, event);

			return fn && fn();
		});
	}


	// jQuery special event definition

	function setup(data, namespaces, eventHandle) {
		// Stop the node from being dragged
		//add(this, 'dragstart.move drag.move', preventDefault);

		// Prevent text selection and touch interface scrolling
		//add(this, 'mousedown.move', preventIgnoreTags);

		// Tell movestart default handler that we've handled this
		add(this, 'movestart.move', flagAsHandled);

		// Don't bind to the DOM. For speed.
		return true;
	}

	function teardown(namespaces) {
		remove(this, 'dragstart drag', preventDefault);
		remove(this, 'mousedown touchstart', preventIgnoreTags);
		remove(this, 'movestart', flagAsHandled);

		// Don't bind to the DOM. For speed.
		return true;
	}

	function addMethod(handleObj) {
		// We're not interested in preventing defaults for handlers that
		// come from internal move or moveend bindings
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}

		// Stop the node from being dragged
		add(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid, preventDefault, undefined, handleObj.selector);

		// Prevent text selection and touch interface scrolling
		add(this, 'mousedown.' + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector);
	}

	function removeMethod(handleObj) {
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}

		remove(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid);
		remove(this, 'mousedown.' + handleObj.guid);
	}

	jQuery.event.special.movestart = {
		setup: setup,
		teardown: teardown,
		add: addMethod,
		remove: removeMethod,

		_default: function(e) {
			var event, data;

			// If no move events were bound to any ancestors of this
			// target, high tail it out of here.
			if (!e._handled()) { return; }

			function update(time) {
				updateEvent(event, data.touch, data.timeStamp);
				trigger(e.target, event);
			}

			event = {
				target: e.target,
				startX: e.startX,
				startY: e.startY,
				pageX: e.pageX,
				pageY: e.pageY,
				distX: e.distX,
				distY: e.distY,
				deltaX: e.deltaX,
				deltaY: e.deltaY,
				velocityX: e.velocityX,
				velocityY: e.velocityY,
				timeStamp: e.timeStamp,
				identifier: e.identifier,
				targetTouches: e.targetTouches,
				finger: e.finger
			};

			data = {
				event: event,
				timer: new Timer(update),
				touch: undefined,
				timeStamp: undefined
			};

			if (e.identifier === undefined) {
				// We're dealing with a mouse
				// Stop clicks from propagating during a move
				add(e.target, 'click', returnFalse);
				add(document, mouseevents.move, activeMousemove, data);
				add(document, mouseevents.end, activeMouseend, data);
			}
			else {
				// We're dealing with a touch. Stop touchmove doing
				// anything defaulty.
				e._preventTouchmoveDefault();
				add(document, touchevents.move + '.' + e.identifier, activeTouchmove, data);
				add(document, touchevents.end + '.' + e.identifier, activeTouchend, data);
			}
		}
	};

	jQuery.event.special.move = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.move', jQuery.noop);
		},

		teardown: function() {
			remove(this, 'movestart.move', jQuery.noop);
		}
	};

	jQuery.event.special.moveend = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.moveend', jQuery.noop);
		},

		teardown: function() {
			remove(this, 'movestart.moveend', jQuery.noop);
		}
	};

	add(document, 'mousedown.move', mousedown);
	add(document, 'touchstart.move', touchstart);

	// Make jQuery copy touch event properties over to the jQuery event
	// object, if they are not already listed. But only do the ones we
	// really need. IE7/8 do not have Array#indexOf(), but nor do they
	// have touch events, so let's assume we can ignore them.
	if (typeof Array.prototype.indexOf === 'function') {
		(function(jQuery, undefined){
			var props = ["changedTouches", "targetTouches"],
			    l = props.length;

			while (l--) {
				if (jQuery.event.props.indexOf(props[l]) === -1) {
					jQuery.event.props.push(props[l]);
				}
			}
		})(jQuery);
	};
});
