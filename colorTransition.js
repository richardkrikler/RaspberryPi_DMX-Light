let setFromBt = document.getElementById('setFromBt')
let setToBt = document.getElementById('setToBt')
let startTransitionBt = document.getElementById('startTransitionBt')
let colorCountField = document.getElementById('colorCountField')
let msBetweenColorsField = document.getElementById('msBetweenColorsField')
let transitionColor1 = document.getElementById('transitionColor1')
let transitionColor2 = document.getElementById('transitionColor2')
let fromColor
let toColor
let colorCount = 10
let msBetweenColors = 1000

setFromBt.addEventListener('click', () => {
  fromColor = Object.values(currentColorObj.getValues())
  transitionColor1.style.backgroundColor =
    'rgba(' + currentColorObj.getRgbaString() + ')'
})

setToBt.addEventListener('click', () => {
  toColor = Object.values(currentColorObj.getValues())
  transitionColor2.style.backgroundColor =
    'rgba(' + currentColorObj.getRgbaString() + ')'
})

colorCountField.addEventListener('change', () => {
  colorCount = colorCountField.value
})

msBetweenColorsField.addEventListener('change', () => {
  msBetweenColors = msBetweenColorsField.value
})

startTransitionBt.addEventListener('click', () => {
  let colors = calculateColors(fromColor, toColor, colorCount)
  colorTransition(colors)
})

function colorTransition(colors) {
  for (let c = 0; c < colors.length; c++) {
    setTimeout(() => {
      console.log(colors[c])
      postDMX(new ColorObj(...colors[c], fromColor[3]).getDmxObj())
    }, msBetweenColors * c)
  }
}

function calculateColors(startColor, endColor, steps) {
  let colors = []

  let start = startColor
  let end = endColor

  // Calculate the incremental step for each channel (R, G, B)
  let stepR = Math.floor((end[0] - start[0]) / steps)
  let stepG = Math.floor((end[1] - start[1]) / steps)
  let stepB = Math.floor((end[2] - start[2]) / steps)

  // Generate the colors between start and end
  for (let i = 0; i < steps; i++) {
    let color = [
      Math.max(start[0] + stepR * i, 0),
      Math.max(start[1] + stepG * i, 0),
      Math.max(start[2] + stepB * i, 0)
    ]
    colors.push(color)
  }

  // Add the end color
  colors.push(end)

  return colors
}
