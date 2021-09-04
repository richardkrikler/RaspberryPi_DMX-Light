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
$(function () {
    colorWheel.on('colorchange', function (e) {
        let colorWheelObj = colorWheel.wheelColorPicker('getColor');
        currentColorObj.setFromColorWheel(colorWheelObj);

        colorInputField.value = currentColorObj.getRgbaString();
        colorWheelPreview.style.backgroundColor = colorWheel.wheelColorPicker('value');

        postDMX(currentColorObj.getDmxObj());
    });
});

/**
 * Update the Color-Wheel
 */
function updateColorWheel() {
    colorWheel.wheelColorPicker("setColor", "rgba(" + currentColorObj.red + "," + currentColorObj.green + "," + currentColorObj.blue + "," + currentColorObj.alpha + ")");
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
    updateColorWheel();
});
clearColorInputFieldBt.addEventListener("click", () => colorInputField.value = "");
dmxTurnOffBt.addEventListener("click", () => $("#color-block").wheelColorPicker("setColor", "rgba(255,255,255,0)"));

/**
 * On Window-load call getDMX to get the current Color
 */
window.addEventListener("load", function () {
    getDMX();
});

/**
 * Get the current Color
 */
async function getDMX() {
    let result;
    await fetch("getDMX.php")
        .then(response => response.json())
        .then(data => result = data.dmx);

    currentColorObj.setFromDmxObj(result);
    colorInputField.value = currentColorObj.getRgbaString();
    updateColorWheel();
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