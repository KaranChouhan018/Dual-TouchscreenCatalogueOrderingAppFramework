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

// EDITABLE VARS START //////////////////////////////////////////////////////////////////

// sets time in seconds to wait before screen savers reappear if app is idle
const screenSaverTimer = 30;

// sets time in seconds to wait on checkout steps screens
const checkoutStepsDelay = 10;

// EDITABLE VARS END ///////////////////////////////////////////////////////////////////


// DO NOT EDIT BELOW ///////////////////////////////////////////////////////////////////

// clear local storage
localStorage.clear();

// for calling function from other screen
function callFunc(func, params) {
    let sendArr = [func, params];
    localStorage.setItem("screenfunc", JSON.stringify(sendArr));
}

// listens for changes to local storage
$(window).bind("storage", function() {
    let getArr = JSON.parse(localStorage.getItem("screenfunc"));
    console.log("onstorage = " + getArr[0]);
    window[getArr[0]](getArr[1]);
});