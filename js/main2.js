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

// highlighted product screen gsap timeline animation
let highlightTL = gsap.timeline({paused: true});

highlightTL.from("#hl-title", {
    duration: 0.25,
    left: -$(this).outerWidth(),
    ease: "power1.out"
});

highlightTL.from("#hl-price", {
    duration: 0.25,
    left: -$(this).outerWidth(),
    ease: "power1.out"
});

highlightTL.from(".highlight-images", {
    duration: 0.25,
    scale: 0,
    ease: "power1.out"
});

highlightTL.from(".other", {
    duration: 0.25,
    opacity: 0,
    x: -20,
    ease: "power1.out",
    stagger: 0.1
});

highlightTL.from(".screen-instructions", {
    duration: 0.25,
    left: -$(this).outerWidth(),
    ease: "power1.out"
});

highlightTL.from("#add2cart", {
    duration: 0.25,
    left: 1080,
    ease: "power1.out"
}, "<");

// looping animations
highlightTL.add(function() {
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
}, "+=2");

// show screen saver and reset
function displayScreenSaver() {
    $(".screen-saver").fadeIn(function() {
        // hide elements
        $("#warning, #cart, #checkout-steps").hide();
        // empty cart arrays
        cartArr = [];
        currentProduct = [];
        // update cart to empty
        $("#cart-items").html("Cart is empty");
        // update totals
        updateTotal();
        // update receipt
        updateReceipt();
        // load first procduct
        loadProduct("product1");
        // rewind highlight animation and pause
        highlightTL.restart().pause();
        // rewind checkout steps animation and pause
        checkoutStepsTL.restart().pause();
    });
}

// hide screen saver / rewind and play highlight animation
function hideScreenSaver() {
    highlightTL.restart().pause();
    $(".screen-saver").fadeOut(function() {
        highlightTL.play();
    });
}

// click/tap on screen saver to start app
$(".screen-saver").click(function() {
    hideScreenSaver();
    // hide screen saver on other screen
    callFunc("hideScreenSaver", Math.random());
});

// remove warner when tapped on screen 1
function bodyClick() {
    // remove warning if showing
    $("#warning").fadeOut(500);
}

// screen saver timer... Restarts after every click/tap
$("body").click(function () {
    callFunc("bodyClick", Math.random());
    $("#warning").fadeOut();
});

// fade in idle warning message
function showWarning() {
    $("#warning").fadeIn();
}

// update idle warning counter on other screen
function updateCounter(counter) {
    $("#seconds").text(counter);
}

// vars for cart
let cartArr = [];
let currentProduct = [];

// load product details
function loadProduct(productKey) {
    // fade out cart if showing
    $("#cart").fadeOut();
    // set attribute on return button so it loads same product
    $("#return").attr("data-product", productKey);
    // empty displayed product data
    currentProduct = [];
    // save product key
    currentProduct["product"] = productKey;
    // create var to store product data
    let productArr = products[productKey];
    // display and save title
    $("#hl-title").html(productArr.title);
    currentProduct["title"] = productArr.title;
    // display and save price
    $("#hl-price").html(productArr.price);
    currentProduct["price"] = productArr.price;
    // display and save product image
    $("#hl-img").attr("src", "assets/highlight/" + productArr.detail_image);
    currentProduct["cart_image"] = "assets/highlight/" + productArr.cart_image;
    // display overview title
    $("#hl-overview-title").html(productArr.overview_title);
    // display overview
    $("#hl-overview").html(productArr.overview);
    // create and display colour buttons
    let coloursBtns = "";
    if (productArr.colours.hex.length > 1) {
        // if more than one colour available
        productArr.colours.hex.forEach(function(value, index) {
            // create buttons html
            coloursBtns += "<div class='colour-btn' style='background-color:" + value + "' data-name='" + productArr.colours.name[index] + "' data-hex='" + value + "'></div>";
        });
        // reset colour name
        $("#selected-colour-name").attr("style", "").html("Select colour above to see name");
        // save space to record selected colour
        currentProduct["colour_selection"] = ["", ""];
    } else {
        // if only one colour available
        // create button html
        coloursBtns = "<div class='colour-btn selected' style='background-color:" + productArr.colours.hex[0] + "'></div>";
        // reset colour name
        $("#selected-colour-name").attr("style", "").html(productArr.colours.name[0]);
        // save only colour option
        currentProduct["colour_selection"] = [productArr.colours.name[0], productArr.colours.hex[0]];
    }
    $("#colour-btns").html(coloursBtns);
    // create and display size buttons
    let sizeBtns = "";
    if (productArr.sizes.length > 1) {
        // if more than one size available
        productArr.sizes.forEach(function(value, index) {
            // create buttons html
            sizeBtns += "<div class='size-btn' data-size='" + value + "'>" + value + "</div>";
        });
        // save space to record selected size
        currentProduct["size_selection"] = "";
    } else {
        // if only one size available
        // create buttons html
        sizeBtns = "<div class='size-btn selected' style='text-align:center;font-size:27px;'>" + productArr.sizes[0] + "</div>";
        // save only colour option
        currentProduct["size_selection"] = productArr.sizes[0];
    }
    $("#size-btns").html(sizeBtns);
    // rewind and play highlight animation
    highlightTL.restart();
}

// load first product onload
loadProduct("product1");

// colour buttons
$(document).on("click", ".colour-btn:not(.selected)", function() {
    // remove 'selected' class from all buttons
    $(".colour-btn").removeClass("selected");
    // add 'selected' class to clicked/tapped button
    $(this).addClass("selected");
    // update and animate colour name
    $("#selected-colour-name").animate({left: $(this).position().left + $(this).outerWidth() - 5}, 500).html($(this).attr("data-name"));
    // save selected colour data
    currentProduct["colour_selection"] = [$(this).attr("data-name"), $(this).attr("data-hex")];
});

// size buttons
$(document).on("click", ".size-btn:not(.selected)", function() {
    // remove 'selected' class from all buttons
    $(".size-btn").removeClass("selected");
    // add 'selected' class to clicked/tapped button
    $(this).addClass("selected");
    // save selected size
    currentProduct["size_selection"] = $(this).attr("data-size");
});

// fade in cart
function viewCart(nothing = null) {
    $("#cart").fadeIn();
}

// vars for cart
let subtotal;
let taxes;
let total;
const taxRate = 0.13; // 13%

// calculate and update taxes and totals
function updateTotal() {
    // reset total values
    subtotal = 0;
    taxes = 0;
    total = 0;
    // calculate and display subtotal
    for(let i = 0; i < cartArr.length; i++) {
        subtotal += Number(cartArr[i].price.replace(/\D/g, ""));
    }
    $("#cart-subtotal").html("$" + subtotal.toFixed(2));
    // calculate and display taxes
    taxes = subtotal * taxRate;
    $("#cart-taxes").html("$" + taxes.toFixed(2));
    // calculate and display total
    $("#cart-total").html("$" + (taxes + subtotal).toFixed(2));
}

// update and create receipt html
function updateReceipt() {
    // reset selected products
    let selection = "";
    // create html for selected products
    for(let i = 0; i < cartArr.length; i++) {
        selection += "<div><h3>"
                + cartArr[i].title
                + "<span>"
                + cartArr[i].price
                + "</span></h3><p><strong>Size:</strong> "
                + cartArr[i].size_selection
                + "<br><strong>Colour:</strong> "
                + cartArr[i].colour_selection[0]
                + "</p></div>";
    }
    // receipt html
    let receipt = "<html><head><style>body{margin:20px;width:300px;}hr{margin:20px 0;}img{width:300px;height:auto;}h1{text-align:center;}h3{margin-bottom:0;}p{margin-top:0;}span{float:right;}</style></head><body><img src='assets/brand_logo.svg' /><hr>" + selection +"<hr><p style='margin-top:20px;'>Subtotal<span>" + $("#cart-subtotal").text() + "</span></p><p>Taxes<span>" + $("#cart-taxes").text() + "</span></p><h3>TOTAL<span>" + $("#cart-total").text() + "</span></h3><hr><img src='assets/bar_code.svg' /><h1>Bring this receipt to the cashier :)</h1><div style='height:50px;border-bottom:solid 0.5px #EEE;'></div></body></html>";
    // save receipt info iframe
    $("#receipt").attr("srcdoc", receipt);
}

// add 2 cart button
$("#add2cart").click(function() {
    // check if colour and size is slected
    if (!$(".colour-btn").hasClass("selected") || !$(".size-btn").hasClass("selected")) {
        // animate instructions
        $("#product-info .screen-instructions").fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn();
    } else {
        // add product to cart
        cartArr.push(currentProduct);
        // create and display html for cart
        let cartHTML = "";
        for(let i = 0; i < cartArr.length; i++) {
            cartHTML += '<div class="cart-grid"><span><img src="'
                    + cartArr[i].cart_image
                    + '" /></span><span>'
                    + cartArr[i].title
                    + '</span><span style="display:flex;line-height: 1.4;"><span class="swatch" style="background-color:'
                    + cartArr[i].colour_selection[1]
                    + '"></span><span>'
                    + cartArr[i].colour_selection[0]
                    + '</span></span><span>'
                    + cartArr[i].size_selection
                    + '</span><span>'
                    + cartArr[i].price
                    + '</span><span class="remove-item" data-product="'
                    + cartArr[i].product
                    + '"><div>X</div></span></div>';
        }
        $("#cart-items").html(cartHTML);
        // update totals
        updateTotal();
        // go to cart
        viewCart();
    }
});

// load current product and close cart
$("#return").click(function() {
    loadProduct($(this).attr("data-product"));
    $("#cart").fadeOut();
});

// remove item from cart button
$(document).on("click", ".remove-item", function () {
    // animate removal
    $(this).parent().slideUp();
    // remove data from cart data
    for(let i = 0; i < cartArr.length; i++) {
        if (cartArr[i].product == $(this).attr("data-product")) {
            cartArr.splice(i, 1);
            break;
        }
    }
    // if all has been removed display empty cart text
    if (cartArr.length == 0) {
        $("#cart-items").html("Cart is empty");
    }
    // update totals
    updateTotal();
    // update receipt
    updateReceipt();
});

// print receipt
function printReceipt() {
    // put focus on receipt iframe
    $("#receipt")[0].contentWindow.focus();
    // print receipt iframe
    $("#receipt")[0].contentWindow.print();
    // display checkoput steps on this screen
    $("#checkout-steps").fadeIn();
    // play checkoput steps animation on this screen
    checkoutStepsTL.play();
    // display checkout steps on other screen and play animation
    callFunc("showCheckoutSteps", Math.random());
    // wait and then display screen saver on both screens
    setTimeout(function() {
        displayScreenSaver();
        callFunc("displayScreenSaver", Math.random());
    }, checkoutStepsDelay * 1000);
    // reactivate print button
    printBtn = true;
}

// var for print receipt button
let printBtn = true;

// asynchronous setTimeout
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// print receipt button
$("#print-receipt").click(async function() {
    // check if button has been clicked/tapped
    if (printBtn && $("#cart-items").text() != "Cart is empty") {
        // disable print button so it can't be clicked/tapped twice
        printBtn = false;
        // update receipt
        updateReceipt();
        // wait for a millisecond to allow printing
        await delay(100);
        // print receipt
        printReceipt();
    }
});
