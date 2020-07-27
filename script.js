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
input.addEventListener("change", function () {
    dmxFromInput();
});
let clearInputBt = document.getElementById("clearInputBt");
clearInputBt.addEventListener("click", function () {
    input.value = "";
});

/**
 * Post the DMX value to the light
 */
let dmxAr = [];

function dmxFromInput() {
    let inputAr = input.value.split(",");
    dmxAr = inputAr;
    document.getElementsByClassName('color-preview-box')[0].style.backgroundColor = "rgba(" + inputAr[0] + "," +
        inputAr[1] + "," + inputAr[2] + "," + inputAr[3] + ")";
    postDMX();
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

    var params = 'l=' + dmxArPost[0] + '&r=' + dmxArPost[1] + '&g=' + dmxArPost[2] + '&b=' + dmxArPost[3];
    post('setDMX.php', 'application/x-www-form-urlencoded', params);
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