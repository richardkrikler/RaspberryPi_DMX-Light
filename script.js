"use strict";

function isValidColor(c) {
    if (!c.includes(",")) {
        return false;
    }

    if (c == "" || c.includes(" ")) {
        return false;
    }

    return true;
}

/**
 * General Buttons for input field
 */
let requestBt = document.getElementById("request");
requestBt.addEventListener("click", dmxFromInput);
let input = document.getElementById("rgba");
input.addEventListener("change", dmxFromInput);

let clearInputBt = document.getElementById("clearInputBt");
clearInputBt.addEventListener("click", function () {
    input.value = "";
});

let turnOff = document.getElementById("turnOff");
turnOff.addEventListener("click", function () {
    $("#color-block").wheelColorPicker("setColor", "rgba(255,255,255,0)");
})


/**
 * Post the DMX value to the light
 */

let dmxAr = [];

// get the current DMX value
window.addEventListener("load", function () {
    post("getDMX.php", "text/xml charset=utf-8", "", "test");
})

function test(response) {
    response = JSON.parse(response).dmx;
    input.value = response[1] + "," + response[2] + "," + response[3] + "," + (response[0] / 255);
    dmxFromInput();
}

function dmxFromInput() {
    dmxAr = input.value.split(",");
    $("#color-block").wheelColorPicker("setColor", "rgba(" + dmxAr[0] + "," + dmxAr[1] + "," + dmxAr[2] + "," + dmxAr[3] + ")");
}

function dmxFromColorWheel(colorAr) {
    input.value = colorAr;
    dmxAr = colorAr;
    postDMX();
}

function postDMX() {
    let dmxArPost = [];
    dmxArPost[0] = dmxAr[3] * 255;
    dmxArPost[1] = dmxAr[0];
    dmxArPost[2] = dmxAr[1];
    dmxArPost[3] = dmxAr[2];

    let params = "l=" + dmxArPost[0] + "&r=" + dmxArPost[1] + "&g=" + dmxArPost[2] + "&b=" + dmxArPost[3];
    post("setDMX.php", "application/x-www-form-urlencoded", params);
}

/**
 * Copy Color to clipboard
 */
let copyBt = document.getElementById("copyBt");
copyBt.addEventListener("click", function () {
    /* Select the text field */
    input.select();
    input.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
});