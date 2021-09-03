"use strict";


let colorObj;
let colorWheel = $("#color-block");
let colorWheelPreview = document.getElementById("color-wheel-preview");
let colorInputField = document.getElementById("colorInputField");
let colorRequestBt = document.getElementById("colorRequestBt");
let clearColorInputFieldBt = document.getElementById("clearColorInputFieldBt");
let dmxTurnOffBt = document.getElementById("dmxTurnOffBt");

/**
 * Color-Wheel change Listener
 */
$(function () {
    colorWheel.on('colorchange', function (e) {
        let colorWheelObj = colorWheel.wheelColorPicker('getColor');
        colorObj = colorWheelToColorObj(colorWheelObj);

        colorInputField.value = colorObjToString(colorObj);
        colorWheelPreview.style.backgroundColor = colorWheel.wheelColorPicker('value');

        postDMX();
    });
});

/**
 * Convert Color-Wheel-Object to Color-Object
 * 
 * @param {*} colorWheelObj 
 * @returns Color-Object
 */
function colorWheelToColorObj(colorWheelObj) {
    return {
        red: Math.round(colorWheelObj.r * 255),
        green: Math.round(colorWheelObj.g * 255),
        blue: Math.round(colorWheelObj.b * 255),
        alpha: (colorWheelObj.a).toPrecision(2)
    };
}

/**
 * Convert DMX-Object to Color-Object
 * 
 * @param {*} dmxColorObj 
 * @returns Color-Object
 */
function dmxObjToColorObj(dmxColorObj) {
    return {
        red: dmxColorObj[1],
        green: dmxColorObj[2],
        blue: dmxColorObj[3],
        alpha: dmxColorObj[0] / 255,
    }
}

/**
 * Convert RGBA-String to Color-Object
 * 
 * @param {*} rgbaString 
 * @returns Color-Object
 */
function rgbaStringToColorObj(rgbaString) {
    rgbaString = rgbaString.split(",");
    return {
        red: rgbaString[0],
        green: rgbaString[1],
        blue: rgbaString[2],
        alpha: rgbaString[3],
    }
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

/**
 * Update the Color-Wheel
 */
function updateColorWheel() {
    colorWheel.wheelColorPicker("setColor", "rgba(" + colorObj.red + "," + colorObj.green + "," + colorObj.blue + "," + colorObj.alpha + ")");
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
colorRequestBt.addEventListener("click", () => {
    colorObj = rgbaStringToColorObj(colorInputField.value);
    updateColorWheel();
});
clearColorInputFieldBt.addEventListener("click", () => colorInputField.value = "");
dmxTurnOffBt.addEventListener("click", () => $("#color-block").wheelColorPicker("setColor", "rgba(255,255,255,0)"));




// get the current DMX value
window.addEventListener("load", function () {
    getDMX();
})

async function getDMX() {
    let result;
    await fetch("getDMX.php")
        .then(response => response.json())
        .then(data => result = data.dmx);

    colorObj = dmxObjToColorObj(result);
    colorInputField.value = colorObjToString(colorObj);
    updateColorWheel();
}

function postDMX() {
    let params = "a=" + (colorObj.alpha * 255) + "&r=" + colorObj.red + "&g=" + colorObj.green + "&b=" + colorObj.blue;
    post("setDMX.php", "application/x-www-form-urlencoded", params);
}