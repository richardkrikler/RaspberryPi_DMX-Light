"use strict";

let colorWheel = $("#color-block");
let colorWheelPreview = document.getElementById("color-wheel-preview");
let colorInputField = document.getElementById("colorInputField");
let colorRequestBt = document.getElementById("colorRequestBt");
let clearColorInputFieldBt = document.getElementById("clearColorInputFieldBt");
let dmxTurnOffBt = document.getElementById("dmxTurnOffBt");

let currentColorObj = new ColorObj(255, 255, 255, 0);

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
    currentColorObj.setFromRgbaString(colorInputField.value);
    updateColorWheel(currentColorObj.getRgbaString());
});
clearColorInputFieldBt.addEventListener("click", () => colorInputField.value = "");
dmxTurnOffBt.addEventListener("click", () => $("#color-block").wheelColorPicker("setColor", "rgba(255,255,255,0)"));

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