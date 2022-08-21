class ColorObj {
  #values
  constructor(red, green, blue, alpha) {
    this.#values = {
      red: red,
      green: green,
      blue: blue,
      alpha: alpha
    }

    this.getValues = function () {
      return this.#values
    }

    this.setFromJson = function (colorJson) {
      this.#values.red = colorJson.red
      this.#values.green = colorJson.green
      this.#values.blue = colorJson.blue
      this.#values.alpha = colorJson.alpha
    }

    this.setFromDmxObj = function (dmxColorObj) {
      this.#values.red = dmxColorObj[1]
      this.#values.green = dmxColorObj[2]
      this.#values.blue = dmxColorObj[3]
      this.#values.alpha = (dmxColorObj[0] / 255).toPrecision(2)
    }

    this.getDmxObj = function () {
      return {
        red: this.#values.red,
        green: this.#values.green,
        blue: this.#values.blue,
        alpha: this.#values.alpha * 255
      }
    }

    this.setFromColorWheel = function (colorWheelObj) {
      this.#values.red = Math.round(colorWheelObj.r * 255)
      this.#values.green = Math.round(colorWheelObj.g * 255)
      this.#values.blue = Math.round(colorWheelObj.b * 255)
      this.#values.alpha = colorWheelObj.a.toPrecision(2)
    }

    this.setFromRgbaString = function (rgbaString) {
      rgbaString = rgbaString.split(',')
      this.#values.red = rgbaString[0]
      this.#values.green = rgbaString[1]
      this.#values.blue = rgbaString[2]
      this.#values.alpha = rgbaString[3]
    }

    this.getRgbaString = function () {
      return (
        this.#values.red +
        ',' +
        this.#values.green +
        ',' +
        this.#values.blue +
        ',' +
        this.#values.alpha
      )
    }
  }
}
