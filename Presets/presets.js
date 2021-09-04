"use strict";

let saveBt = document.getElementById("saveBt");
let deleteBt = document.getElementById("deleteBt");
let reloadPresetsBt = document.getElementById("reloadPresetsBt");


/**
 * create, save and delete PRESETS
 */
saveBt.addEventListener("click", function () {
    compare = colorInputField.value;
    savePreset(currentColorObj.getValues());
});
deleteBt.addEventListener("click", function () {
    compare = colorInputField.value;
    deletePreset();
});

reloadPresetsBt.addEventListener("click", getPresets);


window.addEventListener("load", getPresets);

function loadPresets() {
    let presetFrame = document.getElementById("presets");
    presetFrame.innerHTML = "";

    for (let i = 0; i < presetsTxt.length - 1; i++) {
        let newPreset = document.createElement("p");
        newPreset.id = "preset" + i;
        newPreset.className = "presets";
        newPreset.style.backgroundColor = "rgba(" + presetsTxt[i] + ")";
        newPreset.addEventListener("click", function () {
            colorInputField.value = presetsTxt[i];
            dmxFromInput();
        });
        presetFrame.appendChild(newPreset);
    }
};


let presetsTxt = [];

async function getPresets() {
    const response = await fetch("Presets/presets.txt", {
        method: "GET",
        headers: {
            "Content-Type": "text/xml charset=utf-8",
        },
    })

    console.log(response);
    // post("Presets/presets.txt", "text/xml charset=utf-8", "", "setPresetsTxt");
}

function setPresetsTxt(text) {
    presetsTxt = text.split("\n");
    loadPresets();
}

/**
 * Save Preset
 */
let compare = "";

function savePreset(colorObj) {
    fetch("Presets/savePreset.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(colorObj),
    });
}

/**
 * Delete Preset
 */
let newPresets = [];

function deletePreset() {
    getPresets();
    let deletePreset = compare;

    if (!isValidColor(deletePreset)) {
        return;
    }

    for (let i = 0; i < presetsTxt.length - 1; i++) {
        if (deletePreset !== presetsTxt[i]) {
            newPresets.push(presetsTxt[i]);
        }
    }

    post("Presets/deletePresets.php", "", "", "saver");
}

let counter = 0;

function saver() {
    if (counter <= newPresets.length - 1) {
        counter++;
        if (counter == newPresets.length) {
            post("Presets/savePreset.php", "application/x-www-form-urlencoded", "preset=" + newPresets[counter - 1], "getPresets");
        } else {
            post("Presets/savePreset.php", "application/x-www-form-urlencoded", "preset=" + newPresets[counter - 1], "saver");
        }
    }
}