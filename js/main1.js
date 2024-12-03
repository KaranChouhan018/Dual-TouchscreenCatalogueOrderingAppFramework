/*!
 * Copyright (c) 2024/2025 WADe Clarke - All Rights Reserved
 *
 * This script is copyrighted and may not be used without
 * permission outside of the Interactive Media course in
 * the Interactive Media Design program at Durham College.
 * Copying and re-posting on another site or app without
 * licensing is strictly prohibited.
 *
 * Contact me if you would like to license this script or
 * if you are in need of a custom script at
 * wade.clarke@durhamcollege.ca
**/

// catalogue screen gsap timeline animation
let catalogueTL = gsap.timeline({paused: true});

catalogueTL.from(".title", {
    duration: 0.25,
    left: -$(this).outerWidth(),
    ease: "power1.out"
});

catalogueTL.fromTo(
    "#tags",
    { rotation: -90, opacity: 0 }, // Start state
    {
      rotation: 0, // Rotate 90 degrees clockwise
      opacity: 1, // Fade to full visibility
      transformOrigin: "100% 50%", // Point of rotation
      duration: 1, // Duration of animation (2 seconds)
      ease: "power2.out" // Easing for smooth animation
    }
  );

catalogueTL.from(".brand-logo", {
    duration: 0.25,
    left: 1080,
    ease: "power1.out"
}, "<");

catalogueTL.from(".overview", {
    duration: 0.25,
    opacity: 0
}, "<");

catalogueTL.from(".product", {
    duration: 0.25,
    scale: 0,
    ease: "power1.out",
    stagger: 0.1
});

catalogueTL.from(".screen-instructions", {
    duration: 0.25,
    left: -$(this).outerWidth(),
    ease: "power1.out"
});

catalogueTL.from("#view-cart", {
    duration: 0.25,
    left: 1080,
    ease: "power1.out"
}, "<");

catalogueTL.from(".sale, .keyword", {
    duration: 0.25,
    opacity: 0
});

// looping animations
catalogueTL.add(function() {
    gsap.fromTo(".product5", {
        x: 0
    }, {
        duration: 2,
        x: 20,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
    });
    gsap.fromTo(".screen-instructions", {
        scale: 1
    }, {
        duration: 1,
        scale: 1.05,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
    });
});

// checkout steps screen gsap timeline animation
let checkoutStepsTL = gsap.timeline({
    paused: true,
    delay: 0.5
});

checkoutStepsTL.from("#checkout-steps h1", {
    duration: 0.25,
    y: -320,
    ease: "power1.out"
});

checkoutStepsTL.from("#checkout-steps p", {
    duration: 0.25,
    y: -100,
    opacity: 0,
    ease: "power1.out",
    stagger: 0.5
}, "+=1");

// show screen saver and reset
function displayScreenSaver() {
    $(".screen-saver").fadeIn(function() {
        // hide elements
        $("#warning, #cart, #checkout-steps").hide();
        // rewind catalogue animation and pause
        catalogueTL.restart().pause();
        // rewind checkout steps animation and pause
        checkoutStepsTL.restart().pause();
    });
}

// hide screen saver and play catalogue animation
function hideScreenSaver() {
    $(".screen-saver").fadeOut(function() {
        catalogueTL.play();
    });
}

// click/tyap on screen saver to start app
$(".screen-saver").click(function () {
    hideScreenSaver();
    // hide screen saver on other screen
    callFunc("hideScreenSaver", Math.random());
});

// vars for idle timer and warning
let idleTimer;
let countdownTimer;

// idle timer warning message
function warningCountdown() {
    callFunc("showWarning", Math.random());
    // fade in warning message
    $("#warning").fadeIn(500, function () {
        // set 10 second countdown
        let counter = 10;
        // set text
        $("#seconds").text(counter);
        // create 10 second timer
        countdownTimer = setInterval(function () {
            // decrease counter by 1
            counter--;
            // set text
            $("#seconds").text(counter);
            // update counter on other screen
            callFunc("updateCounter", counter);
            // check if countdown is complete
            if (counter === 0) {
                // clear countdown
                clearInterval(countdownTimer);
                // go back to screen saver
                displayScreenSaver();
                // go back to screen saver on other screen
                callFunc("displayScreenSaver", Math.random());
            }
        }, 1000);
    });
}

// click/tap anywhere to reset idle timer
function bodyClick() {
    // remove warning if showing
    $("#warning").fadeOut(500);
    // clear warning timer if running
    clearInterval(countdownTimer);
    // clear timeout
    clearTimeout(idleTimer);
    // restart timer
    idleTimer = setTimeout(warningCountdown, screenSaverTimer * 1000);
}

// idle timer... restarts after every click/tap
$("body").click(function() {
    callFunc("bodyClick", Math.random());
    bodyClick();
});

// product buttons
/*$(".product").click(function () {
    // load product on other screen
    callFunc("loadProduct", $(this).attr("id"));
});*/

// view cart button
$("#view-cart").click(function () {
    // view cart on other screen
    callFunc("viewCart", Math.random());
});

// display and play checkout steps animtion
function showCheckoutSteps() {
    $("#checkout-steps").fadeIn();
    checkoutStepsTL.play();
}
