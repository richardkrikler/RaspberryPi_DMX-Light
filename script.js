"use strict";

let colorWheel = $("#color-block");
let colorWheelPreview = document.getElementById("color-wheel-preview");
let colorInputField = document.getElementById("colorInputField");
let colorRequestBt = document.getElementById("colorRequestBt");
let clearColorInputFieldBt = document.getElementById("clearColorInputFieldBt");
let dmxTurnOffBt = document.getElementById("dmxTurnOffBt");

let currentColorObj = new ColorObj(255, 255, 255, 0);

const rgbaRegEx = "^([0-9]{1,3},)([0-9]{1,3},)([0-9]{1,3},)((0[.][0-9]{1,2})|(0)|([.][0-9]{1,2}))$";

/**
 * Color-Wheel change Listener
 */
colorWheel.on('colorchange', colorWheelEvent);

function colorWheelEvent() {
    let colorWheelObj = colorWheel.wheelColorPicker('getColor');
    currentColorObj.setFromColorWheel(colorWheelObj);

    updateColorInputField(currentColorObj.getRgbaString());
    colorWheelPreview.style.backgroundColor = colorWheel.wheelColorPicker('value');

    postDMX(currentColorObj.getDmxObj());
}

/**
 * Update the Color-Wheel
 * 
 * @param {*} rgbaString RGBA-String
 */
function updateColorWheel(rgbaString) {
    colorWheel.off();
    colorWheel.wheelColorPicker("setColor", "rgba(" + rgbaString + ")");
    colorWheel.on('colorchange', colorWheelEvent);
}

/**
 * Update the Color-Input-Field
 * 
 * @param {*} rgbaString RGBA-String
 */
function updateColorInputField(rgbaString) {
    colorInputField.value = rgbaString;
}

/**
 * Validate RGBA-String
 * 
 * @param {*} rgbaString RGBA-String
 * @returns true if valid
 */
function isValidRgbaString(rgbaString) {
    return rgbaString.match(rgbaRegEx) != null;
}

/**
 * Post-DMX from colorInputField value
 */
colorRequestBt.addEventListener("click", () => {
    if (!isValidRgbaString(colorInputField.value)) {
        return;
    }

    currentColorObj.setFromRgbaString(colorInputField.value);
    updateColorInputField(currentColorObj.getRgbaString());
    updateColorWheel(currentColorObj.getRgbaString());
    postDMX(currentColorObj.getDmxObj());
});

/**
 * Clear colorInputField value
 */
clearColorInputFieldBt.addEventListener("click", () => colorInputField.value = "");

/**
 * Turn-Off: set the alpha value to 0
 */
dmxTurnOffBt.addEventListener("click", () => {
    currentColorObj.getValues().alpha = 0;
    updateColorInputField(currentColorObj.getRgbaString());
    updateColorWheel(currentColorObj.getRgbaString());
    postDMX(currentColorObj.getDmxObj());
});

/**
 * On Window-load call getDMX to get the current Color
 */
window.addEventListener("load", getDMX);

/**
 * Get the current Color
 */
async function getDMX() {
    let result;
    await fetch("getDMX.php")
        .then(response => response.json())
        .then(data => result = data.dmx);

    currentColorObj.setFromDmxObj(result);
    updateColorInputField(currentColorObj.getRgbaString());
    updateColorWheel(currentColorObj.getRgbaString());
}

/**
 * Send DMX-Object as JSON to setDMX.php
 * 
 * @param {*} dmxObj 
 */
function postDMX(dmxObj) {
    fetch("setDMX.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dmxObj),
    });
}