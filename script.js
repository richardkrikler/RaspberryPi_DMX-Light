"use strict";


let colorObj;
let colorInputField = document.getElementById("colorInputField");
let colorRequestBt = document.getElementById("colorRequestBt");
let clearColorInputFieldBt = document.getElementById("clearColorInputFieldBt");
let dmxTurnOffBt = document.getElementById("dmxTurnOffBt");

/**
 * Color-Wheel change Listener
 */
$(function () {
    $('#color-block').on('colorchange', function (e) {
        let colorWheelObj = $(this).wheelColorPicker('getColor');
        colorObj = convertColorWheelToColorObj(colorWheelObj);

        colorInputField.value = colorObjToString(colorObj);
        $('.color-preview-box').css('background-color', $(this).wheelColorPicker('value'));
    });
});

/**
 * Convert Color-Wheel-Object to Color-Object
 * 
 * @param {*} colorWheelObj 
 * @returns Color-Object
 */
function convertColorWheelToColorObj(colorWheelObj) {
    return {
        red: Math.round(colorWheelObj.r * 255),
        green: Math.round(colorWheelObj.g * 255),
        blue: Math.round(colorWheelObj.b * 255),
        alpha: (colorWheelObj.a).toPrecision(2)
    };
}

/**
 * Convert Color-Object to String
 * 
 * @param {*} colorObj 
 * @returns RGBA-String
 */
function colorObjToString(colorObj) {
    return colorObj.red + "," + colorObj.green + "," + colorObj.blue + "," + colorObj.alpha;
}



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
colorRequestBt.addEventListener("click", dmxFromInput);
clearColorInputFieldBt.addEventListener("click", () => colorInputField.value = "");
dmxTurnOffBt.addEventListener("click", () => $("#color-block").wheelColorPicker("setColor", "rgba(255,255,255,0)"));


/**
 * Post the DMX value to the light
 */

let dmxAr = [];

// get the current DMX value
window.addEventListener("load", function () {
    // fetch("getDMX.php")
    // .then(response => getDMX(response));
    post("getDMX.php", "text/xml charset=utf-8", "", "getDMX");
})

function getDMX(response) {
    response = JSON.parse(response).dmx;
    colorInputField.value = response[1] + "," + response[2] + "," + response[3] + "," + (response[0] / 255);
    dmxFromInput();
}

function dmxFromInput() {
    dmxAr = colorInputField.value.split(",");
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