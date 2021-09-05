"use strict";

let saveBt = document.getElementById("saveBt");
let deleteBt = document.getElementById("deleteBt");
let reloadPresetsBt = document.getElementById("reloadPresetsBt");
let presetFrame = document.getElementById("presets");


/**
 * create, save and delete PRESETS
 */
saveBt.addEventListener("click", function () {
    savePreset(currentColorObj.getValues());
});
deleteBt.addEventListener("click", function () {
    compare = colorInputField.value;
    deletePreset();
});

reloadPresetsBt.addEventListener("click", getPresets);
window.addEventListener("load", getPresets);


function loadPresets() {
    presetFrame.innerHTML = "";
    presetsJson.forEach(preset => {
        let newPreset = document.createElement("p");
        newPreset.id = "preset" + preset.pk_color_id;
        newPreset.className = "presets";
        newPreset.style.backgroundColor = "rgba(" + preset.red + "," + preset.green + "," + preset.blue + "," + preset.alpha + ")";
        newPreset.addEventListener("click", function () {
            currentColorObj.setFromJson(preset);
            updateColorInputField(currentColorObj.getRgbaString());
            updateColorWheel(currentColorObj.getRgbaString());
            postDMX(currentColorObj.getDmxObj());
        });
        presetFrame.appendChild(newPreset);
    });
};


let presetsJson;

async function getPresets() {
    await fetch("presets/getPresets.php")
        .then(response => response.json())
        .then(data => presetsJson = data);
    loadPresets();
}


function savePreset(colorObjValues) {
    fetch("presets/savePreset.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(colorObjValues),
    });
}


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

    post("presets/deletePresets.php", "", "", "saver");
}