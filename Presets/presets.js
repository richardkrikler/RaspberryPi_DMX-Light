let saveBt = document.getElementById('saveBt')
let deleteBt = document.getElementById('deleteBt')
let reloadPresetsBt = document.getElementById('reloadPresetsBt')
let presetFrame = document.getElementById('presets')

/**
 * Click&Load-Listener: Get-Presets
 */
window.addEventListener('load', loadPresets)
reloadPresetsBt.addEventListener('click', loadPresets)

/**
 * Load-Presets: Display presetsJson to User
 */
async function loadPresets() {
  let presetsJson = await getPresets()
  presetFrame.innerHTML = ''
  presetsJson.forEach(preset => {
    let newPreset = document.createElement('p')
    newPreset.className = 'presets'
    newPreset.style.backgroundColor =
      'rgba(' +
      preset.red +
      ',' +
      preset.green +
      ',' +
      preset.blue +
      ',' +
      preset.alpha +
      ')'
    newPreset.addEventListener('click', () => {
      currentColorObj.setFromJson(preset)
      updateColorInputField(currentColorObj.getRgbaString())
      updateColorWheel(currentColorObj.getRgbaString())
      updateColorWheelPreview(currentColorObj.getRgbaString())
      postDMX(currentColorObj.getDmxObj())
    })
    presetFrame.appendChild(newPreset)
  })
}

/**
 * Get-Presets: Get the Presets from DB
 */
async function getPresets() {
  let result = []
  await fetch('presets/getPresets.php')
    .then(response => response.json())
    .then(data => (result = data))
  return result
}

/**
 * Click-Listener: Save-Preset
 */
saveBt.addEventListener('click', () => {
  savePreset(currentColorObj.getValues())
})

/**
 * Save-Preset to DB
 *
 * @param {*} colorObjValues JSON-Object of RGBA-Values
 */
function savePreset(colorObjValues) {
  fetch('presets/savePreset.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(colorObjValues)
  }).then(response => {
    if (response.ok) {
      loadPresets()
    }
  })
}

/**
 * Click-Listener: Delete-Preset
 */
deleteBt.addEventListener('click', function () {
  deletePreset(currentColorObj.getValues())
})

/**
 * Delete-Preset from DB
 *
 * @param {*} colorObjValues JSON-Object of RGBA-Values
 */
function deletePreset(colorObjValues) {
  fetch('presets/deletePreset.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(colorObjValues)
  }).then(response => {
    if (response.ok) {
      loadPresets()
    }
  })
}
